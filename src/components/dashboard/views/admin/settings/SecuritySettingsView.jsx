import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Lock } from 'lucide-react';

export default function SecuritySettingsView() {
    const [settings, setSettings] = useState({
        twoFactor: false,
        sessionDuration: 30,
        bruteProtect: true,
        sslEnabled: true,
    });

    const toggle = (k) => setSettings(s => ({ ...s, [k]: !s[k] }));
    const change = (k, v) => setSettings(s => ({ ...s, [k]: v }));

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">إعدادات الأمان</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إدارة معايير الأمان وسياسات الحماية</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm p-6 space-y-5"
            >
                <SettingRow label="المصادقة الثنائية (2FA)" hint="يُلزم المستخدمين بتفعيل المصادقة الثنائية">
                    <Toggle on={settings.twoFactor} onToggle={() => toggle('twoFactor')} />
                </SettingRow>

                <SettingRow label="مدة الجلسة (دقيقة)" hint="الوقت بعده تنتهي الجلسة تلقائياً">
                    <input 
                        type="number" 
                        min={5} 
                        max={480} 
                        className="w-24 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:border-[#6C4CF1] outline-none" 
                        value={settings.sessionDuration} 
                        onChange={e => change('sessionDuration', Number(e.target.value))} 
                    />
                </SettingRow>

                <SettingRow label="حماية Brute Force" hint="تحديد محاولات تسجيل الدخول الفاشلة">
                    <Toggle on={settings.bruteProtect} onToggle={() => toggle('bruteProtect')} />
                </SettingRow>

                <SettingRow label="SSL/TLS مفعل" hint="استخدام اتصالات آمنة HTTPS">
                    <Toggle on={settings.sslEnabled} onToggle={() => toggle('sslEnabled')} />
                </SettingRow>

                <div className="pt-4 border-t border-gray-200 dark:border-[#334155]/50 flex gap-2">
                    <button className="flex items-center gap-2 bg-[#6C4CF1] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#5b3ee0] transition-colors">
                        <Save className="w-4 h-4" />
                        حفظ الإعدادات
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

function SettingRow({ label, hint, children }) {
    return (
        <div className="space-y-2">
            <label className="block">
                <span className="text-sm font-semibold text-gray-900 dark:text-[#F1F5F9]">{label}</span>
                {hint && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{hint}</p>}
            </label>
            {children}
        </div>
    );
}

function Toggle({ on, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                on ? 'bg-[#6C4CF1]' : 'bg-gray-300 dark:bg-[#334155]'
            }`}
        >
            <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    on ? 'translate-x-7' : 'translate-x-1'
                }`}
            />
        </button>
    );
}
