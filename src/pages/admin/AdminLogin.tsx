import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Eye, EyeSlash } from "@phosphor-icons/react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const AdminLogin = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await signIn(email, password);
        setLoading(false);
        if (error) {
            toast.error("Login failed: " + error.message);
        } else {
            toast.success("Welcome back!");
            navigate("/admin");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative w-full max-w-md">
                {/* Logo / Brand */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F5A623] mb-6">
                        <ShieldCheck className="w-8 h-8 text-black" weight="bold" />
                    </div>
                    <h1 className="text-2xl font-bold text-white uppercase tracking-widest font-heading">
                        Sure Safety
                    </h1>
                    <p className="text-white/40 text-xs uppercase tracking-[0.3em] mt-2 font-heading">
                        Admin Portal
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur border border-white/10 p-10">
                    <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white/70 font-heading mb-8">
                        Sign in to continue
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-2 font-heading">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="admin@suresafety.co.zm"
                                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-2 font-heading">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-4 py-3 pr-12 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeSlash className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#F5A623] text-black font-heading font-bold text-xs uppercase tracking-[0.25em] py-4 hover:bg-[#e09518] transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-white/20 text-[10px] uppercase tracking-widest mt-8 font-heading">
                    Sure Safety Ltd · Admin Only
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
