# Repurpose Profile Report Rebuild

Rebuild the results experience so the profile leads, the scores explain themselves, and recommendations close the report. PDF is updated in a second pass once this is dialed in.

## Email gate page

- Headline becomes `Your Repurpose Profile is:` with the profile name below it in display type (the profile is already known at this point, before email).
- Subtitle underneath: the profile's Profiles-page subtitle (e.g. "You're building toward leading the way.").
- CTA line: "Enter your email to read your report." above the email field.
- Keep the existing legal disclaimer text unchanged.

## Report order (top to bottom)

1. **You are: [PROFILE]** — remove "You've made it through." / "You're a [Category]." lead-ins entirely. Just the eyebrow, the profile name, and directly below it the exact Profiles-page subtitle.
2. **The risk at this stage** — the profile's `vulnerability` copy, moved up from lower in the report.
3. **Radar graph** — each axis label gets the stage logo to the left of the label, and the person's score printed directly below the label.
4. **Profile definition** — the longer descriptive paragraph shown on the Profiles page (e.g. "Identity, value, direction — all clear…").
5. **Your five stage scores** — one row per stage: logo, stage name, score, a colored progress line in the stage color, plus a new 1–2 sentence read of what that score means for that stage and one thing to consider next. Replaces the current collapsible "Dimension by Dimension" accordion.
6. **Insights About Your Profile** — the existing AI narrative report, renamed from "Your Personalized Report". Content and streaming behavior unchanged.
7. **What to work on next** — moved to the end and reframed: no single stage headline. Tactical recommendations only.
8. Existing track recommendation, share, and download blocks stay after that.

**Removed:** the "About [PROFILE]" section (now covered at the top).

## Score-band copy

Each stage gets three bands — low (1–4), mid (4.1–7), high (7.1–10) — with a short read plus a nudge, written per stage so a 3 in Unhook Identity says something different than a 3 in Relaunch Yourself. 15 short entries total, in brand voice.

## What to work on next (reframed)

Drops the "focus stage" headline and the archetype's stage-specific `nextStep.body`. Instead: a short lead-in plus three tactical practices drawn from the person's two weakest stages, so the advice reads as concrete moves rather than "go do stage 3".

## Technical notes

- `src/lib/archetypes.ts`: add a `profileDescription` field per archetype (the Profiles-page copy, currently duplicated inside `TgrTypes.tsx`), and a new `stageScoreBands` map keyed by stage + band. Add a helper that returns the band for a score. Add a recommendation helper that pulls practices across the two lowest stages.
- `src/pages/TgrTypes.tsx`: read profile copy from `archetypes.ts` instead of its local duplicate list, so the two pages can never drift.
- `src/pages/ResultsPreview.tsx`: reorder sections, update `EmailGate` copy to take the archetype as a prop, extend `StageTick` to render the score below each label, and replace the accordion with the new stage-score rows.
- `src/lib/generateReport.ts`: untouched this round; updated to match once the web report is approved.
