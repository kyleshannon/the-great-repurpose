import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";

const types = [
  {
    name: "The Amplifier",
    tagline: "You're building toward leading others through this.",
    description: "You've done the work. Your sense of self doesn't depend on your title, you know what you bring that AI can't replicate, you have direction, you're comfortable with the tools, and you're already creating. The next step isn't more preparation — it's helping someone else get here. Find a peer group, start teaching what you know, or build something that pulls others forward.",
    color: "border-coral",
  },
  {
    name: "The Awakener",
    tagline: "You're building toward clarity. Everything is early.",
    description: "Nothing feels clear yet, and that's okay. You're early — no single area has broken through, and the fog is real. The most important thing right now is to stop trying to figure it all out at once. Pick one dimension — just one — and take a small step. Read something that challenges how you think about your identity. Ask someone how they're using AI. Movement in any direction beats standing still.",
    color: "border-cream/30",
  },
  {
    name: "The Explorer",
    tagline: "You're building toward a new creative practice.",
    description: "You've been playing with AI tools or making things, which puts you ahead of most people. But the deeper questions — who you are without your job title, what value you bring that's uniquely yours — are still unanswered. The risk is building impressive things that don't mean anything to you. Slow down long enough to ask: what is all this capability actually for?",
    color: "border-mint",
  },
  {
    name: "The Firestarter",
    tagline: "You're building toward something that just caught fire.",
    description: "Something clicked. Maybe it was a moment of clarity about your identity, or a purpose that suddenly made sense, or an AI tool that opened a door. One area of your life just leapt ahead while everything else is still catching up. Don't dismiss the spark — it's the thread to pull. The next step is to let that breakthrough inform the areas that haven't moved yet. What does your spark tell you about where to go next?",
    color: "border-amber-brand",
  },
  {
    name: "The Translator",
    tagline: "You're building toward bridging two worlds.",
    description: "You're strong on the outside edges. You know who you are and you're comfortable with tools or creation. But there's a gap in the middle — you haven't fully articulated what makes you valuable, or you haven't locked in a clear direction. You're doing impressive things without a strategic center. The next step is excavation: figure out what's actually worth building before you build more of it.",
    color: "border-periwinkle",
  },
  {
    name: "The Architect",
    tagline: "You're building toward something only you can build.",
    description: "You understand everything. Identity, value, purpose, tools — all solid. The only thing missing is output. You haven't shipped anything yet. The gap isn't knowledge, it's action. Perfectionism is probably disguised as preparation. The next step is to make something — anything — and put it in front of someone. A rough draft, a prototype, a first attempt. Done beats perfect.",
    color: "border-coral",
  },
  {
    name: "The Compass",
    tagline: "You're building toward leading the way.",
    description: "You've done the hardest part. You know who you are, what you bring, and where you're headed. But you haven't picked up the tools yet, and you haven't started creating. You have the perfect map and no boots on the ground. The next step is low-stakes experimentation with AI — not mastery, just familiarity. Try one tool. Make one thing. The inner work is done; now it's time to move.",
    color: "border-mint",
  },
  {
    name: "The Original",
    tagline: "You're building toward becoming irreplaceable.",
    description: "Your identity is unhooked from your old title, and you've found real value in what you bring. But you haven't aimed it at anything yet, and tools or creation haven't started. You know who you are — you just haven't decided what to do about it. The next step is direction: pick a problem worth solving or an audience worth serving, and point your clarity at it.",
    color: "border-periwinkle",
  },
  {
    name: "The Unlocker",
    tagline: "You're building toward freedom from the old story.",
    description: "Identity is the bottleneck. You're still separating who you are from the title you held, and until that shifts, nothing else can move. Every AI headline feels like a personal threat. That's normal — and it's the door to walk through. The next step isn't learning a tool or finding your purpose. It's sitting with the question: who am I if I'm not my job? Start there. Everything else is waiting on the other side.",
    color: "border-amber-brand",
  },
  {
    name: "The Catalyst",
    tagline: "You're building toward amplifying everything you touch.",
    description: "You're solid across the board. Nothing is catastrophically low, nothing is fully resolved. You're balanced, capable, and closer than you think. The risk is coasting — \"good enough\" can become a ceiling. The next step is to pick the one dimension where a small push would unlock the most momentum, and lean into it. You don't need a transformation. You need a catalyst.",
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
                  <div className={`border-l-4 ${type.color} bg-navy/5 border border-navy/10 rounded-r-lg p-7 h-full`}>
                    <h3 className="font-serif text-navy text-xl mb-1">{type.name}</h3>
                    <p className="font-serif text-navy/60 text-sm italic mb-3">{type.tagline}</p>
                    <p className="font-sans text-navy/70 text-sm leading-relaxed">{type.description}</p>
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
