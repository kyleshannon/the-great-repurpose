import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ExternalLink } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollFadeUp } from "@/components/ScrollFadeUp";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  fallbackSignalImage,
  fetchSignal,
  fetchSignalIndex,
  formatSignalDate,
  type SignalIndexEntry,
  type TgrSignal,
} from "@/lib/signals";
import { getStageDefinition, getStagePath } from "@/lib/stages";

const SignalDetail = () => {
  const { slug } = useParams();
  const [signal, setSignal] = useState<TgrSignal | null | undefined>(undefined);
  const [index, setIndex] = useState<SignalIndexEntry[]>([]);

  useEffect(() => {
    if (!slug) return;
    setSignal(undefined);
    let cancelled = false;
    Promise.all([fetchSignal(slug), fetchSignalIndex().catch(() => [])])
      .then(([s, idx]) => {
        if (cancelled) return;
        setSignal(s);
        setIndex(idx);
      })
      .catch(() => {
        if (!cancelled) setSignal(null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (signal === undefined) {
    return (
      <div className="min-h-screen bg-navy text-cream">
        <Navigation />
        <main id="main-content" className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="font-sans text-cream/60">Loading Signal…</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!signal) {
    return (
      <div className="min-h-screen bg-navy text-cream">
        <Helmet>
          <title>Signal not found — Daily Signal</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Navigation />
        <main id="main-content" className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-cream text-4xl mb-4">Signal not found</h1>
            <Link to="/signals" className="text-coral hover:underline font-sans">
              Return to the Daily Signal archive
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = index
    .filter((item) => item.slug !== signal.slug)
    .filter((item) => item.stages.some((stage) => signal.stages.includes(stage)))
    .slice(0, 3);

  const canonical = `https://thegreatrepurpose.com/signals/${signal.slug}`;
  const description =
    signal.pattern?.slice(0, 200) ||
    `A five-story Daily Signal briefing from ${formatSignalDate(signal.date)}.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: signal.title,
    datePublished: signal.date,
    image: signal.imageUrl ? [signal.imageUrl] : undefined,
    description,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "The Great Repurpose" },
  };

  return (
    <div className="min-h-screen bg-navy text-cream">
      <Helmet>
        <title>{signal.title} — Daily Signal</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${signal.title} — Daily Signal`} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={description} />
        {signal.imageUrl && <meta property="og:image" content={signal.imageUrl} />}
        <meta property="article:published_time" content={signal.date} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Navigation />
      <main id="main-content">
        <article>
          <section className="bg-navy constellation-bg pt-32 pb-16 px-6">
            <div className="max-w-4xl mx-auto">
              <ScrollFadeUp>
                <Link
                  to="/signals"
                  className="font-sans text-coral text-xs uppercase tracking-widest font-medium hover:underline"
                >
                  Daily Signal
                </Link>
                <h1 className="font-serif text-cream text-4xl md:text-5xl leading-tight mt-5 mb-5">
                  {signal.title}
                </h1>
                <p className="font-sans text-cream/60 text-base">
                  {formatSignalDate(signal.date, { weekday: "long" })}
                </p>
              </ScrollFadeUp>
            </div>
          </section>

          <section className="bg-cream py-14 md:py-20 px-6">
            <div className="max-w-4xl mx-auto">
              {signal.pattern && (
                <ScrollFadeUp>
                  <p className="font-sans text-coral text-xs uppercase tracking-widest font-medium mb-4">
                    Pattern of the Day
                  </p>
                  <blockquote className="border-l-4 border-coral bg-navy/5 pl-6 pr-6 py-5 mb-12 rounded-r-lg">
                    <p className="font-serif text-navy text-2xl italic leading-relaxed">
                      {signal.pattern}
                    </p>
                  </blockquote>
                </ScrollFadeUp>
              )}

              {signal.stages.length > 0 && (
                <ScrollFadeUp delay={80}>
                  <div className="mb-12 flex flex-wrap gap-2">
                    {signal.stages.map((stage) => (
                      <Tooltip key={stage}>
                        <TooltipTrigger asChild>
                          <Link
                            to={getStagePath(stage)}
                            title={getStageDefinition(stage)}
                            className="font-sans text-xs uppercase tracking-widest text-navy/65 border border-navy/15 rounded-full px-3 py-1 hover:border-coral hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/70 transition-colors"
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
                </ScrollFadeUp>
              )}

              <ScrollFadeUp delay={120}>
                <h2 className="font-serif text-navy text-3xl mb-8">Five Stories</h2>
              </ScrollFadeUp>

              <div className="space-y-8">
                {signal.stories.map((story, index) => (
                  <ScrollFadeUp key={`${story.url}-${index}`} delay={(index % 5) * 60}>
                    <div className="group rounded-lg border border-navy/10 bg-navy/[0.03] p-5 transition-colors hover:border-coral/70">
                      <div className="grid gap-5 md:grid-cols-[180px_1fr]">
                        <a
                          href={story.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Read source article: ${story.title}`}
                        >
                          <img
                            src={story.imageUrl || fallbackSignalImage}
                            alt=""
                            loading="lazy"
                            onError={(event) => {
                              const image = event.currentTarget;
                              if (image.dataset.fallbackApplied === "true") return;
                              image.dataset.fallbackApplied = "true";
                              image.src = fallbackSignalImage;
                            }}
                            className="h-36 w-full rounded-md object-cover bg-navy/10 transition-opacity hover:opacity-90"
                          />
                        </a>
                        <div>
                          <p className="font-sans text-coral text-xs uppercase tracking-widest font-medium mb-2">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <a href={story.url} target="_blank" rel="noopener noreferrer">
                            <h3 className="font-serif text-navy text-xl md:text-2xl leading-snug mb-2 hover:text-coral transition-colors">
                              {story.title}
                            </h3>
                          </a>
                          <p className="font-sans text-navy/45 text-sm mb-3">{story.source}</p>
                          {story.summary && (
                            <p className="font-sans text-navy/70 text-base leading-relaxed mb-4">
                              {story.summary}
                            </p>
                          )}
                          {story.keyPoints.length > 0 && (
                            <ul className="font-sans text-navy/65 text-sm leading-relaxed space-y-1 mb-4 list-disc pl-5">
                              {story.keyPoints.map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          )}
                          {story.stages.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                              {story.stages.map((stage) => (
                                <Tooltip key={stage}>
                                  <TooltipTrigger asChild>
                                    <Link
                                      to={getStagePath(stage)}
                                      title={getStageDefinition(stage)}
                                      className="font-sans text-[10px] uppercase tracking-widest text-navy/55 border border-navy/15 rounded-full px-2.5 py-1 hover:border-coral hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/70 transition-colors"
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
                          )}
                          <a
                            href={story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-sans text-sm text-coral hover:underline"
                          >
                            Read source <ExternalLink size={14} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </ScrollFadeUp>
                ))}
              </div>
            </div>
          </section>
        </article>

        {related.length > 0 && (
          <section className="bg-navy constellation-bg py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <ScrollFadeUp>
                <h2 className="font-serif text-cream text-2xl md:text-3xl mb-8">
                  Related Briefings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/signals/${item.slug}`}
                      className="border border-cream/10 rounded-lg p-5 hover:border-coral/60 transition-colors bg-cream/[0.03]"
                    >
                      <p className="font-sans text-coral text-xs uppercase tracking-widest font-medium mb-3">
                        {formatSignalDate(item.date)}
                      </p>
                      <h3 className="font-serif text-cream text-lg leading-snug">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </ScrollFadeUp>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SignalDetail;
