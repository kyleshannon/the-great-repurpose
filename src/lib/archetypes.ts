export type CategoryKey = "identity-seekers" | "direction-finders" | "builders-in-motion" | "capstone";

export type StageKey = "identity" | "value" | "purpose" | "ai_relationship" | "creative_action";

export type TrackKey = "transition" | "executive" | "community";

export interface NextStepAction {
  label: string;
  desc: string;
  href?: string;
}

export interface Archetype {
  name: string;
  tagline: string;
  description: string;
  vulnerability: string;
  category: CategoryKey;
  /** What to do next, driven by where this profile is typically weakest. */
  nextStep: {
    focus: StageKey;
    body: string;
    track: TrackKey;
  };
}

export interface Category {
  key: CategoryKey;
  name: string;
  label: string; // singular form, e.g. "Direction Finder"
  tagline: string;
  description: string;
  archetypeSlugs: string[];
}

// ── Where to go next ─────────────────────────────────────────────────────────

export const tracks: Record<TrackKey, NextStepAction> = {
  transition: {
    label: "The TGR Transition Academy",
    desc: "Built for people whose role was cut, compressed, or rewritten out from under them. A guided path through unhooking identity, naming your value, and turning it into work that pays.",
    href: "/academy#transition",
  },
  executive: {
    label: "The Executive Leadership Academy",
    desc: "For leaders carrying other people through this shift. How to make AI decisions that respect judgment, protect the human layer, and still move fast.",
    href: "/academy#executive",
  },
  community: {
    label: "An AI-forward community",
    desc: "Consider joining an AI-forward community such as the AI Salon (theSalon.ai) — momentum is easier to find in a room where nobody is pretending this is normal.",
    href: "https://community.thesalon.ai",
  },
};

/** Practical ways to shore up whichever stage is weakest. */
export const stageNextSteps: Record<StageKey, NextStepAction[]> = {
  identity: [
    { label: "Answer the dinner-party question differently", desc: "For two weeks, answer \"what do you do?\" without a title or an employer. Describe a problem you care about instead. Notice what it costs you to say it." },
    { label: "Write the inventory the title hides", desc: "List ten things you're good at that no job description ever captured. Judgment calls, reads on people, standards you hold. That list is the part AI can't absorb." },
    { label: "Say it out loud to someone", desc: "Tell one person you trust that you don't know who you are without the work. Naming it out loud is what stops it running the show underneath." },
  ],
  value: [
    { label: "Run the AI comparison on purpose", desc: "Have AI produce a version of something you'd normally make. Then mark every place it's wrong, thin, or tone-deaf. That margin is your value, written down." },
    { label: "Get it in one sentence", desc: "Write what you bring in a sentence with no job title and no task in it. Rewrite it until someone outside your field understands it immediately." },
    { label: "Ask three people who've worked with you", desc: "Ask what they come to you for that they wouldn't get elsewhere. People are usually specific in ways you can't be about yourself." },
  ],
  purpose: [
    { label: "Follow what you keep reading", desc: "Track what you return to for a month — the articles, the arguments, the problems you can't leave alone. Direction shows up in the pattern, not in a flash." },
    { label: "Choose an audience, not a job", desc: "Name the people you want your work to reach. Purpose gets concrete the moment it has someone on the other end of it." },
    { label: "Test it in conversation", desc: "Have five conversations with people working on something adjacent to what pulls you. Purpose is found through engagement, not introspection." },
  ],
  ai_relationship: [
    { label: "Play with no deliverable", desc: "Spend an hour a week using AI on something that isn't work at all. Efficiency use will never show you what's possible — undirected play will." },
    { label: "Put yourself at the center of the prompt", desc: "Stop asking AI what it can do and start telling it who you are, what you value, and who you're trying to reach. The output changes completely." },
    { label: "Chase one impossible idea", desc: "Pick something you'd have said you weren't capable of building. Try to build a rough version. The ceiling you assumed is usually not there." },
  ],
  creative_action: [
    { label: "Make one thing visible this month", desc: "Not a plan — an artifact. A prototype, an essay, an offer, a demo. Something a stranger can look at and understand what you can do now." },
    { label: "Name the offer and the price", desc: "Write what you do, who needs it, and what it costs. Vagueness is what keeps opportunity from reaching you." },
    { label: "Build a second channel", desc: "Add one more way work and money can find you beyond a single employer — clients, teaching, a product, a collaboration. Two channels is a different kind of security." },
  ],
};

