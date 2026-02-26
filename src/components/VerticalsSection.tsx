import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Buildings,
  HardHat,
  Ruler,
  ShieldCheck,
  Clock,
} from "@phosphor-icons/react";
import { useCountUp } from "@/hooks/use-count-up";

// Individual animated stat card with count-up
const StatCard = ({
  label,
  target,
  suffix,
  desc,
  delay,
}: {
  label: string;
  target: number;
  suffix: string;
  desc: string;
  delay: number;
}) => {
  const { ref, value } = useCountUp(target, 2000);

  return (
    <motion.div
      ref={ref}
      className="px-6 sm:px-10 py-12 text-center md:text-left"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
    >
      <p className="text-white/40 font-heading text-xs uppercase tracking-[0.3em] mb-4">
        {label}
      </p>
      <p
        className="text-white font-heading font-bold leading-none mb-3"
        style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}
      >
        {value}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="text-white/50 text-sm font-body">{desc}</p>
    </motion.div>
  );
};

const reasons = [
  { icon: Buildings, name: "Expertise", desc: "Years of experience in complex construction and infrastructure projects." },
  { icon: HardHat, name: "Safety First", desc: "100% safety record and strict compliance with international standards." },
  { icon: Ruler, name: "Precision", desc: "High-quality finishes and meticulous attention to detail in every aspect." },
  { icon: ShieldCheck, name: "Reliability", desc: "Proven track record of delivering on time and within budget." },
  { icon: Clock, name: "Efficiency", desc: "Modern methods that ensure faster delivery without compromising quality." },
];

const VerticalsSection = () => {
  return (
    <>
      {/* ── Stats Breaker ── */}
      <section className="bg-black">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <StatCard label="Years In Operation" target={15} suffix="+" desc="Established presence in Zambia" delay={0} />
            <StatCard label="Projects Delivered" target={500} suffix="+" desc="Across civil, electrical & maintenance" delay={0.12} />
            <StatCard label="Repeat Clients" target={200} suffix="+" desc="Built on trust and results" delay={0.24} />
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.3em] mb-3">
              The Difference
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase leading-tight">
              Why Choose Sure Safety?
            </h2>
            <div className="w-12 h-0.5 bg-primary mt-5" />
          </motion.div>

          {/* Responsive grid — stacks nicely on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border">
            {reasons.map((item, i) => (
              <motion.div
                key={item.name}
                className="bg-card p-7 flex flex-col group hover:bg-section-alt transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" weight="fill" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-xs uppercase tracking-wider mb-3">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed font-body flex-grow">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA bar */}
          <motion.div
            className="mt-14 bg-primary p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-black uppercase leading-tight">
                Ready to start your next project?
              </h3>
              <p className="text-black/60 text-sm mt-1 font-body">
                Consult with our experts for building and maintenance solutions.
              </p>
            </div>
            <Link
              to="/quote"
              className="border border-black text-black text-xs font-heading font-bold uppercase tracking-[0.2em] px-8 py-3 hover:bg-black hover:text-primary transition-all duration-300 shrink-0"
            >
              Get a Free Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default VerticalsSection;
