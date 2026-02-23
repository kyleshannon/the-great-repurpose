

# Hide Archetype Preview Before Email Entry

## What changes

The pre-email section (lines 488-545 in `ResultsPreview.tsx`) currently shows:
- "Your TGR Type"
- "You are [Archetype Name]."
- The tagline
- The radar chart with scores
- A faded description teaser

All of this will be hidden. Before email entry, users will only see:
- A heading like "Your TGR Report is ready."
- The email gate form

Everything else -- the type name, tagline, radar chart, description, and AI narrative -- will only appear after email submission.

## File to modify

**`src/pages/ResultsPreview.tsx`** -- Replace the pre-email section (lines 488-545) to remove the archetype name, tagline, radar chart, and description teaser. Keep only the `EmailGate` component with a simple prompt above it.

## Note on pre-generation

The AI interpretation will still stream in the background before email entry (no change to that logic). The user just won't see any preview of their type until after submitting.

