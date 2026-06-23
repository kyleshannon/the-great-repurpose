// Shared types + fetch helpers for the TGR Signals section.
// Data lives in /public/signals/*.json so Codex can update daily by
// writing files (no TS edits, no rebuild risk). See public/signals/SCHEMA.md.

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
  "Find Your Purpose",
  "Discover AI's Power",
  "Start Creating",
] as const;

export const fallbackSignalImage = "/signals/tgr-signal-thumbnail.jpg";

const withBase = (path: string) => `${import.meta.env.BASE_URL ?? "/"}${path}`.replace(/\/{2,}/g, "/");

const asString = (value: unknown) => (typeof value === "string" ? value : "");
const asStringArray = (value: unknown) => (Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : []);
const imageOrFallback = (value: unknown) => asString(value).trim() || fallbackSignalImage;

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
    imageUrl: asString(raw.imageUrl),
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
  const res = await fetch(withBase("signals/index.json"), { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load signal index (${res.status})`);
  const data = (await res.json()) as RawSignal[];
  return data.map(normalizeSignalIndexEntry).sort((a, b) => b.date.localeCompare(a.date));
}

export async function fetchSignal(slug: string): Promise<TgrSignal | null> {
  const res = await fetch(withBase(`signals/${slug}.json`), { cache: "no-cache" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load signal ${slug} (${res.status})`);
  return normalizeSignal((await res.json()) as RawSignal);
}

export const formatSignalDate = (date: string, opts?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...opts,
  }).format(new Date(`${date}T12:00:00Z`));
