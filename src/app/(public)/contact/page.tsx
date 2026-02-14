"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, ChevronDown, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const faqs = [
  { q: "Kurslar ne kadar sürüyor?", a: "Kurs süreleri içeriğe göre değişiklik göstermektedir. Her kursun detay sayfasında toplam süre bilgisi yer almaktadır. Ortalama kurs süresi 10-30 saat arasındadır." },
  { q: "Kurslara ömür boyu erişim var mı?", a: "Evet, satın aldığınız tüm kurslara ömür boyu erişim hakkınız bulunmaktadır. Kurs güncellemelerinden de ücretsiz yararlanabilirsiniz." },
  { q: "Sertifika veriliyor mu?", a: "Evet, kursları başarıyla tamamladığınızda dijital sertifika alabilirsiniz. Sertifikalarınız profilinizden indirilebilir." },
  { q: "İade politikanız nedir?", a: "Satın alma tarihinden itibaren 14 gün içinde, kursun %20'sinden fazlasını tamamlamamış olmanız koşuluyla iade talep edebilirsiniz." },
  { q: "Eğitmenlerle iletişim kurabilir miyim?", a: "Evet, her kursun altında soru-cevap bölümü bulunmaktadır. Eğitmenler sorularınızı en kısa sürede yanıtlamaktadır." },
  { q: "Kurumsal eğitim hizmeti var mı?", a: "Evet, şirketler ve kurumlar için özel eğitim paketleri sunmaktayız. Detaylı bilgi için bizimle iletişime geçebilirsiniz." },
];

const socials = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/worgoo", color: "hover:text-pink-500" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/worgoo", color: "hover:text-blue-600" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@worgoo", color: "hover:text-red-500" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/worgoo", color: "hover:text-sky-500" },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send — replace with actual API call
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1]">İletişim</h1>
          <p className="text-[15px] text-white/45 mt-4 max-w-lg mx-auto leading-relaxed">
            Sorularınız, önerileriniz veya işbirliği talepleriniz için bizimle iletişime geçin.
          </p>
        </div>
      </section>

      {/* ═══ CONTACT INFO + FORM ═══ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left — Info + Socials */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">İletişim Bilgileri</h2>
                <div className="space-y-5">
                  <a href="mailto:info@worgoo.com" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple/20 transition-colors">
                      <Mail size={16} className="text-purple" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">E-posta</p>
                      <p className="text-sm text-gray mt-0.5">info@worgoo.com</p>
                    </div>
                  </a>
                  <a href="tel:+902121234567" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple/20 transition-colors">
                      <Phone size={16} className="text-purple" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Telefon</p>
                      <p className="text-sm text-gray mt-0.5">+90 (212) 123 45 67</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-purple" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Adres</p>
                      <p className="text-sm text-gray mt-0.5">İstanbul, Türkiye</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-4">Sosyal Medya</h3>
                <div className="flex items-center gap-3">
                  {socials.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-xl bg-bg border border-border/50 flex items-center justify-center text-gray transition-colors ${s.color}`} title={s.name}>
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-border/50 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-1">Bize Yazın</h2>
                <p className="text-sm text-gray mb-6">En kısa sürede size dönüş yapacağız.</p>

                {sent && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
                    Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">Ad Soyad</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-sm text-foreground placeholder:text-gray-light focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/20"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">E-posta</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-sm text-foreground placeholder:text-gray-light focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/20"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Konu</label>
                    <input
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-sm text-foreground placeholder:text-gray-light focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/20"
                      placeholder="Mesajınızın konusu"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Mesaj</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-sm text-foreground placeholder:text-gray-light focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/20 resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex items-center gap-2 bg-purple text-white font-semibold px-6 py-3 rounded-xl hover:bg-purple-hover transition-colors text-sm disabled:opacity-50"
                  >
                    {sending ? "Gönderiliyor..." : <><Send size={14} /> Mesaj Gönder</>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 bg-bg border-t border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">Sık Sorulan Sorular</h2>
            <p className="text-sm text-gray mt-2">Merak ettiklerinize hızlıca yanıt bulun</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-border/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                  <ChevronDown size={16} className={`text-gray flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 -mt-1">
                    <p className="text-sm text-gray leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
