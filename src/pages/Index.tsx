import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Seo } from "@/components/Seo";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

import heroAsset from "@/assets/hero.png.asset.json";
import personBehindAsset from "@/assets/person-seen-from-behind.png.asset.json";

import womanDeskAsset from "@/assets/woman-at-desk.png.asset.json";
import womanWorktableAsset from "@/assets/woman-worktable.png.asset.json";
import twoProfessionalsScreenAsset from "@/assets/two-professionals-screen.png.asset.json";
import twoProfessionalsTableAsset from "@/assets/two-professionals-table.png.asset.json";
import smallGroupLaptopAsset from "@/assets/small-group-laptop.png.asset.json";
import elaHeroAsset from "@/assets/ela-hero.png.asset.json";
import taHeroAsset from "@/assets/ta-hero.png.asset.json";


import logoIndigo from "@/assets/tgr-logo-indigo.png.asset.json";
import logoAqua from "@/assets/tgr-logo-aqua.png.asset.json";
import logoOrchid from "@/assets/tgr-logo-orchid.png.asset.json";
import logoCitrus from "@/assets/tgr-logo-citrus.png.asset.json";
import logoPoppy from "@/assets/tgr-logo-poppy.png.asset.json";

const stageLogos: Record<string, string> = {
  indigo: logoIndigo.url,
  aqua: logoAqua.url,
  orchid: logoOrchid.url,
  citrus: logoCitrus.url,
  poppy: logoPoppy.url,
};

const colorMap: Record<string, { text: string; bg: string; border: string; hoverBorder: string }> = {
  indigo: { text: "text-indigo", bg: "bg-indigo/5", border: "border-indigo/20", hoverBorder: "hover:border-indigo/40" },
  aqua: { text: "text-aqua", bg: "bg-aqua/5", border: "border-aqua/20", hoverBorder: "hover:border-aqua/40" },
  orchid: { text: "text-orchid", bg: "bg-orchid/5", border: "border-orchid/20", hoverBorder: "hover:border-orchid/40" },
  citrus: { text: "text-citrus", bg: "bg-citrus/5", border: "border-citrus/20", hoverBorder: "hover:border-citrus/40" },
  poppy: { text: "text-poppy", bg: "bg-poppy/5", border: "border-poppy/20", hoverBorder: "hover:border-poppy/40" },
};

const academyOfferings = [
  {
    href: "/academy/leadership",
    eyebrow: "For leaders making the calls",
    name: "The Executive Leadership Academy",
    tagline:
      "An immersive workshop plus three months of implementation sessions, applied to the workforce and technology decisions already on your desk.",
    image: elaHeroAsset.url,
    alt: "Senior leaders in conversation",
    accent: "text-poppy",
  },
  {
    href: "/academy/transition",
    eyebrow: "For people whose role just ended",
    name: "The TGR Transition Academy",
    tagline:
      "Outplacement reimagined: a cohort moving through the five stages together, building real AI agency instead of polishing a resume.",
    image: taHeroAsset.url,
    alt: "A person at a worktable in thought",
    accent: "text-citrus",
  },
];

