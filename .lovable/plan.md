# Replace Homepage Hero Image

## What
Swap the hero section's main image from `/images/hero.png` to the newly uploaded image.

## How
1. **Upload the new image to Lovable Assets**
   - Source: `/mnt/user-uploads/image-9.png` 
   - Generate an asset pointer (e.g., `src/assets/hero.png.asset.json`)

2. **Update `src/pages/Index.tsx`**
   - Change the `<img>` `src` from `/images/hero.png` to the new asset URL
   - Keep all existing classes, `fetchPriority`, `decoding`, and alt text unchanged
   - Optionally update `alt` text if the new image's subject differs noticeably

## Files changed
- `src/pages/Index.tsx` (one line: `src` attribute)
- New asset pointer: `src/assets/hero.png.asset.json`