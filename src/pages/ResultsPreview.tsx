import { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams, useNavigate, Link } from "react-router-dom";
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
import { matchArchetype, getArchetypeSlug, categories, type Scores, type Archetype } from "@/lib/archetypes";
import { generateReportPDF } from "@/lib/generateReport";

type DimensionKey = "identity" | "value" | "purpose" | "ai_relationship" | "creative_action";

const dimensionMeta: Record<DimensionKey, { label: string; stage: string }> = {
  identity:        { label: "Unhook Identity",     stage: "I'm not my job." },
  value:           { label: "Reclaim Value",       stage: "Here's Who I Am." },
  purpose:         { label: "Discover Purpose",    stage: "What matters to me." },
  ai_relationship: { label: "Become AI Ready",     stage: "Understand AI's power to amplify your ideas." },
  creative_action: { label: "Relaunch Yourself",   stage: "Turn who you are into work, opportunity, and income." },
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

// ── Render markdown sections ─────────────────────────────────────────────────

function InterpretationRenderer({ text, streaming }: { text: string; streaming: boolean }) {
  const sections: { title: string; body: string }[] = [];
  const parts = text.split(/^## /m);

  if (parts[0]?.trim()) {
    sections.push({ title: "", body: parts[0].trim() });
  }

  for (let i = 1; i < parts.length; i++) {
    const newlineIdx = parts[i].indexOf("\n");
    if (newlineIdx === -1) {
      sections.push({ title: parts[i].trim(), body: "" });
    } else {
      sections.push({
        title: parts[i].slice(0, newlineIdx).trim(),
        body: parts[i].slice(newlineIdx + 1).trim(),
      });
    }
  }

  if (sections.length === 0 && text.trim()) {
    sections.push({ title: "", body: text.trim() });
  }

  return (
    <div className="space-y-10">
      {sections.map((section, i) => (
        <div key={i}>
          {section.title && (
            <h3 className="text-indigo font-sans text-xs uppercase tracking-widest mb-4">
              {section.title}
            </h3>
          )}
          <div className="font-sans text-soft-white/80 text-base leading-relaxed space-y-4">
            {section.body.split("\n\n").filter(Boolean).map((para, j) => (
              <p key={j} dangerouslySetInnerHTML={{
                __html: para
                  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo hover:underline">$1</a>')
                  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
              }} />
            ))}
          </div>
        </div>
      ))}
      {streaming && (
        <span className="inline-block w-2 h-4 bg-indigo animate-pulse ml-1" />
      )}
    </div>
  );
}

// ── Progress indicator ───────────────────────────────────────────────────────

function GeneratingIndicator() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-indigo animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-indigo animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-indigo animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      <p className="font-sans text-soft-white/50 text-sm">Writing your report…</p>
    </div>
  );
}

// ── Streaming AI interpretation ──────────────────────────────────────────────

function useStreamInterpretation() {
  const [text, setText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const stream = async (scores: Record<DimensionKey, number>, archetype: Archetype, openAnswer?: string) => {
    setStreaming(true);
    setError(null);
    setText("");
    setDone(false);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-interpretation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ scores, archetype, openAnswer: openAnswer || "" }),
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
      let streamDone = false;

      while (!streamDone) {
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
          if (jsonStr === "[DONE]") { streamDone = true; break; }
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
      setDone(true);
      return fullText;
    } catch (e) {
      console.error("Stream error:", e);
      setError("Something went wrong generating your interpretation.");
      setStreaming(false);
      return "";
    }
  };

  return { text, streaming, error, done, stream };
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
    <div className="border border-soft-white/10 rounded-xl p-8 text-center bg-soft-white/[0.03]">
      <h2 className="font-display text-soft-white text-xl mb-2">Your full Great Repurpose Profile is ready.</h2>
      <p className="font-sans text-soft-white/50 text-sm mb-6 max-w-md mx-auto">
        We'll show you what your profile means, where you're strongest, what to watch out for — and the one thing that would help you most right now.
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
          className="flex-1 bg-aubergine border border-soft-white/20 text-soft-white placeholder:text-soft-white/40 rounded-lg px-4 py-3 font-sans text-base focus:outline-none focus:border-indigo transition-colors"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo text-soft-white font-sans font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 whitespace-nowrap"
        >
          {submitting ? "Saving..." : "Show Me →"}
        </button>
      </form>
      <p className="text-soft-white/40 text-xs mt-4 font-sans max-w-md mx-auto leading-relaxed">
        By submitting your email, you agree to receive emails from The AI Salon. You can unsubscribe at any time.
      </p>
    </div>
  );
}

