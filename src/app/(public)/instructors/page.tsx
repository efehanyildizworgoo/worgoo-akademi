"use client";

import { useState, useEffect } from "react";
import { GraduationCap, BookOpen, Users, Loader2 } from "lucide-react";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/home").then((r) => r.json()).then((d) => {
      setInstructors(d.instructors || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const fallback = [
    { name: "Efehan Yıldız", title: "WordPress & SEO Uzmanı", bio: "Dijital dünyada markaların online varlığını güçlendiren stratejiler geliştiriyor." },
    { name: "Hasan Tarık Emir", title: "Dijital Pazarlama Uzmanı", bio: "Performans pazarlama ve büyüme stratejileri konusunda uzmanlaşmış profesyonel." },
    { name: "Emir Karaman", title: "Web Geliştirme Uzmanı", bio: "Modern web teknolojileri ve full-stack geliştirme alanında deneyimli yazılımcı." },
    { name: "Semih Bayındır", title: "Tasarım & UX Uzmanı", bio: "Kullanıcı deneyimi odaklı tasarım çözümleri üreten yaratıcı profesyonel." },
  ];

  const list = instructors.length > 0 ? instructors : fallback;

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-[#110e2e] pt-36 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(121,93,237,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(121,93,237,0.15),transparent_70%)]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1]">Eğitmenlerimiz</h1>
          <p className="text-[15px] text-white/45 mt-4 max-w-lg mx-auto leading-relaxed">
            Alanında uzman profesyonellerden pratik odaklı eğitimler alın
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex items-center justify-center h-48"><Loader2 size={28} className="animate-spin text-purple" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {list.map((inst: any, i: number) => (
              <div key={i} className="bg-white border border-border rounded-2xl p-8 hover:border-purple/20 hover:shadow-lg transition-all group">
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple/20 to-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    {inst.avatar ? (
                      <img src={inst.avatar} alt={inst.name} className="w-full h-full rounded-2xl object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-purple">{inst.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{inst.name}</h3>
                    <p className="text-sm text-purple font-medium mt-0.5">{inst.title}</p>
                    {inst.bio && <p className="text-sm text-gray mt-3 leading-relaxed">{inst.bio}</p>}
                    {inst._count?.courses > 0 && (
                      <div className="flex items-center gap-4 mt-4 text-xs text-gray">
                        <span className="flex items-center gap-1"><BookOpen size={12} /> {inst._count.courses} kurs</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
