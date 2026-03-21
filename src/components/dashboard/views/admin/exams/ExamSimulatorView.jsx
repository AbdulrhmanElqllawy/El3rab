import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Book, Settings, ChevronRight, BarChart3, Clock, CheckCircle } from 'lucide-react';

const mockExamSimulators = [
    { id: 1, title: 'محاكي اللغة العربية - مستوى 1', category: 'لغة عربية', level: 'مستوى 1', questions: 50, avgTime: '120', difficulty: 'متوسط', attempts: 234, avgScore: 72, color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'محاكي القواعد النحوية', category: 'لغة عربية', level: 'مستوى 2', questions: 40, avgTime: '90', difficulty: 'متوسط', attempts: 189, avgScore: 78, color: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'محاكي الفهم والاستيعاب', category: 'لغة عربية', level: 'مستوى 2', questions: 35, avgTime: '75', difficulty: 'صعب', attempts: 156, avgScore: 65, color: 'from-orange-500 to-red-500' },
    { id: 4, title: 'محاكي المفردات والمترادفات', category: 'لغة عربية', level: 'مستوى 1', questions: 30, avgTime: '60', difficulty: 'سهل', attempts: 267, avgScore: 85, color: 'from-green-500 to-emerald-500' },
];

export default function ExamSimulatorView() {
    const [selectedSimulator, setSelectedSimulator] = useState(null);
    const [filterLevel, setFilterLevel] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');

    const filtered = mockExamSimulators.filter(sim =>
        filterLevel === 'all' || sim.level === filterLevel
    );

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'popularity') return b.attempts - a.attempts;
        if (sortBy === 'difficulty') return ['سهل', 'متوسط', 'صعب'].indexOf(b.difficulty) - ['سهل', 'متوسط', 'صعب'].indexOf(a.difficulty);
        if (sortBy === 'score') return b.avgScore - a.avgScore;
        return 0;
    });

    const stats = [
        { label: 'إجمالي المحاكات', value: mockExamSimulators.length, icon: 'Book', color: 'bg-blue-100 text-blue-600' },
        { label: 'إجمالي المحاولات', value: mockExamSimulators.reduce((a, s) => a + s.attempts, 0), icon: 'Play', color: 'bg-green-100 text-green-600' },
        { label: 'متوسط الدرجات', value: `${Math.round(mockExamSimulators.reduce((a, s) => a + s.avgScore, 0) / mockExamSimulators.length)}%`, icon: 'CheckCircle', color: 'bg-purple-100 text-purple-600' },
        { label: 'الأسئلة الكلية', value: mockExamSimulators.reduce((a, s) => a + s.questions, 0), icon: 'HelpCircle', color: 'bg-[#6C4CF1]/10 text-[#6C4CF1]' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">محاكي الاختبارات</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">محاكات تدريبية لتحسين الأداء والاستعداد للاختبارات الفعلية</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((stat) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`${stat.color} rounded-xl p-3.5 border border-current/20`}>
                        <p className="text-lg font-black">{stat.value}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters & Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">المستوى:</span>
                    {['all', 'مستوى 1', 'مستوى 2'].map(level => (
                        <button key={level} onClick={() => setFilterLevel(level)} className={`text-xs px-3 py-1.5 rounded-lg transition-all ${filterLevel === level ? 'bg-[#6C4CF1] text-white' : 'bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
                            {level === 'all' ? 'الكل' : level}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">ترتيب:</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 outline-none border-none">
                        <option value="popularity">الأكثر استخداماً</option>
                        <option value="difficulty">الصعوبة</option>
                        <option value="score">متوسط الدرجات</option>
                    </select>
                </div>
            </div>

            {/* Simulators Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {sorted.map((sim, idx) => (
                    <motion.div
                        key={sim.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedSimulator(selectedSimulator === sim.id ? null : sim.id)}
                        className={`rounded-2xl border cursor-pointer transition-all hover:shadow-lg ${selectedSimulator === sim.id ? 'border-[#6C4CF1] bg-white dark:bg-[#1E293B]' : 'border-gray-100 dark:border-[#334155]/50 bg-white dark:bg-[#1E293B] hover:border-[#6C4CF1]'}`}
                    >
                        {/* Header with Gradient */}
                        <div className={`h-24 bg-gradient-to-r ${sim.color} rounded-t-2xl flex items-end justify-between p-4 relative overflow-hidden`}>
                            <div className="relative z-10">
                                <h3 className="font-black text-white text-lg">{sim.title}</h3>
                                <p className="text-sm text-white/80">{sim.category}</p>
                            </div>
                            <span className="text-white/60 text-4xl font-black opacity-10">{sim.level.slice(-1)}</span>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-4 gap-2">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">الأسئلة</p>
                                    <p className="font-bold text-sm text-gray-800 dark:text-[#F1F5F9]">{sim.questions}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-0.5">
                                        <Clock className="w-3 h-3" />الوقت
                                    </p>
                                    <p className="font-bold text-sm text-gray-800 dark:text-[#F1F5F9]">{sim.avgTime}د</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">محاولة</p>
                                    <p className="font-bold text-sm text-gray-800 dark:text-[#F1F5F9]">{sim.attempts}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">المعدل</p>
                                    <p className="font-bold text-sm text-[#6C4CF1]">{sim.avgScore}%</p>
                                </div>
                            </div>

                            {/* Difficulty Badge */}
                            <div className="flex items-center justify-between">
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                    sim.difficulty === 'سهل' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300' :
                                    sim.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300' :
                                    'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300'
                                }`}>
                                    {sim.difficulty}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{sim.level}</span>
                            </div>

                            {/* Expanded Details */}
                            {selectedSimulator === sim.id && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="pt-3 space-y-3 border-t border-gray-200 dark:border-[#334155]">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-[#0F172A] rounded-lg">
                                            <span className="text-gray-600 dark:text-gray-400">نسبة الاكتمال:</span>
                                            <div className="w-20 h-2 bg-gray-200 dark:bg-[#334155] rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-[#6C4CF1] to-[#00C2A8]" style={{ width: `${sim.avgScore}%` }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold text-white bg-[#6C4CF1] rounded-lg hover:bg-[#5b3ee0] transition-colors">
                                            <Play className="w-4 h-4" />
                                            ابدأ المحاكاة
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#334155] rounded-lg hover:bg-gray-200 transition-colors">
                                            <BarChart3 className="w-4 h-4" />
                                            النتائج
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {sorted.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">لا توجد محاكات مطابقة للمعايير المحددة</p>
                </div>
            )}

            {/* Info Box */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">i</div>
                <div>
                    <p className="font-semibold text-blue-700 dark:text-blue-300 text-sm mb-1">نصيحة</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">تدرب على هذه المحاكات بانتظام لتحسين أدائك وتعزيز ثقتك في الاختبارات الفعلية.</p>
                </div>
            </motion.div>
        </div>
    );
}
