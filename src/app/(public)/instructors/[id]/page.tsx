"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { BookOpen, Users, Loader2, ArrowLeft, Globe, Linkedin, Twitter, Star, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={12} className={s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-light/30"} />
      ))}
    </div>
  );
}

export default function InstructorDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [instructor, setInstructor] = useState<any>(null);
  const [totalStudents, setTotalStudents] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const [avgRating, setAvgRating] = useState("0");
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/public/instructors/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setInstructor(d.instructor || null);
        setTotalStudents(d.totalStudents || 0);
        setReviews(d.reviews || []);
        setAvgRating(d.avgRating || "0");
        setTotalReviews(d.totalReviews || 0);
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

  // Parse socials & gallery JSON
  let socials: any = {};
  try { socials = instructor.socials ? JSON.parse(instructor.socials) : {}; } catch { socials = {}; }
  let gallery: string[] = [];
  try { gallery = instructor.gallery ? JSON.parse(instructor.gallery) : []; } catch { gallery = []; }
  if (!Array.isArray(gallery)) gallery = [];

  // Unique categories
  const topics = [...new Set((instructor.courses || []).map((c: any) => c.category?.name).filter(Boolean))] as string[];

  const scrollGallery = (dir: "left" | "right") => {
    const el = galleryRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

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

              {/* Stats row */}
              <div className="flex items-center gap-5 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                    <BookOpen size={15} className="text-purple" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{instructor._count?.courses || 0}</p>
                    <p className="text-white/35 text-[10px]">Kurs</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                    <Users size={15} className="text-purple" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{totalStudents}</p>
                    <p className="text-white/35 text-[10px]">Öğrenci</p>
                  </div>
                </div>
                {totalReviews > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                      <Star size={15} className="text-yellow-400 fill-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{avgRating}</p>
                      <p className="text-white/35 text-[10px]">{totalReviews} değerlendirme</p>
                    </div>
                  </div>
                )}
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

      {/* ═══ ABOUT — Gallery + Bio side by side ═══ */}
      {(instructor.bio || gallery.length > 0) && (
        <section className="py-16 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-foreground mb-8">Hakkında</h2>
            <div className={`flex flex-col ${gallery.length > 0 ? "lg:flex-row" : ""} gap-10`}>
              {/* Gallery */}
              {gallery.length > 0 && (
                <div className="lg:w-1/2 flex-shrink-0">
                  {gallery.length === 1 ? (
                    <div className="rounded-2xl overflow-hidden border border-border/50">
                      <img src={gallery[0]} alt="Eğitmen" className="w-full h-80 object-cover" />
                    </div>
                  ) : (
                    <div className="relative">
                      <div ref={galleryRef} className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory rounded-2xl">
                        {gallery.map((img, i) => (
                          <div key={i} className="flex-shrink-0 w-72 h-80 snap-start rounded-2xl overflow-hidden border border-border/50">
                            <img src={img} alt={`Eğitmen ${i + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      {gallery.length > 1 && (
                        <div className="flex items-center gap-2 mt-3">
                          <button onClick={() => scrollGallery("left")} className="w-8 h-8 rounded-lg bg-bg border border-border/50 flex items-center justify-center text-gray hover:text-foreground transition-colors">
                            <ChevronLeft size={14} />
                          </button>
                          <button onClick={() => scrollGallery("right")} className="w-8 h-8 rounded-lg bg-bg border border-border/50 flex items-center justify-center text-gray hover:text-foreground transition-colors">
                            <ChevronRight size={14} />
                          </button>
                          <span className="text-[10px] text-gray ml-1">{gallery.length} fotoğraf</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Bio text */}
              {instructor.bio && (
                <div className={gallery.length > 0 ? "lg:w-1/2" : "max-w-3xl"}>
                  <p className="text-sm text-gray leading-relaxed whitespace-pre-line">{instructor.bio}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══ COURSES ═══ */}
      {instructor.courses?.length > 0 && (
        <section className="py-16 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Kursları <span className="text-sm font-normal text-gray ml-2">({instructor.courses.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructor.courses.map((c: any) => (
                <CourseCard key={c.id} course={{ ...c, instructor: { name: instructor.name, avatar: instructor.avatar } }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ REVIEWS ═══ */}
      {reviews.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-bold text-foreground">Öğrenci Yorumları</h2>
              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-foreground">{avgRating}</span>
                <span className="text-xs text-gray">({totalReviews})</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((r: any) => (
                <div key={r.id} className="bg-white border border-border/50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center flex-shrink-0">
                      {r.user?.avatar ? (
                        <img src={r.user.avatar} alt={r.user.name} className="w-full h-full rounded-xl object-cover" />
                      ) : (
                        <span className="text-sm font-bold text-purple">{r.user?.name?.charAt(0) || "?"}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground">{r.user?.name}</p>
                        <Stars rating={r.rating} />
                      </div>
                      {r.course && (
                        <p className="text-[10px] text-purple mt-0.5">{r.course.title}</p>
                      )}
                      {r.comment && (
                        <p className="text-sm text-gray mt-2 leading-relaxed">{r.comment}</p>
                      )}
                      <p className="text-[10px] text-gray-light mt-2">
                        {new Date(r.createdAt).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
