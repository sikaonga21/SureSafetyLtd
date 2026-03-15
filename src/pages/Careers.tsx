import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
    Briefcase,
    MapPin,
    Clock,
    ArrowRight,
} from "@phosphor-icons/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

// Local assets
import careerHero from "@/assets/images/career-hero.jpg";

type Job = {
    id: string;
    title: string;
    type: string;
    location: string;
    description: string;
    is_active: boolean;
};

const SectionObserver = ({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Careers = () => {
    const { data: jobs = [], isLoading } = useQuery<Job[]>({
        queryKey: ["public-careers"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("careers")
                .select("*")
                .eq("is_active", true)
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as Job[];
        },
    });

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <SEO
                title="Careers"
                description="Join Sure Safety Limited and build your career with a community of experts dedicated to technical excellence in Zambia."
            />
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="relative h-[60vh] min-h-[400px] bg-section-charcoal overflow-hidden">
                    <img
                        src={careerHero}
                        alt="Careers at Sure Safety"
                        className="w-full h-full object-cover opacity-40 grayscale-[20%]"
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
                                    Opportunities
                                </p>
                                <h1
                                    className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight leading-none mb-4"
                                >
                                    Careers
                                </h1>
                                <div className="w-16 h-0.5 bg-primary mt-6 mb-8" />
                                <p className="text-white/70 text-sm md:text-base font-body max-w-xl leading-relaxed">
                                    Join a community of experts dedicated to building Zambia's future through safety and technical excellence.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Open Positions */}
                <section id="openings" className="py-24 bg-section-alt">
                    <div className="container">
                        <SectionObserver className="mb-16">
                            <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.3em] mb-4">
                                Vacancies
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-tight">
                                Open Positions
                            </h2>
                            <div className="w-12 h-0.5 bg-primary mt-6" />
                        </SectionObserver>

                        {/* Loading */}
                        {isLoading && (
                            <div className="space-y-4 max-w-5xl">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-32 bg-muted/20 animate-pulse" />
                                ))}
                            </div>
                        )}

                        {/* No active jobs */}
                        {!isLoading && jobs.length === 0 && (
                            <div className="py-16 text-center text-muted-foreground">
                                <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                <p className="font-heading uppercase tracking-widest text-sm">
                                    No open positions at the moment.
                                </p>
                                <p className="font-body text-sm mt-2">
                                    Check back soon or send us your CV below.
                                </p>
                            </div>
                        )}

                        {/* Job listings */}
                        {!isLoading && jobs.length > 0 && (
                            <div className="space-y-4 max-w-5xl">
                                {jobs.map((job, i) => (
                                    <SectionObserver key={job.id} delay={i * 0.08}>
                                        <div className="bg-card p-8 md:p-12 hover:shadow-2xl transition-all duration-500 group border border-transparent hover:border-primary/10">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                                <div className="space-y-4">
                                                    <div className="flex flex-wrap items-center gap-4">
                                                        <h3 className="text-xl font-heading font-bold text-foreground uppercase group-hover:text-primary transition-colors tracking-tight">
                                                            {job.title}
                                                        </h3>
                                                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-heading font-bold uppercase tracking-widest">
                                                            {job.type}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-6 text-[10px] text-muted-foreground font-heading font-bold uppercase tracking-widest">
                                                        <span className="flex items-center gap-2">
                                                            <MapPin className="w-4 h-4 text-primary" weight="fill" />{" "}
                                                            {job.location}
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4 text-primary" /> Posted recently
                                                        </span>
                                                    </div>
                                                    <p className="text-muted-foreground text-sm max-w-xl font-body leading-relaxed">
                                                        {job.description}
                                                    </p>
                                                </div>
                                                <Link
                                                    to="/contact"
                                                    className="bg-primary text-black font-heading font-bold text-xs uppercase tracking-[0.2em] px-10 py-4 hover:bg-black hover:text-primary transition-all flex items-center gap-2 shrink-0 self-start md:self-center shadow-lg"
                                                >
                                                    Apply Now <ArrowRight className="w-4 h-4" weight="bold" />
                                                </Link>
                                            </div>
                                        </div>
                                    </SectionObserver>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    );
};

export default Careers;
