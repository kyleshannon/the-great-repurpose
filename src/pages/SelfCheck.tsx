import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import QuestionSlider from "@/components/selfcheck/QuestionSlider";
import StepDots from "@/components/selfcheck/StepDots";

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

const TOTAL_STEPS = questions.length + 1; // 7 slider questions + 1 open-ended

type Scores = Record<string, number>;

const SelfCheck = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Scores>(
    Object.fromEntries(questions.map((q) => [q.id, 5.5]))
  );
  const [openAnswer, setOpenAnswer] = useState("");
  const [touched, setTouched] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [animating, setAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpenEndedStep = currentQ === questions.length;

  // Trigger slide animation on question change
  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 350);
    return () => clearTimeout(timer);
  }, [currentQ]);

  const handleNext = () => {
    if (isOpenEndedStep) {
      // Final step — navigate to results
      const finalScores: Record<string, number> = {
        identity: (answers.q1 + answers.q2) / 2,
        value: (answers.q3 + answers.q2 * 0.5) / 1.5,
        purpose: (answers.q4 + answers.q5) / 2,
        ai_relationship: (answers.q6 + answers.q5 * 0.5) / 1.5,
        creative_action: answers.q7,
      };

      const params = new URLSearchParams({
        identity: finalScores.identity.toFixed(2),
        value: finalScores.value.toFixed(2),
        purpose: finalScores.purpose.toFixed(2),
        ai_relationship: finalScores.ai_relationship.toFixed(2),
        creative_action: finalScores.creative_action.toFixed(2),
        ...(openAnswer.trim() ? { open_answer: openAnswer.trim() } : {}),
      });

      navigate(`/results/preview?${params.toString()}`);
    } else if (currentQ < questions.length) {
      setSlideDirection("right");
      setCurrentQ((prev) => prev + 1);
      if (currentQ + 1 === questions.length) {
        // Open-ended step is always "touched" (optional)
        setTouched(true);
      } else {
        setTouched(false);
      }
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setSlideDirection("left");
      setCurrentQ((prev) => prev - 1);
      setTouched(true);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="min-h-screen bg-navy flex flex-col relative overflow-hidden">
      <Navigation />
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full text-cream/50 hover:text-cream hover:bg-cream/5 transition-all"
          aria-label={currentQ === 0 ? "Go home" : "Previous question"}
        >
          <ChevronLeft size={20} />
        </button>
        <StepDots total={TOTAL_STEPS} current={currentQ} />
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-2 pb-28">
        {/* Intro blurb on Q1 only */}
        {currentQ === 0 && (
          <div className="text-center mb-8 max-w-lg">
            <p className="text-coral font-sans text-xs uppercase tracking-widest mb-2">
              The Self-Check
            </p>
            <h1 className="font-serif text-cream text-2xl md:text-3xl leading-tight mb-2">
              Seven questions. A mirror, not a grade.
            </h1>
            <p className="font-sans text-cream/50 text-sm">
              Each question asks you to locate yourself between two true things. No right answers.
            </p>
          </div>
        )}

        {isOpenEndedStep ? (
          /* Open-ended question */
          <div
            key="open-ended"
            className={`w-full max-w-xl border border-cream/10 rounded-2xl bg-cream/[0.03] backdrop-blur-sm p-6 md:p-8 selfcheck-card-enter ${
              slideDirection === "right" ? "selfcheck-slide-right" : "selfcheck-slide-left"
            }`}
          >
            <p className="text-coral font-sans text-xs uppercase tracking-widest mb-4 text-center">
              One more thing
            </p>
            <p className="font-serif text-cream text-lg md:text-xl text-center mb-8 leading-snug">
              What's the thing you keep thinking about but haven't started yet?
            </p>
            <textarea
              value={openAnswer}
              onChange={(e) => setOpenAnswer(e.target.value)}
              placeholder="Optional — but it makes your results much more personal."
              className="w-full bg-navy border border-cream/20 text-cream placeholder:text-cream/30 rounded-lg px-4 py-3 font-sans text-base leading-relaxed focus:outline-none focus:border-coral transition-colors resize-none min-h-[120px]"
              rows={4}
            />
          </div>
        ) : (
          /* Slider question card */
          <div
            key={questions[currentQ].id}
            ref={contentRef}
            className={`w-full max-w-xl border border-cream/10 rounded-2xl bg-cream/[0.03] backdrop-blur-sm p-6 md:p-8 selfcheck-card-enter ${
              slideDirection === "right" ? "selfcheck-slide-right" : "selfcheck-slide-left"
            }`}
          >
            <p className="text-coral font-sans text-xs uppercase tracking-widest mb-4 text-center">
              {questions[currentQ].dimension}
            </p>
            <p className="font-serif text-cream text-lg md:text-xl italic text-center mb-8 leading-snug">
              "{questions[currentQ].context}"
            </p>
            <div className="mb-2">
              <div className="flex justify-between gap-4 md:gap-6 mb-5">
                <p className="font-sans text-cream/60 text-xs leading-snug text-left max-w-[48%] md:max-w-[45%]">
                  {questions[currentQ].left}
                </p>
                <p className="font-sans text-cream/60 text-xs leading-snug text-right max-w-[48%] md:max-w-[45%]">
                  {questions[currentQ].right}
                </p>
              </div>
              <QuestionSlider
                value={answers[questions[currentQ].id]}
                onChange={(v) =>
                  setAnswers((prev) => ({ ...prev, [questions[currentQ].id]: v }))
                }
                touched={touched}
                setTouched={setTouched}
                label={`${questions[currentQ].dimension}: ${questions[currentQ].context}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Fixed bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-navy/90 backdrop-blur-md border-t border-cream/5 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex justify-center">
        <button
          onClick={handleNext}
          disabled={!touched}
          className={`font-sans font-medium text-base px-10 py-3.5 rounded-full transition-all duration-300 w-full max-w-xs ${
            touched
              ? "bg-coral text-cream pulse-coral hover:opacity-90"
              : "bg-cream/10 text-cream/20 cursor-not-allowed"
          }`}
        >
          {isOpenEndedStep ? "Find Your TGR Type →" : "Next →"}
        </button>
      </div>
    </main>
  );
};

export default SelfCheck;
