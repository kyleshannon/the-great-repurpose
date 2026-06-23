# Fix the broken Daily Signal fallback thumbnail

## Problem
`public/signals/tgr-signal-thumbnail.svg` wraps a base64-encoded JPEG. The base64 payload is truncated mid-stream — it's not a multiple of 4 chars and decodes to a JPEG that ends with `2981 fffd` instead of the required `ffd9` end-of-image marker. Browsers render the first scanlines they can decode (~10%) and then stop, which is why every story on June 2 (and any other story missing an `imageUrl`) shows a partial image.

The site code is correct: `SignalDetail.tsx` and `SignalTeaser.tsx` already fall back to this asset via `fallbackSignalImage`. The asset itself is the bug.

## Fix
Replace `public/signals/tgr-signal-thumbnail.svg` with a clean, lightweight, on-brand SVG fallback — built from real SVG primitives (no embedded raster), so it can't be truncated and stays crisp at any size.

Proposed design, matching the site's palette (`navy` background, `cream` text, `coral` accent, constellation feel):

- 480 × 270 viewBox
- Solid `#0B1B2B` navy background
- A few small `cream`/`coral` dot "constellation" marks
- Centered serif wordmark: **"Daily Signal"** in cream
- Small uppercase eyebrow above: `THE GREAT REPURPOSE` in coral, tracked-out sans
- `role="img"` + `<title>` / `<desc>` for accessibility (keep the existing pattern)

File size target: < 2 KB, pure vector, no `<image>` tag.

## Files
- `public/signals/tgr-signal-thumbnail.svg` — overwrite with the new vector SVG

## Out of scope
- No changes to JSON, components, or the `onError` fallback wiring.
- No changes to story-level `imageUrl` values (the bad June 2 URLs are a separate question — once the fallback renders cleanly, those stories will look correct).

## Verification
- After the replacement, reload `/signals/2026-06-02-...` and confirm all five story cards show the full branded thumbnail (not a partial sliver).
- Confirm the SignalTeaser on the homepage and any other fallback usage also render cleanly.
