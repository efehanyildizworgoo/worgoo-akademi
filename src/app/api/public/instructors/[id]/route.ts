import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const instructor = await prisma.user.findFirst({
      where: { id, role: "instructor", isActive: true },
      select: {
        id: true,
        name: true,
        avatar: true,
        title: true,
        bio: true,
        socials: true,
        gallery: true,
        createdAt: true,
        courses: {
          where: { status: "published" },
          include: {
            category: { select: { name: true, slug: true } },
            _count: { select: { enrollments: true, reviews: true } },
          },
        },
        _count: { select: { courses: { where: { status: "published" } } } },
      },
    });

    if (!instructor) {
      return NextResponse.json({ error: "Instructor not found" }, { status: 404 });
    }

    // Calculate total students across all courses
    const totalStudents = instructor.courses.reduce((sum, c) => sum + (c._count?.enrollments || 0), 0);

    // Fetch reviews from instructor's courses
    const courseIds = instructor.courses.map((c) => c.id);
    const reviews = courseIds.length > 0
      ? await prisma.review.findMany({
          where: { courseId: { in: courseIds }, isVisible: true },
          include: {
            user: { select: { name: true, avatar: true } },
            course: { select: { title: true, slug: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 20,
        })
      : [];

    // Average rating
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0";

    return NextResponse.json({ instructor, totalStudents, reviews, avgRating, totalReviews: reviews.length });
  } catch (error) {
    console.error("[Instructor Detail] Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
