"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, Mail, Lock, User, Loader2, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (password.length < 6) { setError("Şifre en az 6 karakter olmalı."); return; }
    setLoading(true);
    setError("");
    const result = await register(name, email, password);
    if (result.error) setError(result.error);
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-2xl mb-4">
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Kayıt Ol</h1>
          <p className="text-sm text-gray mt-2">Ücretsiz hesap oluşturun ve öğrenmeye başlayın</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          {error && (
            <div className="mb-4 px-4 py-3 bg-danger/5 border border-danger/20 rounded-xl text-sm text-danger">{error}</div>
          )}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-dark mb-1.5 block">Ad Soyad</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad Soyad" className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl text-sm text-foreground placeholder:text-gray-light focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/20" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-dark mb-1.5 block">E-posta</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@email.com" className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl text-sm text-foreground placeholder:text-gray-light focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/20" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-dark mb-1.5 block">Şifre</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray" />
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="En az 6 karakter" className="w-full pl-10 pr-12 py-3 bg-bg border border-border rounded-xl text-sm text-foreground placeholder:text-gray-light focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple/20" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray hover:text-gray-dark">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full mt-6 bg-purple text-white font-semibold py-3 rounded-xl hover:bg-purple-hover transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            Kayıt Ol
          </button>
        </form>

        <p className="text-center text-sm text-gray mt-6">
          Zaten hesabınız var mı?{" "}
          <Link href="/login" className="text-purple font-medium hover:underline">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}
