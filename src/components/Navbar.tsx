"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { Menu, X, User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo-akademi.svg" alt="Worgoo Akademi" width={180} height={30} priority />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/courses" className="text-sm font-medium text-gray-dark hover:text-primary transition-colors">Kurslar</Link>
            <Link href="/instructors" className="text-sm font-medium text-gray-dark hover:text-primary transition-colors">Eğitmenler</Link>
            <Link href="/about" className="text-sm font-medium text-gray-dark hover:text-primary transition-colors">Hakkımızda</Link>
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-9 bg-border/50 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg transition-colors">
                  <div className="w-8 h-8 rounded-full bg-purple/10 flex items-center justify-center text-purple text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-dark">{user.name.split(" ")[0]}</span>
                  <ChevronDown size={14} className="text-gray" />
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-border rounded-xl shadow-lg z-20 py-1 animate-fade-in">
                      <Link href={user.role === "admin" ? "/admin" : user.role === "instructor" ? "/instructor" : "/dashboard"} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-dark hover:bg-bg transition-colors">
                        <LayoutDashboard size={14} /> Panel
                      </Link>
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-dark hover:bg-bg transition-colors">
                        <User size={14} /> Kurslarım
                      </Link>
                      <hr className="my-1 border-border" />
                      <button onClick={() => { logout(); setUserMenuOpen(false); }} className="flex items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-danger/5 transition-colors w-full text-left">
                        <LogOut size={14} /> Çıkış Yap
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-dark hover:text-primary transition-colors px-3 py-2">Giriş Yap</Link>
                <Link href="/register" className="text-sm font-medium text-white bg-purple hover:bg-purple-hover transition-colors px-5 py-2.5 rounded-xl">Kayıt Ol</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-dark">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            <Link href="/courses" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-dark hover:bg-bg rounded-lg">Kurslar</Link>
            <Link href="/instructors" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-dark hover:bg-bg rounded-lg">Eğitmenler</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-dark hover:bg-bg rounded-lg">Hakkımızda</Link>
            <hr className="border-border" />
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-dark hover:bg-bg rounded-lg">Kurslarım</Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left px-3 py-2.5 text-sm font-medium text-danger hover:bg-danger/5 rounded-lg">Çıkış Yap</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-dark hover:bg-bg rounded-lg">Giriş Yap</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-white bg-purple hover:bg-purple-hover rounded-xl text-center">Kayıt Ol</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
