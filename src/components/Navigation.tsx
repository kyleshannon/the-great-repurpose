import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Read session report URL
  useEffect(() => {
    const url = sessionStorage.getItem("tgr_report_url");
    setReportUrl(url);
  }, [location]);

  const navLinks = [
    { to: "/phases", label: "The Five Stages" },
    { to: "/types", label: "Profiles" },
    { to: "/academy", label: "Academy" },
    { to: "/signals", label: "Daily Signal" },
    { to: "/about", label: "About" },
  ];

  const isOnReportPage = reportUrl && location.pathname === reportUrl;
  const showReportLink = reportUrl && !isOnReportPage;

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-aubergine/60 backdrop-blur-sm shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3 lg:gap-6">
          {/* Logo */}
          <Link to="/" className="shrink-0 hover:opacity-80 transition-opacity">
            <img
              src={logoAsset.url}
              alt="The Great Repurpose"
              className="h-10 md:h-11 lg:h-12 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`${active ? "text-soft-white font-bold" : "text-soft-white/80 hover:text-soft-white font-sans"} text-[11px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-widest whitespace-nowrap transition-colors relative`}
                >
                  {label}
                  {active && (
                    <span
                      className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-aqua"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
            {showReportLink && (
              <Link
                to={reportUrl}
                className={`${location.pathname === reportUrl ? "text-soft-white font-bold" : "text-indigo hover:text-soft-white font-sans"} text-[11px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-widest whitespace-nowrap transition-colors relative`}
              >
                Your Report
                {location.pathname === reportUrl && (
                  <span
                    className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-aqua"
                    aria-hidden="true"
                  />
                )}
              </Link>
            )}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/selfcheck"
            className="hidden md:inline-flex items-center gap-2 shrink-0 whitespace-nowrap bg-aqua text-aubergine text-[11px] xl:text-sm font-sans font-semibold px-4 xl:px-5 py-2 xl:py-2.5 rounded-full pulse-aqua hover:opacity-90 transition-opacity"
          >
            Get Profile
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-soft-white p-1"
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
        <div id="mobile-nav" role="dialog" aria-label="Mobile navigation" className="fixed inset-0 z-40 bg-aubergine flex flex-col items-center justify-center gap-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-soft-white text-2xl font-display tracking-wide hover:text-indigo transition-colors"
            >
              {label}
            </Link>
          ))}
          {showReportLink && (
            <Link
              to={reportUrl}
              className="text-indigo text-2xl font-display tracking-wide hover:text-soft-white transition-colors"
            >
              Your Report
            </Link>
          )}
          <Link
            to="/selfcheck"
            className="mt-4 bg-aqua text-aubergine text-base font-sans font-semibold px-8 py-3 rounded-full pulse-aqua hover:opacity-90 transition-opacity"
          >
            Get Profile →
          </Link>
        </div>
      )}
    </>
  );
}
