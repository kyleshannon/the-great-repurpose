import { useRef, useCallback } from "react";

interface QuestionSliderProps {
  value: number;
  onChange: (v: number) => void;
  touched: boolean;
  setTouched: (v: boolean) => void;
  label: string;
}

export default function QuestionSlider({
  value,
  onChange,
  touched,
  setTouched,
  label,
}: QuestionSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const calcValue = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const val = 1 + pct * 9;
      setTouched(true);
      onChange(Math.round(val * 10) / 10);
    },
    [onChange, setTouched]
  );

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
      className="relative w-full min-h-[56px] flex items-center cursor-pointer touch-none select-none"
    >
      {/* Track */}
      <div
        className="w-full h-2.5 rounded-full"
        style={{
          background: `linear-gradient(to right, hsl(var(--aubergine) / 0.4), hsl(var(--indigo) / 0.6))`,
        }}
      />
      {/* Thumb */}
      <div
        className="absolute w-6 h-6 rounded-full bg-indigo glow-indigo-sm pointer-events-none"
        style={{
          left: `calc(${pct}% - 12px)`,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
    </div>
  );
}
