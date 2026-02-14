"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Loader2, PlusCircle, Edit3, Users, Star } from "lucide-react";

export default function InstructorCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instructor/courses").then((r) => r.json()).then((d) => { setCourses(d.courses || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-purple" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Kurslarım</h1><p className="text-sm text-gray mt-1">{courses.length} kurs</p></div>
        <Link href="/instructor/courses/new" className="flex items-center gap-2 px-4 py-2.5 bg-purple text-white text-sm font-medium rounded-xl hover:bg-purple-hover transition-colors"><PlusCircle size={16} /> Yeni Kurs</Link>
      </div>
      {courses.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-8 text-center"><BookOpen size={32} className="mx-auto text-gray/30 mb-3" /><p className="text-sm text-gray">Henüz kurs oluşturmadınız.</p></div>
      ) : (
        <div className="space-y-3">
          {courses.map((c) => (
            <div key={c.id} className="bg-white border border-border rounded-2xl p-5 flex items-center gap-4 hover:border-purple/20 transition-colors">
              <div className="w-20 h-14 rounded-xl bg-light flex items-center justify-center flex-shrink-0 overflow-hidden">{c.thumbnail ? <img src={c.thumbnail} alt="" className="w-full h-full object-cover" /> : <BookOpen size={18} className="text-gray" />}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">{c.title}</h3>
                <div className="flex items-center gap-4 mt-1 text-[11px] text-gray">
                  <span>{c.category?.name || "Kategorisiz"}</span>
                  <span className="flex items-center gap-1"><Users size={10} /> {c._count?.enrollments || 0}</span>
                  <span className="flex items-center gap-1"><Star size={10} /> {c._count?.reviews || 0}</span>
                  <span>{c._count?.sections || 0} bölüm</span>
                </div>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${c.status === "published" ? "bg-success/10 text-success" : c.status === "archived" ? "bg-warning/10 text-warning" : "bg-gray/10 text-gray"}`}>
                {c.status === "published" ? "Yayında" : c.status === "archived" ? "Arşiv" : "Taslak"}
              </span>
              <span className="text-sm font-bold text-foreground">₺{c.price.toLocaleString("tr-TR")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
