-- 1. Remove the always-true public read policy and all direct table access
DROP POLICY IF EXISTS "Public can read non-email columns" ON public.selfcheck_results;
REVOKE ALL ON public.selfcheck_results FROM anon, authenticated;
REVOKE ALL ON public.selfcheck_results_public FROM anon, authenticated;
DROP VIEW IF EXISTS public.selfcheck_results_public;

-- 2. Single-row fetch by unguessable id, email never returned
CREATE OR REPLACE FUNCTION public.get_selfcheck_result(p_id uuid)
RETURNS TABLE(
  id uuid,
  identity_score double precision,
  value_score double precision,
  purpose_score double precision,
  ai_relationship_score double precision,
  creative_action_score double precision,
  lowest_dimension text,
  archetype text,
  ai_interpretation text,
  open_answer text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT r.id, r.identity_score, r.value_score, r.purpose_score,
         r.ai_relationship_score, r.creative_action_score,
         r.lowest_dimension, r.archetype, r.ai_interpretation,
         r.open_answer, r.created_at
  FROM public.selfcheck_results r
  WHERE r.id = p_id
  LIMIT 1
$$;

REVOKE ALL ON FUNCTION public.get_selfcheck_result(uuid) FROM PUBLIC, authenticated;
GRANT EXECUTE ON FUNCTION public.get_selfcheck_result(uuid) TO anon;

-- 3. App has no sign-in; drop signed-in execute rights on the definer helpers
REVOKE EXECUTE ON FUNCTION public.create_selfcheck_result(
  text, double precision, double precision, double precision,
  double precision, double precision, text, text, text, text
) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.set_selfcheck_interpretation(uuid, uuid, text, text) FROM authenticated;