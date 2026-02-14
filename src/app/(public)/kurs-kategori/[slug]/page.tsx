"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { Search, Loader2, BookOpen, ChevronRight, ChevronLeft, TrendingUp, Megaphone } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("newest");
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const popularRef = useRef<HTMLDivElement>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams();
    if (categorySlug) p.set("category", categorySlug);
    if (search) p.set("search", search);
    if (level) p.set("level", level);
    if (sort) p.set("sort", sort);
    try {
      const res = await fetch(`/api/public/courses?${p}`);
      const data = await res.json();
      setCourses(data.courses || []);
      setCategories(data.categories || []);
      const found = (data.categories || []).find((c: any) => c.slug === categorySlug);
      if (found) {
        setCategoryName(found.name);
        setCategoryDesc(found.description || "");
      }
    } catch {}
    setLoading(false);
  }, [categorySlug, search, level, sort]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const popularCourses = [...courses].sort((a, b) => (b._count?.enrollments || 0) - (a._count?.enrollments || 0)).slice(0, 6);

  const scrollPopular = (dir: "left" | "right") => {
    const el = popularRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -220 : 220, behavior: "smooth" });
  };

  const selectClass = "appearance-none bg-white/[0.06] border border-white/10 rounded-xl text-sm text-white/70 pl-4 pr-9 py-2.5 focus:outline-none focus:border-purple bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.4)%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat";

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-[#110e2e] pt-36 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(121,93,237,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(121,93,237,0.15),transparent_70%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1]">
            {categoryName || categorySlug}
          </h1>
          <p className="text-[15px] text-white/45 mt-4 max-w-lg leading-relaxed">
            {categoryName} kategorisindeki tüm kursları keşfedin ve öğrenmeye başlayın.
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-8">
            <div className="relative flex-1 w-full md:max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Kurs ara..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/20"
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select value={level} onChange={(e) => setLevel(e.target.value)} className={selectClass}>
                <option value="">Tüm Seviyeler</option>
                <option value="beginner">Başlangıç</option>
                <option value="intermediate">Orta</option>
                <option value="advanced">İleri</option>
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
                <option value="newest">En Yeni</option>
                <option value="popular">En Popüler</option>
                <option value="price-low">Fiyat: Düşük → Yüksek</option>
                <option value="price-high">Fiyat: Yüksek → Düşük</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="py-12 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ── SIDEBAR ── */}
            <aside className="w-full lg:w-[280px] flex-shrink-0 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl border border-border/50 p-5">
                <h3 className="text-sm font-bold text-foreground mb-4">Kategoriler</h3>
                <div className="space-y-1">
                  <Link
                    href="/courses"
                    className="block w-full text-left px-3 py-2 rounded-lg text-sm text-gray hover:bg-bg hover:text-foreground transition-colors"
                  >
                    Tüm Kategoriler
                  </Link>
                  {categories.map((c: any) => (
                    <Link
                      key={c.id}
                      href={`/kurs-kategori/${c.slug}`}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${categorySlug === c.slug ? "bg-purple/10 text-purple font-medium" : "text-gray hover:bg-bg hover:text-foreground"}`}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Courses */}
              {popularCourses.length > 0 && (
                <div className="bg-white rounded-2xl border border-border/50 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-purple" /> Popüler Kurslar
                    </h3>
                    <div className="flex gap-1">
                      <button onClick={() => scrollPopular("left")} className="w-6 h-6 rounded-md bg-bg flex items-center justify-center text-gray hover:text-foreground transition-colors"><ChevronLeft size={14} /></button>
                      <button onClick={() => scrollPopular("right")} className="w-6 h-6 rounded-md bg-bg flex items-center justify-center text-gray hover:text-foreground transition-colors"><ChevronRight size={14} /></button>
                    </div>
                  </div>
                  <div ref={popularRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                    {popularCourses.map((c: any) => (
                      <Link key={c.id} href={`/kurs/${c.slug}`} className="flex-shrink-0 w-[200px] group">
                        <div className="aspect-video rounded-xl overflow-hidden bg-light mb-2">
                          {c.thumbnail ? (
                            <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple/10 to-primary/10" />
                          )}
                        </div>
                        <p className="text-xs font-semibold text-foreground line-clamp-2 group-hover:text-purple transition-colors">{c.title}</p>
                        <p className="text-[10px] text-gray mt-0.5">{c.instructor?.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Vertical Banner */}
              <div className="bg-gradient-to-b from-[#110e2e] to-purple/80 rounded-2xl p-6 text-center">
                <Megaphone size={28} className="text-white mx-auto mb-3" />
                <h4 className="text-sm font-bold text-white">Yeni Kurslar Geliyor!</h4>
                <p className="text-[11px] text-white/50 mt-2 leading-relaxed">
                  En güncel eğitim içeriklerinden haberdar olmak için hemen kayıt olun.
                </p>
                <Link href="/register" className="inline-block mt-4 bg-white text-primary font-semibold text-xs px-5 py-2 rounded-lg hover:bg-white/90 transition-colors">
                  Ücretsiz Kayıt Ol
                </Link>
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="flex items-center justify-center h-48"><Loader2 size={28} className="animate-spin text-purple" /></div>
              ) : courses.length === 0 ? (
                <div className="text-center py-20">
                  <BookOpen size={40} className="mx-auto text-gray-light/40 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">Kurs bulunamadı</h3>
                  <p className="text-sm text-gray mt-1">Bu kategoride henüz kurs bulunmuyor.</p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray mb-4">{courses.length} kurs bulundu</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((c: any) => <CourseCard key={c.id} course={c} />)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORY DESCRIPTION — SEO text ═══ */}
      {categoryDesc && (
        <section className="py-16 bg-white border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm text-gray leading-relaxed whitespace-pre-line">{categoryDesc}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