export const categories: Record<CategoryKey, Category> = {
  "identity-seekers": {
    key: "identity-seekers",
    name: "Identity Seekers",
    label: "Identity Seeker",
    tagline: "The work right now is inner: who are you when the title falls away?",
    description: "You're early in the journey. The disorientation is real — but it's the honest beginning of finding yourself again on the other side of AI.",
    archetypeSlugs: ["the-unlocker", "the-awakener", "the-explorer"],
  },
  "direction-finders": {
    key: "direction-finders",
    name: "Direction Finders",
    label: "Direction Finder",
    tagline: "You know yourself. Now the work is aiming it at something that matters.",
    description: "Identity is loosening. The next move is direction — naming your value, picking a problem worth solving, pointing your clarity at a target.",
    archetypeSlugs: ["the-firestarter", "the-translator", "the-original"],
  },
  "builders-in-motion": {
    key: "builders-in-motion",
    name: "Builders in Motion",
    label: "Builder in Motion",
    tagline: "The foundation is set. The work is shipping, not preparing.",
    description: "You've done most of the inner work. The remaining gap is action — picking up tools, making things, putting work in front of real people.",
    archetypeSlugs: ["the-compass", "the-architect", "the-catalyst"],
  },
  "capstone": {
    key: "capstone",
    name: "The Amplifier",
    label: "Amplifier",
    tagline: "You've made it through. Now the real work begins.",
    description: "All five dimensions are alive in you. What's ahead isn't a victory lap — it's doing this work at a different scale, with more on the line, and pulling others through as you go.",
    archetypeSlugs: ["the-amplifier"],
  },
};

