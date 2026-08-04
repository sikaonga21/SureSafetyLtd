import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { portfolioFeatured } from "@/data/portfolioImages";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <img
          src={portfolioFeatured.heroCivil}
          alt="Sure Safety Limited"
          className="h-full w-full object-cover grayscale-[18%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.88)_0%,rgba(2,6,23,0.72)_52%,rgba(2,6,23,0.4)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center px-6 pb-12 pt-32 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm font-heading font-semibold uppercase tracking-[0.35em] text-primary">
            Civil & Construction
          </p>
          <h1
            className="font-heading font-bold uppercase leading-[0.9] text-white"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6.7rem)" }}
          >
            <span className="block">BUILD</span>
            <span className="block text-white/90">WITH CONFIDENCE</span>
          </h1>
          <div className="mt-5 h-1 w-16 bg-primary" />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">
            Structured delivery, dependable execution, and safe site management from day one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center border border-white bg-white px-6 py-3 text-xs font-heading font-bold uppercase tracking-[0.22em] text-slate-900 transition-all duration-300 hover:bg-primary hover:border-primary"
            >
              Request a Quote
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center border border-white/50 px-6 py-3 text-xs font-heading font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
