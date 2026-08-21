# LinkedIn Preview: Diagnosis and Cache-Busting Plan

## What I verified

I downloaded the image the live site actually advertises as its social preview and compared it to the screenshot you sent.

- The live site's `og:image` URL returns HTTP 200, `image/png`, 1200x630.
- Its MD5 hash is **identical** to the assembled homepage screenshot you uploaded.
- Visual inspection of the downloaded file confirms it: nav bar, TGR logo, "You weren't meant to be replaced. It's time to Repurpose."

So the site is serving the correct image. LinkedIn is showing you its own cached copy of an older scrape (the raw hero photo, no nav or text). LinkedIn stores scraped previews on its media CDN and reuses them per-URL for roughly 7 days; the Post Inspector is supposed to purge that, but it often returns the cached render instead.

One related detail: the `index.html` change from the last turn (a fresh asset ID, `og:image:secure_url`, `type`, `alt`) is still unpublished. The live page points at the previous asset ID, which happens to serve byte-identical content.

## Plan

1. **Publish the frontend** so the new asset URL and the extra OG tags go live. A new image URL is the single most reliable cache-buster across every platform.

2. **Re-run LinkedIn Post Inspector** against `https://thegreatrepurpose.com/` after the publish completes.

3. **If LinkedIn still shows the old photo**, share the link with a query parameter — `https://thegreatrepurpose.com/?v=2`. LinkedIn treats a distinct query string as a distinct URL, forcing a fresh scrape. This is the standard workaround when Post Inspector won't clear.

4. **Optionally add a versioned canonical hint.** If you want LinkedIn to consistently key off a fresh URL after future preview changes, we can append a version query to the `og:url` value on each preview update. Trade-off: it slightly fragments link analytics, so I'd only do it if the cache keeps fighting you.

## What I am not doing

- No change to the image itself. It is already the assembled homepage screenshot at the correct 1200x630.
- No changes to site content, layout, or backend.

## Technical notes

- `index.html` currently holds the new asset ID `020e0cc6-cf58-4830-95d8-be9c920ef14e` on `og:image` and `twitter:image`; the live page still serves `e2b377ae-9e86-4956-8d8d-dc6b62525e38`. Both resolve to the same bytes.
- This is a static Vite SPA, so `index.html` is the only head crawlers read. Publishing is required for any head-tag change to take effect.
- X/Twitter's Card Validator was retired in 2022; there is no manual refresh tool. A new image URL is the only lever there.
