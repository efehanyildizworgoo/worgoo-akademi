"use client";

const messages = [
  "🎓 Yeni kurslar eklendi! Hemen keşfet →",
  "🔥 Tüm kurslarda %30 indirim fırsatı!",
  "⚡ Ücretsiz deneme dersleri ile başla →",
  "🚀 500+ öğrenci Worgoo Akademi'yi tercih etti!",
];

export default function TopBar() {
  return (
    <div className="bg-purple text-white overflow-hidden h-8 flex items-center relative z-[60]">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
        {[...messages, ...messages, ...messages].map((msg, i) => (
          <span key={i} className="text-[11px] font-medium tracking-wide mx-8">{msg}</span>
        ))}
      </div>
    </div>
  );
}
