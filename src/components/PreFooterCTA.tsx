import Link from "next/link";

export default function PreFooterCTA() {
  return (
    <section className="bg-gradient-to-br from-primary via-[#1a1050] to-purple/80 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Öğrenmeye Bugün Başla</h2>
        <p className="text-sm text-white/45 mt-4 max-w-lg mx-auto leading-relaxed">Hemen ücretsiz hesap oluştur ve eğitim içeriklerine erişim sağla. Binlerce öğrenci ile birlikte öğren.</p>
        <div className="flex items-center justify-center gap-4 mt-9">
          <Link href="/register" className="bg-white text-primary font-semibold px-8 py-3.5 rounded-lg hover:bg-white/90 transition-colors text-sm">Ücretsiz Kayıt Ol</Link>
          <Link href="/courses" className="text-white/60 hover:text-white font-medium px-7 py-3.5 rounded-lg border border-white/15 hover:border-white/30 transition-colors text-sm">Kursları İncele</Link>
        </div>
      </div>
    </section>
  );
}
