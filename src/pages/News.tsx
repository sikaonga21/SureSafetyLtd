import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "Revolutionizing Sustainable Construction in Zambia",
    excerpt: "Exploring new eco-friendly materials and building techniques that are setting new standards for the local industry.",
    date: "May 15, 2024",
    author: "Eng. Chileshe Banda",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Sure Safety Limited Expands Operations to the Copperbelt",
    excerpt: "We are proud to announce the opening of our new regional office in Kitwe to better serve our industrial clients.",
    date: "April 28, 2024",
    author: "Admin",
    category: "Company News",
    image: "https://images.unsplash.com/photo-1517646285325-a86206d1598a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "The Importance of Regular Facility Maintenance",
    excerpt: "Why preventative maintenance is the key to longevity and safety for commercial and residential properties.",
    date: "April 10, 2024",
    author: "Maintenance Team",
    category: "Technical Tips",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Advanced Electrical Safety for Industrial Sites",
    excerpt: "A deep dive into the latest safety protocols for large-scale electrical installations and high-voltage systems.",
    date: "March 22, 2024",
    author: "Technical Dept",
    category: "Safety",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
  }
];

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-section-dark py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          </div>
          <div className="container relative z-10 text-center">
            <motion.p
              className="text-primary font-heading font-bold text-sm tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Latest Updates
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              News & Insights
            </motion.h1>
            <motion.p
              className="text-section-dark-fg/60 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Stay informed about our latest projects, industry innovations, and company announcements.
            </motion.p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-20">
          <div className="container">
            <motion.div
              className="group relative bg-section-alt rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-[450px] overflow-hidden">
                  <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">Featured</span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs font-bold text-primary uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {posts[0].date}</span>
                    <span className="w-1 h-1 bg-border rounded-full" />
                    <span className="flex items-center gap-1.5 uppercase leading-none"><Tag className="w-4 h-4" /> {posts[0].category}</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6 leading-tight group-hover:text-primary transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {posts[0].author[0]}
                      </div>
                      <span className="text-sm font-semibold text-foreground/80">{posts[0].author}</span>
                    </div>
                    <button className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all">
                      Read Full Story <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Post Grid */}
        <section className="pb-32">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map((post, i) => (
                <motion.div
                  key={post.id}
                  className="group bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="relative h-56 overflow-hidden rounded-t-2xl">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-[9px] font-bold uppercase tracking-wider rounded-md">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <button className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mt-auto group-hover:gap-3 transition-all">
                      Read Story <ArrowRight className="w-4 h-4" />
                    </button>
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

export default NewsPage;