const archetypes: Record<string, Archetype> = {
  "the-amplifier": {
    name: "The Amplifier",
    category: "capstone",
    tagline: "You're building toward leading others through this.",
    description: "Everything is high. The full Great Repurpose is in motion. You've done the inner work, found your signal, built your AI fluency, and you're creating. The question now isn't readiness — it's reach and responsibility.",
    vulnerability: "The risk at this stage is isolation. You're ahead of most people around you, and that can feel lonely. Don't mistake self-sufficiency for not needing peers.",
    nextStep: {
      focus: "creative_action",
      body: "Your gap isn't capability — it's scale and the people around you. The next move is taking others through what you've already worked out, and putting your work in front of rooms bigger than the one you're in.",
      track: "executive",
    },
  },
  "the-awakener": {
    name: "The Awakener",
    category: "identity-seekers",
    tagline: "You're building toward clarity. Everything is early.",
    description: "No dimension above 5, average below 4. You just started looking. The disorientation you feel isn't failure — it's the honest beginning of something important. Most people never even get here.",
    vulnerability: "The danger is paralysis. When everything feels unclear, doing nothing feels safest. But stillness in the fog isn't rest — it's stagnation.",
    nextStep: {
      focus: "identity",
      body: "Start where the pressure actually is: the knot between who you are and what you did for a living. Everything else gets easier once that loosens, and none of it moves while it's tight.",
      track: "transition",
    },
  },
  "the-explorer": {
    name: "The Explorer",
    category: "identity-seekers",
    tagline: "You're building toward a new creative practice.",
    description: "You've jumped into AI tools or started creating, but the foundation is missing. High tool engagement without the inner work. You're building with powerful instruments but without a clear signal of your own.",
    vulnerability: "You might be using AI fluency as a shield against deeper questions about what you actually want to build and why.",
    nextStep: {
      focus: "value",
      body: "You don't need more tool tutorials. You need to name the layer underneath the output — your taste, your judgment, the thing that makes what you make yours rather than the tool's.",
      track: "community",
    },
  },
  "the-firestarter": {
    name: "The Firestarter",
    category: "direction-finders",
    tagline: "You're building toward something that just caught fire.",
    description: "One dimension is dramatically ahead of the rest. A single breakthrough. Something sparked — and the work is to let that spark illuminate the other areas instead of burning out alone.",
    vulnerability: "Dismissing the spark as 'not enough.' It is enough. It's the thread to pull. But a single flame without fuel eventually dies.",
    nextStep: {
      focus: "purpose",
      body: "One area is well ahead of the rest. Point it at something: a problem, an audience, a change you want to make. A spark with a direction becomes a practice — without one it burns out.",
      track: "community",
    },
  },
  "the-original": {
    name: "The Original",
    category: "direction-finders",
    tagline: "You're building toward becoming irreplaceable.",
    description: "Identity unhooked and value found, but you haven't aimed it anywhere yet. You know who you are and what you bring. The next step is direction: pick a problem worth solving or an audience worth serving, and point your clarity at it.",
    vulnerability: "Clarity without action becomes complacency. Knowing your value isn't the same as deploying it. The world won't wait for you to feel ready.",
    nextStep: {
      focus: "purpose",
      body: "You've done the hard interior work. The missing piece is a target — who your value is for. Pick the audience first and the work to do next gets obvious fast.",
      track: "transition",
    },
  },
  "the-compass": {
    name: "The Compass",
    category: "builders-in-motion",
    tagline: "You're building toward leading the way.",
    description: "Identity, value, and purpose are all strong. The inner work is fully done. Tools and creation haven't started. You have the perfect map but no boots on the ground yet.",
    vulnerability: "Waiting for the 'right moment' to engage with AI. There isn't one. The right moment was yesterday; the second-best moment is today.",
    nextStep: {
      focus: "ai_relationship",
      body: "You know exactly who you are and where you're pointed. What's missing is time in the tools — not as an efficiency exercise, but as play with no deliverable attached. That's where the ceiling lifts.",
      track: "executive",
    },
  },
  "the-architect": {
    name: "The Architect",
    category: "builders-in-motion",
    tagline: "You're building toward something only you can build.",
    description: "Strong across identity, value, purpose, and tool engagement. The only thing missing is visible output — you understand everything and have shipped nothing. The gap is specifically in relaunching, not in knowledge.",
    vulnerability: "Perfectionism disguised as preparation. You keep refining the plan instead of shipping the first version. Understanding without making is just sophisticated procrastination.",
    nextStep: {
      focus: "creative_action",
      body: "You have everything except evidence. One visible artifact this month — a prototype, an offer, a piece of work a stranger can evaluate — will move you further than another round of planning.",
      track: "transition",
    },
  },
  "the-translator": {
    name: "The Translator",
    category: "direction-finders",
    tagline: "You're building toward bridging two worlds.",
    description: "Strong on the outside edges — you know who you are and you're comfortable with tools or making things. But there's a gap in the middle: you haven't connected your identity to a clear direction. You're doing impressive things without a strategic center.",
    vulnerability: "Activity without direction is just noise. You're building impressively but the strategic layer is thin. Without the middle, the ends don't connect.",
    nextStep: {
      focus: "purpose",
      body: "The ends are strong; the middle is thin. Slow down long enough to name what's actually worth building and who it's for, then let the capability you already have serve it.",
      track: "community",
    },
  },
  "the-catalyst": {
    name: "The Catalyst",
    category: "builders-in-motion",
    tagline: "You're building toward amplifying everything you touch.",
    description: "Solid across the board. No catastrophic gaps. No single dimension fully resolved either. You're balanced, capable, and closer than you think. The risk is coasting — 'good enough' can become a ceiling. One deliberate push could change everything.",
    vulnerability: "Complacency. 'Good enough' can become the enemy of great. The last 20% is where the real differentiation happens.",
    nextStep: {
      focus: "creative_action",
      body: "You don't need a transformation, you need a forcing function. Commit to putting one real thing in front of real people on a date you've already told someone about.",
      track: "executive",
    },
  },
  "the-unlocker": {
    name: "The Unlocker",
    category: "identity-seekers",
    tagline: "You're still tying who you are to the title you held.",
    description: "Identity is the active bottleneck. You're in the process of separating self from title, and nothing else can move until this does. Everything is waiting behind this one door.",
    vulnerability: "Every headline about AI replacing jobs lands like a personal attack. You're not processing information — you're processing threat. The grip on the old identity is the thing keeping you stuck.",
    nextStep: {
      focus: "identity",
      body: "Start with people, not tools. Hearing someone else say \"I don't know who I am without my title\" is usually what cracks the door — and the door has to crack before anything else here is useful.",
      track: "transition",
    },
  },
};

