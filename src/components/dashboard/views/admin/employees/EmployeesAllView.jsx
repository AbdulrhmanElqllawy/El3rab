import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Edit2, Trash2, Shield, Award, Eye, BarChart3 } from 'lucide-react';

const STATUS_COLORS = {
    active:  'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400',
    inactive: 'bg-gray-100 dark:bg-gray-500/15 text-gray-600 dark:text-gray-400',
    onleave: 'bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
};

const DEPARTMENT_COLORS = {
    teaching: 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300',
    support: 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300',
    admin: 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300',
    technical: 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
};

const mockEmployees = [
    { id: 1, name: 'خالد يوسف', email: 'khalid@example.com', department: 'teaching', status: 'active', joinDate: '2023-11-05', salary: 3500, performance: 85, courses: 8, students: 150 },
    { id: 2, name: 'فاطمة الشهري', email: 'fatima@example.com', department: 'teaching', status: 'active', joinDate: '2023-10-01', salary: 3200, performance: 92, courses: 6, students: 120 },
    { id: 3, name: 'محمد علي', email: 'mohammad@example.com', department: 'technical', status: 'active', joinDate: '2024-01-15', salary: 4000, performance: 78, courses: 0, students: 0 },
    { id: 4, name: 'سارة محمود', email: 'sarah@example.com', department: 'support', status: 'onleave', joinDate: '2023-09-20', salary: 2800, performance: 88, courses: 3, students: 50 },
    { id: 5, name: 'علي الحمادي', email: 'ali@example.com', department: 'admin', status: 'active', joinDate: '2023-08-10', salary: 3800, performance: 95, courses: 0, students: 0 },
];

