import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificationsStrip from "@/components/CertificationsStrip";

const certs = [
  { name: "Safety Standards", desc: "Strict adherence to occupational health and safety regulations on all sites." },
  { name: "Quality Management", desc: "Systematic quality control ensuring consistent excellence in construction." },
  { name: "Resource Efficiency", desc: "Sustainable building practices that minimize waste and environmental impact." },
  { name: "Structural Integrity", desc: "Rigorous structural testing to ensure durability and long-term safety." },
  { name: "Industry Compliance", desc: "Fully licensed and recognized by national building and electrical authorities." },
  { name: "Expert Supervision", desc: "Constant on-site supervision by certified professional engineers." },
  { name: "Material Testing", desc: "Ensuring all raw materials meet or exceed Zambian building standards." },
  { name: "Client Satisfaction", desc: "Proven track record of delivering high-quality results for all stakeholders." },
];

const QualityPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-section-dark py-20">
          <div className="container text-center">
            <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Assurance</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-section-dark-fg">Quality & Safety</h1>
          </div>
        </section>

        <CertificationsStrip />

        <section className="py-20 bg-card">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Our Commitment</h2>
              <p className="text-muted-foreground">We maintain the highest international standards across all our construction processes and project delivery.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {certs.map((c) => (
                <div key={c.name} className="bg-section-alt rounded-lg p-5 border border-border text-center hover:border-primary/30 transition-colors">
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2 uppercase tracking-wide">{c.name}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
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

export default QualityPage;
