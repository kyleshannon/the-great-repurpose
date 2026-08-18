# Homepage: hero fix, drop Three Transformations, rebuild the Five Stages

## 1. Hero — full bleed, smaller tagline
- Make the hero section truly full-bleed edge to edge (no container padding constraining it) so the photograph spans the entire browser width.
- Lighten the overlay so more of the photograph reads through: gradient weighted to the bottom-left instead of a full-height wash.
- Shrink and left-align the text block: headline steps down (roughly `text-4xl md:text-5xl lg:text-6xl`), supporting paragraph narrower, all constrained to a left column (~max-w-xl) sitting in the lower-left, leaving the right side of the image open.
- Keep the copy as-is: eyebrow, "You weren't meant to be replaced. / You were meant to Repurpose.", the movement line, and the Indigo CTA.

## 2. Remove the Three Transformations section
- Delete Section 4 entirely (cards for Reclaim Yourself, Conquer AI, Relaunch Yourself), along with its data array and now-unused image imports.
- Keep the closing lines that still earn their place — "AI is a force multiplier for people who know what matters." and the scalable judgment / expansive creativity line — moved to the end of the steam-engine band so the argument doesn't lose its landing.

## 3. Rewrite the bridge headline
- "It's a map for the moment you're in." becomes a headline that names the framework directly. Proposed: **"The Five Stages of The Great Repurpose"** with the eyebrow "This is not a self-help program" retained above it.

## 4. Five Stages as full-width editorial rows
- Replace the two-column card grid with five full-browser-width rows, one per stage.
- Each row: a small photograph (roughly one-third width, fixed aspect) beside the stage number, name, tagline, and description. Photos alternate left / right down the page for editorial rhythm.
- Alternating bands of Soft White and a faint tint of the stage's accent color so each row reads as its own block.
- The whole row stays a link to the matching anchor on the Phases page; hover lifts the accent color.
- Photo assignments from the existing library:
  1. Unhook Identity (Indigo) — person seen from behind
  2. Reclaim Value (Aqua) — woman at the worktable of prints
  3. Discover Purpose (Orchid) — woman at her desk in the evening
  4. Become AI Ready (Citrus) — two professionals at a screen
  5. Relaunch Yourself (Poppy) — two professionals over a table of work
- The "Explore The Five Stages →" image CTA band stays below the rows.

## Files to edit
- `src/pages/Index.tsx` — all four changes.

## Out of scope
- Phases page, assessment, and profiles copy are untouched.
