# Rebrand + Homepage Rewrite + New Photography

This extends the already-approved plan (Homepage Copy Refresh + Brand Rebrand) with the photography now uploaded. Everything below is the full scope of the build.

## Part A: Brand system (from the moodboard)

### Color tokens — replace in `src/index.css` and `tailwind.config.ts`

| Role | Name | Hex |
|---|---|---|
| Primary | Electric Indigo | `#3747E5` |
| Primary | Aqua | `#44C9C2` |
| Secondary | Orchid | `#8F3DDF` |
| Secondary | Citrus | `#FFB55A` |
| Secondary | Poppy | `#FF7056` |
| Background | Soft White | `#FCFAFE` |
| Text | Aubergine-Black | `#1B2034` |

- Page background flips from dark olive to Soft White; body text becomes Aubergine-Black.
- Dark bands (hero, quote blocks, nav) use Aubergine-Black with Soft White text.
- Legacy `--coral` / `--sage` tokens are remapped to the new palette so existing `text-coral` / `bg-coral` classes keep resolving while markup is migrated.
- All values stay HSL in CSS variables, matching the existing pattern.

### Typography
- Headings: PP Neue Montreal (bold, editorial). Google-font fallback until licensed files are provided.
- Body: Halyard Display (medium, clean). Fallback: Figtree.
- Replaces the current Inter + serif pairing.

### Components restyled
- **Navigation**: Aubergine bar, uppercase tracked links, Aqua pill CTA.
- **CTA buttons**: filled Indigo (primary), filled Aqua (secondary), outlined Aubergine (tertiary) — all pill-shaped with a trailing arrow.
- **Quote block**: oversized Aqua quotation mark, Soft White card, short Aqua rule.
- **Stage modules**: numbered `01`–`05` in the stage's accent color, italic tagline, paired portrait.
- **Cards**: light card, thin border, image top or right, "Read more →" link.
- Retire `constellation-bg` in favor of flat color bands and image-backed color panels.

### Five Stages color mapping
1. Unhook Identity — Indigo
2. Reclaim Value — Aqua
3. Find Your Purpose — Orchid
4. Discover AI's Power — Citrus
5. Start Creating — Poppy

(The moodboard renames stage 5 to "Build What's Next." Holding that rename until confirmed, since the name appears in the assessment, the AI report prompt, and the PDF.)

## Part B: Photography

All ten uploads share the same visual language — intimate editorial portraits shot through vivid bokeh in exactly the brand palette. They become the site's image system.

### Hero
The group portrait (older woman with silver hair, faces around her in hot pink / green / orange) replaces the current hero image. It's the strongest match for "a movement for human potential in the age of AI."

### Editorial placements
- **Woman in glasses at a wall of pinned images** → the "Reclaim Yourself" transformation card.
- **Woman in glasses lit by pink/green screen glow** → the "Conquer AI" card.
- **Bearded man in knit cap drawing at his desk** → the "Relaunch Yourself" card.
- **Man in his 30s writing through pink/teal bokeh** → the "steam engine / Just imagine" band.
- **Woman with a colleague blurred behind her** → the Five Stages section.
- **Woman resting her chin on her hand** → the 10 Repurpose Profiles intro.
- **Asian woman in a studio with green and magenta light** → the Daily Signal teaser.
- **Black man at a laptop, teal rim light** → the "Who am I now?" moment in the hero copy block.
- **Silver-haired person in profile against rainbow bokeh** → the About page and quote-block pairing.

### Technical handling
- Every image goes to CDN storage via the assets pipeline as a `.asset.json` pointer, not committed as a binary. Keeps the repo light and delivery fast.
- Each image gets descriptive alt text, `loading="lazy"` (except the hero, which stays `fetchPriority="high"` with a preload link), and explicit aspect ratios to prevent layout shift.
- The old `public/images/hero.png` is removed once the new hero is wired up.

## Part C: Homepage copy rewrite

Replaces everything from the hero down to the 10 Profiles section. The Profiles section and below (How It Works, Daily Signal) keep their copy and get restyled.

1. **Hero** — new group portrait, title "The Great Repurpose," subtitle "Reclaiming Agency, Meaning, and Value in the Age of AI." Below it: "Everything is changing when it comes to the future of work," the layoff / rewritten-resume / babysitting-an-AI-agent framing, landing on "The real question is: 'Who am I now?'" Indigo CTA.

2. **Steam engine band** — the knowledge-work analogy, the four fear quotes ("AI will take my job," etc.) set as stacked pull-quotes, then the "Just imagine..." turn: be excellent at anything, become a ten-person team, start the business you've dreamed of.

3. **Three Transformations** — the visual centerpiece, three photo-led cards:
   - **Reclaim Yourself** (Indigo) — find the human underneath the job title.
   - **Conquer AI** (Aqua) — explore what AI makes possible for you.
   - **Relaunch Yourself** (Poppy) — integrate the new you, amplify your value, introduce yourself to the world.
   Followed by the force-multiplier line about scalable judgment and expansive creativity.

4. **Bridge to the Profiles** — replaces "Name the Crisis," "Three Faces of Disruption," and "Everyone else is selling you a course." Carries the catalyst line, the "not a self-help program" line, the "Whole You, Amplified by AI" framing, and closes with "Find out which Repurpose Profile you are by answering a handful of very simple questions."

The Five Stages section stays in place with current copy, restyled to the new palette, pending the new stage copy.

## Files to edit
- `src/index.css`, `tailwind.config.ts` — tokens, fonts, base styles.
- `src/assets/*.asset.json` — new CDN pointers for the ten photographs.
- `src/pages/Index.tsx` — homepage rewrite.
- `src/components/Navigation.tsx`, `Footer.tsx`, `SignalTeaser.tsx` — restyle.
- `src/pages/Phases.tsx`, `TgrTypes.tsx`, `About.tsx`, `SelfCheck.tsx`, `ResultsPreview.tsx`, `Signals.tsx`, `SignalDetail.tsx` — inherit tokens, spot-fix anything that breaks against a light background.
- `index.html` — hero preload swap.
- `mem://style/visual-direction`, `mem://features/homepage-content` — record the new brand and section order.

## Out of scope
- Assessment scoring, archetype matching, and backend logic are untouched.
- Stage 5 rename and new stage copy held for a follow-up.
