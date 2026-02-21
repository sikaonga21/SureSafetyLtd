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
              className="flex flex-col items-center text-center space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">{s.title}</p>
                <p className="text-muted-foreground text-xs">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsStrip;
