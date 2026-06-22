## Goal

Restructure how the 10 Great Repurpose Profiles are presented so they reflect the new grouping from your slide:

- **Identity Seekers** — The Unlocker, The Awakener, The Explorer
- **Direction Finders** — The Firestarter, The Translator, The Original
- **Builders in Motion** — The Compass, The Architect, The Catalyst
- **The Amplifier** — standalone capstone (you've done all five; next step is generosity)

This grouping becomes the spine of how profiles are introduced everywhere — not just a visual tweak on one page.

## Changes by location

### 1. `/types` page (`src/pages/TgrTypes.tsx`) — primary redesign

- Replace the flat 2-column grid with **three labeled category sections**, each with a short intro line, followed by its 3 profile cards.
  - Section header: large serif group name (e.g. "Identity Seekers") with a one-sentence description of what unites the group.
  - Cards keep current styling but inherit a group accent color so each band feels cohesive.
- Below the three groups, add a **visually separated capstone band** for The Amplifier — full-width card with a "Capstone" eyebrow, signaling it stands apart as the destination.
- Update the hero intro to name the structure: "Ten profiles, organized into three stages of the journey — plus one that's already leading the way."
- Card copy stays as-is; only structure changes.

### 2. Homepage Profiles section (`src/pages/Index.tsx`, ~lines 347-389)

- Replace the flat constellation of 10 names with a **compact 3-column preview** mirroring the slide:
  - Each column shows the group name + the 3 profile names underneath.
  - The Amplifier appears as a single highlighted line below the three columns.
- Update the lead-in paragraph to: "Ten profiles across three stages — Identity Seekers, Direction Finders, and Builders in Motion — plus a capstone for those already pulling others forward."
- CTA button and microcopy unchanged.

### 3. Report / archetype context (`src/lib/archetypes.ts` + `src/pages/ResultsPreview.tsx`)

- Add a `category` field to each archetype: `"identity-seekers" | "direction-finders" | "builders-in-motion" | "capstone"`.
- Export a `categories` map with group name, tagline, and one-sentence description.
- **Update the report headline** to lead with the group, then the specific profile. Examples:
  - "You're a Direction Finder. Specifically: **The Translator**."
  - "You're a Builder in Motion. Specifically: **The Architect**."
  - For The Amplifier: "You're at the capstone. **The Amplifier**." (no "Specifically:" — it stands alone)
- Add a short one-sentence description of the group directly under the headline, so readers immediately grasp what their stage means before diving into their specific profile.
- No scoring or `matchArchetype` logic changes.

### 4. `public/llms.txt`

- Update the Types page description to mention the 3-category structure plus Amplifier capstone.

## Out of scope

- No changes to assessment questions, scoring, or matching logic.
- No changes to per-archetype copy (taglines/descriptions already match your slide).
- No new images generated.
