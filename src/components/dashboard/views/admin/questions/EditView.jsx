import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

const mockQuestion = {
    id: 1,
    question: 'كلمة "فصيح" تعني:',
    options: ['سليم لغوياً', 'عالي الجودة', 'نبيل الأصل', 'قديم جداً'],
    correct: 0,
    section: 'المفردة الشاذة',
    difficulty: 'سهل',
    explanation: 'فصيح يعني الكلام السليم لغوياً الخالي من الأخطاء، وغالباً ما يُستخدم لوصف اللغة العربية الفصحى.'
};

export default function EditQuestionView() {
    const [form, setForm] = useState(mockQuestion);

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">تعديل السؤال</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">تعديل تفاصيل السؤال وخياراته</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6 space-y-5"
            >
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">القسم</label>
                        <select className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none" value={form.section}>
                            <option value="المفردة الشاذة">المفردة الشاذة</option>
                            <option value="التناظر اللفظي">التناظر اللفظي</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">الصعوبة</label>
                        <select className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none" value={form.difficulty}>
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
                        value={form.question}
                    />
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 block">الخيارات</label>
                    <div className="grid grid-cols-2 gap-3">
                        {form.options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <input type="radio" name="correct" checked={form.correct === i} className="accent-[#6C4CF1]" />
                                <input
                                    className="flex-1 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none"
                                    value={opt}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">الشرح</label>
                    <textarea
                        className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none resize-none h-16"
                        value={form.explanation}
                    />
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-[#334155]/50 flex gap-2">
                    <button className="flex items-center gap-2 bg-[#6C4CF1] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#5b3ee0] transition-colors">
                        <Save className="w-4 h-4" />
                        حفظ التغييرات
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
