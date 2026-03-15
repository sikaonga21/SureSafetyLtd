import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CertificationsStrip from "@/components/CertificationsStrip";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import VerticalsSection from "@/components/VerticalsSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Two-column intro row: 30% label / 70% body
const TwoColIntro = () => (
  <section className="py-16 bg-card border-b border-border">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-10 items-start">
        <div className="md:col-span-1">
          <p className="font-heading font-bold text-foreground text-xs uppercase tracking-[0.25em] leading-relaxed">
            Sure Safety<br />Limited
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="text-muted-foreground text-sm leading-relaxed font-body max-w-2xl">
            We are a registered Zambian contractor with over 15 years of experience delivering civil construction, electrical, plumbing, and facility maintenance solutions for commercial, industrial, and public-sector clients — consistently on time, on budget, and to the highest safety standards.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Careers split banner: left photo / right dark + CTA
const CareerBanner = () => (
  <motion.section
    className="flex flex-col lg:flex-row bg-section-dark"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
  >
    <div className="lg:w-2/5 h-72 lg:h-auto overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=1200"
        alt="Sure Safety careers"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="lg:w-3/5 px-10 py-16 lg:px-20 flex flex-col justify-center">
      <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.3em] mb-6">
        Join Our Team
      </p>
      <h2 className="text-section-dark-fg font-heading font-bold text-4xl md:text-5xl uppercase leading-tight mb-6">
        BUILD YOUR<br />CAREER WITH US
      </h2>
      <p className="text-section-dark-fg/60 text-sm font-body mb-10 max-w-md leading-relaxed">
        We're always looking for skilled professionals who share our commitment to quality, safety, and excellence. Join a team that values your growth.
      </p>
      <Link
        to="/careers"
        className="inline-block border border-section-dark-fg text-section-dark-fg text-xs font-heading font-bold uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-primary hover:border-primary hover:text-black transition-all duration-300 self-start"
      >
        View Opportunities
      </Link>
    </div>
  </motion.section>
);

import SEO from "@/components/SEO";

const Index = () => {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sure Safety Limited",
    "image": "https://suresafety.co.zm/favicon.png",
    "@id": "https://suresafety.co.zm",
    "url": "https://suresafety.co.zm",
    "telephone": "+260977224213",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lusaka",
      "addressCountry": "ZM"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -15.3875,
      "longitude": 28.3228
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Home"
        description="Sure Safety Limited is a registered Zambian contractor delivering civil construction, electrical, plumbing, and facility maintenance solutions."
        schema={businessSchema}
      />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TwoColIntro />
        <CertificationsStrip />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <VerticalsSection />
        <ProjectsSection />
        <CareerBanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
