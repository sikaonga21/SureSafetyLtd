import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, PencilSimple, Trash, X, Check, Image as ImageIcon, UploadSimple } from "@phosphor-icons/react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Project = {
    id: string;
    name: string;
    type: string;
    year: string;
    category: string;
    description: string | null;
    image_urls: string[];
    created_at: string;
};

const emptyForm = {
    name: "",
    type: "",
    year: "",
    category: "",
    description: "",
    image_urls: [] as string[]
};

const CATEGORIES = ["Large Scale Initiatives", "Expansion Phase", "Early Works", "Other"];
const TYPES = [
    "General Building", "Interior Finishing", "Civil Construction", "Facility Maintenance",
    "Road & Paving", "Electrical", "Plumbing", "Renovation", "Maintenance", "Other",
];

const AdminProjects = () => {
    const qc = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

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

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newUrls: string[] = [...form.image_urls];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error } = await supabase.storage
                .from('project-images')
                .upload(filePath, file);

            if (error) {
                toast.error(`Error uploading ${file.name}: ${error.message}`);
                continue;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('project-images')
                .getPublicUrl(filePath);

            newUrls.push(publicUrl);
        }

        setForm({ ...form, image_urls: newUrls });
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeImage = (url: string) => {
        setForm({
            ...form,
            image_urls: form.image_urls.filter(u => u !== url)
        });
    };

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
            image_urls: p.image_urls || [],
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
                        Portfolio Management
                    </p>
                    <h1 className="text-4xl font-bold text-white uppercase tracking-tighter font-heading">
                        Projects <span className="text-white/20">Database</span>
                    </h1>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-3 bg-[#F5A623] text-black font-heading font-bold text-sm uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#e09518] transition-all shadow-xl"
                >
                    <Plus className="w-5 h-5" weight="bold" /> Add Project
                </button>
            </div>

            {/* Table */}
            {isLoading ? (
                <div className="flex justify-center py-24">
                    <div className="w-10 h-10 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-32 bg-white/[0.02] border border-dashed border-white/5">
                    <p className="text-base font-heading uppercase tracking-widest text-white/30">No projects digitized yet</p>
                    <button
                        onClick={openAdd}
                        className="mt-6 text-[#F5A623] text-base font-heading font-bold uppercase tracking-widest hover:underline"
                    >
                        + Initialize first record
                    </button>
                </div>
            ) : (
                <div className="bg-[#0a0a0a] border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    {["Name", "Type", "Status", "Category", "Management"].map((h) => (
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
                                {projects.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="hover:bg-white/[0.03] transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <span className="text-white font-heading font-bold text-base block mb-0.5 tracking-tight">{p.name}</span>
                                            <span className="text-white/30 text-xs uppercase tracking-widest font-heading">{p.year}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-white/5 text-white/50 font-heading font-bold text-[10px] uppercase tracking-widest rounded-full">{p.type}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-white/50 font-heading font-bold text-sm uppercase tracking-widest">
                                                    {p.image_urls?.length || 0} Assets
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-white/40 font-heading font-medium text-sm uppercase tracking-widest">{p.category}</span>
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
                                {editId ? "Update Record" : "New Entry"}
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
                                {[
                                    { label: "Project Designation", key: "name", placeholder: "e.g. Ndola Industrial Hub", required: true },
                                    { label: "Timeline (Year)", key: "year", placeholder: "e.g. 2024–2025", required: true },
                                ].map(({ label, key, placeholder, required }) => (
                                    <div key={key}>
                                        <label className="block text-sm font-bold uppercase tracking-[0.25em] text-white/40 mb-3 font-heading">
                                            {label}
                                        </label>
                                        <input
                                            type="text"
                                            value={form[key as keyof typeof form] as string}
                                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                            required={required}
                                            placeholder={placeholder}
                                            className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-white/10 px-6 py-4 text-base font-body focus:outline-none focus:border-[#F5A623] transition-colors"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold uppercase tracking-[0.25em] text-white/40 mb-3 font-heading">
                                        Project Type
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
                                        Strategic Category
                                    </label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        required
                                        className="w-full bg-white/[0.03] border border-white/10 text-white px-6 py-4 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors cursor-pointer"
                                    >
                                        <option value="" className="bg-[#0f0f0f]">Select category...</option>
                                        {CATEGORIES.map((c) => (
                                            <option key={c} value={c} className="bg-[#0f0f0f]">{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold uppercase tracking-[0.25em] text-white/40 mb-3 font-heading">
                                    Technical Specifications / Description
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={4}
                                    placeholder="Detailed project summary..."
                                    className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-white/10 px-6 py-4 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors resize-none leading-relaxed"
                                />
                            </div>

                            {/* Multi-Image Upload */}
                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-bold uppercase tracking-[0.25em] text-white/40 font-heading">
                                        Visual Assets ({form.image_urls.length})
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploading}
                                        className="flex items-center gap-3 text-[#F5A623] text-sm font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                                    >
                                        <UploadSimple className="w-5 h-5" weight="bold" />
                                        {uploading ? "Uploading..." : "Import Media"}
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </div>

                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                                    {form.image_urls.map((url, i) => (
                                        <div key={i} className="relative aspect-[4/3] group border border-white/5">
                                            <img src={url} alt="" className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(url)}
                                                className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
                                            >
                                                <Trash className="w-4 h-4" weight="bold" />
                                            </button>
                                        </div>
                                    ))}
                                    {uploading && (
                                        <div className="aspect-[4/3] border border-dashed border-[#F5A623]/20 flex items-center justify-center bg-[#F5A623]/[0.02]">
                                            <div className="w-6 h-6 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    )}
                                    {form.image_urls.length === 0 && !uploading && (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border border-dashed border-white/10 aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.03] transition-all text-white/10 hover:text-white/30 group"
                                        >
                                            <ImageIcon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                            <span className="text-sm uppercase tracking-widest font-heading font-bold">Empty Slate</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-10 border-t border-white/5">
                                <button
                                    type="submit"
                                    disabled={saveMutation.isPending || uploading}
                                    className="flex-1 bg-[#F5A623] text-black font-heading font-bold text-sm uppercase tracking-[0.25em] py-5 hover:bg-white transition-all duration-500 disabled:opacity-50 shadow-xl"
                                >
                                    {saveMutation.isPending ? "Journaling..." : (editId ? "Synchronize Changes" : "Create Entry")}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-10 bg-white/5 text-white/50 font-heading font-bold text-sm uppercase tracking-[0.25em] hover:bg-white/10 hover:text-white transition-all border border-white/5"
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
