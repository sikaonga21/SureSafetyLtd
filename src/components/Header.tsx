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

const GridMenuIcon = ({ open }: { open: boolean }) => (
  <motion.div
    className="relative flex h-7 w-7 items-center justify-center"
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
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "border-b border-slate-200 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-none pl-0 pr-4 sm:container sm:mx-auto sm:px-6">
        <div className="flex h-28 items-center justify-between lg:h-32">
          <Link to="/" className="flex shrink-0 items-center -ml-12 sm:ml-0">
            <img
              src={logo}
              alt="Sure Safety Limited"
              className={`h-28 w-auto object-contain transition-all duration-500 md:h-24 ${
                isScrolled ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <Link
                  to={link.path}
                  className={`text-sm font-heading font-semibold uppercase tracking-[0.22em] transition-colors ${
                    location.pathname === link.path
                      ? isScrolled ? "text-slate-900" : "text-white"
                      : isScrolled ? "text-slate-700 hover:text-primary" : "text-white/90 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    location.pathname === link.path
                      ? "w-full bg-primary"
                      : "w-0 bg-primary group-hover:w-full"
                  }`}
                />
              </div>
            ))}
            <Link
              to="/quote"
              className={`border text-xs font-heading font-bold uppercase tracking-[0.2em] px-5 py-2.5 transition-all duration-300 ${
                isScrolled
                  ? "border-primary bg-primary text-black hover:bg-transparent hover:text-primary"
                  : "border-white bg-transparent text-white hover:bg-white hover:text-primary"
              }`}
            >
              Get Quote
            </Link>
          </nav>

          <button
            className={`lg:hidden p-2 ${isScrolled ? "text-slate-900" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <GridMenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-primary/95 backdrop-blur-sm"
          >
            <nav className="container mx-auto flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <Link
                    to={link.path}
                    className={`block border-b border-white/10 py-3 text-sm font-heading font-medium uppercase tracking-[0.2em] transition-colors ${
                      location.pathname === link.path ? "text-white" : "text-white/80 hover:text-white"
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
                  className="block border border-white px-6 py-3 text-center text-xs font-heading font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-primary"
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
