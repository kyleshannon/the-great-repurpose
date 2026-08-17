# Rebrand + Homepage Rewrite + New Photography

This extends the already-approved plan (Homepage Copy Refresh + Brand Rebrand) with the photography now uploaded. Everything below is the full scope of the build.

## Part A: Brand system (from the brand board)

### Color tokens — replace in `src/index.css` and `tailwind.config.ts`

| Role | Name | Hex | Meaning |
|---|---|---|---|
| Primary | Electric Indigo | `#192EEB` | Trust · Vision · Future |
| Primary | Aqua | `#06B5B2` | Clarity · Flow · Renewal |
| Secondary | Orchid | `#8D51C7` | Imagination · Depth |
| Secondary | Citrus | `#ECB626` | Optimism · Energy |
| Secondary | Poppy | `#FA4B35` | Courage · Momentum |
| Background | Soft White | `#F4F3F3` | Space · Balance · Calm |
| Text | Aubergine-Black | `#010F32` | Authority · Clarity · Depth |

- Page background flips from dark olive to Soft White; body text becomes Aubergine-Black.
- Dark bands (hero, quote blocks, nav) use Aubergine-Black with Soft White text.
- Legacy `--coral` / `--sage` tokens are remapped to the new palette so existing `text-coral` / `bg-coral` classes keep resolving while markup is migrated.
- All values stay HSL in CSS variables, matching the existing pattern.

### Typography
- Headings: PP Neue Montreal (bold, expressive, editorial). Google-font fallback until licensed files are provided.
- Body: Halyard Display (medium, clean, readable). Fallback: Figtree.
- Replaces the current Inter + serif pairing.

### Components restyled
- **Navigation**: Aubergine bar, uppercase tracked links, Aqua pill CTA.
- **CTA buttons**: filled Indigo ("Get Your Repurpose Profile →"), filled Aqua ("Start Free Assessment →"), outlined Aubergine ("Explore The Five Stages →") — all pill-shaped, uppercase, trailing arrow.
- **Quote block**: oversized Aqua quotation mark, Soft White card, short Aqua rule.
- **Stage modules**: numbered `01`–`05` in the stage's accent color, italic tagline, paired portrait.
- **Cards**: light card, thin border, image right, "Read more →" link.
- **Color-in-application panels**: full-bleed color blocks with a portrait alongside, icon + short meaning line.
- Retire `constellation-bg` in favor of flat color bands and image-backed color panels.

### Brand icons
The board's five marks — imagination (burst), possibility (infinity loop), creativity (circle-in-square), discovery (eye), human guts (heart) — get built as inline SVG components and reused on the stage modules and color panels.

### Five Stages — new names, taglines, colors
1. **Unhook Identity** — "I'm not my job." — Indigo
2. **Reclaim Value** — "Here's Who I Am." — Aqua
3. **Discover Purpose** — "What matters to me." — Orchid
4. **Become AI Ready** — "Understand AI's power to amplify your ideas." — Citrus
5. **Relaunch Yourself** — "Turn who you are into work, opportunity, and income." — Poppy

These names now replace the current stage copy everywhere it appears: the Phases page, the homepage stages section, the assessment, the AI report prompt, and the PDF export.

## Part B: Photography

Eighteen uploads now share the same visual language — intimate editorial portraits shot through vivid bokeh in exactly the brand palette. They become the site's image system.

### Hero
The group portrait (older woman with silver hair, faces around her in hot pink / green / orange) replaces the current hero image. It's the strongest match for "a movement for human potential in the age of AI."

### Editorial placements
- **Man seen from behind at a wall of pinned images** → opening of the "Who am I now?" block; the back-turned figure reads as the moment before the turn.
- **Young Black man at a laptop, magenta/teal light, hand at temple** → the layoff / rewritten-resume framing.
- **Woman at a desk in the evening with handwritten pages** → the "something just isn't right" moment.
- **Two people seated close in serious conversation** → the "not a self-help program" bridge line.
- **Woman in her 40s leaning over a worktable of prints** → "Reclaim Yourself" card.
- **Two professionals side by side at a screen (pink/teal hair, bearded man)** → "Conquer AI" card.
- **Two professionals leaning over a large table of colorful work** → "Relaunch Yourself" card.
- **Small group of three around a laptop through heavy bokeh** → the Five Stages section.
- **Woman in glasses at a wall of pinned images** → the "steam engine / Just imagine" band.
- **Woman resting her chin on her hand** → the 10 Repurpose Profiles intro.
- **Asian woman in a studio with green and magenta light** → the Daily Signal teaser.
- **Silver-haired person in profile against rainbow bokeh** → the About page and quote-block pairing.
- Remaining portraits held as a library for the Profiles pages, Phases page, and section dividers.

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

The Five Stages section is rewritten with the new stage names, taglines, and accent colors.

## Files to edit
- `src/index.css`, `tailwind.config.ts` — tokens, fonts, base styles.
- `src/assets/*.asset.json` — new CDN pointers for the eighteen photographs.
- `src/components/BrandIcons.tsx` — new inline SVG icon set.
- `src/pages/Index.tsx` — homepage rewrite.
- `src/components/Navigation.tsx`, `Footer.tsx`, `SignalTeaser.tsx` — restyle.
- `src/pages/Phases.tsx` and the stage copy in the assessment, report prompt, and PDF — new stage names and taglines.
- `src/pages/TgrTypes.tsx`, `About.tsx`, `SelfCheck.tsx`, `ResultsPreview.tsx`, `Signals.tsx`, `SignalDetail.tsx` — inherit tokens, spot-fix anything that breaks against a light background.
- `index.html` — hero preload swap.
- `mem://style/visual-direction`, `mem://features/homepage-content` — record the new brand, stage names, and section order.

## Out of scope
- Assessment scoring and archetype matching logic are untouched; only stage-name strings change.
