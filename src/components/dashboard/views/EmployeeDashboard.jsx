import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Video, MessageSquare, ChevronDown, CheckCircle2, Clock, HelpCircle } from 'lucide-react';
import StatCard from '../StatCard';

const difficulties = ['سهل', 'متوسط', 'صعب'];
const sections = ['التناظر اللفظي', 'إكمال الجمل', 'الخطأ السياقي', 'استيعاب المقروء', 'المفردة الشاذة'];

const sampleQuestions = [
    { id: 1, question: 'كلمة "فصيح" تعني:', section: 'المفردة الشاذة', difficulty: 'سهل',   status: 'منشور' },
    { id: 2, question: 'ما علاقة "البيت" بـ "السكن"?',  section: 'التناظر اللفظي', difficulty: 'متوسط', status: 'مسودة' },
    { id: 3, question: 'أكمل الجملة: المثابرة ___',       section: 'إكمال الجمل',    difficulty: 'صعب',   status: 'منشور' },
];

const tickets = [
    { id: 1, student: 'أحمد محمد', issue: 'الفيديو لا يعمل في الدرس الثالث', time: 'منذ ساعة',   status: 'مفتوح'  },
    { id: 2, student: 'سارة علي',  issue: 'لا أستطيع الوصول للاختبار النهائي', time: 'منذ 3 ساعات', status: 'قيد المعالجة' },
];

export default function EmployeeDashboard() {
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [form, setForm] = useState({ question: '', options: ['', '', '', ''], correct: 0, section: '', difficulty: '', explanation: '' });

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label="الأسئلة المنشورة" value="234"  icon={HelpCircle}    color="#6C4CF1" change={8}  index={0} />
                <StatCard label="الدروس المحملة"   value="18"   icon={Video}         color="#00C2A8" change={3}  index={1} />
                <StatCard label="تذاكر مفتوحة"     value="5"    icon={MessageSquare} color="#FFD166" change={-2} index={2} />
                <StatCard label="ساعات البث"        value="42"   icon={CheckCircle2}  color="#EF4444"             index={3} />
            </div>

            {/* Question Management */}
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none overflow-hidden">
                <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-[#334155]/50">
                    <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9]">إدارة الأسئلة</h3>
                    <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => setShowAddQuestion(!showAddQuestion)}
                        className="flex items-center gap-2 bg-[#6C4CF1] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#5b3ee0] transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        إضافة سؤال
                    </motion.button>
                </div>

                {/* Add Question Form */}
                <AnimatePresence>
                    {showAddQuestion && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-b border-gray-100 dark:border-[#334155]/50"
                        >
                            <div className="p-5 space-y-4 bg-gray-50 dark:bg-[#0F172A]/40">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">القسم</label>
                                        <select className="w-full bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })}>
                                            <option value="">اختر القسم</option>
                                            {sections.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">الصعوبة</label>
                                        <select className="w-full bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}>
                                            <option value="">اختر الصعوبة</option>
                                            {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">نص السؤال</label>
                                    <textarea
                                        className="w-full bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1] resize-none h-20"
                                        placeholder="اكتب نص السؤال..."
                                        value={form.question}
                                        onChange={e => setForm({ ...form, question: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {form.options.map((opt, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <input type="radio" name="correct" checked={form.correct === i} onChange={() => setForm({ ...form, correct: i })} className="accent-[#6C4CF1]" />
                                            <input
                                                className="flex-1 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                                                placeholder={`الخيار ${i + 1}`}
                                                value={opt}
                                                onChange={e => { const opts = [...form.options]; opts[i] = e.target.value; setForm({ ...form, options: opts }); }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">الشرح</label>
                                    <textarea
                                        className="w-full bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1] resize-none h-16"
                                        placeholder="شرح الإجابة الصحيحة..."
                                        value={form.explanation}
                                        onChange={e => setForm({ ...form, explanation: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setShowAddQuestion(false)} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#F1F5F9] transition-colors">إلغاء</button>
                                    <button className="px-5 py-2 bg-[#6C4CF1] text-white text-sm font-semibold rounded-xl hover:bg-[#5b3ee0] transition-colors">حفظ السؤال</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Question List */}
                <div className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                    {sampleQuestions.map((q) => (
                        <div key={q.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/2 transition-colors">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 dark:text-[#F1F5F9] truncate">{q.question}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs bg-[#6C4CF1]/10 text-[#6C4CF1] px-2 py-0.5 rounded-full">{q.section}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${q.difficulty === 'سهل' ? 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400' : q.difficulty === 'متوسط' ? 'bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400'}`}>{q.difficulty}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${q.status === 'منشور' ? 'bg-[#00C2A8]/10 text-[#00C2A8]' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{q.status}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#6C4CF1] hover:bg-[#6C4CF1]/10 transition-all"><Edit2 className="w-4 h-4" /></button>
                                <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Support Tickets */}
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-[#334155]/50">
                    <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9]">تذاكر الدعم الفني</h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                    {tickets.map((ticket) => (
                        <div key={ticket.id} className="p-4 flex items-start gap-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C4CF1] to-[#00C2A8] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {ticket.student.slice(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="font-semibold text-sm text-gray-800 dark:text-[#F1F5F9]">{ticket.student}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${ticket.status === 'مفتوح' ? 'bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400' : 'bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-400'}`}>{ticket.status}</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ticket.issue}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{ticket.time}</span>
                                    <button className="text-xs text-[#6C4CF1] font-semibold hover:underline">الرد</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}