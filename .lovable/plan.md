

# Multi-Page Content Updates

## Changes

### 1. `src/pages/Index.tsx` — Homepage

**CTA buttons**: Change the lower CTAs from "What's Your Repurpose Profile?" to "Get Your Repurpose Profile →". Keep the first hero CTA as-is (question form works there). Specifically:
- Line 274: "Get Your Repurpose Profile →"
- Line 380: "Get Your Repurpose Profile →"  
- Line 425: "Get Your Repurpose Profile →"

**Video quote** (line 173): Change `"We can't escape it."` to `"It's here."`

**Unhook Identity colors** (lines 8-15): Change `borderColor` to `"border-coral"` and `textColor` to `"text-coral"` (currently `border-cream/40` and `text-cream/70` which are near-invisible on the cream background). Make all five phases use their defined accent colors consistently — they already do except phase 01.

**"actually" removal** — not on this page but noted for About page below.

### 2. `src/pages/TgrTypes.tsx` — Profiles Page

**Profile names in green** in the intro paragraph (line 80): Wrap the phrase "10 Great Repurpose Profiles" in a `<span className="text-mint">` tag, and style the profile names in the grid headings with mint/green color.

Actually, re-reading: "profile names in that first paragraph in green" — the first paragraph mentions "five dimensions" and profile types. The profile names appear in the grid below. I think the user wants the type name headings in the cards to be green. Change `text-navy` on `h3` elements to `text-mint` or a green shade that works on the cream/light background. Let me use a darker green for readability: keep them navy but style them with a green accent, or use `text-emerald-700` or similar. I'll use the existing `text-mint` but that might be too light on cream. Better approach: add the mint color as an accent to the names, e.g. make the `h3` use a green that's readable. I'll propose `text-green-700` or similar.

**The Unlocker tagline**: Change from "You're building toward freedom from the old story." to "You're still tying who you are to the title you held."

**The Catalyst description**: Rewrite last two sentences to remove the circular "You need a catalyst" line. Replace with something like: "The next step is to pick the one dimension where a small push would create the most momentum, and lean into it. You're closer than you think — and one deliberate move could change everything."

**The Original description**: Remove the redundant sentence. Tighten to: "Your identity is unhooked from your old title, and you've found real value in what you bring. But you haven't aimed it anywhere yet. The next step is direction: pick a problem worth solving or an audience worth serving, and point your clarity at it."

**The Translator description**: Refine to resolve the contradiction. Something like: "You're strong on the outside edges — you know who you are and you're comfortable with tools or creation. But there's a gap in the middle: you haven't connected your identity to a clear direction. You're doing impressive things without a strategic center. The next step is to slow down and ask what's worth building — before you build more of it."

### 3. `src/lib/archetypes.ts` — Update matching descriptions

Update the Unlocker tagline, Catalyst description, Original description, and Translator description to match the TgrTypes changes (these are the canonical source used in reports).

### 4. `src/pages/About.tsx`

- Capitalize "President" (line ~56: "the co-founder and president" → "the Co-Founder and President")
- Hyperlink "AI Salon" to `https://community.thesalon.ai`
- Remove "actually" from "what's actually going on" → "what's going on"
- Replace the "diagnosis/treatment" heading. New copy:
  - "Your Repurpose Profile is a starting point." / "The AI Salon is where you figure it out."

### 5. `src/pages/Phases.tsx` — Bottom CTA

Change "What's Your Repurpose Profile?" (line 152) to "Get Your Repurpose Profile →"

### 6. `supabase/functions/generate-interpretation/index.ts`

Update the archetype descriptions/taglines in the prompt data that gets passed (these come from the archetype object, so they'll automatically reflect the `archetypes.ts` changes — no separate update needed).

## Files Changed
- `src/pages/Index.tsx`
- `src/pages/TgrTypes.tsx`
- `src/lib/archetypes.ts`
- `src/pages/About.tsx`
- `src/pages/Phases.tsx`

