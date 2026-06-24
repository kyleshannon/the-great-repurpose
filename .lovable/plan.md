## Goal
Document the jsDelivr cache-purge step in the Codex instructions so newly committed signals appear on the live site within seconds instead of waiting ~12 minutes.

## Where it goes
`public/signals/SCHEMA.md` is the existing single source of truth that Codex reads when publishing a signal. Add a new section at the end so Codex sees it as part of its normal workflow — no new file, no new place to look.

## Change
Append a **"Publishing checklist"** section to `public/signals/SCHEMA.md` with these steps:

1. Write/update the signal JSON file (`public/signals/<date>-<slug>.json`).
2. Update `public/signals/index.json` to include the new entry, sorted newest first.
3. Commit and push to `main` on GitHub (`kyleshannon/the-great-repurpose`).
4. **Purge the jsDelivr cache** so the live site sees the change immediately. Hit each URL once (a GET is enough; jsDelivr returns a small JSON confirmation):
   - `https://purge.jsdelivr.net/gh/kyleshannon/the-great-repurpose@main/public/signals/index.json`
   - `https://purge.jsdelivr.net/gh/kyleshannon/the-great-repurpose@main/public/signals/<date>-<slug>.json`
5. Verify by loading `https://thegreatrepurpose.com/signals` in a fresh tab — the new entry should appear at the top within a few seconds.

Also add a one-line note explaining *why*: the live site fetches signals from `cdn.jsdelivr.net/gh/...@main/public/signals/...` at runtime, and jsDelivr edge-caches `@main` for ~12 minutes unless purged.

## Not changed
No app code changes. The runtime fetch already points at jsDelivr from the previous step.
