import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Buildings, ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import useEmblaCarousel from 'embla-carousel-react';

import PortfolioGallery from "@/components/PortfolioGallery";
import { portfolioFeatured } from "@/data/portfolioImages";

type Project = {
    id: string;
    name: string;
    type: string;
    year: string;
    category: string;
    description: string | null;
    image_urls: string[];
};

const Slideshow = ({ images }: { images: string[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = () => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi]);

    if (!images || images.length === 0) {
        return <div className="w-full h-full bg-muted/10 flex items-center justify-center"><Buildings className="w-12 h-12 text-white/5" weight="duotone" /></div>;
    }

    return (
        <div className="relative h-full overflow-hidden group">
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {images.map((url, index) => (
                        <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                            <img
                                src={url}
                                alt=""
                                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={() => emblaApi?.scrollPrev()}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-black z-10"
                    >
                        <CaretLeft weight="bold" />
                    </button>
                    <button
                        onClick={() => emblaApi?.scrollNext()}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-black z-10"
                    >
                        <CaretRight weight="bold" />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 transition-all duration-300 ${i === selectedIndex ? "w-6 bg-primary" : "w-2 bg-white/30"}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
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

const ProjectCard = ({ project, pIndex }: { project: Project; pIndex: number }) => {
    return (
        <SectionObserver delay={pIndex * 0.05} className="h-full">
            <div className="group bg-card border border-white/5 h-full flex flex-col hover:border-primary/20 transition-all duration-500 overflow-hidden shadow-2xl">
                <div className="relative h-64 sm:h-72 overflow-hidden">
                    <Slideshow images={project.image_urls} />
                    <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-xs font-heading font-bold uppercase tracking-widest text-primary">
                            {project.type}
                        </span>
                    </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {project.year}
                        </div>
                    </div>

                    <h3 className="text-base font-heading font-bold text-foreground uppercase group-hover:text-primary transition-colors leading-relaxed mb-4 tracking-tight">
                        {project.name}
                    </h3>

                    {project.description && (
                        <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6 line-clamp-3">
                            {project.description}
                        </p>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                        <span className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-white/20">
                            {project.category}
                        </span>
                        <div className="w-4 h-0.5 bg-primary/30 group-hover:w-8 group-hover:bg-primary transition-all duration-500" />
                    </div>
                </div>
            </div>
        </SectionObserver>
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
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="relative h-[65vh] min-h-[500px] bg-[#0a0a0a] overflow-hidden">
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.5 }}
                        transition={{ duration: 1.5 }}
                        src={portfolioFeatured.projectsHero}
                        alt="Our Projects"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center pt-20">
                        <div className="container">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="max-w-2xl"
                            >
                                <p className="text-primary font-heading font-semibold text-sm uppercase tracking-[0.4em] mb-6">
                                    Trusted Performance
                                </p>
                                <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-white uppercase tracking-tighter leading-[0.9] mb-8">
                                    Proven <br /> <span className="text-primary">Excellence</span>
                                </h1>
                                <div className="w-24 h-1 bg-primary mb-8" />
                                <p className="text-white/50 text-base md:text-lg font-body leading-relaxed max-w-lg">
                                    A showcase of our most ambitious infrastructure and engineering projects across Zambia.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute bottom-0 right-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-20 hidden lg:block">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
                    </div>
                </section>

                <PortfolioGallery className="bg-[#0a0a0a] [&_.text-foreground]:text-white [&_.text-muted-foreground]:text-white/50 [&_.bg-card]:bg-[#111] [&_.border-border]:border-white/10" />

                {/* Loading */}
                {isLoading && (
                    <section className="py-24 bg-[#0a0a0a]">
                        <div className="container">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-[450px] bg-white/5 animate-pulse rounded-none border border-white/5" />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Grouped sections */}
                {!isLoading && groups.sort((a, b) => {
                    const order = ["Large Scale Initiatives", "Expansion Phase", "Early Works"];
                    return order.indexOf(a[0]) - order.indexOf(b[0]);
                }).map(([category, items], gIndex) => (
                    <section
                        key={category}
                        className={`py-32 px-4 overflow-hidden ${gIndex % 2 === 1 ? "bg-[#0d0d0d]" : "bg-[#0a0a0a]"}`}
                    >
                        <div className="container">
                            <SectionObserver>
                                <div className="mb-16">
                                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase leading-tight tracking-tighter">
                                        {category}
                                    </h2>
                                    <div className="w-12 h-1 bg-primary mt-4" />
                                </div>
                            </SectionObserver>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {items.map((project, pIndex) => (
                                    <ProjectCard key={project.id} project={project} pIndex={pIndex} />
                                ))}
                            </div>
                        </div>
                    </section>
                ))}

                {/* CTA */}
                <section className="py-40 bg-[#0a0a0a] relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary opacity-[0.02]" />
                    <div className="container relative z-10 px-6">
                        <SectionObserver className="text-center max-w-4xl mx-auto">
                            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase leading-[0.9] mb-10 tracking-tighter">
                                Building the <span className="text-primary italic">Future</span> of Zambia
                            </h2>
                            <p className="text-white/40 text-lg md:text-xl font-body mb-16 max-w-2xl mx-auto leading-relaxed">
                                Join our network of partners and institutional clients. Experience reliable project delivery backed by over a decade of results.
                            </p>
                            <Link
                                to="/contact"
                                className="group relative inline-flex items-center gap-4 bg-primary text-black font-heading font-bold text-sm uppercase tracking-[0.25em] px-14 py-6 hover:bg-white transition-all duration-500"
                            >
                                Start a Partnership
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" weight="bold" />
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
