import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/phases", label: "The Five Stages" },
    { to: "/types", label: "TGR Types" },
    { to: "/about", label: "About" },
  ];

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || location.pathname !== "/"
            ? "bg-navy shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-serif text-cream text-lg tracking-tight hover:opacity-80 transition-opacity">
            The Great Repurpose
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-cream/80 hover:text-cream text-xs uppercase tracking-widest font-sans transition-colors relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-coral group-hover:w-full transition-all duration-300" aria-hidden="true" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/selfcheck"
            className="hidden md:inline-flex items-center gap-2 bg-coral text-cream text-sm font-sans font-medium px-5 py-2.5 rounded-full pulse-coral hover:opacity-90 transition-opacity"
          >
            Find Your TGR Type →
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-cream p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div id="mobile-nav" role="dialog" aria-label="Mobile navigation" className="fixed inset-0 z-40 bg-navy flex flex-col items-center justify-center gap-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-cream text-2xl font-serif tracking-wide hover:text-coral transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/selfcheck"
            className="mt-4 bg-coral text-cream text-base font-sans font-medium px-8 py-3 rounded-full pulse-coral hover:opacity-90 transition-opacity"
          >
            Find Your TGR Type →
          </Link>
        </div>
      )}
    </>
  );
}
