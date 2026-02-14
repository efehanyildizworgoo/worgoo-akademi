"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import {
  GraduationCap, Play, Users, BookOpen, Award, ArrowRight,
  Star, ChevronRight, Sparkles, TrendingUp,
} from "lucide-react";

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [instructors, setInstructors] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/public/home").then((r) => r.json()).then((d) => {
      setFeaturedCourses(d.featuredCourses || []);
      setStats(d.stats || {});
      setInstructors(d.instructors || []);
    }).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-purple/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(121,92,237,0.3),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(121,92,237,0.2),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <Sparkles size={14} className="text-yellow-300" />
              <span className="text-xs font-medium text-white/80">Yeni kurslar eklendi!</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Kariyerini
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-100"> dijitalde </span>
              bir adım öteye taşı
            </h1>
            <p className="text-lg text-white/70 mt-6 max-w-xl leading-relaxed">
              WordPress, SEO, dijital pazarlama ve daha fazlası. Alanında uzman eğitmenlerden pratik odaklı online kurslar.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
              <Link href="/courses" className="flex items-center gap-2 bg-white text-primary font-semibold px-7 py-3.5 rounded-xl hover:bg-white/90 transition-colors text-sm">
                Kursları Keşfet <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="flex items-center gap-2 text-white/80 hover:text-white font-medium px-5 py-3.5 rounded-xl border border-white/20 hover:border-white/40 transition-colors text-sm">
                <Play size={16} /> Nasıl Çalışır?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <BookOpen size={22} />, value: stats.totalCourses || "10+", label: "Online Kurs" },
              { icon: <Users size={22} />, value: stats.totalStudents || "500+", label: "Öğrenci" },
              { icon: <GraduationCap size={22} />, value: stats.totalInstructors || "4", label: "Uzman Eğitmen" },
              { icon: <Award size={22} />, value: stats.totalHours || "100+", label: "Saat İçerik" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple/10 rounded-xl text-purple mb-3">{s.icon}</div>
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-gray mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Öne Çıkan Kurslar</h2>
            <p className="text-sm text-gray mt-2">En popüler ve en çok tercih edilen kurslarımız</p>
          </div>
          <Link href="/courses" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-purple hover:text-purple-hover transition-colors">
            Tümünü Gör <ChevronRight size={16} />
          </Link>
        </div>
        {featuredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((c: any) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-border rounded-2xl overflow-hidden">
                <div className="aspect-video bg-light animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-border/50 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-border/30 rounded animate-pulse w-full" />
                  <div className="h-3 bg-border/30 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="md:hidden text-center mt-8">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm font-medium text-purple hover:text-purple-hover transition-colors">
            Tüm Kursları Gör <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* Instructors */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Uzman Eğitmenler</h2>
            <p className="text-sm text-gray mt-2">Alanında deneyimli profesyonellerden öğrenin</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(instructors.length > 0 ? instructors : [
              { name: "Efehan Yıldız", title: "WordPress & SEO Uzmanı" },
              { name: "Hasan Tarık Emir", title: "Dijital Pazarlama Uzmanı" },
              { name: "Emir Karaman", title: "Web Geliştirme Uzmanı" },
              { name: "Semih Bayındır", title: "Tasarım & UX Uzmanı" },
            ]).map((inst: any, i: number) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-border hover:border-purple/20 hover:shadow-md transition-all group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple/20 to-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  {inst.avatar ? (
                    <img src={inst.avatar} alt={inst.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-purple">{inst.name.charAt(0)}</span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-foreground">{inst.name}</h3>
                <p className="text-xs text-gray mt-1">{inst.title}</p>
                {inst._count?.courses > 0 && (
                  <p className="text-[10px] text-purple mt-2 font-medium">{inst._count.courses} kurs</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-purple py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Öğrenmeye Bugün Başla</h2>
          <p className="text-sm text-white/70 mt-3 max-w-lg mx-auto">Hemen ücretsiz hesap oluştur ve binlerce dakikalık eğitim içeriğine erişim sağla.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/register" className="bg-white text-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors text-sm">
              Ücretsiz Kayıt Ol
            </Link>
            <Link href="/courses" className="text-white/80 hover:text-white font-medium px-6 py-3.5 rounded-xl border border-white/20 hover:border-white/40 transition-colors text-sm">
              Kursları İncele
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
