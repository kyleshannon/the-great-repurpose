-- Tighten access on selfcheck_results: prevent public email enumeration and remove always-true write policies

DROP POLICY IF EXISTS "Anyone can view results by id" ON public.selfcheck_results;
DROP POLICY IF EXISTS "Anyone can insert results" ON public.selfcheck_results;
DROP POLICY IF EXISTS "Anyone can update results" ON public.selfcheck_results;
DROP POLICY IF EXISTS "Public can read non-email columns" ON public.selfcheck_results;
DROP POLICY IF EXISTS "Public can insert validated results" ON public.selfcheck_results;
DROP POLICY IF EXISTS "Public can update interpretation only" ON public.selfcheck_results;

-- Reset table grants, then re-grant at column level so email is never readable by the public API
REVOKE ALL ON public.selfcheck_results FROM anon;
REVOKE ALL ON public.selfcheck_results FROM authenticated;

GRANT SELECT
  (id, identity_score, value_score, purpose_score, ai_relationship_score,
   creative_action_score, lowest_dimension, archetype, ai_interpretation,
   open_answer, created_at)
  ON public.selfcheck_results TO anon, authenticated;

GRANT INSERT
  (email, identity_score, value_score, purpose_score, ai_relationship_score,
   creative_action_score, lowest_dimension, archetype, ai_interpretation,
   open_answer)
  ON public.selfcheck_results TO anon, authenticated;

GRANT UPDATE (ai_interpretation, archetype)
  ON public.selfcheck_results TO anon, authenticated;

GRANT ALL ON public.selfcheck_results TO service_role;

-- Public can read results by id (UUID is the unguessable access token).
-- Email column is excluded via column-level GRANTs above, not RLS.
CREATE POLICY "Public can read non-sensitive columns"
  ON public.selfcheck_results
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Inserts must pass basic validation (no longer WITH CHECK (true))
CREATE POLICY "Public can insert validated results"
  ON public.selfcheck_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND char_length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND identity_score BETWEEN 0 AND 10
    AND value_score BETWEEN 0 AND 10
    AND purpose_score BETWEEN 0 AND 10
    AND ai_relationship_score BETWEEN 0 AND 10
    AND creative_action_score BETWEEN 0 AND 10
  );

-- Updates only allowed to set the AI interpretation once (no longer USING (true))
CREATE POLICY "Public can set interpretation once"
  ON public.selfcheck_results
  FOR UPDATE
  TO anon, authenticated
  USING (ai_interpretation IS NULL)
  WITH CHECK (ai_interpretation IS NOT NULL);
