# Daily Signal — data schema for Codex

The Daily Signal section reads its data from JSON files in this folder. To
publish a new daily briefing, **write two files and commit**. No TypeScript
edits, no build steps. Lovable's GitHub sync auto-deploys on push.

## Files Codex writes each day

1. `public/signals/<slug>.json` — the full briefing (pattern + 5 stories).
2. `public/signals/index.json` — prepend a new entry so the archive lists
   it. Keep the array sorted by `date` descending.

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
| `pattern` | yes | The "Pattern of the Day". Plain text, ~2–3 sentences. |
| `stages` | yes | 1–5 entries. Must match the canonical names below exactly. |
| `imageUrl` | recommended | Used as the OG share image and archive card image. Empty string allowed but the card will render without a thumbnail. |
| `stories` | yes | Exactly **5** entries. Fewer renders but looks sparse. |
| `stories[].summary` | yes | 1–3 sentences in The Great Repurpose voice. Direct, human, concrete. No empty strings. |
| `stories[].keyPoints` | yes | 2–3 bullets that make the story scannable. No empty arrays. |
| `stories[].stages` | yes | 1–2 canonical TGR stages per story. No empty arrays. |
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
file — Codex must keep these in sync.

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
4. Open `public/signals/index.json` and **prepend** the matching index
   entry. Re-sort by `date` descending if unsure.
5. Commit both files in one commit. Suggested message:
   `signal: <date> — <title>`.
6. Push to `main`. Lovable redeploys; the new briefing appears at
   `https://thegreatrepurpose.com/signals/<slug>` and on the homepage
   teaser within a minute or two.

## Validating before commit

- Both files are valid JSON (`node -e "JSON.parse(require('fs').readFileSync('public/signals/<slug>.json','utf8'))"`).
- `slug` in the file equals the filename minus `.json`.
- `index.json` contains exactly one entry with this slug.
- `stages` and `stories[].stages` entries appear in the canonical list above.
- Every story has non-empty `summary`, at least two `keyPoints`, and at least one canonical `stage`.
- All `stories[].url` resolve and use HTTPS.
