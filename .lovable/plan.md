## Goal
Make the live site fetch the latest TGR Signals from GitHub via jsDelivr, so Codex can publish daily by committing JSON files — no Lovable rebuild needed.

## How it works

```text
Codex commits public/signals/*.json  ──►  GitHub (public repo)
                                              │
                                              ▼
                                    cdn.jsdelivr.net/gh/...@main
                                              │
                                              ▼
              Live site fetches index.json + <slug>.json at runtime
                                              │
                       newest of {jsDelivr, bundled} wins
```

The bundled data in `src/data/generatedSignals.ts` stays as a guaranteed fallback if jsDelivr is ever slow, down, or behind.

## Changes

**1. `src/lib/signals.ts`** — swap the fetch base from same-origin `/signals/...` to jsDelivr:

- New constant:
  `const SIGNALS_CDN = "https://cdn.jsdelivr.net/gh/kyleshannon/the-great-repurpose@main/public/signals";`
- `fetchSignalIndex()` fetches `${SIGNALS_CDN}/index.json`
- `fetchSignal(slug)` fetches `${SIGNALS_CDN}/${slug}.json`
- Keep the existing "newest date wins" comparison against `bundledSignalIndex` so the site never regresses if the CDN is stale or unreachable.
- Use `cache: "no-cache"` (already in place) so browsers always revalidate. jsDelivr's own edge cache (~12 min for `@main`) is the real TTL.

**2. Nothing else changes.** Routing, components, RSS build, and the bundled fallback all keep working exactly as today.

## Daily publish flow for Codex

1. Codex writes a new `public/signals/<date>-<slug>.json` and updates `public/signals/index.json` in the GitHub repo.
2. Commit + push to `main`.
3. Within ~12 minutes jsDelivr serves the new file; the live site picks it up on the next visit. No Lovable deploy required.

## Optional (not in this change, mentioning for awareness)
- To force-bust jsDelivr cache instantly instead of waiting ~12 min, Codex can hit `https://purge.jsdelivr.net/gh/kyleshannon/the-great-repurpose@main/public/signals/index.json` after pushing. Happy to add that to Codex's instructions if you want.

## Risks
- If the repo is ever made private again, the CDN URLs will 404 and the site will silently fall back to bundled data (same behavior as today's same-origin fetch on a stale build). Worth knowing but not blocking.
