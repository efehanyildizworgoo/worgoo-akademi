import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "E-posta ve şifre gerekli." }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) return NextResponse.json({ error: "Geçersiz giriş bilgileri." }, { status: 401 });

    const valid = await verifyPassword(password, user.password);
    if (!valid) return NextResponse.json({ error: "Geçersiz giriş bilgileri." }, { status: 401 });

    const token = generateToken(user.id, user.role);
    const res = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar: user.avatar },
    });
    res.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/" });
    return res;
  } catch (error) {
    console.error("[Login] Error:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