export type Scores = {
  identity: number;
  value: number;
  purpose: number;
  ai_relationship: number;
  creative_action: number;
};

export function getWeakestStage(scores: Scores): StageKey {
  return (Object.entries(scores) as [StageKey, number][]).reduce(
    (min, entry) => (entry[1] < min[1] ? entry : min),
    ["identity", Infinity] as [StageKey, number]
  )[0];
}

/** The recommendations shown for a result: weakest-stage practices plus one track. */
export function getRecommendations(archetype: Archetype, scores?: Scores) {
  const focus: StageKey = scores ? getWeakestStage(scores) : archetype.nextStep.focus;
  return {
    focus,
    body: archetype.nextStep.body,
    practices: stageNextSteps[focus],
    track: tracks[archetype.nextStep.track],
  };
}

export function matchArchetype(scores: Scores): Archetype {
  const { identity: id, value: vc, purpose: pd, ai_relationship: ai, creative_action: ca } = scores;
  const all = [id, vc, pd, ai, ca];
  const avg = all.reduce((a, b) => a + b, 0) / 5;
  const max = Math.max(...all);

  // 1. The Amplifier — all high, check first. Relaunch is now measured on visible,
  //    economic output, so it clears at a slightly lower bar than the inner stages.
  if (id >= 7 && vc >= 7 && pd >= 7 && ai >= 7 && ca >= 6.5) return archetypes["the-amplifier"];

  // 2. The Awakener — all low, check second
  if (max <= 5 && avg <= 4) return archetypes["the-awakener"];

  // 3. The Explorer — tool-heavy without foundation
  if ((ai >= 5 || ca >= 5) && (id <= 4 || vc <= 4)) return archetypes["the-explorer"];

  // 4. The Firestarter — single spike
  if ((max - avg) >= 3) return archetypes["the-firestarter"];

  // 5. The Translator — strong ends, missing middle
  if (id >= 7 && (ai >= 5 || ca >= 5) && (vc <= 4 || pd <= 4)) return archetypes["the-translator"];

  // 6. The Architect — everything but a relaunch
  if (id >= 5 && vc >= 5 && pd >= 5 && ai >= 5 && ca <= 4.5) return archetypes["the-architect"];

  // 7. The Compass — inner work done, AI untouched
  if (id >= 7 && vc >= 7 && pd >= 7 && ai < 5.5 && ca < 5.5) return archetypes["the-compass"];

  // 8. The Original — identity + value without direction
  if (id >= 7 && vc >= 7 && pd < 7 && (ai < 5.5 || ca < 5.5)) return archetypes["the-original"];

  // 9. The Unlocker — identity bottleneck
  if (id <= 5 && id >= avg - 1 && avg <= 5 && all.every((s) => s <= 6)) return archetypes["the-unlocker"];

  // 10. The Catalyst — balanced fallback
  return archetypes["the-catalyst"];
}

export function getArchetypeSlug(archetype: Archetype): string {
  return Object.entries(archetypes).find(([, v]) => v === archetype)?.[0] || "the-catalyst";
}

export { archetypes };
