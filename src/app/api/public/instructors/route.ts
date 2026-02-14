import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const instructors = await prisma.user.findMany({
      where: { role: "instructor", isActive: true },
      select: {
        id: true,
        slug: true,
        name: true,
        avatar: true,
        title: true,
        bio: true,
        socials: true,
        courses: {
          where: { status: "published" },
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            category: { select: { name: true, slug: true } },
            _count: { select: { enrollments: true } },
          },
        },
        _count: { select: { courses: { where: { status: "published" } } } },
      },
    });

    return NextResponse.json({ instructors });
  } catch (error) {
    console.error("[Instructors] Error:", error);
    return NextResponse.json({ instructors: [] });
  }
}
