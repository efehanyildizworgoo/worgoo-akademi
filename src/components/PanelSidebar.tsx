"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import {
  LayoutDashboard, BookOpen, Users, CreditCard,
  Settings, LogOut, Menu, X, ChevronLeft, BarChart3, PlusCircle,
  FolderOpen, Layers,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
  { label: "Kurslar", href: "/admin/courses", icon: <BookOpen size={18} /> },
  { label: "Kategoriler", href: "/admin/categories", icon: <FolderOpen size={18} /> },
  { label: "Kullanıcılar", href: "/admin/users", icon: <Users size={18} /> },
  { label: "Ödemeler", href: "/admin/payments", icon: <CreditCard size={18} /> },
  { label: "Ayarlar", href: "/admin/settings", icon: <Settings size={18} /> },
];

const instructorNav: NavItem[] = [
  { label: "Dashboard", href: "/instructor", icon: <LayoutDashboard size={18} /> },
  { label: "Kurslarım", href: "/instructor/courses", icon: <BookOpen size={18} /> },
  { label: "Yeni Kurs", href: "/instructor/courses/new", icon: <PlusCircle size={18} /> },
  { label: "İstatistikler", href: "/instructor/stats", icon: <BarChart3 size={18} /> },
];

const studentNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Kurslarım", href: "/dashboard/courses", icon: <BookOpen size={18} /> },
  { label: "Sertifikalarım", href: "/dashboard/certificates", icon: <Layers size={18} /> },
];

export default function PanelSidebar({ role }: { role: "admin" | "instructor" | "student" }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = role === "admin" ? adminNav : role === "instructor" ? instructorNav : studentNav;

  const isActive = (href: string) => {
    if (href === "/admin" || href === "/instructor" || href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  const sidebar = (
    <div className={`flex flex-col h-full bg-white border-r border-border transition-all ${collapsed ? "w-[68px]" : "w-64"}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-border">
        {!collapsed && (
          <Link href="/" className="flex items-center">
            <Image src="/worgoo-akademi.svg" alt="Worgoo Akademi" width={140} height={32} />
          </Link>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-bg text-gray transition-colors hidden md:block">
          <ChevronLeft size={16} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-purple/10 text-purple"
                : "text-gray-dark hover:bg-bg hover:text-foreground"
            }`}
            title={collapsed ? item.label : undefined}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-border">
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-purple/10 flex items-center justify-center text-purple text-xs font-bold flex-shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-[10px] text-gray truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button onClick={logout} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-danger hover:bg-danger/5 transition-colors ${collapsed ? "justify-center" : ""}`} title="Çıkış Yap">
          <LogOut size={18} />
          {!collapsed && <span>Çıkış Yap</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setMobileOpen(true)} className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-border rounded-xl shadow-sm">
        <Menu size={18} className="text-gray-dark" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full w-64 animate-fade-in">{sidebar}</div>
        </div>
      )}

      {/* Desktop */}
      <div className="hidden md:block h-screen sticky top-0">{sidebar}</div>
    </>
  );
}
