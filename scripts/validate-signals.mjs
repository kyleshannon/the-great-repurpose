import fs from "node:fs";
import path from "node:path";

const signalsDir = path.join(process.cwd(), "public", "signals");
const indexPath = path.join(signalsDir, "index.json");

const canonicalStages = new Set([
  "Unhook Identity",
  "Reclaim Value",
  "Find Your Purpose",
  "Discover AI's Power",
  "Start Creating",
]);

const bannedPatternFragments = [
  "The signal is no longer that AI might someday change work. The signal is that companies are already using it to redraw roles, expectations, and leverage.",
  "This matters to The Great Repurpose because it separates the human being from the job wrapper around them.",
  "The story helps show where AI is changing work, value, agency, or creation.",
];

const errors = [];

const fail = (message) => errors.push(message);
const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const normalize = (value) => String(value ?? "").trim().replace(/\s+/g, " ");
const sameArray = (a, b) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((value, index) => value === b[index]);

const index = readJson(indexPath);
const patternsByText = new Map();

if (!Array.isArray(index)) {
  fail("public/signals/index.json must be an array.");
} else {
  for (let i = 1; i < index.length; i += 1) {
    if (String(index[i - 1].date) < String(index[i].date)) {
      fail(`index.json is not sorted newest-first at ${index[i - 1].slug} -> ${index[i].slug}.`);
    }
  }
}

for (const entry of Array.isArray(index) ? index : []) {
  const slug = normalize(entry.slug);
  const filePath = path.join(signalsDir, `${slug}.json`);

  if (!slug) {
    fail("index.json contains an entry without a slug.");
    continue;
  }

  if (!fs.existsSync(filePath)) {
    fail(`${slug}: missing public/signals/${slug}.json.`);
    continue;
  }

  const signal = readJson(filePath);
  const pattern = normalize(signal.pattern);
  const indexPattern = normalize(entry.pattern);

  if (signal.slug !== slug) fail(`${slug}: file slug does not match index slug.`);
  if (signal.date !== entry.date) fail(`${slug}: file date does not match index date.`);
  if (signal.title !== entry.title) fail(`${slug}: file title does not match index title.`);
  if (!sameArray(signal.stages, entry.stages)) fail(`${slug}: file stages do not match index stages.`);
  if (signal.imageUrl !== entry.imageUrl) fail(`${slug}: file imageUrl does not match index imageUrl.`);
  if (pattern !== indexPattern) fail(`${slug}: file pattern does not match index pattern.`);

  if (pattern.length < 160) fail(`${slug}: pattern is too short to carry real issue-level insight.`);
  for (const fragment of bannedPatternFragments) {
    if (pattern.includes(fragment)) fail(`${slug}: pattern contains banned generic copy.`);
  }

  const existingSlug = patternsByText.get(pattern);
  if (existingSlug) {
    fail(`${slug}: pattern duplicates ${existingSlug}.`);
  } else {
    patternsByText.set(pattern, slug);
  }

  if (!Array.isArray(signal.stages) || signal.stages.length === 0) {
    fail(`${slug}: briefing stages must be a non-empty array.`);
  } else {
    for (const stage of signal.stages) {
      if (!canonicalStages.has(stage)) fail(`${slug}: unknown briefing stage "${stage}".`);
    }
  }

  if (!signal.imageUrl) fail(`${slug}: briefing imageUrl is required.`);

  if (!Array.isArray(signal.stories) || signal.stories.length !== 5) {
    fail(`${slug}: stories must contain exactly 5 entries.`);
  } else {
    signal.stories.forEach((story, index) => {
      const prefix = `${slug}: story ${index + 1}`;
      if (!normalize(story.title)) fail(`${prefix} title is required.`);
      if (!String(story.url ?? "").startsWith("https://")) fail(`${prefix} url must be HTTPS.`);
      if (normalize(story.summary).length < 80) fail(`${prefix} summary is too short.`);
      if (!Array.isArray(story.keyPoints) || story.keyPoints.length < 2) {
        fail(`${prefix} must have at least two keyPoints.`);
      }
      if (!Array.isArray(story.stages) || story.stages.length === 0) {
        fail(`${prefix} must have at least one stage.`);
      } else {
        for (const stage of story.stages) {
          if (!canonicalStages.has(stage)) fail(`${prefix} has unknown stage "${stage}".`);
        }
      }
    });
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`[signals-validate] validated ${index.length} signal entries`);
