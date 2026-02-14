import InfoSidebar from "@/components/InfoSidebar";

export default function TermsPage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-[#110e2e] pt-36 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(121,93,237,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(121,93,237,0.15),transparent_70%)]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1]">Kullanım Koşulları</h1>
          <p className="text-[15px] text-white/45 mt-4 max-w-lg mx-auto leading-relaxed">
            Platformumuzu kullanmadan önce lütfen koşullarımızı okuyun.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-64 flex-shrink-0">
            <InfoSidebar />
          </aside>
          <div className="flex-1 min-w-0">
            <div className="prose prose-sm max-w-none text-gray leading-relaxed space-y-8">
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">1. Genel Hükümler</h2>
                <p>Bu kullanım koşulları, Worgoo Akademi platformunu (&quot;Platform&quot;) kullanan tüm kullanıcılar için geçerlidir. Platforma kayıt olarak veya platformu kullanarak bu koşulları kabul etmiş sayılırsınız.</p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">2. Hesap Oluşturma</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Kayıt sırasında doğru ve güncel bilgiler vermeniz gerekmektedir.</li>
                  <li>Hesap bilgilerinizin güvenliğinden siz sorumlusunuz.</li>
                  <li>Her kullanıcı yalnızca bir hesap oluşturabilir.</li>
                  <li>18 yaşından küçük kullanıcılar, veli/vasi onayı ile kayıt olabilir.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">3. Kurs Satın Alma ve Erişim</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Satın alınan kurslara ömür boyu erişim hakkı tanınır.</li>
                  <li>Kurs içerikleri kişisel kullanım içindir ve üçüncü kişilerle paylaşılamaz.</li>
                  <li>Kurs içeriklerinin kopyalanması, kaydedilmesi veya dağıtılması yasaktır.</li>
                  <li>Platform, kurs içeriklerini güncelleme veya kaldırma hakkını saklı tutar.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">4. Ödeme Koşulları</h2>
                <p>Tüm ödemeler Türk Lirası (TL) üzerinden yapılır. Ödeme işlemleri güvenli ödeme altyapısı üzerinden gerçekleştirilir. Fiyatlar vergiler dahil olarak gösterilir. Kampanya ve indirimler belirli süreler için geçerlidir.</p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">5. İade Politikası</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Satın alma tarihinden itibaren 14 gün içinde iade talep edilebilir.</li>
                  <li>Kursun %20&apos;sinden fazlası tamamlanmışsa iade yapılamaz.</li>
                  <li>İade talepleri info@worgoo.com adresine e-posta ile iletilmelidir.</li>
                  <li>Onaylanan iadeler 10 iş günü içinde gerçekleştirilir.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">6. Fikri Mülkiyet Hakları</h2>
                <p>Platform üzerindeki tüm içerikler (videolar, metinler, görseller, tasarımlar) Worgoo Akademi&apos;nin fikri mülkiyetindedir. İçeriklerin izinsiz kullanımı, kopyalanması veya dağıtılması yasal işlem başlatılmasına neden olabilir.</p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">7. Kullanıcı Yükümlülükleri</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Platformu yasalara uygun şekilde kullanmak</li>
                  <li>Diğer kullanıcıların haklarına saygı göstermek</li>
                  <li>Spam, zararlı yazılım veya uygunsuz içerik paylaşmamak</li>
                  <li>Hesap bilgilerini üçüncü kişilerle paylaşmamak</li>
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">8. Sorumluluk Sınırlaması</h2>
                <p>Platform, eğitim içeriklerinin doğruluğu konusunda azami özeni göstermekle birlikte, içeriklerin kullanımından doğabilecek doğrudan veya dolaylı zararlardan sorumlu tutulamaz. Eğitim içerikleri bilgilendirme amaçlıdır.</p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">9. Değişiklikler</h2>
                <p>Worgoo Akademi, bu kullanım koşullarını önceden bildirimde bulunmaksızın güncelleme hakkını saklı tutar. Güncellemeler yayınlandığı tarihte yürürlüğe girer. Platformu kullanmaya devam etmeniz, güncellenmiş koşulları kabul ettiğiniz anlamına gelir.</p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">10. İletişim</h2>
                <p>Kullanım koşulları hakkında sorularınız için <a href="mailto:info@worgoo.com" className="text-purple hover:underline">info@worgoo.com</a> adresinden bizimle iletişime geçebilirsiniz.</p>
              </section>
              <p className="text-xs text-gray-light pt-4 border-t border-border/50">Son güncelleme: Şubat 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
