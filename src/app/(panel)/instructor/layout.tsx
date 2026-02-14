"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PanelSidebar from "@/components/PanelSidebar";
import { Loader2 } from "lucide-react";

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || (user.role !== "instructor" && user.role !== "admin"))) router.push("/login");
  }, [user, loading, router]);

  if (loading) return <div className="flex items-center justify-center h-screen"><Loader2 size={28} className="animate-spin text-purple" /></div>;
  if (!user || (user.role !== "instructor" && user.role !== "admin")) return null;

  return (
    <div className="flex min-h-screen bg-bg">
      <PanelSidebar role="instructor" />
      <main className="flex-1 p-6 md:p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
