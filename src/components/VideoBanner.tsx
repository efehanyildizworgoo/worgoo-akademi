"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, X } from "lucide-react";

export default function VideoBanner() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-5765/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#110e2e]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(121,93,237,0.12),transparent_60%)]" />

          <div className="relative z-10 text-center px-4 py-24 max-w-3xl mx-auto">
            <button onClick={() => setVideoOpen(true)} className="mx-auto mb-10 w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center hover:bg-purple/30 hover:border-purple/50 hover:scale-110 transition-all group">
              <Play size={32} className="text-white ml-1 group-hover:text-purple transition-colors" fill="currentColor" />
            </button>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Eğitim Yolculuğuna<br />Hemen Başla</h2>
            <p className="text-[15px] text-white/45 mt-5 max-w-lg mx-auto leading-relaxed">Uzman eğitmenlerimizin hazırladığı kurslarla dijital becerilerini geliştir. İlk adımı bugün at.</p>
            <div className="flex items-center justify-center gap-4 mt-10">
              <Link href="/courses" className="bg-purple text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-purple-hover transition-colors text-sm">
                Kursları İncele
              </Link>
              <Link href="/register" className="text-white/60 hover:text-white font-medium px-7 py-3.5 rounded-lg border border-white/15 hover:border-white/30 transition-colors text-sm">
                Ücretsiz Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </section>

      {videoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm" onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVideoOpen(false)} className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"><X size={16} /></button>
            <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">Video yakında eklenecek</div>
          </div>
        </div>
      )}
    </>
  );
}
