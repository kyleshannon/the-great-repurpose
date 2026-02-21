# Results Report Overhaul + Session Navigation

## Overview

Nine changes to improve the assessment results page, edge function prompt, and navigation experience.

---

## 1. Radar chart labels -- use full stage names

Update `chartData` labels from abbreviated ("Identity", "Value", etc.) to full stage names:

- "Unhook Identity"
- "Reclaim Value"
- "Find Your Purpose"
- "Discover AI"
- "Create with AI"

This applies to both the pre-email and post-email radar charts in `ResultsPreview.tsx`.

---

## 2. Report starts with "As [TYPE]..." text

When the full report is revealed after email submission, the AI-generated narrative section will be prefaced with the archetype's "As [TYPE], you're building toward..." tagline text, followed immediately by the streamed AI content.

---

## 3. Progress indicator while generating

Add a visible progress state with animated indicator and copy like "Writing your report..." that shows while the AI text is streaming. This replaces the bare blinking cursor with something more informative and reassuring.

---

## 4. Rename "Your Shape" to "Where You Stand"

Update the edge function prompt to use "Where You Stand" instead of "Your Shape" as the first section header. This is clearer and doesn't reference the graph.

---

## 5. Start generating before email submission

Begin streaming the AI interpretation as soon as scores are calculated (pre-email), storing it in state. When the user submits their email, the report is already generated (or nearly so) and displays instantly. If the user submits email before generation finishes, the report continues streaming visibly with the progress indicator.

---

## 6. PDF download + shareable summary

**PDF**: Already exists but will benefit from the improved layout.

**Share card**: Create a condensed shareable text block that includes:

- "I'm [TYPE]. [Tagline]"
- AI Salon recommendation
- A brief pitch for The Great Repurpose + link to the self-check

This improves the existing copy-link, LinkedIn, and X share flows with better copy.

---

## 7. Add community context before AI Salon recommendations

Replace the current "Your Path Forward" section header with a warmer lead-in:

> "Making this transition on your own isn't the move. You should be in community -- and based on where you are right now, here are some things from the AI Salon you may find valuable."

This provides the "why" before listing the activities.

---

## 8. Short descriptions for each AI Salon activity

Expand the secondary recommendations section so every AI Salon activity has a meaningful one-liner:

- **Friday Office Hours**: Show up, ask questions, meet others navigating the same shift. Low-pressure, high-value. Weekly.
- **AI Learning Lab**: Kyle Shannon's nightly LIVE sessions exploring AI, complete with Champ the Singing Dog -- no prior experience required.
- **Mastermind Practice Lab**: Peer-driven accountability for people creating a daily practice around how they use AI.
- **Learn Out Loud**: LOL sessions are taught by community members for community members. Learn or lead!
- **Free AI Salon Community**: The always-on conversation. Connect with others exploring AI and practicing the Cycle of AI Readiness.
- **AI Readiness Project Podcast**: Conversations about what it means to be ready for AI, and a chance to meet inspiring people making a difference in AI.

---

## 9. Session-based "Back to Your TGR Report" nav link

After a user completes their assessment and lands on the results page, a temporary "Your TGR Report" link appears in the top navigation bar. It persists for the browser session using `sessionStorage` and disappears when the tab/browser is closed.

- When the results page loads with a valid result ID, the URL is saved to `sessionStorage` (key: `tgr_report_url`).
- The Navigation component reads this on mount and renders the link when the user is NOT already on the results page.
- Styled distinctly (coral text) to stand out from regular nav links.
- Appears in both desktop and mobile navigation.

---

## Technical Details

### Files to modify

1. `**src/pages/ResultsPreview.tsx**`
  - Change `chartData` labels to full stage names (both pre/post email)
  - Move AI streaming to start on mount (pre-email), store result in state
  - On email submit, reveal the already-generated report
  - Add progress indicator ("Writing your report...") during streaming
  - Prepend "As [TYPE], you're building toward..." before AI narrative
  - Rewrite "Your Path Forward" section with community context intro
  - Expand secondary recommendations with full descriptions
  - Save result URL to `sessionStorage` when result ID is set
2. `**supabase/functions/generate-interpretation/index.ts**`
  - Rename "Your Shape" to "Where You Stand" in the system prompt
3. `**src/components/Navigation.tsx**`
  - Read `sessionStorage.getItem("tgr_report_url")` on mount
  - Conditionally render "Your TGR Report" link when URL exists and user is not already on that page

### Flow change (pre-generation)

```text
Current:  Scores -> Show teaser -> Email -> Save -> Stream AI -> Display
Proposed: Scores -> Start streaming AI in background -> Show teaser -> Email -> Save -> Display already-generated text
```

### No database changes required

The `open_answer` column and all other schema changes are already in place.