import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const courses = await prisma.course.findMany({
      include: {
        instructor: { select: { name: true } },
        category: { select: { name: true } },
        _count: { select: { enrollments: true, reviews: true, sections: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("[AdminCourses] GET:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const { courseId, ...data } = await req.json();
    if (!courseId) return NextResponse.json({ error: "courseId gerekli." }, { status: 400 });

    const course = await prisma.course.update({ where: { id: courseId }, data });
    return NextResponse.json({ course });
  } catch (error) {
    console.error("[AdminCourses] PATCH:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id gerekli." }, { status: 400 });

    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AdminCourses] DELETE:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
