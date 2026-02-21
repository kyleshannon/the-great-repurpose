import { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

type DimensionKey = "identity" | "value" | "purpose" | "ai_relationship" | "creative_action";

const dimensionMeta: Record<DimensionKey, {
  label: string;
  phase: string;
  color: string;
  descriptions: { low: string; mid: string; high: string };
}> = {
  identity: {
    label: "Identity",
    phase: "Phase 1 — Disorientation",
    color: "hsl(145 25% 50%)",
    descriptions: {
      low: "Right now, your sense of self and your work are deeply intertwined — which means the disruption of one feels like the disruption of both. That's not a flaw; it's a sign of how fully you've committed to your work. The invitation here is to begin, slowly, to locate yourself somewhere that AI cannot reach.",
      mid: "You have some separation between who you are and what you do, but the line is still blurry. That's honest. Most people in this moment are somewhere in the middle, feeling the tug between identity and role.",
      high: "You've done meaningful work to locate your sense of self somewhere beyond your job title. That's a real advantage in this moment — it means your identity isn't up for negotiation every time the market shifts.",
    },
  },
  value: {
    label: "Value Clarity",
    phase: "Phase 3 — Excavation",
    color: "hsl(155 20% 55%)",
    descriptions: {
      low: "Right now, you're finding it hard to name what you uniquely bring — and that's one of the most honest and human places to be in this moment. The parts of your work that felt most distinctively yours may be the ones most visibly affected by AI. That's not evidence that you have nothing to offer. It's an invitation to look deeper.",
      mid: "You have a partial sense of your unique contribution, but you can't always name it clearly. That's common — and it's exactly the kind of thing a community conversation can help surface.",
      high: "You have a clear and grounded sense of what you uniquely bring — and that clarity is a genuine signal. The work now is making sure that signal is visible to the people who need to find you.",
    },
  },
  purpose: {
    label: "Purpose",
    phase: "Phase 4 — Reorientation",
    color: "hsl(145 15% 70%)",
    descriptions: {
      low: "Direction is the hardest thing to rebuild from the outside in. If you're feeling unmoored about what you're building toward, you're not lost — you're in the part of the terrain that requires a different kind of navigation. Slower. More internal. Less certain.",
      mid: "You have some sense of direction, but it's not yet fully motivating. That's the middle of the map — enough to keep moving, not yet enough to feel pulled. The work is finding what genuinely energizes you and letting that be the compass.",
      high: "You have a clear and motivating sense of where you're headed. That's not something everyone has right now — and it's worth protecting. The challenge in this phase is staying connected to that direction as the landscape continues to shift.",
    },
  },
  ai_relationship: {
    label: "AI Relationship",
    phase: "Phase 2 — Reckoning",
    color: "hsl(45 40% 55%)",
    descriptions: {
      low: "The best cure for anxiety about AI tools is actually using them — in a low-stakes, high-trust environment with other humans who are figuring it out too. Avoidance tends to amplify the fear. The AI Learning Lab is built exactly for this moment.",
      mid: "You're engaging with AI tools, but not yet on your own terms — or not yet with confidence. That's a very normal place to be. The shift from reluctant user to intentional user is less about skill than about context.",
      high: "You're engaging with AI tools actively and on your own terms. That's a meaningful advantage — and the question now is whether your relationship with these tools is enhancing your signal or slowly diluting it.",
    },
  },
  creative_action: {
    label: "Creative Action",
    phase: "Phase 5 — Authorship",
    color: "hsl(145 25% 50%)",
    descriptions: {
      low: "You have signal. You're just not yet making it visible — to yourself or to others. The move from consuming to creating is one of the most important transitions in The Great Repurpose. It doesn't require perfection. It requires showing up.",
      mid: "You're creating some things, sharing some things — but not yet consistently or with full confidence. That's the creative equivalent of Reorientation: you know the direction, but you haven't yet made it a practice.",
      high: "You're actively making and sharing work, even imperfectly. That's Authorship — and it's the most generative place to be in this moment. The work now is refining your signal, finding your audience, and going deeper.",
    },
  },
};

function getScoreTier(score: number): "low" | "mid" | "high" {
  if (score < 4) return "low";
  if (score < 7) return "mid";
  return "high";
}

function getLowestDimension(scores: Record<DimensionKey, number>): DimensionKey {
  return (Object.entries(scores) as [DimensionKey, number][]).reduce(
    (min, [key, val]) => (val < min[1] ? [key, val] : min),
    ["identity", Infinity] as [DimensionKey, number]
  )[0];
}

function getStrongestDimension(scores: Record<DimensionKey, number>): DimensionKey {
  return (Object.entries(scores) as [DimensionKey, number][]).reduce(
    (max, [key, val]) => (val > max[1] ? [key, val] : max),
    ["identity", -Infinity] as [DimensionKey, number]
  )[0];
}

const salonRouting: Record<DimensionKey, { body: string; links: { label: string; href: string }[] }> = {
  identity: {
    body: "Your most important work right now isn't about AI skills. It's about separating who you are from what you do — so that no tool, trend, or market shift can take the former when it takes the latter. Start with the Great Repurpose, then come to a Friday Office Hours session.",
    links: [
      { label: "Friday Office Hours", href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet" },
      { label: "Free Community", href: "https://community.thesalon.ai" },
    ],
  },
  value: {
    body: "You're in the most common and least-discussed dimension of the disruption: knowing you bring something, but struggling to name it. The AI Salon's free community is full of people helping each other with exactly this. And Friday Office Hours is a good place to start.",
    links: [
      { label: "Free Community", href: "https://community.thesalon.ai" },
      { label: "Friday Office Hours", href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet" },
    ],
  },
  purpose: {
    body: "Direction is the hardest thing to rebuild from the outside in. The Learn Out Loud sessions in the AI Salon community are designed specifically for people who are exploring — not yet certain, but moving. Come as you are.",
    links: [
      { label: "Friday Office Hours", href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet" },
      { label: "Learn Out Loud sessions", href: "https://thesalon.ai" },
    ],
  },
  ai_relationship: {
    body: "The best cure for anxiety about AI tools is actually using them — in a low-stakes, high-trust environment with other humans who are figuring it out too. The AI Learning Lab is built exactly for that.",
    links: [
      { label: "AI Learning Lab", href: "https://thesalon.ai" },
      { label: "Friday Office Hours", href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet" },
    ],
  },
  creative_action: {
    body: "You have signal. You're just not yet making it visible — to yourself or to others. The Mastermind Practice Lab is where people build the habit of showing up and making things, even imperfectly. And the AI Learning Lab gives you the tools.",
    links: [
      { label: "Mastermind Practice Lab", href: "https://thesalon.ai" },
      { label: "AI Learning Lab", href: "https://thesalon.ai" },
    ],
  },
};

const dimensionOrder: DimensionKey[] = ["identity", "value", "purpose", "ai_relationship", "creative_action"];

// ── Score teaser card (shown pre-email) ──────────────────────────────────────

function ScoreTeaser({ scores }: { scores: Record<DimensionKey, number> }) {
  const strongest = getStrongestDimension(scores);
  const overall = Object.values(scores).reduce((a, b) => a + b, 0) / 5;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Overall score */}
      <div className="text-center mb-8">
        <p className="font-sans text-cream/50 text-xs uppercase tracking-widest mb-2">
          Your overall signal
        </p>
        <p className="font-serif text-coral text-6xl font-bold leading-none">
          {overall.toFixed(1)}
        </p>
        <p className="font-sans text-cream/40 text-sm mt-1">out of 10</p>
      </div>

      {/* Per-dimension scores */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {dimensionOrder.map((dim) => (
          <div key={dim} className="text-center">
            <p className="font-serif text-cream text-2xl font-bold mb-1">
              {scores[dim].toFixed(1)}
            </p>
            <p className="font-sans text-cream/40 text-[10px] uppercase tracking-wider leading-tight">
              {dimensionMeta[dim].label}
            </p>
          </div>
        ))}
      </div>

      {/* Teaser paragraph with fade */}
      <div className="relative">
        <p className="font-sans text-cream/70 text-base leading-relaxed">
          Your signal is clearest in <span className="text-coral font-medium">{dimensionMeta[strongest].label}</span>.{" "}
          {dimensionMeta[strongest].descriptions[getScoreTier(scores[strongest])].slice(0, 180)}...
        </p>
        {/* Fade overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, hsl(70 10% 10%))",
          }}
        />
      </div>
    </div>
  );
}

// ── Email gate component ─────────────────────────────────────────────────────

function EmailGate({ onSuccess }: { onSuccess: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    onSuccess(email.trim().toLowerCase());
  };

  return (
    <div className="border border-cream/10 rounded-xl p-8 text-center bg-cream/[0.03]">
      <h2 className="font-serif text-cream text-xl mb-2">Read your full results.</h2>
      <p className="font-sans text-cream/50 text-sm mb-6 max-w-md mx-auto">
        Enter your email to unlock your complete profile — dimension-by-dimension breakdown, radar chart, and your personalized next step.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <label htmlFor="email-input" className="sr-only">Email address</label>
        <input
          id="email-input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 bg-navy border border-cream/20 text-cream placeholder:text-cream/40 rounded-lg px-4 py-3 font-sans text-base focus:outline-none focus:border-coral transition-colors"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-coral text-cream font-sans font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 whitespace-nowrap"
        >
          {submitting ? "Saving..." : "Unlock Results →"}
        </button>
      </form>
      <p className="text-cream/40 text-xs mt-4 font-sans">
        No spam. Ever. We'll occasionally share things from The Great Repurpose that are actually worth your time.
      </p>
    </div>
  );
}

// ── Helper: build share text from scores ─────────────────────────────────────

function buildShareSummary(scores: Record<DimensionKey, number>, selfCheckUrl: string) {
  const overall = (Object.values(scores).reduce((a, b) => a + b, 0) / 5).toFixed(1);
  const strongest = getStrongestDimension(scores);
  return `I just took The Great Repurpose Self-Check — a free assessment for anyone navigating the AI transition.\n\nMy signal score: ${overall}/10\nStrongest dimension: ${dimensionMeta[strongest].label}\n\nCurious about your own shape? Take the free assessment → ${selfCheckUrl}`;
}

// ── Main component ───────────────────────────────────────────────────────────

const ResultsPreview = () => {
  const [searchParams] = useSearchParams();
  const { id: routeId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<Record<DimensionKey, number> | null>(null);
  const [resultId, setResultId] = useState<string | null>(routeId || null);

  // If we have a route ID, load saved results from DB
  useEffect(() => {
    if (!routeId) {
      // Preview mode — scores come from search params
      setScores({
        identity: parseFloat(searchParams.get("identity") || "5"),
        value: parseFloat(searchParams.get("value") || "5"),
        purpose: parseFloat(searchParams.get("purpose") || "5"),
        ai_relationship: parseFloat(searchParams.get("ai_relationship") || "5"),
        creative_action: parseFloat(searchParams.get("creative_action") || "5"),
      });
      return;
    }

    // Saved result — load from DB and show full results
    setLoading(true);
    supabase
      .from("selfcheck_results")
      .select("*")
      .eq("id", routeId)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          navigate("/selfcheck", { replace: true });
          return;
        }
        setScores({
          identity: data.identity_score,
          value: data.value_score,
          purpose: data.purpose_score,
          ai_relationship: data.ai_relationship_score,
          creative_action: data.creative_action_score,
        });
        setSubmitted(true);
        setResultId(data.id);
        setLoading(false);
      });
  }, [routeId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading || !scores) {
    return (
      <div className="min-h-screen bg-navy text-cream flex items-center justify-center">
        <p className="font-sans text-cream/50">Loading your results…</p>
      </div>
    );
  }

  const strongest = getStrongestDimension(scores);
  const lowest = getLowestDimension(scores);

  const chartData = [
    { subject: "Identity", value: scores.identity, fullMark: 10 },
    { subject: "Value", value: scores.value, fullMark: 10 },
    { subject: "Purpose", value: scores.purpose, fullMark: 10 },
    { subject: "AI Relationship", value: scores.ai_relationship, fullMark: 10 },
    { subject: "Creative Action", value: scores.creative_action, fullMark: 10 },
  ];

  const selfCheckUrl = `${window.location.origin}/selfcheck`;
  const resultUrl = resultId
    ? `${window.location.origin}/results/${resultId}`
    : null;

  const handleEmailSuccess = async (email: string) => {
    if (submitted) return;

    const lowestDim = getLowestDimension(scores);

    try {
      const { data, error } = await supabase
        .from("selfcheck_results")
        .insert({
          email,
          identity_score: scores.identity,
          value_score: scores.value,
          purpose_score: scores.purpose,
          ai_relationship_score: scores.ai_relationship,
          creative_action_score: scores.creative_action,
          lowest_dimension: lowestDim,
        })
        .select("id")
        .single();

      if (!error && data) {
        setResultId(data.id);
        // Navigate to the permanent URL
        navigate(`/results/${data.id}`, { replace: true });
      }

      supabase.functions.invoke("subscribe-kit", {
        body: { email, lowest_dimension: lowestDim },
      }).catch((err) => console.warn("KIT subscribe failed:", err));

    } catch (err) {
      console.error("Error saving results:", err);
    }

    setSubmitted(true);
  };

  const handleCopyLink = () => {
    if (resultUrl) {
      navigator.clipboard.writeText(resultUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(resultUrl || window.location.href);
    const text = encodeURIComponent(buildShareSummary(scores, selfCheckUrl));
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, "_blank");
  };

  const handleShareX = () => {
    const overall = (Object.values(scores).reduce((a, b) => a + b, 0) / 5).toFixed(1);
    const text = encodeURIComponent(
      `I scored ${overall}/10 on The Great Repurpose Self-Check. My strongest signal: ${dimensionMeta[strongest].label}.\n\nCurious about your own shape? Take the free assessment →`
    );
    const url = encodeURIComponent(selfCheckUrl);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-navy text-cream">
      <Navigation />
      <main id="main-content">

      {!submitted ? (
        /* ── Pre-email: scores teaser + email gate ── */
        <section className="bg-navy min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
          <div className="max-w-2xl mx-auto w-full">
            <p className="text-coral font-sans text-xs uppercase tracking-widest mb-6 text-center">
              Your Results
            </p>

            <ScoreTeaser scores={scores} />

            <div className="mt-10">
              <EmailGate onSuccess={handleEmailSuccess} />
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* ── Radar chart + Strongest ── */}
          <section className="bg-navy pt-28 pb-16 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-coral font-sans text-xs uppercase tracking-widest mb-3">Your shape, right now</p>
              <h1 className="font-serif text-cream text-3xl md:text-4xl mb-10">
                Your signal is starting to come through.
              </h1>

              <ResponsiveContainer width="100%" height={340}>
                <RadarChart data={chartData}>
                  <PolarGrid stroke="hsl(40 25% 90% / 0.12)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "hsl(40 25% 90% / 0.7)", fontSize: 12, fontFamily: "Inter" }}
                  />
                  <Radar
                    name="Your Signal"
                    dataKey="value"
                    stroke="hsl(145 25% 50%)"
                    fill="hsl(145 25% 50%)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>

              <p className="font-sans text-cream/60 text-sm mt-4 mb-2">
                Your strongest signal right now:
              </p>
              <p className="font-serif text-coral text-2xl font-bold">
                {dimensionMeta[strongest].label}
              </p>
              <p className="font-sans text-cream/60 text-base italic mt-2">
                {dimensionMeta[strongest].phase}
              </p>
            </div>
          </section>
        </>
      )}

      {submitted && (
        <>
          {/* ── Dimension breakdown with scores ── */}
          <section className="py-16 px-6">
            <div className="max-w-3xl mx-auto space-y-2">
              <p className="text-coral font-sans text-xs uppercase tracking-widest mb-6 text-center">Dimension by Dimension</p>
              {dimensionOrder.map((dim, i) => {
                const score = scores[dim];
                const tier = getScoreTier(score);
                const isNavy = i % 2 === 0;
                return (
                  <div key={dim} className={`${isNavy ? "bg-navy" : "bg-cream"} rounded-lg p-8`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-coral font-medium mb-1">
                          {dimensionMeta[dim].label}
                        </p>
                        <p className={`font-sans text-xs ${isNavy ? "text-cream/40" : "text-navy/40"}`}>
                          {dimensionMeta[dim].phase}
                        </p>
                      </div>
                      <p className={`font-serif text-3xl font-bold ${isNavy ? "text-cream" : "text-navy"}`}>
                        {score.toFixed(1)}
                      </p>
                    </div>
                    {/* Spectrum bar */}
                    <div className="relative h-2 bg-cream/10 rounded-full mb-6 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          width: `${((score - 1) / 9) * 100}%`,
                          background: "linear-gradient(to right, hsl(70 10% 25%), hsl(145 25% 50%))",
                        }}
                      />
                    </div>
                    <p className={`font-sans text-base leading-relaxed ${isNavy ? "text-cream/70" : "text-navy/70"}`}>
                      {dimensionMeta[dim].descriptions[tier]}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Insight summary */}
          <section className="bg-cream py-16 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-coral font-sans text-xs uppercase tracking-widest mb-4">Your profile in full</p>
              <p className="font-serif text-navy text-lg md:text-xl leading-relaxed italic">
                "Your signal is clearest in{" "}
                <span className="text-coral not-italic font-medium">{dimensionMeta[strongest].label}</span>
                . The place where the noise is loudest right now is{" "}
                <span className="not-italic font-medium">{dimensionMeta[lowest].label}</span>
                . That's not a verdict — it's a coordinate. The work of The Great Repurpose is to move toward your signal from wherever you are. You don't have to do that alone."
              </p>
            </div>
          </section>

          {/* Personalized routing */}
          <section className="bg-navy py-16 px-6">
            <div className="max-w-2xl mx-auto">
              <p className="text-coral font-sans text-xs uppercase tracking-widest mb-4">Where to go from here — for you, specifically</p>
              <p className="font-sans text-cream/70 text-base leading-relaxed mb-6">
                {salonRouting[lowest].body}
              </p>
              <div className="flex flex-wrap gap-3">
                {salonRouting[lowest].links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-coral text-coral font-sans text-sm px-5 py-2 rounded-full hover:bg-coral hover:text-cream transition-colors"
                  >
                    {label} →
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Secondary recommendations */}
          <section className="bg-cream py-16 px-6">
            <div className="max-w-3xl mx-auto">
              <p className="text-coral font-sans text-xs uppercase tracking-widest mb-8 text-center">Also worth exploring</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Free AI Salon Community", desc: "Join the conversation.", href: "https://community.thesalon.ai" },
                  { label: "AI Readiness Project Podcast", desc: "Conversations about what it means to be ready — humanly.", href: "http://aireadinessproject.com/" },
                  { label: "Friday Office Hours", desc: "Real questions. Real answers. Weekly.", href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet" },
                ].map(({ label, desc, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-navy/20 rounded-lg p-6 hover:border-coral/40 transition-colors group"
                  >
                    <h3 className="font-serif text-navy text-base mb-1 group-hover:text-coral transition-colors">{label}</h3>
                    <p className="font-sans text-navy/60 text-sm">{desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Share */}
          <section className="bg-navy py-16 px-6">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif text-cream text-2xl mb-3">Share your shape.</h2>
              <p className="font-sans text-cream/50 text-sm mb-8">
                Your link goes to your full results. Social shares invite others to take the free assessment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {resultUrl && (
                  <button
                    onClick={handleCopyLink}
                    className="border border-cream/20 text-cream font-sans text-sm px-6 py-3 rounded-full hover:border-cream/60 transition-colors"
                  >
                    {copied ? "Copied ✓" : "Copy Link"}
                  </button>
                )}
                <button
                  onClick={handleShareLinkedIn}
                  className="border border-cream/20 text-cream font-sans text-sm px-6 py-3 rounded-full hover:border-cream/60 transition-colors"
                >
                  Share on LinkedIn
                </button>
                <button
                  onClick={handleShareX}
                  className="border border-cream/20 text-cream font-sans text-sm px-6 py-3 rounded-full hover:border-cream/60 transition-colors"
                >
                  Share on X
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      </main>
      <Footer />
    </div>
  );
};

export default ResultsPreview;
