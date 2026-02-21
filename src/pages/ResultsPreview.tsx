import { useState, useEffect, useRef } from "react";
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
import { ChevronDown } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { matchArchetype, getArchetypeSlug, type Scores, type Archetype } from "@/lib/archetypes";

type DimensionKey = "identity" | "value" | "purpose" | "ai_relationship" | "creative_action";

const dimensionMeta: Record<DimensionKey, { label: string; stage: string }> = {
  identity: { label: "Identity Independence", stage: "Stage 1 — Disorientation" },
  value: { label: "Value Clarity", stage: "Stage 3 — Excavation" },
  purpose: { label: "Purpose Direction", stage: "Stage 4 — Reorientation" },
  ai_relationship: { label: "AI Relationship", stage: "Stage 2 — Reckoning" },
  creative_action: { label: "Creative Action", stage: "Stage 5 — Authorship" },
};

const dimensionOrder: DimensionKey[] = ["identity", "value", "purpose", "ai_relationship", "creative_action"];

function getLowestDimension(scores: Record<DimensionKey, number>): DimensionKey {
  return (Object.entries(scores) as [DimensionKey, number][]).reduce(
    (min, [key, val]) => (val < min[1] ? [key, val] : min),
    ["identity", Infinity] as [DimensionKey, number]
  )[0];
}

function scoresToArchetypeInput(scores: Record<DimensionKey, number>): Scores {
  return {
    identity: scores.identity,
    value: scores.value,
    purpose: scores.purpose,
    ai_relationship: scores.ai_relationship,
    creative_action: scores.creative_action,
  };
}

// ── Streaming AI interpretation ──────────────────────────────────────────────

function useStreamInterpretation() {
  const [text, setText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stream = async (scores: Record<DimensionKey, number>, archetype: Archetype) => {
    setStreaming(true);
    setError(null);
    setText("");

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-interpretation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ scores, archetype }),
        }
      );

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        setError(errData.error || "Failed to generate interpretation.");
        setStreaming(false);
        return "";
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";
      let done = false;

      while (!done) {
        const { done: readDone, value } = await reader.read();
        if (readDone) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullText += content;
              setText(fullText);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      setStreaming(false);
      return fullText;
    } catch (e) {
      console.error("Stream error:", e);
      setError("Something went wrong generating your interpretation.");
      setStreaming(false);
      return "";
    }
  };

  return { text, streaming, error, stream };
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
      <h2 className="font-serif text-cream text-xl mb-2">Unlock your full reading.</h2>
      <p className="font-sans text-cream/50 text-sm mb-6 max-w-md mx-auto">
        Enter your email to unlock your AI-generated interpretation, personalized next step, and full dimension breakdown.
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
      <p className="text-cream/40 text-xs mt-4 font-sans max-w-md mx-auto leading-relaxed">
        By submitting your email, you agree to receive emails from The AI Salon. You can unsubscribe at any time.
      </p>
    </div>
  );
}

// ── PDF Generator ────────────────────────────────────────────────────────────