const phases = [
  {
    number: "01",
    name: "Unhook Identity",
    tagline: "I'm not my job.",
    description:
      "The hardest step and the most necessary. You built an identity on what you do — the title, the craft, the expertise. When that gets disrupted, the instinct is to hold tighter. This phase is about loosening the grip. Not abandoning what you've built. Recognizing that you are not reducible to a set of tasks a machine can absorb.",
    color: "indigo",
  },
  {
    number: "02",
    name: "Reclaim Value",
    tagline: "Here's Who I Am.",
    description:
      "Once you've unhooked from the title, you need to find what's underneath it. Your taste. Your judgment. Your perspective. The thing that made your work yours before anyone gave it a job description. This is the layer AI can't touch — and most people don't know they have it until the tasks get stripped away.",
    color: "aqua",
  },
  {
    number: "03",
    name: "Discover Purpose",
    tagline: "What matters to me.",
    description:
      "Value without direction is potential without impact. This phase is about choosing: what do you want your reclaimed value to serve? What change do you want to make? What problem do you want to solve? Purpose isn't found by introspection alone. It's found by engaging with the world and noticing what pulls you forward.",
    color: "orchid",
  },
  {
    number: "04",
    name: "Become AI Ready",
    tagline: "Understand AI's power to amplify your ideas.",
    description:
      "Stop treating AI as something to compete with and put yourself at the center of it — your identity, your values, your purpose, your ideas. Use it only for efficiency and you'll never see what you can actually do. Explore it without expectations, and the ceiling disappears.",
    color: "citrus",
  },
  {
    number: "05",
    name: "Relaunch Yourself",
    tagline: "Turn who you are into work, opportunity, and income.",
    description:
      "Turn everything you've reclaimed into something the world can see, understand, value, and pay for. Visible work. Real offers. A better role, a business, a new stream of income — several ways for opportunity and money to reach you instead of one employer deciding your worth.",
    color: "poppy",
  },
];


const stageImages = [
  { url: personBehindAsset.url, alt: "A person seen from behind before a wall of vibrant pinned images" },
  { url: womanWorktableAsset.url, alt: "A woman leaning over a worktable covered in prints" },
  { url: womanDeskAsset.url, alt: "A woman at her desk in the evening with handwritten pages" },
  { url: twoProfessionalsScreenAsset.url, alt: "Two professionals side by side working at a screen" },
  { url: twoProfessionalsTableAsset.url, alt: "Two professionals leaning over a large table of colorful work" },
];


