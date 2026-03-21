import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, UserCheck, UserX } from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area,
    XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import StatCard from '../../../StatCard';

const monthlyReg = [
    { month: 'يناير', total: 120, students: 100, employees: 15, admins: 5 },
    { month: 'فبراير', total: 180, students: 150, employees: 22, admins: 8 },
    { month: 'مارس', total: 240, students: 200, employees: 30, admins: 10 },
    { month: 'أبريل', total: 200, students: 165, employees: 28, admins: 7 },
    { month: 'مايو', total: 320, students: 270, employees: 40, admins: 10 },
    { month: 'يونيو', total: 410, students: 350, employees: 50, admins: 10 },
];

const dailyActive = [
    { day: 'السبت', active: 210 },
    { day: 'الأحد', active: 340 },
    { day: 'الاثنين', active: 290 },
    { day: 'الثلاثاء', active: 410 },
    { day: 'الأربعاء', active: 380 },
    { day: 'الخميس', active: 520 },
    { day: 'الجمعة', active: 180 },
];

const roleDistribution = [
    { name: 'طلاب', value: 850, color: '#6C4CF1' },
    { name: 'موظفون', value: 12, color: '#00C2A8' },
    { name: 'مديرون', value: 3, color: '#FFD166' },
];

const userRetention = [
    { week: 'أسبوع 1', retained: 95 },
    { week: 'أسبوع 2', retained: 82 },
    { week: 'أسبوع 3', retained: 68 },
    { week: 'أسبوع 4', retained: 55 },
];

export default function UserAnalyticsView() {
    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">تحليلات المستخدمين</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إحصائيات تفصيلية عن تسجيلات و نشاط المستخدمين</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label="إجمالي المستخدمين" value="865" icon={Users} color="#6C4CF1" change={15} changeLabel="هذا الشهر" index={0} />
                <StatCard label="مستخدمين نشطين اليوم" value="520" icon={UserCheck} color="#00C2A8" change={12} changeLabel="عن أمس" index={1} />
                <StatCard label="مستخدمين جدد" value="410" icon={TrendingUp} color="#FFD166" change={8} changeLabel="هذا الشهر" index={2} />
                <StatCard label="مستخدمين محظورين" value="12" icon={UserX} color="#EF4444" change={2} changeLabel="هذا الشهر" index={3} />
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Monthly Registration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-[#6C4CF1]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">التسجيلات الشهرية</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={monthlyReg}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6C4CF1" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#6C4CF1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="month" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Area type="monotone" dataKey="total" stroke="#6C4CF1" fillOpacity={1} fill="url(#colorTotal)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Role Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4">توزيع المستخدمين حسب الدور</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={roleDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                                {roleDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 mt-4">
                        {roleDistribution.map((d, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                    <span className="text-gray-600 dark:text-gray-400">{d.name}</span>
                                </div>
                                <span className="font-bold text-gray-900 dark:text-white">{d.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Daily Active Users */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <UserCheck className="w-5 h-5 text-[#00C2A8]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">النشاط اليومي</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={dailyActive}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="day" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Bar dataKey="active" fill="#00C2A8" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* User Retention */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <UserCheck className="w-5 h-5 text-[#FFD166]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">معدل الاحتفاظ بالمستخدمين</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={userRetention}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="week" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Line type="monotone" dataKey="retained" stroke="#FFD166" strokeWidth={2.5} dot={{ fill: '#FFD166', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
}