async function generatePDF(reportRef: HTMLDivElement) {
  const canvas = await html2canvas(reportRef, {
    backgroundColor: "#1a1c1e",
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const pdf = new jsPDF("p", "mm", "a4");
  const pageHeight = 297;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  pdf.save("great-repurpose-results.pdf");
}

// ── Main component ───────────────────────────────────────────────────────────

const ResultsPreview = () => {
  const [searchParams] = useSearchParams();
  const { id: routeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [scores, setScores] = useState<Record<DimensionKey, number> | null>(null);
  const [resultId, setResultId] = useState<string | null>(routeId || null);
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [cachedInterpretation, setCachedInterpretation] = useState<string | null>(null);
  const [expandedDims, setExpandedDims] = useState<Set<DimensionKey>>(new Set());

  const { text: streamedText, streaming, error: streamError, stream } = useStreamInterpretation();

  const interpretationText = cachedInterpretation || streamedText;

  // Load scores
  useEffect(() => {
    if (!routeId) {
      const s = {
        identity: parseFloat(searchParams.get("identity") || "5"),
        value: parseFloat(searchParams.get("value") || "5"),
        purpose: parseFloat(searchParams.get("purpose") || "5"),
        ai_relationship: parseFloat(searchParams.get("ai_relationship") || "5"),
        creative_action: parseFloat(searchParams.get("creative_action") || "5"),
      };
      setScores(s);
      setArchetype(matchArchetype(scoresToArchetypeInput(s)));
      return;
    }

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
        const s = {
          identity: data.identity_score,
          value: data.value_score,
          purpose: data.purpose_score,
          ai_relationship: data.ai_relationship_score,
          creative_action: data.creative_action_score,
        };
        setScores(s);
        setArchetype(matchArchetype(scoresToArchetypeInput(s)));
        setSubmitted(true);
        setResultId(data.id);
        if ((data as any).ai_interpretation) {
          setCachedInterpretation((data as any).ai_interpretation);
        }
        setLoading(false);
      });
  }, [routeId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-stream interpretation when submitted and no cached version
  useEffect(() => {
    if (submitted && scores && archetype && !cachedInterpretation && !streamedText && !streaming) {
      stream(scores, archetype).then((fullText) => {
        if (fullText && resultId) {
          // Cache in DB
          supabase
            .from("selfcheck_results")
            .update({ ai_interpretation: fullText, archetype: archetype.name } as any)
            .eq("id", resultId)
            .then(() => {});
        }
      });
    }
  }, [submitted, scores, archetype, cachedInterpretation]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading || !scores || !archetype) {
    return (
      <div className="min-h-screen bg-navy text-cream flex items-center justify-center">
        <p className="font-sans text-cream/50">Loading your results…</p>
      </div>
    );
  }

  const overall = Object.values(scores).reduce((a, b) => a + b, 0) / 5;
  const chartData = [
    { subject: "Identity", value: scores.identity, fullMark: 10 },
    { subject: "Value", value: scores.value, fullMark: 10 },
    { subject: "Purpose", value: scores.purpose, fullMark: 10 },
    { subject: "AI Rel.", value: scores.ai_relationship, fullMark: 10 },
    { subject: "Creative", value: scores.creative_action, fullMark: 10 },
  ];

  const selfCheckUrl = `${window.location.origin}/selfcheck`;
  const resultUrl = resultId ? `${window.location.origin}/results/${resultId}` : null;
  const archetypeSlug = getArchetypeSlug(archetype);

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
          archetype: archetype.name,
        } as any)
        .select("id")
        .single();

      if (!error && data) {
        setResultId(data.id);
        navigate(`/results/${data.id}`, { replace: true });
      }

      supabase.functions
        .invoke("subscribe-kit", {
          body: { email, lowest_dimension: lowestDim, archetype: archetypeSlug },
        })
        .catch((err) => console.warn("KIT subscribe failed:", err));
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
    const url = encodeURIComponent(resultUrl || selfCheckUrl);
    const text = encodeURIComponent(
      `I just took The Great Repurpose Self-Check. I'm "${archetype.name}": ${archetype.tagline}\n\nCurious about your own shape? Take the free assessment →`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, "_blank");
  };

  const handleShareX = () => {
    const text = encodeURIComponent(
      `My Great Repurpose result: ${archetype.name}. "${archetype.tagline}" — uncomfortably accurate.`
    );
    const url = encodeURIComponent(selfCheckUrl);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setGenerating(true);
    try {
      await generatePDF(reportRef.current);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
    setGenerating(false);
  };

  const toggleDim = (dim: DimensionKey) => {
    setExpandedDims((prev) => {
      const next = new Set(prev);
      if (next.has(dim)) next.delete(dim);
      else next.add(dim);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-navy text-cream">
      <Navigation />
      <main id="main-content">

      {!submitted ? (
        /* ── Pre-email: Archetype teaser + radar + blurred preview + email gate ── */
        <section className="bg-navy min-h-screen flex items-center justify-center px-4 md:px-6 pt-20 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-2xl mx-auto w-full">
            {/* Archetype name */}
            <p className="text-coral font-sans text-xs uppercase tracking-widest mb-3 text-center">
              You are
            </p>
            <h1 className="font-serif text-cream text-4xl md:text-5xl text-center mb-2">
              {archetype.name}
            </h1>
            <p className="font-serif text-cream/60 text-lg italic text-center mb-10">
              {archetype.tagline}
            </p>

            {/* Radar chart */}
            <div className="mb-10">
              <ResponsiveContainer width="100%" height={260}>
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
            </div>

            {/* Blurred interpretation preview */}
            <div className="relative mb-10">
              <div className="blur-sm select-none pointer-events-none">
                <p className="font-sans text-cream/70 text-base leading-relaxed">
                  {archetype.description} {archetype.vulnerability} The work ahead is clear, and the next step is specific to your shape. Your interpretation will reveal the relationship between your dimensions and what it means for your path forward...
                </p>
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: "linear-gradient(to bottom, transparent 0%, hsl(70 10% 10% / 0.8) 40%, hsl(70 10% 10%) 100%)",
                }}
              >
                <p className="font-sans text-cream/60 text-sm">Enter your email to read your full interpretation</p>
              </div>
            </div>

            <EmailGate onSuccess={handleEmailSuccess} />
          </div>
        </section>
      ) : (
        <>
          {/* ── PDF-capturable report section ── */}
          <div ref={reportRef}>

          {/* ── Archetype hero + radar ── */}
          <section className="bg-navy pt-20 md:pt-28 pb-12 md:pb-16 px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-coral font-sans text-xs uppercase tracking-widest mb-3">You are</p>
              <h1 className="font-serif text-cream text-4xl md:text-5xl mb-2">
                {archetype.name}
              </h1>
              <p className="font-serif text-cream/60 text-lg italic mb-10">
                {archetype.tagline}
              </p>

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

              <p className="font-serif text-coral text-5xl font-bold mt-6 mb-1">{overall.toFixed(1)}</p>
              <p className="font-sans text-cream/40 text-sm">overall signal</p>
            </div>
          </section>

          {/* ── AI Interpretation ── */}
          <section className="bg-navy py-16 px-6">
            <div className="max-w-2xl mx-auto">
              <p className="text-coral font-sans text-xs uppercase tracking-widest mb-6 text-center">
                Your Interpretation
              </p>
              {streamError ? (
                <p className="font-sans text-cream/60 text-base text-center">{streamError}</p>
              ) : (
                <div className="font-sans text-cream/80 text-base leading-relaxed space-y-4">
                  {interpretationText.split("\n\n").filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  {streaming && (
                    <span className="inline-block w-2 h-4 bg-coral animate-pulse ml-1" />
                  )}
                </div>
              )}
            </div>
          </section>

          {/* ── Your Path Forward ── */}
          <section className="bg-cream py-16 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-coral font-sans text-xs uppercase tracking-widest mb-4">
                Your Path Forward
              </p>
              <h2 className="font-serif text-navy text-2xl mb-4">
                {archetype.salonEntry.activity}
              </h2>
              <p className="font-sans text-navy/70 text-base leading-relaxed mb-6">
                {archetype.salonEntry.body}
              </p>
              <a
                href={archetype.salonEntry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-coral text-coral font-sans text-sm font-medium px-8 py-3 rounded-full hover:bg-coral hover:text-cream transition-colors"
              >
                {archetype.salonEntry.activity} →
              </a>
            </div>
          </section>

          {/* ── Dimension breakdown (collapsible) ── */}
          <section className="bg-navy py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <p className="text-coral font-sans text-xs uppercase tracking-widest mb-6 text-center">
                Dimension by Dimension
              </p>
              <div className="space-y-3">
                {dimensionOrder.map((dim) => {
                  const score = scores[dim];
                  const isOpen = expandedDims.has(dim);
                  return (
                    <div key={dim} className="border border-cream/10 rounded-lg bg-cream/[0.03]">
                      <button
                        onClick={() => toggleDim(dim)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <div>
                          <p className="font-sans text-sm uppercase tracking-widest text-coral font-medium">
                            {dimensionMeta[dim].label}
                          </p>
                          <p className="font-sans text-xs text-cream/40">
                            {dimensionMeta[dim].stage}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-serif text-2xl font-bold text-cream">
                            {score.toFixed(1)}
                          </p>
                          <ChevronDown
                            className={`w-4 h-4 text-cream/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="relative h-2 bg-cream/10 rounded-full mb-4 overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{
                                width: `${((score - 1) / 9) * 100}%`,
                                background: "linear-gradient(to right, hsl(70 10% 25%), hsl(145 25% 50%))",
                              }}
                            />
                          </div>
                          <p className="font-sans text-sm text-cream/60">
                            Score: {score.toFixed(1)} / 10
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          </div>{/* end reportRef */}

          {/* Secondary recommendations */}
          <section className="bg-cream py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <p className="text-coral font-sans text-xs uppercase tracking-widest mb-8 text-center">Also worth exploring</p>
              <div className="space-y-4">
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

          {/* Share + Download */}
          <section className="bg-navy py-16 px-6">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif text-cream text-2xl mb-3">Share your archetype.</h2>
              <p className="font-sans text-cream/50 text-sm mb-8">
                Your link goes to your full results. Social shares invite others to take the free assessment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleDownloadPDF}
                  disabled={generating}
                  className="bg-coral text-cream font-sans text-sm font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {generating ? "Generating…" : "Download PDF Report"}
                </button>
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
