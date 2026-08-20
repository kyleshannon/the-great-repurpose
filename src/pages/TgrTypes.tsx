import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Seo } from "@/components/Seo";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";
import { archetypes, profileCopy } from "@/lib/archetypes";

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

const card = (slug: string): ProfileCard => ({
  name: archetypes[slug].name,
  tagline: profileCopy[slug].tagline,
  description: profileCopy[slug].description,
});

const groups: Group[] = [
  {
    name: "Identity Seekers",
    intro:
      "The work right now is inner: who are you when the title falls away? The disorientation is real — but it's the honest beginning of finding yourself again on the other side of AI.",
    accent: "citrus",
    profiles: ["the-unlocker", "the-awakener", "the-explorer"].map(card),
  },
  {
    name: "Direction Finders",
    intro:
      "You know yourself. Now the work is aiming it at something that matters — naming your value, picking a problem worth solving, pointing your clarity at a target.",
    accent: "indigo",
    profiles: ["the-firestarter", "the-translator", "the-original"].map(card),
  },
  {
    name: "Builders in Motion",
    intro:
      "The foundation is set. The remaining work is action — picking up tools, making things, putting work in front of real people. Shipping, not preparing.",
    accent: "aqua",
    profiles: ["the-compass", "the-architect", "the-catalyst"].map(card),
  },
];

const capstone: ProfileCard = card("the-amplifier");


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
