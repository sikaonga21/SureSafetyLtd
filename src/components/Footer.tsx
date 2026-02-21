import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <motion.section
        className="bg-primary py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-4">
            Are you ready to grow your business?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:sales@neelkanth-middleeast.com"
              className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              sales@neelkanth-middleeast.com
            </a>
            <Link
              to="/contact"
              className="bg-primary-foreground text-primary px-6 py-2.5 rounded-md font-heading font-semibold hover:bg-primary-foreground/90 transition-colors text-sm"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </motion.section>

      <footer className="bg-section-dark py-16">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="mb-4">
                <span className="font-heading font-bold text-xl text-primary">NEELKANTH</span>
                <span className="font-heading text-[10px] tracking-[0.3em] font-semibold text-section-dark-fg/60 block">CABLES</span>
              </div>
              <p className="text-section-dark-fg/70 text-sm leading-relaxed">
                A pioneering force in cable manufacturing with a commitment to innovation and quality excellence.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-section-dark-fg mb-4 text-sm">Quick Links</h4>
              <nav className="flex flex-col gap-2">
                {[
                  { label: "Home", path: "/" },
                  { label: "About Us", path: "/about" },
                  { label: "Products", path: "/products" },
                  { label: "Quality", path: "/quality" },
                  { label: "Contact", path: "/contact" },
                ].map((l) => (
                  <Link key={l.path} to={l.path} className="text-section-dark-fg/60 hover:text-primary transition-colors text-sm">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-heading font-semibold text-section-dark-fg mb-4 text-sm">Products</h4>
              <nav className="flex flex-col gap-2">
                {["Low Voltage Cables", "Medium Voltage Cables", "Instrumentation Cables", "Solar Cables", "Conductors"].map((p) => (
                  <Link key={p} to="/products" className="text-section-dark-fg/60 hover:text-primary transition-colors text-sm">
                    {p}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-semibold text-section-dark-fg mb-4 text-sm">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-section-dark-fg/60 text-sm">Jebel Ali Industrial Area, Dubai, UAE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-section-dark-fg/60 text-sm">+971 4 886 5626</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-section-dark-fg/60 text-sm">sales@neelkanth-middleeast.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-section-dark-fg/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-section-dark-fg/40 text-sm">
              © {new Date().getFullYear()} Neelkanth Cables. All rights reserved.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-10 h-10 rounded-full border border-section-dark-fg/20 flex items-center justify-center text-section-dark-fg/40 hover:text-primary hover:border-primary transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
