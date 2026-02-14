"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { BookOpen, CheckCircle2, Clock, Loader2, Play, ArrowRight } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student/dashboard").then((r) => r.json()).then((d) => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-purple" /></div>;

  const enrollments = data?.enrollments || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hoş Geldin, {user?.name?.split(" ")[0]}!</h1>
        <p className="text-sm text-gray mt-1">Eğitim durumun ve kursların</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="p-2 rounded-xl bg-purple/10 w-fit mb-3"><BookOpen size={18} className="text-purple" /></div>
          <p className="text-2xl font-bold text-foreground">{enrollments.length}</p>
          <p className="text-xs text-gray mt-1">Kayıtlı Kurs</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="p-2 rounded-xl bg-success/10 w-fit mb-3"><CheckCircle2 size={18} className="text-success" /></div>
          <p className="text-2xl font-bold text-success">{data?.totalCompleted || 0}</p>
          <p className="text-xs text-gray mt-1">Tamamlanan Ders</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="p-2 rounded-xl bg-warning/10 w-fit mb-3"><Clock size={18} className="text-warning" /></div>
          <p className="text-2xl font-bold text-foreground">{enrollments.filter((e: any) => e.status === "active").length}</p>
          <p className="text-xs text-gray mt-1">Devam Eden</p>
        </div>
      </div>

      {/* My Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Kurslarım</h2>
          <Link href="/dashboard/courses" className="text-xs text-purple hover:underline flex items-center gap-1">Tümü <ArrowRight size={12} /></Link>
        </div>
        {enrollments.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-8 text-center">
            <BookOpen size={32} className="mx-auto text-gray/30 mb-3" />
            <p className="text-sm text-gray">Henüz bir kursa kayıt olmadınız.</p>
            <Link href="/courses" className="inline-block mt-4 px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-xl hover:bg-purple-hover transition-colors">Kursları Keşfet</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrollments.slice(0, 6).map((e: any) => (
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
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${e.status === "completed" ? "bg-success/10 text-success" : "bg-purple/10 text-purple"}`}>
                      {e.status === "completed" ? "Tamamlandı" : "Devam Ediyor"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
