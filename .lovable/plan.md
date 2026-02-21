# Add Open-Ended Question, Remove Subtext, and Redesign AI-Powered Results

## Overview

Four changes: (1) remove "7 questions. 2 minutes." subtext from the TGR Types page CTA, (2) add an open-ended text question as question 8 in the Self-Check, (3) redesign the post-email results page into a richer narrative report, and (4) rewrite the edge function prompt so the AI generates a structured, personalized report that synthesizes scores, references the open-ended answer, includes dimension breakdowns, and weaves in AI Salon recommendations with links.

---

## 1. Remove CTA subtext on `/types`

**File: `src/pages/TgrTypes.tsx**`

Remove the line "7 questions. 2 minutes. Discover where you are -- and what you're building toward." and keep only the "Which one are you?" heading and the button.

---

## 2. Add open-ended question 8

**File: `src/pages/SelfCheck.tsx**`

- After the 7 slider questions, add a new step (question 8) that shows a textarea: **"What's the thing you keep thinking about but haven't started yet?"**
- This step replaces the slider with a simple text input. The "Next" button becomes "Find Your TGR Type" on this step.
- The `touched` state on this step is always true (the question is optional -- they can skip it or type something).
- Store the answer in a new state variable `openAnswer`.
- Pass the open-ended answer as a URL param `open_answer` to the results page.

**File: `src/components/selfcheck/QuestionSlider.tsx**` -- No changes needed; question 8 just won't use the slider component.

---

## 3. Store open-ended answer in database

**Database migration:** Add a nullable `open_answer` column (type `text`) to `selfcheck_results`.

**File: `src/pages/ResultsPreview.tsx**`

- Read `open_answer` from URL params (pre-email) and from the DB row (post-email).
- Pass it to the edge function along with scores and archetype.
- Include it in the DB insert when saving results.

---

## 4. Redesign the results page layout

**File: `src/pages/ResultsPreview.tsx**`

Replace the current post-email layout with a new structure:

1. **Hero**: "Based on your answers, you are [TYPE]" + tagline
2. **Radar chart** with "Your shape across the five dimensions"
3. **AI-generated narrative report** (streamed) -- this is now the centerpiece. It will contain:
  - Starts with "As [TYPE], you are building toward..." (The first sentence or two is teased and displayed before it fades out and asks for email.
  - A narrative synthesis of their scores (not just "your identity is X")
  - Their open-ended answer woven in naturally
  - A dimension-by-dimension section with context for each score
  - Specific AI Salon recommendations with links
4. **Dimension breakdown cards** -- keep the collapsible score cards but move them below the narrative
5. **Recommended next steps** -- keep the salon activity CTA and secondary links
6. **Share + Download** section

The AI narrative becomes the main content instead of a small section.

---

## 5. Rewrite the edge function prompt

**File: `supabase/functions/generate-interpretation/index.ts**`

Accept a new `openAnswer` field in the request body. Rewrite the system prompt to generate a structured report:

- Accept the open-ended answer and incorporate it into the interpretation
- Generate a report with clear sections using markdown headers:
  - **Your Shape** -- narrative synthesis of the pattern across dimensions
  - **What Your Scores Reveal** -- dimension-by-dimension context (Identity Independence: X/10, what this means for you)
  - **The Thing You Haven't Started** -- respond to their open-ended answer with specific, actionable insight connecting it to their type
  - **Your Next Move** -- specific AI Salon recommendations with activity names and links (Office Hours, AI Learning Lab, Mastermind Practice Lab, Learn Out Loud)
- Use the archetype's hardcoded description, vulnerability, and salon recommendation as source material but let the AI weave them into personalized prose

**File: `src/pages/ResultsPreview.tsx**`

Update the interpretation rendering to support markdown-style headers (##) by splitting on them and rendering with appropriate styling, or use a simple markdown renderer.

---

## Technical Details

### Database migration

```sql
ALTER TABLE selfcheck_results ADD COLUMN open_answer text;
```

### Edge function request body change

```typescript
// Before
{ scores, archetype }
// After  
{ scores, archetype, openAnswer }
```

### New prompt structure (summary)

The AI will receive all the same archetype data plus the open-ended answer. The prompt will instruct it to write 6-8 paragraphs organized into the sections above, using markdown `##` headers for structure. The hardcoded archetype descriptions and salon activities serve as the "bones" that the AI personalizes.

### Results page rendering

The streamed AI text will be split on `##` headers and rendered as styled sections with coral-colored section labels, prose paragraphs, and inline links to AI Salon activities.

### Files to modify

1. `src/pages/TgrTypes.tsx` -- Remove CTA subtext
2. `src/pages/SelfCheck.tsx` -- Add open-ended question 8
3. `supabase/functions/generate-interpretation/index.ts` -- Rewrite prompt for structured report
4. `src/pages/ResultsPreview.tsx` -- Pass open answer, redesign layout, render structured AI narrative
5. Database migration -- Add `open_answer` column