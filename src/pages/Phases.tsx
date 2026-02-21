import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

const stages = [
  {
    number: "01",
    name: "Unhook Identity",
    tagline: "I'm not my job.",
    bg: "bg-cream",
    textPrimary: "text-navy",
    textBody: "text-navy/70",
    accent: "text-coral",
    border: "border-cream/40",
    meaning: `Your identity got fused to your work. The title, the craft, the expertise, the daily rhythm of doing the thing you were good at. When AI disrupts that — whether by taking the job, absorbing the tasks, or shifting the ground — the first instinct is to hold tighter. To defend the territory. To refuse the tools. To insist that the old way was better.\n\nUnhooking isn't giving up. It isn't abandoning your career or your craft. It's recognizing that you are more than the tasks you perform. That your worth existed before the job title and will exist after it changes. This is the hardest stage because it asks you to let go of something that felt like bedrock.`,
    feels: `Grief. Anger. Disorientation. The feeling that if you're not a designer / teacher / consultant / writer, you don't know who you are. The temptation to define yourself by what you've lost rather than what remains.`,
    practice: `You can talk about what's happening without it triggering a crisis. You can separate "my clients are using AI" from "I have no value." You can hold the grief and the curiosity at the same time.`,
  },
  {
    number: "02",
    name: "Reclaim Value",
    tagline: "But I AM this.",
    bg: "bg-navy",
    textPrimary: "text-cream",
    textBody: "text-cream/70",
    accent: "text-coral",
    border: "border-coral",
    meaning: `Underneath the job title, the task list, and the deliverables, there's something AI can't touch. Your taste — the reason you make the choices you make. Your judgment — the pattern recognition that comes from decades of experience. Your perspective — the lens only you have. Your relationships — the trust you've built person to person.\n\nReclaiming value is the work of finding that layer. It's answering the question: "If AI can do the tasks, what do I bring that the tasks don't capture?" For most people, the answer is bigger than they expect. They just never had to articulate it before because the tasks did the talking.`,
    feels: `A shift from loss to discovery. Not "everything's fine" — more like "oh, there's something here I didn't see." The moment you realize your 20 years of experience aren't obsolete — they're the context that makes AI output extraordinary instead of generic.`,
    practice: `You can name your value in a sentence that doesn't reference a job title or a task. You can explain what you bring to the table that no tool replicates. You start to see your experience as an asset, not a liability.`,
  },
  {
    number: "03",
    name: "Find Your Purpose",
    tagline: "This is what matters to me.",
    bg: "bg-cream",
    textPrimary: "text-navy",
    textBody: "text-navy/70",
    accent: "text-mint",
    border: "border-mint",
    meaning: `Value without direction is just potential. This stage is about choosing: now that you know what you bring, where do you want to bring it? What problem pulls you forward? What change do you want to make? What would you work on even if no one paid you — not as a fantasy, but as a real compass?\n\nPurpose doesn't arrive through introspection alone. It arrives through engagement — trying things, talking to people, showing up in communities where the conversation is bigger than "how do I use this tool." It's found in the overlap between what you're good at, what you care about, and what the world needs.`,
    feels: `Clarity after fog. Not a lightning bolt — more like a clearing. The sense that you're choosing a direction rather than being pushed by circumstances. Energy comes back. Monday mornings start to make sense again.`,
    practice: `You can describe what you want to build or contribute without referencing your old role. Your decisions start filtering through "does this serve my purpose?" instead of "does this pay the bills?" (The bills still matter. But they're not the only compass anymore.)`,
  },
  {
    number: "04",
    name: "Discover AI's Power",
    tagline: "Wait — I can do THAT now?",
    bg: "bg-navy",
    textPrimary: "text-cream",
    textBody: "text-cream/70",
    accent: "text-periwinkle",
    border: "border-periwinkle",
    meaning: `This is where most "learn AI" programs start — and it's why they fail. They teach tools before purpose. They teach prompts before identity. The Great Repurpose puts this stage fourth deliberately: you need to know who you are, what you value, and where you're headed before the tools become instruments instead of threats.\n\nWhen you arrive here with your identity unhooked, your value reclaimed, and your purpose clear, AI stops being scary and starts being extraordinary. You discover that the tools everyone told you to fear can amplify what only you can bring. Not replace it. Amplify it.`,
    feels: `Play. Genuine, joyful, "I can't believe this is possible" play. The fear evaporates — not because AI isn't disruptive, but because you've already done the hard work of finding the part of you it can't disrupt. Now you're just exploring what happens when that part gets amplified.`,
    practice: `You're experimenting. Making things. Breaking things. Laughing at the failures and stunned by the successes. You stop consuming AI content and start creating with it. The tools become instruments in your hands, not threats to your existence.`,
  },
  {
    number: "05",
    name: "Start Creating",
    tagline: "Amplify your impact with AI.",
    bg: "bg-cream",
    textPrimary: "text-navy",
    textBody: "text-navy/70",
    accent: "text-amber-brand",
    border: "border-amber-brand",
    meaning: `Knowledge without action is just anxiety. You've unhooked your identity, found your value, chosen your purpose, and discovered AI's power. Now you create. You ship. You share. You teach what you've learned. You build something that didn't exist before — not as a replacement for what you lost, but as something genuinely new.\n\nThis is where The Great Repurpose becomes The Great Repurpose — not a crisis survived, but a transformation completed. The work you create in this stage is more you, not less. It carries your taste, your judgment, your perspective, amplified by tools that multiply what a single human can do.`,
    feels: `Momentum. The feeling of making things again — not because someone's paying you to, but because you have something to say and now you have the means to say it at a scale you never could before. It's not the end of the journey. It's where the practice begins.`,
    practice: `You're producing work. Sharing it. Teaching others. Leading out loud. The Cycle of AI Readiness — Play First, Create Excellence, Generously Lead — becomes your daily rhythm. You're not just adapting to AI. You're creating with it. And what you're creating is unmistakably yours.`,
  },
];

