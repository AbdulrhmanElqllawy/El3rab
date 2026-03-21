import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Users, BookOpen, ClipboardList, CreditCard, Lock } from 'lucide-react';

const tabs = [
    { id: 'general',  label: 'إعدادات عامة',         icon: Globe },
    { id: 'users',    label: 'إعدادات المستخدمين',   icon: Users },
    { id: 'courses',  label: 'إعدادات الكورسات',     icon: BookOpen },
    { id: 'exams',    label: 'إعدادات الاختبارات',   icon: ClipboardList },
    { id: 'payments', label: 'إعدادات الدفع',        icon: CreditCard },
    { id: 'security', label: 'إعدادات الأمان',       icon: Lock },
];

export default function SettingsView() {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        siteName: 'العراب', lang: 'ar', timezone: 'Asia/Riyadh',
        allowReg: true, emailVerify: true, minPassword: 8,
        twoFactor: false, sessionDuration: 30, bruteProtect: true,
        freeTrialDays: 7, stripeEnabled: true,
    });

    const toggle = (k) => setSettings(s => ({ ...s, [k]: !s[k] }));
    const change = (k, v) => setSettings(s => ({ ...s, [k]: v }));

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">إعدادات الموقع</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إدارة جميع إعدادات المنصة</p>
            </div>

            {/* Tab Bar */}
            <div className="flex flex-wrap gap-1.5 bg-white dark:bg-[#1E293B] p-2 rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm">
                {tabs.map(t => {
                    const Icon = t.icon;
                    const active = activeTab === t.id;
                    return (
                        <button key={t.id} onClick={() => setActiveTab(t.id)}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${active ? 'bg-[#6C4CF1] text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="hidden sm:inline">{t.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Panel */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none p-6 space-y-5"
            >
                {activeTab === 'general' && (
                    <>
                        <SettingRow label="اسم الموقع" hint="يظهر في الرأس والتبويب">
                            <input className="input-style" value={settings.siteName} onChange={e => change('siteName', e.target.value)} />
                        </SettingRow>
                        <SettingRow label="اللغة الافتراضية">
                            <select className="input-style" value={settings.lang} onChange={e => change('lang', e.target.value)}>
                                <option value="ar">العربية</option>
                                <option value="en">English</option>
                            </select>
                        </SettingRow>
                        <SettingRow label="المنطقة الزمنية">
                            <select className="input-style" value={settings.timezone} onChange={e => change('timezone', e.target.value)}>
                                <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
                                <option value="Asia/Kuwait">Asia/Kuwait (GMT+3)</option>
                                <option value="Africa/Cairo">Africa/Cairo (GMT+2)</option>
                            </select>
                        </SettingRow>
                    </>
                )}

                {activeTab === 'users' && (
                    <>
                        <SettingRow label="السماح بالتسجيل" hint="تفعيل أو تعطيل التسجيل الجديد">
                            <Toggle on={settings.allowReg} onToggle={() => toggle('allowReg')} />
                        </SettingRow>
                        <SettingRow label="التحقق بالبريد الإلكتروني">
                            <Toggle on={settings.emailVerify} onToggle={() => toggle('emailVerify')} />
                        </SettingRow>
                        <SettingRow label="الحد الأدنى لكلمة المرور">
                            <input type="number" min={6} max={32} className="input-style w-24" value={settings.minPassword} onChange={e => change('minPassword', Number(e.target.value))} />
                        </SettingRow>
                    </>
                )}

                {activeTab === 'security' && (
                    <>
                        <SettingRow label="المصادقة الثنائية (2FA)" hint="يُلزم المستخدمين بتفعيلها">
                            <Toggle on={settings.twoFactor} onToggle={() => toggle('twoFactor')} />
                        </SettingRow>
                        <SettingRow label="مدة الجلسة (دقيقة)">
                            <input type="number" min={5} className="input-style w-24" value={settings.sessionDuration} onChange={e => change('sessionDuration', Number(e.target.value))} />
                        </SettingRow>
                        <SettingRow label="حماية Brute Force" hint="تحديد محاولات تسجيل الدخول الفاشلة">
                            <Toggle on={settings.bruteProtect} onToggle={() => toggle('bruteProtect')} />
                        </SettingRow>
                    </>
                )}

                {activeTab === 'payments' && (
                    <>
                        <SettingRow label="Stripe مفعّل">
                            <Toggle on={settings.stripeEnabled} onToggle={() => toggle('stripeEnabled')} />
                        </SettingRow>
                        <SettingRow label="أيام التجربة المجانية">
                            <input type="number" min={0} className="input-style w-24" value={settings.freeTrialDays} onChange={e => change('freeTrialDays', Number(e.target.value))} />
                        </SettingRow>
                    </>
                )}

                {(activeTab === 'courses' || activeTab === 'exams') && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-[#6C4CF1]/10 flex items-center justify-center mx-auto mb-3">
                            {activeTab === 'courses' ? <BookOpen className="w-6 h-6 text-[#6C4CF1]" /> : <ClipboardList className="w-6 h-6 text-[#6C4CF1]" />}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">إعدادات {activeTab === 'courses' ? 'الكورسات' : 'الاختبارات'} قيد التطوير</p>
                    </div>
                )}

                <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-[#334155]/50">
                    <button className="flex items-center gap-2 bg-[#6C4CF1] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#5b3ee0] transition-colors shadow-sm">
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
        <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100 dark:border-[#334155]/40 last:border-0">
            <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-[#F1F5F9]">{label}</p>
                {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
            </div>
            {children}
        </div>
    );
}

function Toggle({ on, onToggle }) {
    return (
        <button onClick={onToggle} className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${on ? 'bg-[#6C4CF1]' : 'bg-gray-200 dark:bg-[#334155]'}`}>
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${on ? 'right-0.5' : 'left-0.5'}`} />
        </button>
    );
}

// Shared input style (injected via globals or inline)
const styleEl = typeof document !== 'undefined' && !document.getElementById('input-style-inject') && (() => {
    const s = document.createElement('style');
    s.id = 'input-style-inject';
    s.textContent = '.input-style{background:rgb(249 250 251);border:1px solid #e5e7eb;border-radius:12px;padding:8px 12px;font-size:14px;color:#1e293b;outline:none;width:100%;}.dark .input-style{background:rgba(15,23,42,0.5);border-color:#334155;color:#f1f5f9;}';
    document.head.appendChild(s);
})();