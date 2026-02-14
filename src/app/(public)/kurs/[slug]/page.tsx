"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Play, Clock, Users, Star, BookOpen, ChevronDown, ChevronUp,
  Lock, CheckCircle2, Loader2, ShoppingCart, GraduationCap,
  BarChart3, Globe, Award,
} from "lucide-react";

const levelLabels: Record<string, string> = { beginner: "Başlangıç", intermediate: "Orta", advanced: "İleri" };

export default function CourseDetailPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/public/courses/${slug}`)
      .then((r) => r.json())
      .then((d) => { setCourse(d.course); setLoading(false); if (d.course?.sections?.[0]) setOpenSections(new Set([d.course.sections[0].id])); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="flex items-center justify-center h-96"><Loader2 size={28} className="animate-spin text-purple" /></div>;
  if (!course) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-purple mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-2">Kurs Bulunamadı</h2>
        <p className="text-sm text-gray max-w-md mx-auto mb-8">Aradığınız kurs mevcut değil veya kaldırılmış olabilir.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/courses" className="bg-purple text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-purple-hover transition-colors">Tüm Kurslar</Link>
          <Link href="/" className="text-sm font-medium text-gray hover:text-foreground transition-colors">Ana Sayfa →</Link>
        </div>
      </div>
    </div>
  );

  const hours = Math.floor(course.totalDuration / 60);
  const mins = course.totalDuration % 60;
  const hasDiscount = course.salePrice != null && course.salePrice < course.price;
  const finalPrice = hasDiscount ? course.salePrice : course.price;

  const toggleSection = (id: string) => {
    const next = new Set(openSections);
    next.has(id) ? next.delete(id) : next.add(id);
    setOpenSections(next);
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {course.category && (
                <Link href={`/kurs-kategori/${course.category.slug}`} className="inline-block text-xs font-medium text-purple-300 bg-white/10 px-3 py-1 rounded-full mb-4 hover:bg-white/15 transition-colors">
                  {course.category.name}
                </Link>
              )}
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">{course.title}</h1>
              <p className="text-sm text-white/70 mt-4 leading-relaxed max-w-2xl">{course.shortDesc}</p>

              <div className="flex items-center gap-4 mt-6 flex-wrap">
                {course.avgRating > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-star">{course.avgRating.toFixed(1)}</span>
                    <div className="flex">{[1,2,3,4,5].map((s) => <Star key={s} size={13} className={s <= Math.round(course.avgRating) ? "text-star fill-star" : "text-white/20"} />)}</div>
                    <span className="text-xs text-white/50">({course._count.reviews})</span>
                  </div>
                )}
                <span className="text-xs text-white/50 flex items-center gap-1"><Users size={12} /> {course._count.enrollments} öğrenci</span>
                <span className="text-xs text-white/50 flex items-center gap-1"><BookOpen size={12} /> {course.totalLessons} ders</span>
                <span className="text-xs text-white/50 flex items-center gap-1"><Clock size={12} /> {hours > 0 ? `${hours}s ${mins}dk` : `${mins}dk`}</span>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-purple/30 flex items-center justify-center text-white text-sm font-bold">
                  {course.instructor.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{course.instructor.name}</p>
                  <p className="text-xs text-white/50">{course.instructor.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            {course.description && (
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Kurs Hakkında</h2>
                <div className="text-sm text-gray-dark leading-relaxed whitespace-pre-line">{course.description}</div>
              </div>
            )}

            {/* Curriculum */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Müfredat</h2>
              <p className="text-xs text-gray mb-4">{course.sections.length} bölüm • {course.totalLessons} ders • {hours > 0 ? `${hours} saat ${mins} dakika` : `${mins} dakika`}</p>
              <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                {course.sections.map((section: any) => {
                  const isOpen = openSections.has(section.id);
                  const sectionDuration = section.lessons.reduce((s: number, l: any) => s + l.duration, 0);
                  return (
                    <div key={section.id}>
                      <button onClick={() => toggleSection(section.id)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-bg/50 transition-colors text-left">
                        <div className="flex items-center gap-3">
                          {isOpen ? <ChevronUp size={16} className="text-gray" /> : <ChevronDown size={16} className="text-gray" />}
                          <span className="text-sm font-semibold text-foreground">{section.title}</span>
                        </div>
                        <span className="text-xs text-gray">{section.lessons.length} ders • {sectionDuration}dk</span>
                      </button>
                      {isOpen && (
                        <div className="bg-bg/30 divide-y divide-border/50">
                          {section.lessons.map((lesson: any) => (
                            <div key={lesson.id} className="flex items-center gap-3 px-5 py-3 pl-12">
                              {lesson.isFree ? (
                                <Play size={13} className="text-purple flex-shrink-0" />
                              ) : (
                                <Lock size={13} className="text-gray-light flex-shrink-0" />
                              )}
                              <span className="text-sm text-gray-dark flex-1">{lesson.title}</span>
                              {lesson.isFree && <span className="text-[10px] font-medium text-purple bg-purple/10 px-2 py-0.5 rounded-full">Ücretsiz</span>}
                              <span className="text-xs text-gray">{lesson.duration}dk</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Eğitmen</h2>
              <div className="flex items-start gap-4 p-5 bg-white border border-border rounded-xl">
                <div className="w-16 h-16 rounded-full bg-purple/10 flex items-center justify-center text-purple text-xl font-bold flex-shrink-0">
                  {course.instructor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{course.instructor.name}</h3>
                  <p className="text-xs text-gray mt-0.5">{course.instructor.title}</p>
                  {course.instructor.bio && <p className="text-sm text-gray-dark mt-2 leading-relaxed">{course.instructor.bio}</p>}
                  <p className="text-xs text-purple mt-2 font-medium">{course.instructor._count?.courses || 0} kurs</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {course.reviews.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Değerlendirmeler</h2>
                <div className="space-y-4">
                  {course.reviews.map((r: any) => (
                    <div key={r.id} className="p-4 bg-white border border-border rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-purple/10 flex items-center justify-center text-purple text-xs font-bold">{r.user.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{r.user.name}</p>
                          <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <Star key={s} size={10} className={s <= r.rating ? "text-star fill-star" : "text-border"} />)}</div>
                        </div>
                      </div>
                      {r.comment && <p className="text-sm text-gray-dark leading-relaxed">{r.comment}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
              {course.thumbnail ? (
                <img src={course.thumbnail} alt={course.title} className="w-full aspect-video object-cover" />
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-primary/10 to-purple/10 flex items-center justify-center">
                  <Play size={40} className="text-purple/30" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {course.price === 0 ? (
                    <span className="text-2xl font-bold text-success">Ücretsiz</span>
                  ) : hasDiscount ? (
                    <>
                      <span className="text-2xl font-bold text-purple">₺{course.salePrice.toLocaleString("tr-TR")}</span>
                      <span className="text-sm text-gray line-through">₺{course.price.toLocaleString("tr-TR")}</span>
                      <span className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                        %{Math.round((1 - course.salePrice / course.price) * 100)} İndirim
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-primary">₺{course.price.toLocaleString("tr-TR")}</span>
                  )}
                </div>

                {user ? (
                  <Link href={`/checkout/${course.slug}`} className="flex items-center justify-center gap-2 w-full bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple-hover transition-colors text-sm">
                    <ShoppingCart size={16} /> Satın Al
                  </Link>
                ) : (
                  <Link href={`/login?redirect=/kurs/${course.slug}`} className="flex items-center justify-center gap-2 w-full bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple-hover transition-colors text-sm">
                    <ShoppingCart size={16} /> Satın Almak İçin Giriş Yap
                  </Link>
                )}

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-dark"><BookOpen size={15} className="text-gray" /> <span>{course.totalLessons} ders</span></div>
                  <div className="flex items-center gap-3 text-gray-dark"><Clock size={15} className="text-gray" /> <span>{hours > 0 ? `${hours} saat ${mins} dakika` : `${mins} dakika`} içerik</span></div>
                  <div className="flex items-center gap-3 text-gray-dark"><BarChart3 size={15} className="text-gray" /> <span>{levelLabels[course.level]} seviye</span></div>
                  <div className="flex items-center gap-3 text-gray-dark"><Globe size={15} className="text-gray" /> <span>Türkçe</span></div>
                  <div className="flex items-center gap-3 text-gray-dark"><Award size={15} className="text-gray" /> <span>Tamamlama sertifikası</span></div>
                  <div className="flex items-center gap-3 text-gray-dark"><Play size={15} className="text-gray" /> <span>Ömür boyu erişim</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
