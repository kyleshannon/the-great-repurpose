

# Hero Section Redesign to Match Reference Image

## What Changes

The homepage hero section will be updated to match the uploaded reference image:

1. **Use the uploaded photo as the hero background image** — copy it into the project and display it behind the text with a subtle dark gradient overlay.

2. **Switch hero text to sans-serif, bold, left-aligned** — currently it uses serif italic centered text. The reference shows bold white sans-serif, positioned at the bottom-left of the image.

3. **Update hero copy to match the image**:
   - Title: "The Great Repurpose"
   - Subtitle: "Finding Meaning in the Face of Unprecedented Change"

4. **Add a subtle semi-transparent bar** behind the text at the bottom, matching the reference image's text treatment.

5. **Keep the CTA button and subtext below the hero title area** (or move them to a separate section below the hero image if desired).

---

## Technical Details

### Files affected

- **New asset**: Copy `user-uploads://Screenshot_2026-02-19_at_9.21.26_PM-2.png` to `public/images/hero.png` (public folder since it will be used as a CSS background image)
- **`src/pages/Index.tsx`**: Rewrite the hero `<section>` to use:
  - `background-image` pointing to the hero photo
  - `background-size: cover; background-position: center`
  - Left-aligned, bottom-positioned text container
  - `font-sans font-bold` classes instead of `font-serif italic`
  - Updated title/subtitle text
  - Semi-transparent overlay bar behind text
  - CTA button repositioned below the title block

### No changes to

- Other sections on the page remain untouched
- Color palette, tailwind config, and CSS variables stay the same
- Navigation and Footer components unchanged

