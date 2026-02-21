import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const questions = [
  {
    id: "q1",
    dimension: "IDENTITY",
    context: "You're at a dinner party. Someone you just met asks: \"So, what do you do?\"",
    left: "I give my title and company. It's the most natural answer",
    right: "I end up talking about something I'm curious about or working on. My job title barely comes up",
  },
  {
    id: "q2",
    dimension: "IDENTITY + VALUE",
    context: "A colleague shows you something AI generated that looks a lot like your work.",
    left: "My stomach drops. I start scanning for what's wrong with it, hoping it's bad. If it's good, I feel worse",
    right: "I immediately see what's missing. There's a layer — taste, context, judgment — that I can point to and the tool can't",
  },
  {
    id: "q3",
    dimension: "VALUE CLARITY",
    context: "A friend asks you to help their kid with career advice. The kid wants to go into your field.",
    left: "I hesitate. I'm not sure what to tell them anymore. The field I entered doesn't exist the same way and I'd feel dishonest saying \"go for it\"",
    right: "I get excited. I'd tell them the skills that matter aren't the obvious ones — it's the eye, the judgment, the ability to see what others miss",
  },
  {
    id: "q4",
    dimension: "PURPOSE DIRECTION",
    context: "It's Saturday morning. Nothing is scheduled. You have the whole day.",
    left: "I feel a little lost. Without the structure of work, I'm not sure what pulls me. I'll probably scroll, clean, maybe start something I won't finish",
    right: "I know exactly what I'm doing. There's a project, a question, something I've been wanting to get to. The unstructured time is a gift",
  },
  {
    id: "q5",
    dimension: "PURPOSE + AI",
    context: "You just read that AI can now handle a major part of what people in your field do. Your first thought is:",
    left: "That's one more thing being taken away. I feel the walls closing in and I don't know where to go",
    right: "My mind immediately starts racing with what I could do if that task were off my plate. There's something I've been wanting to try",
  },
  {
    id: "q6",
    dimension: "AI RELATIONSHIP",
    context: "A friend hands you their laptop and says \"try this new AI tool — make something with it.\"",
    left: "I feel a knot in my stomach. I'd rather watch them use it. Or I'd try it but feel clumsy and quit after five minutes",
    right: "I take the laptop and lose track of time. Twenty minutes later I'm showing them something I made and asking \"what if we tried…\"",
  },
  {
    id: "q7",
    dimension: "CREATIVE ACTION",
    context: "Think about an idea you've had recently — something that excited you. Where is it right now?",
    left: "It's still in my head. I've been thinking about it, maybe researching, but I haven't started making anything. I'm not sure it's ready",
    right: "I've already made a rough version. It's messy but it exists. I showed someone. I'm iterating",
  },
];

type Scores = Record<string, number>;

function CustomSlider({
  value,
  onChange,
  touched,
  setTouched,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  touched: boolean;
  setTouched: (v: boolean) => void;
  label: string;
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newVal = value;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      newVal = Math.min(10, value + 0.5);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      newVal = Math.max(1, value - 0.5);
    } else if (e.key === "Home") {
      newVal = 1;
    } else if (e.key === "End") {
      newVal = 10;
    } else {
      return;
    }
    e.preventDefault();
    setTouched(true);
    onChange(Math.round(newVal * 10) / 10);
  };

  const pct = ((value - 1) / 9) * 100;

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label={label}
      aria-valuemin={1}
      aria-valuemax={10}
      aria-valuenow={Math.round(value)}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      className="relative w-full min-h-[44px] flex items-center cursor-pointer touch-none select-none"
    >
      {/* Track */}
      <div
        className="w-full h-2 rounded-full"
        style={{
          background: `linear-gradient(to right, hsl(145 25% 50%), hsl(40 25% 90%))`,
        }}
      />
      {/* Thumb */}
      <div
        className={`absolute w-5 h-5 rounded-full bg-coral pointer-events-none glow-coral-sm`}
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
      // Build final dimension scores per scoring spec:
      // Identity: (Q1 + Q2) / 2
      // Value: (Q3 + Q2*0.5) / 1.5
      // Purpose: (Q4 + Q5) / 2
      // AI Relationship: (Q6 + Q5*0.5) / 1.5
      // Creative Action: Q7
      const finalScores: Record<string, number> = {
        identity: (answers.q1 + answers.q2) / 2,
        value: (answers.q3 + answers.q2 * 0.5) / 1.5,
        purpose: (answers.q4 + answers.q5) / 2,
        ai_relationship: (answers.q6 + answers.q5 * 0.5) / 1.5,
        creative_action: answers.q7,
      };

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
      <main className="min-h-screen bg-navy constellation-bg flex flex-col items-center justify-center px-6 text-center relative">
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
          <p className="text-cream/50 text-sm font-sans">Takes about 2 minutes. No account required.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-navy constellation-bg flex flex-col">
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
        <span className="font-sans text-cream/50 text-xs uppercase tracking-widest">
          {currentQ + 1} of {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-0.5 bg-cream/10"
        role="progressbar"
        aria-valuenow={currentQ + 1}
        aria-valuemin={1}
        aria-valuemax={questions.length}
        aria-label={`Question ${currentQ + 1} of ${questions.length}`}
      >
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
                label={`${q.dimension}: ${q.context}`}
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
    </main>
  );
};

export default SelfCheck;
