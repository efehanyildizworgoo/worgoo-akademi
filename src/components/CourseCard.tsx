import Link from "next/link";
import { Clock, Users, Star, Play } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    slug: string;
    title: string;
    shortDesc: string;
    thumbnail: string;
    price: number;
    salePrice?: number | null;
    level: string;
    totalDuration: number;
    instructor: { name: string; avatar: string };
    _count?: { enrollments: number; reviews: number };
    avgRating?: number;
    isFeatured?: boolean;
  };
}

const levelLabels: Record<string, string> = {
  beginner: "Başlangıç",
  intermediate: "Orta",
  advanced: "İleri",
};

export default function CourseCard({ course }: CourseCardProps) {
  const hours = Math.floor(course.totalDuration / 60);
  const mins = course.totalDuration % 60;
  const durationStr = hours > 0 ? `${hours}s ${mins}dk` : `${mins}dk`;
  const hasDiscount = course.salePrice != null && course.salePrice < course.price;

  return (
    <Link href={`/kurs/${course.slug}`} className="group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-purple/20 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-light overflow-hidden">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple/10">
            <Play size={32} className="text-purple/40" />
          </div>
        )}
        {course.isFeatured && (
          <span className="absolute top-3 left-3 bg-purple text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">Öne Çıkan</span>
        )}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-gray-dark px-2 py-1 rounded-full">
          {levelLabels[course.level] || course.level}
        </span>
        {hasDiscount && (
          <span className="absolute bottom-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            %{Math.round(((course.price - course.salePrice!) / course.price) * 100)} İndirim
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-purple transition-colors">
          {course.title}
        </h3>
        {course.shortDesc && (
          <p className="text-xs text-gray mt-1.5 line-clamp-2 leading-relaxed">{course.shortDesc}</p>
        )}

        {/* Instructor */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-6 h-6 rounded-full bg-purple/10 flex items-center justify-center text-purple text-[10px] font-bold flex-shrink-0">
            {course.instructor.name.charAt(0)}
          </div>
          <span className="text-xs text-gray-dark font-medium">{course.instructor.name}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 mt-3 text-[11px] text-gray">
          <span className="flex items-center gap-1"><Clock size={11} /> {durationStr}</span>
          <span className="flex items-center gap-1"><Users size={11} /> {course._count?.enrollments || 0}</span>
          {(course.avgRating || 0) > 0 && (
            <span className="flex items-center gap-1 text-star"><Star size={11} fill="currentColor" /> {course.avgRating?.toFixed(1)}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          {course.price === 0 ? (
            <span className="text-sm font-bold text-success">Ücretsiz</span>
          ) : hasDiscount ? (
            <>
              <span className="text-lg font-bold text-purple">₺{course.salePrice!.toLocaleString("tr-TR")}</span>
              <span className="text-xs text-gray line-through">₺{course.price.toLocaleString("tr-TR")}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">₺{course.price.toLocaleString("tr-TR")}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
