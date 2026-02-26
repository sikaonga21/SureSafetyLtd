import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Local assets
import hero1 from "@/assets/hero-bg.jpg";
import hero2 from "@/assets/images/electrician1.jpeg";
import hero3 from "@/assets/images/maintenace.jpg";

const heroSlides = [
  {
    label: "Civil & Construction",
    heading: "BUILD",
    headingLine2: "WITH CONFIDENCE",
    image: hero1,
  },
  {
    label: "Electrical & Mechanical",
    heading: "PRECISE",
    headingLine2: "BY DESIGN",
    image: hero2,
  },
  {
    label: "Facility Maintenance",
    heading: "RELIABLE",
    headingLine2: "EVERY TIME",
    image: hero3,
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={heroSlides[current].image}
            alt={heroSlides[current].heading}
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content — vertically centered with header offset */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 md:px-12 lg:px-20 pt-20">

        {/* Text block: fixed height so button never shifts */}
        <div style={{ minHeight: "clamp(140px, 22vw, 220px)" }} className="flex flex-col justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Category label */}
              <motion.p
                className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.35em] mb-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                {heroSlides[current].label}
              </motion.p>

              {/* Main heading */}
              <h1
                className="font-heading font-bold text-white leading-none tracking-tight uppercase"
                style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", lineHeight: 0.9 }}
              >
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                >
                  {heroSlides[current].heading}
                </motion.span>
                <motion.span
                  className="block text-white/90"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {heroSlides[current].headingLine2}
                </motion.span>
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Accent line — static, never moves */}
        <div className="w-16 h-0.5 bg-primary my-7 flex-shrink-0" />

        {/* CTA — static, never moves */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex-shrink-0"
        >
          <Link
            to="/quote"
            className="inline-block border border-white text-white text-xs font-heading font-bold uppercase tracking-[0.25em] px-8 py-3 hover:bg-primary hover:border-primary hover:text-black transition-all duration-300"
          >
            Request a Quote
          </Link>
        </motion.div>
      </div>

      {/* Slide Indicators — bottom left */}
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-0.5 transition-all duration-500 ${index === current
              ? "bg-primary w-14"
              : "bg-white/30 w-7 hover:bg-white/60"
              }`}
          />
        ))}
      </div>

      {/* Counter — bottom right */}
      <div className="absolute bottom-8 right-6 md:right-12 lg:right-20 z-20 font-heading text-white/40 text-xs tracking-widest">
        0{current + 1} <span className="text-primary">/</span> 0{heroSlides.length}
      </div>
    </section>
  );
};

export default HeroSection;
