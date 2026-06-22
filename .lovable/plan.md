## Recommendation on the data source

Codex's current approach (typed `src/data/signals.ts`) works but has friction: every daily update is a TS edit with escape/syntax risk, and every story re-compiles the whole bundle. I recommend keeping Codex's pages but moving the **data** out of TypeScript and into JSON files under `public/signals/`. Codex's job becomes: write one JSON file per day + update an index — no TS, no schema fights, no rebuild risk. The site fetches at runtime, Lovable's GitHub sync auto-deploys on Codex's commit, and you can hand-edit a signal in seconds if needed.

I considered a Cloud DB + edge function (Codex POSTs JSON, live updates with no commit). It's more powerful but adds an API key, an admin surface, and removes git history of what was published. For a daily editorial briefing, version-controlled JSON is the better fit. We can graduate to DB later if you ever want non-Codex editors.

## Phase 1 — Merge as-is

1. Merge `origin/codex/tgr-signal-section` into main. Branch is additive (6 files, no conflicts on the files I checked).
2. Fix the one shipped bug: `Signals.tsx` and `SignalDetail.tsx` import `getSignalBySlug` from `@/data/signals`, but that helper isn't exported in the seed file — detail page would 404 on every slug. Add it (one-line export) so the merged state actually works.

Outcome: `/signals` and `/signals/:slug` go live on the navy/cream/coral theme with the seeded data.

## Phase 2 — Make Codex's daily update painless

3. **Move data to `public/signals/`:**
   - `public/signals/index.json` — array of `{ slug, date, title, pattern, stages, imageUrl }` for the archive list, newest first.
   - `public/signals/<slug>.json` — full `TgrSignal` (pattern, stages, 5 stories with summaries, images, key points).
4. **Refactor pages to fetch:**
   - `Signals.tsx` — fetch `/signals/index.json` once, render list. Loading + empty states.
   - `SignalDetail.tsx` — fetch `/signals/<slug>.json` from the URL param. 404 state if fetch fails.
5. **Delete `src/data/signals.ts`** once both pages are migrated.
6. **Write `public/signals/SCHEMA.md`** — the contract Codex follows: file naming (`YYYY-MM-DD-kebab-title.json`), required fields, canonical stage names, image URL rules, how to update `index.json` (prepend new entry, keep sorted desc). This is the single doc you point Codex at.

## Phase 3 — Polish

7. **Per-page SEO** via `react-helmet-async` (already in the head-meta playbook): unique `<title>`, description, canonical, `og:title/url/image` on both `/signals` and each `/signals/:slug`. Use the signal's `imageUrl` as `og:image`. Add `Article` JSON-LD on detail pages.
8. **Homepage Signal teaser** — a "Latest Signal" card on `Index.tsx` that fetches `index.json` and links to the most recent briefing. Slots in above or below the existing journey section (will check the homepage structure before placing).
9. **RSS feed** — `public/signals.xml` generated at build time from `index.json`, or a small Node prebuild script. Add `<link rel="alternate" type="application/rss+xml">` in `index.html`.
10. **Footer + Navigation** already wired by Codex — leave as-is.

## Technical notes

- The `2026` dates in the seed are placeholders from Codex; the schema doc will specify ISO dates as the source of truth.
- Pages already use `Navigation`, `Footer`, `ScrollFadeUp` and the project's `navy / cream / coral` tokens — consistent with the rest of the site.
- `Signals.tsx` uses a native `<select>` for sort. Project memory forbids native range inputs but allows native selects; leaving as-is.
- Detail page links each stage chip back to `/signals` (no stage param). I'll wire `?stage=<name>` so chip clicks land on a filtered archive.
- Two seeded entries share the title "AI Moves Into The Workday" — the slug includes the date so routing is fine, but I'll flag duplicates in the schema doc.

## Files touched

- New: `public/signals/index.json`, `public/signals/<slug>.json` (×4 seeded), `public/signals/SCHEMA.md`, `public/signals.xml`
- Edited: `src/pages/Signals.tsx`, `src/pages/SignalDetail.tsx`, `src/pages/Index.tsx` (teaser), `src/main.tsx` (HelmetProvider if not already wired), `index.html` (RSS link), `mem://index.md` + a new `mem://features/tgr-signals` memory
- Deleted: `src/data/signals.ts`
