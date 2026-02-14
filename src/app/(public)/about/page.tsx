"use client";

import { GraduationCap, Target, Users, Award, Zap, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-purple/80 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Hakkımızda</h1>
          <p className="text-sm text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
            Worgoo Akademi, dijital dünyada kariyer yapmak isteyenler için uzman eğitmenler tarafından hazırlanmış online eğitim platformudur.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Target size={24} />, title: "Misyonumuz", desc: "Herkesin dijital becerilere erişebileceği, pratik odaklı ve uygun fiyatlı eğitimler sunmak." },
            { icon: <Zap size={24} />, title: "Yaklaşımımız", desc: "Teoriden çok pratiğe odaklanıyoruz. Her kurs gerçek projelerle destekleniyor." },
            { icon: <Heart size={24} />, title: "Değerlerimiz", desc: "Kaliteli içerik, sürekli güncelleme ve öğrenci memnuniyeti en öncelikli değerlerimiz." },
          ].map((item, i) => (
            <div key={i} className="text-center p-8 bg-white border border-border rounded-2xl hover:border-purple/20 hover:shadow-md transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-purple/10 rounded-2xl text-purple mb-4">{item.icon}</div>
              <h3 className="text-base font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-gray mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">Neden Worgoo Akademi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <GraduationCap size={20} />, title: "Uzman Eğitmenler", desc: "Sektörde aktif çalışan profesyoneller" },
              { icon: <Award size={20} />, title: "Sertifika", desc: "Kurs tamamlama sertifikası" },
              { icon: <Users size={20} />, title: "Topluluk", desc: "Aktif öğrenci topluluğu" },
              { icon: <Zap size={20} />, title: "Güncel İçerik", desc: "Sürekli güncellenen kurs içerikleri" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-5 rounded-xl hover:bg-bg transition-colors">
                <div className="w-10 h-10 bg-purple/10 rounded-xl flex items-center justify-center text-purple flex-shrink-0">{item.icon}</div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                  <p className="text-xs text-gray mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
