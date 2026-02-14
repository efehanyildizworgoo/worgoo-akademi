"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewCoursePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [level, setLevel] = useState("beginner");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    fetch("/api/admin/categories").then((r) => r.json()).then((d) => setCategories(d.categories || [])).catch(() => {});
  }, []);

  const handleSave = async () => {
    if (!title || !slug) { setError("Başlık ve slug gerekli."); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch("/api/instructor/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, shortDesc, description, thumbnail, previewVideo, price: parseFloat(price) || 0, salePrice: salePrice ? parseFloat(salePrice) : null, level, categoryId: categoryId || null }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Hata oluştu."); setSaving(false); return; }
      router.push("/instructor/courses");
    } catch { setError("Bağlantı hatası."); }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/instructor/courses" className="p-2 rounded-xl hover:bg-white border border-border transition-colors"><ArrowLeft size={16} className="text-gray" /></Link>
        <div><h1 className="text-2xl font-bold text-foreground">Yeni Kurs Oluştur</h1><p className="text-sm text-gray mt-0.5">Kurs bilgilerini girin</p></div>
      </div>

      {error && <div className="px-4 py-3 bg-danger/5 border border-danger/20 rounded-xl text-sm text-danger">{error}</div>}

      <div className="bg-white border border-border rounded-2xl p-6 space-y-5">
        <div>
          <label className="text-xs text-gray font-medium">Kurs Başlığı *</label>
          <input value={title} onChange={(e) => { setTitle(e.target.value); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9ğüşıöç]+/g, "-").replace(/-+$/g, "")); }} placeholder="WordPress ile E-Ticaret Sitesi Kurma" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
        </div>
        <div>
          <label className="text-xs text-gray font-medium">Slug *</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm font-mono focus:outline-none focus:border-purple" />
        </div>
        <div>
          <label className="text-xs text-gray font-medium">Kısa Açıklama</label>
          <input value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} placeholder="Kurs kartlarında görünecek kısa açıklama" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
        </div>
        <div>
          <label className="text-xs text-gray font-medium">Detaylı Açıklama</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Kurs hakkında detaylı bilgi..." className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple resize-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray font-medium">Thumbnail URL</label>
            <input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="https://..." className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
          </div>
          <div>
            <label className="text-xs text-gray font-medium">Önizleme Video (Vimeo URL)</label>
            <input value={previewVideo} onChange={(e) => setPreviewVideo(e.target.value)} placeholder="https://vimeo.com/..." className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
          </div>
          <div>
            <label className="text-xs text-gray font-medium">Fiyat (₺)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="299" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
          </div>
          <div>
            <label className="text-xs text-gray font-medium">İndirimli Fiyat (₺)</label>
            <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="Opsiyonel" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
          </div>
          <div>
            <label className="text-xs text-gray font-medium">Seviye</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple">
              <option value="beginner">Başlangıç</option><option value="intermediate">Orta</option><option value="advanced">İleri</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray font-medium">Kategori</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple">
              <option value="">Seçin...</option>
              {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-purple text-white text-sm font-medium rounded-xl hover:bg-purple-hover transition-colors disabled:opacity-50">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Kurs Oluştur
        </button>
        <Link href="/instructor/courses" className="px-4 py-2.5 text-sm text-gray hover:text-foreground transition-colors">İptal</Link>
      </div>
    </div>
  );
}
