import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";
import {
  fetchSignalIndex,
  formatSignalDate,
  type SignalIndexEntry,
} from "@/lib/signals";

export function SignalTeaser() {
  const [latest, setLatest] = useState<SignalIndexEntry | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchSignalIndex()
      .then((data) => {
        if (!cancelled && data.length > 0) setLatest(data[0]);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!latest) return null;

  return (
    <section className="bg-navy constellation-bg py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollFadeUp>
          <p className="font-sans text-coral text-xs uppercase tracking-widest font-medium mb-3">
            Latest Daily Signal · {formatSignalDate(latest.date)}
          </p>
          <Link
            to={`/signals/${latest.slug}`}
            className="group block rounded-lg border border-cream/10 bg-cream/[0.03] p-6 md:p-8 transition-colors hover:border-coral/60"
          >
            <div className="grid gap-6 md:grid-cols-[200px_1fr]">
              {latest.imageUrl ? (
                <img
                  src={latest.imageUrl}
                  alt=""
                  loading="lazy"
                  className="h-40 w-full rounded-md object-cover bg-cream/10"
                />
              ) : (
                <div className="hidden h-40 rounded-md bg-cream/10 md:block" />
              )}
              <div>
                <h3 className="font-serif text-cream text-2xl md:text-3xl leading-snug mb-3 group-hover:text-coral transition-colors">
                  {latest.title}
                </h3>
                {latest.pattern && (
                  <p className="font-sans text-cream/70 text-base leading-relaxed line-clamp-4">
                    {latest.pattern}
                  </p>
                )}
                <span className="inline-block mt-5 font-sans text-coral text-sm">
                  Read the briefing →
                </span>
              </div>
            </div>
          </Link>
          <div className="mt-6 text-center">
            <Link
              to="/signals"
              className="font-sans text-cream/60 text-sm hover:text-coral transition-colors"
            >
              Browse the full Daily Signal archive →
            </Link>
          </div>
        </ScrollFadeUp>
      </div>
    </section>
  );
}
