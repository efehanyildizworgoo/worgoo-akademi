"use client";

import { useState, useEffect, useCallback } from "react";
import { FolderOpen, Plus, Edit3, Trash2, Check, Loader2 } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [fName, setFName] = useState("");
  const [fSlug, setFSlug] = useState("");
  const [fDesc, setFDesc] = useState("");
  const [fOrder, setFOrder] = useState("0");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/categories"); const data = await res.json(); setCategories(data.categories || []); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const resetForm = () => { setFName(""); setFSlug(""); setFDesc(""); setFOrder("0"); setEditId(null); };

  const handleSave = async () => {
    if (!fName || !fSlug) return;
    setSaving(true);
    try {
      if (editId) {
        await fetch("/api/admin/categories", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ categoryId: editId, name: fName, slug: fSlug, description: fDesc, order: parseInt(fOrder) }) });
      } else {
        await fetch("/api/admin/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: fName, slug: fSlug, description: fDesc, order: parseInt(fOrder) }) });
      }
      resetForm(); setShowForm(false); fetchCategories();
    } catch {}
    setSaving(false);
  };

  const handleEdit = (c: any) => { setEditId(c.id); setFName(c.name); setFSlug(c.slug); setFDesc(c.description); setFOrder(String(c.order)); setShowForm(true); };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Kategoriler</h1><p className="text-sm text-gray mt-1">Kurs kategorilerini yönetin</p></div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="flex items-center gap-2 px-4 py-2.5 bg-purple text-white text-sm font-medium rounded-xl hover:bg-purple-hover transition-colors"><Plus size={16} /> Kategori Ekle</button>
      </div>

      {showForm && (
        <div className="bg-white border border-border rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">{editId ? "Kategori Düzenle" : "Yeni Kategori"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div><label className="text-xs text-gray font-medium">İsim *</label><input value={fName} onChange={(e) => { setFName(e.target.value); if (!editId) setFSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")); }} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" /></div>
            <div><label className="text-xs text-gray font-medium">Slug *</label><input value={fSlug} onChange={(e) => setFSlug(e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" /></div>
            <div><label className="text-xs text-gray font-medium">Açıklama</label><input value={fDesc} onChange={(e) => setFDesc(e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" /></div>
            <div><label className="text-xs text-gray font-medium">Sıra</label><input type="number" value={fOrder} onChange={(e) => setFOrder(e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" /></div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 bg-purple text-white text-sm font-medium rounded-xl disabled:opacity-50">{saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} {editId ? "Güncelle" : "Kaydet"}</button>
            <button onClick={() => { setShowForm(false); resetForm(); }} className="px-4 py-2.5 text-sm text-gray hover:text-foreground">İptal</button>
          </div>
        </div>
      )}

      {loading ? <div className="flex items-center justify-center h-32"><Loader2 size={24} className="animate-spin text-purple" /></div> : categories.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-8 text-center text-gray text-sm">Henüz kategori yok.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div key={c.id} className="bg-white border border-border rounded-2xl p-5 hover:border-purple/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-purple/10"><FolderOpen size={18} className="text-purple" /></div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(c)} className="p-1.5 text-gray hover:text-purple transition-colors"><Edit3 size={14} /></button>
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 text-gray hover:text-danger transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
              <h3 className="text-sm font-bold text-foreground">{c.name}</h3>
              <p className="text-xs text-gray mt-0.5">/{c.slug}</p>
              {c.description && <p className="text-xs text-gray mt-2">{c.description}</p>}
              <p className="text-[10px] text-purple mt-2 font-medium">{c._count?.courses || 0} kurs</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
