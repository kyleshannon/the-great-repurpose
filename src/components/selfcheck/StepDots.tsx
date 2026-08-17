interface StepDotsProps {
  total: number;
  current: number;
}

export default function StepDots({ total, current }: StepDotsProps) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label={`Question ${current + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? "w-2 h-2 bg-indigo"
              : i === current
              ? "w-2.5 h-2.5 bg-indigo glow-indigo-sm"
              : "w-2 h-2 bg-soft-white/20"
          }`}
        />
      ))}
    </div>
  );
}
