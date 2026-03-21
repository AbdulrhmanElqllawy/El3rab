import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Upload, Search, Filter } from 'lucide-react';

const SECTIONS = ['التناظر اللفظي','إكمال الجمل','الخطأ السياقي','استيعاب المقروء','المفردة الشاذة'];
const DIFFS = ['سهل','متوسط','صعب'];

const mockQuestions = [
    { id: 1, question: 'كلمة "فصيح" تعني:', section: 'المفردة الشاذة',  difficulty: 'سهل',   uses: 84, author: 'خالد يوسف' },
    { id: 2, question: 'ما علاقة "البيت" بـ "السكن"?', section: 'التناظر اللفظي', difficulty: 'متوسط', uses: 61, author: 'منى العمري' },
    { id: 3, question: 'أكمل الجملة: المثابرة ___',    section: 'إكمال الجمل',    difficulty: 'صعب',   uses: 37, author: 'خالد يوسف' },
    { id: 4, question: 'الكلمة الشاذة من بين:',         section: 'المفردة الشاذة', difficulty: 'سهل',   uses: 112, author: 'طارق السالم' },
];

const DIFF_COLORS = {
    سهل:   'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400',
    متوسط: 'bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
    صعب:   'bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400',
};

const emptyForm = { question: '', section: '', difficulty: '', explanation: '', options: ['','','',''], correct: 0 };

export default function QuestionsView() {
    const [search, setSearch] = useState('');
    const [filterSection, setFilterSection] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);

    const filtered = mockQuestions.filter(q =>
        (!search || q.question.includes(search)) &&
        (!filterSection || q.section === filterSection)
    );

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">بنك الأسئلة</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{mockQuestions.length} سؤال في القاعدة</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <button className="flex items-center gap-2 border border-gray-200 dark:border-[#334155] text-gray-600 dark:text-gray-400 text-sm font-medium px-3.5 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <Upload className="w-4 h-4" />
                        استيراد
                    </button>
                    <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-[#6C4CF1] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#5b3ee0] transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                        إضافة سؤال
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 rounded-xl px-3 py-2 flex-1 min-w-48 shadow-sm">
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input className="flex-1 bg-transparent text-sm text-gray-700 dark:text-[#F1F5F9] outline-none placeholder:text-gray-400" placeholder="بحث في الأسئلة..." value={search} onChange={e => setSearch(e.target.value)} dir="rtl" />
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 rounded-xl px-3 py-2 shadow-sm">
                    <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <select className="bg-transparent text-sm text-gray-700 dark:text-[#F1F5F9] outline-none" value={filterSection} onChange={e => setFilterSection(e.target.value)}>
                        <option value="">كل الأقسام</option>
                        {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            {/* Add Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="bg-white dark:bg-[#1E293B] rounded-2xl border border-[#6C4CF1]/30 p-5 shadow-sm"
                    >
                        <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9] mb-4">إضافة سؤال جديد</h3>
                        <div className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">القسم</label>
                                    <select className="w-full bg-gray-50 dark:bg-[#0F172A]/50 border border-gray-200 dark:border-[#334155] rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]" value={form.section} onChange={e => setForm({...form, section: e.target.value})}>
                                        <option value="">اختر القسم</option>
                                        {SECTIONS.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">الصعوبة</label>
                                    <select className="w-full bg-gray-50 dark:bg-[#0F172A]/50 border border-gray-200 dark:border-[#334155] rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]" value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}>
                                        <option value="">اختر الصعوبة</option>
                                        {DIFFS.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">نص السؤال</label>
                                <textarea className="w-full bg-gray-50 dark:bg-[#0F172A]/50 border border-gray-200 dark:border-[#334155] rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1] resize-none h-20" placeholder="اكتب نص السؤال..." value={form.question} onChange={e => setForm({...form, question: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {form.options.map((opt, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <input type="radio" name="correct" checked={form.correct === i} onChange={() => setForm({...form, correct: i})} className="accent-[#6C4CF1]" />
                                        <input className="flex-1 bg-gray-50 dark:bg-[#0F172A]/50 border border-gray-200 dark:border-[#334155] rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]" placeholder={`الخيار ${i+1}`} value={opt} onChange={e => { const o=[...form.options]; o[i]=e.target.value; setForm({...form,options:o}); }} />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">الشرح</label>
                                <textarea className="w-full bg-gray-50 dark:bg-[#0F172A]/50 border border-gray-200 dark:border-[#334155] rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1] resize-none h-16" placeholder="شرح الإجابة الصحيحة..." value={form.explanation} onChange={e => setForm({...form, explanation: e.target.value})} />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-[#F1F5F9] transition-colors">إلغاء</button>
                                <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-[#6C4CF1] text-white text-sm font-semibold rounded-xl hover:bg-[#5b3ee0] transition-colors">حفظ السؤال</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full" dir="rtl">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-[#0F172A]/40 border-b border-gray-100 dark:border-[#334155]/50">
                                {['السؤال','القسم','الصعوبة','مرات الاستخدام','المؤلف','إجراءات'].map(h => (
                                    <th key={h} className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3 whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                            {filtered.map(q => (
                                <tr key={q.id} className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors">
                                    <td className="px-4 py-3.5 text-sm text-gray-800 dark:text-[#F1F5F9] max-w-xs truncate">{q.question}</td>
                                    <td className="px-4 py-3.5"><span className="text-xs bg-[#6C4CF1]/10 text-[#6C4CF1] px-2.5 py-1 rounded-full whitespace-nowrap">{q.section}</span></td>
                                    <td className="px-4 py-3.5"><span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${DIFF_COLORS[q.difficulty]}`}>{q.difficulty}</span></td>
                                    <td className="px-4 py-3.5 text-sm font-bold text-gray-700 dark:text-gray-300">{q.uses}</td>
                                    <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{q.author}</td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-1">
                                            <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#6C4CF1] hover:bg-[#6C4CF1]/10 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                                            <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                                        </div>
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