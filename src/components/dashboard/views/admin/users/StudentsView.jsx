import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Edit2, Trash2, Shield, Ban, RotateCcw, Eye, TrendingUp } from 'lucide-react';

const STATUS_COLORS = {
    active:  'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400',
    banned:  'bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400',
};

const mockStudents = [
    { id: 1, name: 'أحمد محمد',   email: 'ahmed@example.com',   status: 'active', joined: '2024-01-15', lastActive: 'منذ ساعة',   tests: 42, avg: 78, courses: 5, level: 'مستوى 2' },
    { id: 2, name: 'سارة علي',    email: 'sara@example.com',    status: 'active', joined: '2024-02-10', lastActive: 'منذ 3 ساعات', tests: 18, avg: 91, courses: 4, level: 'مستوى 3' },
    { id: 4, name: 'نورة الحربي', email: 'noura@example.com',   status: 'banned', joined: '2024-03-01', lastActive: 'منذ أسبوع',   tests: 7,  avg: 55, courses: 2, level: 'مستوى 1' },
    { id: 5, name: 'فيصل العتيبي', email: 'faisal@example.com', status: 'active', joined: '2024-01-28', lastActive: 'منذ ساعتين',  tests: 30, avg: 82, courses: 5, level: 'مستوى 2' },
];

