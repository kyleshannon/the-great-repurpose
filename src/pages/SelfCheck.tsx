import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const questions = [
  {
    id: "identity",
    dimension: "IDENTITY",
    context: "Imagine your job title disappeared tomorrow...",
    left: "I'd feel lost — that title is a big part of how I see myself",
    right: "I'd be fine — who I am doesn't really live in a title",
  },
  {
    id: "identity_value",
    dimension: "IDENTITY + VALUE",
    context: "A tool just did in seconds what used to take you hours...",
    left: "Honestly? It stings a little",
    right: "Interesting — my real value was never in that task",
  },
  {
    id: "value_clarity",
    dimension: "VALUE CLARITY",
    context: "A friend introduces you at a dinner party...",
    left: "I'd fumble for what to say beyond my job",
    right: "I know exactly what I'd want them to say about me",
  },
  {
    id: "purpose_direction",
    dimension: "PURPOSE DIRECTION",
    context: "You have a free Saturday with no obligations...",
    left: "I'd probably drift — I'm not sure what I'm building toward",
    right: "I know exactly what I'd spend it on",
  },
  {
    id: "purpose_ai",
    dimension: "PURPOSE + AI",
    context: "You read a headline: 'AI will reshape every industry by 2030'...",
    left: "My stomach drops a little",
    right: "I lean in — I want to know more",
  },
  {
    id: "ai_relationship",
    dimension: "AI RELATIONSHIP",
    context: "Someone hands you a new AI tool and says 'try this'...",
    left: "I'd put it off or feel overwhelmed",
    right: "I'd be tinkering with it within the hour",
  },
  {
    id: "creative_action",
    dimension: "CREATIVE ACTION",
    context: "Think about the last month...",
    left: "I mostly consumed other people's ideas",
    right: "I made something and put it out there, even if it wasn't perfect",
  },
];

// Score maps: identity Q1 maps to identity_score, Q2 also maps to identity (averaged with value)
// We'll map them explicitly
const dimensionMap: Record<string, string> = {
  identity: "identity",
  identity_value: "value",
  value_clarity: "value",
  purpose_direction: "purpose",
  purpose_ai: "purpose",
  ai_relationship: "ai_relationship",
  creative_action: "creative_action",
};

type Scores = Record<string, number>;

function CustomSlider({
  value,
  onChange,
  touched,
  setTouched,
}: {
  value: number;
  onChange: (v: number) => void;
  touched: boolean;
  setTouched: (v: boolean) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const calcValue = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const val = 1 + pct * 9;
    setTouched(true);
    onChange(Math.round(val * 10) / 10);
  }, [onChange, setTouched]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    calcValue(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    calcValue(e.clientX);
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  const pct = ((value - 1) / 9) * 100;

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full min-h-[44px] flex items-center cursor-pointer touch-none select-none"
    >
      {/* Track */}
      <div
        className="w-full h-2 rounded-full"
        style={{
          background: `linear-gradient(to right, hsl(21 89% 54%), hsl(207 79% 87%))`,
        }}
      />
      {/* Thumb */}
      <div
        className={`absolute w-5 h-5 rounded-full bg-coral pointer-events-none transition-opacity duration-150 ${
          touched ? "opacity-100 glow-coral-sm" : "opacity-0"
        }`}
        style={{ left: `calc(${pct}% - 10px)`, top: "50%", transform: "translateY(-50%)" }}
      />
    </div>
  );
}

