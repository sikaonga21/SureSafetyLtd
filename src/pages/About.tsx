import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Zap, Award, Users, Target, Globe } from "lucide-react";

const strengths = [
  { icon: Shield, title: "Quality Assured", desc: "All products meet international standards with rigorous quality control at every stage." },
  { icon: Zap, title: "Innovation", desc: "Continuous R&D investment to develop cutting-edge cable solutions." },
  { icon: Award, title: "Certified", desc: "ISO 9001, ISO 14001, ISO 45001, BASEC, CE, RoHS certified." },
  { icon: Users, title: "Expert Team", desc: "Skilled engineers and technicians with decades of combined experience." },
  { icon: Target, title: "Custom Solutions", desc: "Tailored cable solutions for specific industrial requirements." },
  { icon: Globe, title: "Global Reach", desc: "Serving clients across Africa, Middle East, and beyond." },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-section-dark py-20">
          <div className="container text-center">
            <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">About Us</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-section-dark-fg">Who We Are</h1>
          </div>
        </section>

        <section className="py-20 bg-card">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Neelkanth Cables</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Neelkanth Cables, we pride ourselves on being a pioneering force in the cable manufacturing industry. With a dedicated team of experts and a commitment to innovation, we have established ourselves as a reliable and trusted partner in the electrical and communication sectors.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our core values are integrity, quality, and customer satisfaction. We strive to push the boundaries of technology and set new standards in product excellence and service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Neelkanth Cables specializes in the design, development, and manufacture of high-quality cables for a variety of applications. Our product range includes Low Voltage Cables, Medium Voltage Cables, and Specialty Cables with custom-engineered solutions for specific industrial requirements.
            </p>
          </div>
        </section>

        <section className="py-20 bg-section-alt">
          <div className="container">
            <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">Our Strengths</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {strengths.map((s) => (
                <div key={s.title} className="bg-card rounded-lg p-6 border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
