# Daily Signal — data schema for Codex

The Daily Signal section reads its data from JSON files in this folder. To
publish a new daily briefing, **write two files and commit**. No TypeScript
edits, no build steps. Lovable's GitHub sync auto-deploys on push.

## Files Codex writes each day

1. `public/signals/<slug>.json` — the full briefing (pattern + 5 stories).
2. `public/signals/index.json` — prepend a new entry so the archive lists
   it. Keep the array sorted by `date` descending.

## Built-in fallback thumbnail

Every archive card must have an image. If none of the selected stories has a
usable article image, set the briefing-level `imageUrl` and the matching
`index.json` entry `imageUrl` to this real JPG asset:

```text
/signals/tgr-signal-thumbnail.jpg
```

Use a real story image when one is available. Use the fallback only when the
selected five stories do not provide a usable image. Do not replace this with
an SVG or generated vector substitute.

## Slug rules

- Format: `YYYY-MM-DD-kebab-title` (e.g. `2026-06-18-ai-moves-into-the-workday`).
- Date prefix is required and must match the `date` field inside the file.
- If two days share the same title, the date prefix keeps slugs unique. Do
  not reuse a slug.

## `<slug>.json` shape

```json
{
  "slug": "2026-06-18-ai-moves-into-the-workday",
  "date": "2026-06-18",
  "title": "AI Moves Into The Workday",
  "pattern": "Two–three sentences naming the pattern of the day. This becomes the pull-quote on the detail page.",
  "stages": ["Unhook Identity", "Reclaim Value"],
  "imageUrl": "https://example.com/hero.jpg",
  "stories": [
    {
      "title": "Story headline",
      "url": "https://source.example.com/article",
      "source": "source.example.com",
      "published": "2026-06-18T11:00:00+00:00",
      "summary": "Required 1–3 sentence overview in The Great Repurpose voice.",
      "imageUrl": "https://source.example.com/hero.jpg",
      "stages": ["Reclaim Value"],
      "keyPoints": ["Required bullet", "Required bullet"]
    }
  ],
  "sourceStatus": "generated"
}
```

### Field rules

| Field | Required | Notes |
| --- | --- | --- |
| `slug` | yes | Matches the filename (without `.json`). |
| `date` | yes | ISO date `YYYY-MM-DD`. Renders as the briefing date. |
| `title` | yes | 4–9 words. Used in `<h1>`, OG title, archive card. |
| `pattern` | yes | The "Pattern of the Day". Plain text, ~2–3 sentences. Must synthesize the actual five selected stories for that date. Do not use reusable framing copy, canned templates, or a pattern that duplicates any other issue. |
| `stages` | yes | 1–5 entries. Must match the canonical names below exactly. Derive from the five story `stages`, order by relevance/frequency for that day, and never default to the full canonical list unless all five stages are genuinely represented. |
| `imageUrl` | yes | Used as the OG share image and archive card image. Use the strongest story image, or `/signals/tgr-signal-thumbnail.jpg` if no selected story has a usable image. Do not leave empty. |
| `stories` | yes | Exactly **5** entries. Fewer renders but looks sparse. |
| `stories[].summary` | yes | 1–3 sentences in The Great Repurpose voice. Direct, human, concrete. No empty strings. |
| `stories[].keyPoints` | yes | 2–3 bullets that make the story scannable. No empty arrays. |
| `stories[].stages` | yes | 1–2 canonical TGR stages per story. No empty arrays. |
| `stories[].imageUrl` | optional | Story-level article image when available. Empty string allowed. Do not use the fallback here unless the story itself needs a visible thumbnail in a future UI. |
| `stories[].published` | recommended | ISO date/time when available. Empty string allowed only if unavailable. |
| `sourceStatus` | optional | Internal provenance marker. Not displayed. |

### Canonical stage names (case-sensitive, exact match)

- `Unhook Identity`
- `Reclaim Value`
- `Find Your Purpose`
- `Discover AI's Power`
- `Start Creating`

Any other string is silently dropped from filters.

## `index.json` shape

A JSON array, newest entry first. Each entry is a subset of the full
file — Codex must keep these in sync. The archive card displays the full
`stages` list from this file, so the `index.json` `stages` must exactly match
the same briefing-level `stages` array in `<slug>.json`.

