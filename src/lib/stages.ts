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
    "Understand AI's power to amplify your ideas — once identity, value, and purpose have a foundation.",
  "Relaunch Yourself":
    "Turn who you are into work, opportunity, and income. Ship, share, teach, build, and lead out loud.",
} as const;

export const stageTaglines = {
  "Unhook Identity": "I'm not my job.",
  "Reclaim Value": "Here's Who I Am.",
  "Discover Purpose": "What matters to me.",
  "Become AI Ready": "Understand AI's power to amplify your ideas.",
  "Relaunch Yourself": "Turn who you are into work, opportunity, and income.",
} as const;

export type TgrStage = keyof typeof stageDefinitions;

export const getStageAnchor = (stage: string) =>
  stageAnchors[stage as TgrStage] ??
  stage
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")    .replace(/^-|-$/g, "");

export const getStagePath = (stage: string) => `/phases#${getStageAnchor(stage)}`;

export const getStageDefinition = (stage: string) =>
  stageDefinitions[stage as TgrStage] ?? "Explore this stage in The Great Repurpose framework.";

export const getStageTagline = (stage: string) =>
  stageTaglines[stage as TgrStage] ?? "";
