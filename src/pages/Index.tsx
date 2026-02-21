import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

const phases = [
  {
    number: "01",
    name: "Disorientation",
    tagline: "The map stopped working.",
    description:
      "The moment when the old story about who you are and what you do stops making sense. Confusion, anxiety, and the feeling that the ground has shifted beneath you.",
    borderColor: "border-cream/40",
    textColor: "text-cream/70",
  },
  {
    number: "02",
    name: "Reckoning",
    tagline: "Facing what's actually true.",
    description:
      "Moving from confusion to clarity — even uncomfortable clarity. This phase is about being honest about what AI has changed, what it hasn't, and what that means for you specifically.",
    borderColor: "border-coral",
    textColor: "text-coral",
  },
  {
    number: "03",
    name: "Excavation",
    tagline: "Finding what AI can't replace.",
    description:
      "Digging beneath the tasks and titles to what is genuinely and durably yours — the things you bring that aren't replicable by a model. This phase is uncomfortable, but generative.",
    borderColor: "border-mint",
    textColor: "text-mint",
  },
  {
    number: "04",
    name: "Reorientation",
    tagline: "Building a new direction.",
    description:
      "Using what you found in Excavation to imagine a path forward — not back to what was, but toward something that fits who you actually are. This phase requires experimentation.",
    borderColor: "border-periwinkle",
    textColor: "text-periwinkle",
  },
  {
    number: "05",
    name: "Authorship",
    tagline: "Making your contribution, in public.",
    description:
      "From internal clarity to external expression. Creating, sharing, leading, building — on your own terms, in your own voice, with AI as a tool rather than a threat.",
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
        {/* Hero image with title baked in */}
        <div className="w-full pt-16">
          <img
            src="/images/hero.png"
            alt="The Great Repurpose — Finding Meaning in the Face of Unprecedented Change"
            className="w-full h-auto block"
          />
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
              There's a name for what you're feeling.
            </h2>
          </ScrollFadeUp>

          <div className="font-sans text-navy text-lg leading-relaxed space-y-6">
            <ScrollFadeUp delay={100}>
              <p>
                Three things are happening at once, and almost no one is talking about all three together.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={150}>
              <p>
                The first is visible: AI is eliminating jobs. Whole categories of work are being automated — writing, coding, design, analysis, legal research — and the pace is accelerating. That part is in the headlines.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={200}>
              <p>
                The second is invisible: AI is eroding tasks. You still have your job, but the things you were{" "}
                <em>good at</em> — the things that made you feel competent, valued, even proud — are increasingly being done by a tool. You didn't lose your job. You lost the part of your job that gave it meaning.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={250}>
              <p>
                The third is existential: the world itself is shifting. The skills, credentials, and reputations you built over years are being devalued faster than they can be replaced. The story you told about what you do — and who you are because of it — no longer lands the way it used to.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={300}>
              <p>
                Most responses to this moment offer the same prescription: learn more, skill up, stay relevant. That advice isn't wrong. But it's incomplete. Because underneath the skills crisis is something deeper.
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
            <p className="text-center text-cream/80 font-serif text-xl md:text-2xl italic mb-16">
              "AI isn't one disruption. It's three — and each one hits differently."
            </p>
          </ScrollFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Job Loss",
                body: "The most visible face. Roles eliminated, categories automated, entire industries reshaped. If this is you, the urgency is immediate — but the path forward isn't obvious when the skills you built are the ones being replaced.",
              },
              {
                num: "02",
                title: "Task Erosion",
                body: "The quietest face. Your job still exists. But AI now does the parts you were best at — the parts that made you feel capable, valued, recognized. You haven't lost your income. You've lost your sense of contribution.",
              },
              {
                num: "03",
                title: "The World Shifting",
                body: "The deepest face. Even if your job is secure and your skills still count, the story you told about who you are and what you're worth no longer lands the way it used to. The reference points have moved.",
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
            <p className="text-center text-cream/60 font-serif italic text-base mt-12 max-w-2xl mx-auto">
              "All three faces share the same root: the relationship between people and the work that gives them meaning is being disrupted. That's what The Great Repurpose names."
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 4: The Five Phases ── */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollFadeUp>
            <h2 className="font-serif text-navy text-3xl md:text-4xl text-center mb-4">
              Disruption isn't a cliff. It's a terrain — and you are somewhere on it.
            </h2>
            <p className="font-sans text-navy/70 text-center text-lg mb-16 max-w-2xl mx-auto">
              The Great Repurpose maps five phases of the journey from loss to authorship. Most people are living in more than one at once.
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
                        {phase.name} <span className={`text-base font-sans italic font-normal ${phase.textColor}`}>— {phase.tagline}</span>
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
              <Link
                to="/selfcheck"
                className="inline-block bg-coral text-cream font-sans font-medium text-base px-8 py-4 rounded-full pulse-coral hover:opacity-90 transition-opacity"
              >
                Where are you across these five phases? Take the Self-Check →
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
              "The internet is full of people offering to teach you AI skills.
              <br />
              That's not what this is."
            </h2>
          </ScrollFadeUp>

          <div className="font-sans text-cream/80 text-lg leading-relaxed space-y-6">
            <ScrollFadeUp delay={100}>
              <p>
                AI bootcamps, prompt engineering courses, productivity workflows — these things have their place. But they don't address the deeper question:{" "}
                <em>who am I, and what do I contribute, in a world where my best work can be approximated by a model?</em>
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={150}>
              <p>
                That's not a skills question. It's an identity question. A value question. A purpose question. And those questions don't get answered in a four-week cohort.
              </p>
            </ScrollFadeUp>
            <ScrollFadeUp delay={200}>
              <p>
                They get answered in community — over time, in conversation, through the slow and non-linear work of figuring out what is genuinely yours.
              </p>
            </ScrollFadeUp>
          </div>

          <ScrollFadeUp delay={250}>
            <blockquote className="border-l-4 border-coral pl-8 mt-12 mb-8">
              <p className="font-serif text-coral text-2xl md:text-3xl italic leading-snug">
                "Skills are what you do.<br />
                Signal is who you are.<br />
                The Great Repurpose helps you find yours."
              </p>
            </blockquote>
          </ScrollFadeUp>

          <ScrollFadeUp delay={300}>
            <p className="text-cream/70 font-sans text-lg">
              That community exists. It's called the{" "}
              <a
                href="https://thesalon.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:underline"
              >
                AI Salon
              </a>
              .
            </p>
          </ScrollFadeUp>
        </div>
      </section>

      {/* ── Section 6: Self-Check Promo ── */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollFadeUp>
            <h2 className="font-serif text-navy text-3xl md:text-4xl mb-4">
              7 questions. No grades. No judgment. Just a mirror.
            </h2>
            <p className="font-sans text-navy/70 text-lg mb-14 max-w-xl mx-auto">
              The Self-Check maps where you are across five dimensions: Identity, Value, Purpose, AI Relationship, and Creative Action. It takes about two minutes. The results are yours.
            </p>
          </ScrollFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {[
              {
                step: "Step 1",
                label: "Answer",
                desc: "Seven questions, each presented as a tension between two true things. No right answers.",
              },
              {
                step: "Step 2",
                label: "See your shape",
                desc: "A radar chart showing your profile across all five dimensions. Instantly.",
              },
              {
                step: "Step 3",
                label: "Get your next step",
                desc: "Personalized routing to the exact AI Salon resources that match where you are right now.",
              },
            ].map(({ step, label, desc }, i) => (
              <ScrollFadeUp key={step} delay={i * 100}>
                <div className="text-left">
                  <p className="text-coral font-sans text-xs uppercase tracking-widest font-medium mb-2">{step}</p>
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
