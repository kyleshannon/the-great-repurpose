import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

const types = [
  {
    name: "The Amplifier",
    tagline: "You're building toward leading others through this.",
    pattern: "All five dimensions are high. The full Great Repurpose is in motion.",
    color: "border-coral",
  },
  {
    name: "The Awakener",
    tagline: "You're building toward clarity. Everything is early.",
    pattern: "No dimension stands out yet. The honest starting point for most people.",
    color: "border-cream/30",
  },
  {
    name: "The Explorer",
    tagline: "You're building toward a new creative practice.",
    pattern: "Strong in AI tools or creative action, but identity or value clarity is still forming.",
    color: "border-mint",
  },
  {
    name: "The Firestarter",
    tagline: "You're building toward something that just caught fire.",
    pattern: "One dimension is dramatically ahead of the rest. A single breakthrough is leading the way.",
    color: "border-amber-brand",
  },
  {
    name: "The Translator",
    tagline: "You're building toward bridging two worlds.",
    pattern: "Strong identity and tool engagement, but value clarity or purpose direction has a gap in the middle.",
    color: "border-periwinkle",
  },
  {
    name: "The Architect",
    tagline: "You're building toward something only you can build.",
    pattern: "Strong across identity, value, purpose, and AI — but creative output hasn't started yet.",
    color: "border-coral",
  },
  {
    name: "The Compass",
    tagline: "You're building toward leading the way.",
    pattern: "Identity, value, and purpose are all strong. Tools and creation haven't started. The perfect map, no boots.",
    color: "border-mint",
  },
  {
    name: "The Original",
    tagline: "You're building toward becoming irreplaceable.",
    pattern: "Identity unhooked and value found, but purpose isn't aimed and tools aren't engaged yet.",
    color: "border-periwinkle",
  },
  {
    name: "The Unlocker",
    tagline: "You're building toward freedom from the old story.",
    pattern: "Identity is the active bottleneck. Everything else is waiting behind this one door.",
    color: "border-amber-brand",
  },
  {
    name: "The Catalyst",
    tagline: "You're building toward amplifying everything you touch.",
    pattern: "Solid across the board — no catastrophic gaps, no single dimension fully resolved. One push from accelerating.",
    color: "border-cream/30",
  },
];

const TgrTypes = () => {
  return (
    <div className="min-h-screen bg-navy text-cream">
      <Navigation />
      <main id="main-content">
        {/* Hero */}
        <section className="bg-navy pt-28 md:pt-36 pb-16 md:pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollFadeUp>
              <p className="text-coral font-sans text-xs uppercase tracking-widest mb-4">
                The 10 TGR Types
              </p>
              <h1 className="font-serif text-cream text-4xl md:text-5xl leading-tight mb-6">
                Everyone navigating this transition has a shape.
              </h1>
              <p className="font-sans text-cream/70 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                The Great Repurpose measures five dimensions of readiness: Identity Independence, Value Clarity, Purpose Direction, AI Relationship, and Creative Action. Your pattern across those five dimensions determines your TGR Type — and what you're building toward.
              </p>
              <p className="font-sans text-cream/50 text-base max-w-2xl mx-auto">
                There are ten types. None of them are bad. All of them are a starting point.
              </p>
            </ScrollFadeUp>
          </div>
        </section>

        {/* Types grid */}
        <section className="bg-cream py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              {types.map((type, i) => (
                <ScrollFadeUp key={type.name} delay={i * 60}>
                  <div className={`border-l-4 ${type.color} bg-navy/5 border border-navy/10 rounded-r-lg p-6 h-full`}>
                    <h3 className="font-serif text-navy text-xl mb-1">{type.name}</h3>
                    <p className="font-serif text-navy/60 text-sm italic mb-3">{type.tagline}</p>
                    <p className="font-sans text-navy/70 text-sm leading-relaxed">{type.pattern}</p>
                  </div>
                </ScrollFadeUp>
              ))}
            </div>

            <ScrollFadeUp delay={600}>
              <div className="text-center mt-16">
                <p className="font-serif text-navy text-xl mb-4">Which one are you?</p>
                <p className="font-sans text-navy/60 text-base mb-6">
                  7 questions. 2 minutes. Discover where you are — and what you're building toward.
                </p>
                <Link
                  to="/selfcheck"
                  className="inline-block bg-coral text-cream font-sans font-medium text-lg px-10 py-5 rounded-full pulse-coral hover:opacity-90 transition-opacity"
                >
                  Find Your TGR Type →
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

export default TgrTypes;
