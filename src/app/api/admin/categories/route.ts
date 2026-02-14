import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const categories = await prisma.category.findMany({ include: { _count: { select: { courses: true } } }, orderBy: { order: "asc" } });
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("[AdminCategories] GET:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const { name, slug, description, icon, order } = await req.json();
    if (!name || !slug) return NextResponse.json({ error: "İsim ve slug gerekli." }, { status: 400 });

    const cat = await prisma.category.create({ data: { name, slug, description: description || "", icon: icon || "", order: order || 0 } });
    return NextResponse.json({ category: cat }, { status: 201 });
  } catch (error) {
    console.error("[AdminCategories] POST:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const { categoryId, ...data } = await req.json();
    const cat = await prisma.category.update({ where: { id: categoryId }, data });
    return NextResponse.json({ category: cat });
  } catch (error) {
    console.error("[AdminCategories] PATCH:", error);
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

    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AdminCategories] DELETE:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
