import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, PencilSimple, Trash, X, Check } from "@phosphor-icons/react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Career = {
    id: string;
    title: string;
    type: string;
    location: string;
    description: string;
    is_active: boolean;
    created_at: string;
};

const emptyForm = {
    title: "",
    type: "Full-time",
    location: "Lusaka, Zambia",
    description: "",
    is_active: true,
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Temporary"];
const LOCATIONS = ["Lusaka, Zambia", "Copperbelt, Zambia", "Kitwe, Zambia", "Ndola, Zambia", "Remote", "Other"];

const AdminCareers = () => {
    const qc = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const { data: careers = [], isLoading } = useQuery<Career[]>({
        queryKey: ["admin-careers"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("careers")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as Career[];
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
            toast.success(editId ? "Job updated" : "Job created");
            setShowForm(false);
            setEditId(null);
            setForm(emptyForm);
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
            toast.success("Job listing deleted");
            setDeleteConfirm(null);
        },
        onError: (e: Error) => toast.error(e.message),
    });

    const toggleActiveMutation = useMutation({
        mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
            const { error } = await supabase.from("careers").update({ is_active }).eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-careers"] });
            toast.success("Status updated");
        },
        onError: (e: Error) => toast.error(e.message),
    });

    const openAdd = () => {
        setEditId(null);
        setForm(emptyForm);
        setShowForm(true);
    };

    const openEdit = (c: Career) => {
        setEditId(c.id);
        setForm({
            title: c.title,
            type: c.type,
            location: c.location,
            description: c.description,
            is_active: c.is_active,
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
            <div className="mb-8 pb-8 border-b border-white/5 flex items-center justify-between gap-4">
                <div>
                    <p className="text-[#34D399] text-[10px] uppercase tracking-[0.35em] font-heading font-bold mb-1">
                        Manage
                    </p>
                    <h1 className="text-3xl font-bold text-white uppercase tracking-tight font-heading">
                        Careers
                    </h1>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-[#F5A623] text-black font-heading font-bold text-[10px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-[#e09518] transition-colors"
                >
                    <Plus className="w-4 h-4" weight="bold" /> Add Job
                </button>
            </div>

            {/* Table */}
            {isLoading ? (
                <div className="flex justify-center py-16">
                    <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : careers.length === 0 ? (
                <div className="text-center py-20 text-white/30">
                    <p className="text-sm font-heading uppercase tracking-widest">No job listings yet</p>
                    <button
                        onClick={openAdd}
                        className="mt-4 text-[#F5A623] text-xs font-heading font-bold uppercase tracking-widest hover:underline"
                    >
                        + Add your first listing
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5">
                                {["Title", "Type", "Location", "Status", "Actions"].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 font-heading pb-4 pr-6"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {careers.map((c) => (
                                <tr key={c.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                    <td className="py-4 pr-6 text-white font-body text-sm">{c.title}</td>
                                    <td className="py-4 pr-6 text-white/50 font-body text-xs whitespace-nowrap">{c.type}</td>
                                    <td className="py-4 pr-6 text-white/50 font-body text-xs whitespace-nowrap">{c.location}</td>
                                    <td className="py-4 pr-6">
                                        <button
                                            onClick={() => toggleActiveMutation.mutate({ id: c.id, is_active: !c.is_active })}
                                            className={`text-[9px] font-bold uppercase tracking-widest font-heading px-3 py-1.5 transition-colors ${c.is_active
                                                    ? "bg-[#34D399]/15 text-[#34D399] hover:bg-red-500/15 hover:text-red-400"
                                                    : "bg-white/5 text-white/30 hover:bg-[#34D399]/15 hover:text-[#34D399]"
                                                }`}
                                        >
                                            {c.is_active ? "Active" : "Inactive"}
                                        </button>
                                    </td>
                                    <td className="py-4 pr-6">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => openEdit(c)}
                                                className="w-8 h-8 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                                            >
                                                <PencilSimple className="w-3.5 h-3.5" />
                                            </button>
                                            {deleteConfirm === c.id ? (
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => deleteMutation.mutate(c.id)}
                                                        className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-red-400 transition-all"
                                                    >
                                                        <Check className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirm(null)}
                                                        className="w-8 h-8 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 transition-all"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setDeleteConfirm(c.id)}
                                                    className="w-8 h-8 bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/50 hover:text-red-400 transition-all"
                                                >
                                                    <Trash className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white font-heading">
                                {editId ? "Edit Job Listing" : "New Job Listing"}
                            </h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-white/30 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2 font-heading">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    required
                                    placeholder="e.g. Health & Safety Inspector"
                                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2 font-heading">
                                    Employment Type
                                </label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors"
                                >
                                    {JOB_TYPES.map((t) => (
                                        <option key={t} value={t} className="bg-[#0f0f0f]">{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2 font-heading">
                                    Location
                                </label>
                                <select
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors"
                                >
                                    {LOCATIONS.map((l) => (
                                        <option key={l} value={l} className="bg-[#0f0f0f]">{l}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2 font-heading">
                                    Description
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    required
                                    rows={4}
                                    placeholder="Describe the role and requirements..."
                                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors resize-none"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setForm({ ...form, is_active: !form.is_active })}
                                    className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${form.is_active ? "bg-[#34D399]" : "bg-white/10"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${form.is_active ? "translate-x-4" : "translate-x-0.5"
                                            }`}
                                    />
                                </button>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 font-heading">
                                    {form.is_active ? "Active (visible on site)" : "Inactive (hidden)"}
                                </span>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={saveMutation.isPending}
                                    className="flex-1 bg-[#F5A623] text-black font-heading font-bold text-[10px] uppercase tracking-[0.2em] py-4 hover:bg-[#e09518] transition-colors disabled:opacity-50"
                                >
                                    {saveMutation.isPending ? "Saving..." : (editId ? "Update Job" : "Create Job")}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-6 bg-white/5 text-white/50 font-heading font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
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
