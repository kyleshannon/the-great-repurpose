import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";
import { getStageAnchor } from "@/lib/stages";
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

const stages = [
  {
    number: "01",
    name: "Unhook Identity",
    tagline: "I'm not my job.",
    color: "indigo",
    meaning: `Your identity got fused to your work. The title, the craft, the expertise, the daily rhythm of doing the thing you were good at. When AI disrupts that — whether by taking the job, absorbing the tasks, or shifting the ground — the first instinct is to hold tighter. To defend the territory. To refuse the tools. To insist that the old way was better.\n\nUnhooking isn't giving up. It isn't abandoning your career or your craft. It's recognizing that you are more than the tasks you perform. That your worth existed before the job title and will exist after it changes. This is the hardest stage because it asks you to let go of something that felt like bedrock.`,
    feels: `Grief. Anger. Disorientation. The feeling that if you're not a designer / teacher / consultant / writer, you don't know who you are. The temptation to define yourself by what you've lost rather than what remains.`,
    practice: `You can talk about what's happening without it triggering a crisis. You can separate "my clients are using AI" from "I have no value." You can hold the grief and the curiosity at the same time.`,
  },
  {
    number: "02",
    name: "Reclaim Value",
    tagline: "Here's Who I Am.",
    color: "aqua",
    meaning: `Underneath the job title, the task list, and the deliverables, there's something AI can't touch. Your taste — the reason you make the choices you make. Your judgment — the pattern recognition that comes from decades of experience. Your perspective — the lens only you have. Your relationships — the trust you've built person to person.\n\nReclaiming value is the work of finding that layer. It's answering the question: "If AI can do the tasks, what do I bring that the tasks don't capture?" For most people, the answer is bigger than they expect. They just never had to articulate it before because the tasks did the talking.`,
    feels: `A shift from loss to discovery. Not "everything's fine" — more like "oh, there's something here I didn't see." The moment you realize your 20 years of experience aren't obsolete — they're the context that makes AI output extraordinary instead of generic.`,
    practice: `You can name your value in a sentence that doesn't reference a job title or a task. You can explain what you bring to the table that no tool replicates. You start to see your experience as an asset, not a liability.`,
  },
  {
    number: "03",
    name: "Discover Purpose",
    tagline: "What matters to me.",
    color: "orchid",
    meaning: `Value without direction is just potential. This stage is about choosing: now that you know what you bring, where do you want to bring it? What problem pulls you forward? What change do you want to make? What would you work on even if no one paid you — not as a fantasy, but as a real compass?\n\nPurpose doesn't arrive through introspection alone. It arrives through engagement — trying things, talking to people, showing up in communities where the conversation is bigger than "how do I use this tool." It's found in the overlap between what you're good at, what you care about, and what the world needs.`,
    feels: `Clarity after fog. Not a lightning bolt — more like a clearing. The sense that you're choosing a direction rather than being pushed by circumstances. Energy comes back. Monday mornings start to make sense again.`,
    practice: `You can describe what you want to build or contribute without referencing your old role. Your decisions start filtering through "does this serve my purpose?" instead of "does this pay the bills?" (The bills still matter. But they're not the only compass anymore.)`,
  },
  {
    number: "04",
    name: "Become AI Ready",
    tagline: "Understand AI's power to amplify your ideas.",
    color: "citrus",
    meaning: `When you stop treating AI like something you have to compete with, and put yourself at the center — your identity, your values, your purpose, your ideas, and the people you want to impact — you learn how exciting and empowering it can truly be.\n\nIf you only use AI as an efficiency tool, you will never see what you can actually do. Learn to explore AI without expectations, to understand what is possible — and it will blow your mind. Playing and experimenting is how you break past that ceiling and uncover possibilities you didn't know existed. Then you apply what you learn to create anything you can imagine.`,
    feels: `Play. Genuine, joyful, "I can't believe this is possible" play. The fear evaporates — not because AI isn't disruptive, but because you've already done the hard work of finding the part of you it can't disrupt. Now you're exploring what happens when that part gets amplified.`,
    practice: `You're experimenting without a deliverable in mind. Making things. Breaking things. Laughing at the failures and stunned by the successes. You stop consuming AI content and start creating with it. The tools become instruments in your hands, not threats to your existence.`,
  },
  {
    number: "05",
    name: "Relaunch Yourself",
    tagline: "Turn who you are into work, opportunity, and income.",
    color: "poppy",
    meaning: `You know who you are beyond your job title. You know what you bring, what matters to you, and how AI can expand what you're capable of. Now it's time to turn all of that into something the world can see, understand, value, and pay for.\n\nRelaunching means creating visible evidence of what you can do now, and using it to generate real opportunities. That might mean landing a better role, launching a business, creating an offer, building a new source of income, or combining several kinds of work into a career that no longer depends on one employer.\n\nYou are not starting over. You are bringing your experience, judgment, relationships, purpose, and new AI capabilities together to become more valuable, more visible, and more economically powerful than you were before.`,
    feels: `You can finally see a path forward. You have something real underway, people are responding to it, and money is beginning to move again.\n\nYou no longer feel obsolete, diminished, or difficult to explain. You can answer "What do you do?" without apologizing for being laid off or retreating into an old title. You know what you bring, who needs it, and why they should hire you, work with you, invest in you, or pay for what you create.\n\nThe layoff stops feeling like the moment your value disappeared. It becomes the moment you stopped allowing one company to control your livelihood.`,
    practice: `You can clearly explain who you are, what you do, and the value you create. You turn your ideas into projects, offers, businesses, prototypes, and visible work that demonstrate what you're capable of.\n\nYou begin generating interviews, clients, collaborations, referrals, revenue, and new streams of income. Instead of depending entirely on one employer to choose you, you build multiple ways for opportunity and money to reach you.\n\nYour work, reputation, relationships, and income begin to reflect the person you now know yourself to be. You are no longer waiting to get your old life back. You are building a more valuable, expansive, and self-directed one.`,
  },
];

