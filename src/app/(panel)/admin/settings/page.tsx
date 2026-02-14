"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Loader2, CreditCard, Building2, Shield, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then((d) => { setSettings(d.settings || {}); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const update = (key: string, value: string) => setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ settings }) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-purple" /></div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Ayarlar</h1><p className="text-sm text-gray mt-1">Ödeme ve platform ayarları</p></div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-xl hover:bg-purple-hover transition-colors disabled:opacity-50">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? "Kaydedildi ✓" : "Kaydet"}
        </button>
      </div>

      {/* PayTR Settings */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple/10"><CreditCard size={18} className="text-purple" /></div>
          <div>
            <h2 className="text-sm font-bold text-foreground">PayTR Sanal Pos Ayarları</h2>
            <p className="text-[10px] text-gray">PayTR API bilgilerinizi girin. Bu bilgiler ödeme işlemleri için kullanılacaktır.</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray font-medium">Merchant ID</label>
              <input value={settings.paytr_merchant_id || ""} onChange={(e) => update("paytr_merchant_id", e.target.value)} placeholder="PayTR Merchant ID" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
            </div>
            <div>
              <label className="text-xs text-gray font-medium">Merchant Key</label>
              <input type="password" value={settings.paytr_merchant_key || ""} onChange={(e) => update("paytr_merchant_key", e.target.value)} placeholder="••••••••" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
            </div>
            <div>
              <label className="text-xs text-gray font-medium">Merchant Salt</label>
              <input type="password" value={settings.paytr_merchant_salt || ""} onChange={(e) => update("paytr_merchant_salt", e.target.value)} placeholder="••••••••" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
            </div>
            <div>
              <label className="text-xs text-gray font-medium">Test Modu</label>
              <select value={settings.paytr_test_mode || "1"} onChange={(e) => update("paytr_test_mode", e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple">
                <option value="1">Test Modu (Açık)</option>
                <option value="0">Canlı Mod</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 bg-warning/5 border border-warning/20 rounded-xl">
            <Shield size={14} className="text-warning flex-shrink-0" />
            <p className="text-[11px] text-warning">PayTR API bilgileri güvenli şekilde saklanır ve sadece ödeme işlemleri sırasında kullanılır.</p>
          </div>
        </div>
      </div>

      {/* Transfer/Havale Settings */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <div className="p-2 rounded-xl bg-success/10"><Building2 size={18} className="text-success" /></div>
          <div>
            <h2 className="text-sm font-bold text-foreground">Havale/EFT Bilgileri</h2>
            <p className="text-[10px] text-gray">Havale ile ödeme yapmak isteyen kullanıcılara gösterilecek banka bilgileri</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs text-gray font-medium">Havale Aktif</label>
            <select value={settings.transfer_enabled || "1"} onChange={(e) => update("transfer_enabled", e.target.value)} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple">
              <option value="1">Aktif</option>
              <option value="0">Pasif</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray font-medium">Banka Adı</label>
              <input value={settings.transfer_bank_name || ""} onChange={(e) => update("transfer_bank_name", e.target.value)} placeholder="Ziraat Bankası" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
            </div>
            <div>
              <label className="text-xs text-gray font-medium">Hesap Sahibi</label>
              <input value={settings.transfer_account_holder || ""} onChange={(e) => update("transfer_account_holder", e.target.value)} placeholder="Worgoo Dijital A.Ş." className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
            </div>
            <div>
              <label className="text-xs text-gray font-medium">IBAN</label>
              <input value={settings.transfer_iban || ""} onChange={(e) => update("transfer_iban", e.target.value)} placeholder="TR00 0000 0000 0000 0000 0000 00" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple font-mono" />
            </div>
            <div>
              <label className="text-xs text-gray font-medium">Şube Kodu</label>
              <input value={settings.transfer_branch_code || ""} onChange={(e) => update("transfer_branch_code", e.target.value)} placeholder="1234" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
            </div>
            <div>
              <label className="text-xs text-gray font-medium">Hesap No</label>
              <input value={settings.transfer_account_no || ""} onChange={(e) => update("transfer_account_no", e.target.value)} placeholder="12345678" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray font-medium">Havale Açıklaması (kullanıcıya gösterilecek)</label>
            <textarea value={settings.transfer_description || ""} onChange={(e) => update("transfer_description", e.target.value)} placeholder="Havale açıklamasına sipariş numaranızı yazmayı unutmayın." rows={3} className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple resize-none" />
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10"><Globe size={18} className="text-primary" /></div>
          <div>
            <h2 className="text-sm font-bold text-foreground">Genel Ayarlar</h2>
            <p className="text-[10px] text-gray">Platform genel ayarları</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray font-medium">Site Başlığı</label>
              <input value={settings.site_title || ""} onChange={(e) => update("site_title", e.target.value)} placeholder="Worgoo Akademi" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
            </div>
            <div>
              <label className="text-xs text-gray font-medium">İletişim E-posta</label>
              <input value={settings.contact_email || ""} onChange={(e) => update("contact_email", e.target.value)} placeholder="info@worgoo.com" className="w-full mt-1 px-3 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-purple" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
