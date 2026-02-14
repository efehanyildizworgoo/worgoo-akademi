"use client";

import { useState, useEffect } from "react";
import { BookOpen, Users, CreditCard, TrendingUp, Loader2, GraduationCap, ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard").then((r) => r.json()).then((d) => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-purple" /></div>;

  const stats = data?.stats || {};
  const cards = [
    { label: "Toplam Kurs", value: stats.totalCourses || 0, icon: <BookOpen size={20} />, color: "text-purple", bg: "bg-purple/10", href: "/admin/courses" },
    { label: "Yayında", value: stats.publishedCourses || 0, icon: <TrendingUp size={20} />, color: "text-success", bg: "bg-success/10", href: "/admin/courses" },
    { label: "Öğrenci", value: stats.totalStudents || 0, icon: <Users size={20} />, color: "text-primary", bg: "bg-primary/10", href: "/admin/users" },
    { label: "Eğitmen", value: stats.totalInstructors || 0, icon: <GraduationCap size={20} />, color: "text-warning", bg: "bg-warning/10", href: "/admin/users" },
    { label: "Kayıt", value: stats.totalEnrollments || 0, icon: <BarChart3 size={20} />, color: "text-purple", bg: "bg-purple/10", href: "/admin/payments" },
    { label: "Gelir", value: `₺${(stats.totalRevenue || 0).toLocaleString("tr-TR")}`, icon: <CreditCard size={20} />, color: "text-success", bg: "bg-success/10", href: "/admin/payments" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-gray mt-1">Platform genel bakış</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="bg-white border border-border rounded-2xl p-5 hover:border-purple/20 hover:shadow-sm transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${c.bg}`}><span className={c.color}>{c.icon}</span></div>
              <ArrowRight size={14} className="text-border group-hover:text-gray transition-colors" />
            </div>
            <p className="text-2xl font-bold text-foreground">{c.value}</p>
            <p className="text-xs text-gray mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border"><h3 className="text-sm font-semibold text-foreground">Son Ödemeler</h3></div>
          {(data?.recentPayments || []).length === 0 ? (
            <div className="p-6 text-center text-gray text-sm">Henüz ödeme yok.</div>
          ) : (
            <div className="divide-y divide-border">
              {(data?.recentPayments || []).map((p: any) => (
                <div key={p.id} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.user?.name}</p>
                    <p className="text-[10px] text-gray">{new Date(p.createdAt).toLocaleDateString("tr-TR")}</p>
                  </div>
                  <span className={`text-sm font-bold ${p.status === "paid" ? "text-success" : "text-warning"}`}>₺{p.amount.toLocaleString("tr-TR")}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border"><h3 className="text-sm font-semibold text-foreground">Son Kayıtlar</h3></div>
          {(data?.recentEnrollments || []).length === 0 ? (
            <div className="p-6 text-center text-gray text-sm">Henüz kayıt yok.</div>
          ) : (
            <div className="divide-y divide-border">
              {(data?.recentEnrollments || []).map((e: any) => (
                <div key={e.id} className="px-5 py-3">
                  <p className="text-sm font-medium text-foreground">{e.user?.name}</p>
                  <p className="text-[10px] text-gray">{e.course?.title} — {new Date(e.enrolledAt).toLocaleDateString("tr-TR")}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
