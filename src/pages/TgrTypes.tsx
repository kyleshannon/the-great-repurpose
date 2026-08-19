import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Seo } from "@/components/Seo";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

type ProfileCard = {
  name: string;
  tagline: string;
  description: string;
};

type Group = {
  name: string;
  intro: string;
  accent: string; // border + text accent
  profiles: ProfileCard[];
};

const groups: Group[] = [
  {
    name: "Identity Seekers",
    intro:
      "The work right now is inner: who are you when the title falls away? The disorientation is real — but it's the honest beginning of finding yourself again on the other side of AI.",
    accent: "citrus",
    profiles: [
      {
        name: "The Unlocker",
        tagline: "You're still tying who you are to the title you held.",
        description:
          "AI replacing jobs feels personal — because who you are and what you did are the same thing in your head. Until that loosens, nothing else lands. Your work isn't learning ChatGPT. It's answering one question honestly: who am I if I'm not my job?",
      },
      {
        name: "The Awakener",
        tagline: "You're building toward clarity. Everything is early.",
        description:
          "You feel AI reshaping work, but you haven't started any of it — still fused to your title, haven't named your unique value, no direction, no tools. Trying to solve all four at once is why you're frozen. Pick one and take a concrete step this week.",
      },
      {
        name: "The Explorer",
        tagline: "You're building toward a new creative practice.",
        description:
          "You're using AI tools and making things — ahead of most. But you skipped the inner work: you haven't separated from your old role or named what you bring that AI can't. Producing without knowing what it's for. Answer: what am I building, and why me?",
      },
    ],
  },
  {
    name: "Direction Finders",
    intro:
      "You know yourself. Now the work is aiming it at something that matters — naming your value, picking a problem worth solving, pointing your clarity at a target.",
    accent: "indigo",
    profiles: [
      {
        name: "The Firestarter",
        tagline: "You're building toward something that just caught fire.",
        description:
          "One piece just broke through — your value, a purpose, a tool. That area surged while the rest stayed flat. The breakthrough is a clue about your shape. Use it to pull the other pieces — identity, value, direction, tools, output — forward.",
      },
      {
        name: "The Translator",
        tagline: "You're building toward bridging two worlds.",
        description:
          "You know yourself and you're fluent with AI — the two hardest bookends. But the middle is hollow: no clear sense of your value or where to aim it. Producing capably without a center. Stop long enough to ask what's actually worth building, and why you.",
      },
      {
        name: "The Original",
        tagline: "You're building toward becoming irreplaceable.",
        description:
          "You've unhooked from your title and you know what you bring. The inner work is done. But you haven't aimed it — no problem picked, no audience, no tools. Pick a specific problem worth solving or audience worth serving. Point your clarity at a target.",
      },
    ],
  },
  {
    name: "Builders in Motion",
    intro:
      "The foundation is set. The remaining work is action — picking up tools, making things, putting work in front of real people. Shipping, not preparing.",
    accent: "aqua",
    profiles: [
      {
        name: "The Compass",
        tagline: "You're building toward leading the way.",
        description:
          "Identity, value, direction — all clear. The hardest part is done. But you haven't picked up the tools or made anything. Perfect map, no boots on the ground. Pick one AI tool this week and make one small thing. Familiarity, not mastery.",
      },
      {
        name: "The Architect",
        tagline: "You're building toward something only you can build.",
        description:
          "You understand all of it — who you are, what you bring, where you're going, how the tools work. The only gap is output. Preparation is disguising itself as progress. Make something rough and put it in front of a real person by Friday.",
      },
      {
        name: "The Catalyst",
        tagline: "You're building toward amplifying everything you touch.",
        description:
          "Solid across identity, value, direction, tools, and output — nothing broken, nothing fully resolved. Balanced and capable, which is why \"good enough\" could quietly become your ceiling. Pick the one area where a small push creates the most momentum.",
      },
    ],
  },
];

const capstone: ProfileCard = {
  name: "The Amplifier",
  tagline: "Now the real work begins.",
  description:
    "Identity unhooked, value named, direction set, tools in hand, shipping regularly. You've made it through the parts that stop most people. What's ahead isn't a victory lap — it's the work of doing this at a different scale, in front of more people, with more on the line. Find peers operating at your level. Pull someone else forward. Keep building.",
};

