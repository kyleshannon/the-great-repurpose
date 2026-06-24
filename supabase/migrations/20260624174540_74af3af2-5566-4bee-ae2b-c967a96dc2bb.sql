
-- 1. Add per-submission ownership token
ALTER TABLE public.selfcheck_results
  ADD COLUMN IF NOT EXISTS claim_token uuid;

-- 2. Drop existing public policies and grants on the base table
DROP POLICY IF EXISTS "Public can read non-sensitive columns" ON public.selfcheck_results;
DROP POLICY IF EXISTS "Public can insert validated results" ON public.selfcheck_results;
DROP POLICY IF EXISTS "Public can set interpretation once" ON public.selfcheck_results;

REVOKE ALL ON public.selfcheck_results FROM anon;
REVOKE ALL ON public.selfcheck_results FROM authenticated;

GRANT ALL ON public.selfcheck_results TO service_role;

-- 3. Public view that excludes the email column. Owned by postgres so it
--    bypasses RLS by design; the row id is an unguessable UUID and acts
--    as the access token, matching the previous behavior minus email.
CREATE OR REPLACE VIEW public.selfcheck_results_public
WITH (security_invoker = false) AS
SELECT
  id,
  identity_score,
  value_score,
  purpose_score,
  ai_relationship_score,
  creative_action_score,
  lowest_dimension,
  archetype,
  ai_interpretation,
  open_answer,
  created_at
FROM public.selfcheck_results;

GRANT SELECT ON public.selfcheck_results_public TO anon, authenticated;

-- 4. SECURITY DEFINER function to create a result and return id + token.
CREATE OR REPLACE FUNCTION public.create_selfcheck_result(
  p_email text,
  p_identity double precision,
  p_value double precision,
  p_purpose double precision,
  p_ai_relationship double precision,
  p_creative_action double precision,
  p_lowest_dimension text,
  p_archetype text,
  p_open_answer text,
  p_ai_interpretation text
) RETURNS TABLE(id uuid, claim_token uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
  v_token uuid := gen_random_uuid();
BEGIN
  IF p_email IS NULL
     OR char_length(p_email) < 3
     OR char_length(p_email) > 320
     OR p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'invalid email';
  END IF;
  IF p_identity < 0 OR p_identity > 10
     OR p_value < 0 OR p_value > 10
     OR p_purpose < 0 OR p_purpose > 10
     OR p_ai_relationship < 0 OR p_ai_relationship > 10
     OR p_creative_action < 0 OR p_creative_action > 10 THEN
    RAISE EXCEPTION 'invalid scores';
  END IF;

  INSERT INTO public.selfcheck_results (
    email, identity_score, value_score, purpose_score,
    ai_relationship_score, creative_action_score,
    lowest_dimension, archetype, open_answer, ai_interpretation, claim_token
  ) VALUES (
    p_email, p_identity, p_value, p_purpose,
    p_ai_relationship, p_creative_action,
    p_lowest_dimension, p_archetype, p_open_answer, p_ai_interpretation, v_token
  ) RETURNING selfcheck_results.id INTO v_id;

  RETURN QUERY SELECT v_id, v_token;
END;
$$;

REVOKE ALL ON FUNCTION public.create_selfcheck_result(
  text, double precision, double precision, double precision, double precision,
  double precision, text, text, text, text
) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.create_selfcheck_result(
  text, double precision, double precision, double precision, double precision,
  double precision, text, text, text, text
) TO anon, authenticated;

-- 5. SECURITY DEFINER function to set the AI interpretation, gated by token.
CREATE OR REPLACE FUNCTION public.set_selfcheck_interpretation(
  p_id uuid,
  p_token uuid,
  p_interpretation text,
  p_archetype text
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_updated int;
BEGIN
  IF p_id IS NULL OR p_token IS NULL OR p_interpretation IS NULL THEN
    RETURN false;
  END IF;

  UPDATE public.selfcheck_results
     SET ai_interpretation = p_interpretation,
         archetype = COALESCE(p_archetype, archetype)
   WHERE id = p_id
     AND claim_token = p_token
     AND ai_interpretation IS NULL
     AND created_at > now() - interval '15 minutes';

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated > 0;
END;
$$;

REVOKE ALL ON FUNCTION public.set_selfcheck_interpretation(uuid, uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.set_selfcheck_interpretation(uuid, uuid, text, text) TO anon, authenticated;
