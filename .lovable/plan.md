## Goal
Rename the public-facing section name from "TGR Signals" to "Daily Signal" everywhere it appears in the UI, SEO metadata, RSS feed, and Codex schema documentation.

## Changes

### Navigation & Footer
- **src/components/Navigation.tsx**: Change nav link label from `Signals` to `Daily Signal`.
- **src/components/Footer.tsx**: Change footer link label from `TGR Signals` to `Daily Signal`.

### Archive page (src/pages/Signals.tsx)
- Page `<title>` and `<h1>`: "The Great Repurpose Signals" → "The Great Repurpose Daily Signal" (or shorter if it reads better).
- Meta `og:title`, meta description, canonical references: update branding.
- Section heading "Signal Archive" and body copy: replace "Signal" references with "Daily Signal" where it refers to the section brand.

### Detail page (src/pages/SignalDetail.tsx)
- `<title>` suffix: "TGR Signals" → "Daily Signal".
- Breadcrumb link text: "TGR Signals" → "Daily Signal".
- Meta `og:title` suffix: "TGR Signals" → "Daily Signal".

### Homepage teaser (src/components/SignalTeaser.tsx)
- Label "Latest TGR Signal" → "Latest Daily Signal".
- CTA link text "Browse the full Signal archive" → "Browse the full Daily Signal archive".

### RSS feed (scripts/build-signals-rss.mjs + public/signals.xml)
- RSS `<title>`: "TGR Signals — The Great Repurpose" → "Daily Signal — The Great Repurpose".
- Regenerate `public/signals.xml` so the built file matches.

### Codex schema doc (public/signals/SCHEMA.md)
- Title and all "TGR Signals" references updated to "Daily Signal" so Codex uses the correct terminology going forward.

## Out of scope
- URL paths (`/signals`, `/signals/:slug`) remain unchanged to avoid breaking links and SEO.
- Internal code variable names (`SignalIndexEntry`, `fetchSignal`, etc.) stay as-is.
- JSON data fields and story titles inside `public/signals/*.json` are not modified.

## Acceptance
- Every visible user-facing mention of "TGR Signals" or the nav label "Signals" reads "Daily Signal".
- RSS feed title matches.
- SCHEMA.md uses the new name for Codex instructions.
- Build passes and pages render correctly.