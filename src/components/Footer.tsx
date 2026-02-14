import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image src="/worgoo-beyaz-logo.svg" alt="Worgoo Akademi" width={160} height={36} />
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
              <Link href="/wordpress" className="block text-sm text-white/60 hover:text-white transition-colors">WordPress</Link>
              <Link href="/seo" className="block text-sm text-white/60 hover:text-white transition-colors">SEO</Link>
              <Link href="/web-tasarim" className="block text-sm text-white/60 hover:text-white transition-colors">Web Tasarım</Link>
              <Link href="/meta-ads" className="block text-sm text-white/60 hover:text-white transition-colors">Meta Ads</Link>
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
              <Link href="/contact" className="block text-sm text-white/60 hover:text-white transition-colors mt-1">İletişim Formu →</Link>
            </div>
            {/* Social Media */}
            <div className="flex items-center gap-2.5 mt-5">
              <a href="https://instagram.com/worgoo" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"><Instagram size={14} /></a>
              <a href="https://linkedin.com/company/worgoo" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"><Linkedin size={14} /></a>
              <a href="https://youtube.com/@worgoo" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"><Youtube size={14} /></a>
              <a href="https://twitter.com/worgoo" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"><Twitter size={14} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Worgoo Akademi. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="text-xs text-white/40 hover:text-white/60 transition-colors">SSS</Link>
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">Gizlilik Politikası</Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
