import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save } from 'lucide-react';

export default function AddQuestionView() {
    const [form, setForm] = useState({
        question: '',
        options: ['', '', '', ''],
        correct: 0,
        section: '',
        difficulty: '',
        explanation: ''
    });

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">إضافة سؤال جديد</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إنشاء سؤال اختيار من متعدد جديد</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6 space-y-5"
            >
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">القسم</label>
                        <select className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none">
                            <option value="">اختر القسم</option>
                            <option value="التناظر">التناظر اللفظي</option>
                            <option value="إكمال">إكمال الجمل</option>
                            <option value="خطأ">الخطأ السياقي</option>
                            <option value="استيعاب">استيعاب المقروء</option>
                            <option value="مفردة">المفردة الشاذة</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">الصعوبة</label>
                        <select className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none">
                            <option value="">اختر الصعوبة</option>
                            <option value="سهل">سهل</option>
                            <option value="متوسط">متوسط</option>
                            <option value="صعب">صعب</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">نص السؤال</label>
                    <textarea
                        className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none resize-none h-20"
                        placeholder="اكتب نص السؤال..."
                    />
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 block">الخيارات</label>
                    <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-2">
                                <input type="radio" name="correct" className="accent-[#6C4CF1]" />
                                <input
                                    className="flex-1 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none"
                                    placeholder={`الخيار ${i}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">الشرح</label>
                    <textarea
                        className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none resize-none h-16"
                        placeholder="شرح الإجابة الصحيحة..."
                    />
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-[#334155]/50 flex gap-2">
                    <button className="flex items-center gap-2 bg-[#6C4CF1] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#5b3ee0] transition-colors">
                        <Save className="w-4 h-4" />
                        حفظ السؤال
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
