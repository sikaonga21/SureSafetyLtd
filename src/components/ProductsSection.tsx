import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import productsBanner from "@/assets/products-banner.jpg";

const products = [
  {
    category: "LOW VOLTAGE CABLES",
    items: [
      { name: "Single Core Flexible Cables", desc: "Versatile wires with a single conductor, ideal for industrial and domestic wiring." },
      { name: "Multicore Flexible Cables", desc: "Multiple conductors within a single sheath for complex wiring applications." },
      { name: "Twin Flat ECC Cables", desc: "Perfect for domestic electrical setups, ensuring safe power distribution." },
      { name: "Control Cables", desc: "Specialized cables for control signal transmission in various applications." },
      { name: "LSZH Copper Cables", desc: "Low smoke zero halogen cables, safer for indoor use in enclosed spaces." },
      { name: "Submersible Cables", desc: "Designed to operate underwater for submersible pumps and equipment." },
    ],
  },
  {
    category: "MEDIUM VOLTAGE CABLES",
    items: [
      { name: "MV Armoured Cables", desc: "Safe power transmission between 1kV and 36kV with mechanical protection." },
      { name: "MV Unarmoured Cables", desc: "Flexible design for protected environments at medium voltage ranges." },
    ],
  },
  {
    category: "SPECIAL APPLICATION",
    items: [
      { name: "Solar Cables", desc: "Designed for photovoltaic system interconnection in harsh conditions." },
      { name: "Fire Alarm Cables", desc: "BS 7629-1 compliant cables for fire & smoke alarm systems." },
      { name: "Instrumentation Cables", desc: "Accurate signal transmission in control and instrumentation systems." },
    ],
  },
];

const ProductsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-section-alt">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Solutions</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Explore Our Products
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
            alt="Cable products lineup"
            className="w-full h-48 md:h-64 object-cover"
            loading="lazy"
          />
        </motion.div>

        <div className="space-y-12">
          {products.map((cat, catIdx) => (
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
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      to="/products"
                      className="group block bg-card rounded-lg p-5 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
                    >
                      <h4 className="font-heading font-semibold text-foreground mb-2">{item.name}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.desc}</p>
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
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
          <Link to="/products">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-heading font-semibold hover:bg-primary/90 transition-colors">
              View All Products <ArrowRight className="inline ml-2 w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
