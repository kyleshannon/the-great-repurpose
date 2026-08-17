import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  fallbackSignalImage,
  fetchSignalIndex,
  formatSignalDate,
  type SignalIndexEntry,
} from "@/lib/signals";
import { getStageDefinition, getStagePath } from "@/lib/stages";

const PAGE_SIZE = 9;

const Signals = () => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [signals, setSignals] = useState<SignalIndexEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

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

  const sortedSignals = useMemo(() => {
    if (!signals) return [];
    return [...signals].sort((a, b) => b.date.localeCompare(a.date));
  }, [signals]);

  const visibleSignals = sortedSignals.slice(0, visibleCount);
  const hasMore = visibleCount < sortedSignals.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [signals]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, sortedSignals.length));
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sortedSignals.length, hasMore]);

  return (
    <div className="min-h-screen bg-aubergine text-soft-white">
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
        <section className="bg-aubergine constellation-bg pt-32 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollFadeUp>
              <h1 className="font-display text-soft-white text-4xl md:text-5xl leading-tight mb-5">
                The Daily Signal
              </h1>
              <p className="font-sans text-soft-white/70 text-lg md:text-xl leading-relaxed max-w-3xl">
                Five-story briefings that read the AI news through work, identity,
                value, purpose, capability, and human agency.
              </p>
            </ScrollFadeUp>
          </div>
        </section>

        <section className="bg-soft-white px-6 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            {error ? (
              <div className="rounded-lg border border-aubergine/10 p-8 text-center">
                <p className="font-display text-aubergine text-2xl mb-2">Couldn't load the Daily Signal</p>
                <p className="font-sans text-aubergine/60 text-base">{error}</p>
              </div>
            ) : !signals ? (
              <div className="rounded-lg border border-aubergine/10 p-8 text-center">
                <p className="font-sans text-aubergine/60 text-base">Loading the Daily Signal…</p>
              </div>
            ) : visibleSignals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleSignals.map((signal, index) => (
                  <ScrollFadeUp key={signal.slug} delay={(index % PAGE_SIZE) * 45}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-aubergine/10 bg-aubergine/[0.03] transition-colors hover:border-indigo/70">
                      {signal.imageUrl && (
                        <div className="aspect-[16/10] overflow-hidden bg-aubergine/10">
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
                          <p className="font-sans text-indigo text-xs uppercase tracking-widest font-medium mb-3">
                            {formatSignalDate(signal.date)}
                          </p>
                          <h3 className="font-display text-aubergine text-2xl leading-snug mb-4 transition-colors hover:text-indigo">
                            {signal.title}
                          </h3>
                          {signal.pattern && (
                            <p className="font-sans text-aubergine/70 text-base leading-relaxed mb-5">
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
                                  className="font-sans text-[10px] uppercase tracking-widest text-aubergine/55 border border-aubergine/15 rounded-full px-2.5 py-1 transition-colors hover:border-indigo hover:text-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/70"
                                >
                                  {stage}
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs border-indigo/30 bg-aubergine px-4 py-3 font-sans text-sm leading-relaxed text-soft-white">
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
              <div className="rounded-lg border border-aubergine/10 p-8 text-center">
                <p className="font-display text-aubergine text-2xl mb-2">No briefings found</p>
                <p className="font-sans text-aubergine/60 text-base">
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
