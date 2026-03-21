import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, TrendingUp, Award } from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area,
    XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import StatCard from '../../StatCard';

const dailyActive = [
    { day: 'السبت', users: 210 }, { day: 'الأحد', users: 340 }, { day: 'الاثنين', users: 290 },
    { day: 'الثلاثاء', users: 410 }, { day: 'الأربعاء', users: 380 }, { day: 'الخميس', users: 520 }, { day: 'الجمعة', users: 180 },
];

const monthlyReg = [
    { month: 'يناير', users: 120 }, { month: 'فبراير', users: 180 }, { month: 'مارس', users: 240 },
    { month: 'أبريل', users: 200 }, { month: 'مايو', users: 320 }, { month: 'يونيو', users: 410 },
];

const sectionPerf = [
    { name: 'التناظر اللفظي', avg: 72 }, { name: 'إكمال الجمل', avg: 81 },
    { name: 'الخطأ السياقي', avg: 65 }, { name: 'استيعاب المقروء', avg: 74 }, { name: 'المفردة الشاذة', avg: 88 },
];

const completionData = [
    { name: 'مكتمل', value: 62, color: '#00C2A8' },
    { name: 'جزئي', value: 25, color: '#FFD166' },
    { name: 'لم يبدأ', value: 13, color: '#EF4444' },
];

export default function AnalyticsView() {
    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">تحليلات الموقع</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إحصائيات شاملة عن أداء المنصة</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label="المستخدمون النشطون اليوم" value="520"  icon={Activity}   color="#6C4CF1" change={12} index={0} />
                <StatCard label="مستخدم جديد هذا الشهر"   value="410"  icon={Users}      color="#00C2A8" change={8}  index={1} />
                <StatCard label="متوسط الدرجات الكلي"     value="76%"  icon={TrendingUp} color="#FFD166" change={3}  index={2} />
                <StatCard label="إكمال الكورسات"          value="62%"  icon={Award}      color="#EF4444" change={5}  index={3} />
            </div>

            {/* Daily Active + Monthly Reg */}
            <div className="grid lg:grid-cols-2 gap-4">
                <ChartCard title="المستخدمون النشطون يومياً" color="#6C4CF1">
                    <AreaChart data={dailyActive}>
                        <defs>
                            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6C4CF1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6C4CF1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.2} />
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} />
                        <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, color: '#F1F5F9', fontSize: 12 }} />
                        <Area type="monotone" dataKey="users" stroke="#6C4CF1" strokeWidth={2.5} fill="url(#g1)" />
                    </AreaChart>
                </ChartCard>

                <ChartCard title="التسجيلات الشهرية" color="#00C2A8">
                    <LineChart data={monthlyReg}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.2} />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} />
                        <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, color: '#F1F5F9', fontSize: 12 }} />
                        <Line type="monotone" dataKey="users" stroke="#00C2A8" strokeWidth={2.5} dot={{ r: 4, fill: '#00C2A8' }} />
                    </LineChart>
                </ChartCard>
            </div>

            {/* Section Perf + Completion */}
            <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <ChartCard title="متوسط أداء الطلاب حسب القسم" color="#FFD166">
                        <BarChart data={sectionPerf} barSize={32}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.2} vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                            <YAxis domain={[0,100]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, color: '#F1F5F9', fontSize: 12 }} />
                            <Bar dataKey="avg" radius={[8,8,0,0]}>
                                {sectionPerf.map((_, i) => (
                                    <Cell key={i} fill={['#6C4CF1','#00C2A8','#FFD166','#EF4444','#8B5CF6'][i % 5]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartCard>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none"
                >
                    <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9] text-sm mb-4">معدل إكمال الكورسات</h3>
                    <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                            <Pie data={completionData} cx="50%" cy="50%" innerRadius={45} outerRadius={68} dataKey="value" paddingAngle={3}>
                                {completionData.map((e, i) => <Cell key={i} fill={e.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, color: '#F1F5F9', fontSize: 12 }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 mt-2">
                        {completionData.map((d, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                    <span className="text-gray-600 dark:text-gray-400">{d.name}</span>
                                </div>
                                <span className="font-bold text-gray-900 dark:text-[#F1F5F9]">{d.value}%</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function ChartCard({ title, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none"
        >
            <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9] text-sm mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={200}>
                {children}
            </ResponsiveContainer>
        </motion.div>
    );
}