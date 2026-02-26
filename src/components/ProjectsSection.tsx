import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Buildings, MapPin, ArrowUpRight, Calendar } from "@phosphor-icons/react";

// Use local assets where possible, fallback to Unsplash if missing specific project images
import project1 from "@/assets/images/construction-1.jpg";
import project2 from "@/assets/images/maintenace.jpg";
import project3 from "@/assets/images/genreral-construction.jpg";

const projects = [
    {
        title: "Premium Residential Complex",
        category: "General Building",
        location: "Lusaka, Zambia",
        date: "Completed 2023",
        image: project1,
        description: "A high-end multi-unit residential project featuring modern amenities and sustainable building practices."
    },
    {
        title: "Corporate Headquarters Renovation",
        category: "Interior Finishing",
        location: "Kitwe, Zambia",
        date: "Completed 2024",
        image: project2,
        description: "Complete interior fit-out and finishing for a 5-story corporate building, including HVAC and advanced electrical systems."
    },
    {
        title: "Industrial Warehouse Facility",
        category: "Civil Construction",
        location: "Ndola, Zambia",
        date: "In Progress",
        image: project3,
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
        <section id="projects" className="py-20 lg:py-28 bg-card">
            <div className="container">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-primary font-heading font-semibold text-xs uppercase tracking-wider mb-2">Our Portfolio</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground uppercase tracking-tight">
                        Showcase of Excellence
                    </h2>
                    <div className="w-12 h-0.5 bg-primary mx-auto mt-4" />
                    <p className="text-muted-foreground mt-6 max-w-2xl mx-auto font-body text-sm">
                        Discover some of our recently completed and ongoing projects that highlight our commitment to quality and safety.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-px bg-border">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            className="group bg-card overflow-hidden transition-all duration-500 hover:z-10"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                        >
                            <div className="flex flex-col h-full border border-transparent hover:border-primary/20 transition-all">
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute top-0 left-0 p-6">
                                        <span className="px-4 py-2 bg-primary text-black text-[10px] font-heading font-bold uppercase tracking-widest shadow-xl">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-10 flex flex-col justify-center flex-grow">
                                    <div className="flex items-center gap-2 text-primary mb-4">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-[10px] font-heading font-bold uppercase tracking-widest">{project.date}</span>
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight uppercase">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-muted-foreground text-[10px] mb-6 uppercase tracking-wider">
                                        <MapPin className="w-4 h-4" />
                                        <span>{project.location}</span>
                                    </div>
                                    <p className="text-muted-foreground text-xs leading-relaxed mb-8 font-body">
                                        {project.description}
                                    </p>
                                    <button className="flex items-center gap-2 text-primary text-[10px] font-heading font-bold uppercase tracking-widest hover:gap-3 transition-all mt-auto group/btn">
                                        View Project <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-20 p-12 bg-section-dark text-center relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="relative z-10">
                        <h3 className="text-2xl font-heading font-bold text-white mb-4 uppercase tracking-tight">Have a similar project in mind?</h3>
                        <p className="text-white/60 mb-8 max-w-xl mx-auto font-body text-sm">
                            Our team of experts is ready to help you bring your vision to life with safe and efficient construction solutions.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block bg-primary text-black px-10 py-4 font-heading font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl"
                        >
                            Start Your Project Today
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <Buildings size={240} className="text-white" weight="duotone" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;
