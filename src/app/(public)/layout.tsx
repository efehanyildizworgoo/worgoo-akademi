"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TopBar />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </AuthProvider>
  );
}
