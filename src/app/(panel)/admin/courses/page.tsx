"use client";

import { useState, useEffect, useCallback } from "react";
import { BookOpen, Loader2, Search, Edit3, Trash2, Eye, EyeOff, Star } from "lucide-react";

const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  draft: { label: "Taslak", color: "text-gray", bg: "bg-gray/10" },
  published: { label: "Yayında", color: "text-success", bg: "bg-success/10" },
  archived: { label: "Arşiv", color: "text-warning", bg: "bg-warning/10" },
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/courses");
      const data = await res.json();
      setCourses(data.courses || []);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch("/api/admin/courses", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ courseId: id, status }) });
    fetchCourses();
  };

  const handleFeatured = async (id: string, isFeatured: boolean) => {
    await fetch("/api/admin/courses", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ courseId: id, isFeatured }) });
    fetchCourses();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu kursu silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/courses?id=${id}`, { method: "DELETE" });
    fetchCourses();
  };

  const filtered = courses.filter((c) => {
    if (filterStatus !== "all" && c.status !== filterStatus) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Kurslar</h1>
        <p className="text-sm text-gray mt-1">{courses.length} toplam kurs</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Kurs ara..." className="w-full pl-9 pr-3 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-purple">
          <option value="all">Tüm Durumlar</option>
          <option value="draft">Taslak</option>
          <option value="published">Yayında</option>
          <option value="archived">Arşiv</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32"><Loader2 size={24} className="animate-spin text-purple" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-8 text-center text-gray text-sm">Kurs bulunamadı.</div>
      ) : (
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray uppercase">Kurs</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Eğitmen</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Fiyat</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Kayıt</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Durum</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray uppercase">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => {
                  const st = statusLabels[c.status] || statusLabels.draft;
                  return (
                    <tr key={c.id} className="hover:bg-bg/30 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 rounded-lg bg-light flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {c.thumbnail ? <img src={c.thumbnail} alt="" className="w-full h-full object-cover" /> : <BookOpen size={14} className="text-gray" />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{c.title}</p>
                            <p className="text-[10px] text-gray">{c.category?.name || "Kategorisiz"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-dark">{c.instructor?.name}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">₺{c.price.toLocaleString("tr-TR")}</td>
                      <td className="px-4 py-3 text-sm text-gray-dark">{c._count?.enrollments || 0}</td>
                      <td className="px-4 py-3">
                        <select value={c.status} onChange={(e) => handleStatusChange(c.id, e.target.value)} className={`text-[10px] font-medium px-2 py-1 rounded-full border-0 ${st.bg} ${st.color} focus:outline-none`}>
                          <option value="draft">Taslak</option>
                          <option value="published">Yayında</option>
                          <option value="archived">Arşiv</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => handleFeatured(c.id, !c.isFeatured)} className={`p-1.5 rounded-lg transition-colors ${c.isFeatured ? "text-star" : "text-border hover:text-star"}`} title="Öne Çıkar">
                            <Star size={14} fill={c.isFeatured ? "currentColor" : "none"} />
                          </button>
                          <button onClick={() => handleDelete(c.id)} className="p-1.5 text-gray hover:text-danger transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
