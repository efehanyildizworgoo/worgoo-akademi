import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    settings.forEach((s) => { map[s.key] = s.value; });
    return NextResponse.json({ settings: map });
  } catch (error) {
    console.error("[AdminSettings] GET:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const { settings } = await req.json();
    if (!settings || typeof settings !== "object") return NextResponse.json({ error: "settings objesi gerekli." }, { status: 400 });

    for (const [key, value] of Object.entries(settings)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AdminSettings] POST:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
