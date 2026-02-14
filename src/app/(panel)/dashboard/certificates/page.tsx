"use client";

import { Award } from "lucide-react";

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Sertifikalarım</h1><p className="text-sm text-gray mt-1">Tamamladığınız kursların sertifikaları</p></div>
      <div className="bg-white border border-border rounded-2xl p-8 text-center text-gray text-sm">
        <Award size={32} className="mx-auto mb-3 opacity-30" />
        <p>Henüz sertifikanız yok. Bir kursu tamamladığınızda sertifikanız burada görünecek.</p>
      </div>
    </div>
  );
}
