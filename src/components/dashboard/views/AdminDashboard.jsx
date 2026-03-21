import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, HelpCircle, Activity, TrendingUp, UserPlus, Edit2, Trash2, Shield } from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import StatCard from '../StatCard';

const monthlyData = [
    { month: 'يناير', users: 120 }, { month: 'فبراير', users: 180 }, { month: 'مارس', users: 240 },
    { month: 'أبريل', users: 200 }, { month: 'مايو',   users: 320 }, { month: 'يونيو', users: 410 },
];

const sectionPerf = [
    { name: 'التناظر اللفظي', avg: 72 },
    { name: 'إكمال الجمل',    avg: 81 },
    { name: 'الخطأ السياقي',  avg: 65 },
    { name: 'استيعاب المقروء', avg: 74 },
    { name: 'المفردة الشاذة', avg: 88 },
];

const pieData = [
    { name: 'طلاب', value: 850, color: '#6C4CF1' },
    { name: 'موظفون', value: 12, color: '#00C2A8' },
    { name: 'مديرون', value: 3, color: '#FFD166' },
];

const sampleUsers = [
    { id: 1, name: 'أحمد محمد',  email: 'ahmed@example.com', role: 'student',  tests: 42, avg: 78 },
    { id: 2, name: 'سارة علي',   email: 'sara@example.com',  role: 'student',  tests: 18, avg: 91 },
    { id: 3, name: 'خالد يوسف',  email: 'khalid@example.com', role: 'employee', tests: 5,  avg: 85 },
];

const roleLabels = { student: 'طالب', employee: 'موظف', admin: 'مدير' };
const roleColors = { student: 'bg-[#6C4CF1]/10 text-[#6C4CF1]', employee: 'bg-[#00C2A8]/10 text-[#00C2A8]', admin: 'bg-[#FFD166]/20 text-yellow-700 dark:text-[#FFD166]' };

export default function AdminDashboard() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label="إجمالي المستخدمين" value="865"  icon={Users}     color="#6C4CF1" change={15} changeLabel="هذا الشهر" index={0} />
                <StatCard label="إجمالي الاختبارات" value="4.2K" icon={Activity}  color="#00C2A8" change={22} changeLabel="هذا الشهر" index={1} />
                <StatCard label="الدورات النشطة"    value="9"    icon={BookOpen}  color="#FFD166" change={0}  changeLabel="لا تغيير" index={2} />
                <StatCard label="إجمالي الأسئلة"    value="1.8K" icon={HelpCircle} color="#EF4444" change={8} changeLabel="هذا الشهر" index={3} />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-4">
                {/* Monthly Registrations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="lg:col-span-2 bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-[#6C4CF1]" />
                        <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9] text-sm">التسجيلات الشهرية</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.2} />
                            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                            <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} />
                            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, color: '#F1F5F9', fontSize: 12 }} />
                            <Line type="monotone" dataKey="users" stroke="#6C4CF1" strokeWidth={2.5} dot={{ r: 4, fill: '#6C4CF1' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none"
                >
                    <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9] text-sm mb-4">توزيع المستخدمين</h3>
                    <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, color: '#F1F5F9', fontSize: 12 }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 mt-2">
                        {pieData.map((d, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                    <span className="text-gray-600 dark:text-gray-400">{d.name}</span>
                                </div>
                                <span className="font-bold text-gray-900 dark:text-[#F1F5F9]">{d.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Section Performance Bar Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none"
            >
                <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9] text-sm mb-4">متوسط أداء الطلاب حسب القسم</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={sectionPerf} barSize={36}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.2} vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                        <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, color: '#F1F5F9', fontSize: 12 }} />
                        <Bar dataKey="avg" radius={[8, 8, 0, 0]}>
                            {sectionPerf.map((_, i) => (
                                <Cell key={i} fill={['#6C4CF1','#00C2A8','#FFD166','#EF4444','#8B5CF6'][i % 5]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>

            {/* User Management */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none overflow-hidden"
            >
                <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-[#334155]/50">
                    <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9]">إدارة المستخدمين</h3>
                    <button className="flex items-center gap-2 bg-[#6C4CF1] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#5b3ee0] transition-colors">
                        <UserPlus className="w-4 h-4" />
                        مستخدم جديد
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full" dir="rtl">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-[#0F172A]/40">
                                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">المستخدم</th>
                                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">الدور</th>
                                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3 hidden md:table-cell">الاختبارات</th>
                                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3 hidden md:table-cell">المتوسط</th>
                                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                            {sampleUsers.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors cursor-pointer" onClick={() => setSelectedUser(u)}>
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
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleColors[u.role]}`}>{roleLabels[u.role]}</span>
                                    </td>
                                    <td className="px-4 py-3.5 hidden md:table-cell">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{u.tests}</span>
                                    </td>
                                    <td className="px-4 py-3.5 hidden md:table-cell">
                                        <span className={`text-sm font-bold ${u.avg >= 80 ? 'text-[#00C2A8]' : u.avg >= 60 ? 'text-[#FFD166]' : 'text-red-500'}`}>{u.avg}%</span>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-1.5">
                                            <button onClick={e => { e.stopPropagation(); }} className="p-1.5 rounded-lg text-gray-400 hover:text-[#6C4CF1] hover:bg-[#6C4CF1]/10 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                                            <button onClick={e => { e.stopPropagation(); }} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                                            <button onClick={e => { e.stopPropagation(); }} className="p-1.5 rounded-lg text-gray-400 hover:text-[#FFD166] hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-all"><Shield className="w-3.5 h-3.5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Student Profile Modal */}
            {selectedUser && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedUser(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 max-w-sm w-full border border-gray-200 dark:border-[#334155]/60 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                        dir="rtl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C4CF1] to-[#00C2A8] flex items-center justify-center text-white text-xl font-bold">
                                {selectedUser.name.slice(0, 2)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9]">{selectedUser.name}</h3>
                                <p className="text-sm text-gray-400">{selectedUser.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'الاختبارات', value: selectedUser.tests },
                                { label: 'متوسط الدرجة', value: `${selectedUser.avg}%` },
                                { label: 'أقوى قسم', value: 'المفردة الشاذة' },
                                { label: 'أضعف قسم', value: 'الخطأ السياقي' },
                            ].map((item, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-[#0F172A]/50 rounded-xl p-3 text-center">
                                    <p className="text-lg font-black text-[#6C4CF1]">{item.value}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setSelectedUser(null)} className="w-full mt-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">إغلاق</button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}