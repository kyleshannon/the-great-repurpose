import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-navy constellation-bg" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left — Wordmark */}
        <div>
          <p className="font-serif text-cream text-xl mb-2">The Great Repurpose</p>
          <p className="text-cream/60 text-sm font-sans mb-1">A framework by Kyle Shannon</p>
          <p className="text-cream/50 text-sm font-sans">
            The Great Repurpose is the intellectual foundation of the AI Salon — a values-driven community for anyone curious about what generative AI makes possible.
          </p>
        </div>

        {/* Center — Nav */}
        <nav aria-label="Footer navigation">
          <p className="text-cream/50 text-xs uppercase tracking-widest font-sans mb-4">Navigate</p>
          <div className="flex flex-col gap-2">
            {[
              { to: "/", label: "Home" },
              { to: "/phases", label: "The Five Stages" },
              { to: "/about", label: "About" },
              { to: "/selfcheck", label: "Take the Free Self-Check" },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="text-cream/70 hover:text-coral text-sm font-sans transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right — Community */}
        <div>
          <p className="text-cream/40 text-xs uppercase tracking-widest font-sans mb-4">Community</p>
          <div className="flex flex-col gap-2">
            {[
              { href: "https://community.thesalon.ai", label: "The AI Salon" },
              { href: "http://aireadinessproject.com/", label: "The AI Readiness Project Podcast" },
              { href: "https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet", label: "Office Hours: Fridays" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-coral text-sm font-sans transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-cream/50 text-sm font-serif italic">
            "The future of AI is still up for grabs — join us."
          </p>
          <p className="text-cream/30 text-xs font-sans">© 2026 The Great Repurpose</p>
        </div>
      </div>
    </footer>
  );
}