// ── PDF Generator ────────────────────────────────────────────────────────────

// PDF generation moved to src/lib/generateReport.ts

// ── AI Salon activities data ─────────────────────────────────────────────────

const salonActivities = [
  { label: "Friday Office Hours", desc: "Show up, ask questions, meet others navigating the same shift. Low-pressure, high-value. Weekly.", href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet" },
  { label: "AI Learning Lab", desc: "Kyle Shannon's nightly LIVE sessions exploring AI, complete with Champ the Singing Dog — no prior experience required.", href: "https://aisalon.mn.co/spaces/12680384" },
  { label: "Mastermind Practice Lab", desc: "Peer-driven accountability for people creating a daily practice around how they use AI.", href: "https://aisalon.mn.co/spaces/21791897" },
  { label: "Learn Out Loud", desc: "LOL sessions are taught by community members for community members. Learn or lead!", href: "https://aisalon.mn.co/events/learn-out-loud" },
  { label: "Free AI Salon Community", desc: "The always-on conversation. Connect with others exploring AI and practicing the Cycle of AI Readiness.", href: "https://community.thesalon.ai" },
  { label: "AI Readiness Project Podcast", desc: "Conversations about what it means to be ready for AI, and a chance to meet inspiring people making a difference in AI.", href: "http://aireadinessproject.com/" },
];

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
  const [openAnswer, setOpenAnswer] = useState<string>("");
  const [expandedDims, setExpandedDims] = useState<Set<DimensionKey>>(new Set());
  const preGenStarted = useRef(false);

  const { text: streamedText, streaming, error: streamError, done: streamDone, stream } = useStreamInterpretation();

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
      setOpenAnswer(searchParams.get("open_answer") || "");
      return;
    }

    setLoading(true);
    (supabase.rpc as any)("get_selfcheck_result", { p_id: routeId })
      .then(({ data: rows, error }: any) => {
        const data = Array.isArray(rows) ? rows[0] : rows;
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
        // Save session link
        sessionStorage.setItem("tgr_report_url", `/results/${data.id}`);
        if ((data as any).open_answer) {
          setOpenAnswer((data as any).open_answer);
        }
        if ((data as any).ai_interpretation) {
          setCachedInterpretation((data as any).ai_interpretation);
        } else {
          // No cached interpretation — trigger fallback streaming
          const archetypeObj = matchArchetype(scoresToArchetypeInput(s));
          stream(s, archetypeObj, (data as any).open_answer || "");
        }
        setLoading(false);
      });
  }, [routeId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pre-generate AI interpretation as soon as scores are available (before email)
  useEffect(() => {
    if (scores && archetype && !routeId && !preGenStarted.current && !cachedInterpretation) {
      preGenStarted.current = true;
      stream(scores, archetype, openAnswer);
    }
  }, [scores, archetype]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save interpretation to DB once streaming finishes and we have a resultId.
  // Update is gated by the per-submission claim token stored in sessionStorage.
  useEffect(() => {
    if (streamDone && streamedText && resultId) {
      const token = sessionStorage.getItem(`tgr_token_${resultId}`);
      if (!token) return; // not the original submitter on this device
      (supabase.rpc as any)("set_selfcheck_interpretation", {
        p_id: resultId,
        p_token: token,
        p_interpretation: streamedText,
        p_archetype: archetype?.name ?? null,
      }).then(() => {});
    }
  }, [streamDone, resultId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading || !scores || !archetype) {
    return (
      <div className="min-h-screen bg-aubergine text-soft-white flex items-center justify-center">
        <p className="font-sans text-soft-white/50">Loading your results…</p>
      </div>
    );
  }

  const chartData = [
    { subject: "Unhook Identity", value: scores.identity, fullMark: 10 },
    { subject: "Reclaim Value", value: scores.value, fullMark: 10 },
    { subject: "Find Your Purpose", value: scores.purpose, fullMark: 10 },
     { subject: "Discover AI's Power", value: scores.ai_relationship, fullMark: 10 },
     { subject: "Start Creating", value: scores.creative_action, fullMark: 10 },
  ];

  const selfCheckUrl = `${window.location.origin}/selfcheck`;
  const resultUrl = resultId ? `${window.location.origin}/results/${resultId}` : null;
  const archetypeSlug = getArchetypeSlug(archetype);

  // Shareable summary text
  const shareText = `I'm ${archetype.name}. ${archetype.tagline}\n\nRecommended: ${archetype.salonEntry.activity}\n\nWhat's your Great Repurpose Profile? Find out at TheGreatRepurpose.com — a framework for people navigating the AI transition.`;

  const handleEmailSuccess = async (email: string) => {
    if (submitted) return;
    const lowestDim = getLowestDimension(scores);

    try {
      // Create the result via SECURITY DEFINER RPC, which validates input,
      // generates a private claim token, and returns id + token.
      const { data, error } = await (supabase.rpc as any)("create_selfcheck_result", {
        p_email: email,
        p_identity: scores.identity,
        p_value: scores.value,
        p_purpose: scores.purpose,
        p_ai_relationship: scores.ai_relationship,
        p_creative_action: scores.creative_action,
        p_lowest_dimension: lowestDim,
        p_archetype: archetype.name,
        p_open_answer: openAnswer || null,
        p_ai_interpretation: streamedText || null,
      });

      const row = Array.isArray(data) ? data[0] : data;

      if (!error && row?.id) {
        // Stash the claim token locally so only this browser session can
        // attach an interpretation to this row later.
        if (row.claim_token) {
          sessionStorage.setItem(`tgr_token_${row.id}`, row.claim_token);
        }
        setResultId(row.id);
        sessionStorage.setItem("tgr_report_url", `/results/${row.id}`);
        navigate(`/results/${row.id}`, { replace: true });
      }

      supabase.functions
        .invoke("subscribe-kit", {
          body: { email, lowest_dimension: lowestDim, archetype: archetypeSlug },
        })
        .catch((err) => console.warn("KIT subscribe failed:", err));

      supabase.functions
        .invoke("push-to-sheet", {
          body: {
            email,
            identity_score: scores.identity,
            value_score: scores.value,
            purpose_score: scores.purpose,
            ai_relationship_score: scores.ai_relationship,
            creative_action_score: scores.creative_action,
            lowest_dimension: lowestDim,
            archetype: archetype.name,
            open_answer: openAnswer || null,
          },
        })
        .catch((err) => console.warn("Sheet push failed:", err));
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
    const text = encodeURIComponent(shareText);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, "_blank");
  };

  const handleShareX = () => {
     const text = encodeURIComponent(
       `I'm ${archetype.name}. ${archetype.tagline} What's your Great Repurpose Profile? →`
     );
    const url = encodeURIComponent(selfCheckUrl);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleDownloadPDF = async () => {
    if (!scores || !archetype) return;
    setGenerating(true);
    try {
      const cat = categories[archetype.category];
      generateReportPDF({
        archetype,
        category: {
          label: cat.label,
          description: cat.description,
          isCapstone: archetype.category === "capstone",
        },
        scores,
        interpretation: interpretationText || "",
      });
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

  // Filter salon activities to exclude the primary recommendation
  const secondaryActivities = salonActivities.filter(
    (a) => a.label !== archetype.salonEntry.activity
  );

  return (
    <div className="min-h-screen bg-aubergine text-soft-white">
      <Navigation />
      <main id="main-content">

      {!submitted ? (
        /* ── Pre-email: simple prompt + email gate ── */
        <section className="bg-aubergine min-h-screen flex items-center justify-center px-4 md:px-6 pt-20 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-2xl mx-auto w-full text-center">
            <p className="text-indigo font-sans text-xs uppercase tracking-widest mb-3">
              Your Results
            </p>
            <h1 className="font-display text-soft-white text-4xl md:text-5xl mb-4">
              Your Great Repurpose Report is ready.
            </h1>
            <p className="font-sans text-soft-white/60 text-base mb-10">
              Enter your email to unlock your personalized report — including your Great Repurpose Profile, where you stand across the five dimensions, and what to do next.
            </p>

            <EmailGate onSuccess={handleEmailSuccess} />
          </div>
        </section>
      ) : (
        <>
          {/* ── PDF-capturable report section ── */}
          <div ref={reportRef}>

          {/* ── Archetype hero + radar ── */}
          <section className="bg-aubergine pt-20 md:pt-28 pb-8 md:pb-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-indigo font-sans text-xs uppercase tracking-widest mb-3">Your Great Repurpose Profile</p>
              {(() => {
                const cat = categories[archetype.category];
                const isAmplifier = archetype.category === "capstone";
                return (
                  <>
                    <h1 className="font-display text-soft-white text-3xl md:text-4xl leading-tight mb-3">
                      {isAmplifier ? (
                        <>You've made it through. <span className="block md:inline">Meet <em className="not-italic font-semibold">{archetype.name}</em>.</span></>
                      ) : (
                        <>You're a <span className="font-semibold">{cat.label}</span>. <span className="block md:inline">Specifically: <em className="not-italic font-semibold">{archetype.name}</em>.</span></>
                      )}
                    </h1>
                    <p className="font-sans text-soft-white/60 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-3">
                      {cat.description}
                    </p>
                    <p className="font-display text-soft-white/70 text-lg italic mb-10">
                      {archetype.tagline}
                    </p>
                  </>
                );
              })()}

              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={chartData}>
                  <PolarGrid stroke="hsl(40 25% 90% / 0.12)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "hsl(40 25% 90% / 0.7)", fontSize: 11, fontFamily: "Inter" }}
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
              <p className="text-soft-white/40 text-xs font-sans mt-2">Your shape across the five dimensions</p>
            </div>
          </section>


          {/* ── About this profile (static description) ── */}
          <section className="bg-aubergine py-12 md:py-16 px-6">
            <div className="max-w-2xl mx-auto">
              <p className="text-indigo font-sans text-xs uppercase tracking-widest mb-4">
                About {archetype.name}
              </p>
              <p className="font-sans text-soft-white/80 text-base leading-relaxed mb-4">
                {archetype.description}
              </p>
              <p className="font-sans text-soft-white/60 text-base leading-relaxed italic">
                {archetype.vulnerability}
              </p>
            </div>
          </section>

          {/* ── Primary recommendation (inside dark report) ── */}
          <section className="bg-aubergine py-12 md:py-16 px-6">
            <div className="max-w-2xl mx-auto">
              <div className="border border-soft-white/10 rounded-xl p-8 md:p-10 bg-soft-white/[0.03]">
                <p className="text-indigo font-sans text-xs uppercase tracking-widest mb-4">
                  Recommended for You
                </p>
                <h3 className="font-display text-soft-white text-xl md:text-2xl mb-3">
                  {archetype.salonEntry.activity}
                </h3>
                <p className="font-sans text-soft-white/60 text-base leading-relaxed mb-6">
                  {archetype.salonEntry.body}
                </p>
                <a
                  href={archetype.salonEntry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-indigo text-indigo font-sans text-sm font-medium px-8 py-3 rounded-full hover:bg-indigo hover:text-soft-white transition-colors"
                >
                  {archetype.salonEntry.activity} →
                </a>
              </div>
            </div>
          </section>

          {/* ── AI-Generated Narrative Report ── */}
          <section className="bg-aubergine py-12 md:py-16 px-6 border-t border-soft-white/5">
            <div className="max-w-2xl mx-auto">
              <p className="text-indigo font-sans text-xs uppercase tracking-widest mb-6">
                Your Personalized Report
              </p>

              {streamError ? (
                <p className="font-sans text-soft-white/60 text-base text-center">{streamError}</p>
              ) : !interpretationText && streaming ? (
                <GeneratingIndicator />
              ) : interpretationText ? (
                <>
                  {streaming && <GeneratingIndicator />}
                  <InterpretationRenderer text={interpretationText} streaming={streaming} />
                </>
              ) : (
                <GeneratingIndicator />
              )}
            </div>
          </section>

          {/* ── Dimension breakdown (collapsible) ── */}
          <section className="bg-aubergine py-12 px-6 border-t border-soft-white/5">
            <div className="max-w-4xl mx-auto">
              <p className="text-indigo font-sans text-xs uppercase tracking-widest mb-6 text-center">
                Dimension by Dimension
              </p>
              <div className="space-y-3">
                {dimensionOrder.map((dim) => {
                  const score = scores[dim];
                  const isOpen = expandedDims.has(dim);
                  return (
                    <div key={dim} className="border border-soft-white/10 rounded-lg bg-soft-white/[0.03]">
                      <button
                        onClick={() => toggleDim(dim)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <div>
                          <p className="font-sans text-sm uppercase tracking-widest text-indigo font-medium">
                            {dimensionMeta[dim].label}
                          </p>
                          <p className="font-sans text-xs text-soft-white/40">
                            {dimensionMeta[dim].stage}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-display text-2xl font-bold text-soft-white">
                            {score.toFixed(1)}
                          </p>
                          <ChevronDown
                            className={`w-4 h-4 text-soft-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="relative h-2 bg-soft-white/10 rounded-full mb-4 overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{
                                width: `${((score - 1) / 9) * 100}%`,
                                background: "linear-gradient(to right, hsl(70 10% 25%), hsl(145 25% 50%))",
                              }}
                            />
                          </div>
                          <p className="font-sans text-sm text-soft-white/60">
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


          {/* ── Secondary recommendations (light section) ── */}

          {/* Secondary recommendations with descriptions */}
          <section className="bg-soft-white py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <p className="font-sans text-aubergine/70 text-base leading-relaxed mb-4 text-center max-w-lg mx-auto">
                Making this transition on your own isn't the move. Here are some other ways to get involved with the AI Salon community.
              </p>
              <p className="text-indigo font-sans text-xs uppercase tracking-widest mb-8 text-center">Also worth exploring</p>
              <div className="space-y-4">
                {secondaryActivities.map(({ label, desc, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-aubergine/20 rounded-lg p-6 hover:border-indigo/40 transition-colors group"
                  >
                    <h3 className="font-display text-aubergine text-base mb-1 group-hover:text-indigo transition-colors">{label}</h3>
                    <p className="font-sans text-aubergine/60 text-sm">{desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Share + Download */}
          <section className="bg-aubergine py-16 px-6">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-display text-soft-white text-2xl mb-3">Share your Great Repurpose Profile.</h2>
              <p className="font-sans text-soft-white/50 text-sm mb-4 whitespace-pre-line max-w-md mx-auto">
                {shareText}
              </p>
               <Link to="/types" className="inline-block text-indigo font-sans text-sm hover:underline mb-8">
                 Explore all 10 Great Repurpose Profiles →
              </Link>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleDownloadPDF}
                  disabled={generating}
                  className="bg-indigo text-soft-white font-sans text-sm font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {generating ? "Generating…" : "Download PDF Report"}
                </button>
                {resultUrl && (
                  <button
                    onClick={handleCopyLink}
                    className="border border-soft-white/20 text-soft-white font-sans text-sm px-6 py-3 rounded-full hover:border-soft-white/60 transition-colors"
                  >
                    {copied ? "Copied ✓" : "Copy Link"}
                  </button>
                )}
                <button
                  onClick={handleShareLinkedIn}
                  className="border border-soft-white/20 text-soft-white font-sans text-sm px-6 py-3 rounded-full hover:border-soft-white/60 transition-colors"
                >
                  Share on LinkedIn
                </button>
                <button
                  onClick={handleShareX}
                  className="border border-soft-white/20 text-soft-white font-sans text-sm px-6 py-3 rounded-full hover:border-soft-white/60 transition-colors"
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
