import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-purple mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-2">Sayfa Bulunamadı</h2>
        <p className="text-sm text-gray max-w-md mx-auto mb-8">
          Aradığınız sayfa mevcut değil, taşınmış veya kaldırılmış olabilir.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="bg-purple text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-purple-hover transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/courses" className="text-sm font-medium text-gray hover:text-foreground transition-colors">
            Kursları Keşfet →
          </Link>
        </div>
      </div>
    </div>
  );
}
