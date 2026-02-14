import InfoSidebar from "@/components/InfoSidebar";

export default function PrivacyPage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-[#110e2e] pt-36 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(121,93,237,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(121,93,237,0.15),transparent_70%)]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1]">Gizlilik Politikası</h1>
          <p className="text-[15px] text-white/45 mt-4 max-w-lg mx-auto leading-relaxed">
            Kişisel verilerinizin korunması bizim için önemlidir.
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
                <h2 className="text-lg font-bold text-foreground mb-3">1. Genel Bilgi</h2>
                <p>Worgoo Akademi olarak, platformumuzu kullanan tüm kullanıcılarımızın kişisel verilerinin korunmasına büyük önem vermekteyiz. Bu gizlilik politikası, hangi verilerin toplandığını, nasıl kullanıldığını ve nasıl korunduğunu açıklamaktadır.</p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">2. Toplanan Veriler</h2>
                <p>Platformumuzu kullanırken aşağıdaki veriler toplanabilir:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Ad, soyad ve e-posta adresi</li>
                  <li>Ödeme bilgileri (kredi kartı bilgileri üçüncü taraf ödeme sağlayıcıları tarafından işlenir)</li>
                  <li>Kurs ilerleme ve tamamlama verileri</li>
                  <li>IP adresi ve tarayıcı bilgileri</li>
                  <li>Çerez (cookie) verileri</li>
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">3. Verilerin Kullanım Amacı</h2>
                <p>Toplanan veriler aşağıdaki amaçlarla kullanılmaktadır:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Hesap oluşturma ve yönetimi</li>
                  <li>Kurs erişimi ve ilerleme takibi</li>
                  <li>Ödeme işlemlerinin gerçekleştirilmesi</li>
                  <li>Müşteri desteği sağlanması</li>
                  <li>Platform iyileştirmeleri ve analiz</li>
                  <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">4. Verilerin Paylaşımı</h2>
                <p>Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz. Ödeme işlemleri için güvenilir ödeme sağlayıcıları (PayTR vb.) kullanılmaktadır. Bu sağlayıcılar kendi gizlilik politikalarına tabidir.</p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">5. Çerezler (Cookies)</h2>
                <p>Platformumuz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. Çerezler, oturum yönetimi, tercih hatırlama ve analiz amaçlı kullanılır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.</p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">6. Veri Güvenliği</h2>
                <p>Verileriniz SSL şifreleme ile korunmaktadır. Sunucularımız güvenli veri merkezlerinde barındırılmakta ve düzenli güvenlik güncellemeleri yapılmaktadır. Şifreleriniz hash algoritmaları ile saklanmaktadır.</p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">7. Kullanıcı Hakları</h2>
                <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                  <li>Verilerin düzeltilmesini veya silinmesini isteme</li>
                  <li>İşlemenin kısıtlanmasını talep etme</li>
                  <li>Verilerin aktarılmasını talep etme</li>
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-bold text-foreground mb-3">8. İletişim</h2>
                <p>Gizlilik politikamız hakkında sorularınız için <a href="mailto:info@worgoo.com" className="text-purple hover:underline">info@worgoo.com</a> adresinden bizimle iletişime geçebilirsiniz.</p>
              </section>
              <p className="text-xs text-gray-light pt-4 border-t border-border/50">Son güncelleme: Şubat 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
