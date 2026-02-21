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
  "fully-amplified": {
    name: "Fully Amplified",
    tagline: "You're not just ready — you're already building.",
    description: "All five dimensions are strong. You've done the inner work, found your signal, and you're making things happen with AI as a partner. The question now isn't readiness — it's reach.",
    vulnerability: "The risk at this stage is isolation. You're ahead of most people around you, and that can feel lonely. Don't mistake self-sufficiency for not needing community.",
    salonEntry: {
      activity: "Mastermind Practice Lab",
      body: "You don't need introductory resources — you need peers operating at your level. The Mastermind Practice Lab is where people like you pressure-test ideas, share what's working, and push each other further.",
      href: "https://thesalon.ai",
    },
  },
  "in-the-fog": {
    name: "In the Fog",
    tagline: "You're not behind. You're in the disorientation that comes before clarity.",
    description: "Everything feels uncertain right now — identity, direction, tools, action. That's not a failure state. It's the honest starting point for most people navigating this transition.",
    vulnerability: "The danger here is paralysis. When everything feels unclear, doing nothing feels safest. But stillness in the fog isn't rest — it's stagnation.",
    salonEntry: {
      activity: "Friday Office Hours",
      body: "You don't need a course or a framework right now. You need a room full of people who get it. Friday Office Hours is the lowest-pressure entry point — show up, listen, ask a question if you want to.",
      href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet",
    },
  },
  "holding-on": {
    name: "Holding On",
    tagline: "Your identity is still anchored to what you were. That's the first knot to untie.",
    description: "You're gripping tightly to the professional identity that got you here. That's understandable — it was earned. But it's also the thing most likely to keep you stuck.",
    vulnerability: "Every headline about AI replacing jobs lands like a personal attack. You're not processing information — you're processing threat.",
    salonEntry: {
      activity: "Friday Office Hours",
      body: "Start with people, not tools. The Friday Office Hours sessions are full of people working through the same identity questions. Hearing someone else say 'I don't know who I am without my title' can be the thing that cracks the door open.",
      href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet",
    },
  },
  "tools-first": {
    name: "Tools First",
    tagline: "You jumped to the tools before doing the inner work. That's fixable.",
    description: "You're comfortable with AI and maybe even excited about it — but you skipped the identity and value-clarity work. You're building with powerful tools but without a clear signal of your own.",
    vulnerability: "You might be using AI fluency as a shield against deeper questions about what you actually want to build and why.",
    salonEntry: {
      activity: "Learn Out Loud",
      body: "You don't need more tool tutorials. You need the reflective space to figure out what all that capability is in service of. The Learn Out Loud sessions are designed for exactly this — exploring direction, not just skill.",
      href: "https://thesalon.ai",
    },
  },
  "in-the-grief": {
    name: "In the Grief",
    tagline: "You're mourning something real. That's not weakness — it's the prerequisite for what comes next.",
    description: "You've started to separate your identity from your role, but the loss is still raw. Value feels unclear, direction is foggy, and AI feels like the thing that caused the wound.",
    vulnerability: "Grief that doesn't move becomes bitterness. The work isn't to 'get over it' — it's to let it become fuel for something new.",
    salonEntry: {
      activity: "Friday Office Hours",
      body: "Grief needs witnesses, not solutions. Friday Office Hours is a space where you can name what you've lost without someone immediately trying to fix it. That's more valuable than any tool right now.",
      href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet",
    },
  },
  "ready-on-paper": {
    name: "Ready on Paper",
    tagline: "You've got the clarity. Now you need the creative courage to act on it.",
    description: "Identity, value, purpose, even AI relationship — they're all in decent shape. But you're not making things. The gap between knowing and doing is the only thing standing between you and momentum.",
    vulnerability: "Perfectionism disguised as preparation. You keep refining the plan instead of shipping the first version.",
    salonEntry: {
      activity: "Mastermind Practice Lab",
      body: "You need accountability, not more clarity. The Mastermind Practice Lab is where people commit to making something and then actually do it — with support, feedback, and gentle pressure.",
      href: "https://thesalon.ai",
    },
  },
  "clear-and-waiting": {
    name: "Clear and Waiting",
    tagline: "You know who you are and what you want. Now it's time to pick up the tools.",
    description: "Your inner work is strong — identity, value, purpose are all clear. But AI still feels foreign and creative action hasn't started. You're ready for the building phase but haven't entered it yet.",
    vulnerability: "Waiting for the 'right moment' to engage with AI. There isn't one. The right moment was yesterday; the second-best moment is today.",
    salonEntry: {
      activity: "AI Learning Lab",
      body: "You've done the hard part — the identity and clarity work. Now you need a low-stakes, high-trust space to actually use the tools. The AI Learning Lab is built for people exactly like you: clear on who they are, ready to learn how AI fits.",
      href: "https://thesalon.ai",
    },
  },
  "skipped-the-middle": {
    name: "Skipped the Middle",
    tagline: "You went from identity straight to tools. The messy middle still needs you.",
    description: "Strong sense of self, decent AI skills — but value clarity and purpose direction got bypassed. You know who you are and you can use the tools, but the strategic layer is thin.",
    vulnerability: "You might be building impressively but aimlessly. Activity without direction is just noise.",
    salonEntry: {
      activity: "Learn Out Loud",
      body: "You need the excavation work — figuring out what's actually worth building. The Learn Out Loud sessions are designed to slow you down just enough to find your signal before you amplify it.",
      href: "https://thesalon.ai",
    },
  },
  "building-without-a-map": {
    name: "Building Without a Map",
    tagline: "You're making things happen — just not sure they're the right things yet.",
    description: "AI relationship is strong, creative action is happening — but purpose direction is weak. You're productive and capable, but the compass isn't set.",
    vulnerability: "Burnout from building without meaning. You can sustain output for a while, but without direction it eventually hollows out.",
    salonEntry: {
      activity: "Learn Out Loud",
      body: "You don't need more productivity — you need more purpose. The Learn Out Loud sessions help you step back from the building and ask: what is all this in service of?",
      href: "https://thesalon.ai",
    },
  },
  "first-spark": {
    name: "First Spark",
    tagline: "Something is lighting up — follow it.",
    description: "One dimension is significantly stronger than the rest. There's a spark — a place where you're clearly alive and engaged. The work is to let that spark illuminate the other areas.",
    vulnerability: "Dismissing the spark as 'not enough.' It is enough. It's the thread to pull.",
    salonEntry: {
      activity: "Friday Office Hours",
      body: "Bring your spark to a room full of people who will see it. Friday Office Hours is where nascent ideas get their first audience — and where you can start to see how your one strong dimension connects to the others.",
      href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet",
    },
  },
  "closer-than-you-think": {
    name: "Closer Than You Think",
    tagline: "The foundation is solid. A few intentional moves and everything clicks.",
    description: "Most dimensions are in good shape. You're not far from full readiness — it's about deliberate attention to the areas that are lagging, not wholesale reinvention.",
    vulnerability: "Complacency. 'Good enough' can become the enemy of great. The last 20% is where the real differentiation happens.",
    salonEntry: {
      activity: "AI Learning Lab",
      body: "You're close. The AI Learning Lab will help you close the gap on tools, while the community helps sharpen the rest. You don't need a transformation — you need a tune-up.",
      href: "https://thesalon.ai",
    },
  },
  "finding-the-layer": {
    name: "Finding the Layer",
    tagline: "You're starting to see what's underneath. Keep digging.",
    description: "Identity is separating from role, and you're beginning to excavate your unique value — but it's not yet clear or confident. You're in the archaeological phase.",
    vulnerability: "Stopping too soon. The first layer of insight feels like the answer, but there's usually something deeper and more specific underneath.",
    salonEntry: {
      activity: "Learn Out Loud",
      body: "The excavation work is best done in community. Learn Out Loud sessions give you a space to think out loud about what you're finding — and other people's reflections often reveal what you can't see yourself.",
      href: "https://thesalon.ai",
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

  // 1. Fully Amplified
  if (all.every(s => s >= 7)) return archetypes["fully-amplified"];

  // 2. In the Fog
  if (max <= 5 && avg <= 3.5) return archetypes["in-the-fog"];

  // 3. Holding On
  if (id <= 3 && avg <= 5) return archetypes["holding-on"];

  // 4. Tools First
  if (ai >= 5 && id <= 4 && vc <= 4) return archetypes["tools-first"];

  // 5. In the Grief
  if (id >= 3 && id <= 5 && vc <= 5 && pd <= 4 && ai <= 4) return archetypes["in-the-grief"];

  // 6. Ready on Paper
  if (id >= 5 && vc >= 5 && pd >= 5 && ai >= 5 && ca <= 4) return archetypes["ready-on-paper"];

  // 7. Clear and Waiting
  if (id >= 7 && vc >= 7 && pd >= 7 && ai <= 5 && ca <= 5) return archetypes["clear-and-waiting"];

  // 8. Skipped the Middle
  if (id >= 7 && (ai + ca) / 2 >= 5 && (vc + pd) / 2 <= 4) return archetypes["skipped-the-middle"];

  // 9. Building Without a Map
  if (ai >= 7 && ca >= 5 && pd <= 5) return archetypes["building-without-a-map"];

  // 10. First Spark
  if (max - avg >= 3) return archetypes["first-spark"];

  // 11. Closer Than You Think
  if (id >= 6 && vc >= 6 && pd >= 6 && ai >= 4 && ca >= 4) return archetypes["closer-than-you-think"];

  // 12. Finding the Layer
  if (id >= 5 && vc >= 4 && vc <= 6) return archetypes["finding-the-layer"];

  // Fallback
  if (avg <= 4) return archetypes["in-the-fog"];
  return archetypes["finding-the-layer"];
}

export function getArchetypeSlug(archetype: Archetype): string {
  return Object.entries(archetypes).find(([, v]) => v === archetype)?.[0] || "finding-the-layer";
}

export { archetypes };
