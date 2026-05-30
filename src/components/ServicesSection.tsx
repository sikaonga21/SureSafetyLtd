import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";

import { portfolioFeatured } from "@/data/portfolioImages";

const services = [
  {
    title: "CIVIL & CONSTRUCTION",
    subtitle: "GENERAL BUILDING",
    description:
      "New builds, extensions, and structural refurbishments for residential, commercial, and industrial clients. We manage the full lifecycle — site preparation, reinforced structures, roofing, plastering, and handover — with rigorous safety oversight and transparent project reporting.",
    image: portfolioFeatured.servicesCivil,
    link: "/services",
  },
  {
    title: "ROADS & PAVING",
    subtitle: "INFRASTRUCTURE",
    description:
      "Road construction, kerbing, drainage, and precision interlocking paver installation. Our teams prepare compacted bases, cut stones to fit, and lay durable patterns for driveways, walkways, and commercial forecourts.",
    image: portfolioFeatured.servicesPaving,
    link: "/services",
  },
  {
    title: "ELECTRICAL",
    subtitle: "INSTALLATION",
    description:
      "Certified electricians deliver complete wiring, distribution boards, lighting, and power upgrades for homes and facilities. Every installation is tested, documented, and completed to Zambian safety standards.",
    image: portfolioFeatured.servicesElectrical,
    link: "/services",
  },
  {
    title: "MECHANICAL & PLUMBING",
    subtitle: "HVAC & PLUMBING WORKS",
    description:
      "Air conditioning, ventilation, water reticulation, and sanitary installations for offices, warehouses, and residential properties. We design systems for efficiency, reliability, and straightforward long-term maintenance.",
    image: portfolioFeatured.servicesMechanical,
    link: "/services",
  },
  {
    title: "FACILITY MANAGEMENT",
    subtitle: "PLANNED MAINTENANCE",
    description:
      "Scheduled preventative maintenance and rapid-response repairs to keep your buildings operating safely. Tailored contracts cover electrical checks, plumbing, structural inspections, and general upkeep — reducing downtime and unexpected costs.",
    image: portfolioFeatured.servicesMaintenance,
    link: "/services",
  },
];

const useSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return { ref, isInView };
};

/**
 * Consistent two-column horizontal split layout for every service.
 * Alternates image side (left/right) for visual rhythm.
 * On even rows: image left, text right.  On odd rows: text left, image right.
 */
const SplitRow = ({
  service,
  reversed,
  dark,
}: {
  service: (typeof services)[0];
  reversed: boolean;
  dark: boolean;
}) => {
  const { ref, isInView } = useSection();

  const bgClass = dark ? "bg-section-dark" : "bg-card";
  const textColor = dark ? "text-white" : "text-foreground";
  const descColor = dark ? "text-white/60" : "text-muted-foreground";
  const linkStyle = dark
    ? "text-white border-b border-white hover:text-primary hover:border-primary"
    : "text-foreground border-b border-foreground hover:text-primary hover:border-primary";

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 ${bgClass} overflow-hidden`}
    >
      {/* Image panel */}
      <motion.div
        className={`h-[350px] lg:h-auto min-h-[320px] overflow-hidden ${
          reversed ? "lg:order-2" : "lg:order-1"
        }`}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <img
          src={service.image}
          alt={service.subtitle}
          className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
        />
      </motion.div>

      {/* Text panel */}
      <motion.div
        className={`flex flex-col justify-center px-10 py-16 md:px-16 lg:px-20 ${
          reversed ? "lg:order-1" : "lg:order-2"
        }`}
        initial={{ opacity: 0, x: reversed ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-primary font-heading font-bold text-sm uppercase tracking-[0.3em] mb-4">
          {service.title}
        </p>
        <h2
          className={`text-3xl md:text-4xl font-heading font-bold ${textColor} uppercase leading-tight mb-4 tracking-tight`}
        >
          {service.subtitle}
        </h2>
        <div className="w-12 h-0.5 bg-primary mb-6" />
        <p className={`${descColor} text-base font-body leading-relaxed mb-8 max-w-lg`}>
          {service.description}
        </p>
        <Link
          to={service.link}
          className={`inline-flex items-center gap-2 text-sm font-heading font-bold uppercase tracking-[0.2em] ${linkStyle} pb-0.5 transition-colors group self-start`}
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
      {services.map((service, i) => (
        <SplitRow
          key={service.title}
          service={service}
          reversed={i % 2 === 1}
          dark={i % 2 === 0}
        />
      ))}
    </section>
  );
};

export default ServicesSection;
