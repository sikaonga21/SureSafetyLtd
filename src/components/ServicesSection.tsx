import { motion } from "framer-motion";
import { portfolioFeatured } from "@/data/portfolioImages";

const services = [
  {
    number: "01",
    title: "Real Estate Development",
    description:
      "We transform land into thriving residential, commercial, and mixed-use developments. Our team manages every stage—from feasibility studies and planning to construction and project delivery—ensuring sustainable, high-value investments.",
    image: portfolioFeatured.servicesCivil,
  },
  {
    number: "02",
    title: "Project & Construction Management",
    description:
      "We oversee projects from concept to completion, coordinating planning, budgeting, procurement, scheduling, quality assurance, and site supervision. Our integrated management approach ensures projects are delivered safely, on time, and within budget.",
    image: portfolioFeatured.servicesRoads,
  },
  {
    number: "03",
    title: "Architecture & Design",
    description:
      "Great projects begin with exceptional design. Our architects and designers create innovative, functional, and sustainable spaces that balance aesthetics, performance, and long-term value.",
    image: portfolioFeatured.servicesInterior,
  },
  {
    number: "04",
    title: "Civil Engineering & Infrastructure",
    description:
      "We design and construct critical infrastructure including roads, drainage systems, bridges, utilities, water networks, and public works that support sustainable community development.",
    image: portfolioFeatured.servicesPaving,
  },
  {
    number: "05",
    title: "Residential Construction",
    description:
      "From luxury homes and apartment developments to renovations and custom-built residences, we deliver high-quality residential projects tailored to our clients' vision and lifestyle.",
    image: portfolioFeatured.servicesCivil,
  },
  {
    number: "06",
    title: "Commercial & Industrial Construction",
    description:
      "We construct office buildings, shopping centres, warehouses, factories, manufacturing plants, and industrial facilities designed for efficiency, durability, and business growth.",
    image: portfolioFeatured.servicesRoads,
  },
  {
    number: "07",
    title: "Transmission & Power Infrastructure",
    description:
      "We provide engineering, construction, installation, and maintenance services for transmission lines, substations, and electrical infrastructure, delivering reliable power solutions for communities and industries.",
    image: portfolioFeatured.servicesElectrical,
  },
  {
    number: "08",
    title: "Interior Design & Fit-Out",
    description:
      "We create beautiful, functional interiors for residential, commercial, and corporate spaces. From concept development to final installation, we transform interiors that inspire and perform.",
    image: portfolioFeatured.servicesInterior,
  },
  {
    number: "09",
    title: "Aluminium & Building Solutions",
    description:
      "We design, fabricate, and install premium aluminium systems including windows, doors, curtain walls, partitions, facades, railings, and custom architectural features built for durability and elegance.",
    image: portfolioFeatured.servicesCivil,
  },
  {
    number: "10",
    title: "Property Management",
    description:
      "Our professional property management services include tenant relations, maintenance coordination, financial reporting, facility operations, and asset management to maximize long-term property value.",
    image: portfolioFeatured.servicesMaintenance,
  },
  {
    number: "11",
    title: "Investment & Property Advisory",
    description:
      "We help investors and developers identify profitable opportunities through feasibility studies, project evaluation, investment planning, capital advisory, and strategic real estate consulting.",
    image: portfolioFeatured.servicesCivil,
  },
  {
    number: "12",
    title: "Quantity Surveying & Cost Consultancy",
    description:
      "We provide accurate cost estimation, budgeting, tender documentation, procurement support, contract administration, and financial control to ensure cost-effective project delivery.",
    image: portfolioFeatured.servicesPaving,
  },
  {
    number: "13",
    title: "Renovation & Facility Maintenance",
    description:
      "We modernize existing residential, commercial, and industrial properties through renovations, remodeling, preventive maintenance, and facility management services that extend asset life and improve performance.",
    image: portfolioFeatured.servicesMaintenance,
  },
  {
    number: "14",
    title: "Healthcare Construction",
    description:
      "We design and build hospitals, clinics, laboratories, and specialized healthcare facilities that meet modern medical standards, ensuring safe, efficient, and patient-centered environments.",
    image: portfolioFeatured.servicesElectrical,
  },
  {
    number: "15",
    title: "Consultancy & Technical Advisory",
    description:
      "Our experienced professionals provide expert guidance on construction planning, engineering solutions, regulatory compliance, project feasibility, risk assessment, and development strategies to help clients make informed decisions.",
    image: portfolioFeatured.servicesRoads,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-card py-16 md:py-20">
      <div className="container">
        <div className="mb-10 max-w-4xl">
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.35em] text-primary">What We Do</p>
          <h2 className="mt-3 text-3xl font-heading font-bold uppercase leading-tight text-foreground md:text-4xl">
            We Develop Quality Infrastructure & Real Estate Projects
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            We provide comprehensive construction, engineering, and real estate solutions that deliver lasting value. From planning and design to construction, investment, and property management, we combine technical expertise with innovation to deliver projects that exceed expectations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="overflow-hidden rounded-[26px] border border-border bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
            >
              <div className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-[11px] font-heading font-bold uppercase tracking-[0.3em] text-primary">{service.number}</p>
                <h3 className="mt-3 text-2xl font-heading font-bold uppercase leading-tight text-foreground">{service.title}</h3>
                <div className="mt-4 h-0.5 w-12 bg-primary" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
