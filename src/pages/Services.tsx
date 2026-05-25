import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

import SEO from "@/components/SEO";
import { portfolioFeatured } from "@/data/portfolioImages";

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <SEO
        title="Our Services"
        description="Explore our comprehensive range of services including general construction, electrical, mechanical, and facility maintenance in Zambia."
      />
      <Header />
      <main className="flex-1">
        {/* 60vh Image Hero - Reduced Font Size */}
        <section className="relative h-[50vh] min-h-[400px] bg-section-charcoal overflow-hidden flex items-center">
          <img
            src={portfolioFeatured.servicesCivil}
            alt="Sure Safety civil construction and building services in Zambia"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
          <div className="container relative z-10 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.35em] mb-4">
                Solutions
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight leading-none mb-4">
                Our Services
              </h1>
              <div className="w-16 h-0.5 bg-primary mt-6 mb-8" />
              <p className="text-white/70 text-base md:text-lg font-body max-w-xl leading-relaxed">
                Comprehensive building, electrical, mechanical, and maintenance solutions for commercial, industrial, and public-sector clients across Zambia.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services rows */}
        <ServicesSection />

        {/* CTA bar */}
        <section className="py-32 bg-section-dark px-6">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase leading-tight mb-8 tracking-tight">
                LET US BUILD TOGETHER
              </h2>
              <p className="text-white/70 text-lg font-body mb-12 max-w-2xl leading-relaxed">
                Whatever your project requirements, we have the experience and capability to deliver safe, high-quality results.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-white text-primary text-sm font-heading font-bold uppercase tracking-[0.2em] px-12 py-5 hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl"
              >
                Start a Conversation <ArrowRight className="w-4 h-4 inline-block ml-2" weight="bold" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div >
  );
};

export default ServicesPage;
