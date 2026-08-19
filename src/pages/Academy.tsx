import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";
import elaHeroAsset from "@/assets/ela-hero.png.asset.json";
import taHeroAsset from "@/assets/ta-hero.png.asset.json";

const programs = [
  {
    id: "leadership",
    href: "/academy/leadership",
    eyebrow: "For leaders making the calls",
    name: "The Executive Leadership Academy",
    tagline: "Ninety-five percent of GenAI pilots show no measurable impact. The gap is leadership, not technology.",
    accent: "text-indigo",
    border: "border-indigo/30",
    image: elaHeroAsset.url,
    alt: "Senior leaders in conversation",
    body: [
      "An eight-hour immersive workshop followed by ninety-minute implementation sessions every two weeks for three months — applied to the real workforce, technology, and organizational decisions already on your desk.",
      "Four parts: understand the implications of AI, shift your leadership mindset, build executive AI readiness, and find and support your people before defaulting to headcount cuts.",
    ],
    points: [
      "Understand the Implications of AI",
      "Shift Your Leadership Mindset",
      "Build Executive AI Readiness",
      "Find and Support Your People",
    ],
    footnote: "Brought in by CEOs, COOs, CHROs, heads of talent, and workforce transformation leads.",
  },
  {
    id: "transition",
    href: "/academy/transition",
    eyebrow: "For people whose role just ended",
    name: "The TGR Transition Academy",
    tagline: "Outplacement, reimagined for an AI-shaped future.",
    accent: "text-citrus",
    border: "border-citrus/30",
    image: taHeroAsset.url,
    alt: "A person at a worktable in thought",
    body: [
      "Traditional providers help people find another job. Polishing a resume doesn't matter if that job is no longer in demand, and career frameworks built for careers that no longer exist leave people feeling discarded rather than supported.",
      "The Transition Academy replaces the isolation of job loss with a structured community moving through the five stages together — unhooking identity from title, reclaiming real value, and developing the AI agency to relaunch.",
    ],
    points: [
      "Five stages, one journey, moved through as a cohort",
      "Practical AI agency, not another upskilling checklist",
      "Coaching from facilitators and AI implementation experts",
      "Runs standalone or layered onto an existing vendor",
    ],
    footnote: "70% of the skills used in most jobs will change by 2030.",
  },
];

const Academy = () => {
  return (
    <div className="min-h-screen bg-soft-white text-aubergine">
      <Navigation />
      <main id="main-content">
        {/* Hero */}
        <section className="bg-aubergine constellation-bg pt-32 pb-20 px-6 text-center">
          <ScrollFadeUp>
            <p className="font-sans text-aqua text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              TGR Academy
            </p>
            <h1 className="font-display text-soft-white text-4xl md:text-5xl leading-tight mb-5">
              Where the framework becomes practice
            </h1>
            <p className="font-body text-soft-white/70 text-lg md:text-xl max-w-2xl mx-auto">
              Two programs built on The Five Stages of The Great Repurpose — one for the leaders deciding how AI reshapes the work, one for the people whose roles it already changed. Run them together for coordinated support on both sides of a workforce change.
            </p>
          </ScrollFadeUp>
        </section>

        {/* Programs */}
        {programs.map((program, i) => (
          <section
            key={program.id}
            id={program.id}
            className={`${i % 2 === 0 ? "bg-soft-white" : "bg-soft-white/60"} scroll-mt-24 md:scroll-mt-28 py-16 md:py-24 px-6`}
          >
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              <ScrollFadeUp className={i % 2 === 0 ? "" : "md:order-2"}>
                <img
                  src={program.image}
                  alt={program.alt}
                  className="w-full rounded-lg object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </ScrollFadeUp>
              <div className={i % 2 === 0 ? "" : "md:order-1"}>
                <ScrollFadeUp delay={100}>
                  <p className={`font-sans ${program.accent} text-xs uppercase tracking-[0.2em] font-semibold mb-3`}>
                    {program.eyebrow}
                  </p>
                  <h2 className="font-display text-aubergine text-2xl md:text-3xl leading-tight mb-3">
                    {program.name}
                  </h2>
                  <p className={`font-display ${program.accent} text-lg italic mb-6`}>{program.tagline}</p>
                </ScrollFadeUp>
                <div className="font-body text-aubergine/70 text-base leading-relaxed space-y-4 mb-8">
                  {program.body.map((para) => (
                    <ScrollFadeUp key={para.slice(0, 24)} delay={150}>
                      <p>{para}</p>
                    </ScrollFadeUp>
                  ))}
                </div>
                <ScrollFadeUp delay={200}>
                  <ul className={`border-t ${program.border} divide-y ${program.border} mb-6`}>
                    {program.points.map((point) => (
                      <li key={point} className="font-sans text-aubergine/80 text-sm py-3">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="font-sans text-aubergine/50 text-xs uppercase tracking-[0.14em] mb-6">
                    {program.footnote}
                  </p>
                  <Link
                    to={program.href}
                    className="inline-flex items-center gap-2 border border-aubergine/30 text-aubergine font-sans font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-aubergine hover:text-soft-white transition-colors"
                  >
                    See the one-sheet →
                  </Link>
                </ScrollFadeUp>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="bg-aubergine constellation-bg py-20 px-6 text-center">
          <ScrollFadeUp>
            <h2 className="font-display text-soft-white text-2xl md:text-3xl mb-3">
              Not sure which one is yours?
            </h2>
            <p className="font-body text-soft-white/60 text-lg mb-10 max-w-xl mx-auto">
              Start with your Repurpose Profile. It shows you where you are across the five stages and points you toward the right next step.
            </p>
            <Link
              to="/selfcheck"
              className="inline-flex items-center gap-2 bg-aqua text-aubergine font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full pulse-aqua hover:opacity-90 transition-opacity"
            >
              Get Your Profile →
            </Link>
          </ScrollFadeUp>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Academy;
