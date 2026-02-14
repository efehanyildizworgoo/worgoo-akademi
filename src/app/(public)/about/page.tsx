"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Target, Users, Zap, Heart, BookOpen, CheckCircle2, TrendingUp, Rocket, GraduationCap, Award, ArrowRight } from "lucide-react";
import Testimonials from "@/components/Testimonials";
import VideoBanner from "@/components/VideoBanner";
import References from "@/components/References";
import PreFooterCTA from "@/components/PreFooterCTA";

export default function AboutPage() {
  const [stats, setStats] = useState<any>({});
  const [instructors, setInstructors] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/public/home").then((r) => r.json()).then((d) => {
      setStats(d.stats || {});
      setInstructors(d.instructors || []);
    }).catch(() => {});
  }, []);

  return (
    <div>
      {/* ═══ HERO — Dark with grid pattern ═══ */}
      <section className="relative overflow-hidden bg-[#110e2e] pt-36 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(121,93,237,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(121,93,237,0.15),transparent_70%)]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            Sıradanlığa<br /><span className="text-purple italic">Meydan Oku.</span>
          </h1>
          <p className="text-[15px] text-white/45 mt-6 max-w-xl mx-auto leading-relaxed">
            Worgoo Akademi, dijital dünyada kariyer yapmak isteyenler için uzman eğitmenler tarafından hazırlanmış pratik odaklı online eğitim platformudur.
          </p>
        </div>
      </section>

      {/* ═══ ABOUT — Light version of homepage dark section ═══ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(121,93,237,0.04),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Dijital Eğitimde<br /><span className="text-purple">Yeni Nesil</span> Platform</h2>
              <p className="text-sm text-gray mt-5 leading-relaxed">
                Worgoo Akademi, dijital dünyada kariyer yapmak isteyenler için uzman eğitmenler tarafından hazırlanmış online eğitim platformudur. WordPress, SEO, dijital pazarlama, web tasarım ve daha birçok alanda pratik odaklı eğitimler sunuyoruz.
              </p>
              <div className="space-y-3 mt-7">
                {[
                  "Sektörde Aktif Çalışan Uzman Eğitmenler",
                  "Gerçek Projelerle Desteklenen Pratik Eğitimler",
                  "Ömür Boyu Erişim & Sürekli Güncelleme",
                  "Kurs Tamamlama Sertifikası",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-purple flex-shrink-0" />
                    <span className="text-[13px] text-foreground/70">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/courses" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-purple hover:text-purple-hover transition-colors">
                Kursları Keşfet <ArrowRight size={14} />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: stats.totalCourses || "10", suffix: "+", label: "Online Kurs", icon: <BookOpen size={18} /> },
                  { value: stats.totalStudents || "500", suffix: "+", label: "Aktif Öğrenci", icon: <Users size={18} /> },
                  { value: stats.totalInstructors || "4", suffix: "", label: "Uzman Eğitmen", icon: <TrendingUp size={18} /> },
                  { value: stats.totalHours || "100", suffix: "+", label: "Saat İçerik", icon: <Rocket size={18} /> },
                ].map((s, i) => (
                  <div key={i} className="bg-bg rounded-2xl p-7 border border-border/50 group hover:border-purple/20 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center text-purple mb-4">{s.icon}</div>
                    <p className="text-3xl font-bold text-foreground">{s.value}<span className="text-purple">{s.suffix}</span></p>
                    <p className="text-xs text-gray mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WORGOO DNA — Mission/Values ═══ */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Worgoo DNA'sı</h2>
            <p className="text-sm text-gray mt-2">Bizi Biz Yapan Değerler</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Target size={24} />, title: "Sonuç Odaklılık", desc: "Teoriden çok pratiğe odaklanıyoruz. Her kurs, gerçek dünya projeleriyle destekleniyor. Öğrencilerimiz öğrendiklerini hemen uygulayabiliyor." },
              { icon: <Rocket size={24} />, title: "Sürekli Gelişim", desc: "Kurs içeriklerimiz sürekli güncelleniyor. Dijital dünya hızla değişiyor ve biz bu değişime ayak uyduruyoruz." },
              { icon: <Heart size={24} />, title: "Öğrenci Önceliği", desc: "Her kararımızda öğrenci deneyimini ön planda tutuyoruz. Kaliteli içerik, uygun fiyat ve 7/24 erişim sağlıyoruz." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-border/50 hover:border-purple/20 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-purple/10 rounded-2xl flex items-center justify-center text-purple mb-5">{item.icon}</div>
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-gray mt-3 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPERT TEAM ═══ */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Uzman Kadro</h2>
              <p className="text-sm text-gray mt-2">Sektörde Aktif Çalışan Profesyonellerden Öğrenin</p>
            </div>
            <Link href="/instructors" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-purple hover:text-purple-hover transition-colors">
              Tümünü Gör
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(instructors.length > 0 ? instructors : [
              { name: "Efehan Yıldız", title: "WordPress & SEO Uzmanı" },
              { name: "Hasan Tarık Emir", title: "Dijital Pazarlama Uzmanı" },
              { name: "Emir Karaman", title: "Web Geliştirme Uzmanı" },
              { name: "Semih Bayındır", title: "Tasarım & UX Uzmanı" },
            ]).map((inst: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-all group">
                <div className="aspect-[3/4] bg-[#1a1640] relative overflow-hidden">
                  {inst.avatar ? (
                    <img src={inst.avatar} alt={inst.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple/20 to-primary/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-purple/30">{inst.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-sm font-bold text-foreground">{inst.name}</h3>
                  <p className="text-[11px] text-gray mt-0.5">{inst.title}</p>
                  {inst._count?.courses > 0 && (
                    <span className="inline-block mt-2 text-[10px] font-medium text-purple bg-purple/10 px-2.5 py-0.5 rounded-full">{inst._count.courses} kurs</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared sections */}
      <VideoBanner />
      <Testimonials />
      <References />
      <PreFooterCTA />
    </div>
  );
}
