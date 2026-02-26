import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, Buildings, ArrowRight } from "@phosphor-icons/react";

// Local assets
import projectHero from "@/assets/products-banner.jpg";

const projectGroups = [
    {
        category: "Large Scale Initiatives",
        period: "2016–Present",
        description: "Major engineering and logistics contracts for key institutions across Zambia.",
        items: [
            { name: "Various Commercial Buildings", year: "2023–2024", type: "General Building" },
            { name: "Corporate HQ Fit-Out", year: "2022–2023", type: "Interior Finishing" },
            { name: "Industrial Warehouse", year: "2023", type: "Civil Construction" },
            { name: "Government Building Upgrade", year: "2022", type: "Facility Maintenance" },
            { name: "Road Expansion Projects", year: "2021–2022", type: "Road & Paving" },
            { name: "Electrical Grid Installation", year: "2020–2021", type: "Electrical" },
        ],
    },
    {
        category: "Expansion Phase",
        period: "2015–2020",
        description: "Infrastructure support and corporate partnerships across Lusaka and Copperbelt.",
        items: [
            { name: "Commercial Complex Renovation", year: "2019–2020", type: "General Building" },
            { name: "Multi-Site Maintenance Contract", year: "2018–2019", type: "Maintenance" },
            { name: "Office Park Electrical", year: "2017–2018", type: "Electrical" },
            { name: "Industrial Plumbing Works", year: "2016–2017", type: "Plumbing" },
            { name: "Road Infrastructure", year: "2015–2016", type: "Road & Paving" },
        ],
    },
    {
        category: "Early Works",
        period: "2010–2015",
        description: "Foundational projects that established our reputation for quality and reliability.",
        items: [
            { name: "Residential Complex", year: "2014–2015", type: "General Building" },
            { name: "Commercial Fit-Out", year: "2013", type: "Interior Finishing" },
            { name: "Factory Electrical Installation", year: "2012", type: "Electrical" },
            { name: "Office Renovation", year: "2011–2012", type: "Renovation" },
            { name: "Initial Paving Contract", year: "2010–2011", type: "Road & Paving" },
        ],
    },
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

const ProjectsPage = () => {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1">
                {/* 60vh Image Hero - Reduced Font Size */}
                <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
                    <img
                        src={projectHero}
                        alt="Our Projects"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex items-center pt-24">
                        <div className="container">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.35em] mb-4">
                                    Our Track Record
                                </p>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight leading-none mb-4">
                                    Featured Projects
                                </h1>
                                <div className="w-16 h-0.5 bg-primary mt-6 ml-1" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Grouped timeline sections */}
                {projectGroups.map((group, gIndex) => (
                    <section
                        key={group.category}
                        className={`py-24 overflow-hidden ${gIndex % 2 === 1 ? "bg-section-alt" : "bg-card"}`}
                    >
                        <div className="container">
                            <SectionObserver>
                                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16 pb-8 border-b border-border">
                                    <div className="max-w-xl">
                                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase leading-tight tracking-tight">
                                            {group.category}
                                        </h2>
                                        <p className="text-muted-foreground mt-4 text-sm font-body leading-relaxed">{group.description}</p>
                                    </div>
                                    <span className="text-2xl font-heading font-bold text-primary whitespace-nowrap shrink-0 tracking-widest uppercase">
                                        {group.period}
                                    </span>
                                </div>
                            </SectionObserver>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                                {group.items.map((project, pIndex) => (
                                    <SectionObserver key={pIndex} delay={pIndex * 0.05}>
                                        <div className="group p-8 h-full bg-card hover:bg-section-alt transition-all duration-500">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                    <Buildings className="w-5 h-5 text-primary" weight="duotone" />
                                                </div>
                                                <div className="flex items-center text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {project.year}
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
                                                {project.type}
                                            </span>
                                            <h3 className="text-sm font-heading font-bold text-foreground uppercase group-hover:text-primary transition-colors leading-relaxed">
                                                {project.name}
                                            </h3>
                                        </div>
                                    </SectionObserver>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}

                {/* CTA */}
                <section className="py-24 bg-primary px-6">
                    <div className="container">
                        <SectionObserver>
                            <h2 className="text-4xl md:text-6xl font-heading font-bold text-black uppercase leading-tight mb-8 tracking-tight">
                                HAVE A PROJECT IN MIND?
                            </h2>
                            <p className="text-black/70 text-lg font-body mb-12 max-w-2xl leading-relaxed">
                                Partner with Sure Safety and experience reliable project delivery backed by over a decade of proven results.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-block bg-black text-primary text-xs font-heading font-bold uppercase tracking-[0.2em] px-12 py-5 hover:bg-white hover:text-black transition-all duration-300 shadow-2xl"
                            >
                                Start a Conversation <ArrowRight className="w-4 h-4 inline-block ml-2" weight="bold" />
                            </Link>
                        </SectionObserver>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProjectsPage;
