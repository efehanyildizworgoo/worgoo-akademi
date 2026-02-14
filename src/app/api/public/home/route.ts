import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [featuredCourses, totalCourses, totalStudents, instructors] = await Promise.all([
      prisma.course.findMany({
        where: { status: "published" },
        include: {
          instructor: { select: { name: true, avatar: true } },
          _count: { select: { enrollments: true, reviews: true } },
        },
        orderBy: { isFeatured: "desc" },
        take: 6,
      }),
      prisma.course.count({ where: { status: "published" } }),
      prisma.user.count({ where: { role: "student" } }),
      prisma.user.findMany({
        where: { role: "instructor", isActive: true },
        select: { id: true, name: true, avatar: true, title: true, _count: { select: { courses: true } } },
      }),
    ]);

    const totalHours = await prisma.course.aggregate({ where: { status: "published" }, _sum: { totalDuration: true } });

    return NextResponse.json({
      featuredCourses,
      stats: {
        totalCourses,
        totalStudents,
        totalInstructors: instructors.length,
        totalHours: Math.floor((totalHours._sum.totalDuration || 0) / 60),
      },
      instructors,
    });
  } catch (error) {
    console.error("[Home] Error:", error);
    return NextResponse.json({ featuredCourses: [], stats: {}, instructors: [] });
  }
}
