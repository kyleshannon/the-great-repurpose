import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  canonicalStages,
  fallbackSignalImage,
  fetchSignalIndex,
  formatSignalDate,
  type SignalIndexEntry,
} from "@/lib/signals";
import { getStageDefinition, getStagePath } from "@/lib/stages";

const PAGE_SIZE = 9;

const Signals = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const stageParam = searchParams.get("stage") ?? "All";
  const [selectedStage, setSelectedStage] = useState(stageParam);
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [signals, setSignals] = useState<SignalIndexEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedStage(stageParam);
  }, [stageParam]);

  useEffect(() => {
    let cancelled = false;
    fetchSignalIndex()
      .then((data) => {
        if (!cancelled) setSignals(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? "Failed to load Signals");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredSignals = useMemo(() => {
    if (!signals) return [];
    const filtered =
      selectedStage === "All"
        ? signals
        : signals.filter((s) => s.stages.includes(selectedStage));
    return [...filtered].sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [signals, selectedStage, sortDirection]);

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
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filteredSignals.length));
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredSignals.length, hasMore]);

  const handleStageClick = (stage: string) => {
    setSelectedStage(stage);
    const next = new URLSearchParams(searchParams);
    if (stage === "All") next.delete("stage");
    else next.set("stage", stage);
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="min-h-screen bg-navy text-cream">
      <Helmet>
        <title>Daily Signal — AI news through The Great Repurpose lens</title>
        <meta
          name="description"
          content="A daily five-story briefing reading the AI news through work, identity, value, purpose, capability, and human agency."
        />
        <link rel="canonical" href="https://thegreatrepurpose.com/signals" />
        <meta property="og:title" content="Daily Signal — AI news through The Great Repurpose lens" />
        <meta property="og:url" content="https://thegreatrepurpose.com/signals" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="A daily five-story briefing reading the AI news through work, identity, value, purpose, capability, and human agency."
        />
        <link rel="alternate" type="application/rss+xml" title="Daily Signal" href="/signals.xml" />
      </Helmet>
      <Navigation />
      <main id="main-content">
        <section className="bg-navy constellation-bg pt-32 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollFadeUp>
              <h1 className="font-serif text-cream text-4xl md:text-5xl leading-tight mb-5">
                The Daily Signal
              </h1>
              <p className="font-sans text-cream/70 text-lg md:text-xl leading-relaxed max-w-3xl">
                Five-story briefings that read the AI news through work, identity,
                value, purpose, capability, and human agency.
              </p>
            </ScrollFadeUp>
          </div>
        </section>

        <section className="bg-cream px-6 pt-10 pb-8">
          <div className="max-w-5xl mx-auto">
            <ScrollFadeUp>
              <div className="flex flex-col gap-6">
                <div className="flex justify-start md:justify-end">
                  <label className="font-sans text-navy/60 text-xs uppercase tracking-widest">
                    Sort by date
                    <select
                      value={sortDirection}
                      onChange={(e) => setSortDirection(e.target.value as "desc" | "asc")}
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
                        onClick={() => handleStageClick(stage)}
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

        <section className="bg-cream px-6 pb-12 pt-8 md:pb-16 md:pt-10">
          <div className="max-w-5xl mx-auto">
            {error ? (
              <div className="rounded-lg border border-navy/10 p-8 text-center">
                <p className="font-serif text-navy text-2xl mb-2">Couldn't load the Daily Signal</p>
                <p className="font-sans text-navy/60 text-base">{error}</p>
              </div>
            ) : !signals ? (
              <div className="rounded-lg border border-navy/10 p-8 text-center">
                <p className="font-sans text-navy/60 text-base">Loading the Daily Signal…</p>
              </div>
            ) : visibleSignals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleSignals.map((signal, index) => (
                  <ScrollFadeUp key={signal.slug} delay={(index % PAGE_SIZE) * 45}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-navy/[0.03] transition-colors hover:border-coral/70">
                      {signal.imageUrl && (
                        <div className="aspect-[16/10] overflow-hidden bg-navy/10">
                          <Link to={`/signals/${signal.slug}`} aria-label={`Read ${signal.title}`}>
                            <img
                              src={signal.imageUrl}
                              alt=""
                              loading="lazy"
                              onError={(event) => {
                                const image = event.currentTarget;
                                if (image.dataset.fallbackApplied === "true") return;
                                image.dataset.fallbackApplied = "true";
                                image.src = fallbackSignalImage;
                              }}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          </Link>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <Link to={`/signals/${signal.slug}`} className="block">
                          <p className="font-sans text-coral text-xs uppercase tracking-widest font-medium mb-3">
                            {formatSignalDate(signal.date)}
                          </p>
                          <h3 className="font-serif text-navy text-2xl leading-snug mb-4 transition-colors hover:text-coral">
                            {signal.title}
                          </h3>
                          {signal.pattern && (
                            <p className="font-sans text-navy/70 text-base leading-relaxed mb-5">
                              {signal.pattern}
                            </p>
                          )}
                        </Link>
                        <div className="mt-auto flex flex-wrap gap-2 pt-2">
                          {signal.stages.map((stage) => (
                            <Tooltip key={stage}>
                              <TooltipTrigger asChild>
                                <Link
                                  to={getStagePath(stage)}
                                  title={getStageDefinition(stage)}
                                  className="font-sans text-[10px] uppercase tracking-widest text-navy/55 border border-navy/15 rounded-full px-2.5 py-1 transition-colors hover:border-coral hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/70"
                                >
                                  {stage}
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs border-coral/30 bg-navy px-4 py-3 font-sans text-sm leading-relaxed text-cream">
                                {getStageDefinition(stage)}
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    </article>
                  </ScrollFadeUp>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-navy/10 p-8 text-center">
                <p className="font-serif text-navy text-2xl mb-2">No briefings found</p>
                <p className="font-sans text-navy/60 text-base">
                  Try a different stage filter or return to the full archive.
                </p>
              </div>
            )}

            {hasMore && <div ref={sentinelRef} className="h-16" aria-hidden="true" />}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Signals;
