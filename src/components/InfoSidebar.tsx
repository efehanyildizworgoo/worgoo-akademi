"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Info, Phone, Shield, FileText, HelpCircle } from "lucide-react";

const links = [
  { href: "/about", label: "Hakkımızda", icon: Info },
  { href: "/contact", label: "İletişim", icon: Phone },
  { href: "/privacy", label: "Gizlilik Politikası", icon: Shield },
  { href: "/terms", label: "Kullanım Koşulları", icon: FileText },
  { href: "/faq", label: "Sık Sorulan Sorular", icon: HelpCircle },
];

export default function InfoSidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-[#1a1545] rounded-2xl p-5 sticky top-28">
      <h3 className="text-sm font-bold text-white mb-4">Sayfalar</h3>
      <nav className="space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                isActive
                  ? "bg-purple text-white font-semibold"
                  : "text-white/50 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <link.icon size={15} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
