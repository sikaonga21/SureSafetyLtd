import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "News", path: "/news" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

// Custom "grid-dots" burger — 6 dots (2×3) that morph to an X
const GridMenuIcon = ({ open }: { open: boolean }) => (
  <motion.div
    className="relative w-7 h-7 flex items-center justify-center"
    aria-hidden="true"
  >
    <AnimatePresence mode="wait">
      {open ? (
        <motion.svg
          key="close"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
          transition={{ duration: 0.25 }}
        >
          <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        </motion.svg>
      ) : (
        <motion.svg
          key="open"
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {/* 6 dots arranged 2 × 3 */}
          <circle cx="3" cy="3" r="2" fill="currentColor" />
          <circle cx="11" cy="3" r="2" fill="currentColor" />
          <circle cx="19" cy="3" r="2" fill="currentColor" />
          <circle cx="3" cy="15" r="2" fill="currentColor" />
          <circle cx="11" cy="15" r="2" fill="currentColor" />
          <circle cx="19" cy="15" r="2" fill="currentColor" />
        </motion.svg>
      )}
    </AnimatePresence>
  </motion.div>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="w-full max-w-none pl-0 pr-4 sm:container sm:mx-auto sm:px-6">
        <div className="flex items-center justify-between h-36">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 -ml-12 sm:ml-0">
            <img
              src={logo}
              alt="Sure Safety Limited"
              className={`h-36 md:h-32 w-auto object-contain transition-all duration-500 ${isScrolled ? "brightness-0 invert" : ""
                }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <Link
                  to={link.path}
                  className={`text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${location.pathname === link.path
                      ? "text-primary"
                      : "text-white hover:text-primary"
                    }`}
                >
                  {link.label}
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
            <Link
              to="/quote"
              className="border border-white text-white text-xs font-heading font-bold uppercase tracking-wider px-5 py-2 hover:bg-primary hover:border-primary hover:text-black transition-all duration-300"
            >
              Get Quote
            </Link>
          </nav>

          {/* Custom grid-dots mobile toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <GridMenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-black/95 backdrop-blur-sm overflow-hidden border-t border-white/10"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-3 text-sm font-heading font-medium uppercase tracking-wider border-b border-white/8 last:border-0 transition-colors ${location.pathname === link.path
                        ? "text-primary"
                        : "text-white/80 hover:text-primary"
                      }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.25 }}
                className="mt-4"
              >
                <Link
                  to="/quote"
                  className="block text-center border border-primary text-primary text-xs font-heading font-bold uppercase tracking-wider px-6 py-3 hover:bg-primary hover:text-black transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Quote
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
