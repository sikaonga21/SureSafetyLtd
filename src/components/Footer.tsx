import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUp, Instagram, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

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
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">
            Ready to start your next project?
          </h2>
          <p className="text-primary-foreground/80 mb-6 text-sm">Consult with our experts for building and maintenance solutions.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:info@suresafety.co.zm"
              className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> info@suresafety.co.zm
            </a>
            <Link
              to="/quote"
              className="bg-primary-foreground text-primary px-8 py-3 rounded-xl font-heading font-bold hover:shadow-xl hover:shadow-black/10 transition-all text-sm uppercase tracking-wider"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </motion.section>

      <footer className="bg-slate-900 pt-20 pb-10 text-slate-300">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <Link to="/">
                <img src={logo} alt="Sure Safety Limited Logo" className="h-40 w-auto object-contain bg-white p-2 rounded-lg" />
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                A leading construction and maintenance firm dedicated to excellence, innovation, and client satisfaction in every project.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-white mb-6 text-sm uppercase tracking-widest">Navigation</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { label: "Home", path: "/" },
                  { label: "About Us", path: "/about" },
                  { label: "Our Services", path: "/services" },
                  { label: "Our Projects", path: "/projects" },
                  { label: "Careers", path: "/careers" },
                  { label: "Capabilities", path: "/capabilities" },
                  { label: "Contact Us", path: "/contact" },
                ].map((l) => (
                  <Link key={l.path} to={l.path} className="text-slate-400 hover:text-primary transition-colors text-sm font-medium">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-heading font-bold text-white mb-6 text-sm uppercase tracking-widest">Our Services</h4>
              <nav className="flex flex-col gap-3">
                {[
                  "General Building",
                  "Electrical Installation",
                  "Plumbing & HVAC",
                  "Road & Paving",
                  "Facility Maintenance",
                  "Interior Finishing",
                ].map((s) => (
                  <Link key={s} to="/services" className="text-slate-400 hover:text-primary transition-colors text-sm font-medium">
                    {s}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-bold text-white mb-6 text-sm uppercase tracking-widest">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-slate-400 text-sm">Lusaka, Zambia</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-slate-400 text-sm">+260 211 123 456</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-slate-400 text-sm">info@suresafety.co.zm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs font-medium">
              © {new Date().getFullYear()} Sure Safety Limited. All rights reserved.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-lg"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-sm text-white/90 font-medium">
              Created by{" "}
              <a href="https://sikaonga.vercel.app" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary underline underline-offset-2 transition-colors">Sikaonga</a>


            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
