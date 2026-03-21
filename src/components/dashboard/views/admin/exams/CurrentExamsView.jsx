import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Eye, Play, Archive, Filter, Search } from 'lucide-react';

const mockCurrentExams = [
    { id: 1, name: 'اختبار اللغة العربية - الفترة الأولى', duration: '120', questions: 50, students: 145, startDate: '2024-05-20', endDate: '2024-05-27', status: 'active', difficulty: 'متوسط' },
    { id: 2, name: 'اختبار القواعس النحوية', duration: '90', questions: 40, students: 98, startDate: '2024-05-18', endDate: '2024-05-25', status: 'active', difficulty: 'متوسط' },
    { id: 3, name: 'اختبار الفهم والاستيعاب', duration: '75', questions: 30, students: 200, startDate: '2024-05-22', endDate: '2024-05-29', status: 'scheduled', difficulty: 'صعب' },
    { id: 4, name: 'اختبار المفردات والمترادفات', duration: '60', questions: 25, students: 156, startDate: '2024-05-25', endDate: '2024-06-01', status: 'scheduled', difficulty: 'سهل' },
];

export default function CurrentExamsView() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [selectedExam, setSelectedExam] = useState(null);

    const filtered = mockCurrentExams.filter(exam => {
        const matchesSearch = exam.name.includes(search);
        const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
        const matchesDifficulty = difficultyFilter === 'all' || exam.difficulty === difficultyFilter;
        return matchesSearch && matchesStatus && matchesDifficulty;
    });

    const stats = [
        { label: 'الاختبارات النشطة', value: mockCurrentExams.filter(e => e.status === 'active').length, icon: 'Play', color: 'bg-green-100 text-green-600' },
        { label: 'المجدولة قريباً', value: mockCurrentExams.filter(e => e.status === 'scheduled').length, icon: 'Calendar', color: 'bg-blue-100 text-blue-600' },
        { label: 'إجمالي الطلاب', value: mockCurrentExams.reduce((a, e) => a + e.students, 0), icon: 'Users', color: 'bg-purple-100 text-purple-600' },
        { label: 'متوسط الأسئلة', value: Math.round(mockCurrentExams.reduce((a, e) => a + e.questions, 0) / mockCurrentExams.length), icon: 'HelpCircle', color: 'bg-[#6C4CF1]/10 text-[#6C4CF1]' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">الاختبارات الحالية</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">الاختبارات النشطة والمجدولة قريباً</p>
                </div>
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

            {/* Filters */}
            <div className="space-y-3">
                {/* Search */}
                <div className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 rounded-xl px-4 py-2.5 shadow-sm">
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                        className="flex-1 bg-transparent text-sm text-gray-700 dark:text-[#F1F5F9] outline-none placeholder:text-gray-400"
                        placeholder="ابحث عن اختبار..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        dir="rtl"
                    />
                </div>

                {/* Status & Difficulty Filters */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Filter className="w-4 h-4" />
                        الحالة:
                    </span>
                    {['all', 'active', 'scheduled'].map(st => (
                        <button key={st} onClick={() => setStatusFilter(st)} className={`text-xs px-3 py-1.5 rounded-lg transition-all ${statusFilter === st ? 'bg-[#6C4CF1] text-white' : 'bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
                            {st === 'all' ? 'الكل' : st === 'active' ? 'نشط' : 'مجدول'}
                        </button>
                    ))}
                    <span className="ml-4 text-sm font-semibold text-gray-600 dark:text-gray-400">الصعوبة:</span>
                    {['all', 'سهل', 'متوسط', 'صعب'].map(diff => (
                        <button key={diff} onClick={() => setDifficultyFilter(diff)} className={`text-xs px-3 py-1.5 rounded-lg transition-all ${difficultyFilter === diff ? 'bg-[#6C4CF1] text-white' : 'bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
                            {diff === 'all' ? 'الكل' : diff}
                        </button>
                    ))}
                </div>
            </div>

            {/* Exams List */}
            <div className="space-y-3">
                {filtered.map((exam, idx) => (
                    <motion.div
                        key={exam.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedExam(selectedExam === exam.id ? null : exam.id)}
                        className={`bg-white dark:bg-[#1E293B] rounded-xl border cursor-pointer transition-all hover:shadow-md ${selectedExam === exam.id ? 'border-[#6C4CF1] bg-[#6C4CF1]/5' : 'border-gray-100 dark:border-[#334155]/50'}`}
                    >
                        <div className="p-4 hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9]">{exam.name}</h3>
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${exam.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'}`}>
                                            {exam.status === 'active' ? 'نشط' : 'مجدول'}
                                        </span>
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 font-medium">{exam.difficulty}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{exam.startDate} إلى {exam.endDate}</p>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-4 gap-3">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                                        <Clock className="w-3 h-3" />
                                        <span className="text-xs">المدة</span>
                                    </div>
                                    <p className="font-bold text-gray-800 dark:text-[#F1F5F9]">{exam.duration}د</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                                        <span className="text-xs">الأسئلة</span>
                                    </div>
                                    <p className="font-bold text-gray-800 dark:text-[#F1F5F9]">{exam.questions}</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                                        <Users className="w-3 h-3" />
                                        <span className="text-xs">الطلاب</span>
                                    </div>
                                    <p className="font-bold text-gray-800 dark:text-[#F1F5F9]">{exam.students}</p>
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <button className="p-1.5 rounded-lg text-[#6C4CF1] hover:bg-[#6C4CF1]/10 transition-colors" title="عرض">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    {exam.status === 'active' && (
                                        <button className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors" title="متابعة">
                                            <Play className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {selectedExam === exam.id && (
                                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="mt-4 pt-4 border-t border-gray-100 dark:border-[#334155] space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-3">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">نسبة الإجابة</p>
                                            <p className="font-bold text-lg text-[#6C4CF1]">78%</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-3">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">متوسط الدرجات</p>
                                            <p className="font-bold text-lg text-green-600">75</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-[#6C4CF1] rounded-lg hover:bg-[#5b3ee0] transition-colors">
                                            عرض النتائج
                                        </button>
                                        <button className="flex-1 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#334155] rounded-lg hover:bg-gray-200 transition-colors">
                                            تعديل
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">لا توجد اختبارات مطابقة للمعايير المحددة</p>
                </div>
            )}
        </div>
    );
}
