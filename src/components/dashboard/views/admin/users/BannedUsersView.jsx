import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, RotateCcw, Trash2, AlertTriangle, Calendar } from 'lucide-react';

const ROLES = { student: 'طالب', employee: 'موظف', admin: 'مدير' };
const ROLE_COLORS = {
    student:  'bg-[#6C4CF1]/10 text-[#6C4CF1]',
    employee: 'bg-[#00C2A8]/10 text-[#00C2A8]',
    admin:    'bg-[#FFD166]/20 text-yellow-700 dark:text-[#FFD166]',
};

const mockBannedUsers = [
    { id: 4, name: 'نورة الحربي', email: 'noura@example.com', role: 'student', bannedDate: '2024-05-10', reason: 'انتهاك سياسة السلوك', bannedBy: 'أحمد محمود', tests: 7, violations: 3 },
    { id: 6, name: 'محمد العنزي', email: 'mohammad@example.com', role: 'student', bannedDate: '2024-04-20', reason: 'غش في الاختبارات', bannedBy: 'سارة علي', tests: 15, violations: 5 },
    { id: 7, name: 'ليلى الشمري', email: 'layla@example.com', role: 'employee', bannedDate: '2024-03-15', reason: 'سلوك غير احترافي', bannedBy: 'المدير العام', tests: 0, violations: 2 },
];

export default function BannedUsersView() {
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState(mockBannedUsers);
    const [expandedUser, setExpandedUser] = useState(null);

    const filtered = users.filter(u =>
        u.name.includes(search) || u.email.includes(search) || u.reason.includes(search)
    );

    const unban = (id) => {
        setUsers(us => us.filter(u => u.id !== id));
    };

    const stats = [
        { label: 'إجمالي المحظورين', value: users.length, icon: '🚫', color: 'bg-red-100 text-red-600' },
        { label: 'غش وانتهاكات', value: users.filter(u => u.violations > 0).length, icon: '⚠️', color: 'bg-yellow-100 text-yellow-600' },
        { label: 'الطلاب المحظورين', value: users.filter(u => u.role === 'student').length, icon: '👨‍🎓', color: 'bg-blue-100 text-blue-600' },
        { label: 'الموظفون المحظورون', value: users.filter(u => u.role === 'employee').length, icon: '👨‍💼', color: 'bg-purple-100 text-purple-600' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h2 className="text-lg font-black text-red-700 dark:text-red-400">المستخدمون المحظورون</h2>
                        <p className="text-sm text-red-600 dark:text-red-300 mt-0.5">إدارة المستخدمين المحظورين والمعلقين والانتهاكات</p>
                    </div>
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

            {/* Search */}
            <div className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 rounded-xl px-4 py-2.5 shadow-sm">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                    className="flex-1 bg-transparent text-sm text-gray-700 dark:text-[#F1F5F9] outline-none placeholder:text-gray-400"
                    placeholder="بحث بالاسم أو البريد أو السبب..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    dir="rtl"
                />
            </div>

            {/* Banned Users List */}
            <div className="space-y-3">
                {filtered.map((u) => (
                    <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden hover:shadow-md transition-shadow">
                        {/* Header */}
                        <button onClick={() => setExpandedUser(expandedUser === u.id ? null : u.id)} className="w-full p-4 hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors text-left">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    {u.name.slice(0, 2)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <h4 className="font-bold text-gray-800 dark:text-[#F1F5F9]">{u.name}</h4>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[u.role]}`}>{ROLES[u.role]}</span>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300 font-medium">محظور</span>
                                    </div>
                                    <p className="text-xs text-gray-400">{u.email}</p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {u.bannedDate}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                                            {u.violations} انتهاكات
                                        </span>
                                    </div>
                                </div>

                                <div className="text-right text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                                    <div className="font-semibold text-gray-700 dark:text-gray-300">{u.tests}</div>
                                    <div>اختبارات</div>
                                </div>
                            </div>
                        </button>

                        {/* Expanded Details */}
                        {expandedUser === u.id && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="border-t border-gray-100 dark:border-[#334155]/50 p-4 bg-gray-50 dark:bg-[#0F172A]/50 space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">سبب الحظر</p>
                                        <p className="text-sm text-gray-800 dark:text-[#F1F5F9] bg-white dark:bg-[#1E293B] rounded-lg p-2.5 border border-gray-200 dark:border-[#334155]">{u.reason}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">تم الحظر بواسطة</p>
                                        <p className="text-sm text-gray-800 dark:text-[#F1F5F9] bg-white dark:bg-[#1E293B] rounded-lg p-2.5 border border-gray-200 dark:border-[#334155]">{u.bannedBy}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3 bg-white dark:bg-[#1E293B] rounded-lg p-3 border border-gray-200 dark:border-[#334155]">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">إجمالي الاختبارات</p>
                                        <p className="font-bold text-lg text-gray-700 dark:text-[#F1F5F9] mt-1">{u.tests}</p>
                                    </div>
                                    <div className="text-center border-l border-r border-gray-200 dark:border-[#334155]">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">الانتهاكات</p>
                                        <p className="font-bold text-lg text-red-600 dark:text-red-300 mt-1">{u.violations}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">تاريخ الحظر</p>
                                        <p className="font-bold text-sm text-gray-700 dark:text-[#F1F5F9] mt-1">{u.bannedDate}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button onClick={() => unban(u.id)} className="flex-1 flex items-center justify-center gap-2 bg-[#00C2A8] text-white px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#00b392] transition-colors">
                                        <RotateCcw className="w-4 h-4" />
                                        فك الحظر
                                    </button>
                                    <button className="flex-1 bg-gray-200 dark:bg-[#334155] text-gray-700 dark:text-gray-200 px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors">
                                        تحديث السبب
                                    </button>
                                    <button className="px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">لا توجد مستخدمين محظورين حالياً</p>
                </div>
            )}
        </div>
    );
}
