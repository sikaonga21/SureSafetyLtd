import { ArrowRight, Building2, HardHat, Ruler, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";

const whyChooseUs = [
  {
    name: "Expertise",
    icon: Building2,
    desc: "Years of experience in handling complex construction and infrastructure projects."
  },
  {
    name: "Safety First",
    icon: HardHat,
    desc: "100% safety record and strict compliance with international safety standards."
  },
  {
    name: "Precision",
    icon: Ruler,
    desc: "High-quality finishes and attention to detail in every aspect of our work."
  },
  {
    name: "Reliability",
    icon: ShieldCheck,
    desc: "Proven track record of delivering projects on time and within budget."
  },
  {
    name: "Efficiency",
    icon: Clock,
    desc: "Modern construction methods that ensure faster delivery without compromising quality."
  },
];

const VerticalsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-section-alt">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">The Difference</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Why Choose Sure Safety?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.name}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all group flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-3 text-sm uppercase tracking-wider">{item.name}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-6 flex-grow">{item.desc}</p>
              <div className="text-primary text-[10px] font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto uppercase tracking-widest">
                Learn More <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerticalsSection;
