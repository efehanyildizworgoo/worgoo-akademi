"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import InfoSidebar from "@/components/InfoSidebar";

const faqCategories = [
  {
    title: "Genel",
    items: [
      { q: "Worgoo Akademi nedir?", a: "Worgoo Akademi, dijital pazarlama, web geliştirme, SEO ve tasarım alanlarında uzman eğitmenlerden online kurslar sunan bir eğitim platformudur." },
      { q: "Kurslara nasıl erişebilirim?", a: "Ücretsiz kayıt olduktan sonra istediğiniz kursu satın alarak hemen erişim sağlayabilirsiniz. Satın aldığınız kurslara ömür boyu erişim hakkınız bulunmaktadır." },
      { q: "Mobil cihazlardan erişim sağlayabilir miyim?", a: "Evet, platformumuz tüm cihazlarda (bilgisayar, tablet, telefon) sorunsuz çalışacak şekilde tasarlanmıştır." },
    ],
  },
  {
    title: "Kurslar & İçerik",
    items: [
      { q: "Kurslar ne kadar sürüyor?", a: "Kurs süreleri içeriğe göre değişiklik göstermektedir. Her kursun detay sayfasında toplam süre bilgisi yer almaktadır. Ortalama kurs süresi 10-30 saat arasındadır." },
      { q: "Kurslara ömür boyu erişim var mı?", a: "Evet, satın aldığınız tüm kurslara ömür boyu erişim hakkınız bulunmaktadır. Kurs güncellemelerinden de ücretsiz yararlanabilirsiniz." },
      { q: "Sertifika veriliyor mu?", a: "Evet, kursları başarıyla tamamladığınızda dijital sertifika alabilirsiniz. Sertifikalarınız profilinizden indirilebilir." },
      { q: "Kurs içerikleri güncelleniyor mu?", a: "Evet, eğitmenlerimiz kurs içeriklerini düzenli olarak güncellemektedir. Güncellemelerden ücretsiz yararlanabilirsiniz." },
      { q: "Kurslarda pratik uygulama var mı?", a: "Evet, kurslarımız pratik odaklıdır. Gerçek projeler üzerinden uygulamalı eğitim alırsınız." },
    ],
  },
  {
    title: "Ödeme & İade",
    items: [
      { q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?", a: "Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Tüm ödemeler güvenli altyapı üzerinden gerçekleştirilir." },
      { q: "İade politikanız nedir?", a: "Satın alma tarihinden itibaren 14 gün içinde, kursun %20'sinden fazlasını tamamlamamış olmanız koşuluyla iade talep edebilirsiniz." },
      { q: "Taksit seçeneği var mı?", a: "Evet, kredi kartı ile yapılan ödemelerde taksit seçeneği sunulmaktadır. Taksit seçenekleri ödeme sayfasında görüntülenir." },
      { q: "Fatura alabilir miyim?", a: "Evet, tüm satın alımlarınız için otomatik olarak e-fatura düzenlenmektedir." },
    ],
  },
  {
    title: "Eğitmenler & Destek",
    items: [
      { q: "Eğitmenlerle iletişim kurabilir miyim?", a: "Evet, her kursun altında soru-cevap bölümü bulunmaktadır. Eğitmenler sorularınızı en kısa sürede yanıtlamaktadır." },
      { q: "Teknik bir sorun yaşarsam ne yapmalıyım?", a: "Teknik sorunlar için info@worgoo.com adresine e-posta gönderebilir veya iletişim formunu kullanabilirsiniz. Destek ekibimiz en kısa sürede size dönüş yapacaktır." },
      { q: "Kurumsal eğitim hizmeti var mı?", a: "Evet, şirketler ve kurumlar için özel eğitim paketleri sunmaktayız. Detaylı bilgi için bizimle iletişime geçebilirsiniz." },
    ],
  },
];

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-[#110e2e] pt-36 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(121,93,237,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(121,93,237,0.15),transparent_70%)]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1]">Sık Sorulan Sorular</h1>
          <p className="text-[15px] text-white/45 mt-4 max-w-lg mx-auto leading-relaxed">
            Merak ettiklerinize hızlıca yanıt bulun
          </p>
        </div>
      </section>

      {/* ═══ FAQ CONTENT ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-64 flex-shrink-0">
            <InfoSidebar />
          </aside>
          <div className="flex-1 min-w-0 space-y-12">
            {faqCategories.map((cat, ci) => (
              <div key={ci}>
                <h2 className="text-lg font-bold text-foreground mb-4">{cat.title}</h2>
                <div className="space-y-3">
                  {cat.items.map((faq, fi) => {
                    const key = `${ci}-${fi}`;
                    return (
                      <div key={key} className="bg-white border border-border/50 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full flex items-center justify-between px-6 py-4 text-left"
                        >
                          <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                          <ChevronDown size={16} className={`text-gray flex-shrink-0 transition-transform duration-200 ${openItems[key] ? "rotate-180" : ""}`} />
                        </button>
                        {openItems[key] && (
                          <div className="px-6 pb-4 -mt-1">
                            <p className="text-sm text-gray leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="text-center pt-8 border-t border-border/50">
              <p className="text-sm text-gray">Sorunuzun yanıtını bulamadınız mı?</p>
              <Link href="/contact" className="inline-flex items-center gap-2 mt-3 bg-purple text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-purple-hover transition-colors">
                Bize Yazın
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
