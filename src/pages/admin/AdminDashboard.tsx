import { useQuery } from "@tanstack/react-query";
import { FolderOpen, Newspaper, Briefcase, ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const StatCard = ({
    label,
    count,
    icon: Icon,
    href,
    color,
}: {
    label: string;
    count: number;
    icon: React.ElementType;
    href: string;
    color: string;
}) => (
    <Link
        to={href}
        className="group bg-[#0a0a0a] border border-white/5 p-8 hover:border-white/15 transition-all duration-300 flex flex-col justify-between min-h-[180px]"
    >
        <div className="flex items-start justify-between">
            <div
                className="w-12 h-12 flex items-center justify-center"
                style={{ background: `${color}20` }}
            >
                <Icon className="w-6 h-6" style={{ color }} weight="duotone" />
            </div>
            <ArrowRight
                className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all duration-300"
                weight="bold"
            />
        </div>
        <div className="mt-6">
            <p className="text-4xl font-bold text-white font-heading">{count}</p>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-heading mt-1">
                {label}
            </p>
        </div>
    </Link>
);

const AdminDashboard = () => {
    const { data: projects } = useQuery({
        queryKey: ["admin-projects-count"],
        queryFn: async () => {
            const { count } = await supabase
                .from("projects")
                .select("*", { count: "exact", head: true });
            return count ?? 0;
        },
    });

    const { data: news } = useQuery({
        queryKey: ["admin-news-count"],
        queryFn: async () => {
            const { count } = await supabase
                .from("news")
                .select("*", { count: "exact", head: true });
            return count ?? 0;
        },
    });

    const { data: careers } = useQuery({
        queryKey: ["admin-careers-count"],
        queryFn: async () => {
            const { count } = await supabase
                .from("careers")
                .select("*", { count: "exact", head: true });
            return count ?? 0;
        },
    });

    return (
        <div>
            {/* Header */}
            <div className="mb-10 pb-8 border-b border-white/5">
                <p className="text-[#F5A623] text-[10px] uppercase tracking-[0.35em] font-heading font-bold mb-2">
                    Overview
                </p>
                <h1 className="text-3xl font-bold text-white uppercase tracking-tight font-heading">
                    Dashboard
                </h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <StatCard
                    label="Total Projects"
                    count={projects ?? 0}
                    icon={FolderOpen}
                    href="/admin/projects"
                    color="#F5A623"
                />
                <StatCard
                    label="News Posts"
                    count={news ?? 0}
                    icon={Newspaper}
                    href="/admin/news"
                    color="#60A5FA"
                />
                <StatCard
                    label="Job Listings"
                    count={careers ?? 0}
                    icon={Briefcase}
                    href="/admin/careers"
                    color="#34D399"
                />
            </div>

            {/* Quick links */}
            <div className="bg-[#0a0a0a] border border-white/5 p-8">
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 font-heading mb-6">
                    Quick Actions
                </h2>
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: "Add Project", href: "/admin/projects" },
                        { label: "Add News Post", href: "/admin/news" },
                        { label: "Add Job Listing", href: "/admin/careers" },
                    ].map(({ label, href }) => (
                        <Link
                            key={href}
                            to={href}
                            className="bg-[#F5A623] text-black font-heading font-bold text-[10px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-[#e09518] transition-colors"
                        >
                            + {label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
