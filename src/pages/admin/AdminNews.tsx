import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, PencilSimple, Trash, X, Check } from "@phosphor-icons/react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type NewsPost = {
    id: string;
    title: string;
    excerpt: string;
    content: string | null;
    date: string;
    author: string;
    category: string;
    image_url: string | null;
    created_at: string;
};

const emptyForm = {
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    category: "",
    image_url: "",
};

const CATEGORIES = ["Innovation", "Company News", "Technical Tips", "Safety", "Events", "Other"];

const AdminNews = () => {
    const qc = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const { data: posts = [], isLoading } = useQuery<NewsPost[]>({
        queryKey: ["admin-news"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("news")
                .select("*")
                .order("date", { ascending: false });
            if (error) throw error;
            return data as NewsPost[];
        },
    });

    const saveMutation = useMutation({
        mutationFn: async (data: typeof form) => {
            const payload = {
                ...data,
                content: data.content || null,
                image_url: data.image_url || null,
            };
            if (editId) {
                const { error } = await supabase.from("news").update(payload).eq("id", editId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("news").insert(payload);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-news"] });
            qc.invalidateQueries({ queryKey: ["admin-news-count"] });
            toast.success(editId ? "Post updated" : "Post created");
            setShowForm(false);
            setEditId(null);
            setForm(emptyForm);
        },
        onError: (e: Error) => toast.error(e.message),
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("news").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["admin-news"] });
            qc.invalidateQueries({ queryKey: ["admin-news-count"] });
            toast.success("Post deleted");
            setDeleteConfirm(null);
        },
        onError: (e: Error) => toast.error(e.message),
    });

    const openAdd = () => {
        setEditId(null);
        setForm(emptyForm);
        setShowForm(true);
    };

    const openEdit = (p: NewsPost) => {
        setEditId(p.id);
        setForm({
            title: p.title,
            excerpt: p.excerpt,
            content: p.content ?? "",
            date: p.date,
            author: p.author,
            category: p.category,
            image_url: p.image_url ?? "",
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
                    <p className="text-[#60A5FA] text-[10px] uppercase tracking-[0.35em] font-heading font-bold mb-1">
                        Manage
                    </p>
                    <h1 className="text-3xl font-bold text-white uppercase tracking-tight font-heading">
                        News
                    </h1>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-[#F5A623] text-black font-heading font-bold text-[10px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-[#e09518] transition-colors"
                >
                    <Plus className="w-4 h-4" weight="bold" /> Add Post
                </button>
            </div>

            {/* Table */}
            {isLoading ? (
                <div className="flex justify-center py-16">
                    <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-20 text-white/30">
                    <p className="text-sm font-heading uppercase tracking-widest">No posts yet</p>
                    <button
                        onClick={openAdd}
                        className="mt-4 text-[#F5A623] text-xs font-heading font-bold uppercase tracking-widest hover:underline"
                    >
                        + Add your first post
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5">
                                {["Title", "Category", "Author", "Date", "Actions"].map((h) => (
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
                            {posts.map((p) => (
                                <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                    <td className="py-4 pr-6 text-white font-body text-sm max-w-xs">
                                        <span className="line-clamp-1">{p.title}</span>
                                    </td>
                                    <td className="py-4 pr-6 text-white/50 font-body text-xs whitespace-nowrap">{p.category}</td>
                                    <td className="py-4 pr-6 text-white/50 font-body text-xs whitespace-nowrap">{p.author}</td>
                                    <td className="py-4 pr-6 text-white/50 font-body text-xs whitespace-nowrap">{p.date}</td>
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
                                {editId ? "Edit Post" : "New Post"}
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
                                { label: "Title", key: "title", placeholder: "Post title...", required: true },
                                { label: "Author", key: "author", placeholder: "e.g. Eng. Chileshe Banda", required: true },
                                { label: "Image URL", key: "image_url", placeholder: "https://...", required: false },
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
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2 font-heading">
                                    Excerpt
                                </label>
                                <textarea
                                    value={form.excerpt}
                                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                                    required
                                    rows={2}
                                    placeholder="Short summary shown on the news page..."
                                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2 font-heading">
                                    Full Content (optional)
                                </label>
                                <textarea
                                    value={form.content}
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    rows={4}
                                    placeholder="Full article content..."
                                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-[#F5A623] transition-colors resize-none"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={saveMutation.isPending}
                                    className="flex-1 bg-[#F5A623] text-black font-heading font-bold text-[10px] uppercase tracking-[0.2em] py-4 hover:bg-[#e09518] transition-colors disabled:opacity-50"
                                >
                                    {saveMutation.isPending ? "Saving..." : (editId ? "Update Post" : "Create Post")}
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

export default AdminNews;
