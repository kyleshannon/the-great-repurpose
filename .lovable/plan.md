# Homepage Copy Refresh

## Goal
Replace the top of the homepage (hero through the section just before the 10 Repurpose Profiles) with the new, more direct narrative Kyle provided. Give visual weight to the three transformations: **Reclaim Yourself**, **Conquer AI**, and **Relaunch Yourself**.

## What stays the same
- Navigation, footer, and global styling.
- The 10 Repurpose Profiles section and everything below it (How It Works, Daily Signal teaser).
- The existing Five Stages section will remain untouched for now and refreshed in a follow-up when the new stage copy arrives.

## What changes

### 1. Hero section
- Keep the current hero image and gradient overlay treatment.
- Replace overlaid title/subtitle with the new language:
  - Title: "The Great Repurpose"
  - Subtitle: "Reclaiming Agency, Meaning, and Value in the Age of AI"
- Below the image, replace the italic opener and body paragraph with the new opening:
  - Lead: "Everything is changing when it comes to the future of work."
  - Body: the job-restructuring / layoff / babysitting-an-AI-agent framing.
  - Close the opening with the pivot question: "The real question is: 'Who am I now?'"
- Keep the primary CTA: "Get Your Repurpose Profile →"

### 2. "AI is doing for knowledge work..." section
- New cream or navy band that carries the steam-engine analogy and the four quoted fears.
- Use a typographic treatment for the fear quotes (e.g., stacked pull-quotes or a small list) so they don't feel like a wall of text.
- Transition into the "Just imagine..." opportunity framing.

### 3. Three Transformations section (new visual centerpiece)
- Three prominent cards or stacked blocks on a contrasting background:
  1. **Reclaim Yourself** — Find the human underneath the job title.
  2. **Conquer AI** — Explore and understand what AI makes possible for you.
  3. **Relaunch Yourself** — Integrate the new you with AI and introduce yourself to the world.
- Each card gets a short line from the new copy and a subtle icon or numeral.
- This section should feel like the core framework of the page.

### 4. Bridge to the 10 Profiles
- Replace the old "Name the Crisis" / "Three Faces" / "Everyone else is selling you a course" sections with the closing copy:
  - "The Great Repurpose is your catalyst for achieving success in this new era."
  - The "Whole You, Amplified by AI" line.
  - "We've created 10 Repurpose Profiles..."
  - Finish the trailing CTA sentence: "Find out which Repurpose Profile you are by answering a handful of very simple questions."
- End with the same "Get Your Repurpose Profile →" CTA that currently sits above the profiles grid.

### 5. Stages section (pending)
- Leave the existing "The Great Repurpose: Five stages of finding your way through" section in place.
- Add a TODO comment in `src/pages/Index.tsx` marking it for replacement when the new stage copy arrives.

## Files to edit
- `src/pages/Index.tsx` — primary rewrite.
- `mem://features/homepage-content` — update to reflect the new section order and copy source.

## Out of scope
- No changes to the Self-Check assessment, report, archetypes, or backend.
- No new images or assets unless the existing hero image is already suitable.
