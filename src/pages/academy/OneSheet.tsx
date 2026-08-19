import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface OneSheetProps {
  html: string;
  title: string;
  description: string;
  canonical: string;
}

/**
 * Renders a supplied one-sheet layout verbatim, with responsive overrides layered
 * on top so the fixed letter-size design reflows on smaller screens.
 */
export function OneSheet({ html, title, description, canonical }: OneSheetProps) {
  useEffect(() => {
    document.title = title;
    const setMeta = (selector: string, attr: string, value: string, create: () => HTMLElement) => {
      let el = document.head.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", description, () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    });
    setMeta('link[rel="canonical"]', "href", canonical, () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });
  }, [title, description, canonical]);

  return (
    <div className="onesheet-root">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600;700&display=swap"
      />
      <style>{`
        .onesheet-root { background:#010F32; }
        .onesheet-root doc-page, .onesheet-root .page { display:block; }
        .onesheet-root .page {
          max-width: 1040px;
          margin: 0 auto;
        }
        .onesheet-root img { max-width: 100%; }
        @media (max-width: 900px) {
          .onesheet-root .page > div { padding-left: 24px !important; padding-right: 24px !important; }
          .onesheet-root .page > div > div[style*="grid-template-columns:repeat(5,1fr)"],
          .onesheet-root .page > div > div[style*="grid-template-columns:repeat(4,1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .onesheet-root .page div[style*="grid-template-columns:1fr 1fr"],
          .onesheet-root .page ul[style*="grid-template-columns:1fr 1fr"],
          .onesheet-root .page div[style*="grid-template-columns:1.1fr 1fr"],
          .onesheet-root .page div[style*="grid-template-columns:auto 1fr auto"] {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .onesheet-root .page div[style*="column-count:3"] { column-count: 1 !important; }
          .onesheet-root .page div[style*="width: 714px"] { width: auto !important; height: auto !important; }
          .onesheet-root .page h1 { font-size: 40px !important; }
          .onesheet-root .page div[style*="height:352px"] { height: auto !important; min-height: 420px; }
          .onesheet-root .page div[style*="border-left:2px solid"] {
            border-left: none !important;
            border-top: 2px solid rgba(1,15,50,0.14) !important;
            padding-left: 0 !important;
            padding-top: 16px !important;
          }
        }
        @media (max-width: 560px) {
          .onesheet-root .page > div { padding-left: 18px !important; padding-right: 18px !important; }
          .onesheet-root .page h1 { font-size: 32px !important; }
          .onesheet-root .page div[style*="grid-template-columns:repeat(5,1fr)"] > img,
          .onesheet-root .page div[style*="grid-template-columns:repeat(5,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className="bg-aubergine text-center py-8">
        <Link
          to="/academy"
          className="font-sans text-aqua text-xs uppercase tracking-[0.2em] font-semibold hover:opacity-80 transition-opacity"
        >
          ← Back to TGR Academy
        </Link>
      </div>
    </div>
  );
}
