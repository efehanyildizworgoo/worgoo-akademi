import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const [totalCourses, publishedCourses, totalStudents, totalInstructors, totalEnrollments, totalRevenue, recentPayments, recentEnrollments] = await Promise.all([
      prisma.course.count(),
      prisma.course.count({ where: { status: "published" } }),
      prisma.user.count({ where: { role: "student" } }),
      prisma.user.count({ where: { role: "instructor" } }),
      prisma.enrollment.count(),
      prisma.payment.aggregate({ where: { status: "paid" }, _sum: { amount: true } }),
      prisma.payment.findMany({ include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.enrollment.findMany({ include: { user: { select: { name: true } }, course: { select: { title: true } } }, orderBy: { enrolledAt: "desc" }, take: 5 }),
    ]);

    return NextResponse.json({
      stats: { totalCourses, publishedCourses, totalStudents, totalInstructors, totalEnrollments, totalRevenue: totalRevenue._sum.amount || 0 },
      recentPayments,
      recentEnrollments,
    });
  } catch (error) {
    console.error("[AdminDashboard] Error:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
