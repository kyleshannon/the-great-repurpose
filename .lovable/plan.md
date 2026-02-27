

# Align AI Report Dimensions with Site's Five Stages

## The Problem
The AI-generated report references dimensions by names that don't match the site's established Five Stages:

| Current in AI Prompt | Site's Actual Stage Name |
|---|---|
| Identity Independence | Unhook Identity |
| Value Clarity | Reclaim Value |
| Purpose Direction | Find Your Purpose |
| AI Relationship | Discover AI |
| Creative Action | Create with AI |

This creates a disconnect -- users see "Unhook Identity" on the radar chart, the Phases page, and the homepage, but the AI report talks about "Identity Independence."

## The Fix

**File:** `supabase/functions/generate-interpretation/index.ts`

Update the system prompt's score labels (lines 41-46) from:

```
- Identity Independence: ${scores.identity}
- Value Clarity: ${scores.value}
- Purpose Direction: ${scores.purpose}
- AI Relationship: ${scores.ai_relationship}
- Creative Action: ${scores.creative_action}
```

To:

```
- Unhook Identity: ${scores.identity}
- Reclaim Value: ${scores.value}
- Find Your Purpose: ${scores.purpose}
- Discover AI: ${scores.ai_relationship}
- Create with AI: ${scores.creative_action}
```

Also update the "What Your Scores Reveal" instruction (line 61) to reference the new names (e.g., `"Your Unhook Identity score sits at 3.2 — which means..."`) so the AI uses these stage names consistently throughout the report.

No other files need changes -- the radar chart and all site pages already use the correct stage names.
