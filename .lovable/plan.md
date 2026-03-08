

# Fix Generic AI Salon Links with Specific Activity URLs

## Problem
Multiple links across the site point to `https://thesalon.ai` (the marketing homepage) when they should link directly to the specific activity on Mighty Networks.

## Discovered URLs (from crawling community.thesalon.ai)

| Activity | URL |
|---|---|
| Friday Office Hours | `https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet` |
| AI Learning Lab | `https://aisalon.mn.co/spaces/12680384` |
| Mastermind Practice Lab | `https://aisalon.mn.co/spaces/21791897` |
| Learn Out Loud | `https://aisalon.mn.co/events/learn-out-loud` |

**Note:** I'd recommend confirming these URLs are the ones you want before I implement. The Office Hours link matches what's already in your footer. The others are space/event pages I discovered from the Mighty Networks site structure.

## Files to Update

### 1. `src/lib/archetypes.ts`
Update all 10 archetype `salonEntry.href` values from `https://thesalon.ai` to the matching activity URL above.

### 2. `src/pages/ResultsPreview.tsx`
Update the `salonActivities` array (lines 249-252) — replace the four generic `https://thesalon.ai` hrefs with specific URLs.

### 3. `supabase/functions/generate-interpretation/index.ts`
Update the AI prompt (line 69) that lists activity URLs — replace the four `https://thesalon.ai` placeholders with specific URLs so the AI-generated text includes correct links.

## Scope
- No structural or layout changes
- Pure URL replacement across 3 files
- Footer already has the correct Office Hours link — no change needed there

