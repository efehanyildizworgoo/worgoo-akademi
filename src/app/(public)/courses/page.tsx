"use client";

import { useState, useEffect, useCallback } from "react";
import CourseCard from "@/components/CourseCard";
import { Search, SlidersHorizontal, Loader2, BookOpen } from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("newest");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (level) params.set("level", level);
    if (sort) params.set("sort", sort);
    try {
      const res = await fetch(`/api/public/courses?${params}`);
      const data = await res.json();
      setCourses(data.courses || []);
      setCategories(data.categories || []);
    } catch {}
    setLoading(false);
  }, [search, category, level, sort]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground">Kurslar</h1>
        <p className="text-sm text-gray mt-2">Tüm kurslarımızı keşfedin ve öğrenmeye başlayın</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-8">
        <div className="relative flex-1 w-full md:max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kurs ara..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm text-foreground placeholder:text-gray-light focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/20"
          />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3.5 py-2.5 bg-white border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-purple">
            <option value="">Tüm Kategoriler</option>
            {categories.map((c: any) => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="px-3.5 py-2.5 bg-white border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-purple">
            <option value="">Tüm Seviyeler</option>
            <option value="beginner">Başlangıç</option>
            <option value="intermediate">Orta</option>
            <option value="advanced">İleri</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3.5 py-2.5 bg-white border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-purple">
            <option value="newest">En Yeni</option>
            <option value="popular">En Popüler</option>
            <option value="price-low">Fiyat: Düşük → Yüksek</option>
            <option value="price-high">Fiyat: Yüksek → Düşük</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 size={28} className="animate-spin text-purple" /></div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen size={40} className="mx-auto text-gray-light/40 mb-4" />
          <h3 className="text-lg font-semibold text-foreground">Kurs bulunamadı</h3>
          <p className="text-sm text-gray mt-1">Farklı filtreler deneyebilir veya arama terimini değiştirebilirsiniz.</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray mb-4">{courses.length} kurs bulundu</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c: any) => <CourseCard key={c.id} course={c} />)}
          </div>
        </>
      )}
    </div>
  );
}
