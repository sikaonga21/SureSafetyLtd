import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lightbulb,
  UsersThree,
  Star,
} from "@phosphor-icons/react";
import { useCountUp } from "@/hooks/use-count-up";

const stats = [
  { icon: ShieldCheck, title: "Quality Assured", desc: "Top-tier workmanship on every project", target: 100, suffix: "%" },
  { icon: Lightbulb, title: "Innovation Driven", desc: "Modern solutions for complex challenges" },
  { icon: Star, title: "Client Focused", desc: "Dedicated service from start to finish" },
  { icon: UsersThree, title: "Safety First", desc: "100% site compliance record", target: 15, suffix: "yr" },
];

const StatTile = ({ s }: { s: typeof stats[0] }) => {
  const { ref, value } = useCountUp(s.target ?? 0, 1600);
  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center px-6 py-8 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-11 h-11 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <s.icon className="w-5 h-5 text-primary" weight="fill" />
      </div>
      {s.target ? (
        <p className="font-heading font-bold text-2xl text-foreground mb-0.5">
          {value}<span className="text-primary text-base ml-0.5">{s.suffix}</span>
        </p>
      ) : null}
      <p className="font-heading font-bold text-foreground text-xs uppercase tracking-[0.18em] mb-1">
        {s.title}
      </p>
      <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
    </motion.div>
  );
};

const CertificationsStrip = () => {
  return (
    <section className="bg-card border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x divide-border">
          {stats.map((s) => (
            <StatTile key={s.title} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsStrip;
