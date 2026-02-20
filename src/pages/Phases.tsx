import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

const phases = [
  {
    number: "01",
    name: "Disorientation",
    tagline: "The map stopped working.",
    bg: "bg-cream",
    textPrimary: "text-navy",
    textBody: "text-navy/70",
    accent: "text-coral",
    border: "border-cream/40",
    meaning: `Disorientation is the entry point into The Great Repurpose — the moment when the story you told about your work, your value, and your identity stops making sense. It can arrive suddenly (a layoff, a demo that changes everything) or gradually (a slow accumulation of tasks delegated to AI, a growing sense of irrelevance). Either way, the feeling is the same: the ground has shifted, and the old map is no longer useful.`,
    feels: `Disorientation often presents as anxiety, restlessness, or a strange numbness. You may find yourself avoiding the question of what's next, or compulsively seeking answers — new tools, new courses, new frameworks — without feeling settled by any of them.`,
    practice: `Refreshing LinkedIn compulsively without knowing what you're looking for. Starting courses you don't finish. Feeling vaguely afraid in meetings when AI tools come up. Describing yourself differently every time someone asks what you do.`,
  },
  {
    number: "02",
    name: "Reckoning",
    tagline: "Facing what's actually true.",
    bg: "bg-navy",
    textPrimary: "text-cream",
    textBody: "text-cream/70",
    accent: "text-coral",
    border: "border-coral",
    meaning: `Reckoning is the move from confusion to clarity — even uncomfortable clarity. It's the phase where you stop outsourcing the question to market trends and start getting honest: What has AI actually changed about what I do? What hasn't it changed? What does that mean for the story I've been telling about my value?`,
    feels: `Reckoning can feel like grief — for a version of work that no longer exists, for a self-image that no longer holds. It can also feel like relief: finally naming what's happening is its own kind of solid ground.`,
    practice: `Honestly auditing your work and identifying which tasks are already being done better by AI. Sitting with the discomfort of that without immediately pivoting to "what to do about it." Telling someone else the truth about where you are.`,
  },
  {
    number: "03",
    name: "Excavation",
    tagline: "Finding what AI can't replace.",
    bg: "bg-cream",
    textPrimary: "text-navy",
    textBody: "text-navy/70",
    accent: "text-mint",
    border: "border-mint",
    meaning: `Excavation is the generative phase — the work of digging beneath the tasks, titles, and credentials to what is genuinely and durably yours. Not your productivity. Not your outputs. Your judgment, your relationships, your specific way of seeing and making sense of the world. The things that aren't replicable by a model — not because AI will never get there, but because they are rooted in your particular human experience.`,
    feels: `Excavation is slow. It resists being rushed. It often requires other people — someone who can see you clearly enough to point at what you take for granted.`,
    practice: `Noticing what people come to you for that has nothing to do with your job title. Paying attention to the moments when your presence — not your output — is what matters. Asking people you trust: "What do you think I uniquely bring?"`,
  },
  {
    number: "04",
    name: "Reorientation",
    tagline: "Building a new direction.",
    bg: "bg-navy",
    textPrimary: "text-cream",
    textBody: "text-cream/70",
    accent: "text-periwinkle",
    border: "border-periwinkle",
    meaning: `Reorientation is where what you found in Excavation starts to take shape as a direction forward. Not a grand plan — more like a hypothesis you're willing to test. This phase is experimental by nature. You are not optimizing an existing path; you are finding a new one.`,
    feels: `Reorientation can feel like excitement mixed with uncertainty — the particular combination of possibility and not-knowing that comes with genuine exploration. It can also feel frustrating when experimentation doesn't produce immediate results.`,
    practice: `Taking a project that isn't in your job description because it's closer to your signal. Making a small public bet on a new direction — a post, a conversation, a prototype. Letting go of a credential or title that no longer describes what you're actually doing.`,
  },
  {
    number: "05",
    name: "Authorship",
    tagline: "Making your contribution, in public.",
    bg: "bg-cream",
    textPrimary: "text-navy",
    textBody: "text-navy/70",
    accent: "text-amber-brand",
    border: "border-amber-brand",
    meaning: `Authorship is the phase where internal clarity becomes external expression. You are making things, sharing things, leading things — on your own terms, in your own voice, with AI as a tool in service of your signal rather than a threat to your identity. This phase isn't a destination; it's a practice.`,
    feels: `Authorship feels like agency. Like showing up to work (in whatever form that takes) with a sense of purpose that isn't contingent on whether AI can do what you do. Like your contribution is legible — to yourself and to others.`,
    practice: `Creating and publishing regularly, even imperfectly. Using AI tools without losing the thread of your own voice. Being someone others come to not because of your title, but because of your perspective. Mentoring others who are earlier in the journey.`,
  },
];

const Phases = () => {
  return (
    <div className="min-h-screen bg-navy text-cream">
      <Navigation />

      {/* Page hero */}
      <section className="bg-navy constellation-bg pt-32 pb-20 px-6 text-center">
        <ScrollFadeUp>
          <h1 className="font-serif text-cream text-4xl md:text-5xl leading-tight mb-4">
            You are not behind. You are somewhere.
          </h1>
          <p className="font-sans text-cream/70 text-lg md:text-xl max-w-2xl mx-auto">
            The Five Phases map the terrain from disruption to authorship.
          </p>
        </ScrollFadeUp>
      </section>

      {/* Phase sections */}
      {phases.map((phase, i) => (
        <section key={phase.number} className={`${phase.bg} py-20 px-6`}>
          <div className="max-w-3xl mx-auto">
            <ScrollFadeUp>
              <div className="flex items-center gap-4 mb-6">
                <span className={`font-sans text-xs uppercase tracking-widest font-medium ${phase.accent}`}>
                  Phase {phase.number}
                </span>
                <div className={`h-px flex-1 border-t ${phase.border} opacity-30`} />
              </div>
              <h2 className={`font-serif ${phase.textPrimary} text-3xl md:text-4xl mb-2`}>
                {phase.name}
              </h2>
              <p className={`font-serif ${phase.accent} text-xl italic mb-10`}>
                "{phase.tagline}"
              </p>
            </ScrollFadeUp>

            <div className={`space-y-8 font-sans ${phase.textBody} text-lg leading-relaxed`}>
              <ScrollFadeUp delay={100}>
                <div>
                  <p className={`font-sans text-xs uppercase tracking-widest font-medium ${phase.accent} mb-3`}>What it means</p>
                  <p>{phase.meaning}</p>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={180}>
                <div>
                  <p className={`font-sans text-xs uppercase tracking-widest font-medium ${phase.accent} mb-3`}>What it feels like</p>
                  <p>{phase.feels}</p>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={260}>
                <div>
                  <p className={`font-sans text-xs uppercase tracking-widest font-medium ${phase.accent} mb-3`}>What it looks like in practice</p>
                  <p>{phase.practice}</p>
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
            Where are you across these five phases?
          </h2>
          <p className="font-sans text-cream/60 text-lg mb-10">
            Most people are living in more than one at once. The Self-Check will show you your shape.
          </p>
          <Link
            to="/selfcheck"
            className="inline-block bg-coral text-cream font-sans font-medium text-base px-8 py-4 rounded-full pulse-coral hover:opacity-90 transition-opacity"
          >
            Take the Self-Check →
          </Link>
        </ScrollFadeUp>
      </section>

      <Footer />
    </div>
  );
};

export default Phases;
