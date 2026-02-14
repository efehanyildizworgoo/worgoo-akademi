"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import {
  Play, Users, BookOpen, Award, ArrowRight,
  Star, ChevronRight, Zap,
  Shield, CheckCircle2, X,
  MonitorPlay, TrendingUp, Rocket, Heart,
} from "lucide-react";

const testimonials = [
  { name: "Ahmet Yılmaz", role: "Freelance Web Developer", text: "WordPress kursunu tamamladıktan sonra ilk müşterimi 2 hafta içinde buldum. Eğitim kalitesi gerçekten üst düzey.", rating: 5 },
  { name: "Zeynep Kaya", role: "Dijital Pazarlama Uzmanı", text: "SEO eğitimi sayesinde müşterilerimin organik trafiğini %300 artırdım. Pratik odaklı anlatım çok faydalı.", rating: 5 },
  { name: "Mehmet Demir", role: "E-Ticaret Girişimcisi", text: "Sıfırdan e-ticaret sitemi kurdum ve ilk ayda satış yapmaya başladım. Adım adım anlatım mükemmel.", rating: 5 },
  { name: "Elif Arslan", role: "İçerik Üreticisi", text: "Google Ads eğitimi ile reklam bütçemi çok daha verimli kullanmaya başladım. Kesinlikle tavsiye ederim.", rating: 5 },
  { name: "Can Öztürk", role: "Startup Kurucu", text: "React eğitimi ile kendi SaaS ürünümü geliştirdim. Eğitmenler gerçekten alanında uzman.", rating: 5 },
  { name: "Selin Yıldırım", role: "UX Designer", text: "Tasarım kursları ile portföyümü güçlendirdim. İş tekliflerinde ciddi artış yaşadım.", rating: 5 },
];

