import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jobs = [
    {
        id: 1,
        title: "Project Manager",
        location: "Lusaka, Zambia",
        type: "Full-Time",
        description: "Lead and oversee construction projects from inception to completion, ensuring quality and safety standards.",
    },
    {
        id: 2,
        title: "Electrical Engineer",
        location: "Kitwe, Zambia",
        type: "Full-Time",
        description: "Design, develop, and maintain electrical systems for various industrial and commercial projects.",
    },
    {
        id: 3,
        title: "Site Supervisor",
        location: "Lusaka, Zambia",
        type: "Contract",
        description: "Manage daily on-site activities and coordinate with subcontractors to ensure project timelines are met.",
    },
];

const Careers = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative py-20 bg-brand-blue text-white overflow-hidden">
                    <div className="container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                                Join Our Team at <span className="text-brand-green">Sure Safety</span>
                            </h1>
                            <p className="text-lg text-white/80 mb-8 leading-relaxed">
                                We are always looking for talented and passionate individuals to help us deliver excellence in construction and maintenance.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button className="bg-brand-green hover:bg-brand-green/90 text-white font-bold px-8 py-6 rounded-xl text-lg">
                                    View Openings
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-green/10 -skew-x-12 transform translate-x-1/2" />
                </section>

                {/* Why Join Us */}
                <section className="py-20 bg-white">
                    <div className="container">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-heading font-bold mb-4">Why Work With Us?</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                At Sure Safety Limited, we value innovation, integrity, and our people. We provide a dynamic work environment where you can grow your career.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "Career Growth", desc: "We invest in our employees' professional development and provide clear paths for advancement." },
                                { title: "Safety First", desc: "Our commitment to safety is unwavering, ensuring a secure environment for all our team members." },
                                { title: "Innovation", desc: "Work with the latest technology and innovative solutions in the construction industry." },
                            ].map((benefit, i) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-6">
                                        <CheckCircle className="w-6 h-6 text-brand-green" />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold mb-3">{benefit.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Job Listings */}
                <section id="openings" className="py-20 bg-slate-50">
                    <div className="container">
                        <h2 className="text-3xl font-heading font-bold mb-12 text-center">Open Positions</h2>

                        <div className="space-y-6 max-w-4xl mx-auto">
                            {jobs.map((job, i) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 group hover:border-brand-green transition-all"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <Briefcase className="w-5 h-5 text-brand-blue" />
                                                <h3 className="text-xl font-heading font-bold group-hover:text-brand-blue transition-colors">{job.title}</h3>
                                                <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold uppercase tracking-wider rounded-full text-slate-600">
                                                    {job.type}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4" /> {job.location}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4" /> Posted 2 days ago
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground text-sm max-w-2xl pt-2">
                                                {job.description}
                                            </p>
                                        </div>
                                        <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-6 shrink-0">
                                            Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </motion.div>
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
