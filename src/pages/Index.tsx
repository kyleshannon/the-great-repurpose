import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";
import { SignalTeaser } from "@/components/SignalTeaser";
import heroAsset from "@/assets/hero.png.asset.json";
import personBehindAsset from "@/assets/person-seen-from-behind.png.asset.json";

import womanDeskAsset from "@/assets/woman-at-desk.png.asset.json";
import womanWorktableAsset from "@/assets/woman-worktable.png.asset.json";
import twoProfessionalsScreenAsset from "@/assets/two-professionals-screen.png.asset.json";
import twoProfessionalsTableAsset from "@/assets/two-professionals-table.png.asset.json";
import smallGroupLaptopAsset from "@/assets/small-group-laptop.png.asset.json";
import twoPeopleConversationAsset from "@/assets/two-people-conversation.png.asset.json";

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

const profileGroups = [
  {
    name: "Identity Seekers",
    tagline: "The work right now is inner.",
    profiles: ["The Unlocker", "The Awakener", "The Explorer"],
  },
  {
    name: "Direction Finders",
    tagline: "Now the work is aiming it.",
    profiles: ["The Firestarter", "The Translator", "The Original"],
  },
  {
    name: "Builders in Motion",
    tagline: "The work is shipping.",
    profiles: ["The Compass", "The Architect", "The Catalyst"],
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
                    <span className="text-citrus">Repurpose.</span>
                  </h1>
                  <p className="font-body text-soft-white/80 text-base md:text-lg max-w-md leading-relaxed mb-6">
                    The Great Repurpose is a movement for people navigating the human side of reinvention — so you can create meaningful value in an AI-shaped world.
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
                  <p className="font-display text-aubergine text-2xl md:text-3xl italic leading-snug">
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
              <p className="font-body text-soft-white/70 text-lg leading-relaxed">
                A century and a half ago, the steam engine didn't just change how things were made. It changed what it meant to be valuable. Strength, endurance, and craft that had defined human work for millennia were suddenly commodities. The people who thrived weren't the ones who out-muscled the machine. They were the ones who learned to work with it — and found the layer of value the machine couldn't reach.
              </p>
            </ScrollFadeUp>

            <ScrollFadeUp delay={100}>
              <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-center">
                <div className="md:col-span-3 space-y-5">
                  {fearQuotes.map(({ text, source }, i) => (
                    <blockquote key={text} className="border-l-2 border-indigo/60 pl-5">
                      <p className="font-display text-soft-white text-lg md:text-xl italic leading-snug mb-1">
                        "{text}"
                      </p>
                      <cite className="font-sans text-soft-white/50 text-xs not-italic tracking-wide uppercase">
                        {source}
                      </cite>
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
                  <p>You could be excellent at anything you set your mind to.</p>
                  <p>You could become a ten-person team.</p>
                  <p>You could start the business you've dreamed of.</p>
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


        {/* ── Section 5: Bridge to Profiles ── */}
        <section className="bg-aubergine py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-6 order-2 md:order-1">
                <ScrollFadeUp>
                  <p className="font-sans text-aqua text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                    This is not a self-help program
                  </p>
                  <h2 className="font-display text-soft-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                    The Five Stages of The Great Repurpose

                  </h2>
                </ScrollFadeUp>
                <div className="font-body text-soft-white/80 text-lg leading-relaxed space-y-5">
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
                <ScrollFadeUp delay={220}>
                  <ol className="border-t border-soft-white/15 divide-y divide-soft-white/10">
                    {phases.map((phase) => (
                      <li key={phase.number} className="flex items-baseline gap-4 py-3">
                        <span className={`font-sans text-xs font-semibold tracking-widest ${colorMap[phase.color].text}`}>
                          {phase.number}
                        </span>
                        <span className="font-display text-soft-white text-lg md:text-xl">{phase.name}</span>
                        <span className="font-body text-soft-white/50 text-sm italic hidden sm:inline">
                          {phase.tagline}
                        </span>
                      </li>
                    ))}
                  </ol>
                </ScrollFadeUp>
                <ScrollFadeUp delay={250}>
                  <Link
                    to="/selfcheck"
                    className="inline-flex items-center gap-2 bg-aqua text-aubergine font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:opacity-90 transition-opacity mt-4"
                  >
                    Get Your Profile →
                  </Link>
                </ScrollFadeUp>
              </div>
              <ScrollFadeUp delay={100} className="order-1 md:order-2">
                <img
                  src={twoPeopleConversationAsset.url}
                  alt="Two people seated close together in serious conversation"
                  className="w-full rounded-lg object-cover aspect-[4/5]"
                  loading="lazy"
                />
              </ScrollFadeUp>
            </div>
          </div>
        </section>

        {/* ── Section 6: The Five Stages ── */}
        <section className="bg-soft-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollFadeUp>
              <p className="font-sans text-indigo text-xs uppercase tracking-[0.2em] font-semibold mb-3 text-center">
                Five Stages. One Journey.
              </p>
              <h2 className="font-display text-aubergine text-3xl md:text-5xl leading-tight mb-6 text-center">
                Exploring the Five Stages
              </h2>
              <p className="font-body text-aubergine/70 text-lg leading-relaxed max-w-2xl mx-auto text-center mb-14">
                Here's what each stage actually looks like when the work that defined you changes. They don't happen in order. They're not clean. But knowing where you are is the first step toward building what comes next.
              </p>
            </ScrollFadeUp>
          </div>

          <div className="mb-16">
            {phases.map((phase, i) => {
              const { Icon } = stageIcons[i];
              const colors = colorMap[phase.color];
              const image = stageImages[i];
              const imageRight = i % 2 === 1;
              return (
                <ScrollFadeUp key={phase.number}>
                  <Link
                    to={`/phases#${phase.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`group block w-full ${i % 2 === 1 ? "bg-soft-white" : colors.bg} border-y border-aubergine/5 transition-colors`}
                  >
                    <div className="max-w-5xl mx-auto px-6 py-10 md:py-14 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
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
                          <Icon className={`w-8 h-8 ${colors.text}`} />
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

        {/* ── Section 7: How It Works ── */}
        <section className="bg-aubergine py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollFadeUp>
              <p className="font-sans text-aqua text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                How It Works
              </p>
              <h2 className="font-display text-soft-white text-3xl md:text-4xl leading-tight mb-12">
                Find your profile in under two minutes
              </h2>
            </ScrollFadeUp>

            <div className="space-y-8 mb-14 text-left max-w-2xl mx-auto">
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
                  desc: "Based on your profile, we'll recommend the specific thing that will help you most right now — whether that's a community, a practice, or a conversation.",
                },
              ].map(({ step, label, desc }, i) => (
                <ScrollFadeUp key={step} delay={i * 100}>
                  <div className="flex gap-5">
                    <span className="font-display text-aqua text-3xl font-bold shrink-0">{step}</span>
                    <div>
                      <h3 className="font-display text-soft-white text-xl mb-2">{label}</h3>
                      <p className="font-body text-soft-white/70 text-base leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </ScrollFadeUp>
              ))}
            </div>

            <ScrollFadeUp delay={300}>
              <Link
                to="/selfcheck"
                className="inline-flex items-center gap-2 bg-aqua text-aubergine font-sans font-semibold text-sm uppercase tracking-widest px-10 py-5 rounded-full pulse-aqua hover:opacity-90 transition-opacity"
              >
                Get Your Repurpose Profile →
              </Link>
              <p className="text-soft-white/50 text-sm font-sans mt-4">
                7 questions. 2 minutes. Then we'll tell you what you're building toward.
              </p>
            </ScrollFadeUp>
          </div>
        </section>

        {/* ── Latest Daily Signal teaser ── */}
        <SignalTeaser />

        {/* ── Section 8: The 10 Great Repurpose Profiles ── */}
        <section className="bg-soft-white py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
              <div>
                <ScrollFadeUp>
                  <p className="font-sans text-indigo text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                    The 10 Repurpose Profiles
                  </p>
                  <h2 className="font-display text-aubergine text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                    We're all going through this — and we're all in different places.
                  </h2>
                  <p className="font-body text-aubergine/70 text-lg leading-relaxed mb-4">
                    Some of us are holding on to what we were. Some of us are rebuilding. Some of us just felt something shift and can't name it yet.
                  </p>
                  <p className="font-body text-aubergine/70 text-lg leading-relaxed">
                    Ten profiles across the journey — grouped as Identity Seekers, Direction Finders, and Builders in Motion — with The Amplifier for those for whom the real work is just beginning.
                  </p>
                </ScrollFadeUp>
              </div>
              <ScrollFadeUp delay={100}>
                <img
                  src={womanDeskAsset.url}
                  alt="A woman resting her head on her hand at a desk in the evening"
                  className="w-full rounded-lg object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </ScrollFadeUp>
            </div>

            <ScrollFadeUp delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 text-left">
                {profileGroups.map((group) => (
                  <div key={group.name} className="border-t-2 border-indigo/40 pt-5">
                    <h3 className="font-display text-aubergine text-xl mb-1">{group.name}</h3>
                    <p className="font-body text-aubergine/50 text-sm italic mb-4">{group.tagline}</p>
                    <ul className="space-y-1.5">
                      {group.profiles.map((p) => (
                        <li key={p} className="font-display text-aubergine/80 text-base">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="border border-indigo/30 rounded-lg bg-indigo/5 px-6 py-5 mb-12 text-center">
                <p className="font-display text-aubergine text-lg">
                  <span className="font-semibold">The Amplifier</span>
                  <span className="text-aubergine/60"> — you've made it through. Now the real work begins.</span>
                </p>
              </div>
            </ScrollFadeUp>

            <ScrollFadeUp delay={200}>
              <div className="text-center">
                <Link
                  to="/selfcheck"
                  className="inline-flex items-center gap-2 bg-aqua text-aubergine font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full pulse-aqua hover:opacity-90 transition-opacity mb-4"
                >
                  Get Your Repurpose Profile →
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

export default Index;
