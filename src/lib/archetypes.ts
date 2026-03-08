export interface Archetype {
  name: string;
  tagline: string;
  description: string;
  vulnerability: string;
  salonEntry: {
    activity: string;
    body: string;
    href: string;
  };
}

const archetypes: Record<string, Archetype> = {
  "the-amplifier": {
    name: "The Amplifier",
    tagline: "You're building toward leading others through this.",
    description: "Everything is high. The full Great Repurpose is in motion. You've done the inner work, found your signal, built your AI fluency, and you're creating. The question now isn't readiness — it's reach and responsibility.",
    vulnerability: "The risk at this stage is isolation. You're ahead of most people around you, and that can feel lonely. Don't mistake self-sufficiency for not needing community.",
    salonEntry: {
      activity: "Mastermind Practice Lab",
      body: "You don't need introductory resources — you need peers operating at your level. The Mastermind Practice Lab is where people like you pressure-test ideas, share what's working, and push each other further.",
      href: "https://aisalon.mn.co/spaces/21791897",
    },
  },
  "the-awakener": {
    name: "The Awakener",
    tagline: "You're building toward clarity. Everything is early.",
    description: "No dimension above 5, average below 4. You just started looking. The disorientation you feel isn't failure — it's the honest beginning of something important. Most people never even get here.",
    vulnerability: "The danger is paralysis. When everything feels unclear, doing nothing feels safest. But stillness in the fog isn't rest — it's stagnation.",
    salonEntry: {
      activity: "Friday Office Hours",
      body: "You don't need a course or a program right now. You need a room full of people who get it. Friday Office Hours is the lowest-pressure entry point — show up, listen, ask a question if you want to.",
      href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet",
    },
  },
  "the-explorer": {
    name: "The Explorer",
    tagline: "You're building toward a new creative practice.",
    description: "You've jumped into AI tools or started creating, but the foundation is missing. High tool engagement without the inner work. You're building with powerful instruments but without a clear signal of your own.",
    vulnerability: "You might be using AI fluency as a shield against deeper questions about what you actually want to build and why.",
    salonEntry: {
      activity: "Learn Out Loud",
      body: "You don't need more tool tutorials. You need the reflective space to figure out what all that capability is in service of. The Learn Out Loud sessions are designed for exactly this — exploring direction, not just skill.",
      href: "https://aisalon.mn.co/events/learn-out-loud",
    },
  },
  "the-firestarter": {
    name: "The Firestarter",
    tagline: "You're building toward something that just caught fire.",
    description: "One dimension is dramatically ahead of the rest. A single breakthrough. Something sparked — and the work is to let that spark illuminate the other areas instead of burning out alone.",
    vulnerability: "Dismissing the spark as 'not enough.' It is enough. It's the thread to pull. But a single flame without fuel eventually dies.",
    salonEntry: {
      activity: "Friday Office Hours",
      body: "Bring your spark to a room full of people who will see it. Friday Office Hours is where nascent breakthroughs get their first audience — and where you can start to see how your one strong dimension connects to the others.",
      href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet",
    },
  },
  "the-original": {
    name: "The Original",
    tagline: "You're building toward becoming irreplaceable.",
    description: "Identity unhooked and value found, but you haven't aimed it or engaged with tools. You know who you are and what you bring. You just haven't done anything with it yet.",
    vulnerability: "Clarity without action becomes complacency. Knowing your value isn't the same as deploying it. The world won't wait for you to feel ready.",
    salonEntry: {
      activity: "AI Learning Lab",
      body: "You've done the hard part — the identity and clarity work. Now you need a low-stakes, high-trust space to actually use the tools. The AI Learning Lab is built for people exactly like you: clear on who they are, ready to learn how AI fits.",
      href: "https://aisalon.mn.co/spaces/12680384",
    },
  },
  "the-compass": {
    name: "The Compass",
    tagline: "You're building toward leading the way.",
    description: "Identity, value, and purpose are all strong. The inner work is fully done. Tools and creation haven't started. You have the perfect map but no boots on the ground yet.",
    vulnerability: "Waiting for the 'right moment' to engage with AI. There isn't one. The right moment was yesterday; the second-best moment is today.",
    salonEntry: {
      activity: "AI Learning Lab",
      body: "You've done the hardest part — the identity, value, and purpose work. Now you need a low-stakes, high-trust space to actually pick up the tools. The AI Learning Lab is built for people exactly like you.",
      href: "https://aisalon.mn.co/spaces/12680384",
    },
  },
  "the-architect": {
    name: "The Architect",
    tagline: "You're building toward something only you can build.",
    description: "Strong across identity, value, purpose, and tool engagement. The only thing missing is creative output — you understand everything and have built nothing. The gap is specifically in creation, not knowledge.",
    vulnerability: "Perfectionism disguised as preparation. You keep refining the plan instead of shipping the first version. Understanding without making is just sophisticated procrastination.",
    salonEntry: {
      activity: "Mastermind Practice Lab",
      body: "You need accountability, not more clarity. The Mastermind Practice Lab is where people commit to making something and then actually do it — with support, feedback, and gentle pressure.",
      href: "https://aisalon.mn.co/spaces/21791897",
    },
  },
  "the-translator": {
    name: "The Translator",
    tagline: "You're building toward bridging two worlds.",
    description: "Strong on the ends — identity is solid and tools or creation are engaged — but there's a structural hole in value clarity or purpose direction. The ends are impressive, the middle is the risk.",
    vulnerability: "Activity without direction is just noise. You're building impressively but the strategic layer is thin. Without the middle, the ends don't connect.",
    salonEntry: {
      activity: "Learn Out Loud",
      body: "You need the excavation work — figuring out what's actually worth building. The Learn Out Loud sessions are designed to slow you down just enough to find your signal before you amplify it.",
      href: "https://aisalon.mn.co/events/learn-out-loud",
    },
  },
  "the-catalyst": {
    name: "The Catalyst",
    tagline: "You're building toward amplifying everything you touch.",
    description: "Solid across the board. No catastrophic gaps. No single dimension fully resolved either. You're one push from accelerating — and the most common profile is also the most important to make compelling.",
    vulnerability: "Complacency. 'Good enough' can become the enemy of great. The last 20% is where the real differentiation happens.",
    salonEntry: {
      activity: "AI Learning Lab",
      body: "You're close. The AI Learning Lab will help you close the gap on tools, while the community helps sharpen the rest. You don't need a transformation — you need a catalyst.",
      href: "https://aisalon.mn.co/spaces/12680384",
    },
  },
  "the-unlocker": {
    name: "The Unlocker",
    tagline: "You're building toward freedom from the old story.",
    description: "Identity is the active bottleneck. You're in the process of separating self from title, and nothing else can move until this does. Everything is waiting behind this one door.",
    vulnerability: "Every headline about AI replacing jobs lands like a personal attack. You're not processing information — you're processing threat. The grip on the old identity is the thing keeping you stuck.",
    salonEntry: {
      activity: "Friday Office Hours",
      body: "Start with people, not tools. The Friday Office Hours sessions are full of people working through the same identity questions. Hearing someone else say 'I don't know who I am without my title' can be the thing that cracks the door open.",
      href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet",
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

export function matchArchetype(scores: Scores): Archetype {
  const { identity: id, value: vc, purpose: pd, ai_relationship: ai, creative_action: ca } = scores;
  const all = [id, vc, pd, ai, ca];
  const avg = all.reduce((a, b) => a + b, 0) / 5;
  const max = Math.max(...all);
  const min = Math.min(...all);

  // 1. The Amplifier — all high, check first
  if (id >= 7 && vc >= 7 && pd >= 7 && ai >= 7 && ca >= 7) return archetypes["the-amplifier"];

  // 2. The Awakener — all low, check second
  if (max <= 5 && avg <= 4) return archetypes["the-awakener"];

  // 3. The Explorer — tool-heavy without foundation
  if ((ai >= 5 || ca >= 5) && (id <= 4 || vc <= 4)) return archetypes["the-explorer"];

  // 4. The Firestarter — single spike
  if ((max - avg) >= 3) return archetypes["the-firestarter"];

  // 5. The Translator — strong ends, missing middle
  if (id >= 7 && (ai >= 5 || ca >= 5) && (vc <= 4 || pd <= 4)) return archetypes["the-translator"];

  // 6. The Architect — everything but creation
  if (id >= 5 && vc >= 5 && pd >= 5 && ai >= 5 && ca <= 4) return archetypes["the-architect"];

  // 7. The Compass — inner work done, tools untouched
  if (id >= 7 && vc >= 7 && pd >= 7 && ai < 5 && ca < 5) return archetypes["the-compass"];

  // 8. The Original — identity + value without direction
  if (id >= 7 && vc >= 7 && pd < 7 && (ai < 5 || ca < 5)) return archetypes["the-original"];

  // 9. The Unlocker — identity bottleneck
  if (id <= 5 && id >= avg - 1 && avg <= 5 && all.every(s => s <= 6)) return archetypes["the-unlocker"];

  // 10. The Catalyst — balanced fallback
  return archetypes["the-catalyst"];
}

export function getArchetypeSlug(archetype: Archetype): string {
  return Object.entries(archetypes).find(([, v]) => v === archetype)?.[0] || "the-catalyst";
}

export { archetypes };
