"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Users, Loader2, ArrowRight } from "lucide-react";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/instructors").then((r) => r.json()).then((d) => {
      setInstructors(d.instructors || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const fallback = [
    { id: "1", name: "Efehan Yıldız", title: "WordPress & SEO Uzmanı", bio: "Dijital dünyada markaların online varlığını güçlendiren stratejiler geliştiriyor.", courses: [], _count: { courses: 0 } },
    { id: "2", name: "Hasan Tarık Emir", title: "Dijital Pazarlama Uzmanı", bio: "Performans pazarlama ve büyüme stratejileri konusunda uzmanlaşmış profesyonel.", courses: [], _count: { courses: 0 } },
    { id: "3", name: "Emir Karaman", title: "Web Geliştirme Uzmanı", bio: "Modern web teknolojileri ve full-stack geliştirme alanında deneyimli yazılımcı.", courses: [], _count: { courses: 0 } },
    { id: "4", name: "Semih Bayındır", title: "Tasarım & UX Uzmanı", bio: "Kullanıcı deneyimi odaklı tasarım çözümleri üreten yaratıcı profesyonel.", courses: [], _count: { courses: 0 } },
  ];

  const list = instructors.length > 0 ? instructors : fallback;

  // Extract unique category names from an instructor's courses
  const getTopics = (inst: any) => {
    const cats = (inst.courses || []).map((c: any) => c.category?.name).filter(Boolean);
    return [...new Set(cats)] as string[];
  };

  // Total students for an instructor
  const getTotalStudents = (inst: any) => {
    return (inst.courses || []).reduce((sum: number, c: any) => sum + (c._count?.enrollments || 0), 0);
  };

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
            {list.map((inst: any) => {
              const topics = getTopics(inst);
              const students = getTotalStudents(inst);
              return (
                <Link key={inst.id} href={`/instructors/${inst.id}`} className="block group">
                  <div className="bg-white border border-border rounded-2xl p-7 hover:border-purple/20 hover:shadow-xl transition-all h-full">
                    <div className="flex items-start gap-5">
                      {/* Avatar */}
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple/20 to-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                        {inst.avatar ? (
                          <img src={inst.avatar} alt={inst.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-4xl font-bold text-purple">{inst.name.charAt(0)}</span>
                        )}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-purple transition-colors">{inst.name}</h3>
                        <p className="text-sm text-purple font-medium mt-0.5">{inst.title}</p>
                        {inst.bio && <p className="text-[13px] text-gray mt-2.5 leading-relaxed line-clamp-2">{inst.bio}</p>}

                        {/* Topics */}
                        {topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {topics.map((t: string) => (
                              <span key={t} className="text-[10px] font-medium bg-purple/8 text-purple px-2 py-0.5 rounded-md">{t}</span>
                            ))}
                          </div>
                        )}

                        {/* Stats */}
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
                          {inst._count?.courses > 0 && (
                            <span className="flex items-center gap-1.5 text-xs text-gray">
                              <BookOpen size={12} className="text-purple/60" /> {inst._count.courses} kurs
                            </span>
                          )}
                          {students > 0 && (
                            <span className="flex items-center gap-1.5 text-xs text-gray">
                              <Users size={12} className="text-purple/60" /> {students} öğrenci
                            </span>
                          )}
                          <span className="ml-auto flex items-center gap-1 text-xs text-purple font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Profili Gör <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
