import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "instructor" && user.role !== "admin")) return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const courses = await prisma.course.findMany({
      where: { instructorId: user.id },
      include: {
        category: { select: { name: true } },
        _count: { select: { enrollments: true, reviews: true, sections: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("[InstructorCourses] GET:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "instructor" && user.role !== "admin")) return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const body = await req.json();
    const { title, slug, description, shortDesc, thumbnail, previewVideo, price, salePrice, level, categoryId } = body;

    if (!title || !slug) return NextResponse.json({ error: "Başlık ve slug gerekli." }, { status: 400 });

    const existing = await prisma.course.findUnique({ where: { slug } });
    if (existing) return NextResponse.json({ error: "Bu slug zaten kullanılıyor." }, { status: 409 });

    const course = await prisma.course.create({
      data: {
        title, slug, description: description || "", shortDesc: shortDesc || "",
        thumbnail: thumbnail || "", previewVideo: previewVideo || "",
        price: price || 0, salePrice: salePrice || null, level: level || "beginner",
        categoryId: categoryId || null, instructorId: user.id, status: "draft",
      },
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error("[InstructorCourses] POST:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "instructor" && user.role !== "admin")) return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const { courseId, ...data } = await req.json();
    if (!courseId) return NextResponse.json({ error: "courseId gerekli." }, { status: 400 });

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course || (course.instructorId !== user.id && user.role !== "admin")) return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const updated = await prisma.course.update({ where: { id: courseId }, data });
    return NextResponse.json({ course: updated });
  } catch (error) {
    console.error("[InstructorCourses] PATCH:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
