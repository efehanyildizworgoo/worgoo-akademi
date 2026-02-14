import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CategoryClient from "./CategoryClient";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const category = await prisma.category.findFirst({
    where: { slug, isActive: true },
    select: { id: true },
  });

  if (!category) notFound();

  return <CategoryClient />;
}
