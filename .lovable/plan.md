

# Align Site-Wide Content Width to The Five Stages Page

## What Changes

The Five Stages (Phases) page consistently uses `max-w-3xl mx-auto` for all content sections. Other pages use a mix of widths (`max-w-4xl`, `max-w-5xl`, `max-w-6xl`), creating inconsistent reading widths as you navigate between pages.

This plan standardizes all page content containers to `max-w-3xl mx-auto` to match The Five Stages page, giving the entire site a cohesive, focused reading column.

**What stays unchanged:**
- Navigation bar (`max-w-7xl`) -- structural element, not content
- Footer (`max-w-7xl`) -- structural element, not content
- Hero image on the homepage -- full-width by design

## Files to Modify

### `src/pages/Index.tsx`
- Section 2 (Name the Crisis): already `max-w-3xl` -- no change needed
- Section 3 (Three Faces): change `max-w-6xl` to `max-w-3xl`, convert 3-column grid to stacked single-column cards
- Section 4 (Five Stages): change `max-w-5xl` to `max-w-3xl`
- Section 5 (Not About Skills): already `max-w-3xl` -- no change needed
- Section 6 (Self-Check Promo): change `max-w-4xl` to `max-w-3xl`, convert 3-column step grid to stacked layout
- Inner text blocks with `max-w-2xl` or `max-w-xl` constraints will be removed since `max-w-3xl` is already a comfortable reading width

### `src/pages/About.tsx`
- AI Salon section: change `max-w-5xl` to `max-w-3xl`, convert 2-column pillar grid to stacked single-column cards
- Remove `max-w-2xl` sub-constraints on paragraphs within the section

### `src/pages/ResultsPreview.tsx`
- Audit and update any content containers wider than `max-w-3xl` to match

