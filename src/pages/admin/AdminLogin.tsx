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
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5A623]/5 blur-[120px] rounded-full -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F5A623]/5 blur-[120px] rounded-full -ml-64 -mb-64" />

            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative w-full max-w-lg">
                {/* Logo / Brand */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F5A623] mb-8 shadow-[0_0_40px_rgba(245,166,35,0.2)]">
                        <ShieldCheck className="w-10 h-10 text-black" weight="bold" />
                    </div>
                    <h1 className="text-4xl font-bold text-white uppercase tracking-[0.2em] font-heading leading-tight">
                        Sure Safety
                    </h1>
                    <p className="text-[#F5A623] text-sm uppercase tracking-[0.3em] font-heading font-black mb-4">
                        Admin Central Console
                    </p>
                </div>

                {/* Card */}
                <div className="bg-[#0f0f0f] border border-white/5 p-12 lg:p-16 shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#F5A623]" />
                    <h2 className="text-base font-bold uppercase tracking-[0.3em] text-white/70 font-heading mb-12">
                        Authorization Required
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-3 font-heading">
                                Administrator Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="name@suresafety.co.zm"
                                className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-white/10 px-6 py-5 text-base font-body focus:outline-none focus:border-[#F5A623] transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-3 font-heading">
                                System Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••••••"
                                    className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-white/10 px-6 py-5 pr-14 text-base font-body focus:outline-none focus:border-[#F5A623] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-[#F5A623] transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeSlash className="w-6 h-6" />
                                    ) : (
                                        <Eye className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#F5A623] text-black font-heading font-bold text-xs uppercase tracking-[0.4em] py-6 hover:bg-white transition-all duration-500 mt-6 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,166,35,0.1)]"
                        >
                            {loading ? "Authenticating..." : "Establish Session"}
                        </button>
                    </form>
                </div>

                <div className="mt-12 text-center text-white/10 flex flex-col gap-2">
                    <p className="text-sm uppercase tracking-[0.4em] font-heading font-bold">
                        Sure Safety Ltd · Infrastructure Security
                    </p>
                    <p className="text-xs uppercase tracking-widest font-heading opacity-50">
                        Proprietary System · Access Restricted
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