const fearQuotes = [
  { text: "AI will take my job.", source: "The layoff headline" },
  { text: "The tasks that made me feel useful are disappearing.", source: "The quiet erosion" },
  { text: "I'm being asked to babysit an AI agent instead of do my work.", source: "The rewritten role" },
  { text: "The expertise I spent decades building is now a $20 subscription.", source: "The shifted market" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-soft-white text-aubergine">
      <Seo
        title="The Great Repurpose — You Were Meant to Repurpose"
        description="Reclaiming Agency, Meaning, and Value in the Age of AI. You weren't meant to be replaced. You were meant to Repurpose."
        path="/"
        image="https://thegreatrepurpose.com/__l5e/assets-v1/f80af835-3e03-449e-8150-3e917b3d7a2d/hero.png"
      />
      <Navigation />
      <main id="main-content">

        {/* ── Section 1: Hero ── */}
        <section className="relative bg-aubergine overflow-hidden w-full">
          <div className="relative w-full min-h-[80vh] md:min-h-[85vh] flex items-end">
            <img
              src={heroAsset.url}
              alt="A diverse group of people standing together, faces turned toward the future"
              className="absolute inset-0 w-full h-full object-cover object-center"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-aubergine via-aubergine/55 to-transparent" />
            <div className="relative w-full px-6 md:px-10 lg:px-16 pb-12 md:pb-16 pt-32">
              <div className="max-w-xl">
                <ScrollFadeUp>
                  <p className="font-sans text-aqua text-[0.85rem] uppercase tracking-[0.2em] font-semibold mb-3">
                    Reclaiming Agency, Meaning, and Value in the Age of AI
                  </p>
                  <h1 className="font-display text-soft-white text-2xl md:text-3xl lg:text-4xl leading-[1.05] mb-4">
                    <span className="font-light text-soft-white/90">You weren't meant to be replaced.</span>
                    <br />
                    <span className="text-soft-white">It's time to </span>
                    <span className="text-citrus">Repurpose</span>
                  </h1>
                  <p className="font-body text-soft-white/80 text-base md:text-lg max-w-md leading-relaxed mb-6">
                    The Great Repurpose is a movement for people navigating the coming disruption in work as an opportunity for reinvention — so you can create meaningful value in an AI-shaped world.
                  </p>
                  <Link
                    to="/selfcheck"
                    className="inline-flex items-center gap-2 bg-aqua text-aubergine font-sans font-semibold text-sm uppercase tracking-widest px-7 py-3.5 rounded-full pulse-aqua hover:opacity-90 transition-opacity"
                  >
                    GET YOUR PROFILE →
                  </Link>
                </ScrollFadeUp>
              </div>
            </div>
          </div>
        </section>


        {/* ── Section 2: The real question ── */}
        <section className="bg-soft-white py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              <ScrollFadeUp>
                <img
                  src={personBehindAsset.url}
                  alt="A person seen from behind, standing quietly before a wall of vibrant images"
                  className="w-full rounded-lg object-cover aspect-[4/5]"
                  loading="lazy"
                />
              </ScrollFadeUp>
              <div className="space-y-5">
                <ScrollFadeUp delay={100}>
                  <p className="font-sans text-indigo text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                    Everything is changing
                  </p>
                  <h2 className="font-display text-aubergine text-3xl md:text-4xl lg:text-5xl leading-tight">
                    The future of work is being rewritten — and the real question is:
                  </h2>
                </ScrollFadeUp>
                <ScrollFadeUp delay={150}>
                  <p className="font-display text-poppy text-2xl md:text-3xl italic leading-snug">
                    “Who am I now?”
                  </p>
                </ScrollFadeUp>
                <div className="font-body text-aubergine/80 text-lg leading-relaxed space-y-5">
                  <ScrollFadeUp delay={200}>
                    <p>Some people lose their jobs outright. That's visible, countable, and makes the news.</p>
                  </ScrollFadeUp>
                  <ScrollFadeUp delay={250}>
                    <p>But millions more are experiencing something the headlines don't cover. They keep their jobs — but lose the specific tasks that made those jobs feel like <em>theirs</em>. The brushstroke. The analysis. The client relationship. The vocal performance.</p>
                  </ScrollFadeUp>
                  <ScrollFadeUp delay={300}>
                    <p>And still others feel something subtler: the world just shifts. The phone stops ringing as much. The proposals don't convert. Nothing breaks. Everything erodes.</p>
                  </ScrollFadeUp>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Steam engine band ── */}
        <section className="bg-aubergine py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto space-y-10">
            <ScrollFadeUp>
              <h2 className="font-display text-soft-white text-3xl md:text-4xl lg:text-5xl leading-tight">
                The more things change...
              </h2>
            </ScrollFadeUp>

            <ScrollFadeUp delay={50}>
              <p className="font-body text-soft-white/70 text-lg leading-relaxed">
                A century and a half ago, the steam engine didn't just change how things were made. It changed what it meant to be valuable. Strength, endurance, and craft that had defined human work for millennia were suddenly commodities. The people who thrived weren't the ones who out-muscled the machine. They were the ones who learned to work with it — and found the layer of value the machine couldn't reach.
              </p>
            </ScrollFadeUp>

            <ScrollFadeUp delay={100}>
              <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-center">
                <div className="md:col-span-3 space-y-6">
                  <h2 className="font-display text-soft-white text-2xl md:text-3xl leading-tight">
                    The fears underneath the headlines
                  </h2>
                  {fearQuotes.map(({ text }) => (
                    <blockquote key={text} className="border-l-2 border-indigo/60 pl-5">
                      <p className="font-display text-soft-white text-lg md:text-xl italic leading-snug">
                        "{text}"
                      </p>
                    </blockquote>
                  ))}
                </div>
                <div className="md:col-span-2">
                  <img
                    src={smallGroupLaptopAsset.url}
                    alt="A small group gathered around a laptop in conversation"
                    className="w-full rounded-lg object-cover aspect-[4/3] opacity-90"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollFadeUp>

            <ScrollFadeUp delay={200}>
              <div className="max-w-3xl">
                <p className="font-sans text-aqua text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                  Just imagine
                </p>
                <h3 className="font-display text-soft-white text-xl md:text-2xl leading-tight mb-4">
                  What if the same technology that's disrupting your work could become the most powerful tool you've ever touched?
                </h3>
                <div className="font-body text-soft-white/80 text-base leading-relaxed space-y-3">
                  <p>First, you do the identity work. You separate who you are from what you used to do, so you can finally see your real value and choose what actually matters to you.</p>
                  <p>Then you take AI — the very force that's displacing the old version of your work — and use it as an amplifier for the new version of you.</p>
                  <p>Identity on one track. AI as a force multiplier on the other. Bring those two tracks together, and the work you were meant to do becomes far more possible.</p>
                </div>
              </div>
            </ScrollFadeUp>

            <ScrollFadeUp delay={300}>
              <div className="max-w-3xl pt-4 border-t border-soft-white/10">
                <p className="font-display text-soft-white text-xl md:text-2xl leading-tight mb-3">
                  AI is a force multiplier for people who know what matters.
                </p>
                <p className="font-body text-soft-white/70 text-base leading-relaxed">
                  Scalable judgment. Expansive creativity. The ability to see what others miss — and to act on it at a scale that was never possible before.
                </p>
              </div>
            </ScrollFadeUp>
          </div>
        </section>



        {/* ── Section 5: The Five Stages ── */}
        <section className="bg-soft-white py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
              <div className="space-y-6">
                <ScrollFadeUp>
                  <p className="font-sans text-indigo text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                    This is not a self-help program
                  </p>
                  <h2 className="font-display text-aubergine text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                    The Five Stages of The Great Repurpose
                  </h2>
                </ScrollFadeUp>
                <div className="font-body text-aubergine/80 text-lg leading-relaxed space-y-5">
                  <ScrollFadeUp delay={100}>
                    <p>The Great Repurpose puts a name to what's actually happening: the relationship between you and the work that gives you meaning is being renegotiated — and nobody asked your permission.</p>
                  </ScrollFadeUp>
                  <ScrollFadeUp delay={150}>
                    <p>Everyone else is selling you a course. We're naming the crisis underneath the crisis — and giving you a way through it.</p>
                  </ScrollFadeUp>
                  <ScrollFadeUp delay={200}>
                    <p>The Whole You, Amplified by AI. That's the opportunity. Not replacing yourself. Not becoming a prompt engineer. Becoming more fully who you already are — with tools that multiply what you can do.</p>
                  </ScrollFadeUp>
                </div>
              </div>
              <ScrollFadeUp delay={100}>
                <img
                  src={womanDeskAsset.url}
                  alt="A woman at her desk in the evening with handwritten pages"
                  className="w-full rounded-lg object-cover aspect-[4/5]"
                  loading="lazy"
                />
              </ScrollFadeUp>
            </div>

          </div>

          <div className="mb-10">
            {phases.map((phase, i) => {
              const colors = colorMap[phase.color];
              const image = stageImages[i];
              const imageRight = i % 2 === 1;
              return (
                <ScrollFadeUp key={phase.number}>
                  <Link
                    to={`/phases#${phase.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`group block w-full ${i % 2 === 1 ? "bg-soft-white" : colors.bg} border-y border-aubergine/5 transition-colors`}
                  >
                    <div className={`relative max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-8 md:gap-12 items-center ${i === 0 ? "pt-14 md:pt-18 pb-5 md:pb-7" : "py-5 md:py-7"}`}>
                      {i === 0 && (
                        <h2 className="absolute top-5 md:top-7 left-6 font-display text-aubergine text-2xl md:text-3xl leading-tight">
                          The Stages...
                        </h2>
                      )}
                      <div className={`w-full md:w-1/3 shrink-0 ${imageRight ? "md:order-2" : ""}`}>
                        <img
                          src={image.url}
                          alt={image.alt}
                          loading="lazy"
                          className="w-full aspect-[4/3] object-cover rounded-lg"
                        />
                      </div>
                      <div className={`flex-1 ${imageRight ? "md:order-1" : ""}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={stageLogos[phase.color]}
                            alt=""
                            className="h-10 w-auto"
                            loading="lazy"
                          />
                          <span className={`font-sans text-xs uppercase tracking-widest font-semibold ${colors.text}`}>
                            {phase.number}
                          </span>
                        </div>
                        <h3 className="font-display text-aubergine text-2xl md:text-3xl mb-2">{phase.name}</h3>
                        <p className={`font-body ${colors.text} italic text-lg mb-3`}>"{phase.tagline}"</p>
                        <p className="font-body text-aubergine/70 text-base leading-relaxed">{phase.description}</p>
                      </div>
                    </div>
                  </Link>
                </ScrollFadeUp>
              );
            })}
          </div>

          <div className="max-w-5xl mx-auto px-6">
            <ScrollFadeUp delay={300}>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={smallGroupLaptopAsset.url}
                  alt="A small group gathered around a laptop, collaborating through colorful light"
                  className="w-full h-64 md:h-80 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-aubergine/60 flex items-center justify-center">
                  <Link
                    to="/phases"
                    className="inline-flex items-center gap-2 border-2 border-soft-white text-soft-white font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-soft-white hover:text-aubergine transition-colors"
                  >
                    Explore The Five Stages →
                  </Link>
                </div>
              </div>
            </ScrollFadeUp>
          </div>
        </section>

        {/* ── Section 7: Academy offerings ── */}
        <section className="bg-aubergine py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollFadeUp>
              <p className="font-sans text-aqua text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                TGR Academy
              </p>
              <h2 className="font-display text-soft-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                Learn About The Great Repurpose Academy
              </h2>
              <p className="font-body text-soft-white/70 text-lg leading-relaxed max-w-3xl mb-12">
                Two programs built on the five stages. One for leaders deciding how AI reshapes the work, and one for people whose roles it already changed. Run them together for coordinated support on both sides of a workforce change.
              </p>
            </ScrollFadeUp>

            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {academyOfferings.map((program) => (
                <ScrollFadeUp key={program.href}>
                  <Link
                    to={program.href}
                    className="group block border border-soft-white/15 rounded-xl overflow-hidden bg-soft-white/5 hover:border-indigo/40 transition-colors"
                  >
                    <img
                      src={program.image}
                      alt={program.alt}
                      loading="lazy"
                      className="w-full h-44 object-cover"
                    />
                    <div className="p-6">
                      <p className={`font-sans text-xs uppercase tracking-widest mb-2 ${program.accent}`}>
                        {program.eyebrow}
                      </p>
                      <h3 className="font-display text-soft-white text-xl mb-2 group-hover:text-indigo transition-colors">
                        {program.name}
                      </h3>
                      <p className="font-sans text-soft-white/60 text-sm leading-relaxed mb-4">
                        {program.tagline}
                      </p>
                      <span className="font-sans text-aqua text-sm">Learn more →</span>
                    </div>
                  </Link>
                </ScrollFadeUp>
              ))}
            </div>

            <ScrollFadeUp delay={100}>
              <div className="text-center">
                <Link
                  to="/academy"
                  className="inline-flex items-center gap-2 border-2 border-aqua text-aqua font-sans font-semibold text-sm uppercase tracking-widest px-10 py-5 rounded-full hover:bg-aqua hover:text-aubergine transition-colors"
                >
                  Explore the Academy →
                </Link>
              </div>
            </ScrollFadeUp>
          </div>
        </section>

        {/* ── Video ── */}
        <section className="bg-soft-white py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollFadeUp>
              <p className="font-sans text-indigo text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                Watch
              </p>
              <h2 className="font-display text-aubergine text-3xl md:text-5xl leading-tight mb-6">
                Experience the Heart of The Great Repurpose
              </h2>
              <p className="font-display text-aubergine/80 text-xl md:text-2xl italic leading-snug mb-10">
                Official Music Video of the Movement
              </p>
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/4vTo0ZdzNYU"
                  title="The Great Repurpose"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </ScrollFadeUp>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Index;
