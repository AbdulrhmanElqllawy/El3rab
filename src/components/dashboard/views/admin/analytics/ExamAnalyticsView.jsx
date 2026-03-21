import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, BarChart3, TrendingDown, Zap } from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
    ScatterChart, Scatter, ComposedChart
} from 'recharts';
import StatCard from '../../../StatCard';

const examTrends = [
    { month: 'يناير', exams: 45, participants: 320 },
    { month: 'فبراير', exams: 52, participants: 380 },
    { month: 'مارس', exams: 68, participants: 450 },
    { month: 'أبريل', exams: 75, participants: 510 },
    { month: 'مايو', exams: 89, participants: 620 },
    { month: 'يونيو', exams: 102, participants: 750 },
];

const scoreDistribution = [
    { range: 'A (90-100)', count: 120 },
    { range: 'B (80-89)', count: 280 },
    { range: 'C (70-79)', count: 320 },
    { range: 'D (60-69)', count: 180 },
    { range: 'F (أقل من 60)', count: 90 },
];

const sectionPerformance = [
    { name: 'التناظر اللفظي', avgScore: 78, attempts: 450 },
    { name: 'إكمال الجمل', avgScore: 82, attempts: 420 },
    { name: 'الخطأ السياقي', avgScore: 71, attempts: 380 },
    { name: 'استيعاب المقروء', avgScore: 85, attempts: 410 },
    { name: 'المفردة الشاذة', avgScore: 88, attempts: 395 },
];

const completionTime = [
    { name: '0-30 دقيقة', count: 45, avgScore: 62 },
    { name: '30-60 دقيقة', count: 180, avgScore: 76 },
    { name: '60-90 دقيقة', count: 290, avgScore: 82 },
    { name: 'أزيد من 90', count: 85, avgScore: 79 },
];

export default function ExamAnalyticsView() {
    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">تحليلات الاختبارات</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إحصائيات شاملة عن الاختبارات والأداء</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label="إجمالي الاختبارات" value="564" icon={ClipboardList} color="#6C4CF1" change={18} changeLabel="هذا الشهر" index={0} />
                <StatCard label="المشاركين الكلي" value="3.2K" icon={Zap} color="#00C2A8" change={22} changeLabel="هذا الشهر" index={1} />
                <StatCard label="متوسط الدرجات" value="78%" icon={BarChart3} color="#FFD166" change={5} changeLabel="عن الشهر الماضي" index={2} />
                <StatCard label="معدل الإكمال" value="84%" icon={TrendingDown} color="#EF4444" change={3} changeLabel="هذا الأسبوع" index={3} />
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Exam Growth Trend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <ClipboardList className="w-5 h-5 text-[#6C4CF1]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">نمو الاختبارات والمشاركة</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <ComposedChart data={examTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="month" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Bar dataKey="exams" fill="#6C4CF1" radius={[8, 8, 0, 0]} />
                            <Line type="monotone" dataKey="participants" stroke="#00C2A8" strokeWidth={2.5} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Score Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-5 h-5 text-[#00C2A8]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">توزيع الدرجات</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={scoreDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="range" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Bar dataKey="count" fill="#00C2A8" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Section Performance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-5 h-5 text-[#FFD166]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">أداء الأقسام</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={sectionPerformance}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" stroke="#94A3B8" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Bar dataKey="avgScore" fill="#FFD166" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Completion Time Analysis */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-[#EF4444]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">تحليل وقت الإكمال</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" stroke="#94A3B8" type="category" />
                            <YAxis dataKey="avgScore" stroke="#94A3B8" type="number" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} cursor={{ fill: 'rgba(108, 76, 241, 0.1)' }} />
                            <Scatter name="الدرجات حسب الوقت" data={completionTime} fill="#EF4444" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
}
