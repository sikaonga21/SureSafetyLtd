import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const verticals = [
  { name: "Chemicals", desc: "Leading manufacturer of quick lime, hydrated lime, and magnesium oxide in East Africa." },
  { name: "Mining & Metal", desc: "Diversified into mining and metal processing in Tanzania and Zambia." },
  { name: "Salt", desc: "Largest manufacturer of salt in Tanzania with 180,000 MT annual capacity." },
  { name: "Real Estate", desc: "Five-star hotels and commercial properties across Zambia & Tanzania." },
  { name: "Steel", desc: "Fastest-growing manufacturer of cold rolling sheets and structural steel products." },
];

const VerticalsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-section-alt">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Business Ventures</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Our Various Verticals
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {verticals.map((v, i) => (
            <motion.div
              key={v.name}
              className="bg-card rounded-lg p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <h3 className="font-heading font-bold text-foreground mb-2 uppercase text-sm">{v.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{v.desc}</p>
              <span className="text-primary text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Read More <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerticalsSection;
