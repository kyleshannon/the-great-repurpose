export const stageAnchors = {
  "Unhook Identity": "unhook-identity",
  "Reclaim Value": "reclaim-value",
  "Discover Purpose": "discover-purpose",
  "Become AI Ready": "become-ai-ready",
  "Relaunch Yourself": "relaunch-yourself",
} as const;

export const stageDefinitions = {
  "Unhook Identity":
    "Separate your worth from the title, craft, task list, or workflow AI may be disrupting. You are more than the work you used to perform.",
  "Reclaim Value":
    "Name the durable human layer underneath the tasks: taste, judgment, perspective, trust, relationships, and lived experience.",
  "Discover Purpose":
    "Point your reclaimed value toward a problem, audience, community, or contribution that gives your next chapter direction.",
  "Become AI Ready":
    "Put yourself at the center and explore AI without expectations. Play is how you find out what you can actually do with it.",
  "Relaunch Yourself":
    "Turn who you are into visible work, real opportunities, and income that no longer depends on one employer.",
} as const;

export const stageTaglines = {
  "Unhook Identity": "I'm not my job.",
  "Reclaim Value": "Here's Who I Am.",
  "Discover Purpose": "What matters to me.",
  "Become AI Ready": "Understand AI's power to amplify your ideas.",
  "Relaunch Yourself": "Turn who you are into work, opportunity, and income.",
} as const;

// Older Signal issues retain their historical labels. Resolve those labels
// to the current framework so their links and definitions remain useful.
export const legacyStageAliases = {
  "Find Your Purpose": "Discover Purpose",
  "Discover AI's Power": "Become AI Ready",
  "Start Creating": "Relaunch Yourself",
} as const;

export type TgrStage = keyof typeof stageDefinitions;

export const normalizeStage = (stage: string) =>
  legacyStageAliases[stage as keyof typeof legacyStageAliases] ?? stage;

export const getStageAnchor = (stage: string) =>
  stageAnchors[normalizeStage(stage) as TgrStage] ??
  normalizeStage(stage)
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")    .replace(/^-|-$/g, "");

export const getStagePath = (stage: string) => `/phases#${getStageAnchor(stage)}`;

export const getStageDefinition = (stage: string) =>
  stageDefinitions[normalizeStage(stage) as TgrStage] ?? "Explore this stage in The Great Repurpose framework.";

export const getStageTagline = (stage: string) =>
  stageTaglines[normalizeStage(stage) as TgrStage] ?? "";
