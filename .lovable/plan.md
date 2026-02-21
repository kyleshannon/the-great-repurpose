
# Remove Entry Screen and Make Assessment Feel Like an App

## What Changes

### 1. Kill the "entry" screen -- go straight to Q1
Currently when you land on `/selfcheck`, you see an intro page with a "Begin" button, then you get the question UI. We'll remove that intermediate screen entirely. When you hit `/selfcheck`, you land directly on Question 1. The intro copy ("Seven questions. A mirror, not a grade.") will be shown as a compact header above Q1 on first load, then fade away or collapse as you move to Q2+.

### 2. Make it feel like an app, not a web page
Transform the question UI into a full-screen, immersive card-based experience:

- **Full-bleed dark background** with no visible page chrome -- remove the constellation dot pattern for a cleaner feel
- **Card-based question layout** -- each question lives in a centered, subtly bordered card with generous padding and rounded corners, floating on the dark background
- **Swipe/slide transitions** -- questions animate in from the right and out to the left (with `prefers-reduced-motion` respected)
- **Bottom-anchored navigation** -- move the "Next" button to a fixed bottom bar (like a mobile app's action area), always visible, no scrolling needed
- **Minimal top bar** -- just a back arrow (left) and step dots or a thin progress arc (right). Remove the text "Home" and "Back" labels; use icon-only controls
- **Step indicator dots** instead of the text "1 of 7" -- small circles, filled for completed, outlined for upcoming, highlighted for current
- **Larger touch targets** -- bigger slider thumb, taller hit area

### 3. Back button on Q1 goes Home
Since there's no entry screen anymore, pressing back on Q1 navigates to `/` (home).

## Technical Details

**File: `src/pages/SelfCheck.tsx`**
- Remove the `screen` state and the entire `if (screen === "entry")` block
- Remove `"entry"` from the state type -- component always renders the question UI
- Show a one-time intro blurb above Q1 (conditioned on `currentQ === 0`) with the key copy: dimension label "The Self-Check", headline "Seven questions. A mirror, not a grade.", and the subline about no right answers
- Update `handleBack` so when `currentQ === 0`, it calls `navigate("/")` instead of `setScreen("entry")`
- Wrap the question content area in an `AnimatePresence`-style CSS transition using a keyed wrapper div with `transition` and `transform` classes that slide content left/right on question change
- Restructure the layout:
  - Top bar: icon-only back chevron (left), step dots (center/right)
  - Middle: question card with subtle `border border-cream/10 rounded-2xl bg-cream/[0.03] backdrop-blur-sm` styling, containing dimension label, scenario text, slider labels, slider, all with more breathing room
  - Bottom: fixed action bar with the Next/See Results button, pinned to viewport bottom
- Replace the text "1 of 7" with 7 small dot indicators
- Add CSS transition classes for the card entrance animation (translateX + opacity)

**File: `src/index.css`**
- Add a keyframe/utility for the card slide-in animation
- Add styles for the step dot indicators
