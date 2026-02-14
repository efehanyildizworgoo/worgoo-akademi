import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Oturum yok." }, { status: 401 });

    const [enrollments, totalCompleted, recentProgress] = await Promise.all([
      prisma.enrollment.findMany({
        where: { userId: user.id },
        include: {
          course: { select: { id: true, title: true, slug: true, thumbnail: true, totalDuration: true, instructor: { select: { name: true } }, _count: { select: { sections: true } } } },
        },
        orderBy: { enrolledAt: "desc" },
      }),
      prisma.lessonProgress.count({ where: { userId: user.id, isCompleted: true } }),
      prisma.lessonProgress.findMany({
        where: { userId: user.id, isCompleted: true },
        include: { lesson: { select: { title: true, section: { select: { course: { select: { title: true } } } } } } },
        orderBy: { completedAt: "desc" },
        take: 5,
      }),
    ]);

    return NextResponse.json({ enrollments, totalCompleted, recentProgress });
  } catch (error) {
    console.error("[StudentDashboard] Error:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
