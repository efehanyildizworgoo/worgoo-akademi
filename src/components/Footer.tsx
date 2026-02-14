import Link from "next/link";
import { GraduationCap, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-purple rounded-xl flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <span className="text-lg font-bold">Worgoo</span>
                <span className="text-lg font-bold text-purple ml-0.5">Akademi</span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Uzman eğitmenlerden online kurslar. WordPress, SEO, dijital pazarlama ve daha fazlası.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Platform</h4>
            <div className="space-y-2.5">
              <Link href="/courses" className="block text-sm text-white/60 hover:text-white transition-colors">Kurslar</Link>
              <Link href="/instructors" className="block text-sm text-white/60 hover:text-white transition-colors">Eğitmenler</Link>
              <Link href="/about" className="block text-sm text-white/60 hover:text-white transition-colors">Hakkımızda</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Kategoriler</h4>
            <div className="space-y-2.5">
              <Link href="/courses?category=wordpress" className="block text-sm text-white/60 hover:text-white transition-colors">WordPress</Link>
              <Link href="/courses?category=seo" className="block text-sm text-white/60 hover:text-white transition-colors">SEO</Link>
              <Link href="/courses?category=dijital-pazarlama" className="block text-sm text-white/60 hover:text-white transition-colors">Dijital Pazarlama</Link>
              <Link href="/courses?category=tasarim" className="block text-sm text-white/60 hover:text-white transition-colors">Tasarım</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">İletişim</h4>
            <div className="space-y-2.5">
              <a href="mailto:info@worgoo.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Mail size={14} /> info@worgoo.com
              </a>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={14} /> İstanbul, Türkiye
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Worgoo Akademi. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">Gizlilik Politikası</Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
