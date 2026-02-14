"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Target, Users, Zap, Heart, BookOpen, CheckCircle2, TrendingUp, Rocket, GraduationCap, Award } from "lucide-react";
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

      {/* ═══ ABOUT — Photo grid + text ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Photo grid with stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1640]">
                  {instructors[0]?.avatar ? (
                    <img src={instructors[0].avatar} alt={instructors[0].name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple/20 to-primary/20" />
                  )}
                </div>
                <div className="bg-purple/5 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-purple">{stats.totalStudents || "500"}+</p>
                  <p className="text-xs text-gray mt-1">Aktif Öğrenci</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-[#110e2e] rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-white">{stats.totalCourses || "10"}+</p>
                  <p className="text-xs text-white/40 mt-1">Online Kurs</p>
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1640]">
                  {instructors[1]?.avatar ? (
                    <img src={instructors[1].avatar} alt={instructors[1].name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple/10 to-primary/10" />
                  )}
                </div>
              </div>
            </div>

            {/* Right — Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">Hakkımızda</h2>
              <p className="text-sm text-gray mt-5 leading-relaxed">
                Worgoo Akademi, dijital dünyada kariyer yapmak isteyenler için uzman eğitmenler tarafından hazırlanmış online eğitim platformudur. WordPress, SEO, dijital pazarlama, web tasarım ve daha birçok alanda pratik odaklı eğitimler sunuyoruz.
              </p>
              <p className="text-sm text-gray mt-4 leading-relaxed">
                Tüm kurslarımız sektörde aktif çalışan profesyoneller tarafından hazırlanmakta ve sürekli güncellenmektedir. Amacımız, öğrencilerimizin teorik bilgiyi gerçek projelerde uygulayarak kariyerlerini bir üst seviyeye taşımalarını sağlamaktır.
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
              <Link href="/courses" className="inline-flex items-center gap-2 mt-8 bg-purple text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-hover transition-colors text-sm">
                Kursları Keşfet
              </Link>
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

      {/* ═══ BEHIND THE SCENES — Photo gallery ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Perde Arkası</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {instructors.slice(0, 3).map((inst: any, i: number) => (
              <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#1a1640] relative group">
                {inst.avatar ? (
                  <img src={inst.avatar} alt={inst.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple/20 to-primary/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-purple/30">{inst.name?.charAt(0)}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-semibold text-white">{inst.name}</p>
                  <p className="text-[11px] text-white/60">{inst.title}</p>
                </div>
              </div>
            ))}
            {instructors.length < 3 && [1, 2, 3].slice(instructors.length).map((_, i) => (
              <div key={`placeholder-${i}`} className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-purple/5 to-primary/5 border border-border/50" />
            ))}
          </div>
          {instructors.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
              {instructors.slice(3, 5).map((inst: any, i: number) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-[#1a1640] relative group">
                  {inst.avatar ? (
                    <img src={inst.avatar} alt={inst.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple/20 to-primary/20 flex items-center justify-center">
                      <span className="text-3xl font-bold text-purple/30">{inst.name?.charAt(0)}</span>
                    </div>
                  )}
                </div>
              ))}
              <div className="aspect-square rounded-2xl bg-purple/10 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple">{stats.totalStudents || "500"}+</p>
                  <p className="text-xs text-gray mt-1">Mutlu Öğrenci</p>
                </div>
              </div>
            </div>
          )}
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
