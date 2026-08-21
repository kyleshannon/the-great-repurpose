# Update the Social / Link Preview Image

## Goal
Replace the stale social-preview card image (the one shown when sharing `thegreatrepurpose.com` in messages or social platforms) with the current brand hero/image.

## Current state
- `index.html` already has `og:image` and `twitter:image` pointing to the current Lovable hero asset (`/__l5e/assets-v1/f80af835-3e03-449e-8150-3e917b3d7a2d/hero.png`).
- The live published site may still be serving an older build, and social platforms cache preview images aggressively, so the card still shows the previous look-and-feel photo.

## Steps

1. **Confirm the desired preview image**
   - Decide whether to use the current homepage hero as the social preview, or create a dedicated 1200×630 social card (better cropping, readable text, no overlay clash).
   - If a dedicated card is preferred, generate it and upload it as a Lovable asset.

2. **Update `index.html` social tags**
   - Set `og:image` and `twitter:image` to the absolute published URL of the chosen image (e.g., `https://thegreatrepurpose.com/__l5e/assets-v1/<id>/<filename>`).
   - Keep `og:image:width` / `og:image:height` at 1200×630 if we use a dedicated card.
   - Ensure `og:title`, `og:description`, and `twitter:*` tags match the current homepage copy.

3. **Publish the frontend**
   - Click **Update** in the Publish dialog so the new `index.html` reaches the live site.
   - Backend-only deploys do not refresh the static head tags.

4. **Clear platform caches**
   - After publishing, force each platform to re-scrape:
     - Facebook: https://developers.facebook.com/tools/debug/
     - LinkedIn: https://www.linkedin.com/post-inspector/inspect/
     - Twitter/X: https://cards-dev.twitter.com/validator
     - iMessage/Safari: cache clears on its own schedule, but a new `og:image` URL (with a cache-busting query or new asset ID) usually updates faster.

## Out of scope
- No changes to assessment logic, backend, or site content beyond the social-preview metadata.
- No per-route social previews (this is a static Vite SPA; per-route previews require SSR).
