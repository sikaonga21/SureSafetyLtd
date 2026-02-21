import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutBg from "@/assets/about-bg.jpg";

const strengths = [
  { icon: Shield, title: "Quality Assured", desc: "ISO certified manufacturing processes" },
  { icon: Zap, title: "Innovation Driven", desc: "Cutting-edge cable technology" },
  { icon: Award, title: "Industry Leader", desc: "Trusted across Africa & Middle East" },
  { icon: Users, title: "Expert Team", desc: "Dedicated engineering professionals" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={aboutBg}
              alt="Cable manufacturing facility"
              className="rounded-lg shadow-2xl w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-8 py-4 rounded-lg shadow-lg hidden md:block">
              <p className="font-heading font-bold text-2xl">15+</p>
              <p className="text-sm opacity-90">Years of Excellence</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase">Who We Are</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
              Neelkanth Cables
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At Neelkanth Cables, we pride ourselves on being a pioneering force in the cable manufacturing industry. With a dedicated team of experts and a commitment to innovation, we have established ourselves as a reliable and trusted partner in the electrical and communication sectors.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our core values are integrity, quality, and customer satisfaction. We strive to push the boundaries of technology and set new standards in product excellence and service.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {strengths.map((s) => (
                <div key={s.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold mt-4">
                Request Quote <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
