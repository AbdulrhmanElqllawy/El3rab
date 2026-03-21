import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, CheckCircle2, TrendingUp } from 'lucide-react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';
import StatCard from '../../../StatCard';

const courseEnrollment = [
    { name: 'التناظر اللفظي', enrolled: 320, completed: 240, inProgress: 80 },
    { name: 'إكمال الجمل', enrolled: 280, completed: 195, inProgress: 85 },
    { name: 'الخطأ السياقي', enrolled: 210, completed: 140, inProgress: 70 },
    { name: 'استيعاب المقروء', enrolled: 290, completed: 225, inProgress: 65 },
    { name: 'المفردة الشاذة', enrolled: 350, completed: 280, inProgress: 70 },
];

const coursePopularity = [
    { name: 'التناظر اللفظي', value: 320, color: '#6C4CF1' },
    { name: 'المفردة الشاذة', value: 350, color: '#00C2A8' },
    { name: 'استيعاب المقروء', value: 290, color: '#FFD166' },
    { name: 'إكمال الجمل', value: 280, color: '#EF4444' },
    { name: 'الخطأ السياقي', value: 210, color: '#8B5CF6' },
];

const engagementTrend = [
    { month: 'يناير', activeStudents: 145, avgTime: 32 },
    { month: 'فبراير', activeStudents: 180, avgTime: 38 },
    { month: 'مارس', activeStudents: 220, avgTime: 42 },
    { month: 'أبريل', activeStudents: 195, avgTime: 39 },
    { month: 'مايو', activeStudents: 280, avgTime: 48 },
    { month: 'يونيو', activeStudents: 310, avgTime: 52 },
];

const completionRate = [
    { course: 'التناظر اللفظي', rate: 75 },
    { course: 'إكمال الجمل', rate: 70 },
    { course: 'الخطأ السياقي', rate: 67 },
    { course: 'الاستيعاب', rate: 78 },
    { course: 'المفردة الشاذة', rate: 80 },
];

export default function CourseAnalyticsView() {
    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">تحليلات الكورسات</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إحصائيات التسجيل والإكمال والمشاركة</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label="إجمالي الكورسات" value="24" icon={BookOpen} color="#6C4CF1" change={2} changeLabel="هذا الشهر" index={0} />
                <StatCard label="الطلاب النشطين" value="1.35K" icon={Users} color="#00C2A8" change={145} changeLabel="هذا الشهر" index={1} />
                <StatCard label="متوسط الإكمال" value="74%" icon={CheckCircle2} color="#FFD166" change={6} changeLabel="هذا الشهر" index={2} />
                <StatCard label="متوسط المشاركة" value="43 دقيقة" icon={TrendingUp} color="#EF4444" change={8} changeLabel="عن الشهر الماضي" index={3} />
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Course Enrollment Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-[#6C4CF1]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">حالة التسجيل - الدورات الرئيسية</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={courseEnrollment}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Legend />
                            <Bar dataKey="completed" fill="#00C2A8" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="inProgress" fill="#FFD166" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Course Popularity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4">الكورسات الأكثر شهرة</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={coursePopularity} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={2}>
                                {coursePopularity.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 mt-3">
                        {coursePopularity.map((d, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
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
                {/* Student Engagement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-[#FFD166]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">المشاركة والنشاط الشهري</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={engagementTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="month" stroke="#94A3B8" />
                            <YAxis yAxisId="left" stroke="#94A3B8" />
                            <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="activeStudents" stroke="#6C4CF1" strokeWidth={2.5} dot={{ fill: '#6C4CF1', r: 3 }} />
                            <Line yAxisId="right" type="monotone" dataKey="avgTime" stroke="#00C2A8" strokeWidth={2.5} dot={{ fill: '#00C2A8', r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Completion Rate */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-[#00C2A8]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">معدل الإكمال حسب الكورس</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={completionRate} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis type="number" stroke="#94A3B8" />
                            <YAxis dataKey="course" type="category" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Bar dataKey="rate" fill="#00C2A8" radius={[0, 8, 8, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
}
