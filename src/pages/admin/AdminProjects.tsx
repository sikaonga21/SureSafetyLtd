import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, PencilSimple, Trash, X, Check } from "@phosphor-icons/react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Project = {
    id: string;
    name: string;
    type: string;
    year: string;
    category: string;
    description: string | null;
    created_at: string;
};

const emptyForm = { name: "", type: "", year: "", category: "", description: "" };

const CATEGORIES = ["Large Scale Initiatives", "Expansion Phase", "Early Works", "Other"];
const TYPES = [
    "General Building", "Interior Finishing", "Civil Construction", "Facility Maintenance",
    "Road & Paving", "Electrical", "Plumbing", "Renovation", "Maintenance", "Other",
];

const AdminProjects = () => {
    const qc = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const { data: projects = [], isLoading } = useQuery<Project[]>({
        queryKey: ["admin-projects"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data as Project[];
        },
    });

    const saveMutation = useMutation({
        mutationFn: async (data: typeof form) => {
            if (editId) {
                const { error } = await supabase.from("projects").update(data).eq("id", editId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("projects").insert(data);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-projects"] });
            qc.invalidateQueries({ queryKey: ["admin-projects-count"] });
            toast.success(editId ? "Project updated" : "Project created");
            setShowForm(false);
            setEditId(null);
            setForm(emptyForm);
        },
        onError: (e: Error) => toast.error(e.message),
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-projects"] });
            qc.invalidateQueries({ queryKey: ["admin-projects-count"] });
            toast.success("Project deleted");
            setDeleteConfirm(null);
        },
        onError: (e: Error) => toast.error(e.message),
    });

    const openAdd = () => {
        setEditId(null);
        setForm(emptyForm);
        setShowForm(true);
    };

    const openEdit = (p: Project) => {
        setEditId(p.id);
        setForm({
            name: p.name,
            type: p.type,
            year: p.year,
            category: p.category,
            description: p.description ?? "",
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
                    <p className="text-[#F5A623] text-[10px] uppercase tracking-[0.35em] font-heading font-bold mb-1">
                        Manage
                    </p>
                    <h1 className="text-3xl font-bold text-white uppercase tracking-tight font-heading">
                        Projects
                    </h1>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-[#F5A623] text-black font-heading font-bold text-[10px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-[#e09518] transition-colors"
                >
                    <Plus className="w-4 h-4" weight="bold" /> Add Project
                </button>
            </div>

            {/* Table */}
            {isLoading ? (
                <div className="flex justify-center py-16">
                    <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-20 text-white/30">
                    <p className="text-sm font-heading uppercase tracking-widest">No projects yet</p>
                    <button
                        onClick={openAdd}
                        className="mt-4 text-[#F5A623] text-xs font-heading font-bold uppercase tracking-widest hover:underline"
                    >
                        + Add your first project
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5">
                                {["Name", "Type", "Year", "Category", "Actions"].map((h) => (
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
                            {projects.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-b border-white/5 hover:bg-white/2 transition-colors group"
                                >
                                    <td className="py-4 pr-6 text-white font-body text-sm">{p.name}</td>
                                    <td className="py-4 pr-6 text-white/50 font-body text-xs">{p.type}</td>
                                    <td className="py-4 pr-6 text-white/50 font-body text-xs">{p.year}</td>
                                    <td className="py-4 pr-6 text-white/50 font-body text-xs">{p.category}</td>
                                    <td className="py-4 pr-6">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => openEdit(p)}
                                                className="w-8 h-8 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                                            >
                                                <PencilSimple className="w-3.5 h-3.5" />
                                            </button>
                                            {deleteConfirm === p.id ? (
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => deleteMutation.mutate(p.id)}
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
                                                    onClick={() => setDeleteConfirm(p.id)}
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
                                {editId ? "Edit Project" : "New Project"}
                            </h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-white/30 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            {[
                                { label: "Project Name", key: "name", placeholder: "e.g. Corporate HQ Fit-Out", required: true },
                                { label: "Year", key: "year", placeholder: "e.g. 2023 or 2022–2023", required: true },
                            ].map(({ label, key, placeholder, required }) => (
                                <div key={key}>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2 font-heading">
                                        {label}
                                    </label>
                                    <input
                                        type="text"
                                        value={form[key as keyof typeof form]}
                                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                        required={required}
                                        placeholder={placeholder}
                                        className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2 font-heading">
                                    Type
                                </label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors"
                                >
                                    <option value="" className="bg-[#0f0f0f]">Select type...</option>
                                    {TYPES.map((t) => (
                                        <option key={t} value={t} className="bg-[#0f0f0f]">{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2 font-heading">
                                    Category
                                </label>
                                <select
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors"
                                >
                                    <option value="" className="bg-[#0f0f0f]">Select category...</option>
                                    {CATEGORIES.map((c) => (
                                        <option key={c} value={c} className="bg-[#0f0f0f]">{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2 font-heading">
                                    Description (optional)
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={3}
                                    placeholder="Brief description of the project..."
                                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors resize-none"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={saveMutation.isPending}
                                    className="flex-1 bg-[#F5A623] text-black font-heading font-bold text-[10px] uppercase tracking-[0.2em] py-4 hover:bg-[#e09518] transition-colors disabled:opacity-50"
                                >
                                    {saveMutation.isPending ? "Saving..." : (editId ? "Update Project" : "Create Project")}
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

export default AdminProjects;
