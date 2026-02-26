import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, ShieldCheck, Star } from "@phosphor-icons/react";
import { useCountUp } from "@/hooks/use-count-up";

const pillars = [
  { icon: Target, title: "Our Vision", desc: "To be a leading force, recognized for excellence and innovation across Zambia." },
  { icon: Eye, title: "Our Mission", desc: "Exceptional services through quality, transparency, and innovation on every project." },
  { icon: Star, title: "Quality First", desc: "Setting industry benchmarks — no compromise on standards." },
  { icon: ShieldCheck, title: "Safety Rating", desc: "100% safety compliance record across all our site operations." },
];

const StatBox = ({ target, suffix, label }: { target: number; suffix: string; label: string }) => {
  const { ref, value } = useCountUp(target, 1800);
  return (
    <div ref={ref}>
      <p className="text-3xl font-heading font-bold text-primary">{value}{suffix}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">{label}</p>
    </div>
  );
};

const AboutSection = () => {
  return (
    <>
      {/* Pull Quote */}
      <motion.section
        className="py-16 md:py-20 bg-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="container">
          <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.3em] mb-6">
            Sure Safety Limited
          </p>
          <p className="text-foreground font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase leading-tight max-w-4xl">
            RELIABLE BUILDING, ELECTRICAL &amp; MAINTENANCE PARTNERS IN ZAMBIA.
          </p>
          <div className="w-16 h-0.5 bg-primary mt-8" />
          <p className="text-muted-foreground text-sm leading-relaxed font-body mt-8 max-w-xl">
            From new builds to complex refurbishments and long-term maintenance — we deliver safe, compliant and predictable outcomes for commercial, industrial and public-sector clients.
          </p>
        </div>
      </motion.section>

      {/* Image + Text split */}
      <section id="about" className="py-16 lg:py-24 bg-section-alt">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070"
                  alt="Sure Safety Team"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
              <motion.div
                className="absolute -bottom-5 -right-3 md:-right-6 bg-primary text-black px-6 py-3 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <p className="font-heading font-bold text-2xl">15+</p>
                <p className="text-xs font-heading font-semibold uppercase tracking-wider">Years of Excellence</p>
              </motion.div>
              <div className="absolute -bottom-3 left-0 flex gap-2 mt-4">
                <span className="w-2 h-2 bg-primary block" />
                <span className="w-2 h-2 bg-secondary block" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className="space-y-5 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="text-primary font-heading font-semibold text-xs tracking-[0.3em] uppercase">About Us</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase leading-tight">
                Sure Safety<br />Limited
              </h2>
              <div className="w-12 h-0.5 bg-primary" />
              <p className="text-muted-foreground leading-relaxed font-body text-sm">
                Sure Safety Limited is a premier construction and maintenance firm dedicated to delivering world-class solutions. We specialize in building, mechanical, and electrical services, ensuring every project meets the highest standards of safety and quality.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {pillars.map((h, i) => (
                  <motion.div
                    key={h.title}
                    className="space-y-1"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <h.icon className="w-3.5 h-3.5 text-primary shrink-0" weight="fill" />
                      <p className="font-heading font-bold text-foreground text-xs uppercase tracking-wider">{h.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-5 font-body">{h.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Count-up stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <StatBox target={500} suffix="+" label="Projects Completed" />
                <StatBox target={200} suffix="+" label="Happy Clients" />
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors group mt-2"
              >
                Work With Us <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" weight="bold" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
