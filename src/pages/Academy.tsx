import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";
import twoProfessionalsScreenAsset from "@/assets/two-professionals-screen.png.asset.json";
import twoProfessionalsTableAsset from "@/assets/two-professionals-table.png.asset.json";

const programs = [
  {
    id: "transition",
    eyebrow: "Program One",
    name: "The TGR Transition Academy",
    tagline: "For the moment the work you did stopped existing the way it used to.",
    accent: "text-indigo",
    border: "border-indigo/30",
    image: twoProfessionalsTableAsset.url,
    alt: "Two professionals working over a table of printed material",
    body: [
      "Placeholder copy. The Transition Academy takes you through the five stages in order — unhooking identity, reclaiming value, discovering purpose, becoming AI ready, and relaunching yourself — with practice, feedback, and a cohort moving at the same time.",
      "It's built for people whose role was cut, compressed, or quietly rewritten: the layoff, the shrinking scope, the sense that the ladder you were climbing got moved. The outcome isn't a certificate. It's visible work, a clear offer, and more than one way for opportunity to reach you.",
    ],
    points: [
      "Guided path through all five stages",
      "Hands-on AI practice, not tool tutorials",
      "Build a portfolio of visible, real work",
      "Cohort accountability and live sessions",
    ],
  },
  {
    id: "executive",
    eyebrow: "Program Two",
    name: "The Executive Leadership Academy",
    tagline: "For the people deciding what AI does to everyone else's job.",
    accent: "text-citrus",
    border: "border-citrus/30",
    image: twoProfessionalsScreenAsset.url,
    alt: "Two professionals reviewing work together at a screen",
    body: [
      "Placeholder copy. The Executive Leadership Academy is for leaders carrying teams and organizations through the transition — the ones making adoption calls, restructuring roles, and answering questions they were never trained for.",
      "It covers how to make AI decisions that respect human judgment, how to redesign work without hollowing it out, and how to lead people through the identity shift instead of around it.",
    ],
    points: [
      "Work design that keeps the human layer intact",
      "Leading teams through identity disruption",
      "AI adoption decisions with judgment at the center",
      "Peer sessions with other senior leaders",
    ],
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
              Two programs built on The Five Stages of The Great Repurpose — one for people rebuilding their own work, one for the leaders responsible for everyone else's.
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
                  <ul className={`border-t ${program.border} divide-y ${program.border}`}>
                    {program.points.map((point) => (
                      <li key={point} className="font-sans text-aubergine/80 text-sm py-3">
                        {point}
                      </li>
                    ))}
                  </ul>
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
