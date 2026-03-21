import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Edit2, Trash2, Shield, Ban, RotateCcw, Eye } from 'lucide-react';

const ROLES = { student: 'طالب', employee: 'موظف', admin: 'مدير' };
const ROLE_COLORS = {
    student:  'bg-[#6C4CF1]/10 text-[#6C4CF1]',
    employee: 'bg-[#00C2A8]/10 text-[#00C2A8]',
    admin:    'bg-[#FFD166]/20 text-yellow-700 dark:text-[#FFD166]',
};
const STATUS_COLORS = {
    active:  'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400',
    banned:  'bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400',
};

const mockUsers = [
    { id: 1, name: 'أحمد محمد',   email: 'ahmed@example.com',   role: 'student',  status: 'active', joined: '2024-01-15', lastActive: 'منذ ساعة',   tests: 42, avg: 78 },
    { id: 2, name: 'سارة علي',    email: 'sara@example.com',    role: 'student',  status: 'active', joined: '2024-02-10', lastActive: 'منذ 3 ساعات', tests: 18, avg: 91 },
    { id: 3, name: 'خالد يوسف',   email: 'khalid@example.com',  role: 'employee', status: 'active', joined: '2023-11-05', lastActive: 'منذ يوم',     tests: 5,  avg: 85 },
    { id: 4, name: 'نورة الحربي', email: 'noura@example.com',   role: 'student',  status: 'banned', joined: '2024-03-01', lastActive: 'منذ أسبوع',   tests: 7,  avg: 55 },
    { id: 5, name: 'فيصل العتيبي', email: 'faisal@example.com', role: 'student',  status: 'active', joined: '2024-01-28', lastActive: 'منذ ساعتين',  tests: 30, avg: 82 },
];

export default function UsersAllView() {
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState(mockUsers);
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = users.filter(u => {
        const matchesSearch = u.name.includes(search) || u.email.includes(search);
        const matchesRole = roleFilter === 'all' || u.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const toggleBan = (id) => {
        setUsers(us => us.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u));
    };

    const stats = [
        { label: 'إجمالي المستخدمين', value: users.length, icon: '👥', color: 'bg-[#6C4CF1]/10 text-[#6C4CF1]' },
        { label: 'المستخدمون النشطون', value: users.filter(u => u.status === 'active').length, icon: '✅', color: 'bg-green-100 text-green-600' },
        { label: 'المستخدمون المحظورون', value: users.filter(u => u.status === 'banned').length, icon: '🚫', color: 'bg-red-100 text-red-600' },
        { label: 'الطلاب', value: users.filter(u => u.role === 'student').length, icon: '👨‍🎓', color: 'bg-blue-100 text-blue-600' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">جميع المستخدمين</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إدارة كاملة لجميع مستخدمي المنصة والأدوار والحالات</p>
                </div>
                <button className="flex items-center gap-2 bg-[#6C4CF1] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#5b3ee0] transition-colors shadow-sm flex-shrink-0">
                    <UserPlus className="w-4 h-4" />
                    مستخدم جديد
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

                {/* Role Filter */}
                <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none shadow-sm" dir="rtl">
                    <option value="all">جميع الأدوار</option>
                    <option value="student">الطلاب فقط</option>
                    <option value="employee">الموظفون فقط</option>
                    <option value="admin">الإداريون فقط</option>
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

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full" dir="rtl">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-[#0F172A]/40 border-b border-gray-100 dark:border-[#334155]/50">
                                {['المستخدم','الدور','الحالة','تاريخ التسجيل','آخر نشاط','الإجراءات'].map(h => (
                                    <th key={h} className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3 whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                            {filtered.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors">
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C4CF1] to-[#00C2A8] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                {u.name.slice(0, 2)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800 dark:text-[#F1F5F9]">{u.name}</p>
                                                <p className="text-xs text-gray-400">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ROLE_COLORS[u.role]}`}>{ROLES[u.role]}</span>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[u.status]}`}>
                                            {u.status === 'active' ? 'نشط' : 'محظور'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{u.joined}</td>
                                    <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{u.lastActive}</td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-1">
                                            <ActionBtn icon={Eye}      tip="عرض الملف"      color="text-[#6C4CF1] hover:bg-[#6C4CF1]/10" onClick={() => setSelectedUser(u)} />
                                            <ActionBtn icon={Edit2} tip="تعديل" color="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10" onClick={undefined} />
                                            <ActionBtn icon={Shield} tip="تغيير الدور" color="text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-500/10" onClick={undefined} />
                                            <ActionBtn icon={u.status === 'active' ? Ban : RotateCcw} tip={u.status === 'active' ? 'حظر' : 'فك الحظر'} color="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10" onClick={() => toggleBan(u.id)} />
                                            <ActionBtn icon={Trash2} tip="حذف" color="text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10" onClick={undefined} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* User Profile Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 max-w-md w-full border border-gray-200 dark:border-[#334155]/60 shadow-2xl"
                        onClick={e => e.stopPropagation()} dir="rtl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C4CF1] to-[#00C2A8] flex items-center justify-center text-white text-xl font-bold">{selectedUser.name.slice(0,2)}</div>
                            <div>
                                <h3 className="font-black text-gray-900 dark:text-[#F1F5F9] text-lg">{selectedUser.name}</h3>
                                <p className="text-sm text-gray-400">{selectedUser.email}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${ROLE_COLORS[selectedUser.role]}`}>{ROLES[selectedUser.role]}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {[
                                { label: 'الاختبارات', value: selectedUser.tests },
                                { label: 'متوسط الدرجة', value: `${selectedUser.avg}%` },
                                { label: 'أقوى قسم', value: 'المفردة الشاذة' },
                                { label: 'أضعف قسم', value: 'الخطأ السياقي' },
                                { label: 'تاريخ التسجيل', value: selectedUser.joined },
                                { label: 'آخر نشاط', value: selectedUser.lastActive },
                            ].map((item, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-[#0F172A]/50 rounded-xl p-3 text-center">
                                    <p className="font-black text-[#6C4CF1] text-base">{item.value}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setSelectedUser(null)} className="w-full py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">إغلاق</button>
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
