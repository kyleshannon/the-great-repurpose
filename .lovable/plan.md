Plan: Swap homepage hero image

Replace the existing hero image at `public/images/hero.png` with the uploaded image `enhanced_TGR_Hero_Image.png`.

Steps:

1. Optimize and copy the uploaded image into `public/images/hero.png`, replacing the current file. The current hero is a 2MB PNG; the new image will be resized and compressed to a web-friendly size while preserving the dark, moody quality that matches the brand.

2. Keep the existing image path `/images/hero.png` in `src/pages/Index.tsx` so no component references need to change.

3. Review the alt text in `src/pages/Index.tsx` (currently "People standing together, facing forward") and update it if the new image calls for a different description.

4. Verify the hero renders correctly in the live preview and that the text overlay remains readable.

No other files need changes because `index.html`'s preload and Open Graph tags already point to `/images/hero.png`.
