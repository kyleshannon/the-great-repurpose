

# Responsive Design Audit and Homepage Layout Update

## Overview

A full responsive audit across all pages (Home, Self-Check, Results, Phases, About) plus a layout change on the homepage hero section to move the CTA button between the two descriptive paragraphs, matching the reference screenshot.

## Homepage Hero Layout Change

The reference screenshot shows the hero image is already matching well. The key change requested: **move the "Take the Free Self-Check" button and its subtitle between the two paragraphs** instead of above them.

Current order:
1. Button
2. "7 questions..." subtitle
3. Paragraph 1 (map for the invisible crisis...)
4. Paragraph 2 (Self-Check is where you start...)

New order:
1. Paragraph 1 (map for the invisible crisis...)
2. Button
3. "7 questions..." subtitle
4. Paragraph 2 (Self-Check is where you start...)

## Responsive Design Fixes

### `src/pages/Index.tsx`
- Hero text overlay: scale down font sizes for small screens (already has `text-4xl md:text-6xl lg:text-7xl` -- looks fine)
- Reorder CTA block elements as described above
- Ensure all section padding is appropriate on mobile (`py-24 px-6` can feel too tall on mobile -- consider `py-16 md:py-24`)
- Overall section padding adjustments for mobile breathing room

### `src/pages/SelfCheck.tsx`
- The quiz card uses `max-w-xl` which is good, but the bottom fixed action bar needs safe area padding for phones with notches/home indicators (`pb-safe` or extra bottom padding)
- The slider label text at `text-xs` with `max-w-[45%]` can feel cramped on very small screens -- bump to slightly wider on mobile
- Add `pt-20` or similar to account for the fixed nav on the content area

### `src/pages/ResultsPreview.tsx`
- The radar chart at 300px/340px height works but could be reduced on mobile for a tighter layout
- Email gate form: the `sm:flex-row` pattern is already responsive -- good
- Share buttons section: `flex-wrap` handles mobile wrapping already -- good
- Ensure dimension breakdown accordion buttons have adequate touch targets (already `p-6` -- fine)

### `src/pages/About.tsx`
- Already using `max-w-3xl` -- responsive is clean
- No changes needed

### `src/pages/Phases.tsx`
- Already using `max-w-3xl` -- responsive is clean
- No changes needed

### `src/components/Navigation.tsx`
- Mobile menu overlay is full-screen -- good
- Already has hamburger at `md:hidden` breakpoint -- solid

### `src/components/Footer.tsx`
- 3-column grid with `grid-cols-1 md:grid-cols-3` -- already responsive
- No changes needed

### `src/index.css`
- No changes needed for responsive -- media queries and utilities are already set up

## Technical Details

### Files to modify:
1. **`src/pages/Index.tsx`** -- Reorder CTA block (button between paragraphs), adjust section vertical padding for mobile (`py-16 md:py-24` pattern)
2. **`src/pages/SelfCheck.tsx`** -- Add safe bottom padding to the fixed action bar, ensure adequate top spacing below fixed nav
3. **`src/pages/ResultsPreview.tsx`** -- Minor mobile padding tweaks for consistency

### No new dependencies or backend changes required.