export default function StudentsView() {
    const [search, setSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState(mockStudents);
    const [statusFilter, setStatusFilter] = useState('all');
    const [levelFilter, setLevelFilter] = useState('all');

    const filtered = students.filter(s => {
        const matchesSearch = s.name.includes(search) || s.email.includes(search);
        const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
        const matchesLevel = levelFilter === 'all' || s.level === levelFilter;
        return matchesSearch && matchesStatus && matchesLevel;
    });

    const toggleBan = (id) => {
        setStudents(ss => ss.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'banned' : 'active' } : s));
    };

    const stats = [
        { label: 'إجمالي الطلاب', value: students.length, icon: '👨‍🎓', color: 'bg-blue-100 text-blue-600' },
        { label: 'الطلاب النشطون', value: students.filter(s => s.status === 'active').length, icon: '✅', color: 'bg-green-100 text-green-600' },
        { label: 'الطلاب المحظورون', value: students.filter(s => s.status === 'banned').length, icon: '🚫', color: 'bg-red-100 text-red-600' },
        { label: 'متوسط الحضور', value: `${Math.round(students.reduce((a, s) => a + s.tests, 0) / students.length)}`, icon: '📊', color: 'bg-[#6C4CF1]/10 text-[#6C4CF1]' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">إدارة الطلاب</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إدارة الطلاب المسجلين وتقدمهم الأكاديمي</p>
                </div>
                <button className="flex items-center gap-2 bg-[#6C4CF1] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#5b3ee0] transition-colors shadow-sm flex-shrink-0">
                    <UserPlus className="w-4 h-4" />
                    طالب جديد
                </button>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Search */}
                <div className="sm:col-span-2 flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 rounded-xl px-4 py-2.5 shadow-sm">
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                        className="flex-1 bg-transparent text-sm text-gray-700 dark:text-[#F1F5F9] outline-none placeholder:text-gray-400"
                        placeholder="بحث بالاسم أو البريد الإلكتروني..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        dir="rtl"
                    />
                </div>

                {/* Level Filter */}
                <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)} className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none shadow-sm" dir="rtl">
                    <option value="all">جميع المستويات</option>
                    <option value="مستوى 1">المستوى الأول</option>
                    <option value="مستوى 2">المستوى الثاني</option>
                    <option value="مستوى 3">المستوى الثالث</option>
                </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">الحالة:</span>
                {['all', 'active', 'banned'].map(st => (
                    <button key={st} onClick={() => setStatusFilter(st)} className={`text-xs px-3 py-1.5 rounded-lg transition-all ${statusFilter === st ? 'bg-[#6C4CF1] text-white' : 'bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
                        {st === 'all' ? 'الكل' : st === 'active' ? 'نشط' : 'محظور'}
                    </button>
                ))}
            </div>

            {/* Students Table */}
            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full" dir="rtl">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-[#0F172A]/40 border-b border-gray-100 dark:border-[#334155]/50">
                                {['الطالب','الحالة','المستوى','الاختبارات','المعدل','الكورسات','آخر نشاط','الإجراءات'].map(h => (
                                    <th key={h} className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3 whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                            {filtered.map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors">
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-[#6C4CF1] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                {s.name.slice(0, 2)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800 dark:text-[#F1F5F9]">{s.name}</p>
                                                <p className="text-xs text-gray-400">{s.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[s.status]}`}>
                                            {s.status === 'active' ? 'نشط' : 'محظور'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-1 text-xs font-semibold text-[#6C4CF1]">
                                            <TrendingUp className="w-3 h-3" /> {s.level}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5 text-xs text-gray-600 dark:text-gray-400 font-semibold">{s.tests}</td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-12 h-1.5 bg-gray-200 dark:bg-[#334155] rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-[#6C4CF1] to-[#00C2A8]" style={{ width: `${s.avg}%` }} />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{s.avg}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400 font-semibold">{s.courses}</td>
                                    <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{s.lastActive}</td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-1">
                                            <ActionBtn icon={Eye}      tip="عرض الملف"      color="text-[#6C4CF1] hover:bg-[#6C4CF1]/10" onClick={() => setSelectedStudent(s)} />
                                            <ActionBtn icon={Edit2} tip="تعديل" color="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10" onClick={undefined} />
                                            <ActionBtn icon={Shield} tip="تعليق" color="text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-500/10" onClick={undefined} />
                                            <ActionBtn icon={s.status === 'active' ? Ban : RotateCcw} tip={s.status === 'active' ? 'حظر' : 'فك الحظر'} color="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10" onClick={() => toggleBan(s.id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Student Profile Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedStudent(null)}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 max-w-2xl w-full border border-gray-200 dark:border-[#334155]/60 shadow-2xl"
                        onClick={e => e.stopPropagation()} dir="rtl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-[#6C4CF1] flex items-center justify-center text-white text-2xl font-bold">{selectedStudent.name.slice(0,2)}</div>
                            <div className="flex-1">
                                <h3 className="font-black text-gray-900 dark:text-[#F1F5F9] text-lg">{selectedStudent.name}</h3>
                                <p className="text-sm text-gray-400">{selectedStudent.email}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs bg-[#6C4CF1]/10 text-[#6C4CF1] px-2 py-0.5 rounded-full">{selectedStudent.level}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[selectedStudent.status]}`}>
                                        {selectedStudent.status === 'active' ? 'نشط' : 'محظور'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-[#334155]">
                            {[
                                { label: 'إجمالي الاختبارات', value: selectedStudent.tests },
                                { label: 'متوسط الدرجات', value: `${selectedStudent.avg}%` },
                                { label: 'الكورسات', value: selectedStudent.courses },
                                { label: 'أقوى قسم', value: 'المفردة الشاذة' },
                                { label: 'أضعف قسم', value: 'الخطأ السياقي' },
                                { label: 'معدل النجاح', value: '85%' },
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <p className="font-black text-[#6C4CF1] text-lg">{item.value}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setSelectedStudent(null)} className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">إغلاق</button>
                            <button className="px-4 py-2 text-sm bg-[#6C4CF1] text-white rounded-lg hover:bg-[#5b3ee0] transition-colors">عرض التفاصيل الكاملة</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

function ActionBtn({ icon: IconComp, tip, color, onClick }) {
    return (
        <button title={tip} onClick={onClick} className={`p-1.5 rounded-lg text-gray-400 transition-all ${color}`}>
            <IconComp className="w-3.5 h-3.5" />
        </button>
    );
}
