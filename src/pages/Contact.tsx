import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { motion } from "framer-motion";

// Local assets
import contactHero from "@/assets/images/contact-hero.jpg";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        {/* 60vh Image Hero - Reduced Font Size */}
        <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
          <img
            src={contactHero}
            alt="Contact Sure Safety"
            className="w-full h-full object-cover opacity-40 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center pt-24">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.35em] mb-4">
                  Inquiry
                </p>
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight leading-none mb-4"
                >
                  Contact Us
                </h1>
                <div className="w-16 h-0.5 bg-primary mt-6 mb-8" />
                <p className="text-white/70 text-sm md:text-base font-body max-w-xl leading-relaxed">
                  Have a question or looking for a professional construction partner? Reach out to us today and let's discuss your project.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
