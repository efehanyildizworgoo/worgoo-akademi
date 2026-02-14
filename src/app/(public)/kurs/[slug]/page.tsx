import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CourseClient from "./CourseClient";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const course = await prisma.course.findFirst({
    where: { slug, status: "published" },
    select: { id: true },
  });

  if (!course) notFound();

  return <CourseClient />;
}
