import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Plus, Edit2, Trash2, Eye, Filter } from 'lucide-react';

const mockQuestions = [
    { id: 1, question: 'كلمة "فصيح" تعني:', section: 'المفردة الشاذة', difficulty: 'سهل', uses: 84, author: 'خالد يوسف' },
    { id: 2, question: 'ما علاقة "البيت" بـ "السكن"?', section: 'التناظر اللفظي', difficulty: 'متوسط', uses: 61, author: 'منى العمري' },
    { id: 3, question: 'أكمل الجملة: المثابرة ___', section: 'إكمال الجمل', difficulty: 'صعب', uses: 37, author: 'خالد يوسف' },
    { id: 4, question: 'الكلمة الشاذة من بين:', section: 'المفردة الشاذة', difficulty: 'سهل', uses: 112, author: 'طارق السالم' },
];

const DIFF_COLORS = {
    سهل: 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400',
    متوسط: 'bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
    صعب: 'bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400',
};

export default function QuestionBankView() {
    const [search, setSearch] = useState('');
    const [filterSection, setFilterSection] = useState('');
    const [questions, setQuestions] = useState(mockQuestions);

    const filtered = questions.filter(q =>
        (!search || q.question.includes(search)) &&
        (!filterSection || q.section === filterSection)
    );

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">بنك الأسئلة</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{questions.length} سؤال في القاعدة</p>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-4 border border-gray-100 dark:border-[#334155]/50 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                        type="text"
                        placeholder="ابحث عن سؤال..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none"
                    />
                    <select
                        value={filterSection}
                        onChange={(e) => setFilterSection(e.target.value)}
                        className="bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none"
                    >
                        <option value="">جميع الأقسام</option>
                        <option value="التناظر اللفظي">التناظر اللفظي</option>
                        <option value="إكمال الجمل">إكمال الجمل</option>
                        <option value="الخطأ السياقي">الخطأ السياقي</option>
                        <option value="استيعاب المقروء">استيعاب المقروء</option>
                        <option value="المفردة الشاذة">المفردة الشاذة</option>
                    </select>
                </div>
            </div>

            {/* Questions Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-[#0F172A] border-b border-gray-200 dark:border-[#334155]/50">
                            <tr>
                                <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">#</th>
                                <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">السؤال</th>
                                <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">القسم</th>
                                <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">المستوى</th>
                                <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">عدد الاستخدام</th>
                                <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((q, i) => (
                                <tr key={q.id} className="border-b border-gray-100 dark:border-[#334155]/30 hover:bg-gray-50 dark:hover:bg-white/5">
                                    <td className="py-3 px-4">{i + 1}</td>
                                    <td className="py-3 px-4">{q.question}</td>
                                    <td className="py-3 px-4 text-ss">{q.section}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${DIFF_COLORS[q.difficulty]}`}>
                                            {q.difficulty}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">{q.uses}</td>
                                    <td className="py-3 px-4 flex gap-1">
                                        <button className="text-[#6C4CF1] hover:text-[#5b3ee0]"><Eye className="w-4 h-4" /></button>
                                        <button className="text-[#00C2A8] hover:text-[#00b096]"><Edit2 className="w-4 h-4" /></button>
                                        <button className="text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
