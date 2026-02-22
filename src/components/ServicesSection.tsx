import { Link } from "react-router-dom";
import { ArrowRight, Building2, Zap, Droplets, Paintbrush, Truck, Settings } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    category: "CIVIL & CONSTRUCTION",
    items: [
      {
        name: "General Building",
        icon: Building2,
        desc: "New construction, renovations, and extensions for residential and commercial properties.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Painting & Finishing",
        icon: Paintbrush,
        desc: "Professional painting, tiling, and interior finishes that stand the test of time.",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Road & Paving",
        icon: Truck,
        desc: "High-quality road construction and interlocking paving solutions for any infrastructure.",
        image: "https://images.unsplash.com/photo-1517646285325-a86206d1598a?auto=format&fit=crop&q=80&w=800"
      },
    ],
  },
  {
    category: "MECHANICAL & ELECTRICAL",
    items: [
      {
        name: "Electrical Installation",
        icon: Zap,
        desc: "Complete wiring, lighting, and power system installations with a focus on safety.",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Plumbing & HVAC",
        icon: Droplets,
        desc: "Advanced plumbing and air conditioning solutions for comfort and efficiency.",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Facility Maintenance",
        icon: Settings,
        desc: "Ongoing maintenance services to keep your property in peak condition.",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800"
      },
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
          <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Our Expertise</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Our Core Services
          </h2>
        </motion.div>

        <div className="space-y-20">
          {services.map((cat, catIdx) => (
            <div key={cat.category}>
              <motion.h3
                className="font-heading font-bold text-xl text-foreground mb-10 pb-2 border-b-2 border-primary/20 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-2 h-8 bg-primary rounded-full"></div>
                {cat.category}
              </motion.h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cat.items.map((service, i) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <Link
                      to="/contact"
                      className="group block bg-card h-full rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-lg">
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{service.name}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 h-20 overflow-hidden line-clamp-3">{service.desc}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-wider">
                            Get a Quote <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/contact">
            <button className="bg-primary text-primary-foreground px-10 py-4 rounded-xl font-heading font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
              Consult Our Experts Now <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
