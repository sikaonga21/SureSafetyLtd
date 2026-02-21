import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, MapPin, ExternalLink, Calendar } from "lucide-react";

const projects = [
    {
        title: "Premium Residential Complex",
        category: "General Building",
        location: "Lusaka, Zambia",
        date: "Completed 2023",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
        description: "A high-end multi-unit residential project featuring modern amenities and sustainable building practices."
    },
    {
        title: "Corporate Headquarters Renovation",
        category: "Interior Finishing",
        location: "Kitwe, Zambia",
        date: "Completed 2024",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        description: "Complete interior fit-out and finishing for a 5-story corporate building, including HVAC and advanced electrical systems."
    },
    {
        title: "Industrial Warehouse Facility",
        category: "Civil Construction",
        location: "Ndola, Zambia",
        date: "In Progress",
        image: "https://images.unsplash.com/photo-1586528116311-ad861f676b0f?auto=format&fit=crop&q=80&w=800",
        description: "Large-scale industrial warehouse construction with specialized flooring and reinforced structural elements."
    },
    {
        title: "Main Road Expansion Project",
        category: "Road & Paving",
        location: "Chirundu, Zambia",
        date: "Completed 2022",
        image: "https://images.unsplash.com/photo-1517646285325-a86206d1598a?auto=format&fit=crop&q=80&w=800",
        description: "Strategic road infrastructure project involving expansion, paving, and drainage systems."
    }
];

const ProjectsSection = () => {
    return (
        <section id="projects" className="py-20 lg:py-28 bg-white">
            <div className="container">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-primary font-heading font-semibold text-sm tracking-wider uppercase mb-2">Our Portfolio</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                        Showcase of Excellence
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Discover some of our recently completed and ongoing projects that highlight our commitment to quality and safety.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            className="group bg-section-alt rounded-3xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                        >
                            <div className="grid lg:grid-cols-2 h-full">
                                <div className="relative h-64 lg:h-full overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 text-primary mb-4">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">{project.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                                        <MapPin className="w-4 h-4" />
                                        <span>{project.location}</span>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                                        {project.description}
                                    </p>
                                    <button className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest hover:gap-3 transition-all mt-auto group/btn">
                                        View Project <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-20 p-10 bg-section-dark rounded-3xl text-center relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="relative z-10">
                        <h3 className="text-2xl font-heading font-bold text-white mb-4">Have a similar project in mind?</h3>
                        <p className="text-section-dark-fg/60 mb-8 max-w-xl mx-auto">
                            Our team of experts is ready to help you bring your vision to life with safe and efficient construction solutions.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-heading font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1"
                        >
                            Start Your Project Today
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <Building2 size={240} className="text-white" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;
