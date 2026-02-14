import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";

    const where: any = { status: "published" };
    if (category) where.category = { slug: category };
    if (level) where.level = level;
    if (search) where.title = { contains: search, mode: "insensitive" };

    let orderBy: any = { createdAt: "desc" };
    if (sort === "popular") orderBy = { enrollments: { _count: "desc" } };
    if (sort === "price-low") orderBy = { price: "asc" };
    if (sort === "price-high") orderBy = { price: "desc" };

    const [courses, categories, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          instructor: { select: { name: true, avatar: true } },
          category: { select: { name: true, slug: true } },
          _count: { select: { enrollments: true, reviews: true } },
        },
        orderBy,
      }),
      prisma.category.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({ courses, categories, total });
  } catch (error) {
    console.error("[Courses] Error:", error);
    return NextResponse.json({ courses: [], categories: [], total: 0 });
  }
}
