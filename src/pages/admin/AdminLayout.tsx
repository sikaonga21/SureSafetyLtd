import { useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import {
    ShieldCheck,
    FolderOpen,
    Newspaper,
    Briefcase,
    SquaresFour,
    SignOut,
    List,
    X,
} from "@phosphor-icons/react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const navItems = [
    { label: "Dashboard", icon: SquaresFour, href: "/admin" },
    { label: "Projects", icon: FolderOpen, href: "/admin/projects" },
    { label: "News", icon: Newspaper, href: "/admin/news" },
    { label: "Careers", icon: Briefcase, href: "/admin/careers" },
];

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

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
                    <div className="w-9 h-9 bg-[#F5A623] flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 text-black" weight="bold" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm uppercase tracking-widest font-heading leading-none">
                            Sure Safety
                        </p>
                        <p className="text-white/30 text-[9px] uppercase tracking-[0.25em] font-heading mt-0.5">
                            Admin Panel
                        </p>
                    </div>
                    <button
                        className="ml-auto text-white/30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
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
                                className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] font-heading transition-all duration-200 ${isActive
                                        ? "bg-[#F5A623] text-black"
                                        : "text-white/50 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <Icon className="w-4 h-4 shrink-0" weight={isActive ? "bold" : "regular"} />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User / Sign out */}
                <div className="px-6 py-5 border-t border-white/5">
                    <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-heading mb-1 truncate">
                        {session.user.email}
                    </p>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-white/40 hover:text-red-400 text-[10px] font-bold uppercase tracking-widest font-heading transition-colors mt-2"
                    >
                        <SignOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar (mobile) */}
                <div className="lg:hidden flex items-center gap-4 px-4 py-4 border-b border-white/5 bg-[#0a0a0a]">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-white/50 hover:text-white"
                    >
                        <List className="w-6 h-6" />
                    </button>
                    <p className="text-white font-bold text-sm uppercase tracking-widest font-heading">
                        Sure Safety Admin
                    </p>
                </div>

                <main className="flex-1 overflow-auto p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
