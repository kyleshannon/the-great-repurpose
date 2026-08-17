// Shared types + fetch helpers for the TGR Signals section.
// Data lives in /public/signals/*.json so Codex can update daily by
// writing files (no TS edits, no rebuild risk). See public/signals/SCHEMA.md.

import { bundledSignalIndex, bundledSignalsBySlug } from "@/data/generatedSignals";

export type SignalStory = {
  title: string;
  url: string;
  source: string;
  published: string;
  summary: string;
  imageUrl: string;
  stages: string[];
  keyPoints: string[];
};

export type TgrSignal = {
  date: string;
  title: string;
  slug: string;
  pattern: string;
  stages: string[];
  imageUrl: string;
  stories: SignalStory[];
  sourceStatus?: string;
};

export type SignalIndexEntry = Pick<
  TgrSignal,
  "slug" | "date" | "title" | "pattern" | "stages" | "imageUrl"
>;

export const canonicalStages = [
  "Unhook Identity",
  "Reclaim Value",
  "Discover Purpose",
  "Become AI Ready",
  "Relaunch Yourself",
] as const;

export const fallbackSignalImagePath = "/signals/tgr-signal-thumbnail.jpg";
export const fallbackSignalImage = fallbackSignalImagePath;

const SIGNALS_REMOTE_BASES = [
  "https://raw.githubusercontent.com/kyleshannon/the-great-repurpose/main/public/signals",
  "https://cdn.jsdelivr.net/gh/kyleshannon/the-great-repurpose@main/public/signals",
];

const asString = (value: unknown) => (typeof value === "string" ? value : "");
const asStringArray = (value: unknown) => (Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : []);
const imageOrFallback = (value: unknown) => {
  const image = asString(value).trim();
  return !image || image === fallbackSignalImagePath ? fallbackSignalImage : image;
};
const newestDate = (signals: SignalIndexEntry[]) => signals[0]?.date ?? "";

type RawSignalStory = Partial<SignalStory> & {
  publishedAt?: string;
};

type RawSignal = Partial<TgrSignal> & {
  patternOfDay?: string;
  heroImageUrl?: string;
  stories?: RawSignalStory[];
};

function normalizeStory(raw: RawSignalStory): SignalStory {
  return {
    title: asString(raw.title),
    url: asString(raw.url),
    source: asString(raw.source),
    published: asString(raw.published) || asString(raw.publishedAt),
    summary: asString(raw.summary),
    imageUrl: imageOrFallback(raw.imageUrl),
    stages: asStringArray(raw.stages),
    keyPoints: asStringArray(raw.keyPoints),
  };
}

function normalizeSignalIndexEntry(raw: RawSignal): SignalIndexEntry {
  return {
    slug: asString(raw.slug),
    date: asString(raw.date),
    title: asString(raw.title),
    pattern: asString(raw.pattern) || asString(raw.patternOfDay),
    stages: asStringArray(raw.stages),
    imageUrl: imageOrFallback(raw.imageUrl || raw.heroImageUrl),
  };
}

function normalizeSignal(raw: RawSignal): TgrSignal {
  return {
    ...normalizeSignalIndexEntry(raw),
    stories: Array.isArray(raw.stories) ? raw.stories.map(normalizeStory) : [],
    sourceStatus: raw.sourceStatus,
  };
}

export async function fetchSignalIndex(): Promise<SignalIndexEntry[]> {
  const bundled = (bundledSignalIndex as unknown as RawSignal[])
    .map(normalizeSignalIndexEntry)
    .sort((a, b) => b.date.localeCompare(a.date));

  for (const base of SIGNALS_REMOTE_BASES) {
    try {
      const res = await fetch(`${base}/index.json`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load signal index (${res.status})`);
      const fetched = ((await res.json()) as RawSignal[])
        .map(normalizeSignalIndexEntry)
        .sort((a, b) => b.date.localeCompare(a.date));

      return newestDate(bundled) >= newestDate(fetched) ? bundled : fetched;
    } catch {
      // Try the next remote source, then fall back to bundled data.
    }
  }

  return bundled;
}

export async function fetchSignal(slug: string): Promise<TgrSignal | null> {
  const bundled = (bundledSignalsBySlug as unknown as Record<string, RawSignal>)[slug];

  for (const base of SIGNALS_REMOTE_BASES) {
    try {
      const res = await fetch(`${base}/${slug}.json`, { cache: "no-store" });
      if (res.ok) return normalizeSignal((await res.json()) as RawSignal);
      if (res.status !== 404) throw new Error(`Failed to load signal ${slug} (${res.status})`);
    } catch {
      // Try the next remote source, then fall back to bundled data.
    }
  }

  return bundled ? normalizeSignal(bundled) : null;
}

export const formatSignalDate = (date: string, opts?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...opts,
  }).format(new Date(`${date}T12:00:00Z`));
