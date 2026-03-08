

# Fix: Returning to Results Shows Empty Report

## Root Cause

When the user completes the quiz on `/results/preview`, the AI interpretation streams in. When they enter their email, `handleEmailSuccess` inserts the DB record, sets `resultId`, and immediately navigates to `/results/:id`. This **unmounts** the component before the save effect (which watches `streamDone && resultId`) can write the interpretation to the database.

Result: the `ai_interpretation` column stays `null`. When the user returns via the nav link, the DB record loads with no cached interpretation, and the pre-gen guard (`!routeId`) prevents re-streaming. The user sees an empty report with the "Writing your report..." indicator that never resolves.

## Fix

Two changes in `src/pages/ResultsPreview.tsx`:

1. **Save interpretation before navigating**: In `handleEmailSuccess`, if the streamed text is already available, include it in the initial `insert` call (or `update` immediately after insert) so it's persisted before the navigation unmounts the component.

2. **Fallback: stream on `/results/:id` if interpretation is missing**: In the DB-load effect, if the fetched record has no `ai_interpretation`, trigger streaming so the user isn't stuck on an empty page. Remove the `!routeId` guard from the pre-gen effect, replacing it with a `!cachedInterpretation` check.

## Files Changed

- `src/pages/ResultsPreview.tsx` — save interpretation in the insert call; add fallback streaming for records missing interpretation

