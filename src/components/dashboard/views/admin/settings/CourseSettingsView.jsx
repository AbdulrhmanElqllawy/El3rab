import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, BookOpen } from 'lucide-react';

export default function CourseSettingsView() {
    const [settings, setSettings] = useState({
        defaultDuration: 30,
        maxStudents: 50,
        requireCertificate: true,
        autoGenCert: true,
    });

    const toggle = (k) => setSettings(s => ({ ...s, [k]: !s[k] }));
    const change = (k, v) => setSettings(s => ({ ...s, [k]: v }));

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">إعدادات الكورسات</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إدارة سياسات وإعدادات الدورات التعليمية</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm p-6 space-y-5"
            >
                <SettingRow label="مدة الكورس الافتراضية (أسابيع)" hint="المدة الافتراضية للكورس الجديد">
                    <input 
                        type="number" 
                        min={1} 
                        className="w-24 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:border-[#6C4CF1] outline-none" 
                        value={settings.defaultDuration} 
                        onChange={e => change('defaultDuration', Number(e.target.value))} 
                    />
                </SettingRow>

                <SettingRow label="الحد الأقصى للطلاب" hint="أقصى عدد طلاب في الكورس الواحد">
                    <input 
                        type="number" 
                        min={5} 
                        className="w-24 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:border-[#6C4CF1] outline-none" 
                        value={settings.maxStudents} 
                        onChange={e => change('maxStudents', Number(e.target.value))} 
                    />
                </SettingRow>

                <SettingRow label="الشهادات مطلوبة" hint="إلزام الطلاب بالحصول على شهادات">
                    <Toggle on={settings.requireCertificate} onToggle={() => toggle('requireCertificate')} />
                </SettingRow>

                <SettingRow label="إنشاء الشهادات تلقائياً" hint="إصدار الشهادات تلقائياً عند الإكمال">
                    <Toggle on={settings.autoGenCert} onToggle={() => toggle('autoGenCert')} />
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
