"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Ahmet Yılmaz", role: "Freelance Web Developer", text: "WordPress kursunu tamamladıktan sonra ilk müşterimi 2 hafta içinde buldum. Eğitim kalitesi gerçekten üst düzey.", rating: 5 },
  { name: "Zeynep Kaya", role: "Dijital Pazarlama Uzmanı", text: "SEO eğitimi sayesinde müşterilerimin organik trafiğini %300 artırdım. Pratik odaklı anlatım çok faydalı.", rating: 5 },
  { name: "Mehmet Demir", role: "E-Ticaret Girişimcisi", text: "Sıfırdan e-ticaret sitemi kurdum ve ilk ayda satış yapmaya başladım. Adım adım anlatım mükemmel.", rating: 5 },
  { name: "Elif Arslan", role: "İçerik Üreticisi", text: "Google Ads eğitimi ile reklam bütçemi çok daha verimli kullanmaya başladım. Kesinlikle tavsiye ederim.", rating: 5 },
  { name: "Can Öztürk", role: "Startup Kurucu", text: "React eğitimi ile kendi SaaS ürünümü geliştirdim. Eğitmenler gerçekten alanında uzman.", rating: 5 },
  { name: "Selin Yıldırım", role: "UX Designer", text: "Tasarım kursları ile portföyümü güçlendirdim. İş tekliflerinde ciddi artış yaşadım.", rating: 5 },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    const speed = 0.5;
    let raf: number;
    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="py-20 overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Öğrencilerimiz Ne Diyor?</h2>
          <p className="text-sm text-gray mt-2">Binlerce Öğrencimizin Deneyimleri</p>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-5 overflow-hidden whitespace-nowrap select-none" style={{ scrollBehavior: "auto" }}>
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="inline-block w-[360px] flex-shrink-0 bg-white border border-border/60 rounded-2xl p-6 whitespace-normal">
            <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map((s) => <Star key={s} size={12} className={s <= t.rating ? "text-star fill-star" : "text-border"} />)}</div>
            <p className="text-[13px] text-gray-dark leading-relaxed">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-border/40">
              <div className="w-9 h-9 rounded-full bg-purple/10 flex items-center justify-center text-purple text-[11px] font-bold">{t.name.charAt(0)}</div>
              <div><p className="text-xs font-semibold text-foreground">{t.name}</p><p className="text-[10px] text-gray">{t.role}</p></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