const SelfCheck = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<"entry" | "question" | "done">("entry");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Scores>(
    Object.fromEntries(questions.map((q) => [q.id, 5]))
  );
  const [touched, setTouched] = useState(false);

  const q = questions[currentQ];

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setTouched(false);
    } else {
      // Build final dimension scores
      const dimTotals: Record<string, number[]> = {
        identity: [],
        value: [],
        purpose: [],
        ai_relationship: [],
        creative_action: [],
      };

      questions.forEach((q) => {
        const dim = dimensionMap[q.id];
        dimTotals[dim].push(answers[q.id]);
      });

      const finalScores: Record<string, number> = {};
      for (const [dim, vals] of Object.entries(dimTotals)) {
        finalScores[dim] = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 5;
      }

      // Encode scores to query params and navigate to results
      const params = new URLSearchParams({
        identity: finalScores.identity.toFixed(2),
        value: finalScores.value.toFixed(2),
        purpose: finalScores.purpose.toFixed(2),
        ai_relationship: finalScores.ai_relationship.toFixed(2),
        creative_action: finalScores.creative_action.toFixed(2),
      });

      navigate(`/results/preview?${params.toString()}`);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1);
      setTouched(true);
    } else {
      setScreen("entry");
    }
  };

  if (screen === "entry") {
    return (
      <div className="min-h-screen bg-navy constellation-bg flex flex-col items-center justify-center px-6 text-center relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-cream/50 hover:text-cream transition-colors flex items-center gap-1 text-sm font-sans"
        >
          <ChevronLeft size={16} />
          Home
        </button>
        <div className="max-w-xl mx-auto">
          <p className="text-coral font-sans text-xs uppercase tracking-widest mb-6">The Self-Check</p>
          <h1 className="font-serif text-cream text-4xl md:text-5xl leading-tight mb-6">
            Seven questions.<br />A mirror, not a grade.
          </h1>
          <p className="font-sans text-cream/70 text-lg leading-relaxed mb-4">
            Each question asks you to locate yourself between two true things. There are no right answers.
          </p>
          <p className="font-sans text-cream/50 text-base italic mb-10">
            The questions map five dimensions: Identity, Value, Purpose, AI Relationship, and Creative Action. Your answers generate a personal profile — a shape that shows where you are right now.
          </p>
          <button
            onClick={() => setScreen("question")}
            className="inline-block bg-coral text-cream font-sans font-medium text-lg px-10 py-4 rounded-full pulse-coral hover:opacity-90 transition-opacity mb-4"
          >
            Begin →
          </button>
          <p className="text-cream/30 text-sm font-sans">Takes about 2 minutes. No account required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy constellation-bg flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-cream/50 hover:text-cream transition-colors flex items-center gap-1 text-sm font-sans"
          >
            <ChevronLeft size={16} />
            Home
          </button>
          <button
            onClick={handleBack}
            className="text-cream/50 hover:text-cream transition-colors text-sm font-sans"
          >
            Back
          </button>
        </div>
        <span className="font-sans text-cream/40 text-xs uppercase tracking-widest">
          {currentQ + 1} of {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-0.5 bg-cream/10">
        <div
          className="h-full bg-coral transition-all duration-500"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto w-full">
          {/* Dimension label */}
          <p className="text-coral font-sans text-xs uppercase tracking-widest mb-4 text-center">
            {q.dimension}
          </p>

          {/* Context */}
          <p className="font-serif text-cream text-xl md:text-2xl italic text-center mb-12 leading-snug">
            "{q.context}"
          </p>

          {/* Slider area */}
          <div className="mb-6">
            <div className="flex justify-between gap-8 mb-6">
              <p className="font-sans text-cream/60 text-sm leading-snug text-left max-w-[45%]">{q.left}</p>
              <p className="font-sans text-cream/60 text-sm leading-snug text-right max-w-[45%]">{q.right}</p>
            </div>
            <div className="relative py-4">
              <CustomSlider
                value={answers[q.id]}
                onChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
                touched={touched}
                setTouched={setTouched}
              />
            </div>
          </div>

          {/* Next button — only after slider touched */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleNext}
              disabled={!touched}
              className={`font-sans font-medium text-base px-8 py-3 rounded-full transition-all duration-300 ${
                touched
                  ? "bg-coral text-cream pulse-coral hover:opacity-90"
                  : "bg-cream/10 text-cream/20 cursor-not-allowed"
              }`}
            >
              {currentQ === questions.length - 1 ? "See my results →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfCheck;
