import { ArrowDown, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const serviceCards = [
  {
    title: "General Building",
    desc: "Quality construction services for residential, commercial, and industrial projects with strong finishes and dependable solutions.",
    link: "/services",
  },
  {
    title: "Electrical Installation",
    desc: "Professional electrical installation and maintenance services ensuring safety, compliance, and reliable power distribution.",
    link: "/services",
  },
  {
    title: "Plumbing & HVAC",
    desc: "Comprehensive plumbing and HVAC solutions for new builds and existing properties, designed for efficiency and comfort.",
    link: "/services",
  },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Construction professionals at work" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      <div className="container relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-hero-fg leading-tight">
              Building, Maintenance &{" "}
              <span className="text-gradient-secondary">Installation Services</span>
            </h1>
            <motion.p
              className="font-heading text-sm font-semibold tracking-[0.2em] text-primary uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Sure Safety Limited
            </motion.p>
            <motion.p
              className="text-hero-muted text-lg max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              We deliver quality workmanship, strong finishes, and dependable solutions for residential, commercial, and industrial projects.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {["Quality Assured", "Innovation Driven", "Client Focused"].map((badge) => (
                <div key={badge} className="flex items-center space-x-2 text-hero-fg/90">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span className="font-medium text-sm">{badge}</span>
                </div>
              ))}
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold px-8">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-hero-muted/30 text-hero-fg hover:bg-hero-fg/10 font-heading font-semibold px-8">
                  Our Services
                </Button>
              </Link>
            </motion.div>
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 text-hero-muted hover:text-primary transition-colors pt-4 text-sm"
            >
              <ArrowDown className="w-4 h-4 animate-bounce" /> Scroll Down
            </button>
          </motion.div>

          <div className="hidden lg:flex gap-4">
            {serviceCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.5, ease: "easeOut" }}
                className="flex-1"
              >
                <Link
                  to={card.link}
                  className="group flex flex-col h-full bg-card/95 backdrop-blur-sm rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <div className="w-5 h-5 rounded-full bg-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-card-foreground mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{card.desc}</p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
