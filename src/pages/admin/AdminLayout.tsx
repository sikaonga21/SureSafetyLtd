import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import {
    ShieldCheck,
    SquaresFour,
    FolderOpen,
    Newspaper,
    Briefcase,
    SignOut,
    List,
    X,
} from "@phosphor-icons/react";
import { useAuth } from "@/hooks/useAuth";

const AdminLayout = () => {
    const { session, loading, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !session) {
            navigate("/admin/login");
        }
    }, [session, loading, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    const handleSignOut = async () => {
        await signOut();
        navigate("/admin/login");
    };

    const navItems = [
        { label: "Dashboard", icon: SquaresFour, href: "/admin" },
        { label: "Projects", icon: FolderOpen, href: "/admin/projects" },
        { label: "News", icon: Newspaper, href: "/admin/news" },
        { label: "Careers", icon: Briefcase, href: "/admin/careers" },
    ];

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex overflow-hidden">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                {/* Brand Logo */}
                <div className="flex items-center gap-4 px-8 py-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                    <div className="w-10 h-10 bg-[#F5A623] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,166,35,0.2)]">
                        <ShieldCheck className="w-6 h-6 text-black" weight="bold" />
                    </div>
                    <div>
                        <h1 className="text-sm font-heading font-bold uppercase tracking-widest leading-tight">
                            Sure Safety
                        </h1>
                        <p className="text-white/30 text-sm uppercase tracking-[0.3em] font-heading mt-0.5 font-medium">
                            Admin Central
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map(({ label, icon: Icon, href }) => {
                        const isActive =
                            href === "/admin"
                                ? location.pathname === "/admin"
                                : location.pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                to={href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-4 px-6 py-4 text-[13px] font-bold uppercase tracking-[0.2em] font-heading transition-all duration-300 relative group ${isActive
                                    ? "text-black bg-[#F5A623]"
                                    : "text-white/40 hover:text-white hover:bg-white/[0.03]"
                                    }`}
                            >
                                <Icon className="w-5 h-5 shrink-0" weight={isActive ? "bold" : "regular"} />
                                {label}
                                {isActive && (
                                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-black/20" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info / Sign Out */}
                <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#F5A623] font-bold text-sm border border-white/5">
                            {session.user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-white/70 text-sm font-bold uppercase tracking-wider font-heading truncate">
                                {session.user.email}
                            </span>
                            <span className="text-white/20 text-sm uppercase tracking-widest font-heading">
                                Authenticated Admin
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/5 hover:bg-red-500/10 text-red-400/60 hover:text-red-400 text-sm font-heading font-bold uppercase tracking-[0.25em] text-white/30 px-6 mb-6 transition-all duration-300 border border-white/5"
                    >
                        <SignOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 relative h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0a0a0a] sticky top-0 z-10 w-full">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -ml-2 text-white/50 hover:text-[#F5A623] transition-colors"
                    >
                        <List className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#F5A623] flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-black" weight="bold" />
                        </div>
                        <span className="text-white font-bold text-sm uppercase tracking-widest font-heading">
                            Sure Safety Panel
                        </span>
                    </div>
                    <div className="w-10" /> {/* Spacer */}
                </header>

                {/* Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-[#0d0d0d]">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