const references = [
  { name: "Worgoo", logo: "/worgoo-logo.svg" },
  { name: "WordPress", text: "WordPress" },
  { name: "Google", text: "Google" },
  { name: "Vimeo", text: "Vimeo" },
  { name: "Figma", text: "Figma" },
  { name: "Shopify", text: "Shopify" },
  { name: "HubSpot", text: "HubSpot" },
  { name: "Semrush", text: "Semrush" },
];

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [instructors, setInstructors] = useState<any[]>([]);
  const [videoOpen, setVideoOpen] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/public/home").then((r) => r.json()).then((d) => {
      setFeaturedCourses(d.featuredCourses || []);
      setStats(d.stats || {});
      setInstructors(d.instructors || []);
    }).catch(() => {});
  }, []);

  // Hero instructor carousel — rotate every 5s
  useEffect(() => {
    if (instructors.length <= 1) return;
    const timer = setInterval(() => setHeroIdx((p) => (p + 1) % instructors.length), 5000);
    return () => clearInterval(timer);
  }, [instructors.length]);

  // Auto-scroll testimonials
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    const speed = 0.5;
    let raf: number;
    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const currentInstructor = instructors[heroIdx] || null;

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[94vh] flex items-center overflow-hidden bg-[#110e2e]">
        {/* Rays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[70%] h-full bg-[radial-gradient(ellipse_at_65%_40%,rgba(121,93,237,0.12),transparent_70%)]" />
          {[25, 35, 45, 15, 5, -10, -20, -30].map((deg, i) => (
            <div key={i} className="absolute top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple/[0.06] to-transparent origin-top" style={{ left: `${48 + i * 5}%`, transform: `rotate(${deg}deg)` }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="pt-20 lg:pt-0">
              <h1 className="text-4xl md:text-[3.4rem] lg:text-[3.6rem] font-bold text-white leading-[1.08] tracking-[-0.02em]">
                Dijital kariyerini
                <br />
                <span className="text-purple">bir üst seviyeye</span>
                <br />
                taşı
              </h1>
              <p className="text-[15px] text-white/45 mt-6 max-w-[420px] leading-relaxed">
                Alanında uzman eğitmenlerden WordPress, SEO, dijital pazarlama ve web geliştirme kursları. Pratik odaklı eğitimlerle kariyerini şekillendir.
              </p>
              <div className="flex items-center gap-3 mt-8">
                <Link href="/courses" className="flex items-center gap-2 bg-purple text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-hover transition-colors text-sm">
                  Kursları Keşfet <ArrowRight size={15} />
                </Link>
                <Link href="/register" className="text-white/50 hover:text-white font-medium px-5 py-3 rounded-lg border border-white/10 hover:border-white/25 transition-colors text-sm">
                  Ücretsiz Başla
                </Link>
              </div>

              {/* Mini stats */}
              <div className="flex items-center gap-6 mt-14 pt-8 border-t border-white/[0.06]">
                <div><p className="text-2xl font-bold text-white">{stats.totalCourses || "10"}+</p><p className="text-[11px] text-white/30 mt-0.5">Online Kurs</p></div>
                <div className="w-px h-8 bg-white/[0.06]" />
                <div><p className="text-2xl font-bold text-white">{stats.totalStudents || "500"}+</p><p className="text-[11px] text-white/30 mt-0.5">Öğrenci</p></div>
                <div className="w-px h-8 bg-white/[0.06]" />
                <div><p className="text-2xl font-bold text-white">{stats.totalHours || "100"}+</p><p className="text-[11px] text-white/30 mt-0.5">Saat İçerik</p></div>
              </div>
            </div>

            {/* Right — Instructor carousel */}
            <div className="hidden lg:flex justify-end relative">
              <div className="relative">
                <div className="w-[400px] h-[480px] rounded-2xl overflow-hidden relative bg-[#1a1640]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110e2e] via-[#110e2e]/30 to-transparent z-10" />
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#110e2e]/60 to-transparent z-10" />
                  {currentInstructor?.avatar ? (
                    <img key={heroIdx} src={currentInstructor.avatar} alt={currentInstructor.name} className="w-full h-full object-cover object-top transition-opacity duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple/10 to-primary/10" />
                  )}
                </div>
                {/* Name badge */}
                <div className="absolute bottom-6 left-5 z-20">
                  <p className="text-white font-semibold text-[15px]">{currentInstructor?.name || "Efehan Yıldız"}</p>
                  <p className="text-white/35 text-[11px] mt-0.5">{currentInstructor?.title || "WordPress & SEO Uzmanı"}</p>
                </div>
                {/* Dots */}
                {instructors.length > 1 && (
                  <div className="absolute bottom-6 right-5 z-20 flex gap-1.5">
                    {instructors.map((_, i) => (
                      <button key={i} onClick={() => setHeroIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === heroIdx ? "bg-purple w-4" : "bg-white/20 hover:bg-white/40"}`} />
                    ))}
                  </div>
                )}
                {/* Floating card */}
                <div className="absolute -left-12 top-[30%] bg-white/[0.07] backdrop-blur-xl rounded-xl p-3 border border-white/[0.08] z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple/20 flex items-center justify-center"><BookOpen size={14} className="text-purple" /></div>
                    <div><p className="text-white text-[11px] font-semibold">{stats.totalCourses || "10"}+ Kurs</p><p className="text-white/30 text-[9px]">Tüm seviyelerde</p></div>
                  </div>
                </div>
                <div className="absolute -right-8 top-[55%] bg-white/[0.07] backdrop-blur-xl rounded-xl p-3 border border-white/[0.08] z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple/20 flex items-center justify-center"><Users size={14} className="text-purple" /></div>
                    <div><p className="text-white text-[11px] font-semibold">{stats.totalStudents || "500"}+ Öğrenci</p><p className="text-white/30 text-[9px]">Aktif topluluk</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES — No title, direct boxes, white bg, gradient accents ═══ */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <MonitorPlay size={22} />, title: "HD Video Dersler", desc: "Vimeo altyapısı ile yüksek kaliteli video içerikler", gradient: "from-purple/5 to-purple/[0.02]" },
              { icon: <Zap size={22} />, title: "Pratik Odaklı", desc: "Gerçek projelerle desteklenen uygulamalı eğitimler", gradient: "from-blue-500/5 to-blue-500/[0.02]" },
              { icon: <Shield size={22} />, title: "Ömür Boyu Erişim", desc: "Bir kez satın al, sonsuza kadar eriş", gradient: "from-emerald-500/5 to-emerald-500/[0.02]" },
              { icon: <Award size={22} />, title: "Sertifika", desc: "Kurs tamamlama sertifikası ile kariyerini güçlendir", gradient: "from-amber-500/5 to-amber-500/[0.02]" },
            ].map((f, i) => (
              <div key={i} className={`bg-gradient-to-br ${f.gradient} rounded-2xl p-6 border border-border/50 hover:border-purple/20 transition-all group`}>
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-purple mb-4 shadow-sm group-hover:shadow-md transition-shadow">{f.icon}</div>
                <h3 className="text-[13px] font-bold text-foreground">{f.title}</h3>
                <p className="text-[11px] text-gray mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED COURSES ═══ */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {featuredCourses.map((c: any) => <CourseCard key={c.id} course={c} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-border rounded-2xl overflow-hidden">
                  <div className="aspect-video bg-light animate-pulse" />
                  <div className="p-5 space-y-3"><div className="h-5 bg-border/50 rounded animate-pulse w-3/4" /><div className="h-3 bg-border/30 rounded animate-pulse w-full" /></div>
                </div>
              ))}
            </div>
          )}
          <div className="md:hidden text-center mt-8">
            <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm font-medium text-purple">Tüm Kursları Gör <ChevronRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT — More effective ═══ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_80%_50%,rgba(121,93,237,0.04),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="inline-block text-[10px] font-bold text-purple uppercase tracking-[0.15em] bg-purple/5 px-3 py-1.5 rounded-full">Hakkımızda</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-5 leading-tight">Dijital eğitimde<br /><span className="text-purple">yeni nesil</span> platform</h2>
              <p className="text-sm text-gray mt-5 leading-relaxed">
                Worgoo Akademi, dijital dünyada kariyer yapmak isteyenler için uzman eğitmenler tarafından hazırlanmış online eğitim platformudur.
              </p>
              <div className="space-y-3 mt-7">
                {[
                  "Sektörde aktif çalışan uzman eğitmenler",
                  "Gerçek projelerle desteklenen pratik eğitimler",
                  "Sürekli güncellenen güncel içerikler",
                  "7/24 erişilebilir online platform",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-purple flex-shrink-0" />
                    <span className="text-[13px] text-gray-dark">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-purple hover:text-purple-hover transition-colors">
                Daha Fazla Bilgi <ArrowRight size={14} />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: stats.totalCourses || "10", suffix: "+", label: "Online Kurs", icon: <BookOpen size={18} />, color: "purple" },
                  { value: stats.totalStudents || "500", suffix: "+", label: "Aktif Öğrenci", icon: <Users size={18} />, color: "primary" },
                  { value: stats.totalInstructors || "4", suffix: "", label: "Uzman Eğitmen", icon: <TrendingUp size={18} />, color: "purple" },
                  { value: stats.totalHours || "100", suffix: "+", label: "Saat İçerik", icon: <Rocket size={18} />, color: "primary" },
                ].map((s, i) => (
                  <div key={i} className="bg-bg rounded-2xl p-7 group hover:bg-purple/[0.03] transition-colors">
                    <div className={`w-10 h-10 rounded-xl bg-${s.color}/10 flex items-center justify-center text-${s.color} mb-4`}>{s.icon}</div>
                    <p className="text-3xl font-bold text-foreground">{s.value}<span className="text-purple">{s.suffix}</span></p>
                    <p className="text-xs text-gray mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — Auto-scrolling full width ═══ */}
      <section className="py-20 overflow-hidden bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Öğrencilerimiz Ne Diyor?</h2>
            <p className="text-sm text-gray mt-2">Binlerce öğrencimizin deneyimleri</p>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-hidden whitespace-nowrap select-none" style={{ scrollBehavior: "auto" }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="inline-block w-[360px] flex-shrink-0 bg-white border border-border/60 rounded-2xl p-6 whitespace-normal">
              <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map((s) => <Star key={s} size={12} className={s <= t.rating ? "text-star fill-star" : "text-border"} />)}</div>
              <p className="text-[13px] text-gray-dark leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-border/40">
                <div className="w-9 h-9 rounded-full bg-purple/10 flex items-center justify-center text-purple text-[11px] font-bold">{t.name.charAt(0)}</div>
                <div><p className="text-xs font-semibold text-foreground">{t.name}</p><p className="text-[10px] text-gray">{t.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ VIDEO BANNER CTA — Taller, stock video bg ═══ */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[420px] md:min-h-[500px] flex items-center justify-center">
          {/* Stock video background */}
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-5765/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#110e2e]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(121,93,237,0.1),transparent_60%)]" />

          <div className="relative z-10 text-center px-4 py-20 max-w-3xl mx-auto">
            <button onClick={() => setVideoOpen(true)} className="mx-auto mb-8 w-20 h-20 rounded-full bg-purple/20 border-2 border-purple/40 flex items-center justify-center hover:bg-purple/30 hover:scale-110 transition-all group">
              <Play size={28} className="text-white ml-1" fill="currentColor" />
            </button>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Eğitim yolculuğuna<br />hemen başla</h2>
            <p className="text-sm text-white/45 mt-4 max-w-md mx-auto leading-relaxed">Uzman eğitmenlerimizin hazırladığı kurslarla dijital becerilerini geliştir. İlk adımı bugün at.</p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <Link href="/courses" className="bg-purple text-white font-semibold px-7 py-3 rounded-lg hover:bg-purple-hover transition-colors text-sm">
                Kursları İncele
              </Link>
              <Link href="/register" className="text-white/60 hover:text-white font-medium px-6 py-3 rounded-lg border border-white/15 hover:border-white/30 transition-colors text-sm">
                Ücretsiz Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm" onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVideoOpen(false)} className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"><X size={16} /></button>
            <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">Video yakında eklenecek</div>
          </div>
        </div>
      )}

      {/* ═══ INSTRUCTORS — More effective ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-bold text-purple uppercase tracking-[0.15em] bg-purple/5 px-3 py-1.5 rounded-full mb-4">Eğitmenler</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Alanında Uzman Eğitmenler</h2>
            <p className="text-sm text-gray mt-2 max-w-md mx-auto">Sektörde aktif çalışan profesyonellerden birebir öğrenin</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(instructors.length > 0 ? instructors : [
              { name: "Efehan Yıldız", title: "WordPress & SEO Uzmanı" },
              { name: "Hasan Tarık Emir", title: "Dijital Pazarlama Uzmanı" },
              { name: "Emir Karaman", title: "Web Geliştirme Uzmanı" },
              { name: "Semih Bayındır", title: "Tasarım & UX Uzmanı" },
            ]).map((inst: any, i: number) => (
              <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer">
                <div className="aspect-[3/4] bg-[#1a1640] relative">
                  {inst.avatar ? (
                    <img src={inst.avatar} alt={inst.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple/20 to-primary/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-purple/30">{inst.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110e2e] via-[#110e2e]/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-sm font-bold text-white">{inst.name}</h3>
                  <p className="text-[11px] text-white/50 mt-0.5">{inst.title}</p>
                  {inst._count?.courses > 0 && (
                    <span className="inline-block mt-2 text-[10px] font-medium text-purple bg-purple/20 px-2 py-0.5 rounded-full">{inst._count.courses} kurs</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REFERENCES ═══ */}
      <section className="py-14 bg-bg border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] text-gray uppercase tracking-[0.15em] font-medium mb-8">Güvenilen Teknolojiler & Partnerler</p>
          <div className="flex items-center justify-center flex-wrap gap-x-12 gap-y-6 opacity-30 grayscale hover:opacity-50 hover:grayscale-0 transition-all duration-500">
            {references.map((r, i) => (
              <div key={i} className="flex items-center justify-center h-8">
                {r.logo ? (
                  <img src={r.logo} alt={r.name} className="h-5 object-contain" />
                ) : (
                  <span className="text-base font-bold text-foreground tracking-tight">{r.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-gradient-to-r from-primary to-purple/90 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Öğrenmeye Bugün Başla</h2>
          <p className="text-sm text-white/50 mt-3 max-w-lg mx-auto">Hemen ücretsiz hesap oluştur ve eğitim içeriklerine erişim sağla.</p>
          <div className="flex items-center justify-center gap-3 mt-7">
            <Link href="/register" className="bg-white text-primary font-semibold px-7 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm">Ücretsiz Kayıt Ol</Link>
            <Link href="/courses" className="text-white/60 hover:text-white font-medium px-6 py-3 rounded-lg border border-white/15 hover:border-white/30 transition-colors text-sm">Kursları İncele</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
