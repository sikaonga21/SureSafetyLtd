import { useQuery } from "@tanstack/react-query";
import {
    ProjectorScreen,
    Newspaper,
    Briefcase,
    ArrowUpRight,
    Plus
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const StatCard = ({ title, count, icon: Icon, color, href }: any) => (
    <Link
        to={href}
        className="group bg-[#0a0a0a] border border-white/5 p-8 lg:p-10 hover:border-[#F5A623]/20 transition-all duration-500 relative overflow-hidden"
    >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/5 blur-[80px] group-hover:bg-${color}-500/10 transition-all duration-700`} />
        <div className="relative flex items-center justify-between mb-8">
            <div className="w-14 h-14 bg-white/[0.03] flex items-center justify-center text-[#F5A623] group-hover:bg-[#F5A623] group-hover:text-black transition-all duration-500 shadow-xl">
                <Icon className="w-7 h-7" weight="duotone" />
            </div>
            <ArrowUpRight className="w-6 h-6 text-white/10 group-hover:text-[#F5A623] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
        </div>
        <p className="text-white/40 font-heading font-bold text-sm uppercase tracking-[0.2em] mb-3">
            {title}
        </p>
        <h3 className="text-5xl font-bold text-white font-heading tracking-tighter">
            {count}
        </h3>
    </Link>
);

const AdminDashboard = () => {
    const { data: projectsCount = 0 } = useQuery({
        queryKey: ["admin-projects-count"],
        queryFn: async () => {
            const { count, error } = await supabase.from("projects").select("*", { count: "exact", head: true });
            if (error) throw error;
            return count || 0;
        },
    });

    const { data: newsCount = 0 } = useQuery({
        queryKey: ["admin-news-count"],
        queryFn: async () => {
            const { count, error } = await supabase.from("news").select("*", { count: "exact", head: true });
            if (error) throw error;
            return count || 0;
        },
    });

    const { data: careersCount = 0 } = useQuery({
        queryKey: ["admin-careers-count"],
        queryFn: async () => {
            const { count, error } = await supabase.from("careers").select("*", { count: "exact", head: true });
            if (error) throw error;
            return count || 0;
        },
    });

    return (
        <div className="space-y-12">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <p className="text-[#F5A623] text-base uppercase tracking-[0.2em] font-heading font-bold mb-3">
                        System Overview
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter font-heading leading-none">
                        Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Back.</span>
                    </h1>
                    <div className="w-20 h-1 bg-[#F5A623] mt-8" />
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        to="/admin/projects"
                        className="flex items-center gap-3 bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/10 px-6 py-4 text-sm font-bold uppercase tracking-widest font-heading transition-all border border-white/5"
                    >
                        <Plus className="w-4 h-4" weight="bold" /> New Project
                    </Link>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-px bg-white/5">
                <StatCard
                    title="Active Projects"
                    count={projectsCount}
                    icon={ProjectorScreen}
                    color="amber"
                    href="/admin/projects"
                />
                <StatCard
                    title="News Articles"
                    count={newsCount}
                    icon={Newspaper}
                    color="blue"
                    href="/admin/news"
                />
                <StatCard
                    title="Open Careers"
                    count={careersCount}
                    icon={Briefcase}
                    color="emerald"
                    href="/admin/careers"
                />
            </div>

            {/* Quick Actions / Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                <div className="bg-[#0a0a0a] border border-white/5 p-10">
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest font-heading mb-8">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: "Publish News", icon: Plus, path: "/admin/news" },
                            { label: "Post Job", icon: Plus, path: "/admin/careers" },
                            { label: "Update Projects", icon: ProjectorScreen, path: "/admin/projects" },
                            { label: "Check Messages", icon: Newspaper, path: "/contact" },
                        ].map((action) => (
                            <Link
                                key={action.label}
                                to={action.path}
                                className="flex items-center gap-4 p-5 bg-white/5 hover:bg-[#F5A623] text-white/50 hover:text-black transition-all duration-300 group"
                            >
                                <action.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-bold uppercase tracking-widest">
                                    {action.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/5 p-10 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 text-white/10">
                        <ChartLineUp className="w-8 h-8" />
                    </div>
                    <h3 className="text-white/50 text-base font-bold uppercase tracking-widest font-heading mb-2">
                        No Alerts
                    </h3>
                    <p className="text-white/20 text-sm font-body max-w-xs">
                        System is running healthy. All core functions are synchronized.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Internal icon for placeholder
const ChartLineUp = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

export default AdminDashboard;
