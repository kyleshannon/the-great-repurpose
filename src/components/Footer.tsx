import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-aubergine constellation-bg" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left — Wordmark */}
        <div>
          <p className="font-display text-soft-white text-xl mb-2">The Great Repurpose</p>
          <p className="text-soft-white/50 text-sm font-sans mb-4">
            A movement for people whose careers are being rewritten by AI. Reclaim who you are beneath the title, become AI-ready on your own terms, and relaunch into work that actually matters.
          </p>
          <p className="text-soft-white/70 text-sm font-sans leading-tight">Reach out to learn more:</p>
          <a href="mailto:Possibility@TheGreatRepurpose.com" className="text-citrus hover:text-indigo text-sm font-sans transition-colors leading-tight">
            Possibility@TheGreatRepurpose.com
          </a>
        </div>

        {/* Right — Nav */}
        <nav aria-label="Footer navigation">
          <p className="text-soft-white/50 text-xs uppercase tracking-widest font-sans mb-4">Navigate</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
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
      </div>

      {/* Bottom bar */}
      <div className="border-t border-soft-white/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-soft-white/50 text-sm font-display italic">
            "It's not us versus AI. It's us AMPLIFIED by AI."
          </p>
          <p className="text-soft-white/30 text-xs font-sans">© 2026 The Great Repurpose</p>
        </div>
      </div>
    </footer>
  );
}
