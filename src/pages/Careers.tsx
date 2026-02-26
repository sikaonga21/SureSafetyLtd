import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
    Briefcase,
    MapPin,
    Clock,
    ArrowRight,
    RocketLaunch,
    ShieldCheck,
    Lightbulb,
    Handshake,
    Medal,
    TrendUp,
} from "@phosphor-icons/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

// Local assets
import careerHero from "@/assets/images/career-hero.jpg";

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

const benefits = [
    {
        icon: TrendUp,
        title: "Career Growth",
        desc: "Clear paths for advancement with continuous learning and mentorship programmes.",
    },
    {
        icon: ShieldCheck,
        title: "Safety Culture",
        desc: "Your wellbeing is paramount — we maintain a 100% safety compliance record.",
    },
    {
        icon: Lightbulb,
        title: "Innovation",
        desc: "Work with cutting-edge construction technology and modern building techniques.",
    },
    {
        icon: Handshake,
        title: "Team Spirit",
        desc: "A collaborative culture where every voice matters and achievements are celebrated.",
    },
    {
        icon: Medal,
        title: "Competitive Pay",
        desc: "Industry-leading compensation with performance bonuses and benefits.",
    },
    {
        icon: RocketLaunch,
        title: "Impact",
        desc: "Build infrastructure that shapes communities and improves lives across Zambia.",
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
                {/* 60vh Image Hero - Reduced Font Size */}
                <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
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

                {/* Why Work With Us */}
                <section className="py-24 bg-card">
                    <div className="container">
                        <SectionObserver className="mb-20">
                            <p className="text-primary font-heading font-semibold text-xs uppercase tracking-[0.3em] mb-4">
                                Culture
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase leading-tight mb-4 tracking-tight">
                                Build Your Future With Us
                            </h2>
                            <div className="w-12 h-0.5 bg-primary mb-8" />
                            <p className="text-muted-foreground text-sm font-body max-w-xl leading-relaxed">
                                We value innovation, integrity, and our people. We provide a
                                dynamic work environment where you can grow your career and make
                                a real impact.
                            </p>
                        </SectionObserver>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                            {benefits.map((b, i) => (
                                <SectionObserver key={b.title} delay={i * 0.05}>
                                    <div className="bg-card p-12 h-full group hover:bg-section-alt transition-colors duration-500">
                                        <b.icon
                                            className="w-10 h-10 text-primary mb-8 group-hover:scale-110 transition-transform"
                                            weight="duotone"
                                        />
                                        <h3 className="font-heading font-bold text-foreground text-xs uppercase tracking-widest mb-4">
                                            {b.title}
                                        </h3>
                                        <p className="text-muted-foreground text-xs leading-relaxed font-body">
                                            {b.desc}
                                        </p>
                                    </div>
                                </SectionObserver>
                            ))}
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

                {/* CTA */}
                <section className="py-32 bg-primary">
                    <div className="container">
                        <SectionObserver className="max-w-2xl px-6">
                            <h2 className="text-4xl md:text-6xl font-heading font-bold text-black uppercase leading-tight mb-8 tracking-tight">
                                DON'T SEE YOUR ROLE?
                            </h2>
                            <p className="text-black/70 text-lg font-body mb-12 leading-relaxed">
                                We're always interested in hearing from talented people. Send
                                us your CV and we'll keep you in mind for future opportunities.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-block bg-black text-primary text-xs font-heading font-bold uppercase tracking-[0.2em] px-12 py-5 hover:bg-white hover:text-black transition-all duration-300 shadow-2xl"
                            >
                                Get in Touch <ArrowRight className="w-4 h-4 inline-block ml-2" weight="bold" />
                            </Link>
                        </SectionObserver>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Careers;
