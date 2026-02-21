
# Add Intro Paragraph Before the Self-Check CTA

## What Changes

Add an introductory paragraph in the hero CTA area (lines 83-95) that briefly explains what The Great Repurpose is and what the Self-Check does, placed between the hero image and the "Take the Self-Check" button.

## Content

The intro will cover two things:
1. **The Great Repurpose** -- a one-sentence framing of what it is (a diagnosis of the meaning crisis caused by AI disruption, not a course or a certificate)
2. **The Self-Check** -- what the user is about to take (7 scenario-based questions that map where you are across 5 stages of navigating this transition)

## File to Update

### `src/pages/Index.tsx` (lines 83-95)

Currently the CTA section jumps straight to the button. We'll insert a short block of copy above it:

```
The Great Repurpose is a map for the invisible crisis no one is naming:
what happens to your sense of meaning when the work that defined you
changes faster than you can adapt.

The Self-Check is where you start. Seven scenario-based questions that
reveal where you are across five stages of this transition -- your
strengths, your gaps, and the specific next step that matches where
you are right now.
```

This will be styled as centered body text (`font-sans text-cream/70 text-base`) with a max-width constraint, sitting inside the existing `ScrollFadeUp` wrapper above the button.

No other files change. No structural or routing changes.
