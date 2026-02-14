"use client";

const messages = [
  "🎓 Yeni kurslar eklendi! Hemen keşfet →",
  "🔥 Tüm kurslarda %30 indirim fırsatı!",
  "⚡ Ücretsiz deneme dersleri ile başla →",
  "🚀 500+ öğrenci Worgoo Akademi'yi tercih etti!",
];

export default function TopBar() {
  const strip = messages.map((msg, i) => (
    <span key={i} className="text-[11px] font-medium tracking-wide px-10">{msg}</span>
  ));

  return (
    <div className="bg-purple text-white overflow-hidden h-8 flex items-center relative z-[60]">
      <div className="flex animate-marquee">
        <div className="flex shrink-0 items-center">{strip}</div>
        <div className="flex shrink-0 items-center">{strip}</div>
      </div>
    </div>
  );
}
