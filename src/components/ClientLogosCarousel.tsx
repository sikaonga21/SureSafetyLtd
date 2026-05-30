import { motion } from "framer-motion";

const clientLogos = [
  { name: "ZESCO", abbr: "ZE" },
  { name: "KCM", abbr: "KCM" },
  { name: "Zambia Sugar", abbr: "ZS" },
  { name: "Barrick Gold", abbr: "BG" },
  { name: "Shoprite", abbr: "SR" },
  { name: "Lafarge", abbr: "LF" },
  { name: "First Quantum", abbr: "FQ" },
  { name: "Stanbic Bank", abbr: "SB" },
  { name: "MTN Zambia", abbr: "MTN" },
  { name: "Trade Kings", abbr: "TK" },
];

const LogoPlaceholder = ({ name, abbr }: { name: string; abbr: string }) => (
  <div className="flex items-center gap-3 px-8 lg:px-10 shrink-0 select-none">
    {/* Monogram circle */}
    <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center shrink-0 opacity-40">
      <span className="text-xs font-heading font-bold tracking-wider">{abbr}</span>
    </div>
    <span className="text-sm md:text-base font-heading font-semibold uppercase tracking-[0.15em] whitespace-nowrap opacity-40 group-hover:opacity-60 transition-opacity">
      {name}
    </span>
  </div>
);

const ClientLogosCarousel = () => {
  // Duplicate the list to create seamless infinite scroll
  const duplicated = [...clientLogos, ...clientLogos];

  return (
    <motion.section
      className="py-12 md:py-16 bg-section-dark overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mb-8">
        <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.35em] text-center">
          Trusted By Leading Organizations
        </p>
      </div>

      {/* Marquee wrapper */}
      <div className="relative group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[hsl(210,14%,16%)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[hsl(210,14%,16%)] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex items-center text-white animate-scroll-left group-hover:[animation-play-state:paused]">
          {duplicated.map((logo, i) => (
            <LogoPlaceholder key={`${logo.name}-${i}`} name={logo.name} abbr={logo.abbr} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ClientLogosCarousel;
