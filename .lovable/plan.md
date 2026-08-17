# Homepage Copy Refresh + Brand Rebrand

## Goal
Two connected changes:
1. Replace the top of the homepage (hero through the section just before the 10 Repurpose Profiles) with the new, more direct narrative copy.
2. Adopt the new brand system from the moodboard — new palette, typography, and component styling — sitewide.

## Part A: New Brand System (from moodboard)

The current site runs a dark olive-black + sage green system. The moodboard replaces it with a light, high-contrast, editorial system.

### Color tokens (replace in `src/index.css` and `tailwind.config.ts`)

| Role | Name | Hex | Meaning |
|---|---|---|---|
| Primary | Electric Indigo | `#3747E5` | Trust, vision, future |
| Primary | Aqua | `#44C9C2` | Clarity, flow, renewal |
| Secondary | Orchid | `#8F3DDF` | Imagination, depth |
| Secondary | Citrus | `#FFB55A` | Optimism, energy |
| Secondary | Poppy | `#FF7056` | Courage, momentum |
| Background | Soft White | `#FCFAFE` | Space, balance, calm |
| Text | Aubergine-Black | `#1B2034` | Authority, clarity, depth |

- Default page background flips from dark olive to Soft White, with Aubergine-Black as the primary text color.
- Dark sections (hero, quote blocks, nav) use Aubergine-Black backgrounds with Soft White text.
- Coral/sage tokens get retired. `--coral` maps to Poppy or Indigo depending on context; all existing `text-coral` / `bg-coral` / `border-coral` usages resolve through the token so no component markup breaks.
- Every value stays HSL in CSS variables per the existing pattern.

### Typography
- Headings: PP Neue Montreal (bold, expressive, editorial). Fallback stack if the licensed font isn't available: a close geometric grotesque via Google Fonts (e.g. Archivo or Space Grotesk) until font files are provided.
- Body: Halyard Display (medium, clean, readable). Fallback: Figtree or DM Sans.
- Replaces the current Inter + serif pairing. The current `font-serif` usage on headings gets remapped to the new display face.

### Components restyled to match the moodboard
- **Navigation**: dark Aubergine bar, uppercase small-caps links, Aqua pill CTA, active-link underline in Aqua.
- **CTA buttons**: three variants — filled Indigo (primary), filled Aqua (secondary), outlined Aubergine (tertiary). All pill-shaped with a trailing arrow.
- **Quote block**: large Aqua quotation mark, Soft White card, short Aqua rule under the text.
- **Stage modules**: numbered `01`–`05` in Indigo, italic tagline, paired portrait image, light card on Soft White.
- **Cards (Daily Signal, profiles)**: light card, thin border, image right or top, "Read more →" link.
- Retire the `constellation-bg` texture in favor of clean flat color bands and image-backed color panels.

### Five Stages icon/color mapping (from the moodboard)
1. Unhook Identity — Indigo
2. Reclaim Value — Aqua
3. Find Your Purpose — Orchid
4. Discover AI's Power — Citrus
5. Build What's Next — Poppy

Note: the moodboard renames stage 5 to "Build What's Next" (currently "Start Creating"). Confirm before renaming, since stage names appear in the assessment, the AI report prompt, and the PDF.

### Photography
New photography is coming. Until it lands, keep the existing hero image and leave image slots in the new components sized and positioned per the moodboard, so swapping in the new shots is a file replacement, not a layout change.

## Part B: Homepage Copy Rewrite

### What stays
- The 10 Repurpose Profiles section and everything below it (How It Works, Daily Signal teaser) — restyled to the new brand, copy unchanged.
- The Five Stages section stays in place for now; new stage copy is coming separately.

### 1. Hero
- Keep the hero image with the new dark-overlay treatment.
- Title: "The Great Repurpose"
- Subtitle: "Reclaiming Agency, Meaning, and Value in the Age of AI"
- Below the image, replace the italic opener and body with the new opening: "Everything is changing when it comes to the future of work," the layoff / rewritten-resume / babysitting-an-AI-agent framing, closing on "The real question is: 'Who am I now?'"
- Primary CTA: "Get Your Repurpose Profile →" in Indigo.

### 2. "Steam engine for knowledge work"
- New band carrying the steam-engine analogy and the four fear quotes ("AI will take my job," etc.), set as stacked pull-quotes rather than a paragraph.
- Turns into the "Just imagine..." opportunity framing: be excellent at anything, become a ten-person team, start the business you've dreamed of.

### 3. Three Transformations (new visual centerpiece)
Three prominent cards on a color-blocked panel, one accent color each:
1. **Reclaim Yourself** (Indigo) — Find the human underneath the job title.
2. **Conquer AI** (Aqua) — Explore what AI makes possible for you.
3. **Relaunch Yourself** (Poppy) — Integrate the new you, amplify your value, introduce yourself to the world.

Followed by the force-multiplier line: your judgment is more scalable, your creativity more expansive, ideas that once required a team now fit in your hands.

### 4. Bridge to the 10 Profiles
Replaces the current "Name the Crisis," "Three Faces of Disruption," and "Everyone else is selling you a course" sections:
- "The Great Repurpose is your catalyst for achieving success in this new era."
- "This is not a self-help program. This is not 'learn AI or get left behind.'"
- The "Whole You, Amplified by AI" line introducing the 10 Repurpose Profiles.
- Closing CTA line: "Find out which Repurpose Profile you are by answering a handful of very simple questions."

## Files to edit
- `src/index.css` — new color tokens, font imports, base styles.
- `tailwind.config.ts` — new color names and font families.
- `src/pages/Index.tsx` — homepage rewrite.
- `src/components/Navigation.tsx`, `src/components/Footer.tsx`, `src/components/SignalTeaser.tsx` — restyle to the new system.
- Remaining pages (`Phases`, `TgrTypes`, `About`, `SelfCheck`, `ResultsPreview`, `Signals`) — inherit the token changes; spot-fix any hardcoded styling that breaks.
- `mem://style/visual-direction` and `mem://features/homepage-content` — update to the new brand and section order.

## Out of scope
- No changes to the assessment scoring, archetype matching, or backend.
- Stage 5 rename and new stage copy held for a follow-up.
