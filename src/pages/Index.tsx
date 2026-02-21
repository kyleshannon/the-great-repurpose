import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

const phases = [
  {
    number: "01",
    name: "Unhook Identity",
    tagline: "I'm not my job.",
    description:
      "The hardest step and the most necessary. You built an identity on what you do — the title, the craft, the expertise. When that gets disrupted, the instinct is to hold tighter. This phase is about loosening the grip. Not abandoning what you've built. Recognizing that you are not reducible to a set of tasks a machine can absorb.",
    borderColor: "border-cream/40",
    textColor: "text-cream/70",
  },
  {
    number: "02",
    name: "Reclaim Value",
    tagline: "But I AM this.",
    description:
      "Once you've unhooked from the title, you need to find what's underneath it. Your taste. Your judgment. Your perspective. The thing that made your work yours before anyone gave it a job description. This is the layer AI can't touch — and most people don't know they have it until the tasks get stripped away.",
    borderColor: "border-coral",
    textColor: "text-coral",
  },
  {
    number: "03",
    name: "Find Your Purpose",
    tagline: "This is what matters to me.",
    description:
      "Value without direction is potential without impact. This phase is about choosing: what do you want your reclaimed value to serve? What change do you want to make? What problem do you want to solve? Purpose isn't found by introspection alone. It's found by engaging with the world and noticing what pulls you forward.",
    borderColor: "border-mint",
    textColor: "text-mint",
  },
  {
    number: "04",
    name: "Discover AI's Power",
    tagline: "Wait — I can do THAT now?",
    description:
      "This is where curiosity replaces fear. Not \"learn AI or get left behind\" — that's someone else's threat. This is you, with your purpose clear, discovering that the tools everyone told you to fear are actually the most powerful instruments you've ever touched. AI doesn't replace your value. It amplifies it. But only if you know what your value is first.",
    borderColor: "border-periwinkle",
    textColor: "text-periwinkle",
  },
  {
    number: "05",
    name: "Start Creating",
    tagline: "Amplify your impact with AI.",
    description:
      "Knowledge without action is just anxiety. This phase is where purpose meets practice. You start making things. You start sharing what you learn. You stop consuming AI content and start creating with AI as your instrument. The work you produce here isn't a replacement for what you lost. It's something new — and it's more you, not less.",
    borderColor: "border-amber-brand",
    textColor: "text-amber-brand",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-navy text-cream">
      <Navigation />

      {/* ── Section 1: Hero ── */}
      <section className="relative bg-navy">
        {/* Hero image with text overlay */}
        <div className="relative w-full pt-16">
          <img
            src="/images/hero.png"
            alt="People standing together, facing forward"
            className="w-full h-auto block"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10 md:pb-14">
            <h1 className="font-sans font-bold text-cream text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-1">
              The Great Repurpose
            </h1>
            <p className="font-sans font-medium text-cream/80 text-2xl md:text-3xl lg:text-4xl max-w-3xl">
              Finding Meaning in the Face of Unprecedented Change
            </p>
          </div>
        </div>

        {/* CTA below image */}
        <div className="bg-navy px-6 md:px-16 py-10 text-center">
          <ScrollFadeUp>
            <Link
              to="/selfcheck"
              className="inline-block bg-coral text-cream font-sans font-medium text-base px-8 py-4 rounded-full pulse-coral hover:opacity-90 transition-opacity mb-3"
            >
              Take the Self-Check →
            </Link>
            <p className="text-cream/40 text-sm font-sans">
              7 questions. 2 minutes. A mirror, not a grade.
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 2: Name the Crisis ── */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-serif text-navy text-3xl md:text-4xl mb-10">
              The headlines say "AI is taking jobs." That's the easy version.
            </h2>
          </ScrollFadeUp>

          <div className="font-sans text-navy text-lg leading-relaxed space-y-6">
            <ScrollFadeUp delay={100}>
              <p>The harder version is what's happening underneath.</p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={150}>
              <p>
                Some people lose their jobs outright. That's visible, countable, and makes the news.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={200}>
              <p>
                But millions more are experiencing something the headlines don't cover. They keep their jobs — but lose the specific tasks that made those jobs feel like <em>theirs</em>. The brushstroke. The analysis. The client relationship. The vocal performance. The thing they spent years mastering, the thing that made Monday mornings worth it — absorbed by a tool that doesn't know why it matters.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={250}>
              <p>
                And still others feel something subtler: the world just shifts. The phone stops ringing as much. The proposals don't convert. The expertise that commanded respect for decades is suddenly available to anyone with a subscription. Nothing breaks. Everything erodes.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={300}>
              <p>
                In a culture where 55% of Americans say their job gives them their sense of identity — 70% among college graduates — all three of these disruptions threaten something deeper than a paycheck. They threaten meaning.
              </p>
            </ScrollFadeUp>
          </div>

          {/* Pull quote */}
          <ScrollFadeUp delay={350}>
            <blockquote className="border-l-4 border-coral pl-8 mt-14 mb-2">
              <p className="font-serif text-navy text-2xl md:text-3xl italic leading-snug">
                "This is not a skills problem.<br />
                It is a meaning crisis.<br />
                And it has a name."
              </p>
            </blockquote>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 3: Three Faces of Disruption ── */}
      <section className="bg-navy constellation-bg py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-serif text-cream text-3xl md:text-4xl text-center mb-16">
              Three faces of the same disruption
            </h2>
          </ScrollFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Job Loss",
                body: "You lost the work. The role is gone, the title is gone, and the future you planned for evaporated. 1.17 million layoffs in 2025. 696,000+ in just the first five months.",
              },
              {
                num: "02",
                title: "Task Erosion",
                body: "You kept the job. But the tasks that made it yours — the ones you were proud of, the ones that gave your days shape and your work meaning — are being absorbed. You're still employed. You just don't recognize what you do anymore.",
              },
              {
                num: "03",
                title: "The World Shifting",
                body: "Nothing dramatic happened. The phone just rings less. The rates dropped. The rules changed. The world stopped working the way it used to, and you can feel it but you can't quite name it.",
              },
            ].map(({ num, title, body }, i) => (
              <ScrollFadeUp key={num} delay={i * 100}>
                <div className="bg-navy border border-cream/10 rounded-lg p-8 h-full">
                  <p className="text-coral font-sans text-sm font-medium uppercase tracking-widest mb-3">{num}</p>
                  <h3 className="font-serif text-cream text-xl mb-4">{title}</h3>
                  <p className="font-sans text-cream/70 text-base leading-relaxed">{body}</p>
                </div>
              </ScrollFadeUp>
            ))}
          </div>

          <ScrollFadeUp delay={300}>
            <p className="text-center text-cream/60 font-sans text-base mt-12 max-w-2xl mx-auto">
              All three faces share the same root: <strong className="text-cream/80">the relationship between you and the work that gives you meaning is being renegotiated — and nobody asked your permission.</strong>
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 4: The Five Phases ── */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-serif text-navy text-3xl md:text-4xl text-center mb-4">
              The Great Repurpose: Five phases of finding your way through
            </h2>
            <p className="font-sans text-navy/70 text-center text-lg mb-16 max-w-2xl mx-auto">
              This isn't a program. It's not a course. It's a map of the territory people actually cross when the work that defined them changes. It doesn't happen in order. It isn't clean. But every person navigating this transition is somewhere on this map — and knowing where you are is the first step toward moving.
            </p>
          </ScrollFadeUp>

          <div className="space-y-4">
            {phases.map((phase, i) => (
              <ScrollFadeUp key={phase.number} delay={i * 80}>
                <div className={`border-l-4 ${phase.borderColor} bg-navy/5 border border-navy/10 rounded-r-lg pl-8 pr-6 py-6`}>
                  <div className="flex items-start gap-4">
                    <span className={`font-sans text-xs uppercase tracking-widest font-medium ${phase.textColor} mt-1 shrink-0`}>
                      {phase.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-navy text-xl mb-1">
                        {phase.name} <span className={`text-base font-sans italic font-normal ${phase.textColor}`}>— "{phase.tagline}"</span>
                      </h3>
                      <p className="font-sans text-navy/70 text-base leading-relaxed">{phase.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollFadeUp>
            ))}
          </div>

          <ScrollFadeUp delay={400}>
            <div className="text-center mt-14">
              <p className="font-serif text-navy text-xl mb-4">Where are you on this map?</p>
              <p className="font-sans text-navy/60 text-base mb-6">Take the Self-Check. 7 questions. A mirror, not a grade.</p>
              <Link
                to="/selfcheck"
                className="inline-block bg-coral text-cream font-sans font-medium text-base px-8 py-4 rounded-full pulse-coral hover:opacity-90 transition-opacity"
              >
                Take the Self-Check →
              </Link>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 5: This Isn't About Skills ── */}
      <section className="bg-navy constellation-bg py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-serif text-cream text-3xl md:text-4xl leading-tight mb-10">
              Everyone else is selling you a course. We're naming what's actually happening.
            </h2>
          </ScrollFadeUp>

          <div className="font-sans text-cream/80 text-lg leading-relaxed space-y-6">
            <ScrollFadeUp delay={100}>
              <p>
                Every AI bootcamp, influencer, and certification program is selling some version of "learn AI or get left behind." That message is fear-based, skills-focused, and transactional. It treats the most profound workforce disruption in a generation as a training problem.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={120}>
              <p>It's not a training problem.</p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={150}>
              <p>
                The person who lost their job doesn't need a prompt engineering certificate. They need to understand that their value didn't disappear — the system that measured it just broke.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={200}>
              <p>
                The designer whose clients are using Midjourney doesn't need a Midjourney tutorial. They need to find the layer of creative value that no tool can replicate — and a community of people who've made that same journey.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={250}>
              <p>
                The consultant whose expertise just became a $20/month subscription doesn't need to "add AI to their toolkit." They need to rediscover what they offer above the knowledge layer — the judgment, the relationships, the vision.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={300}>
              <p>
                The Great Repurpose isn't a course. It's a framework for the actual transition people are living through. And the path forward isn't a curriculum. It's a community of people navigating the same thing, together, with curiosity instead of fear.
              </p>
            </ScrollFadeUp>
          </div>

          <ScrollFadeUp delay={350}>
            <p className="text-cream/70 font-sans text-lg mt-10">
              <strong className="text-cream">That community exists. It's called the{" "}
              <a
                href="https://thesalon.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:underline"
              >
                AI Salon
              </a>
              .</strong>
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 6: Self-Check Promo ── */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollFadeUp>
            <h2 className="font-serif text-navy text-3xl md:text-4xl mb-4">
              The Great Repurpose Self-Check
            </h2>
            <p className="font-serif text-navy/70 text-xl italic mb-4">
              7 questions. No grades. No judgment. Just a mirror.
            </p>
            <p className="font-sans text-navy/70 text-lg mb-14 max-w-xl mx-auto">
              The Self-Check measures where you are across all five phases of The Great Repurpose. Not a single score — a shape. Your strengths and your gaps. Where you've already done the work and where you're still stuck.
            </p>
            <p className="font-sans text-navy/60 text-base mb-14 max-w-xl mx-auto">
              You'll see your profile and get specific, personalized recommendations for what to do next — not generic advice, but the exact entry point that matches where you are right now.
            </p>
          </ScrollFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {[
              {
                step: "1",
                label: "Answer 7 questions",
                desc: "Each one is a tension — two honest statements on opposite ends of a spectrum. You place yourself between them. There are no wrong answers.",
              },
              {
                step: "2",
                label: "See your shape",
                desc: "Your results show where you are across all five phases. Some will be strong. Some won't. That's the point.",
              },
              {
                step: "3",
                label: "Get your next step",
                desc: "Based on your profile, we'll recommend the specific thing that will help you most right now — whether that's an article, a podcast, a community, or a practice.",
              },
            ].map(({ step, label, desc }, i) => (
              <ScrollFadeUp key={step} delay={i * 100}>
                <div className="text-left">
                  <p className="text-coral font-sans text-xs uppercase tracking-widest font-medium mb-2">Step {step}</p>
                  <h3 className="font-serif text-navy text-lg mb-2">{label}</h3>
                  <p className="font-sans text-navy/70 text-base leading-relaxed">{desc}</p>
                </div>
              </ScrollFadeUp>
            ))}
          </div>

          <ScrollFadeUp delay={300}>
            <Link
              to="/selfcheck"
              className="inline-block bg-coral text-cream font-sans font-medium text-lg px-10 py-5 rounded-full pulse-coral hover:opacity-90 transition-opacity"
            >
              Take the Self-Check →
            </Link>
          </ScrollFadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