const accentClasses: Record<string, { border: string; text: string; bg: string }> = {
  citrus:  { border: "border-citrus",  text: "text-citrus",  bg: "bg-citrus/5"  },
  indigo:  { border: "border-indigo",  text: "text-indigo",  bg: "bg-indigo/5"  },
  aqua:    { border: "border-aqua",    text: "text-aqua",    bg: "bg-aqua/5"    },
};

const TgrTypes = () => {
  return (
    <div className="min-h-screen bg-aubergine text-soft-white">
      <Seo
        title="The 10 Repurpose Profiles | Where You Are on the Journey"
        description="Identity Seekers, Direction Finders, Builders in Motion, and The Amplifier — ten profiles naming where you stand in the AI transition, and what to do next."
        path="/types"
      />
      <Navigation />
      <main id="main-content">
        {/* Hero */}
        <section className="bg-aubergine pt-28 md:pt-36 pb-16 md:pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollFadeUp>
              <p className="text-indigo font-sans text-xs uppercase tracking-widest mb-4">
                The 10 Great Repurpose Profiles
              </p>
              <h1 className="font-display text-soft-white text-4xl md:text-5xl leading-tight mb-6">
                Where Are You On Your Journey?
              </h1>
              <p className="font-sans text-soft-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                Everyone navigating the AI transition is somewhere on this map. Ten profiles, each one a real place people find themselves — defined by your pattern across Unhook Identity, Reclaim Value, Discover Purpose, Become AI Ready, and Relaunch Yourself.
              </p>
              <p className="font-sans text-soft-white/50 text-base max-w-2xl mx-auto">
                None of them are bad. All of them are a starting point.
              </p>
            </ScrollFadeUp>
          </div>
        </section>

        {/* Groups */}
        <section className="bg-soft-white py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto space-y-20">
            {groups.map((group) => {
              const a = accentClasses[group.accent];
              return (
                <div key={group.name}>
                  <ScrollFadeUp>
                    <div className="text-center mb-10 max-w-2xl mx-auto">
                      <h2 className={`font-display text-3xl md:text-4xl mb-3 ${a.text}`}>
                        {group.name}
                      </h2>
                      <p className="font-sans text-aubergine/70 text-base md:text-lg leading-relaxed">
                        {group.intro}
                      </p>
                    </div>
                  </ScrollFadeUp>

                  <div className="grid gap-6 md:grid-cols-3">
                    {group.profiles.map((p, i) => (
                      <ScrollFadeUp key={p.name} delay={i * 60}>
                        <div className={`border-l-4 ${a.border} ${a.bg} border-y border-r border-aubergine/10 rounded-r-lg p-6 h-full`}>
                          <h3 className="font-display text-aubergine text-xl mb-1">{p.name}</h3>
                          <p className="font-display text-aubergine/60 text-sm italic mb-3">{p.tagline}</p>
                          <p className="font-sans text-aubergine/70 text-sm leading-relaxed">{p.description}</p>
                        </div>
                      </ScrollFadeUp>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* The Amplifier */}
            <ScrollFadeUp>
              <div className="border-2 border-indigo rounded-lg bg-indigo/5 p-8 md:p-10 text-center">
                <h3 className="font-display text-aubergine text-3xl md:text-4xl mb-2">{capstone.name}</h3>
                <p className="font-display text-aubergine/60 text-base md:text-lg italic mb-5 max-w-2xl mx-auto">
                  {capstone.tagline}
                </p>
                <p className="font-sans text-aubergine/70 text-base leading-relaxed max-w-2xl mx-auto">
                  {capstone.description}
                </p>
              </div>
            </ScrollFadeUp>

            <ScrollFadeUp delay={200}>
              <div className="text-center pt-4">
                <p className="font-display text-aubergine text-xl mb-6">Which one are you?</p>
                <Link
                  to="/selfcheck"
                  className="inline-block bg-indigo text-white font-sans font-medium text-lg px-10 py-5 rounded-full pulse-indigo hover:opacity-90 transition-opacity mb-3"
                >
                   What's Your Repurpose Profile? →
                 </Link>
                <p className="text-aubergine/50 text-sm font-sans">
                  Discover where you are — and what you're building toward.
                </p>
              </div>
            </ScrollFadeUp>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TgrTypes;
