import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";

const Projects = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                {/* Page Hero */}
                <section className="relative py-24 bg-section-dark overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
                    </div>
                    <div className="container relative z-10 text-center">
                        <p className="text-primary font-heading font-bold text-sm tracking-[0.3em] uppercase mb-4">Our Track Record</p>
                        <h1 className="text-5xl md:text-6xl font-heading font-bold text-white leading-tight">Featured Projects</h1>
                        <p className="text-section-dark-fg/60 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                            Explore our portfolio of successfully delivered projects, ranging from large-scale commercial buildings to precise technical installations.
                        </p>
                    </div>
                </section>

                {/* Projects Gallery */}
                <ProjectsSection />
            </main>
            <Footer />
        </div>
    );
};

export default Projects;
