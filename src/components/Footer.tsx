import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-aubergine constellation-bg" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left — Wordmark */}
        <div>
          <p className="font-display text-soft-white text-xl mb-2">The Great Repurpose</p>
          <p className="text-soft-white/60 text-sm font-sans mb-1">By Kyle Shannon</p>
          <p className="text-soft-white/50 text-sm font-sans">
            The Great Repurpose puts a name to what's happening to work — and offers a path through it. A framework, an assessment, and an academy for people whose careers are being rewritten by AI.
          </p>
        </div>

        {/* Center — Nav */}
        <nav aria-label="Footer navigation">
          <p className="text-soft-white/50 text-xs uppercase tracking-widest font-sans mb-4">Navigate</p>
          <div className="flex flex-col gap-2">
            {[
              { to: "/", label: "Home" },
              { to: "/phases", label: "The Five Stages" },
              { to: "/types", label: "Great Repurpose Profiles" },
              { to: "/academy", label: "TGR Academy" },
              { to: "/signals", label: "Daily Signal" },
              { to: "/about", label: "About" },
              { to: "/selfcheck", label: "What's Your Repurpose Profile?" },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="text-soft-white/70 hover:text-indigo text-sm font-sans transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right — Community */}
        <div>
          <p className="text-soft-white/40 text-xs uppercase tracking-widest font-sans mb-4">Community</p>
          <div className="flex flex-col gap-2">
            {[
              { href: "https://community.thesalon.ai", label: "Community.theSalon.ai" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-soft-white/70 hover:text-indigo text-sm font-sans transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-soft-white/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-soft-white/50 text-sm font-display italic">
            "The future of AI is still up for grabs — join us."
          </p>
          <p className="text-soft-white/30 text-xs font-sans">© 2026 The Great Repurpose</p>
        </div>
      </div>
    </footer>
  );
}
