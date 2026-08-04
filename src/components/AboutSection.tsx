import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, ShieldCheck, Star } from "@phosphor-icons/react";
import { useCountUp } from "@/hooks/use-count-up";
import { portfolioFeatured } from "@/data/portfolioImages";

const pillars = [
  { icon: Target, title: "Our Vision", desc: "To be a leading force, recognized for excellence and innovation across Zambia." },
  { icon: Eye, title: "Our Mission", desc: "Exceptional services through quality, transparency, and innovation on every project." },
  { icon: Star, title: "Quality First", desc: "Setting industry benchmarks — no compromise on standards." },
  { icon: ShieldCheck, title: "Safety Rating", desc: "100% safety compliance record across all our site operations." },
];

const StatBox = ({ target, suffix, label }: { target: number; suffix: string; label: string }) => {
  const { ref, value } = useCountUp(target, 1800);
  return (
    <div ref={ref} className="min-w-[140px] rounded-2xl border border-border bg-white p-4 shadow-sm">
      <p className="text-3xl font-heading font-bold text-primary">{value}{suffix}</p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">{label}</p>
    </div>
  );
};

const AboutSection = () => {
  return (
    <>
      <motion.section
        className="bg-card py-16 md:py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="container">
          <p className="mb-6 text-xs font-heading font-semibold uppercase tracking-[0.35em] text-primary">
            Sure Safety Limited
          </p>
          <p className="max-w-5xl text-2xl font-heading font-bold uppercase leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Reliable building, electrical and maintenance partners in Zambia.
          </p>
          <div className="mt-8 h-0.5 w-16 bg-primary" />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            From new builds to complex refurbishments and long-term maintenance, we deliver safe, compliant and predictable outcomes for commercial, industrial and public-sector clients.
          </p>
        </div>
      </motion.section>

      <section id="about" className="bg-section-alt py-16 lg:py-24">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="overflow-hidden rounded-[28px] shadow-[0_30px_70px_rgba(15,23,42,0.16)]">
                <img
                  src={portfolioFeatured.about}
                  alt="Sure Safety Limited — modern residential construction and finishing in Zambia"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <motion.div
                className="absolute -bottom-5 -right-3 bg-primary px-6 py-3 text-black shadow-lg md:-right-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <p className="font-heading text-2xl font-bold">15+</p>
                <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.25em]">Years of Excellence</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="order-1 space-y-5 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="text-xs font-heading font-semibold uppercase tracking-[0.35em] text-primary">About Us</p>
              <h2 className="text-3xl font-heading font-bold uppercase leading-tight text-foreground md:text-4xl">
                Sure Safety<br />Limited
              </h2>
              <div className="h-0.5 w-12 bg-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Sure Safety Limited is a premier construction and maintenance firm dedicated to delivering world-class solutions. We specialize in building, mechanical, and electrical services, ensuring every project meets the highest standards of safety and quality.
              </p>

              <div className="grid gap-4 pt-2 sm:grid-cols-2">
                {pillars.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-3.5 w-3.5 shrink-0 text-primary" weight="fill" />
                      <p className="text-sm font-heading font-bold uppercase tracking-[0.16em] text-foreground">{item.title}</p>
                    </div>
                    <p className="mt-2 pl-5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-3">
                <StatBox target={500} suffix="+" label="Projects Completed" />
                <StatBox target={200} suffix="+" label="Happy Clients" />
              </div>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-heading font-bold uppercase tracking-[0.22em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Work With Us
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" weight="bold" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
