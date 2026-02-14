"use client";

import { AuthProvider } from "@/contexts/AuthContext";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
