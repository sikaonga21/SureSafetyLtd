import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-section-dark text-section-dark-fg text-sm">
        <div className="container flex justify-end items-center gap-6 py-2">
          <a href="tel:+260211123456" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5" /> +260 211 123 456
          </a>
          <a href="mailto:info@suresafety.co.zm" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail className="w-3.5 h-3.5" /> info@suresafety.co.zm
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-lg"
            : "bg-card"
          }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-bold text-lg tracking-tight text-primary">SURE SAFETY</span>
              <span className="font-heading text-[10px] tracking-[0.3em] font-semibold text-muted-foreground">LIMITED</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link to="/quote" className="hidden sm:block">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold text-xs px-5">
                Get Quote
              </Button>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-in slide-in-from-top-2 duration-200">
            <nav className="container flex flex-col py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-muted"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/quote" className="mt-2">
                <Button className="w-full bg-primary text-primary-foreground font-heading font-semibold">
                  Get Quote
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
