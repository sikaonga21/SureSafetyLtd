import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "@phosphor-icons/react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

// Local assets
import newsHero from "@/assets/products-banner.jpg";

type NewsPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  date: string;
  author: string;
  category: string;
  image_url: string | null;
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

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800";

const NewsPage = () => {
  const { data: posts = [], isLoading } = useQuery<NewsPost[]>({
    queryKey: ["public-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("date", { ascending: false });
      if (error) throw error;
      return data as NewsPost[];
    },
  });

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <SEO
        title="News & Insights"
        description="Stay updated with the latest news, industrial insights, and project highlights from Sure Safety Limited in Zambia."
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] bg-section-charcoal overflow-hidden">
          <img
            src={newsHero}
            alt="News & Insights"
            className="w-full h-full object-cover opacity-50 grayscale-[20%]"
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
                  Insights
                </p>
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight leading-none mb-4"
                >
                  News
                </h1>
                <div className="w-16 h-0.5 bg-primary mt-6 mb-8" />
                <p className="text-white/70 text-sm md:text-base font-body max-w-xl leading-relaxed">
                  Stay updated with the latest in Zambian construction, electrical safety, and industrial innovation.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Loading */}
        {isLoading && (
          <section className="py-24 bg-card">
            <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-muted/20 animate-pulse" />
              ))}
            </div>
          </section>
        )}

        {/* No posts */}
        {!isLoading && posts.length === 0 && (
          <section className="py-32 bg-card flex items-center justify-center">
            <p className="text-muted-foreground font-heading uppercase tracking-widest text-sm">
              No news posts yet.
            </p>
          </section>
        )}

        {/* Featured Post */}
        {!isLoading && posts.length > 0 && (
          <section className="py-24 bg-card">
            <div className="container">
              <SectionObserver>
                <div className="group border border-border overflow-hidden bg-section-alt transition-all duration-500">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative h-64 lg:h-[450px] overflow-hidden">
                      <img
                        src={posts[0].image_url || DEFAULT_IMAGE}
                        alt={posts[0].title}
                        className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <span className="absolute top-6 left-6 bg-primary text-black text-[10px] font-heading font-bold uppercase tracking-[0.2em] px-5 py-2">
                        Featured
                      </span>
                    </div>
                    <div className="p-10 lg:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-[10px] font-heading font-bold text-primary uppercase tracking-[0.2em] mb-8">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> {posts[0].date}
                        </span>
                        <span className="w-px h-3 bg-border" />
                        <span className="flex items-center gap-2">
                          <Tag className="w-4 h-4" /> {posts[0].category}
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-6 leading-tight group-hover:text-primary transition-colors uppercase tracking-tight">
                        {posts[0].title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-10 font-body">
                        {posts[0].excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-xs">
                            {posts[0].author[0]}
                          </div>
                          <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-foreground opacity-60">
                            {posts[0].author}
                          </span>
                        </div>
                        <button className="flex items-center gap-2 text-primary font-heading font-bold text-[10px] uppercase tracking-[0.2em] group-hover:gap-3 transition-all">
                          Read Story <ArrowRight className="w-4 h-4" weight="bold" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionObserver>
            </div>
          </section>
        )}

        {/* Post Grid */}
        {!isLoading && posts.length > 1 && (
          <section className="pb-32 bg-card">
            <div className="container">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {posts.slice(1).map((post, i) => (
                  <SectionObserver key={post.id} delay={i * 0.08}>
                    <div className="group bg-card h-full flex flex-col p-8 hover:bg-section-alt transition-all duration-500">
                      <div className="relative h-56 overflow-hidden mb-8">
                        <img
                          src={post.image_url || DEFAULT_IMAGE}
                          alt={post.title}
                          className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                        <span className="absolute bottom-4 left-4 bg-primary text-black text-[9px] font-heading font-bold uppercase tracking-[0.2em] px-3 py-1">
                          {post.category}
                        </span>
                      </div>
                      <div className="flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
                          <Calendar className="w-3.5 h-3.5" /> {post.date}
                        </div>
                        <h3 className="text-base font-heading font-bold text-foreground mb-4 leading-snug group-hover:text-primary transition-colors uppercase">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-8 line-clamp-3 font-body">
                          {post.excerpt}
                        </p>
                        <button className="flex items-center gap-2 text-primary font-heading font-bold text-[10px] uppercase tracking-[0.2em] mt-auto group-hover:gap-3 transition-all">
                          Read Story <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                        </button>
                      </div>
                    </div>
                  </SectionObserver>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
