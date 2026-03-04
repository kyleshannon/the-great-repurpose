

# Rename "TGR Type(s)" → "Great Repurpose Profile" + Fix Stage Names

## 1. Rename "TGR Type(s)" globally

Same as before — replace all user-facing "TGR Type" / "TGR Types" with "Great Repurpose Profile" / "Profiles" across: `index.html`, `Navigation.tsx`, `Footer.tsx`, `Index.tsx`, `TgrTypes.tsx`, `Phases.tsx`, `SelfCheck.tsx`, `ResultsPreview.tsx`, `About.tsx`, and the `generate-interpretation` edge function.

## 2. Fix the Five Stages — Phases page is source of truth

The canonical stage names (from Phases.tsx) are:

| # | Stage Name | Tagline |
|---|---|---|
| 01 | Unhook Identity | I'm not my job. |
| 02 | Reclaim Value | But I AM this. |
| 03 | Find Your Purpose | This is what matters to me. |
| 04 | Discover AI's Power | Wait — I can do THAT now? |
| 05 | Start Creating | Amplify your impact with AI. |

**What needs correcting:**

| File | Current (wrong) | Correct |
|---|---|---|
| `supabase/functions/generate-interpretation/index.ts` line 45 | Discover AI | **Discover AI's Power** |
| `supabase/functions/generate-interpretation/index.ts` line 46 | Create with AI | **Start Creating** |
| `supabase/functions/generate-interpretation/index.ts` line 61 | "Always use... Discover AI, Create with AI" | "Always use... Discover AI's Power, Start Creating" |
| `src/pages/ResultsPreview.tsx` line 386 | `"Discover AI"` (radar chart label) | **"Discover AI's Power"** |
| `src/pages/ResultsPreview.tsx` line 387 | `"Create with AI"` (radar chart label) | **"Start Creating"** |

Stages 1–3 are already correct everywhere. `Index.tsx` and `Phases.tsx` already use the correct names — no changes needed there.

