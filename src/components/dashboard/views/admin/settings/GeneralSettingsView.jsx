import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe } from 'lucide-react';

export default function GeneralSettingsView() {
    const [settings, setSettings] = useState({
        siteName: 'العراب',
        lang: 'ar',
        timezone: 'Asia/Riyadh',
    });

    const change = (k, v) => setSettings(s => ({ ...s, [k]: v }));

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">الإعدادات العامة</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إدارة معلومات الموقع الأساسية</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm p-6 space-y-5"
            >
                <SettingRow label="اسم الموقع" hint="يظهر في الرأس والتبويب">
                    <input 
                        className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:border-[#6C4CF1] outline-none" 
                        value={settings.siteName} 
                        onChange={e => change('siteName', e.target.value)} 
                    />
                </SettingRow>

                <SettingRow label="اللغة الافتراضية" hint={undefined}>
                    <select 
                        className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:border-[#6C4CF1] outline-none" 
                        value={settings.lang} 
                        onChange={e => change('lang', e.target.value)}
                    >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                    </select>
                </SettingRow>

                <SettingRow label="المنطقة الزمنية" hint={undefined}>
                    <select 
                        className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:border-[#6C4CF1] outline-none" 
                        value={settings.timezone} 
                        onChange={e => change('timezone', e.target.value)}
                    >
                        <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
                        <option value="Asia/Kuwait">Asia/Kuwait (GMT+3)</option>
                        <option value="Africa/Cairo">Africa/Cairo (GMT+2)</option>
                    </select>
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
