import { Link } from "react-router-dom";
import { ArrowRight, Building2, Zap, Droplets, Paintbrush, Truck, Settings } from "lucide-react";
import { motion } from "framer-motion";
import productsBanner from "@/assets/products-banner.jpg";

const services = [
  {
    category: "CIVIL & CONSTRUCTION",
    items: [
      { name: "General Building", icon: Building2, desc: "New construction, renovations, and extensions for residential and commercial properties." },
      { name: "Painting & Finishing", icon: Paintbrush, desc: "Professional painting, tiling, and interior finishes that stand the test of time." },
      { name: "Road & Paving", icon: Truck, desc: "High-quality road construction and interlocking paving solutions for any infrastructure." },
    ],
  },
  {
    category: "MECHANICAL & ELECTRICAL",
    items: [
      { name: "Electrical Installation", icon: Zap, desc: "Complete wiring, lighting, and power system installations with a focus on safety." },
      { name: "Plumbing & HVAC", icon: Droplets, desc: "Advanced plumbing and air conditioning solutions for comfort and efficiency." },
      { name: "Facility Maintenance", icon: Settings, desc: "Ongoing maintenance services to keep your property in peak condition." },
    ],
  },
];

const ProductsSection = () => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-section-alt">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Our Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Our Core Services
          </h2>
        </motion.div>

        <motion.div
          className="rounded-xl overflow-hidden mb-16 shadow-lg"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={productsBanner}
            alt="Sure Safety construction site"
            className="w-full h-48 md:h-64 object-cover"
            loading="lazy"
          />
        </motion.div>

        <div className="space-y-12">
          {services.map((cat, catIdx) => (
            <div key={cat.category}>
              <motion.h3
                className="font-heading font-bold text-lg text-foreground mb-6 pb-2 border-b-2 border-primary/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                {cat.category}
              </motion.h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((service, i) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      to="/services"
                      className="group block bg-card h-full rounded-lg p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-heading font-semibold text-foreground mb-2">{service.name}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/services">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-heading font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              View All Services <ArrowRight className="inline ml-2 w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
