import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";
import { SignalTeaser } from "@/components/SignalTeaser";
import { stageIcons } from "@/components/BrandIcons";
import heroAsset from "@/assets/hero.png.asset.json";
import personBehindAsset from "@/assets/person-seen-from-behind.png.asset.json";
import youngManLaptopAsset from "@/assets/young-black-man-laptop.png.asset.json";
import womanDeskAsset from "@/assets/woman-at-desk.png.asset.json";
import womanWorktableAsset from "@/assets/woman-worktable.png.asset.json";
import twoProfessionalsScreenAsset from "@/assets/two-professionals-screen.png.asset.json";
import twoProfessionalsTableAsset from "@/assets/two-professionals-table.png.asset.json";
import smallGroupLaptopAsset from "@/assets/small-group-laptop.png.asset.json";
import twoPeopleConversationAsset from "@/assets/two-people-conversation.png.asset.json";

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
      "This is where curiosity replaces fear. Not 'learn AI or get left behind' — that's someone else's threat. This is you, with your purpose clear, discovering that the tools everyone told you to fear are actually the most powerful instruments you've ever touched. AI doesn't replace your value. It amplifies it. But only if you know what your value is first.",
    color: "citrus",
  },
  {
    number: "05",
    name: "Relaunch Yourself",
    tagline: "Turn who you are into work, opportunity, and income.",
    description:
      "Knowledge without action is just anxiety. This phase is where purpose meets practice. You start making things. You start sharing what you learn. You stop consuming AI content and start creating with AI as your instrument. The work you produce here isn't a replacement for what you lost. It's something new — and it's more you, not less.",
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

const transformations = [
  {
    title: "Reclaim Yourself",
    body: "Find the human underneath the job title. Your taste, judgment, and perspective didn't disappear — they were buried under the tasks.",
    image: womanWorktableAsset.url,
    color: "indigo",
  },
  {
    title: "Conquer AI",
    body: "Explore what AI makes possible for you. Not as a threat. As an instrument that amplifies the value only you can bring.",
    image: twoProfessionalsScreenAsset.url,
    color: "aqua",
  },
  {
    title: "Relaunch Yourself",
    body: "Integrate the new you, amplify your value, and introduce yourself to the world. Turn who you are into work, opportunity, and income.",
    image: twoProfessionalsTableAsset.url,
    color: "poppy",
  },
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
        <section className="relative bg-aubergine overflow-hidden">
          <div className="relative w-full min-h-[85vh] md:min-h-[80vh] flex items-end">
            <img
              src={heroAsset.url}
              alt="A diverse group of people standing together, faces turned toward the future"
              className="absolute inset-0 w-full h-full object-cover object-top"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-aubergine via-aubergine/70 to-aubergine/20" />
            <div className="relative w-full px-6 pb-12 md:pb-20 pt-32">
              <div className="max-w-5xl mx-auto">
                <ScrollFadeUp>
                  <p className="font-sans text-aqua text-xs uppercase tracking-[0.2em] font-semibold mb-4">
                    Reclaiming Agency, Meaning, and Value in the Age of AI
                  </p>
                  <h1 className="font-display text-soft-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 max-w-4xl">
                    You weren't meant to be replaced.
                    <br />
                    <span className="text-aqua">You were meant to Repurpose.</span>
                  </h1>
                  <p className="font-body text-soft-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                    The Great Repurpose is a movement for people navigating the human side of reinvention — so you can create meaningful value in an AI-shaped world.
                  </p>
                  <Link
                    to="/selfcheck"
                    className="inline-flex items-center gap-2 bg-indigo text-white font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full pulse-indigo hover:opacity-90 transition-opacity"
                  >
                    Get Your Repurpose Profile →
                  </Link>
                </ScrollFadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: The real question ── */}
        <section className="bg-soft-white py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <ScrollFadeUp>
                <img
                  src={personBehindAsset.url}
                  alt="A person seen from behind, standing quietly before a wall of vibrant images"
                  className="w-full rounded-lg object-cover aspect-[4/5]"
                  loading="lazy"
                />
              </ScrollFadeUp>
              <div className="space-y-6">
                <ScrollFadeUp delay={100}>
                  <p className="font-sans text-indigo text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                    Everything is changing
                  </p>
                  <h2 className="font-display text-aubergine text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                    The future of work is being rewritten — and the real question is:
                  </h2>
                </ScrollFadeUp>
                <ScrollFadeUp delay={150}>
                  <p className="font-display text-aubergine text-4xl md:text-5xl italic leading-snug">
                    "Who am I now?"
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
          <div className="max-w-4xl mx-auto">
            <ScrollFadeUp>
              <p className="font-body text-soft-white/70 text-lg leading-relaxed mb-12">
                A century and a half ago, the steam engine didn't just change how things were made. It changed what it meant to be valuable. Strength, endurance, and craft that had defined human work for millennia were suddenly commodities. The people who thrived weren't the ones who out-muscled the machine. They were the ones who learned to work with it — and found the layer of value the machine couldn't reach.
              </p>
            </ScrollFadeUp>

            <div className="space-y-6 mb-16">
              {fearQuotes.map(({ text, source }, i) => (
                <ScrollFadeUp key={text} delay={i * 80}>
                  <blockquote className="border-l-4 border-indigo pl-6">
                    <p className="font-display text-soft-white text-2xl md:text-3xl leading-tight mb-2">
                      "{text}"
                    </p>
                    <cite className="font-sans text-soft-white/50 text-sm not-italic">
                      {source}
                    </cite>
                  </blockquote>
                </ScrollFadeUp>
              ))}
            </div>

            <ScrollFadeUp delay={400}>
              <div className="bg-soft-white/5 border border-soft-white/10 rounded-2xl p-8 md:p-12">
                <p className="font-sans text-aqua text-xs uppercase tracking-[0.2em] font-semibold mb-4">
                  Just imagine
                </p>
                <h3 className="font-display text-soft-white text-2xl md:text-3xl leading-tight mb-6">
                  What if the same technology that's disrupting your work could become the most powerful tool you've ever touched?
                </h3>
                <div className="font-body text-soft-white/80 text-lg leading-relaxed space-y-4">
                  <p>You could be excellent at anything you set your mind to.</p>
                  <p>You could become a ten-person team.</p>
                  <p>You could start the business you've dreamed of.</p>
                </div>
              </div>
            </ScrollFadeUp>
          </div>
        </section>

        {/* ── Section 4: Three Transformations ── */}
        <section className="bg-soft-white py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollFadeUp>
              <p className="font-sans text-indigo text-xs uppercase tracking-[0.2em] font-semibold mb-3 text-center">
                The Path Through
              </p>
              <h2 className="font-display text-aubergine text-3xl md:text-5xl leading-tight mb-4 text-center">
                Three Transformations
              </h2>
              <p className="font-body text-aubergine/70 text-lg leading-relaxed max-w-2xl mx-auto text-center mb-14">
                The Great Repurpose isn't a course. It's a sequence of shifts that move you from disruption to direction.
              </p>
            </ScrollFadeUp>

            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {transformations.map(({ title, body, image, color }, i) => (
                <ScrollFadeUp key={title} delay={i * 100}>
                  <div className="group h-full bg-soft-white border border-aubergine/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p className={`font-sans text-xs uppercase tracking-[0.2em] font-semibold mb-2 text-${color}`}>
                        0{i + 1}
                      </p>
                      <h3 className="font-display text-aubergine text-2xl mb-3">{title}</h3>
                      <p className="font-body text-aubergine/70 text-base leading-relaxed">{body}</p>
                    </div>
                  </div>
                </ScrollFadeUp>
              ))}
            </div>

            <ScrollFadeUp delay={300}>
              <div className="max-w-3xl mx-auto text-center">
                <p className="font-display text-aubergine text-2xl md:text-3xl leading-tight mb-6">
                  AI is a force multiplier for people who know what matters.
                </p>
                <p className="font-body text-aubergine/70 text-lg leading-relaxed">
                  Scalable judgment. Expansive creativity. The ability to see what others miss — and to act on it at a scale that was never possible before.
                </p>
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
                    It's a map for the moment you're in.
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
                <ScrollFadeUp delay={250}>
                  <Link
                    to="/selfcheck"
                    className="inline-flex items-center gap-2 bg-aqua text-aubergine font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:opacity-90 transition-opacity mt-4"
                  >
                    Start Free Assessment →
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
        <section className="bg-soft-white py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollFadeUp>
              <p className="font-sans text-indigo text-xs uppercase tracking-[0.2em] font-semibold mb-3 text-center">
                Five Stages. One Journey.
              </p>
              <h2 className="font-display text-aubergine text-3xl md:text-5xl leading-tight mb-6 text-center">
                Where are you on the map?
              </h2>
              <p className="font-body text-aubergine/70 text-lg leading-relaxed max-w-2xl mx-auto text-center mb-14">
                These are the five phases people actually go through when the work that defined them changes. They don't happen in order. They're not clean. But knowing where you are is the first step toward building what comes next.
              </p>
            </ScrollFadeUp>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {phases.map((phase, i) => {
                const { Icon } = stageIcons[i];
                const colorClass = `text-${phase.color}`;
                const bgClass = `bg-${phase.color}/5`;
                const borderClass = `border-${phase.color}/20`;
                return (
                  <ScrollFadeUp key={phase.number} delay={i * 80}>
                    <Link
                      to={`/phases#${phase.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`group flex gap-5 p-6 rounded-xl border ${borderClass} ${bgClass} hover:border-${phase.color}/40 transition-colors h-full`}
                    >
                      <div className={`shrink-0 ${colorClass}`}>
                        <Icon className="w-10 h-10" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className={`font-sans text-xs uppercase tracking-widest font-semibold ${colorClass}`}>
                            {phase.number}
                          </span>
                          <h3 className="font-display text-aubergine text-xl">{phase.name}</h3>
                        </div>
                        <p className={`font-body ${colorClass} italic text-base mb-2`}>"{phase.tagline}"</p>
                        <p className="font-body text-aubergine/70 text-sm leading-relaxed">{phase.description}</p>
                      </div>
                    </Link>
                  </ScrollFadeUp>
                );
              })}
            </div>

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
                className="inline-flex items-center gap-2 bg-indigo text-white font-sans font-semibold text-sm uppercase tracking-widest px-10 py-5 rounded-full pulse-indigo hover:opacity-90 transition-opacity"
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
                  className="inline-flex items-center gap-2 bg-indigo text-white font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full pulse-indigo hover:opacity-90 transition-opacity mb-4"
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
