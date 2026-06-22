import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";
import { canonicalStages, signals } from "@/data/signals";

const PAGE_SIZE = 9;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00Z`));

const Signals = () => {
  const [selectedStage, setSelectedStage] = useState("All");
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const filteredSignals = useMemo(() => {
    const filtered =
      selectedStage === "All"
        ? signals
        : signals.filter((signal) => signal.stages.includes(selectedStage));

    return [...filtered].sort((a, b) => {
      const comparison = a.date.localeCompare(b.date);
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [selectedStage, sortDirection]);

  const visibleSignals = filteredSignals.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSignals.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedStage, sortDirection]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) => Math.min(count + PAGE_SIZE, filteredSignals.length));
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredSignals.length, hasMore]);

  return (
    <div className="min-h-screen bg-navy text-cream">
      <Navigation />
      <main id="main-content">
        <section className="bg-navy constellation-bg pt-32 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollFadeUp>
              <h1 className="font-serif text-cream text-4xl md:text-5xl leading-tight mb-5">
                The Great Repurpose Signals
              </h1>
              <p className="font-sans text-cream/70 text-lg md:text-xl leading-relaxed max-w-3xl">
                Five-story briefings that read the AI news through work, identity,
                value, purpose, capability, and human agency.
              </p>
            </ScrollFadeUp>
          </div>
        </section>

        <section className="bg-cream py-12 px-6 border-b border-navy/10">
          <div className="max-w-5xl mx-auto">
            <ScrollFadeUp>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                  <div>
                    <h2 className="font-serif text-navy text-3xl md:text-4xl mb-3">
                      Signal Archive
                    </h2>
                    <p className="font-sans text-navy/65 text-base leading-relaxed max-w-2xl">
                      Browse the daily patterns and the stories behind them. Filter by
                      the TGR stage you want to study, or move through the archive by date.
                    </p>
                  </div>

                  <label className="font-sans text-navy/60 text-xs uppercase tracking-widest">
                    Sort by date
                    <select
                      value={sortDirection}
                      onChange={(event) => setSortDirection(event.target.value as "desc" | "asc")}
                      className="mt-2 block w-full md:w-48 rounded-md border border-navy/15 bg-cream px-3 py-2 text-sm normal-case tracking-normal text-navy"
                    >
                      <option value="desc">Newest first</option>
                      <option value="asc">Oldest first</option>
                    </select>
                  </label>
                </div>

                <div className="flex flex-wrap gap-2" aria-label="Filter by TGR stage">
                  {["All", ...canonicalStages].map((stage) => {
                    const active = selectedStage === stage;
                    return (
                      <button
                        key={stage}
                        type="button"
                        onClick={() => setSelectedStage(stage)}
                        className={`rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-widest transition-colors ${
                          active
                            ? "border-coral bg-coral text-cream"
                            : "border-navy/15 text-navy/65 hover:border-coral hover:text-coral"
                        }`}
                      >
                        {stage}
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollFadeUp>
          </div>
        </section>

        <section className="bg-cream px-6 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            {visibleSignals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleSignals.map((signal, index) => (
                  <ScrollFadeUp key={signal.slug} delay={(index % PAGE_SIZE) * 45}>
                    <Link
                      to={`/signals/${signal.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-navy/[0.03] transition-colors hover:border-coral/70"
                    >
                      {signal.imageUrl && (
                        <div className="aspect-[16/10] overflow-hidden bg-navy/10">
                          <img
                            src={signal.imageUrl}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="font-sans text-coral text-xs uppercase tracking-widest font-medium mb-3">
                          {formatDate(signal.date)}
                        </p>
                        <h3 className="font-serif text-navy text-2xl leading-snug mb-4 group-hover:text-coral transition-colors">
                          {signal.title}
                        </h3>
                        {signal.pattern && (
                          <p className="font-sans text-navy/70 text-base leading-relaxed mb-5">
                            {signal.pattern}
                          </p>
                        )}
                        <div className="mt-auto flex flex-wrap gap-2 pt-2">
                          {signal.stages.slice(0, 3).map((stage) => (
                            <span
                              key={stage}
                              className="font-sans text-[10px] uppercase tracking-widest text-navy/55 border border-navy/15 rounded-full px-2.5 py-1"
                            >
                              {stage}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </ScrollFadeUp>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-navy/10 p-8 text-center">
                <p className="font-serif text-navy text-2xl mb-2">No Signals found</p>
                <p className="font-sans text-navy/60 text-base">
                  Try a different stage filter or return to the full archive.
                </p>
              </div>
            )}

            {hasMore && (
              <div ref={sentinelRef} className="h-16" aria-hidden="true" />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Signals;
