import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

const pillars = [
  {
    name: "Office Hours every Friday",
    desc: "Weekly live sessions where real questions get real answers. Not a lecture. A conversation.",
  },
  {
    name: "AI Learning Lab",
    desc: "Five nights a week. Hands-on exploration of AI tools in a low-stakes, high-trust environment.",
  },
  {
    name: "The AI Readiness Project Podcast",
    desc: "Conversations about what it actually means to be ready — not technically, but humanly — for what AI is making possible.",
  },
  {
    name: "Mastermind Practice Lab",
    desc: "For members ready to go deeper. Small-group accountability and practice for people building new directions.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-navy text-cream">
      <Navigation />
      <main id="main-content">

      {/* ── Hero ── */}
      <section className="bg-navy constellation-bg pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeUp>
            <h1 className="font-serif text-cream text-3xl md:text-5xl leading-tight">
              About The Great Repurpose
            </h1>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Origin story ── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-serif text-navy text-2xl md:text-3xl mb-8">The Origin</h2>
          </ScrollFadeUp>
          <div className="font-sans text-navy/80 text-lg leading-relaxed space-y-6">
            <ScrollFadeUp>
              <p>
                The Great Repurpose began with a question Kyle Shannon couldn't stop asking: if AI is disrupting the relationship between people and the work that gives them meaning, why is everyone treating it like a training problem?
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={100}>
              <p>
                Kyle is the co-founder and president of the AI Salon, a values-driven community that's been exploring the intersection of generative AI and human potential since December 7, 2022 — five days after ChatGPT launched. A Grammy award-winning lyricist, a co-founder of one of the first digital agencies in the '90s, and someone who's spent decades at the intersection of new technology and creative expression, Kyle saw something in the AI transition that the bootcamps and the influencers were missing: the crisis wasn't about skills. It was about meaning.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={150}>
              <p>
                The Great Repurpose puts a name to what's happening — a way of understanding what's actually going on when AI changes your relationship with work, and a map of the five phases people cross on the way to something new.
              </p>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      {/* ── The AI Salon ── */}
      <section className="bg-navy constellation-bg py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-serif text-cream text-3xl md:text-4xl mb-4 leading-tight">
              The Great Repurpose is the diagnosis.<br />
              The AI Salon is the treatment.
            </h2>
            <p className="font-sans text-cream/70 text-lg leading-relaxed mb-14">
              The AI Salon is a community of artists, builders, educators, and policy thinkers exploring the potential of generative AI — with optimism, humility, and a shared belief that the future of AI should be co-created by the many, not the few. It operates on the Cycle of AI Readiness: Play First → Create Excellence → Generously Lead.
            </p>
          </ScrollFadeUp>

          <div className="space-y-6 mb-12">
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
            <p className="font-sans text-cream/70 text-lg mb-8">
              If finding your TGR Type showed you where you are, the AI Salon is where you go next.
            </p>
            <div className="text-center">
              <a
                href="https://thesalon.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-coral text-cream font-sans font-medium text-base px-8 py-4 rounded-full pulse-coral hover:opacity-90 transition-opacity"
              >
                Visit thesalon.ai →
              </a>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;
