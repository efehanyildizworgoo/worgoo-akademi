import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hashPassword } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true, avatar: true, title: true, _count: { select: { enrollments: true, courses: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("[AdminUsers] GET:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const { email, password, name, role, title } = await req.json();
    if (!email || !password || !name) return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Bu e-posta zaten kayıtlı." }, { status: 409 });

    const hashed = await hashPassword(password);
    const newUser = await prisma.user.create({ data: { email, password: hashed, name, role: role || "student", title: title || "" } });
    return NextResponse.json({ user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role } }, { status: 201 });
  } catch (error) {
    console.error("[AdminUsers] POST:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const { userId, password, ...data } = await req.json();
    if (!userId) return NextResponse.json({ error: "userId gerekli." }, { status: 400 });

    if (password) data.password = await hashPassword(password);
    const updated = await prisma.user.update({ where: { id: userId }, data });
    return NextResponse.json({ user: { id: updated.id, email: updated.email, name: updated.name, role: updated.role } });
  } catch (error) {
    console.error("[AdminUsers] PATCH:", error);
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

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AdminUsers] DELETE:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
