import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password || !name) return NextResponse.json({ error: "Tüm alanlar gerekli." }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Bu e-posta zaten kayıtlı." }, { status: 409 });

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashed, name, role: "student" },
    });

    const token = generateToken(user.id, user.role);
    const res = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    }, { status: 201 });
    res.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/" });
    return res;
  } catch (error) {
    console.error("[Register] Error:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
