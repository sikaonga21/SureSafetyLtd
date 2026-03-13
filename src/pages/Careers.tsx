import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, ArrowRight } from "@phosphor-icons/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jobs = [
    {
        id: 1,
        title: "Project Manager",
        location: "Lusaka, Zambia",
        type: "Full-Time",
        description:
            "Lead and oversee construction projects from inception to completion, ensuring quality and safety standards.",
    },
    {
        id: 2,
        title: "Electrical Engineer",
        location: "Kitwe, Zambia",
        type: "Full-Time",
        description:
            "Design, develop, and maintain electrical systems for various industrial and commercial projects.",
    },
    {
        id: 3,
        title: "Site Supervisor",
        location: "Lusaka, Zambia",
        type: "Contract",
        description:
            "Manage daily on-site activities and coordinate with subcontractors to ensure project timelines are met.",
    },
];

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
    const isInView = useInView(ref, { once: true, margin: "-60px" });
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
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Header />

            <main className="flex-1">
                {/* Vacancies */}
                <section id="openings" className="pt-32 pb-24 bg-section-alt">
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
                                            <button className="bg-primary text-black font-heading font-bold text-xs uppercase tracking-[0.2em] px-10 py-4 hover:bg-black hover:text-primary transition-all flex items-center gap-2 shrink-0 self-start md:self-center shadow-lg">
                                                Apply Now <ArrowRight className="w-4 h-4" weight="bold" />
                                            </button>
                                        </div>
                                    </div>
                                </SectionObserver>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Careers;
