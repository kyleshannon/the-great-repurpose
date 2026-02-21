
# Replace Archetypes and Update UI Copy

## Overview

Replace the existing 12 archetypes with 10 new ones ("TGR Types"), implement the new priority-based matching logic, update all CTA button text, and restructure the pre-email results page layout.

## Changes

### 1. `src/lib/archetypes.ts` -- Complete rewrite

Replace all 12 archetypes with the 10 new ones:
- The Amplifier, The Awakener, The Explorer, The Firestarter, The Original, The Compass, The Architect, The Translator, The Catalyst, The Unlocker

Each archetype gets:
- `name` (e.g. "The Amplifier")
- `tagline` (the "You're building toward..." line from the brief)
- `description` (a short prose description based on the provided details)
- `vulnerability` (derived from the archetype's risk/tension)
- `salonEntry` (activity, body, href) -- mapped to appropriate AI Salon activities

Replace the `matchArchetype()` function with the new matching logic, checked in this exact order:
1. The Amplifier: all >= 7
2. The Awakener: max <= 5 AND avg <= 4
3. The Explorer: (ai >= 5 OR ca >= 5) AND (id <= 4 OR vc <= 4)
4. The Firestarter: (max - avg) >= 3
5. The Translator: id >= 7 AND (ai >= 5 OR ca >= 5) AND (vc <= 4 OR pd <= 4)
6. The Architect: id >= 5 AND vc >= 5 AND pd >= 5 AND ai >= 5 AND ca <= 4
7. The Compass: id >= 7 AND vc >= 7 AND pd >= 7 AND ai < 5 AND ca < 5
8. The Original: id >= 7 AND vc >= 7 AND pd < 7 AND (ai < 5 OR ca < 5)
9. The Unlocker: id <= 5 AND id >= avg-1 AND avg <= 5 AND no dimension above 6
10. The Catalyst (fallback): avg >= 5 AND avg <= 7.5 AND (max - min) <= 4 -- or just default

### 2. `src/pages/Index.tsx` -- Button text updates

All "Take the Free Self-Check" buttons become:
- Button text: **"Find Your TGR Type"**
- Subtext: **"Discover where you are -- and what you're building toward."**

Update in:
- Hero CTA section (line ~93-99)
- Five Stages section CTA (line ~238-243)
- Bottom Self-Check promo section (line ~353-358)

### 3. `src/pages/ResultsPreview.tsx` -- Pre-email layout restructure

Change the pre-email results page order to:
1. "Based on your answers, you are **[TYPE]**" (replace "You are" with "Based on your answers, you are")
2. Radar chart with a simple descriptive label underneath (e.g. "Your shape across the five dimensions")
3. "As a [TYPE], you're building toward..." followed by 5-10 words of the tagline, then text fades/blurs into the email gate

### 4. `supabase/functions/generate-interpretation/index.ts` -- Update system prompt

The system prompt references archetype fields that remain structurally the same (name, tagline, description, vulnerability, salonEntry.activity), so the edge function itself doesn't need structural changes. However, the prompt should reference "TGR Type" instead of "archetype" in the user-facing language.

### 5. `src/pages/SelfCheck.tsx` -- Button text update

Change the final question button from "See my results" to "Find Your TGR Type" to match the new language.

## Files to modify
1. `src/lib/archetypes.ts` -- Full rewrite (new archetypes + matching logic)
2. `src/pages/Index.tsx` -- CTA button text and subtext
3. `src/pages/ResultsPreview.tsx` -- Pre-email layout restructure
4. `src/pages/SelfCheck.tsx` -- Final button text
5. `supabase/functions/generate-interpretation/index.ts` -- Minor prompt language update
