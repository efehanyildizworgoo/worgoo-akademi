import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import InstructorClient from "./InstructorClient";

export default async function InstructorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const instructor = await prisma.user.findFirst({
    where: { role: "instructor", isActive: true, OR: [{ slug }, { id: slug }] },
    select: { id: true },
  });

  if (!instructor) notFound();

  return <InstructorClient />;
}
