import { motion } from "framer-motion";
import {
  ShieldCheck,
  Star,
  Lightbulb,
  UsersThree,
} from "@phosphor-icons/react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "We conduct our business with the highest level of transparency and honesty, building trust with every client on every project.",
  },
  {
    icon: Star,
    title: "Quality Excellence",
    desc: "We are committed to delivering exceptional workmanship and finishes that set industry benchmarks across all disciplines.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We continuously seek modern, efficient, and reliable solutions to improve our construction and maintenance services.",
  },
  {
    icon: UsersThree,
    title: "Customer Focus",
    desc: "Our clients' needs are at the heart of everything we do, ensuring total satisfaction in every project we deliver.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="values" className="py-16 md:py-24 bg-section-dark">
      <div className="container">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.3em] mb-4">
            Our Foundation
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-section-dark-fg uppercase leading-none">
            Our Core Values
          </h2>
          <div className="w-20 h-0.5 bg-primary mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="bg-section-dark p-10 group hover:bg-white/5 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <v.icon
                className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300"
                weight="fill"
              />
              <h3 className="text-lg font-heading font-bold text-section-dark-fg uppercase tracking-wider mb-4">
                {v.title}
              </h3>
              <p className="text-section-dark-fg/60 text-sm leading-relaxed font-body">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
