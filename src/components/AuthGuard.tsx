import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                toast.error("Please login to access the admin panel");
                navigate("/admin/login");
            } else {
                setAuthenticated(true);
            }
            setLoading(false);
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                setAuthenticated(false);
                navigate("/admin/login");
            } else {
                setAuthenticated(true);
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 font-medium">Checking authentication...</p>
                </div>
            </div>
        );
    }

    return authenticated ? <>{children}</> : null;
};

export default AuthGuard;
