import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import aboutBg from "@/assets/about-bg.jpg";

const highlights = [
  { icon: Target, title: "Our Vision", desc: "To be a leading force in safety and maintenance services, recognized for excellence and innovation." },
  { icon: Eye, title: "Our Mission", desc: "Providing exceptional services through quality, transparency, and innovation." },
  { icon: Star, title: "Quality First", desc: "Setting industry benchmarks in every project we undertake." },
  { icon: ShieldCheck, title: "Safety Rating", desc: "Maintaining a 100% safety record across all our site operations." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={aboutBg}
              alt="Sure Safety Team"
              className="rounded-lg shadow-2xl w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <motion.div
              className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-8 py-4 rounded-lg shadow-lg hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <p className="font-heading font-bold text-2xl">15+</p>
              <p className="text-sm opacity-90">Years of Excellence</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase">About Us</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
              Sure Safety Limited
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Sure Safety Limited is a premier construction and maintenance firm dedicated to delivering world-class solutions. We specialize in building, mechanical, and electrical services, ensuring every project meets the highest standards of safety and quality.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  <div className="flex items-center gap-3">
                    <p className="font-heading font-bold text-foreground">
                      <span className="text-primary mr-2">#</span>
                      {h.title}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-11">{h.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-8 pt-6">
              <div>
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Projects Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">200+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Happy Clients</p>
              </div>
            </div>

            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold mt-4">
                Work With Us <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
