import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import {
  portfolioCategories,
  portfolioImages,
  type PortfolioCategory,
} from "@/data/portfolioImages";

type PortfolioGalleryProps = {
  showHeader?: boolean;
  className?: string;
};

const PortfolioGallery = ({ showHeader = true, className = "" }: PortfolioGalleryProps) => {
  const [active, setActive] = useState<PortfolioCategory>("external");
  const activeMeta = portfolioCategories.find((c) => c.id === active)!;
  const images = portfolioImages[active];

  return (
    <section id="portfolio" className={`py-20 lg:py-28 bg-card ${className}`}>
      <div className="container">
        {showHeader && (
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">
              Our Work
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-tight">
              Plans, Interiors &amp; Exteriors
            </h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mt-4" />
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto font-body text-base">
              Explore our portfolio of modern residential projects — from architectural plans to
              finished interiors and striking exterior builds.
            </p>
          </motion.div>
        )}

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={`px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 border ${
                active === cat.id
                  ? "bg-primary text-black border-primary"
                  : "bg-transparent text-foreground border-border hover:border-primary/50"
              }`}
            >
              {cat.label}
              <span className="ml-2 text-[10px] opacity-60">
                ({portfolioImages[cat.id].length})
              </span>
            </button>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm font-body mb-10 max-w-xl mx-auto">
          {activeMeta.description}
        </p>

        {/* Image grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className={
              active === "plans"
                ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
                : "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
            }
          >
            {images.map((img, i) => (
              <motion.figure
                key={img.src}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`group overflow-hidden border border-border bg-section-alt ${
                  active === "plans" ? "aspect-[4/3]" : "aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5]"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full h-full transition-transform duration-700 group-hover:scale-[1.02] ${
                    active === "plans"
                      ? "object-contain p-4 bg-white"
                      : "object-cover grayscale-[20%] group-hover:grayscale-0"
                  }`}
                  loading="lazy"
                />
                {img.title && (
                  <figcaption className="px-4 py-3 border-t border-border bg-card">
                    <p className="text-xs font-heading font-bold uppercase tracking-widest text-foreground">
                      {img.title}
                    </p>
                    {img.description && (
                      <p className="text-muted-foreground text-xs font-body mt-2 leading-relaxed line-clamp-2">
                        {img.description}
                      </p>
                    )}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-muted-foreground/70 text-xs font-body mt-10">
          More project photos coming soon — add yours to the portfolio folder anytime.
        </p>

        <div className="text-center mt-10">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 text-sm font-heading font-bold uppercase tracking-[0.2em] text-foreground border border-foreground px-8 py-3 hover:bg-primary hover:border-primary hover:text-black transition-all duration-300"
          >
            Start Your Project <ArrowRight className="w-4 h-4" weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
