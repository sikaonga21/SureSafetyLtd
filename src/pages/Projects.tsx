import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, Buildings, ArrowRight } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

// Local assets
import projectHero from "@/assets/products-banner.jpg";

type Project = {
    id: string;
    name: string;
    type: string;
    year: string;
    category: string;
    description: string | null;
};

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
    const { data: projects = [], isLoading } = useQuery<Project[]>({
        queryKey: ["public-projects"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as Project[];
        },
    });

    // Group projects by category
    const grouped = projects.reduce<Record<string, Project[]>>((acc, p) => {
        if (!acc[p.category]) acc[p.category] = [];
        acc[p.category].push(p);
        return acc;
    }, {});
    const groups = Object.entries(grouped);

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <SEO
                title="Our Projects"
                description="A showcase of our featured construction, electrical, and maintenance projects delivered across Zambia."
            />
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="relative h-[60vh] min-h-[400px] bg-section-charcoal overflow-hidden">
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

                {/* Loading */}
                {isLoading && (
                    <section className="py-24 bg-card">
                        <div className="container">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-40 bg-muted/20 animate-pulse" />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* No projects */}
                {!isLoading && groups.length === 0 && (
                    <section className="py-32 bg-card flex items-center justify-center">
                        <p className="text-muted-foreground font-heading uppercase tracking-widest text-sm">
                            Projects coming soon.
                        </p>
                    </section>
                )}

                {/* Grouped sections */}
                {!isLoading && groups.map(([category, items], gIndex) => (
                    <section
                        key={category}
                        className={`py-24 overflow-hidden ${gIndex % 2 === 1 ? "bg-section-alt" : "bg-card"}`}
                    >
                        <div className="container">
                            <SectionObserver>
                                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16 pb-8 border-b border-border">
                                    <div className="max-w-xl">
                                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase leading-tight tracking-tight">
                                            {category}
                                        </h2>
                                    </div>
                                    <span className="text-2xl font-heading font-bold text-primary whitespace-nowrap shrink-0 tracking-widest uppercase">
                                        {items.length} Project{items.length !== 1 ? "s" : ""}
                                    </span>
                                </div>
                            </SectionObserver>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                                {items.map((project, pIndex) => (
                                    <SectionObserver key={project.id} delay={pIndex * 0.05}>
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
                                            {project.description && (
                                                <p className="text-muted-foreground text-xs font-body mt-3 leading-relaxed">
                                                    {project.description}
                                                </p>
                                            )}
                                        </div>
                                    </SectionObserver>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}

                {/* CTA */}
                <section className="py-24 bg-section-dark px-6">
                    <div className="container">
                        <SectionObserver>
                            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase leading-tight mb-8 tracking-tight">
                                HAVE A PROJECT IN MIND?
                            </h2>
                            <p className="text-white/70 text-lg font-body mb-12 max-w-2xl leading-relaxed">
                                Partner with Sure Safety and experience reliable project delivery backed by over a decade of proven results.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-block bg-white text-primary text-xs font-heading font-bold uppercase tracking-[0.2em] px-12 py-5 hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl"
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
