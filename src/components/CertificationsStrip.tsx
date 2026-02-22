import { Shield, Zap, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Shield, title: "Quality Assured", desc: "Top-tier workmanship" },
  { icon: Zap, title: "Innovation Driven", desc: "Modern solutions" },
  { icon: Award, title: "Client Focused", desc: "Dedicated service" },
  { icon: Users, title: "Safety First", desc: "100% compliance" },
];

const CertificationsStrip = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.title}
              className="flex flex-col items-center text-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div>
                <p className="font-heading font-bold text-foreground text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1">{s.title}</p>
                <p className="text-muted-foreground text-[10px]">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsStrip;
