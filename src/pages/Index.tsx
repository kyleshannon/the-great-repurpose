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

const typeNames = [
  "The Awakener",
  "The Unlocker",
  "The Original",
  "The Compass",
  "The Explorer",
  "The Firestarter",
  "The Architect",
  "The Translator",
  "The Catalyst",
  "The Amplifier",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-navy text-cream">
      <Navigation />
      <main id="main-content">

      {/* ── Section 1: Hero ── */}
      <section className="relative bg-navy">
        {/* Hero image */}
        <div className="relative w-full pt-16 max-h-[70vh] overflow-hidden">
          <img
            src="/images/hero.png"
            alt="People standing together, facing forward"
            className="w-full h-auto block object-cover object-top"
          />
          {/* Gradient fade to navy at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy to-transparent" />
        </div>

        {/* Title block below image */}
        <div className="bg-navy px-6 pb-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-sans font-bold text-cream text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-1">
              The Great Repurpose
            </h1>
            <p className="font-sans font-medium text-cream/80 text-2xl md:text-3xl lg:text-4xl">
              Finding Meaning in the Face of Unprecedented Change
            </p>
          </div>
        </div>

        {/* CTA below title */}
        <div className="bg-navy px-6 py-8 md:py-10 text-center">
          <div className="max-w-4xl mx-auto">
          <ScrollFadeUp>
            <p className="font-sans text-cream/70 text-base mx-auto mb-4 leading-relaxed">
              AI is about to change every single job — and maybe even how we define work entirely.
            </p>
            <p className="font-sans text-cream/70 text-base mx-auto mb-6 leading-relaxed text-left">
              We're all going through this, and we're all in different places. Some of us are holding on to what we were. Some of us are rebuilding. Some of us just felt something shift and can't name it yet. We've identified 10 "TGR Types" that capture where people are right now and what they're building toward.
            </p>
            <Link
              to="/selfcheck"
              className="inline-block bg-coral text-cream font-sans font-medium text-base px-8 py-4 rounded-full pulse-coral hover:opacity-90 transition-opacity mb-4"
            >
              Find Your TGR Type →
            </Link>
            <p className="text-cream/50 text-sm font-sans mb-6">
              Discover where you are — and what you're building toward.
            </p>
          </ScrollFadeUp>
          </div>
        </div>
      </section>

      {/* ── Section 2: Name the Crisis ── */}
      <section className="bg-cream py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-serif text-navy text-3xl md:text-4xl mb-10">
              The Great Repurpose puts a name to the invisible crisis underneath the AI disruption.
            </h2>
          </ScrollFadeUp>

          <div className="font-sans text-navy text-lg leading-relaxed space-y-6">
            <ScrollFadeUp delay={100}>
              <p>The deeper challenge of meaning, identity, and purpose that touches everyone the transition reaches — even if you keep your job but watch it transform into something unrecognizable.</p>
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
                "The same technology that's disrupting your work could be the most powerful tool you've ever touched… once you know what you want to do with it."
              </p>
            </blockquote>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Video Section ── */}
      <section className="bg-navy py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollFadeUp>
            <p className="font-serif text-cream text-2xl md:text-3xl italic leading-snug mb-12">
              "We didn't ask for this.<br />
              We can't escape it.<br />
              The only way forward is through…<br />
              and you're not alone."
            </p>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/4vTo0ZdzNYU"
                title="The Great Repurpose"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 3: Three Faces of Disruption ── */}
      <section className="bg-navy constellation-bg py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-serif text-cream text-3xl md:text-4xl text-center mb-16">
              Three faces of the same disruption
            </h2>
          </ScrollFadeUp>

          <div className="space-y-6">
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
            <p className="text-center text-cream/60 font-sans text-base mt-12">
              All three faces share the same root: <strong className="text-cream/80">the relationship between you and the work that gives you meaning is being renegotiated — and nobody asked your permission.</strong>
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 4: The Five Stages ── */}
      <section className="bg-cream py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-serif text-navy text-3xl md:text-4xl text-center mb-4">
              The Great Repurpose: Five stages of finding your way through
            </h2>
            <p className="font-sans text-navy/70 text-center text-lg mb-16">
              These are the five phases people actually go through when the work that defined them changes. They don't happen in order. They're not clean. But every person navigating this transition is somewhere on this map — and knowing where you are is the first step toward building what comes next.
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
              <p className="font-serif text-navy text-xl mb-6">Where are you on this map?</p>
              <Link
                to="/selfcheck"
                className="inline-block bg-coral text-cream font-sans font-medium text-base px-8 py-4 rounded-full pulse-coral hover:opacity-90 transition-opacity"
              >
                Find Your TGR Type →
              </Link>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 5: This Isn't About Skills ── */}
      <section className="bg-navy constellation-bg py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
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
                An important part of navigating this is finding people going through it too. The Great Repurpose was born out of heartfelt discussions in the{" "}
                <a
                  href="https://thesalon.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-coral hover:underline"
                >
                  AI Salon
                </a>
                , a community for anyone exploring AI and what comes next with curiosity instead of fear.
              </p>
            </ScrollFadeUp>
          </div>

          <ScrollFadeUp delay={350}>
            <div className="mt-10">
              <a
                href="https://thesalon.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:underline font-sans text-lg font-medium"
              >
                Learn more at theSalon.ai →
              </a>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 5b: The 10 TGR Types ── */}
      <section className="bg-cream py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollFadeUp>
            <h2 className="font-serif text-navy text-3xl md:text-4xl mb-6">
              We're all going through this — and we're all in different places.
            </h2>
            <p className="font-sans text-navy/70 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
              Some of us are holding on to what we were. Some of us are rebuilding. Some of us just felt something shift and can't name it yet.
            </p>
            <p className="font-sans text-navy/70 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              We've identified 10 types that capture where people are right now and what they're building toward. Each one is a mirror — not a grade. You'll see where you are, where your strengths already point, and the specific next step that matches your profile.
            </p>
          </ScrollFadeUp>

          {/* Type names constellation */}
          <ScrollFadeUp delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {typeNames.map((name, i) => (
                <span
                  key={name}
                  className="font-serif text-navy/80 text-base md:text-lg px-3 py-1"
                  style={{ opacity: 0.6 + (i % 3) * 0.15 }}
                >
                  {name}
                </span>
              ))}
            </div>
          </ScrollFadeUp>

          <ScrollFadeUp delay={200}>
            <Link
              to="/selfcheck"
              className="inline-block bg-coral text-cream font-sans font-medium text-base px-8 py-4 rounded-full pulse-coral hover:opacity-90 transition-opacity mb-4"
            >
              Find Your TGR Type →
            </Link>
            <p className="text-navy/50 text-sm font-sans">
              7 questions. 2 minutes. Then we'll tell you what you're building toward.
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 6: How It Works ── */}
      <section className="bg-cream py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 mb-14 text-left">
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
              Find Your TGR Type →
            </Link>
            <p className="text-navy/50 text-sm font-sans mt-3">
              Discover where you are — and what you're building toward.
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default Index;
