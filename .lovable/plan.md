## Options for the new Profiles page headline

**A.** Where you are on The Great Repurpose Journey

**B.** The 10 Profiles of The Great Repurpose

**C.** Find yourself in the journey

## What changes

1. **Profiles page (`/types`)**
   - Replace hero headline + subcopy. New subcopy explains that each profile is a point on the journey, not a stage label or ranking.
   - Remove "Capstone — for those already leading the way" label from The Amplifier card.
   - Update The Amplifier tagline to something like "Now the real work begins." Description should feel like arrival + invitation, not graduation.

2. **Homepage Profiles section (`/`)**
   - Remove "plus a capstone for those already pulling others forward" from the intro paragraph.
   - Remove "Capstone" label from the Amplifier preview line. Present The Amplifier as the 10th profile, not a separate tier.

3. **Report / Results page (`/results/:id`)**
   - Remove "You're at the capstone" headline for Amplifier results.
   - New headline for Amplifierifer: something like "You've made it through. Now the real work begins." or "Meet The Amplifier."

4. **PDF report (`src/lib/generateReport.ts`)**
   - Remove capstone-specific headline branching. Use the same category-led headline pattern for all profiles, including Amplifier.

5. **`public/llms.txt`**
   - Update Types page description to remove "plus a capstone" language.

6. **`src/lib/archetypes.ts`**
   - Rename category label from "The Capstone" / "Capstone" to something neutral like "The Amplifier" or just remove the separate naming distinction. Keep the `category: "capstone"` key internally if needed for logic.

## What does NOT change
- The 3 group names (Identity Seekers, Direction Finders, Builders in Motion) stay.
- The groupings themselves stay.
- Assessment questions, scoring, and `matchArchetype` logic stay untouched.
- The 5 stages (Unhook Identity, Reclaim Value, etc.) stay as-is everywhere else they appear.

## Pick a headline option and approve the plan — then I'll implement all the changes at once.