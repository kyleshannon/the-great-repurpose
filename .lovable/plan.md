

# AI-Powered Results Engine with 12 Archetypes

## Overview

Replace the current static tier-based results with a sophisticated AI-personalized assessment system. Users will be matched to one of 12 archetypes based on their score patterns, then receive a custom AI-generated narrative interpretation via Lovable Cloud AI.

## What Changes

### 1. Archetype Matching Engine (new file)

Create `src/lib/archetypes.ts` containing:
- All 12 archetype definitions (name, tagline, description, vulnerability, salon entry recommendation)
- The `matchArchetype()` function from the document's pseudocode that pattern-matches five scores to an archetype
- Archetype-specific salon routing data replacing the current dimension-based routing

The 12 archetypes: In the Fog, Holding On, In the Grief, Finding the Layer, Clear and Waiting, Tools First, Skipped the Middle, First Spark, Ready on Paper, Closer Than You Think, Building Without a Map, Fully Amplified.

### 2. AI Interpretation Edge Function (new)

Create `supabase/functions/generate-interpretation/index.ts`:
- Receives scores + matched archetype data
- Calls Lovable Cloud AI (gemini-3-flash-preview) with the detailed system prompt from the document
- Streams a 3-4 paragraph personalized narrative that reads "like a paragraph from a friend who happens to be a therapist"
- The prompt emphasizes relationships between dimensions, not just individual scores
- Forbidden words list enforced: no "assessment", "metrics", "optimize", "leverage", etc.
- References specific AI Salon activities (Office Hours, Learning Lab, Mastermind Practice Lab, Learn Out Loud) based on the archetype

### 3. Updated Results Page (`src/pages/ResultsPreview.tsx`)

**Pre-email teaser (visible immediately):**
- Archetype name displayed large and prominent: "You are: Clear and Waiting"
- Archetype tagline in italic
- Radar chart showing their five-dimension shape
- Blurred/locked AI interpretation preview to create curiosity

**Post-email full results (unlocked after email gate):**
1. Archetype name + tagline (top of page, proud)
2. Radar chart (fully labeled)
3. AI-written interpretation streaming in word-by-word (the heart of the page)
4. "Your path forward" -- ONE specific Salon entry point for their archetype (not a menu)
5. Five-dimension breakdown (collapsible, with scores)
6. Share card with archetype-specific text

**Share text templates updated:**
- LinkedIn: "I just took The Great Repurpose Self-Check. I'm [Archetype Name]: [tagline]..."
- X/Twitter: "My Great Repurpose result: [Archetype Name]. '[tagline]' -- uncomfortably accurate."

### 4. Database Update

Add an `archetype` column to `selfcheck_results` table to store the matched archetype name, and an `ai_interpretation` column to cache the generated narrative so it doesn't need to regenerate on revisit.

### 5. Kit Integration Update

Update `subscribe-kit` edge function to also send the archetype tag (e.g., "selfcheck-clear-and-waiting") alongside the lowest dimension.

## Files to Create
- `src/lib/archetypes.ts` -- archetype definitions + matching logic
- `supabase/functions/generate-interpretation/index.ts` -- AI narrative generation

## Files to Modify
- `src/pages/ResultsPreview.tsx` -- complete overhaul of results display
- `supabase/functions/subscribe-kit/index.ts` -- add archetype tag
- `supabase/config.toml` -- register new edge function

## Database Migration
- Add `archetype text` and `ai_interpretation text` columns to `selfcheck_results`

## Technical Details

**Archetype matching priority order** (from the document): Earlier phases take priority. If someone hasn't unhooked their identity, it doesn't matter how good they are with tools.

Matching order:
1. Fully Amplified (all >= 7)
2. In the Fog (max <= 5, avg <= 3.5)
3. Holding On (id <= 3, avg <= 5)
4. Tools First (ai >= 5, id <= 4, vc <= 4)
5. In the Grief (id 3-5, vc <= 5, pd <= 4, ai <= 4)
6. Ready on Paper (id/vc/pd/ai >= 5, ca <= 4)
7. Clear and Waiting (id/vc/pd >= 7, ai <= 5, ca <= 5)
8. Skipped the Middle (id >= 7, ai+ca >= 5, vc+pd <= 4)
9. Building Without a Map (ai >= 7, ca >= 5, pd <= 5)
10. First Spark (max - avg >= 3)
11. Closer Than You Think (id/vc/pd >= 6, ai/ca >= 4)
12. Finding the Layer (id >= 5, vc 4-6)
13. Fallback: avg <= 4 -> In the Fog, else Finding the Layer

**AI streaming**: The interpretation streams word-by-word after email unlock using SSE from the edge function, creating a reveal moment.

**Salon activity mentions in AI narrative**: The prompt instructs the AI to reference specific Salon offerings (Office Hours, AI Learning Lab, Mastermind Practice Lab, Learn Out Loud sessions) based on the archetype's recommended entry point.

