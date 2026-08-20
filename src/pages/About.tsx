import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Seo } from "@/components/Seo";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

import elaHeroAsset from "@/assets/ela-hero.png.asset.json";
import taHeroAsset from "@/assets/ta-hero.png.asset.json";

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

const About = () => {
  return (
    <div className="min-h-screen bg-aubergine text-soft-white">
      <Seo
        title="About The Great Repurpose | Kyle Shannon"
        description="The Great Repurpose started as an uneasy feeling: as AI models got stronger, people weren't just going to lose their jobs. They were going to have to face something."
        path="/about"
      />
      <Navigation />
      <main id="main-content">

        {/* ── Hero ── */}
        <section className="bg-aubergine constellation-bg pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollFadeUp>
              <h1 className="font-display text-soft-white text-3xl md:text-5xl leading-tight">
                About The Great Repurpose
              </h1>
            </ScrollFadeUp>
          </div>
        </section>

        {/* ── It started as an uneasy feeling ── */}
        <section className="bg-soft-white py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollFadeUp>
              <p className="font-sans text-indigo text-xs uppercase tracking-[0.2em] font-semibold mb-4">
                The beginning
              </p>
              <h2 className="font-display text-aubergine text-3xl md:text-4xl leading-tight mb-8">
                It started as an uneasy feeling
              </h2>
            </ScrollFadeUp>
            <div className="font-body text-aubergine/80 text-lg leading-relaxed space-y-6">
              <ScrollFadeUp delay={100}>
                <p>
                  The Great Repurpose started as an uneasy feeling: as AI models got stronger, people weren't just going to lose their jobs. Even the people who kept those jobs would find their work completely different. They were going to have to face something.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={150}>
                <p>
                  In December of 2025, programmers began talking about a model they said was good enough to do their jobs. (Opus 4.5) About two months later on social media platforms, programmers were complaining that even the ones who still had their jobs weren't programming anymore — they were babysitting AI agents.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={200}>
                <p className="font-display text-aubergine text-xl md:text-2xl italic leading-snug">
                  That's when it hit: things are going to be completely different.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={250}>
                <p>
                  One night on Kyle Shannon's AI Learning Lab live, the idea of the Great Repurpose surfaced. We live in a country where our identities are tightly coupled to our jobs. If the jobs are going to change, people are going to face the challenge of finding what their value is in this new world.
                </p>
              </ScrollFadeUp>
            </div>
          </div>
        </section>

        {/* ── Two tracks, one problem ── */}
        <section className="bg-aubergine constellation-bg py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollFadeUp>
              <p className="font-sans text-aqua text-xs uppercase tracking-[0.2em] font-semibold mb-4">
                Two tracks, one problem
              </p>
              <h2 className="font-display text-soft-white text-3xl md:text-4xl leading-tight mb-8">
                The human piece and the technology piece
              </h2>
            </ScrollFadeUp>
            <div className="font-body text-soft-white/80 text-lg leading-relaxed space-y-6">
              <ScrollFadeUp delay={100}>
                <p>
                  Kyle brought the early stages to the AI Salon's director of Operations, Andee Scarantino.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={150}>
                <div className="grid gap-4 md:grid-cols-3 my-8">
                  <div className="border border-soft-white/15 rounded-lg p-6 bg-aubergine">
                    <p className="font-sans text-aqua text-xs uppercase tracking-widest font-semibold mb-2">01</p>
                    <p className="font-body text-soft-white/90 leading-relaxed">Decouple your identity from your work.</p>
                  </div>
                  <div className="border border-soft-white/15 rounded-lg p-6 bg-aubergine">
                    <p className="font-sans text-aqua text-xs uppercase tracking-widest font-semibold mb-2">02</p>
                    <p className="font-body text-soft-white/90 leading-relaxed">Reclaim value outside the tasks you do.</p>
                  </div>
                  <div className="border border-soft-white/15 rounded-lg p-6 bg-aubergine">
                    <p className="font-sans text-aqua text-xs uppercase tracking-widest font-semibold mb-2">03</p>
                    <p className="font-body text-soft-white/90 leading-relaxed">Connect with purpose, and use AI to amplify your creativity and genius.</p>
                  </div>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={200}>
                <p>
                  Her first response was: "How the 'BLEEP' are you going to do that? This is not exactly easy work."
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={250}>
                <p>
                  She would know. She had spent six years doing identity work — coaching people around a simple truth: "Who you believe you are is who shows up in the world."
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={300}>
                <p>
                  Your beliefs and inner programming dictate what you create out of life, and the life you live. So they decided to collaborate.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={350}>
                <p className="font-display text-soft-white text-xl md:text-2xl italic leading-snug">
                  There was a need for a shift, and the shift required a technological piece and a human piece — and they needed to work harmoniously together.
                </p>
              </ScrollFadeUp>
            </div>
          </div>
        </section>

        {/* ── Then, there was the experiment ── */}
        <section className="bg-soft-white py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollFadeUp>
              <p className="font-sans text-indigo text-xs uppercase tracking-[0.2em] font-semibold mb-4">
                Then, there was the experiment
              </p>
              <h2 className="font-display text-aubergine text-3xl md:text-4xl leading-tight mb-8">
                Tested inside the AI Salon
              </h2>
            </ScrollFadeUp>
            <div className="font-body text-aubergine/80 text-lg leading-relaxed space-y-6">
              <ScrollFadeUp delay={100}>
                <p>
                  The Great Repurpose was beta-tested inside the AI Salon, the human-centered AI community Kyle founded the week ChatGPT launched.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={150}>
                <p>
                  Members went through the earliest Great Repurpose workshops around decoupling identity inside a culture already built on the Cycle of AI Readiness — play first, create excellence, generously lead.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={200}>
                <p>
                  Then one member showed them how important this really was.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={250}>
                <div className="border-l-2 border-indigo/60 pl-5 my-8">
                  <p className="font-display text-aubergine text-lg md:text-xl italic leading-snug">
                    She had been laid off from a massive technology company after a long career in marketing and advertising. She was completely lost — her words were "embarrassed, hopeless, disconnected." Through the identity work, she realized the significant value and experience she had — and that it had nothing to do with the tasks she did.
                  </p>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={300}>
                <p>
                  She told Andee she wished she'd had something like the Great Repurpose as part of her severance package. Everything she had been offered (e.g. resume writing services) was utterly useless in helping her recreate herself in a changing world.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={350}>
                <p className="font-display text-aubergine text-xl md:text-2xl italic leading-snug">
                  That was when they realized The Great Repurpose needed to be more than an experiment, and would be crucial to the shift we'll collectively experience over the next decade.
                </p>
              </ScrollFadeUp>
            </div>
          </div>
        </section>

        {/* ── Why Kyle ── */}
        <section className="bg-aubergine constellation-bg py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollFadeUp>
              <p className="font-sans text-aqua text-xs uppercase tracking-[0.2em] font-semibold mb-4">
                Why Kyle
              </p>
              <h2 className="font-display text-soft-white text-3xl md:text-4xl leading-tight mb-8">
                He's been through this kind<br />
                of disruption before
              </h2>
            </ScrollFadeUp>
            <div className="font-body text-soft-white/80 text-lg leading-relaxed space-y-6">
              <ScrollFadeUp delay={100}>
                <p>
                  In the mid-1990s, he co-founded Agency.com, one of the first digital agencies in the world. At the time, the internet was still something most companies were trying to understand. Over the next several years, Agency.com grew into a global company, went public on NASDAQ, and helped brands like Nike, Coca-Cola, and British Airways figure out what the web actually meant for their businesses.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={150}>
                <p>
                  What Kyle learned was that the companies that thrived weren't simply the ones that adopted the newest tools fastest. They were the ones that understood what the technology made newly possible — and were willing to rethink how they worked because of it.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={200}>
                <p>
                  He has spent the thirty years since working at that intersection of technology, creativity, and human behavior. He founded Storyvine around a new way of helping ordinary people create professional video without becoming filmmakers. He has built companies, products, communities, and creative projects around the same basic question: what can people suddenly do that they couldn't do before?
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={250}>
                <p>
                  That question became much more urgent with generative AI.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={300}>
                <p>
                  Kyle founded the AI Salon in 2022 as a place for people to learn the tools together. But after watching thousands of people experiment with AI, a pattern emerged. The people producing the most interesting work weren't necessarily the most technically sophisticated.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={350}>
                <div className="grid gap-4 md:grid-cols-3 my-8">
                  <div className="border border-soft-white/15 rounded-lg p-5 bg-aubergine">
                    <p className="font-body text-soft-white/90 leading-relaxed">They knew who they were.</p>
                  </div>
                  <div className="border border-soft-white/15 rounded-lg p-5 bg-aubergine">
                    <p className="font-body text-soft-white/90 leading-relaxed">They had ideas they cared about, a point of view, values, taste, and a clear sense of the people they wanted to help.</p>
                  </div>
                  <div className="border border-soft-white/15 rounded-lg p-5 bg-aubergine">
                    <p className="font-body text-soft-white/90 leading-relaxed">AI didn't replace any of that. It amplified it.</p>
                  </div>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={400}>
                <p>
                  That observation became the Cycle of AI Readiness and eventually a core idea behind The Great Repurpose: the goal isn't to become more like AI. It's to become clearer about what is distinctly yours and then learn how to amplify it.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={450}>
                <p>
                  Kyle practices this himself. Through the AI Learning Lab, he continuously experiments with new models, agents, local AI, creative tools, and emerging ways of working. He co-authored <em>Collective Intelligence in the Age of AI</em>. And in developing <em>Sydney</em>, an original musical, he has used AI across writing, music, visual development, research, and production... not to automate away the creative process, but to make a complex creative ambition possible at a scale an individual could never have attempted before.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={500}>
                <p>
                  That distinction matters.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={550}>
                <p>
                  Most AI training begins with the software: learn the tools, automate the tasks, increase productivity. Kyle's work begins one level higher: What are you trying to amplify?
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={600}>
                <p>
                  Because if AI makes execution dramatically cheaper, then ideas, judgment, creativity, purpose, taste, and agency become more valuable, not less.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={650}>
                <p className="font-display text-soft-white text-xl md:text-2xl italic leading-snug">
                  The Great Repurpose is built around preparing people for that shift — and Kyle has spent his career studying, building through, and teaching exactly this kind of technological transition.
                </p>
              </ScrollFadeUp>
            </div>
          </div>
        </section>

        {/* ── Why Andee ── */}
        <section className="bg-soft-white py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollFadeUp>
              <p className="font-sans text-indigo text-xs uppercase tracking-[0.2em] font-semibold mb-4">
                Why Andee
              </p>
              <h2 className="font-display text-aubergine text-3xl md:text-4xl leading-tight mb-8">
                Identity work at the<br />
                level of being
              </h2>
            </ScrollFadeUp>
            <div className="font-body text-aubergine/80 text-lg leading-relaxed space-y-6">
              <ScrollFadeUp delay={100}>
                <p>
                  Before she pivoted into coaching, Andee spent almost twelve years with a global restaurant chain as a corporate trainer. In 2010, the concept was acquired by a much larger corporation with a stripping-down mentality, eliminating employee benefits and dismantling the people-first culture that had made the place thrive.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={150}>
                <p>
                  Andee experienced firsthand what happens when people stop feeling valued. Employees who once volunteered to come in on their day off became so miserable that they'd throw plates in the garbage rather than walk them back to the dish pit. There was also stealing and rampant substance abuse.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={200}>
                <div className="border-l-2 border-indigo/60 pl-5 my-8">
                  <p className="font-display text-aubergine text-lg md:text-xl italic leading-snug">
                    As Viktor Frankl observed, "When a person can't find a deep sense of meaning, they distract themselves with pleasure."
                  </p>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp delay={250}>
                <p>
                  When people don't feel cared for, they check out. They stop working for you, and that's the part most AI strategies miss. People need to connect to a sense of meaning and purpose, and it's often very dire when they don't.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={300}>
                <p>
                  Andee belongs to a cohort of transformational coaches who have moved away from teaching skills entirely, working instead at the level of being, identity, and consciousness. Coaching used to be about telling people what to do. This work is about who you are.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={350}>
                <p>
                  Andee's identity work is an extension of her radical personal transformation, both physically and professionally. She went from being an 18-year cigarette smoker and barstool ornament to a seven-time marathon finisher, and has run almost 14,000 miles in the last 8 years.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={400}>
                <p>
                  Part of what made this transformation possible was connection and community, and in 2024, Andee pivoted to building online communities full-time. She has built and/or operationalized five online communities... including the AI Salon.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={450}>
                <p className="font-display text-aubergine text-xl md:text-2xl italic leading-snug">
                  There is enormous power in going through a transition with people who are in it with you. The Great Repurpose is modeled on that.
                </p>
              </ScrollFadeUp>
              <ScrollFadeUp delay={500}>
                <p>
                  Andee holds a master's degree in Sociology from Columbia University and has had a lifelong fascination with the systemic factors that influence human behavior.
                </p>
              </ScrollFadeUp>
            </div>
          </div>
        </section>

        {/* ── What We Built ── */}
        <section className="bg-aubergine py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollFadeUp>
              <p className="font-sans text-aqua text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                What We Built
              </p>
              <h2 className="font-display text-soft-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                The Great Repurpose Academy
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

      </main>
      <Footer />
    </div>
  );
};

export default About;
