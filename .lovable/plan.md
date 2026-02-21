

# Self-Check: Slider Fix + Softer Question Framing

## Two Changes

### 1. Fix Slider Click Area

The current slider has a hidden `<input type="range">` that's only 4px tall (`h-4`) and offset awkwardly, making it nearly impossible to click the visual track. The fix:

- Remove the layered approach (hidden input + visual track + separate thumb)
- Replace with a single clickable div-based slider that registers clicks anywhere on a generous hit area (at least 44px tall tap target)
- On click/drag anywhere in the track area, calculate the position and update the value
- Keep the same coral-to-blue gradient visual, but make the entire area responsive to touch and click

### 2. Rewrite Questions to Be Less Direct

The current questions read like clinical assessments ("My sense of self is largely tied to my work"). For sensitive territory, we should use **scenario-based framing** -- paint a moment and let people place themselves in it. This feels less like being evaluated and more like reflecting.

**Revised questions:**

| # | Context prompt | Left end | Right end |
|---|---|---|---|
| 1 (Identity) | "Imagine your job title disappeared tomorrow..." | "I'd feel lost -- that title is a big part of how I see myself" | "I'd be fine -- who I am doesn't really live in a title" |
| 2 (Identity+Value) | "A tool just did in seconds what used to take you hours..." | "Honestly? It stings a little" | "Interesting -- my real value was never in that task" |
| 3 (Value Clarity) | "A friend introduces you at a dinner party..." | "I'd fumble for what to say beyond my job" | "I know exactly what I'd want them to say about me" |
| 4 (Purpose Direction) | "You have a free Saturday with no obligations..." | "I'd probably drift -- I'm not sure what I'm building toward" | "I know exactly what I'd spend it on" |
| 5 (Purpose+AI) | "You read a headline: 'AI will reshape every industry by 2030'..." | "My stomach drops a little" | "I lean in -- I want to know more" |
| 6 (AI Relationship) | "Someone hands you a new AI tool and says 'try this'..." | "I'd put it off or feel overwhelmed" | "I'd be tinkering with it within the hour" |
| 7 (Creative Action) | "Think about the last month..." | "I mostly consumed other people's ideas" | "I made something and put it out there, even if it wasn't perfect" |

---

## Technical Details

### File: `src/pages/SelfCheck.tsx`

**Slider rewrite** -- Replace the `CustomSlider` component (lines 71-124) with a div-based click/drag slider:
- A container div with `min-h-[44px]` for accessibility
- `onMouseDown` / `onTouchStart` handlers that calculate position as percentage of track width
- `onMouseMove` / `onTouchMove` for drag support (attach to window, clean up on mouseup/touchend)
- The gradient track and thumb rendered as child divs (no hidden input)
- `cursor-pointer` on the whole area

**Question text update** -- Replace the `questions` array (lines 5-55) with the softer scenario-based versions above. The `id`, `dimension`, and `dimensionMap` all stay the same -- only `context`, `left`, and `right` strings change.

No other files are affected.
