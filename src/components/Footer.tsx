import { Link } from "react-router-dom";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  Envelope,
  Phone,
  MapPin,
  ArrowUp,
} from "@phosphor-icons/react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <>
      {/* CTA strip — primary for color variety */}
      <section className="bg-secondary py-10">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-black text-center sm:text-left">
            Ready to start your next project?
          </h2>
          <Link
            to="/quote"
            className="bg-black text-white px-8 py-3 font-heading font-bold text-xs uppercase tracking-[0.2em] hover:bg-black/90 transition-colors shrink-0"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      <footer className="bg-section-dark text-white pt-20 pb-10 border-t border-white/10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Sure Safety Limited Logo"
                className="h-20 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed font-body max-w-xs">
              A leading construction and maintenance firm dedicated to excellence, innovation, and client satisfaction in every project we deliver.
            </p>
            <div className="flex items-center gap-3">
              {[FacebookLogo, InstagramLogo, LinkedinLogo].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all duration-300 text-white"
                >
                  <Icon className="w-4 h-4" weight="fill" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-[0.2em] mb-6">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Our Services", path: "/services" },
                { label: "Our Projects", path: "/projects" },
                { label: "Careers", path: "/careers" },
                { label: "News", path: "/news" },
                { label: "Contact Us", path: "/contact" },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="text-white/50 hover:text-primary transition-colors text-sm font-body">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-[0.2em] mb-6">Our Services</h4>
            <nav className="flex flex-col gap-3">
              {[
                "General Building",
                "Electrical Installation",
                "Plumbing & HVAC",
                "Road & Paving",
                "Facility Maintenance",
                "Interior Finishing",
              ].map((s) => (
                <Link key={s} to="/services" className="text-white/50 hover:text-primary transition-colors text-sm font-body">
                  {s}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-[0.2em] mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" weight="fill" />
                <span className="text-white/50 text-sm font-body">Lusaka, Zambia</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" weight="fill" />
                <a href="tel:+260211123456" className="text-white/50 text-sm font-body hover:text-primary transition-colors">
                  +260 211 123 456
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Envelope className="w-4 h-4 text-primary shrink-0" weight="fill" />
                <a href="mailto:info@suresafety.co.zm" className="text-white/50 text-sm font-body hover:text-primary transition-colors">
                  info@suresafety.co.zm
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-heading font-bold text-white text-xs uppercase tracking-[0.2em] mb-4">Working Hours</h4>
              <div className="space-y-1.5 text-sm text-white/50 font-body">
                <div className="flex justify-between gap-4"><span>Mon – Fri</span><span>08:00 – 17:00</span></div>
                <div className="flex justify-between gap-4"><span>Saturday</span><span>09:00 – 13:00</span></div>
                <div className="flex justify-between gap-4"><span>Sunday</span><span className="text-primary">Closed</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-body">
            © {new Date().getFullYear()} Sure Safety Limited. All rights reserved.
          </p>
          <p className="text-white/30 text-xs font-body">
            Created by{" "}
            <a href="https://sikaonga.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">
              Sikaonga
            </a>
            {" & "}
            <a href="https://wazama.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">
              Wazama
            </a>
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-9 h-9 bg-white/5 flex items-center justify-center text-white/50 hover:bg-primary hover:text-black transition-all"
          >
            <ArrowUp className="w-4 h-4" weight="bold" />
          </button>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
