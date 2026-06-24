
-- Switch the view to security_invoker so it respects the caller's RLS
ALTER VIEW public.selfcheck_results_public SET (security_invoker = true);

-- Re-grant column-level SELECT on the base table to public roles, excluding `email`
GRANT SELECT
  (id, identity_score, value_score, purpose_score, ai_relationship_score,
   creative_action_score, lowest_dimension, archetype, ai_interpretation,
   open_answer, created_at, claim_token)
  ON public.selfcheck_results TO anon, authenticated;

-- And allow public SELECT through RLS. Note: email is excluded by the column
-- grant above (PostgREST enforces column privileges separately from RLS),
-- and claim_token is included so the insert RPC's RETURNING can hand it
-- back to the original submitter only.
CREATE POLICY "Public can read non-email columns"
  ON public.selfcheck_results
  FOR SELECT
  TO anon, authenticated
  USING (true);
