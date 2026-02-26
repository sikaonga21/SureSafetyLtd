import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";

// Local assets
import roadPaving from "@/assets/products-banner.jpg";
import civilConst from "@/assets/images/genreral-construction.jpg";
import electrical from "@/assets/images/electrician1.jpeg";
import mechanical from "@/assets/images/abt-us-const.jpg";
import maintenance from "@/assets/images/maintenace.jpg";

// Layouts: "split-left" | "split-right" | "full-overlay" | "duo"
const services = [
  {
    layout: "full-overlay",
    title: "CIVIL & CONSTRUCTION",
    subtitle: "GENERAL BUILDING",
    description:
      "New construction, renovations, and extensions for residential, commercial and industrial properties. We bring expertise in project management, material sourcing, and skilled labour to every project.",
    image: civilConst,
    link: "/services",
  },
  {
    layout: "duo",
    items: [
      {
        title: "ROADS & PAVING",
        subtitle: "INFRASTRUCTURE",
        description:
          "High-quality road construction and interlocking paving solutions — from expansions to drainage systems.",
        image: roadPaving,
        link: "/services",
      },
      {
        title: "ELECTRICAL",
        subtitle: "INSTALLATION",
        description:
          "Complete wiring, lighting, and power system installations with a rigorous focus on safety and compliance.",
        image: electrical,
        link: "/services",
      },
    ],
  },
  {
    layout: "split-right",
    title: "MECHANICAL & PLUMBING",
    subtitle: "HVAC & PLUMBING WORKS",
    description:
      "Advanced air conditioning, ventilation, and plumbing solutions for residential, commercial and industrial facilities — designed for long-term efficiency and comfort.",
    image: mechanical,
    link: "/services",
  },
  {
    layout: "spotlight",
    title: "FACILITY MANAGEMENT",
    subtitle: "PLANNED MAINTENANCE",
    description:
      "Ongoing, fully planned preventative maintenance to keep your property in peak condition. From reactive repairs to comprehensive maintenance contracts — safe, compliant, and predictable.",
    image: maintenance,
    link: "/services",
  },
];

const useSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return { ref, isInView };
};

// Layout A: Full-width image with text overlay (dark gradient bottom-to-top)
const FullOverlay = ({ service }: { service: any }) => {
  const { ref, isInView } = useSection();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="relative h-[70vh] min-h-[500px] overflow-hidden"
    >
      <img
        src={service.image}
        alt={service.subtitle}
        className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="max-w-xl">
          <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-3">
            {service.title}
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase leading-tight mb-4">
            {service.subtitle}
          </h2>
          <p className="text-white/70 text-sm font-body leading-relaxed">
            {service.description}
          </p>
        </div>
        <Link
          to={service.link}
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-white border border-white px-6 py-3 hover:bg-primary hover:border-primary hover:text-black transition-all duration-300 shrink-0"
        >
          Learn More <ArrowRight className="w-3.5 h-3.5" weight="bold" />
        </Link>
      </div>
    </motion.div>
  );
};

// Layout B: Two equal cards side by side — image top, text bottom
const Duo = ({ items }: { items: any[] }) => {
  const { ref, isInView } = useSection();
  return (
    <div ref={ref} className="grid md:grid-cols-2">
      {items.map((item, i) => (
        <motion.div
          key={item.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.15 }}
          className={`group ${i === 0 ? "bg-card" : "bg-section-alt"}`}
        >
          <div className="h-72 overflow-hidden">
            <img
              src={item.image}
              alt={item.subtitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="p-12">
            <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-3">
              {item.title}
            </p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground uppercase leading-tight mb-3">
              {item.subtitle}
            </h3>
            <div className="w-10 h-0.5 bg-primary mb-5" />
            <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
              {item.description}
            </p>
            <Link
              to={item.link}
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors group/link"
            >
              Learn More{" "}
              <ArrowRight
                className="w-3 h-3 group-hover/link:translate-x-1 transition-transform"
                weight="bold"
              />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Layout C: Text left (40%) + image right (60%), or reversed
const SplitRight = ({ service }: { service: any }) => {
  const { ref, isInView } = useSection();
  return (
    <div ref={ref} className="grid lg:grid-cols-[2fr_3fr] bg-section-dark overflow-hidden">
      {/* Text panel */}
      <motion.div
        className="flex flex-col justify-center px-10 py-20 md:px-16"
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">
          {service.title}
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase leading-tight mb-4 tracking-tight">
          {service.subtitle}
        </h2>
        <div className="w-12 h-0.5 bg-primary mb-6" />
        <p className="text-white/60 text-sm font-body leading-relaxed mb-8">
          {service.description}
        </p>
        <Link
          to={service.link}
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-white border-b border-white pb-0.5 hover:text-primary hover:border-primary transition-colors group self-start"
        >
          Learn More{" "}
          <ArrowRight
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
            weight="bold"
          />
        </Link>
      </motion.div>

      {/* Image panel */}
      <motion.div
        className="h-[400px] lg:h-auto overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <img
          src={service.image}
          alt={service.subtitle}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 grayscale-[40%] hover:grayscale-0 transition-all"
        />
      </motion.div>
    </div>
  );
};

// Layout D: Spotlight — horizontal card, image left 45%, large text right 55%
const Spotlight = ({ service }: { service: any }) => {
  const { ref, isInView } = useSection();
  return (
    <div ref={ref} className="grid lg:grid-cols-[5fr_6fr] bg-card overflow-hidden">
      {/* Image */}
      <motion.div
        className="h-[400px] lg:h-auto overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <img
          src={service.image}
          alt={service.subtitle}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        {/* Decorative accent */}
        <div className="absolute bottom-6 left-6 flex gap-2">
          <span className="w-3 h-3 bg-primary block" />
          <span className="w-3 h-3 bg-white block" />
        </div>
      </motion.div>

      {/* Text — large and airy */}
      <motion.div
        className="flex flex-col justify-center px-12 py-20 md:px-20"
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">
          {service.title}
        </p>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground uppercase leading-tight mb-4 tracking-tight">
          {service.subtitle}
        </h2>
        <div className="w-14 h-0.5 bg-primary mb-8" />
        <p className="text-muted-foreground text-sm font-body leading-relaxed mb-10 max-w-md">
          {service.description}
        </p>
        <Link
          to={service.link}
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors group self-start"
        >
          Learn More{" "}
          <ArrowRight
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
            weight="bold"
          />
        </Link>
      </motion.div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services">
      {services.map((service, i) => {
        if (service.layout === "full-overlay") {
          return <FullOverlay key={i} service={service} />;
        }
        if (service.layout === "duo") {
          return <Duo key={i} items={service.items as any[]} />;
        }
        if (service.layout === "split-right") {
          return <SplitRight key={i} service={service} />;
        }
        if (service.layout === "spotlight") {
          return <Spotlight key={i} service={service} />;
        }
        return null;
      })}
    </section>
  );
};

export default ServicesSection;
