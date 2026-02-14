"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { Menu, X, User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const categories = [
    { name: "WordPress", slug: "wordpress" },
    { name: "Web Tasarım", slug: "web-tasarim" },
    { name: "SEO", slug: "seo" },
    { name: "Meta Ads", slug: "meta-ads" },
    { name: "Google Ads", slug: "google-ads" },
    { name: "AI", slug: "ai" },
    { name: "Sosyal Medya", slug: "sosyal-medya" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = `text-[13px] font-medium transition-colors ${scrolled ? "text-gray-dark hover:text-primary" : "text-white/80 hover:text-white"}`;

  return (
    <nav className={`fixed top-9 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "!top-0 bg-white/95 backdrop-blur-xl shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src={scrolled ? "/worgoo-akademi.svg" : "/worgoo-beyaz-logo.svg"} alt="Worgoo Akademi" width={130} height={28} priority />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            <Link href="/about" className={linkClass}>Hakkımızda</Link>

            {/* Kurslar dropdown */}
            <div className="relative" onMouseEnter={() => setCoursesOpen(true)} onMouseLeave={() => setCoursesOpen(false)}>
              <button className={`${linkClass} flex items-center gap-1`}>
                Kurslar <ChevronDown size={12} className={`transition-transform ${coursesOpen ? "rotate-180" : ""}`} />
              </button>
              {coursesOpen && (
                <div className="absolute top-full left-0 pt-2 animate-fade-in">
                  <div className="bg-white border border-border rounded-xl shadow-lg py-2 min-w-[180px]">
                    {categories.map((cat) => (
                      <Link key={cat.slug} href={`/courses?category=${cat.slug}`} className="block px-4 py-2 text-[13px] text-gray-dark hover:bg-bg hover:text-purple transition-colors">
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/instructors" className={linkClass}>Eğitmenler</Link>
            <Link href="/contact" className={linkClass}>İletişim</Link>
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-2.5">
            {loading ? (
              <div className="w-16 h-8 bg-white/10 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors ${scrolled ? "hover:bg-bg" : "hover:bg-white/10"}`}>
                  <div className="w-7 h-7 rounded-full bg-purple/20 flex items-center justify-center text-purple text-[10px] font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`text-[13px] font-medium ${scrolled ? "text-gray-dark" : "text-white/90"}`}>{user.name.split(" ")[0]}</span>
                  <ChevronDown size={12} className={scrolled ? "text-gray" : "text-white/50"} />
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-border rounded-xl shadow-lg z-20 py-1 animate-fade-in">
                      <Link href={user.role === "admin" ? "/admin" : user.role === "instructor" ? "/instructor" : "/dashboard"} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3.5 py-2 text-[13px] text-gray-dark hover:bg-bg transition-colors">
                        <LayoutDashboard size={13} /> Panel
                      </Link>
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3.5 py-2 text-[13px] text-gray-dark hover:bg-bg transition-colors">
                        <User size={13} /> Kurslarım
                      </Link>
                      <hr className="my-1 border-border" />
                      <button onClick={() => { logout(); setUserMenuOpen(false); }} className="flex items-center gap-2 px-3.5 py-2 text-[13px] text-danger hover:bg-danger/5 transition-colors w-full text-left">
                        <LogOut size={13} /> Çıkış Yap
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className={`text-[13px] font-medium px-3 py-1.5 rounded-lg transition-colors ${scrolled ? "text-gray-dark hover:text-primary" : "text-white/80 hover:text-white"}`}>Giriş Yap</Link>
                <Link href="/register" className="text-[13px] font-semibold text-white bg-purple hover:bg-purple-hover transition-colors px-4 py-2 rounded-lg">Kayıt Ol</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 ${scrolled ? "text-gray-dark" : "text-white"}`}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-dark hover:bg-bg rounded-lg">Hakkımızda</Link>
            <Link href="/courses" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-dark hover:bg-bg rounded-lg">Kurslar</Link>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/courses?category=${cat.slug}`} onClick={() => setMobileOpen(false)} className="block px-6 py-2 text-[13px] text-gray hover:bg-bg rounded-lg">
                {cat.name}
              </Link>
            ))}
            <Link href="/instructors" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-dark hover:bg-bg rounded-lg">Eğitmenler</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-gray-dark hover:bg-bg rounded-lg">İletişim</Link>
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
