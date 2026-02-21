import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CertificationsStrip from "@/components/CertificationsStrip";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import VerticalsSection from "@/components/VerticalsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CertificationsStrip />
        <AboutSection />
        <ProductsSection />
        <TestimonialsSection />
        <ContactSection />
        <VerticalsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
