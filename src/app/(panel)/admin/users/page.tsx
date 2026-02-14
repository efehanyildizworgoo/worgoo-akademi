"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, Plus, Edit3, Trash2, Check, Loader2, Search } from "lucide-react";

const roleLabels: Record<string, { label: string; color: string; bg: string }> = {
  admin: { label: "Admin", color: "text-danger", bg: "bg-danger/10" },
  instructor: { label: "Eğitmen", color: "text-purple", bg: "bg-purple/10" },
  student: { label: "Öğrenci", color: "text-primary", bg: "bg-primary/10" },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const [fName, setFName] = useState("");
  const [fEmail, setFEmail] = useState("");
  const [fPassword, setFPassword] = useState("");
  const [fRole, setFRole] = useState("student");
  const [fTitle, setFTitle] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/users"); const data = await res.json(); setUsers(data.users || []); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const resetForm = () => { setFName(""); setFEmail(""); setFPassword(""); setFRole("student"); setFTitle(""); setEditId(null); };

  const handleSave = async () => {
    if (!fName || !fEmail) return;
    setSaving(true);
    try {
      if (editId) {
        const body: any = { userId: editId, name: fName, email: fEmail, role: fRole, title: fTitle };
        if (fPassword) body.password = fPassword;
        await fetch("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      } else {
        if (!fPassword) { setSaving(false); return; }
        await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: fName, email: fEmail, password: fPassword, role: fRole, title: fTitle }) });
      }
      resetForm(); setShowForm(false); fetchUsers();
    } catch {}
    setSaving(false);
  };

  const handleEdit = (u: any) => { setEditId(u.id); setFName(u.name); setFEmail(u.email); setFPassword(""); setFRole(u.role); setFTitle(u.title || ""); setShowForm(true); };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const filtered = users.filter((u) => {
    if (filterRole !== "all" && u.role !== filterRole) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="text-2xl font-bold text-foreground">Kullanıcılar</h1><p className="text-sm text-gray mt-1">{users.length} kayıtlı kullanıcı</p></div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="flex items-center gap-2 px-4 py-2.5 bg-purple text-white text-sm font-medium rounded-xl hover:bg-purple-hover transition-colors"><Plus size={16} /> Kullanıcı Ekle</button>
      </div>

      {showForm && (
        <div className="bg-white border border-border rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">{editId ? "Kullanıcı Düzenle" : "Yeni Kullanıcı"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label className="text-xs text-gray font-medium">İsim *</label><input value={fName} onChange={(e) => setFName(e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" /></div>
            <div><label className="text-xs text-gray font-medium">E-posta *</label><input type="email" value={fEmail} onChange={(e) => setFEmail(e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" /></div>
            <div><label className="text-xs text-gray font-medium">Şifre {editId ? "(opsiyonel)" : "*"}</label><input type="password" value={fPassword} onChange={(e) => setFPassword(e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" /></div>
            <div><label className="text-xs text-gray font-medium">Rol</label><select value={fRole} onChange={(e) => setFRole(e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple"><option value="student">Öğrenci</option><option value="instructor">Eğitmen</option><option value="admin">Admin</option></select></div>
            <div><label className="text-xs text-gray font-medium">Ünvan (eğitmen için)</label><input value={fTitle} onChange={(e) => setFTitle(e.target.value)} placeholder="WordPress Uzmanı" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" /></div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 bg-purple text-white text-sm font-medium rounded-xl disabled:opacity-50">{saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} {editId ? "Güncelle" : "Kaydet"}</button>
            <button onClick={() => { setShowForm(false); resetForm(); }} className="px-4 py-2.5 text-sm text-gray hover:text-foreground">İptal</button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ara..." className="w-full pl-9 pr-3 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-purple" /></div>
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="px-3 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-purple"><option value="all">Tüm Roller</option><option value="student">Öğrenci</option><option value="instructor">Eğitmen</option><option value="admin">Admin</option></select>
      </div>

      {loading ? <div className="flex items-center justify-center h-32"><Loader2 size={24} className="animate-spin text-purple" /></div> : filtered.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-8 text-center text-gray text-sm">Kullanıcı bulunamadı.</div>
      ) : (
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray uppercase">Kullanıcı</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Rol</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Kurs/Kayıt</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Tarih</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray uppercase">İşlem</th>
              </tr></thead>
              <tbody className="divide-y divide-border">
                {filtered.map((u) => {
                  const rl = roleLabels[u.role] || roleLabels.student;
                  return (
                    <tr key={u.id} className="hover:bg-bg/30 transition-colors">
                      <td className="px-5 py-3"><div><p className="text-sm font-medium text-foreground">{u.name}</p><p className="text-[10px] text-gray">{u.email}</p></div></td>
                      <td className="px-4 py-3"><span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${rl.bg} ${rl.color}`}>{rl.label}</span></td>
                      <td className="px-4 py-3 text-sm text-gray-dark">{u.role === "instructor" ? `${u._count?.courses || 0} kurs` : `${u._count?.enrollments || 0} kayıt`}</td>
                      <td className="px-4 py-3 text-xs text-gray">{new Date(u.createdAt).toLocaleDateString("tr-TR")}</td>
                      <td className="px-4 py-3"><div className="flex items-center justify-center gap-1">
                        <button onClick={() => handleEdit(u)} className="p-1.5 text-gray hover:text-purple transition-colors"><Edit3 size={14} /></button>
                        <button onClick={() => handleDelete(u.id)} className="p-1.5 text-gray hover:text-danger transition-colors"><Trash2 size={14} /></button>
                      </div></td>
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
