

# Fix Score Dimension Labels to Match the Five Stages

## The Problem

The score breakdown at the bottom of the report uses made-up dimension names and wrong stage numbers that don't match the Five Stages:

| Current (wrong) | Correct (from Phases.tsx) |
|---|---|
| Identity Independence — Stage 1 Disorientation | **Unhook Identity** — Stage 1 Disorientation |
| Value Clarity — Stage 3 Excavation | **Reclaim Value** — Stage **2** Excavation |
| Purpose Direction — Stage 4 Reorientation | **Find Your Purpose** — Stage **3** Reorientation |
| AI Relationship — Stage 2 Reckoning | **Discover AI's Power** — Stage **4** Reckoning |
| Creative Action — Stage 5 Authorship | **Start Creating** — Stage 5 Authorship |

The radar chart already uses the correct names. Only the `dimensionMeta` object in `ResultsPreview.tsx` (lines 20-26) needs fixing.

## The Fix

Update `dimensionMeta` in `src/pages/ResultsPreview.tsx`:

```typescript
const dimensionMeta: Record<DimensionKey, { label: string; stage: string }> = {
  identity:        { label: "Unhook Identity",     stage: "Stage 1 — Disorientation" },
  value:           { label: "Reclaim Value",       stage: "Stage 2 — Excavation" },
  purpose:         { label: "Find Your Purpose",   stage: "Stage 3 — Reorientation" },
  ai_relationship: { label: "Discover AI's Power", stage: "Stage 4 — Reckoning" },
  creative_action: { label: "Start Creating",      stage: "Stage 5 — Authorship" },
};
```

Also update the SelfCheck dimension labels (visible during the quiz) to match:

| Current | Correct |
|---|---|
| VALUE CLARITY | RECLAIM VALUE |
| PURPOSE DIRECTION | FIND YOUR PURPOSE |
| AI RELATIONSHIP | DISCOVER AI'S POWER |
| CREATIVE ACTION | START CREATING |
| IDENTITY | UNHOOK IDENTITY |
| IDENTITY + VALUE | UNHOOK IDENTITY + RECLAIM VALUE |
| PURPOSE + AI | FIND YOUR PURPOSE + DISCOVER AI'S POWER |

And update the TgrTypes.tsx description that references the old dimension names.

## Files Changed

- `src/pages/ResultsPreview.tsx` — fix `dimensionMeta` labels and stage numbers
- `src/pages/SelfCheck.tsx` — fix question dimension labels
- `src/pages/TgrTypes.tsx` — update dimension name references in copy

