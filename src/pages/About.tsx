import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

const pillars = [
  {
    name: "Friday Office Hours",
    desc: "Weekly live sessions where real questions get real answers. Not a lecture. A conversation.",
  },
  {
    name: "AI Learning Lab",
    desc: "Hands-on exploration of AI tools in a low-stakes, high-trust environment. You can be a beginner here.",
  },
  {
    name: "The AI Readiness Project Podcast",
    desc: "Conversations about what it actually means to be ready — not technically, but humanly — for what AI is making possible.",
  },
  {
    name: "Mastermind Practice Lab",
    desc: "Small-group accountability and practice for people building new directions. For the Reorientation and Authorship phases.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-navy text-cream">
      <Navigation />

      {/* ── Hero ── */}
      <section className="bg-navy constellation-bg pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollFadeUp>
            <h1 className="font-serif text-cream text-3xl md:text-5xl leading-tight">
              "The Great Repurpose didn't start as a concept. It started as a conversation."
            </h1>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Origin story ── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-3xl mx-auto font-sans text-navy/80 text-lg leading-relaxed space-y-6">
          <ScrollFadeUp>
            <p>
              Kyle Shannon has spent his career at the intersection of creativity, technology, and human meaning. He co-founded one of the first digital agencies in the 1990s — back when "putting your business on the internet" was a radical act. He's a Grammy-winning lyricist. He's built communities, led companies, and spent decades helping people navigate the space between what they're good at and what they're for.
            </p>
          </ScrollFadeUp>
          <ScrollFadeUp delay={100}>
            <p>
              When AI began accelerating in late 2022, Kyle co-founded the AI Salon — a community for people who wanted to think seriously about what this moment means, not just what it can do. He's been in weekly conversation with hundreds of people navigating the disruption ever since.
            </p>
          </ScrollFadeUp>
          <ScrollFadeUp delay={150}>
            <p>
              The Great Repurpose emerged from those conversations. The same questions kept surfacing — not "how do I use AI?" but "who am I now that AI can do what I do?" The framework didn't come from research. It came from listening.
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── The AI Salon ── */}
      <section className="bg-navy constellation-bg py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-serif text-cream text-3xl md:text-4xl mb-4 leading-tight">
              "The Great Repurpose is the diagnosis.<br />
              The AI Salon is the treatment."
            </h2>
            <p className="font-sans text-cream/70 text-lg leading-relaxed mb-14 max-w-2xl">
              The AI Salon is a community for people who want to navigate the AI moment without losing themselves in it. Founded in December 2022, it's where practitioners, leaders, creators, and thinkers come together — not to become AI experts, but to figure out what AI means for them specifically.
            </p>
          </ScrollFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {pillars.map((pillar, i) => (
              <ScrollFadeUp key={pillar.name} delay={i * 80}>
                <div className="border border-coral/30 rounded-lg p-7 bg-navy hover:border-coral/60 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-coral mb-4" />
                  <h3 className="font-serif text-cream text-lg mb-2">{pillar.name}</h3>
                  <p className="font-sans text-cream/60 text-base leading-relaxed">{pillar.desc}</p>
                </div>
              </ScrollFadeUp>
            ))}
          </div>

          <ScrollFadeUp delay={320}>
            <div className="text-center">
              <a
                href="https://thesalon.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-coral text-cream font-sans font-medium text-base px-8 py-4 rounded-full pulse-coral hover:opacity-90 transition-opacity"
              >
                Join the AI Salon →
              </a>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
