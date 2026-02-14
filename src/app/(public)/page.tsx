"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import {
  Play, Users, BookOpen, Award, ArrowRight,
  Star, ChevronRight, Sparkles, Zap, Target,
  Shield, Clock, CheckCircle2, X, ChevronLeft, ChevronDown,
  Quote, MonitorPlay, Globe, Layers,
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/public/home").then((r) => r.json()).then((d) => {
      setFeaturedCourses(d.featuredCourses || []);
      setStats(d.stats || {});
      setInstructors(d.instructors || []);
    }).catch(() => {});
  }, []);

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

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#1a1535]">
        {/* Radial rays */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[70%] h-full bg-[radial-gradient(ellipse_at_70%_50%,rgba(121,93,237,0.15),transparent_70%)]" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-purple/10 to-transparent rotate-[25deg] origin-top" />
          <div className="absolute top-0 left-[55%] w-[1px] h-full bg-gradient-to-b from-transparent via-purple/8 to-transparent rotate-[35deg] origin-top" />
          <div className="absolute top-0 left-[60%] w-[1px] h-full bg-gradient-to-b from-transparent via-purple/6 to-transparent rotate-[45deg] origin-top" />
          <div className="absolute top-0 left-[45%] w-[1px] h-full bg-gradient-to-b from-transparent via-purple/8 to-transparent rotate-[15deg] origin-top" />
          <div className="absolute top-0 left-[40%] w-[1px] h-full bg-gradient-to-b from-transparent via-purple/5 to-transparent rotate-[5deg] origin-top" />
          <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent -rotate-[10deg] origin-top" />
          <div className="absolute top-0 right-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/3 to-transparent -rotate-[20deg] origin-top" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="pt-16 lg:pt-0">
              <h1 className="text-4xl md:text-[3.5rem] lg:text-[3.8rem] font-bold text-white leading-[1.1] tracking-tight">
                Dijital kariyerini
                <br />
                <span className="text-purple">bir üst seviyeye</span>
                <br />
                taşı
              </h1>
              <p className="text-[15px] text-white/50 mt-6 max-w-md leading-relaxed">
                Alanında uzman eğitmenlerden WordPress, SEO, dijital pazarlama ve web geliştirme kursları. Pratik odaklı eğitimlerle kariyerini şekillendir.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 mt-8">
                <Link href="/courses" className="flex items-center gap-2 bg-purple text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-hover transition-colors text-sm">
                  Kursları Keşfet <ArrowRight size={15} />
                </Link>
                <Link href="/register" className="flex items-center gap-2 text-white/60 hover:text-white font-medium px-5 py-3 rounded-lg border border-white/15 hover:border-white/30 transition-colors text-sm">
                  Ücretsiz Başla
                </Link>
              </div>

              {/* Mini stats */}
              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10">
                <div><p className="text-2xl font-bold text-white">{stats.totalCourses || "10"}+</p><p className="text-[11px] text-white/40 mt-0.5">Online Kurs</p></div>
                <div className="w-px h-8 bg-white/10" />
                <div><p className="text-2xl font-bold text-white">{stats.totalStudents || "500"}+</p><p className="text-[11px] text-white/40 mt-0.5">Öğrenci</p></div>
                <div className="w-px h-8 bg-white/10" />
                <div><p className="text-2xl font-bold text-white">{stats.totalHours || "100"}+</p><p className="text-[11px] text-white/40 mt-0.5">Saat İçerik</p></div>
              </div>
            </div>

            {/* Right — Featured instructor */}
            <div className="hidden lg:flex justify-end relative">
              <div className="relative">
                <div className="w-[420px] h-[480px] rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1535] via-transparent to-transparent z-10" />
                  {instructors[0]?.avatar ? (
                    <img src={instructors[0].avatar} alt={instructors[0]?.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple/20 to-primary/20" />
                  )}
                </div>
                {/* Name badge */}
                <div className="absolute bottom-8 left-6 z-20">
                  <p className="text-white font-semibold text-sm">{instructors[0]?.name || "Efehan Yıldız"}</p>
                  <p className="text-white/40 text-[11px] mt-0.5">{instructors[0]?.title || "WordPress & SEO Uzmanı"}</p>
                </div>
                {/* Floating card */}
                <div className="absolute -left-16 top-1/3 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10 z-20 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple/20 flex items-center justify-center"><BookOpen size={14} className="text-purple" /></div>
                    <div><p className="text-white text-xs font-semibold">{stats.totalCourses || "10"}+ Kurs</p><p className="text-white/40 text-[9px]">Tüm seviyelerde</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Neden Worgoo Akademi?</h2>
            <p className="text-sm text-gray mt-2 max-w-lg mx-auto">Eğitim deneyiminizi en üst seviyeye taşıyan özellikler</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <MonitorPlay size={22} />, title: "HD Video Dersler", desc: "Vimeo altyapısı ile yüksek kaliteli video içerikler" },
              { icon: <Zap size={22} />, title: "Pratik Odaklı", desc: "Gerçek projelerle desteklenen uygulamalı eğitimler" },
              { icon: <Shield size={22} />, title: "Ömür Boyu Erişim", desc: "Bir kez satın al, sonsuza kadar eriş" },
              { icon: <Award size={22} />, title: "Sertifika", desc: "Kurs tamamlama sertifikası ile kariyerini güçlendir" },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border p-6 hover:border-purple/20 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl bg-purple/10 flex items-center justify-center text-purple mb-4 group-hover:bg-purple group-hover:text-white transition-colors">{f.icon}</div>
                <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
                <p className="text-xs text-gray mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED COURSES ═══ */}
      <section className="pb-20">
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

      {/* ═══ ABOUT ═══ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-xs font-semibold text-purple uppercase tracking-wider">Hakkımızda</span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3">Dijital eğitimde yeni nesil platform</h2>
              <p className="text-sm text-gray mt-4 leading-relaxed">
                Worgoo Akademi, dijital dünyada kariyer yapmak isteyenler için uzman eğitmenler tarafından hazırlanmış online eğitim platformudur. Teoriden çok pratiğe odaklanıyoruz.
              </p>
              <div className="space-y-3 mt-6">
                {[
                  "Sektörde aktif çalışan uzman eğitmenler",
                  "Gerçek projelerle desteklenen pratik eğitimler",
                  "Sürekli güncellenen güncel içerikler",
                  "7/24 erişilebilir online platform",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-purple flex-shrink-0" />
                    <span className="text-sm text-gray-dark">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-purple hover:text-purple-hover transition-colors">
                Daha Fazla Bilgi <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg rounded-2xl p-6 text-center"><p className="text-3xl font-bold text-primary">{stats.totalCourses || "10"}+</p><p className="text-xs text-gray mt-1">Online Kurs</p></div>
              <div className="bg-bg rounded-2xl p-6 text-center"><p className="text-3xl font-bold text-purple">{stats.totalStudents || "500"}+</p><p className="text-xs text-gray mt-1">Aktif Öğrenci</p></div>
              <div className="bg-bg rounded-2xl p-6 text-center"><p className="text-3xl font-bold text-primary">{stats.totalInstructors || "4"}</p><p className="text-xs text-gray mt-1">Uzman Eğitmen</p></div>
              <div className="bg-bg rounded-2xl p-6 text-center"><p className="text-3xl font-bold text-purple">{stats.totalHours || "100"}+</p><p className="text-xs text-gray mt-1">Saat İçerik</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — Auto-scrolling ═══ */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Öğrencilerimiz Ne Diyor?</h2>
            <p className="text-sm text-gray mt-2">Binlerce öğrencimizin deneyimleri</p>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-hidden whitespace-nowrap select-none" style={{ scrollBehavior: "auto" }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="inline-block w-[340px] flex-shrink-0 bg-white border border-border rounded-2xl p-6 whitespace-normal">
              <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map((s) => <Star key={s} size={12} className={s <= t.rating ? "text-star fill-star" : "text-border"} />)}</div>
              <p className="text-sm text-gray-dark leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-border">
                <div className="w-8 h-8 rounded-full bg-purple/10 flex items-center justify-center text-purple text-[10px] font-bold">{t.name.charAt(0)}</div>
                <div><p className="text-xs font-semibold text-foreground">{t.name}</p><p className="text-[10px] text-gray">{t.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ VIDEO BANNER CTA ═══ */}
      <section className="relative overflow-hidden">
        <div className="bg-[#1a1535] py-20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(121,93,237,0.15),transparent_70%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              {/* Play button */}
              <button onClick={() => setVideoOpen(true)} className="flex-shrink-0 w-24 h-24 rounded-full bg-purple/20 border-2 border-purple/40 flex items-center justify-center hover:bg-purple/30 hover:scale-105 transition-all group">
                <Play size={32} className="text-purple ml-1 group-hover:text-white transition-colors" fill="currentColor" />
              </button>
              <div className="text-center lg:text-left flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Eğitim yolculuğuna hemen başla</h2>
                <p className="text-sm text-white/50 mt-2 max-w-lg">Uzman eğitmenlerimizin hazırladığı kurslarla dijital becerilerini geliştir. İlk adımı bugün at.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/courses" className="bg-purple text-white font-semibold px-7 py-3 rounded-lg hover:bg-purple-hover transition-colors text-sm text-center">
                  Kursları İncele
                </Link>
                <Link href="/register" className="text-white/70 hover:text-white font-medium px-6 py-3 rounded-lg border border-white/15 hover:border-white/30 transition-colors text-sm text-center">
                  Ücretsiz Kayıt Ol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVideoOpen(false)} className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"><X size={16} /></button>
            <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">Video yakında eklenecek</div>
          </div>
        </div>
      )}

      {/* ═══ INSTRUCTORS ═══ */}
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
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple/20 to-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform overflow-hidden">
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

      {/* ═══ REFERENCES ═══ */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray uppercase tracking-wider font-medium mb-10">Güvenilen Teknolojiler & Partnerler</p>
          <div className="flex items-center justify-center flex-wrap gap-x-12 gap-y-6 opacity-40 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-500">
            {references.map((r, i) => (
              <div key={i} className="flex items-center justify-center h-8">
                {r.logo ? (
                  <img src={r.logo} alt={r.name} className="h-6 object-contain" />
                ) : (
                  <span className="text-lg font-bold text-foreground tracking-tight">{r.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-gradient-to-r from-primary to-purple py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Öğrenmeye Bugün Başla</h2>
          <p className="text-sm text-white/60 mt-3 max-w-lg mx-auto">Hemen ücretsiz hesap oluştur ve eğitim içeriklerine erişim sağla.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link href="/register" className="bg-white text-primary font-semibold px-7 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm">Ücretsiz Kayıt Ol</Link>
            <Link href="/courses" className="text-white/70 hover:text-white font-medium px-6 py-3 rounded-lg border border-white/20 hover:border-white/40 transition-colors text-sm">Kursları İncele</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
