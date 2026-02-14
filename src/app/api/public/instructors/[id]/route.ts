import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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

    return NextResponse.json({ instructor, totalStudents });
  } catch (error) {
    console.error("[Instructor Detail] Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