const colorMap: Record<string, { bg: string; text: string; body: string; border: string; icon: string }> = {
  indigo: { bg: "bg-soft-white", text: "text-indigo", body: "text-aubergine/70", border: "border-indigo/20", icon: "text-indigo" },
  aqua: { bg: "bg-aubergine", text: "text-aqua", body: "text-soft-white/70", border: "border-aqua/20", icon: "text-aqua" },
  orchid: { bg: "bg-soft-white", text: "text-orchid", body: "text-aubergine/70", border: "border-orchid/20", icon: "text-orchid" },
  citrus: { bg: "bg-aubergine", text: "text-citrus", body: "text-soft-white/70", border: "border-citrus/20", icon: "text-citrus" },
  poppy: { bg: "bg-soft-white", text: "text-poppy", body: "text-aubergine/70", border: "border-poppy/20", icon: "text-poppy" },
};

const Phases = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = decodeURIComponent(location.hash.slice(1));
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-soft-white text-aubergine">
      <Navigation />
      <main id="main-content">

      {/* Page hero */}
      <section className="bg-aubergine constellation-bg pt-32 pb-20 px-6 text-center">
        <ScrollFadeUp>
          <h1 className="font-display text-soft-white text-4xl md:text-5xl leading-tight mb-4">
            The Five Stages of The Great Repurpose
          </h1>
          <p className="font-sans text-soft-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            These aren't steps. They're dimensions. You don't move through them in order — you live in all of them at once, in different proportions. Finding your Great Repurpose Profile shows you your shape. This page shows you the terrain.
          </p>
        </ScrollFadeUp>
      </section>

      {/* Stage sections */}
      {stages.map((stage, i) => {
        const colors = colorMap[stage.color];
        const { Icon } = stageIcons[i];
        return (
          <section
            key={stage.number}
            id={getStageAnchor(stage.name)}
            className={`${colors.bg} scroll-mt-24 py-20 px-6 md:scroll-mt-28`}
          >
            <div className="max-w-4xl mx-auto">
              <ScrollFadeUp>
                <div className="flex items-center gap-4 mb-6">
                  <span className={`shrink-0 ${colors.icon}`}>
                    <Icon className="w-8 h-8" />
                  </span>
                  <span className={`font-sans text-xs uppercase tracking-widest font-medium ${colors.text}`}>
                    {stage.number}
                  </span>
                  <div className={`h-px flex-1 border-t ${colors.border} opacity-30`} />
                </div>
                <h2 className={`font-display ${colors.text === "text-soft-white" ? "text-soft-white" : "text-aubergine"} text-3xl md:text-4xl mb-2`}>
                  {stage.name}
                </h2>
                <p className={`font-display ${colors.text} text-xl italic mb-10`}>
                  "{stage.tagline}"
                </p>
              </ScrollFadeUp>

              <div className={`space-y-8 font-sans ${colors.body} text-lg leading-relaxed`}>
                <ScrollFadeUp delay={100}>
                  <div>
                    <p className={`font-sans text-xs uppercase tracking-widest font-medium ${colors.text} mb-3`}>What it means</p>
                    <div className="space-y-4">
                      {stage.meaning.split('\n\n').map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  </div>
                </ScrollFadeUp>
                <ScrollFadeUp delay={180}>
                  <div>
                    <p className={`font-sans text-xs uppercase tracking-widest font-medium ${colors.text} mb-3`}>What it feels like</p>
                    <div className="space-y-4">
                      {stage.feels.split('\n\n').map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  </div>
                </ScrollFadeUp>
                <ScrollFadeUp delay={260}>
                  <div>
                    <p className={`font-sans text-xs uppercase tracking-widest font-medium ${colors.text} mb-3`}>What it looks like in practice</p>
                    <div className="space-y-4">
                      {stage.practice.split('\n\n').map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  </div>
                </ScrollFadeUp>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-aubergine constellation-bg py-20 px-6 text-center">
        <ScrollFadeUp>
          <h2 className="font-display text-soft-white text-2xl md:text-3xl mb-3">
            Where are you across these five stages?
          </h2>
          <p className="font-sans text-soft-white/60 text-lg mb-10">
            Discover where you are — and what you're building toward.
          </p>
          <Link
            to="/selfcheck"
            className="inline-block bg-indigo text-white font-sans font-medium text-base px-8 py-4 rounded-full pulse-indigo hover:opacity-90 transition-opacity"
          >
            Get Your Repurpose Profile →
          </Link>
        </ScrollFadeUp>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default Phases;
