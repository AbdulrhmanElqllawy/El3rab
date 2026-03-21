import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, ClipboardList } from 'lucide-react';

export default function ExamSettingsView() {
    const [settings, setSettings] = useState({
        defaultDuration: 60,
        passingScore: 60,
        shuffleQuestions: true,
        allowReview: true,
        showScoreImmediately: false,
    });

    const toggle = (k) => setSettings(s => ({ ...s, [k]: !s[k] }));
    const change = (k, v) => setSettings(s => ({ ...s, [k]: v }));

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">إعدادات الاختبارات</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إدارة سياسات وقواعد الاختبارات</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm p-6 space-y-5"
            >
                <SettingRow label="مدة الاختبار الافتراضية (دقيقة)" hint="الحد الزمني الافتراضي للاختبارات الجديدة">
                    <input 
                        type="number" 
                        min={15} 
                        className="w-24 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:border-[#6C4CF1] outline-none" 
                        value={settings.defaultDuration} 
                        onChange={e => change('defaultDuration', Number(e.target.value))} 
                    />
                </SettingRow>

                <SettingRow label="درجة النجاح الافتراضية (%)" hint="النسبة المئوية المطلوبة للنجاح">
                    <input 
                        type="number" 
                        min={0} 
                        max={100} 
                        className="w-24 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:border-[#6C4CF1] outline-none" 
                        value={settings.passingScore} 
                        onChange={e => change('passingScore', Number(e.target.value))} 
                    />
                </SettingRow>

                <SettingRow label="خلط الأسئلة" hint="عرض الأسئلة بترتيب عشوائي">
                    <Toggle on={settings.shuffleQuestions} onToggle={() => toggle('shuffleQuestions')} />
                </SettingRow>

                <SettingRow label="السماح بمراجعة الإجابات" hint="السماح للطلاب بمراجعة إجاباتهم">
                    <Toggle on={settings.allowReview} onToggle={() => toggle('allowReview')} />
                </SettingRow>

                <SettingRow label="عرض النتيجة فوراً" hint="إظهار النتيجة للطالب بعد الانتهاء مباشرة">
                    <Toggle on={settings.showScoreImmediately} onToggle={() => toggle('showScoreImmediately')} />
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