const Phases = () => {
  return (
    <div className="min-h-screen bg-navy text-cream">
      <Navigation />
      <main id="main-content">

      {/* Page hero */}
      <section className="bg-navy constellation-bg pt-32 pb-20 px-6 text-center">
        <ScrollFadeUp>
          <h1 className="font-serif text-cream text-4xl md:text-5xl leading-tight mb-4">
            The Five Stages of The Great Repurpose
          </h1>
          <p className="font-sans text-cream/70 text-lg md:text-xl max-w-2xl mx-auto">
            These aren't steps. They're dimensions. You don't move through them in order — you live in all of them at once, in different proportions. The Self-Check shows you your shape. This page shows you the terrain.
          </p>
        </ScrollFadeUp>
      </section>

      {/* Stage sections */}
      {stages.map((stage) => (
        <section key={stage.number} className={`${stage.bg} py-20 px-6`}>
          <div className="max-w-4xl mx-auto">
            <ScrollFadeUp>
              <div className="flex items-center gap-4 mb-6">
                <span className={`font-sans text-xs uppercase tracking-widest font-medium ${stage.accent}`}>
                  Stage {stage.number}
                </span>
                <div className={`h-px flex-1 border-t ${stage.border} opacity-30`} />
              </div>
              <h2 className={`font-serif ${stage.textPrimary} text-3xl md:text-4xl mb-2`}>
                {stage.name}
              </h2>
              <p className={`font-serif ${stage.accent} text-xl italic mb-10`}>
                "{stage.tagline}"
              </p>
            </ScrollFadeUp>

            <div className={`space-y-8 font-sans ${stage.textBody} text-lg leading-relaxed`}>
              <ScrollFadeUp delay={100}>
                <div>
                  <p className={`font-sans text-xs uppercase tracking-widest font-medium ${stage.accent} mb-3`}>What it means</p>
                  <div className="space-y-4">
                    {stage.meaning.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={180}>
                <div>
                  <p className={`font-sans text-xs uppercase tracking-widest font-medium ${stage.accent} mb-3`}>What it feels like</p>
                  <p>{stage.feels}</p>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={260}>
                <div>
                  <p className={`font-sans text-xs uppercase tracking-widest font-medium ${stage.accent} mb-3`}>What it looks like in practice</p>
                  <p>{stage.practice}</p>
                </div>
              </ScrollFadeUp>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-navy constellation-bg py-20 px-6 text-center">
        <ScrollFadeUp>
          <h2 className="font-serif text-cream text-2xl md:text-3xl mb-3">
            Where are you across these five stages?
          </h2>
          <p className="font-sans text-cream/60 text-lg mb-10">
            Take the Self-Check. 7 questions. A mirror, not a grade.
          </p>
          <Link
            to="/selfcheck"
            className="inline-block bg-coral text-cream font-sans font-medium text-base px-8 py-4 rounded-full pulse-coral hover:opacity-90 transition-opacity"
          >
            Take the Free Self-Check →
          </Link>
        </ScrollFadeUp>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default Phases;
