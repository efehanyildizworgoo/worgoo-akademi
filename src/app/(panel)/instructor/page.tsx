"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { BookOpen, Users, BarChart3, Loader2, PlusCircle, ArrowRight } from "lucide-react";

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instructor/courses").then((r) => r.json()).then((d) => { setCourses(d.courses || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-purple" /></div>;

  const totalEnrollments = courses.reduce((s, c) => s + (c._count?.enrollments || 0), 0);
  const published = courses.filter((c) => c.status === "published").length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Hoş Geldin, {user?.name?.split(" ")[0]}!</h1><p className="text-sm text-gray mt-1">Eğitmen paneliniz</p></div>
        <Link href="/instructor/courses/new" className="flex items-center gap-2 px-4 py-2.5 bg-purple text-white text-sm font-medium rounded-xl hover:bg-purple-hover transition-colors"><PlusCircle size={16} /> Yeni Kurs</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-2xl p-5"><div className="p-2 rounded-xl bg-purple/10 w-fit mb-3"><BookOpen size={18} className="text-purple" /></div><p className="text-2xl font-bold text-foreground">{courses.length}</p><p className="text-xs text-gray mt-1">Toplam Kurs ({published} yayında)</p></div>
        <div className="bg-white border border-border rounded-2xl p-5"><div className="p-2 rounded-xl bg-success/10 w-fit mb-3"><Users size={18} className="text-success" /></div><p className="text-2xl font-bold text-success">{totalEnrollments}</p><p className="text-xs text-gray mt-1">Toplam Öğrenci</p></div>
        <div className="bg-white border border-border rounded-2xl p-5"><div className="p-2 rounded-xl bg-warning/10 w-fit mb-3"><BarChart3 size={18} className="text-warning" /></div><p className="text-2xl font-bold text-foreground">{courses.reduce((s, c) => s + (c._count?.reviews || 0), 0)}</p><p className="text-xs text-gray mt-1">Değerlendirme</p></div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-foreground">Kurslarım</h2><Link href="/instructor/courses" className="text-xs text-purple hover:underline flex items-center gap-1">Tümü <ArrowRight size={12} /></Link></div>
        {courses.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-8 text-center"><BookOpen size={32} className="mx-auto text-gray/30 mb-3" /><p className="text-sm text-gray">Henüz kurs oluşturmadınız.</p><Link href="/instructor/courses/new" className="inline-block mt-4 px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-xl">İlk Kursunu Oluştur</Link></div>
        ) : (
          <div className="space-y-3">
            {courses.slice(0, 5).map((c) => (
              <div key={c.id} className="bg-white border border-border rounded-xl p-4 flex items-center gap-4 hover:border-purple/20 transition-colors">
                <div className="w-16 h-10 rounded-lg bg-light flex items-center justify-center flex-shrink-0 overflow-hidden">{c.thumbnail ? <img src={c.thumbnail} alt="" className="w-full h-full object-cover" /> : <BookOpen size={14} className="text-gray" />}</div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground truncate">{c.title}</p><p className="text-[10px] text-gray">{c._count?.enrollments || 0} öğrenci • {c._count?.sections || 0} bölüm</p></div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${c.status === "published" ? "bg-success/10 text-success" : "bg-gray/10 text-gray"}`}>{c.status === "published" ? "Yayında" : "Taslak"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
