const certLogos = [
  { name: "DEWA", url: "https://neelkanthcables.com/images/dewa-logo.jpg" },
  { name: "Abu Dhabi Water", url: "https://neelkanthcables.com/images/abudhabi-water-authority.jpg" },
  { name: "Etihad Water", url: "https://neelkanthcables.com/images/ethihad-water-authority.png" },
  { name: "Etihad Rail", url: "https://neelkanthcables.com/images/Etihad_Rail_Logo.png" },
  { name: "ISO 9001", url: "https://neelkanthcables.com/images/iso9001.png" },
  { name: "ISO 14001", url: "https://neelkanthcables.com/images/iso14001.png" },
  { name: "ISO 45001", url: "https://neelkanthcables.com/images/iso45001.png" },
  { name: "SEWA", url: "https://neelkanthcables.com/images/sewa.png" },
  { name: "Emirates Quality Mark", url: "https://neelkanthcables.com/images/emirates-quality-mark.png" },
  { name: "BASEC", url: "https://neelkanthcables.com/images/basec.png" },
  { name: "CE", url: "https://neelkanthcables.com/images/ce.png" },
  { name: "RoHS", url: "https://neelkanthcables.com/images/rohs.png" },
];

const CertificationsStrip = () => {
  const doubled = [...certLogos, ...certLogos];

  return (
    <section className="py-8 bg-card border-y border-border overflow-hidden">
      <div className="flex animate-scroll-left" style={{ width: "max-content" }}>
        {doubled.map((logo, i) => (
          <div key={i} className="flex items-center justify-center px-8 shrink-0">
            <img
              src={logo.url}
              alt={logo.name}
              className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsStrip;
