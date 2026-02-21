

# Richer, More Actionable TGR Type Cards

## Overview

Rewrite every type card on `/types` to feel less like an inspirational poster and more like a real description someone anxious about their future would find grounding. Each card will have: a concrete description of where this person is, what's working, what's stuck, and a specific next move they can take.

## Changes

### `src/pages/TgrTypes.tsx` — Rewrite the `types` array

Replace the short `pattern` field with a multi-sentence `description` that covers:
- **Where they are** (concrete, not abstract)
- **What's working / what's stuck** (specific dimensions, in plain language)
- **A next step** (something they can actually do)

New card content:

**The Amplifier** — You've done the work. Your sense of self doesn't depend on your title, you know what you bring that AI can't replicate, you have direction, you're comfortable with the tools, and you're already creating. The next step isn't more preparation — it's helping someone else get here. Find a peer group, start teaching what you know, or build something that pulls others forward.

**The Awakener** — Nothing feels clear yet, and that's okay. You're early — no single area has broken through, and the fog is real. The most important thing right now is to stop trying to figure it all out at once. Pick one dimension — just one — and take a small step. Read something that challenges how you think about your identity. Ask someone how they're using AI. Movement in any direction beats standing still.

**The Explorer** — You've been playing with AI tools or making things, which puts you ahead of most people. But the deeper questions — who you are without your job title, what value you bring that's uniquely yours — are still unanswered. The risk is building impressive things that don't mean anything to you. Slow down long enough to ask: what is all this capability actually for?

**The Firestarter** — Something clicked. Maybe it was a moment of clarity about your identity, or a purpose that suddenly made sense, or an AI tool that opened a door. One area of your life just leapt ahead while everything else is still catching up. Don't dismiss the spark — it's the thread to pull. The next step is to let that breakthrough inform the areas that haven't moved yet. What does your spark tell you about where to go next?

**The Translator** — You're strong on the outside edges. You know who you are and you're comfortable with tools or creation. But there's a gap in the middle — you haven't fully articulated what makes you valuable, or you haven't locked in a clear direction. You're doing impressive things without a strategic center. The next step is excavation: figure out what's actually worth building before you build more of it.

**The Architect** — You understand everything. Identity, value, purpose, tools — all solid. The only thing missing is output. You haven't shipped anything yet. The gap isn't knowledge, it's action. Perfectionism is probably disguised as preparation. The next step is to make something — anything — and put it in front of someone. A rough draft, a prototype, a first attempt. Done beats perfect.

**The Compass** — You've done the hardest part. You know who you are, what you bring, and where you're headed. But you haven't picked up the tools yet, and you haven't started creating. You have the perfect map and no boots on the ground. The next step is low-stakes experimentation with AI — not mastery, just familiarity. Try one tool. Make one thing. The inner work is done; now it's time to move.

**The Original** — Your identity is unhooked from your old title, and you've found real value in what you bring. But you haven't aimed it at anything yet, and tools or creation haven't started. You know who you are — you just haven't decided what to do about it. The next step is direction: pick a problem worth solving or an audience worth serving, and point your clarity at it.

**The Unlocker** — Identity is the bottleneck. You're still separating who you are from the title you held, and until that shifts, nothing else can move. Every AI headline feels like a personal threat. That's normal — and it's the door to walk through. The next step isn't learning a tool or finding your purpose. It's sitting with the question: who am I if I'm not my job? Start there. Everything else is waiting on the other side.

**The Catalyst** — You're solid across the board. Nothing is catastrophically low, nothing is fully resolved. You're balanced, capable, and closer than you think. The risk is coasting — "good enough" can become a ceiling. The next step is to pick the one dimension where a small push would unlock the most momentum, and lean into it. You don't need a transformation. You need a catalyst.

### UI adjustments

- Switch from `pattern` to `description` in the data and rendering
- Slightly increase card padding (`p-6` to `p-7`) to breathe with longer text
- Keep the 2-column grid on desktop; cards will naturally grow taller

### Files to modify
1. `src/pages/TgrTypes.tsx` — Rewrite `types` array data and update rendering to use `description` instead of `pattern`