export default function EmployeesAllView() {
    const [search, setSearch] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState(mockEmployees);

    const filtered = employees.filter(e => {
        const matchesSearch = e.name.includes(search) || e.email.includes(search);
        const matchesDept = departmentFilter === 'all' || e.department === departmentFilter;
        const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
        return matchesSearch && matchesDept && matchesStatus;
    });

    const stats = [
        { label: 'إجمالي الموظفين', value: employees.length, icon: '👨‍💼', color: 'bg-blue-100 text-blue-600' },
        { label: 'الموظفون النشطون', value: employees.filter(e => e.status === 'active').length, icon: '✅', color: 'bg-green-100 text-green-600' },
        { label: 'متوسط الأداء', value: `${Math.round(employees.reduce((a, e) => a + e.performance, 0) / employees.length)}%`, icon: '📊', color: 'bg-[#6C4CF1]/10 text-[#6C4CF1]' },
        { label: 'في إجازة', value: employees.filter(e => e.status === 'onleave').length, icon: '🏖️', color: 'bg-yellow-100 text-yellow-600' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">إدارة الموظفين</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إدارة شاملة لجميع موظفي المنصة والأقسام والأداء</p>
                </div>
                <button className="flex items-center gap-2 bg-[#6C4CF1] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#5b3ee0] transition-colors shadow-sm flex-shrink-0">
                    <UserPlus className="w-4 h-4" />
                    موظف جديد
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Search */}
                <div className="lg:col-span-2 flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 rounded-xl px-4 py-2.5 shadow-sm">
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                        className="flex-1 bg-transparent text-sm text-gray-700 dark:text-[#F1F5F9] outline-none placeholder:text-gray-400"
                        placeholder="بحث بالاسم أو البريد..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        dir="rtl"
                    />
                </div>

                {/* Department Filter */}
                <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 rounded-xl px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none shadow-sm">
                    <option value="all">جميع الأقسام</option>
                    <option value="teaching">التدريس</option>
                    <option value="support">الدعم</option>
                    <option value="admin">الإدارة</option>
                    <option value="technical">التقني</option>
                </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">الحالة:</span>
                {['all', 'active', 'inactive', 'onleave'].map(st => (
                    <button key={st} onClick={() => setStatusFilter(st)} className={`text-xs px-3 py-1.5 rounded-lg transition-all ${statusFilter === st ? 'bg-[#6C4CF1] text-white' : 'bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
                        {st === 'all' ? 'الكل' : st === 'active' ? 'نشط' : st === 'onleave' ? 'إجازة' : 'غير نشط'}
                    </button>
                ))}
            </div>

            {/* Employees Table */}
            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full" dir="rtl">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-[#0F172A]/40 border-b border-gray-100 dark:border-[#334155]/50">
                                {['الموظف','القسم','الحالة','الأداء','الراتب','الإجراءات'].map(h => (
                                    <th key={h} className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3 whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                            {filtered.map((e) => (
                                <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors">
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C4CF1] to-[#00C2A8] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                {e.name.slice(0, 2)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800 dark:text-[#F1F5F9]">{e.name}</p>
                                                <p className="text-xs text-gray-400">{e.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${DEPARTMENT_COLORS[e.department]}`}>
                                            {e.department === 'teaching' ? 'تدريس' : e.department === 'support' ? 'دعم' : e.department === 'admin' ? 'إدارة' : 'تقني'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[e.status]}`}>
                                            {e.status === 'active' ? 'نشط' : e.status === 'onleave' ? 'إجازة' : 'غير نشط'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-12 h-1.5 bg-gray-200 dark:bg-[#334155] rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-[#6C4CF1] to-[#00C2A8]" style={{ width: `${e.performance}%` }} />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{e.performance}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5 text-xs font-semibold text-gray-600 dark:text-gray-400">${e.salary}</td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-1">
                                            <ActionBtn icon={Eye}     tip="عرض الملف"    color="text-[#6C4CF1] hover:bg-[#6C4CF1]/10" onClick={() => setSelectedEmployee(e)} />
                                            <ActionBtn icon={Edit2} tip="تعديل" color="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10" onClick={undefined} />
                                            <ActionBtn icon={Award} tip="تقييم الأداء" color="text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-500/10" onClick={undefined} />
                                            <ActionBtn icon={Trash2} tip="حذف" color="text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10" onClick={undefined} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Employee Profile Modal */}
            {selectedEmployee && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEmployee(null)}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 max-w-2xl w-full border border-gray-200 dark:border-[#334155]/60 shadow-2xl"
                        onClick={e => e.stopPropagation()} dir="rtl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C4CF1] to-[#00C2A8] flex items-center justify-center text-white text-2xl font-bold">{selectedEmployee.name.slice(0,2)}</div>
                            <div className="flex-1">
                                <h3 className="font-black text-gray-900 dark:text-[#F1F5F9] text-lg">{selectedEmployee.name}</h3>
                                <p className="text-sm text-gray-400">{selectedEmployee.email}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DEPARTMENT_COLORS[selectedEmployee.department]}`}>
                                        {selectedEmployee.department === 'teaching' ? 'تدريس' : selectedEmployee.department === 'support' ? 'دعم' : selectedEmployee.department === 'admin' ? 'إدارة' : 'تقني'}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[selectedEmployee.status]}`}>
                                        {selectedEmployee.status === 'active' ? 'نشط' : selectedEmployee.status === 'onleave' ? 'إجازة' : 'غير نشط'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-[#334155]">
                            {[
                                { label: 'الراتب الشهري', value: `$${selectedEmployee.salary}` },
                                { label: 'تقييم الأداء', value: `${selectedEmployee.performance}%` },
                                { label: 'الكورسات', value: selectedEmployee.courses },
                                { label: 'الطلاب', value: selectedEmployee.students },
                                { label: 'تاريخ التعيين', value: selectedEmployee.joinDate },
                                { label: 'المدة', value: '8 أشهر' },
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <p className="font-black text-[#6C4CF1] text-lg">{item.value}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setSelectedEmployee(null)} className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">إغلاق</button>
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
