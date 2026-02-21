import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Factory, Gauge, Cpu, Shield } from "lucide-react";

const features = [
  { icon: Factory, title: "State-of-the-Art Facility", desc: "Modern manufacturing plant equipped with the latest machinery and technology for cable production." },
  { icon: Gauge, title: "Production Capacity", desc: "High-volume production capability to meet large-scale orders with consistent quality output." },
  { icon: Cpu, title: "Advanced Technology", desc: "Computer-controlled manufacturing processes ensuring precision and uniformity in every cable." },
  { icon: Shield, title: "Quality Testing Lab", desc: "In-house ISO/IEC 17025 accredited testing laboratory for comprehensive quality assurance." },
];

const InfrastructurePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-section-dark py-20">
          <div className="container text-center">
            <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Manufacturing</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-section-dark-fg">Infrastructure</h1>
          </div>
        </section>

        <section className="py-20 bg-card">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">World-Class Manufacturing</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our manufacturing facility is equipped with state-of-the-art machinery and advanced technology to produce high-quality cables that meet international standards.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((f) => (
                <div key={f.title} className="bg-section-alt rounded-lg p-8 border border-border">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2 text-lg">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
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

export default InfrastructurePage;
