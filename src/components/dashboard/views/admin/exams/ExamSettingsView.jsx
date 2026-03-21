import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Clock, CheckCircle, ToggleRight, AlertCircle, Save, RotateCcw } from 'lucide-react';

export default function ExamSettingsView() {
    const [hasChanges, setHasChanges] = useState(false);
    const [settings, setSettings] = useState({
        defaultDuration: '120',
        defaultQuestions: '50',
        minPassScore: '60',
        randomizeQuestions: true,
        randomizeOptions: true,
        negativeMarking: false,
        negativeMarkValue: '0.25',
        hideCorrectAnswers: true,
        showScore: true,
        allowReview: true,
        allowPrint: false,
        timeLimitWarning: true,
        warningTime: '5',
        autoSubmit: true,
        multipleAttempts: false,
        maxAttempts: '1',
    });

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
        setHasChanges(true);
    };

    const handleSave = () => {
        setHasChanges(false);
    };

    const handleReset = () => {
        setSettings({
            defaultDuration: '120',
            defaultQuestions: '50',
            minPassScore: '60',
            randomizeQuestions: true,
            randomizeOptions: true,
            negativeMarking: false,
            negativeMarkValue: '0.25',
            hideCorrectAnswers: true,
            showScore: true,
            allowReview: true,
            allowPrint: false,
            timeLimitWarning: true,
            warningTime: '5',
            autoSubmit: true,
            multipleAttempts: false,
            maxAttempts: '1',
        });
        setHasChanges(false);
    };

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-[#6C4CF1]" />
                <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">إعدادات الاختبارات</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">تكوين الإعدادات الافتراضية والخيارات العامة للاختبارات</p>
                </div>
            </div>

            {/* Settings Form */}
            <form className="space-y-6">
                {/* Basic Settings */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6 space-y-4">
                    <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9] text-lg mb-4">الإعدادات الأساسية</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                <Clock className="w-4 h-4 inline mr-1" />
                                المدة الافتراضية (دقيقة)
                            </label>
                            <input
                                type="number" value={settings.defaultDuration} onChange={(e) => handleChange('defaultDuration', e.target.value)}
                                className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">عدد الأسئلة الافتراضي</label>
                            <input
                                type="number" value={settings.defaultQuestions} onChange={(e) => handleChange('defaultQuestions', e.target.value)}
                                className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                <CheckCircle className="w-4 h-4 inline mr-1" />
                                الحد الأدنى لدرجة النجاح (%)
                            </label>
                            <input
                                type="number" value={settings.minPassScore} onChange={(e) => handleChange('minPassScore', e.target.value)} min="0" max="100"
                                className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Randomization Settings */}
                <motion.div initial={{ opacity: 0, delay: 0.1 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6 space-y-4">
                    <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9] text-lg mb-4">إعدادات العشوائية</h3>

                    <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition-colors">
                            <input
                                type="checkbox" checked={settings.randomizeQuestions} onChange={(e) => handleChange('randomizeQuestions', e.target.checked)}
                                className="w-4 h-4 accent-[#6C4CF1]"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">عشوائية الأسئلة</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">تغيير ترتيب الأسئلة لكل طالب</p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition-colors">
                            <input
                                type="checkbox" checked={settings.randomizeOptions} onChange={(e) => handleChange('randomizeOptions', e.target.checked)}
                                className="w-4 h-4 accent-[#6C4CF1]"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">عشوائية الخيارات</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">تغيير ترتيب الخيارات في كل سؤال</p>
                            </div>
                        </label>
                    </div>
                </motion.div>

                {/* Scoring Settings */}
                <motion.div initial={{ opacity: 0, delay: 0.2 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6 space-y-4">
                    <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9] text-lg mb-4">إعدادات التصحيح والدرجات</h3>

                    <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition-colors">
                            <input
                                type="checkbox" checked={settings.negativeMarking} onChange={(e) => handleChange('negativeMarking', e.target.checked)}
                                className="w-4 h-4 accent-red-500"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">الخصم على الإجابات الخاطئة</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">خصم درجات على الإجابات غير الصحيحة</p>
                            </div>
                        </label>

                        {settings.negativeMarking && (
                            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg p-3">
                                <label className="block text-xs font-semibold text-red-700 dark:text-red-300 mb-2">
                                    قيمة الخصم per wrong answer
                                </label>
                                <input
                                    type="number" step="0.01" value={settings.negativeMarkValue} onChange={(e) => handleChange('negativeMarkValue', e.target.value)}
                                    className="w-full bg-white dark:bg-[#1E293B] border border-red-200 dark:border-red-500/20 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-red-500"
                                />
                            </div>
                        )}

                        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition-colors">
                            <input
                                type="checkbox" checked={settings.hideCorrectAnswers} onChange={(e) => handleChange('hideCorrectAnswers', e.target.checked)}
                                className="w-4 h-4 accent-[#6C4CF1]"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">إخفاء الإجابات الصحيحة</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">عدم إظهار الإجابات الصحيحة للطالب</p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition-colors">
                            <input
                                type="checkbox" checked={settings.showScore} onChange={(e) => handleChange('showScore', e.target.checked)}
                                className="w-4 h-4 accent-[#6C4CF1]"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">عرض الدرجات</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">إظهار درجات الطالب بعد انتهائه</p>
                            </div>
                        </label>
                    </div>
                </motion.div>

                {/* User Permissions */}
                <motion.div initial={{ opacity: 0, delay: 0.3 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6 space-y-4">
                    <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9] text-lg mb-4">صلاحيات الطالب</h3>

                    <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition-colors">
                            <input
                                type="checkbox" checked={settings.allowReview} onChange={(e) => handleChange('allowReview', e.target.checked)}
                                className="w-4 h-4 accent-[#6C4CF1]"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">السماح بمراجعة الإجابات</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">السماح للطالب بمراجعة إجاباته</p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition-colors">
                            <input
                                type="checkbox" checked={settings.allowPrint} onChange={(e) => handleChange('allowPrint', e.target.checked)}
                                className="w-4 h-4 accent-[#6C4CF1]"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">السماح بالطباعة</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">السماح للطالب بطباعة الاختبار</p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition-colors">
                            <input
                                type="checkbox" checked={settings.autoSubmit} onChange={(e) => handleChange('autoSubmit', e.target.checked)}
                                className="w-4 h-4 accent-[#6C4CF1]"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">الإرسال التلقائي عند انتهاء الوقت</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">إرسال الاختبار تلقائياً عند انتهاء المدة</p>
                            </div>
                        </label>
                    </div>
                </motion.div>

                {/* Attempt Settings */}
                <motion.div initial={{ opacity: 0, delay: 0.4 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6 space-y-4">
                    <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9] text-lg mb-4">الحد من المحاولات</h3>

                    <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition-colors">
                        <input
                            type="checkbox" checked={settings.multipleAttempts} onChange={(e) => handleChange('multipleAttempts', e.target.checked)}
                            className="w-4 h-4 accent-[#6C4CF1]"
                        />
                        <div className="flex-1">
                            <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">السماح بمحاولات متعددة</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">السماح للطالب بإعادة محاولة الاختبار</p>
                        </div>
                    </label>

                    {settings.multipleAttempts && (
                        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-3">
                            <label className="block text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
                                عدد المحاولات المسموح بها
                            </label>
                            <input
                                type="number" value={settings.maxAttempts} onChange={(e) => handleChange('maxAttempts', e.target.value)}
                                className="w-full bg-white dark:bg-[#1E293B] border border-blue-200 dark:border-blue-500/20 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-blue-500"
                            />
                        </div>
                    )}
                </motion.div>

                {/* Time Warnings */}
                <motion.div initial={{ opacity: 0, delay: 0.5 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6 space-y-4">
                    <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9] text-lg mb-4">تنبيهات الوقت</h3>

                    <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition-colors">
                        <input
                            type="checkbox" checked={settings.timeLimitWarning} onChange={(e) => handleChange('timeLimitWarning', e.target.checked)}
                            className="w-4 h-4 accent-[#6C4CF1]"
                        />
                        <div className="flex-1">
                            <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">تنبيه انتهاء الوقت</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">تنبيه الطالب قبل انتهاء الوقت</p>
                        </div>
                    </label>

                    {settings.timeLimitWarning && (
                        <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-lg p-3">
                            <label className="block text-xs font-semibold text-orange-700 dark:text-orange-300 mb-2">
                                وقت التنبيه (دقائق قبل انتهاء الوقت)
                            </label>
                            <input
                                type="number" value={settings.warningTime} onChange={(e) => handleChange('warningTime', e.target.value)}
                                className="w-full bg-white dark:bg-[#1E293B] border border-orange-200 dark:border-orange-500/20 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-orange-500"
                            />
                        </div>
                    )}
                </motion.div>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-end">
                    <button
                        type="button" onClick={handleReset} disabled={!hasChanges}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#334155] rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        إعادة تعيين
                    </button>
                    <button
                        type="button" onClick={handleSave} disabled={!hasChanges}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#6C4CF1] rounded-lg hover:bg-[#5b3ee0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        حفظ التغييرات
                    </button>
                </div>
            </form>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-semibold text-blue-700 dark:text-blue-300 text-sm mb-1">ملاحظة مهمة</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">هذه الإعدادات تنطبق على جميع الاختبارات الجديدة. الاختبارات القائمة تحافظ على إعداداتها الخاصة.</p>
                </div>
            </div>
        </div>
    );
}
