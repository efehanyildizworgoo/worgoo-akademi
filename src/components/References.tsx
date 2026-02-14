const references = [
  { name: "Netgsm", logo: "https://www.worgoo.com/wp-content/uploads/2025/02/worgoo-ref-netgsm-1.svg" },
  { name: "SK Hukuk", logo: "https://www.worgoo.com/wp-content/uploads/2025/04/sk-hukuk.png.webp" },
  { name: "Kaya Sanat Akademi", logo: "https://www.worgoo.com/wp-content/uploads/2025/02/kaya-sanat-ref.png" },
  { name: "Çilek Havuz", logo: "https://www.cilekhavuz.com.tr/assets/ch/img/logo.svg" },
  { name: "Patibul", logo: "https://www.worgoo.com/wp-content/uploads/2025/02/patibul-ref.png" },
  { name: "Sante+", logo: "https://www.worgoo.com/wp-content/uploads/2025/02/sante-plus.png" },
  { name: "Polente Natural", logo: "https://www.worgoo.com/wp-content/uploads/2025/04/polente-naturel.png.webp" },
  { name: "Myline Moda", logo: "https://www.worgoo.com/wp-content/uploads/2025/02/myline-mode-ref.png" },
];

export default function References() {
  return (
    <section className="py-16 bg-white border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-gray font-medium mb-10">Müşterilerimiz & İş Ortaklarımız</p>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex animate-ref-scroll">
            {[...references, ...references].map((r, i) => (
              <div key={i} className="flex items-center justify-center shrink-0 mx-8 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300" style={{ width: "180px" }}>
                <img src={r.logo} alt={r.name} className="h-12 max-w-[150px] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
