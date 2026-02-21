import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const questions = [
  {
    id: "identity",
    dimension: "IDENTITY",
    context: "When you think about who you are...",
    left: "My sense of self is largely tied to my work and professional role",
    right: "My sense of self exists largely independent of my work and professional role",
  },
  {
    id: "identity_value",
    dimension: "IDENTITY + VALUE",
    context: "When AI can do something you used to do...",
    left: "I feel like that part of my value has been diminished or taken",
    right: "I feel like my value lives somewhere AI doesn't reach",
  },
  {
    id: "value_clarity",
    dimension: "VALUE CLARITY",
    context: "If someone asked what you uniquely bring...",
    left: "I would struggle to articulate it clearly",
    right: "I have a clear sense of what I uniquely contribute",
  },
  {
    id: "purpose_direction",
    dimension: "PURPOSE DIRECTION",
    context: "Right now, in terms of direction...",
    left: "I feel uncertain or unmoored about what I'm building toward",
    right: "I have a clear and motivating sense of where I'm headed",
  },
  {
    id: "purpose_ai",
    dimension: "PURPOSE + AI",
    context: "When you think about AI and your future...",
    left: "I mostly feel anxious or threatened",
    right: "I mostly feel curious or energized",
  },
  {
    id: "ai_relationship",
    dimension: "AI RELATIONSHIP",
    context: "Your current relationship with AI tools...",
    left: "I avoid them, or use them reluctantly and without confidence",
    right: "I engage with them actively, on my own terms",
  },
  {
    id: "creative_action",
    dimension: "CREATIVE ACTION",
    context: "When it comes to making things and sharing them...",
    left: "I'm mostly consuming or observing — not yet creating or contributing",
    right: "I'm actively making and sharing work, even imperfectly",
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    onChange(Number(e.target.value));
  };

  const pct = ((value - 1) / 9) * 100;

  return (
    <div className="relative w-full">
      <div className="relative h-2 rounded-full overflow-hidden mb-1" style={{
        background: `linear-gradient(to right, hsl(21 89% 54%), hsl(207 79% 87%))`
      }}>
        <div className="absolute inset-0 opacity-30 bg-foreground/10" />
      </div>
      <input
        type="range"
        min={1}
        max={10}
        step={0.1}
        value={value}
        onChange={handleChange}
        className="absolute inset-y-0 w-full opacity-0 cursor-pointer h-4 -mt-3"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
      {/* Track visual */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full overflow-hidden pointer-events-none">
        <div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(to right, hsl(21 89% 54%), hsl(207 79% 87%))`,
          }}
        />
      </div>
      {/* Thumb */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-coral pointer-events-none transition-all duration-150 ${
          touched ? "opacity-100 glow-coral-sm" : "opacity-0"
        }`}
        style={{ left: `calc(${pct}% - 10px)` }}
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
