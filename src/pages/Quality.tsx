import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificationsStrip from "@/components/CertificationsStrip";

const certs = [
  { name: "ISO 9001:2015", desc: "Quality Management System ensuring consistent quality in all processes." },
  { name: "ISO 14001:2015", desc: "Environmental Management System for sustainable manufacturing practices." },
  { name: "ISO 45001:2018", desc: "Occupational Health and Safety Management System for worker safety." },
  { name: "ISO/IEC 17025:2017", desc: "Accredited testing laboratory for reliable and accurate test results." },
  { name: "BASEC Certified", desc: "British Approvals Service for Cables — internationally recognized certification." },
  { name: "CE Marking", desc: "Conformity with European health, safety, and environmental standards." },
  { name: "RoHS Compliant", desc: "Restriction of Hazardous Substances — environmentally responsible products." },
  { name: "Emirates Quality Mark", desc: "UAE quality certification demonstrating adherence to local standards." },
];

const QualityPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-section-dark py-20">
          <div className="container text-center">
            <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Standards</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-section-dark-fg">Quality & Certifications</h1>
          </div>
        </section>

        <CertificationsStrip />

        <section className="py-20 bg-card">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Our Certifications</h2>
              <p className="text-muted-foreground">We maintain the highest international standards across all our manufacturing processes and products.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {certs.map((c) => (
                <div key={c.name} className="bg-section-alt rounded-lg p-5 border border-border text-center">
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2">{c.name}</h3>
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
