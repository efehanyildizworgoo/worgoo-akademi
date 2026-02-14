"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { BookOpen, Users, Loader2, ArrowLeft, Globe, Linkedin, Twitter } from "lucide-react";

export default function InstructorDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [instructor, setInstructor] = useState<any>(null);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/public/instructors/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setInstructor(d.instructor || null);
        setTotalStudents(d.totalStudents || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={28} className="animate-spin text-purple" />
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="text-center py-32">
        <h2 className="text-xl font-bold text-foreground">Eğitmen bulunamadı</h2>
        <Link href="/instructors" className="text-sm text-purple mt-3 inline-block hover:underline">← Eğitmenlere Dön</Link>
      </div>
    );
  }

  // Parse socials JSON
  let socials: any = {};
  try { socials = instructor.socials ? JSON.parse(instructor.socials) : {}; } catch { socials = {}; }

  // Unique categories
  const topics = [...new Set((instructor.courses || []).map((c: any) => c.category?.name).filter(Boolean))] as string[];

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-[#110e2e] pt-36 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(121,93,237,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(121,93,237,0.15),transparent_70%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/instructors" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> Tüm Eğitmenler
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-purple/30 to-primary/30 flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-white/10">
              {instructor.avatar ? (
                <img src={instructor.avatar} alt={instructor.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-6xl font-bold text-purple">{instructor.name.charAt(0)}</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{instructor.name}</h1>
              <p className="text-purple text-base font-medium mt-1">{instructor.title}</p>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                    <BookOpen size={14} className="text-purple" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{instructor._count?.courses || 0}</p>
                    <p className="text-white/35 text-[10px]">Kurs</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                    <Users size={14} className="text-purple" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{totalStudents}</p>
                    <p className="text-white/35 text-[10px]">Öğrenci</p>
                  </div>
                </div>
              </div>

              {/* Topics */}
              {topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {topics.map((t: string) => (
                    <span key={t} className="text-[11px] font-medium bg-white/[0.06] text-white/60 px-3 py-1 rounded-lg border border-white/[0.06]">{t}</span>
                  ))}
                </div>
              )}

              {/* Socials */}
              {(socials.website || socials.linkedin || socials.twitter) && (
                <div className="flex items-center gap-3 mt-5">
                  {socials.website && (
                    <a href={socials.website} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                      <Globe size={14} />
                    </a>
                  )}
                  {socials.linkedin && (
                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                      <Linkedin size={14} />
                    </a>
                  )}
                  {socials.twitter && (
                    <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                      <Twitter size={14} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Bio */}
        {instructor.bio && (
          <div className="mb-14">
            <h2 className="text-lg font-bold text-foreground mb-4">Hakkında</h2>
            <p className="text-sm text-gray leading-relaxed max-w-3xl whitespace-pre-line">{instructor.bio}</p>
          </div>
        )}

        {/* Courses */}
        {instructor.courses?.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-6">
              Kursları <span className="text-sm font-normal text-gray ml-2">({instructor.courses.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructor.courses.map((c: any) => (
                <CourseCard key={c.id} course={{ ...c, instructor: { name: instructor.name, avatar: instructor.avatar } }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
