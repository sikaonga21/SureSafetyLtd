import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Construction, Gauge, Cpu, ShieldCheck } from "lucide-react";

const features = [
  { icon: Construction, title: "Modern Equipment", desc: "Advanced construction machinery and tools for high-precision building and site preparation." },
  { icon: Gauge, title: "Project Capacity", desc: "Scalable workforce and equipment to handle large-scale commercial and industrial infrastructure projects." },
  { icon: Cpu, title: "Safety Technology", desc: "Integrated safety management systems ensuring zero accidents and high efficiency across all sites." },
  { icon: ShieldCheck, title: "Quality Assurance", desc: "Rigorous inspection and testing protocols for all materials and workmanship on every project." },
];

const InfrastructurePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-section-dark py-20">
          <div className="container text-center">
            <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Capabilities</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-section-dark-fg">Our Infrastructure</h1>
          </div>
        </section>

        <section className="py-20 bg-card">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">World-Class Project Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our infrastructure is built on a foundation of expert management, high-performance equipment, and advanced safety protocols to deliver construction projects that exceed expectations.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((f) => (
                <div key={f.title} className="bg-section-alt rounded-lg p-8 border border-border hover:shadow-lg transition-all duration-300">
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
