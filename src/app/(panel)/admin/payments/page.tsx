"use client";

import { useState, useEffect, useCallback } from "react";
import { CreditCard, Loader2, Search, Check, X } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  paid: { label: "Ödendi", color: "text-success", bg: "bg-success/10" },
  pending: { label: "Bekliyor", color: "text-warning", bg: "bg-warning/10" },
  failed: { label: "Başarısız", color: "text-danger", bg: "bg-danger/10" },
  refunded: { label: "İade", color: "text-gray", bg: "bg-gray/10" },
};

const methodLabels: Record<string, string> = { paytr: "PayTR", transfer: "Havale/EFT", free: "Ücretsiz" };

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/payments"); const data = await res.json(); setPayments(data.payments || []); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch("/api/admin/payments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paymentId: id, status }) });
    fetchPayments();
  };

  const filtered = filterStatus === "all" ? payments : payments.filter((p) => p.status === filterStatus);
  const totalPaid = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Ödemeler</h1><p className="text-sm text-gray mt-1">{payments.length} ödeme kaydı</p></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-2xl p-5"><p className="text-xs text-gray mb-1">Toplam Gelir</p><p className="text-2xl font-bold text-success">₺{totalPaid.toLocaleString("tr-TR")}</p></div>
        <div className="bg-white border border-border rounded-2xl p-5"><p className="text-xs text-gray mb-1">Bekleyen</p><p className="text-2xl font-bold text-warning">₺{totalPending.toLocaleString("tr-TR")}</p></div>
        <div className="bg-white border border-border rounded-2xl p-5"><p className="text-xs text-gray mb-1">Toplam İşlem</p><p className="text-2xl font-bold text-foreground">{payments.length}</p></div>
      </div>

      <div className="flex items-center gap-3">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-purple">
          <option value="all">Tüm Durumlar</option><option value="paid">Ödendi</option><option value="pending">Bekliyor</option><option value="failed">Başarısız</option><option value="refunded">İade</option>
        </select>
      </div>

      {loading ? <div className="flex items-center justify-center h-32"><Loader2 size={24} className="animate-spin text-purple" /></div> : filtered.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-8 text-center text-gray text-sm">Ödeme bulunamadı.</div>
      ) : (
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray uppercase">Kullanıcı</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Kurs</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Tutar</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Yöntem</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Durum</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray uppercase">Tarih</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray uppercase">İşlem</th>
              </tr></thead>
              <tbody className="divide-y divide-border">
                {filtered.map((p) => {
                  const st = statusConfig[p.status] || statusConfig.pending;
                  return (
                    <tr key={p.id} className="hover:bg-bg/30 transition-colors">
                      <td className="px-5 py-3"><p className="text-sm font-medium text-foreground">{p.user?.name}</p><p className="text-[10px] text-gray">{p.user?.email}</p></td>
                      <td className="px-4 py-3 text-sm text-gray-dark truncate max-w-[150px]">{p.enrollment?.course?.title || "-"}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">₺{p.amount.toLocaleString("tr-TR")}</td>
                      <td className="px-4 py-3 text-xs text-gray-dark">{methodLabels[p.method] || p.method}</td>
                      <td className="px-4 py-3"><span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${st.bg} ${st.color}`}>{st.label}</span></td>
                      <td className="px-4 py-3 text-xs text-gray">{new Date(p.createdAt).toLocaleDateString("tr-TR")}</td>
                      <td className="px-4 py-3">
                        {p.status === "pending" && (
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleStatusChange(p.id, "paid")} className="p-1.5 text-success hover:bg-success/10 rounded-lg transition-colors" title="Onayla"><Check size={14} /></button>
                            <button onClick={() => handleStatusChange(p.id, "failed")} className="p-1.5 text-danger hover:bg-danger/10 rounded-lg transition-colors" title="Reddet"><X size={14} /></button>
                          </div>
                        )}
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
