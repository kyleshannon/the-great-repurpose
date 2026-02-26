

# Add Kit Tags Based on Archetype

## What This Does
After subscribing a user to the Kit form, we'll also tag them with their matched archetype tag so you can use tag-based automations in Kit.

## Changes

### Modify `supabase/functions/subscribe-kit/index.ts`

1. Add an archetype-to-tag-ID mapping:

```text
the-amplifier   -> 16555347
the-architect   -> 16555359
the-awakener    -> 16555348
the-catalyst    -> 16554557
the-compass     -> 16555360
the-explorer    -> 16555350
the-firestarter -> 16555352
the-original    -> 16555385
the-translator  -> 16555356
the-unlocker    -> 16555386
```

2. After Step 2 (add to form), add a **Step 3** that tags the subscriber using the Kit v4 API:

   - Endpoint: `POST https://api.kit.com/v4/tags/{tag_id}/subscribers/{subscriber_id}`
   - Uses the same `X-Kit-Api-Key` header
   - Only fires if the `archetype` value maps to a known tag ID
   - Logged but non-blocking (won't fail the overall response)

No other files need to change -- the `archetype` slug is already passed from `ResultsPreview.tsx` to this function.

