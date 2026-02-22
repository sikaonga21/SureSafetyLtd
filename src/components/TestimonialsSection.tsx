import { Shield, Lightbulb, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    title: "Integrity",
    icon: Shield,
    desc: "We conduct our business with the highest level of transparency and honesty, building trust with every client.",
    color: "bg-primary/10",
  },
  {
    title: "Quality Excellence",
    icon: Heart,
    desc: "We are committed to delivering exceptional workmanship and finishes that set industry benchmarks.",
    color: "bg-secondary/10",
  },
  {
    title: "Innovation",
    icon: Lightbulb,
    desc: "We continuously seek modern, efficient, and reliable solutions to improve our construction and maintenance services.",
    color: "bg-primary/10",
  },
  {
    title: "Customer Focus",
    icon: Users,
    desc: "Our clients' needs are at the heart of everything we do, ensuring total satisfaction in every project.",
    color: "bg-secondary/10",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="values" className="py-20 lg:py-28 bg-section-dark">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Our Foundation</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-section-dark-fg">
            Our Core Values
          </h2>
          <p className="text-section-dark-fg/60 mt-4 max-w-2xl mx-auto">
            At Sure Safety Limited, our core values define our culture and drive our success in delivering exceptional construction and maintenance projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="bg-card/5 backdrop-blur-sm border border-section-dark-fg/10 rounded-2xl p-8 hover:bg-card/10 hover:border-primary/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <h3 className="text-xl font-heading font-bold text-section-dark-fg mb-4">
                <span className="text-primary mr-2">/</span>
                {v.title}
              </h3>
              <p className="text-section-dark-fg/60 text-sm leading-relaxed">
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
