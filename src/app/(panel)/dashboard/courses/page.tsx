"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Loader2, Play } from "lucide-react";

export default function StudentCoursesPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student/dashboard").then((r) => r.json()).then((d) => { setEnrollments(d.enrollments || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-purple" /></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Kurslarım</h1><p className="text-sm text-gray mt-1">Kayıtlı olduğunuz tüm kurslar</p></div>
      {enrollments.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-8 text-center">
          <BookOpen size={32} className="mx-auto text-gray/30 mb-3" />
          <p className="text-sm text-gray">Henüz bir kursa kayıt olmadınız.</p>
          <Link href="/courses" className="inline-block mt-4 px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-xl hover:bg-purple-hover transition-colors">Kursları Keşfet</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrollments.map((e: any) => (
            <Link key={e.id} href={`/dashboard/courses/${e.course.slug}`} className="bg-white border border-border rounded-2xl overflow-hidden hover:border-purple/20 hover:shadow-sm transition-all group">
              <div className="aspect-video bg-light relative overflow-hidden">
                {e.course.thumbnail ? <img src={e.course.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> : <div className="w-full h-full flex items-center justify-center"><Play size={24} className="text-gray/30" /></div>}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-border"><div className="h-full bg-purple transition-all" style={{ width: `${e.progress}%` }} /></div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-purple transition-colors">{e.course.title}</h3>
                <p className="text-[10px] text-gray mt-1">{e.course.instructor?.name}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-purple font-medium">{Math.round(e.progress)}% tamamlandı</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
