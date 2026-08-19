# TGR: stage refresh, assessment rebalance, Salon decoupling, Academy

Work is sequenced so content truth lands first, then the assessment that depends on it, then the new Academy and homepage polish.

## Phase 1 — Stage content (source of truth)

- Stage names stay as they are: Unhook Identity, Reclaim Value, Discover Purpose, Become AI Ready, Relaunch Yourself.
- Replace the "Become AI Ready" and "Relaunch Yourself" long-form copy on the Five Stages detail page with the new definitions from the PDF (what it means / what it feels like / what it looks like in practice). Stage 4 gets the "put yourself at the center, play without expectations" framing; stage 5 gets the economic framing — visible evidence, offers, multiple ways for opportunity and income to reach you.
- Update the short one-line stage descriptions and taglines used on the homepage rows and anywhere else stages are summarized so they echo the new stage 4 and 5 language.

## Phase 2 — Homepage fixes

- "Who am I now?" quote: step it down in size and fix the section's top spacing so the whitespace above it is even and not oversized.
- Button "Start Free Assessment →" becomes "Get Your Profile →".
- The Five Stages bridge section currently argues the case but never names the stages. Add a compact numbered list of the five stage names (with taglines) under the copy.
- Rename the section heading "Where are you on the map?" to "Exploring the Five Stages" so it reads as the continuation of the section above it.
- Bottom "Get Your Repurpose Profile →" button changes from indigo to aqua (aqua background, aubergine text, aqua pulse), matching the other primary CTAs.

## Phase 3 — Assessment: language + rebalance

- Rewrite question copy and dimension labels against the new stage definitions, with the stage 4 questions leaning on curiosity/play rather than tool proficiency and the stage 5 questions leaning on visible work, offers, and income — not just "I made a rough version."
- Rebalance scoring: revisit how the seven questions weight into the five stages and adjust the thresholds that map a score shape onto one of the ten profiles, so the new stage 4/5 emphasis actually moves results.
- Update profile descriptions and vulnerability lines where they reference the old stage framing.
- Recommendations become needs-based rather than a fixed Salon activity: each profile's weakest stage drives what is suggested. Leadership-shaped results point to the Executive Leadership Academy; transition-shaped results (laid off, HR, role compressed) point to the TGR Transition Academy; community is suggested where peer momentum is the gap, phrased as "consider an AI-forward community such as the AI Salon (theSalon.ai)."

## Phase 4 — Decouple from the AI Salon

Remove the deep coupling everywhere, keeping only soft, optional mentions:

- Results page: drop the "AI Salon activities" list and the per-profile Salon block; replace with the needs-based recommendations from Phase 3.
- AI interpretation function: remove the instruction to lead with a Salon activity; instruct it to recommend based on the weakest stages, with an optional community mention.
- Footer: remove "born in the AI Salon" from the description and the Salon event links; keep a single community link.
- About page: keep Kyle's bio reference to the AI Salon (it is biographical fact); remove the standalone "The AI Salon is where you go next" section and CTA.
- PDF export: footer becomes "TheGreatRepurpose.com".
- Email consent line: "emails from The Great Repurpose".

## Phase 5 — TGR Academy

- New `/academy` page with two sections: The TGR Transition Academy and The Executive Leadership Academy, using placeholder copy in the site's voice plus editorial photography already in the library.
- Add "Academy" to the top nav and the footer, and link it from the assessment recommendations.
- Page metadata (title, description, canonical, OG) set consistently with the rest of the site.

## Technical notes

- Stage copy lives in `src/lib/stages.ts` and the `stages` array in `src/pages/Phases.tsx`; homepage stage rows read from a `phases` array in `src/pages/Index.tsx`.
- Assessment questions live in `src/pages/SelfCheck.tsx`; scoring and profile definitions in `src/lib/archetypes.ts`; PDF output in `src/lib/generateReport.ts`; AI prompt in `supabase/functions/generate-interpretation/index.ts`.
- The `salonEntry` field on each archetype is replaced by a `nextSteps` structure keyed to weakest stage; the results page, PDF, share text, and edge function prompt all read from the new shape.
- New route `/academy` registered in `src/App.tsx`, plus `src/pages/Academy.tsx`; sitemap entry added.
- No database or schema changes.

## Out of scope

- Real Academy copy, pricing, and enrollment flow (placeholders until you supply the real content).
- Daily Signal, profiles page layout, and brand system changes.
