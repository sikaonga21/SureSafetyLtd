import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, PencilSimple, Trash, X, Check, Eye, EyeSlash } from "@phosphor-icons/react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Job = {
    id: string;
    title: string;
    type: string;
    location: string;
    description: string;
    is_active: boolean;
    created_at: string;
};

const emptyForm = { title: "", type: "", location: "", description: "", is_active: true };
const TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const LOCATIONS = ["Ndola, HQ", "Copperbelt Office", "Kitwe Regional", "Remote", "On-site / Field"];

const AdminCareers = () => {
    const qc = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const { data: jobs = [], isLoading } = useQuery<Job[]>({
        queryKey: ["admin-careers"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("careers")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as Job[];
        },
    });

    const saveMutation = useMutation({
        mutationFn: async (data: typeof form) => {
            if (editId) {
                const { error } = await supabase.from("careers").update(data).eq("id", editId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("careers").insert(data);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-careers"] });
            qc.invalidateQueries({ queryKey: ["admin-careers-count"] });
            toast.success(editId ? "Job updated" : "Job posted");
            setShowForm(false);
            setEditId(null);
            setForm(emptyForm);
        },
        onError: (e: Error) => toast.error(e.message),
    });

    const toggleStatusMutation = useMutation({
        mutationFn: async ({ id, is_active }: { id: string, is_active: boolean }) => {
            const { error } = await supabase.from("careers").update({ is_active: !is_active }).eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-careers"] });
            toast.success("Visibility updated");
        },
        onError: (e: Error) => toast.error(e.message),
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("careers").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-careers"] });
            qc.invalidateQueries({ queryKey: ["admin-careers-count"] });
            toast.success("Job deleted");
            setDeleteConfirm(null);
        },
        onError: (e: Error) => toast.error(e.message),
    });

    const openAdd = () => {
        setEditId(null);
        setForm(emptyForm);
        setShowForm(true);
    };

    const openEdit = (p: Job) => {
        setEditId(p.id);
        setForm({
            title: p.title,
            type: p.type,
            location: p.location,
            description: p.description,
            is_active: p.is_active,
        });
        setShowForm(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveMutation.mutate(form);
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-12 pb-12 border-b border-white/5 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <p className="text-[#F5A623] text-sm uppercase tracking-[0.4em] font-heading font-black mb-3">
                        Talent Acquisition
                    </p>
                    <h1 className="text-4xl font-bold text-white uppercase tracking-tighter font-heading">
                        Job <span className="text-white/20">Listings</span>
                    </h1>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-3 bg-[#F5A623] text-black font-heading font-bold text-sm uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#e09518] transition-all shadow-xl"
                >
                    <Plus className="w-5 h-5" weight="bold" /> Post Job
                </button>
            </div>

            {/* Table */}
            {isLoading ? (
                <div className="flex justify-center py-24">
                    <div className="w-10 h-10 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-32 bg-white/[0.02] border border-dashed border-white/5">
                    <p className="text-base font-heading uppercase tracking-widest text-white/30">No vacancies registered</p>
                    <button
                        onClick={openAdd}
                        className="mt-6 text-[#F5A623] text-sm font-heading font-bold uppercase tracking-widest hover:underline"
                    >
                        + Create global vacancy
                    </button>
                </div>
            ) : (
                <div className="bg-[#0a0a0a] border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    {["Position", "Type", "Status", "Management"].map((h) => (
                                        <th
                                            key={h}
                                            className="text-left text-sm font-bold uppercase tracking-[0.25em] text-white/40 font-heading px-8 py-6"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {jobs.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="hover:bg-white/[0.03] transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <span className="text-white font-heading font-bold text-base block mb-0.5 tracking-tight">{p.title}</span>
                                            <span className="text-white/30 text-[11px] uppercase tracking-widest font-heading">{p.location}</span>
                                        </td>
                                        <td className="px-8 py-6 text-white/50 font-body text-sm font-medium">{p.type}</td>
                                        <td className="px-8 py-6">
                                            <button
                                                onClick={() => toggleStatusMutation.mutate(p)}
                                                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full font-heading font-bold text-[10px] uppercase tracking-widest transition-all ${p.is_active
                                                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                                                    }`}
                                            >
                                                {p.is_active ? <Eye className="w-4 h-4" /> : <EyeSlash className="w-4 h-4" />}
                                                {p.is_active ? "Live" : "Draft"}
                                            </button>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => openEdit(p)}
                                                    className="w-10 h-10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-[#F5A623] transition-all border border-white/5"
                                                >
                                                    <PencilSimple className="w-5 h-5" />
                                                </button>
                                                {deleteConfirm === p.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => deleteMutation.mutate(p.id)}
                                                            className="px-4 h-10 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-black font-heading font-bold text-[10px] uppercase tracking-widest transition-all border border-red-500/20"
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteConfirm(null)}
                                                            className="w-10 h-10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all border border-white/5"
                                                        >
                                                            <X className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setDeleteConfirm(p.id)}
                                                        className="w-10 h-10 bg-white/5 hover:bg-red-500/10 flex items-center justify-center text-white/40 hover:text-red-400 transition-all border border-white/5"
                                                    >
                                                        <Trash className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
                    <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex items-center justify-between px-10 py-8 border-b border-white/5 bg-white/[0.01]">
                            <h2 className="text-lg font-bold uppercase tracking-[0.3em] text-white font-heading">
                                {editId ? "Update Vacancy" : "Establish New Role"}
                            </h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="w-10 h-10 flex items-center justify-center text-white/20 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold uppercase tracking-[0.25em] text-white/40 mb-3 font-heading">
                                        Position Title
                                    </label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        required
                                        placeholder="e.g. Senior Electrical Engineer"
                                        className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-white/10 px-6 py-4 text-base font-body focus:outline-none focus:border-[#F5A623] transition-colors"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold uppercase tracking-[0.25em] text-white/40 mb-3 font-heading">
                                            Employment Type
                                        </label>
                                        <select
                                            value={form.type}
                                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                                            required
                                            className="w-full bg-white/[0.03] border border-white/10 text-white px-6 py-4 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors cursor-pointer"
                                        >
                                            <option value="" className="bg-[#0f0f0f]">Select type...</option>
                                            {TYPES.map((t) => (
                                                <option key={t} value={t} className="bg-[#0f0f0f]">{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold uppercase tracking-[0.25em] text-white/40 mb-3 font-heading">
                                            Placement
                                        </label>
                                        <select
                                            value={form.location}
                                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                                            required
                                            className="w-full bg-white/[0.03] border border-white/10 text-white px-6 py-4 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors cursor-pointer"
                                        >
                                            <option value="" className="bg-[#0f0f0f]">Select location...</option>
                                            {LOCATIONS.map((l) => (
                                                <option key={l} value={l} className="bg-[#0f0f0f]">{l}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold uppercase tracking-[0.25em] text-white/40 mb-3 font-heading">
                                    Job Description / Scope of Work
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    required
                                    rows={6}
                                    placeholder="Detailed responsibilities and requirements..."
                                    className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-white/10 px-6 py-4 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors resize-none leading-relaxed"
                                />
                            </div>

                            <div className="flex items-center gap-4 py-4 px-6 bg-white/[0.02] border border-white/5">
                                <input
                                    type="checkbox"
                                    checked={form.is_active}
                                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                                    id="is_active"
                                    className="w-5 h-5 bg-white/[0.03] border-white/10 rounded focus:ring-[#F5A623] text-[#F5A623] transition-colors"
                                />
                                <label htmlFor="is_active" className="text-sm font-heading font-bold uppercase tracking-[0.2em] text-white/60 cursor-pointer">
                                    Publish immediately (Live on website)
                                </label>
                            </div>

                            <div className="flex gap-4 pt-10 border-t border-white/5">
                                <button
                                    type="submit"
                                    disabled={saveMutation.isPending}
                                    className="flex-1 bg-[#F5A623] text-black font-heading font-bold text-xs uppercase tracking-[0.25em] py-5 hover:bg-white transition-all duration-500 disabled:opacity-50 shadow-xl"
                                >
                                    {saveMutation.isPending ? "Journaling..." : (editId ? "Update Record" : "Post Vacancy")}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-10 bg-white/5 text-white/50 font-heading font-bold text-xs uppercase tracking-[0.25em] hover:bg-white/10 hover:text-white transition-all border border-white/5"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCareers;
