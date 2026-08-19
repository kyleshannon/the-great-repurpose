import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

const pillars = [
  {
    name: "The Repurpose Profile",
    desc: "A free assessment that shows you where you actually are across the five stages — and what to work on next.",
  },
  {
    name: "The TGR Transition Academy",
    desc: "A guided path for people whose role was cut, compressed, or rewritten. Identity, value, purpose, AI fluency, relaunch.",
  },
  {
    name: "The Executive Leadership Academy",
    desc: "For leaders carrying teams through this shift — making AI decisions that protect judgment and still move fast.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-aubergine text-soft-white">
      <Navigation />
      <main id="main-content">

      {/* ── Hero ── */}
      <section className="bg-aubergine constellation-bg pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeUp>
            <h1 className="font-display text-soft-white text-3xl md:text-5xl leading-tight">
              About The Great Repurpose
            </h1>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Origin story ── */}
      <section className="bg-soft-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-display text-aubergine text-2xl md:text-3xl mb-8">The Origin</h2>
          </ScrollFadeUp>
          <div className="font-sans text-aubergine/80 text-lg leading-relaxed space-y-6">
            <ScrollFadeUp>
              <p>
                The Great Repurpose began with a question Kyle Shannon couldn't stop asking: if AI is disrupting the relationship between people and the work that gives them meaning, why is everyone treating it like a training problem?
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={100}>
              <p>
               Kyle has been exploring the intersection of generative AI and human potential since December 7, 2022 — five days after ChatGPT launched. A Grammy award-winning lyricist, a co-founder of one of the first digital agencies in the '90s, and someone who's spent decades at the intersection of new technology and creative expression, Kyle saw something in the AI transition that the bootcamps and the influencers were missing: the crisis wasn't about skills. It was about meaning.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={150}>
              <p>
                 The Great Repurpose puts a name to what's happening — a way of understanding what's going on when AI changes your relationship with work, and a map of the five phases people cross on the way to something new.
              </p>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      {/* ── What TGR offers ── */}
      <section className="bg-aubergine constellation-bg py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-display text-soft-white text-3xl md:text-4xl mb-4 leading-tight">
              Your Repurpose Profile is a starting point.<br />
              Here's where you go from there.
            </h2>
            <p className="font-sans text-soft-white/70 text-lg leading-relaxed mb-14">
              The Great Repurpose is a framework, an assessment, and a set of academies for people whose work is being rewritten by AI. It runs on the Cycle of AI Readiness: Play First → Create Excellence → Generously Lead.
            </p>
          </ScrollFadeUp>

          <div className="space-y-6 mb-12">
            {pillars.map((pillar, i) => (
              <ScrollFadeUp key={pillar.name} delay={i * 80}>
                <div className="border border-indigo/30 rounded-lg p-7 bg-aubergine hover:border-indigo/60 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-indigo mb-4" />
                  <h3 className="font-display text-soft-white text-lg mb-2">{pillar.name}</h3>
                  <p className="font-sans text-soft-white/60 text-base leading-relaxed">{pillar.desc}</p>
                </div>
              </ScrollFadeUp>
            ))}
          </div>

          <ScrollFadeUp delay={320}>
            <p className="font-sans text-soft-white/70 text-lg mb-8">
              If finding your Great Repurpose Profile showed you where you are, the TGR Academy is where you go next.
            </p>
            <div className="text-center">
              <Link
                to="/academy"
                className="inline-block bg-aqua text-aubergine font-sans font-semibold text-base px-8 py-4 rounded-full pulse-aqua hover:opacity-90 transition-opacity"
              >
                Explore the TGR Academy →
              </Link>
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