```json
[
  {
    "slug": "2026-06-18-ai-moves-into-the-workday",
    "date": "2026-06-18",
    "title": "AI Moves Into The Workday",
    "pattern": "Two–three sentences…",
    "stages": ["Unhook Identity", "Reclaim Value"],
    "imageUrl": "https://example.com/hero.jpg"
  }
]
```

## Daily publishing checklist for Codex

1. Pick the canonical date `YYYY-MM-DD` (UTC).
2. Build the slug: `<date>-<kebab-title>`.
3. Write `public/signals/<slug>.json` following the schema above.
4. Choose the briefing-level `stages` by combining the five story-level `stages`, ordered by relevance/frequency. Do not use a generic stage list.
5. Write a date-specific Pattern of the Day that names the actual tension, companies, institutions, or human stakes in the five selected stories. It must not repeat the same generic wording from prior issues.
6. Choose the briefing-level `imageUrl`: use the strongest selected story image, or `/signals/tgr-signal-thumbnail.jpg` if no selected story has a usable image.
7. Open `public/signals/index.json` and **prepend** the matching index
   entry. Its `stages` array must exactly match the briefing file `stages` array. Re-sort by `date` descending if unsure.
8. Run `npm run validate:signals`. Do not commit if this fails. This catches
   duplicate issue patterns, generic canned pattern copy, index/file mismatches,
   invalid stages, missing story summaries, missing key points, and bad sort order.
9. Commit both files in one commit. Suggested message:
   `signal: <date> — <title>`.
10. Push to `main` on `kyleshannon/the-great-repurpose`.
11. **Purge the jsDelivr cache** so the live site picks up the change
   immediately (otherwise it can take up to ~12 minutes). Hit each URL
   once with a GET — jsDelivr returns a small JSON confirmation:
   - `https://purge.jsdelivr.net/gh/kyleshannon/the-great-repurpose@main/public/signals/index.json`
   - `https://purge.jsdelivr.net/gh/kyleshannon/the-great-repurpose@main/public/signals/<slug>.json`
12. Verify both the CDN and the live rendered site. CDN verification alone is
    not enough.
    - CDN index: `https://cdn.jsdelivr.net/gh/kyleshannon/the-great-repurpose@main/public/signals/index.json`
      must have today's slug as the first entry.
    - CDN detail: `https://cdn.jsdelivr.net/gh/kyleshannon/the-great-repurpose@main/public/signals/<slug>.json`
      must return the matching slug and title.
    - Live archive: `https://thegreatrepurpose.com/signals` must render today's
      date and title at the top of the page.
    - Live detail: `https://thegreatrepurpose.com/signals/<slug>` must render
      the same title.
    If the CDN is current but the live site is not, purge both jsDelivr URLs
    again, wait briefly, and retry the live archive/detail checks. Do not report
    success until the live site renders today's issue; report "repo/CDN updated,
    live render not yet updated" if it still fails after retries.

> Why the purge: the live site fetches signals at runtime from
> `cdn.jsdelivr.net/gh/kyleshannon/the-great-repurpose@main/public/signals/...`.
> jsDelivr edge-caches the `@main` branch for ~12 minutes unless purged,
> so without step 9 the new signal won't appear right away.

## Validating before commit

- Both files are valid JSON (`node -e "JSON.parse(require('fs').readFileSync('public/signals/<slug>.json','utf8'))"`).
- `slug` in the file equals the filename minus `.json`.
- `index.json` contains exactly one entry with this slug.
- `index.json` `stages` for this slug exactly matches `<slug>.json` `stages`.
- `index.json` `pattern` for this slug exactly matches `<slug>.json` `pattern`.
- No issue `pattern` duplicates another issue or uses generic canned framing.
- `stages` and `stories[].stages` entries appear in the canonical list above.
- Every story has non-empty `summary`, at least two `keyPoints`, and at least one canonical `stage`.
- Briefing-level `imageUrl` and index entry `imageUrl` are non-empty. Use `/signals/tgr-signal-thumbnail.jpg` if needed.
- All `stories[].url` resolve and use HTTPS.
