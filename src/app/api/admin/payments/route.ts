import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const payments = await prisma.payment.findMany({
      include: {
        user: { select: { name: true, email: true } },
        enrollment: { include: { course: { select: { title: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error("[AdminPayments] GET:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Yetki yok." }, { status: 403 });

    const { paymentId, status } = await req.json();
    if (!paymentId || !status) return NextResponse.json({ error: "paymentId ve status gerekli." }, { status: 400 });

    const payment = await prisma.payment.update({ where: { id: paymentId }, data: { status } });

    // If payment confirmed, activate enrollment
    if (status === "paid" && payment.enrollmentId) {
      await prisma.enrollment.update({ where: { id: payment.enrollmentId }, data: { status: "active" } });
    }

    return NextResponse.json({ payment });
  } catch (error) {
    console.error("[AdminPayments] PATCH:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
