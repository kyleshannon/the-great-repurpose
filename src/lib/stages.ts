export const stageAnchors = {
  "Unhook Identity": "unhook-identity",
  "Reclaim Value": "reclaim-value",
  "Find Your Purpose": "find-your-purpose",
  "Discover AI's Power": "discover-ai-power",
  "Start Creating": "start-creating",
} as const;

export const stageDefinitions = {
  "Unhook Identity":
    "Separate your worth from the title, craft, task list, or workflow AI may be disrupting. You are more than the work you used to perform.",
  "Reclaim Value":
    "Name the durable human layer underneath the tasks: taste, judgment, perspective, trust, relationships, and lived experience.",
  "Find Your Purpose":
    "Point your reclaimed value toward a problem, audience, community, or contribution that gives your next chapter direction.",
  "Discover AI's Power":
    "Explore AI as an instrument once identity, value, and purpose have a foundation. The tools amplify what only you can bring.",
  "Start Creating":
    "Ship, share, teach, build, and lead out loud. Creation turns AI readiness into visible transformation.",
} as const;

export type TgrStage = keyof typeof stageDefinitions;

export const getStageAnchor = (stage: string) =>
  stageAnchors[stage as TgrStage] ??
  stage
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const getStagePath = (stage: string) => `/phases#${getStageAnchor(stage)}`;

export const getStageDefinition = (stage: string) =>
  stageDefinitions[stage as TgrStage] ?? "Explore this stage in The Great Repurpose framework.";
