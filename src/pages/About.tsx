import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle, Target, Eye, Trophy, Shield, Lightning, Globe, Users } from "@phosphor-icons/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

// Local assets
import aboutHero from "@/assets/about-bg.jpg";
import teamWork from "@/assets/images/abt-us-const.jpg";

const values = [
  { title: "Client Focus", description: "We prioritize our clients and strive to provide them with the best possible solutions and service, tailored to their specific needs." },
  { title: "Communication", description: "We believe in clear and open communication with clients, ensuring they are kept informed at every stage of a project." },
  { title: "Excellence", description: "We maintain high standards of quality and performance in all aspects of our business operations, from project delivery to customer service." },
  { title: "Integrity", description: "We conduct ourselves with honesty, transparency, and accountability in all our dealings with clients, partners, and stakeholders." },
  { title: "Innovation", description: "We continuously seek new and innovative ways to improve our products, services, and processes, and stay ahead of the curve." },
  { title: "Collaboration", description: "We foster a culture of teamwork and collaboration, working closely with clients, partners, and colleagues to achieve shared goals." },
];

const strengths = [
  { icon: Shield, title: "Quality Assured", desc: "Every project meets international standards with rigorous quality checks at every stage." },
  { icon: Lightning, title: "Innovation", desc: "Modern construction techniques and sustainable building solutions for every challenge." },
  { icon: Trophy, title: "Certified", desc: "Fully compliant with local and international construction safety and quality standards." },
  { icon: Users, title: "Expert Team", desc: "Skilled engineers and technicians with decades of combined experience." },
  { icon: Target, title: "Custom Solutions", desc: "Tailored infrastructure solutions for specific commercial and residential requirements." },
  { icon: Globe, title: "Total Reach", desc: "Reliably serving clients across Lusaka and the entire Copperbelt region." },
];

const SectionObserver = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        {/* Page Hero - Reduced Font Size */}
        <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
          <img
            src={aboutHero}
            alt="About Sure Safety"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center pt-24">
            <div className="container">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.35em] mb-4">
                  The Company
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight leading-none mb-4">
                  About Us
                </h1>
                <div className="w-16 h-0.5 bg-primary" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pull Quote */}
        <section className="py-24 bg-card">
          <div className="container">
            <SectionObserver className="max-w-4xl mx-auto text-center">
              <p className="font-heading font-bold text-foreground text-3xl md:text-5xl uppercase leading-tight tracking-tight">
                "CHOOSE SURE SAFETY AND EXPERIENCE THE PEACE OF MIND THAT COMES WITH EXPERT KNOWLEDGE, DEEP COMMITMENT, AND DELIVERED RESULTS."
              </p>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-10" />
            </SectionObserver>
          </div>
        </section>

        {/* Integrated Mission / Vision / Heritage - Redesigned for better aesthetics */}
        <section className="bg-section-alt py-0 overflow-hidden">
          <div className="container lg:px-0">
            <div className="grid lg:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  text: "To provide innovative and cost-effective solutions, high quality services, and reliable construction management to our customers through a commitment and passion for what we do.",
                  bg: "bg-card"
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  text: "To become the top choice for clients and employees seeking long-term business relationships through exceptional service delivery and market leadership by 2030.",
                  bg: "bg-section-dark text-white"
                },
                {
                  icon: Trophy,
                  title: "Our Heritage",
                  text: "Founded with a dedication to safety and excellence, Sure Safety has grown to deliver over 500 projects across Zambia — built on trust, quality, and repeat business.",
                  bg: "bg-primary text-black"
                },
              ].map((item, index) => (
                <SectionObserver key={item.title} delay={index * 0.1}>
                  <div className={`p-16 h-full flex flex-col justify-center min-h-[400px] ${item.bg}`}>
                    <item.icon className="w-10 h-10 mb-8 shrink-0" weight="duotone" />
                    <h3 className="text-xl font-heading font-bold uppercase tracking-widest mb-6">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed font-body opacity-80">
                      {item.text}
                    </p>
                  </div>
                </SectionObserver>
              ))}
            </div>
          </div>
        </section>

        {/* Text + Image split */}
        <section className="py-24 md:py-32 bg-card">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <SectionObserver>
                <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Our Approach</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase leading-tight mb-4 tracking-tight">
                  SAFETY & EXCELLENCE AT EVERY STAGE
                </h2>
                <div className="w-12 h-0.5 bg-primary mb-8" />
                <div className="space-y-6 text-muted-foreground leading-relaxed font-body text-sm">
                  <p>At Sure Safety Limited, our objective is to effectively manage long-term relationships with our clients by providing integrated construction, electrical, and maintenance solutions that add real value to their operations.</p>
                  <p>We strive to develop lasting partnerships with a focus on safety compliance, quality workmanship, and predictable project delivery — across all scales of engagement.</p>
                </div>
                <Link to="/services" className="inline-flex items-center gap-2 text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-all group mt-12">
                  Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" weight="bold" />
                </Link>
              </SectionObserver>
              <SectionObserver>
                <div className="relative overflow-hidden">
                  <img
                    src={teamWork}
                    alt="Team at work"
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 backdrop-blur-sm -z-10" />
                </div>
              </SectionObserver>
            </div>
          </div>
        </section>

        {/* Our Strengths — Grid */}
        <section className="py-24 bg-section-alt">
          <div className="container">
            <SectionObserver className="mb-16 text-center">
              <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.3em] mb-4">Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-tight">What Sets Us Apart</h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-6" />
            </SectionObserver>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {strengths.map((s, i) => (
                <SectionObserver key={s.title} delay={i * 0.05}>
                  <div className="bg-card p-10 h-full group hover:bg-section-alt transition-colors duration-500">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <s.icon className="w-6 h-6 text-primary" weight="fill" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-xs uppercase tracking-widest mb-4">{s.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed font-body">{s.desc}</p>
                  </div>
                </SectionObserver>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values — Dark Section */}
        <section className="py-24 md:py-32 bg-section-dark">
          <div className="container">
            <SectionObserver className="mb-20">
              <p className="text-primary font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Foundation</p>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase leading-none tracking-tight">Our Core Values</h2>
              <div className="w-20 h-0.5 bg-primary mt-8" />
            </SectionObserver>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
              {values.map((value, i) => (
                <SectionObserver key={value.title} delay={i * 0.05}>
                  <div className="bg-section-dark p-12 h-full group hover:bg-white/5 transition-colors duration-500">
                    <div className="flex items-start gap-4 mb-6">
                      <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" weight="fill" />
                      <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wider">{value.title}</h3>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed font-body">{value.description}</p>
                  </div>
                </SectionObserver>
              ))}
            </div>
          </div>
        </section>

        {/* Primary CTA */}
        <section className="py-32 bg-primary">
          <div className="container">
            <SectionObserver className="max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-black uppercase leading-tight mb-8 tracking-tight">
                READY TO WORK WITH US?
              </h2>
              <p className="text-black/70 text-lg font-body mb-12 max-w-xl leading-relaxed">
                Experience professionalism, transparency, and results-driven construction and maintenance solutions.
              </p>
              <Link to="/contact" className="inline-block bg-black text-primary text-xs font-heading font-bold uppercase tracking-[0.2em] px-12 py-5 hover:bg-white hover:text-black transition-all duration-300 shadow-2xl">
                Get in Touch
              </Link>
            </SectionObserver>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
