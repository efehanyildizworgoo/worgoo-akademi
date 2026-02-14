import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        instructor: { select: { id: true, name: true, avatar: true, title: true, bio: true, _count: { select: { courses: true } } } },
        category: { select: { name: true, slug: true } },
        sections: {
          orderBy: { order: "asc" },
          include: {
            lessons: { orderBy: { order: "asc" }, select: { id: true, title: true, duration: true, isFree: true, type: true } },
          },
        },
        reviews: {
          where: { isVisible: true },
          include: { user: { select: { name: true, avatar: true } } },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        _count: { select: { enrollments: true, reviews: true } },
      },
    });

    if (!course || course.status !== "published") {
      return NextResponse.json({ error: "Kurs bulunamadı." }, { status: 404 });
    }

    const avgRating = await prisma.review.aggregate({ where: { courseId: course.id, isVisible: true }, _avg: { rating: true } });
    const totalLessons = course.sections.reduce((sum, s) => sum + s.lessons.length, 0);

    return NextResponse.json({
      course: { ...course, avgRating: avgRating._avg.rating || 0, totalLessons },
    });
  } catch (error) {
    console.error("[CourseDetail] Error:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
