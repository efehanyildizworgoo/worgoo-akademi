"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function InstructorRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    // Fetch instructor to get slug, then redirect
    fetch(`/api/public/instructors/${id}`)
      .then((r) => r.json())
      .then((d) => {
        const slug = d.instructor?.slug;
        if (slug) {
          router.replace(`/egitmen/${slug}`);
        } else {
          router.replace("/instructors");
        }
      })
      .catch(() => router.replace("/instructors"));
  }, [id, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 size={28} className="animate-spin text-purple" />
    </div>
  );
}
