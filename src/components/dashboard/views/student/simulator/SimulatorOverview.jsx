import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Clock, AlertCircle, Flame, BookOpen, BarChart3, Zap } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useSimulator } from '@/contexts/SimulatorContext';
import StatCard from '../../../StatCard';

export default function SimulatorOverview() {
    const {
        attempts,
        mistakes,
        getOverallStats,
        getPerformanceTrend,
        detectWeakTopics,
        getSuggestedPractice,
        getTimeAnalysis,
    } = useSimulator();

    const stats = getOverallStats();
    const trend = getPerformanceTrend(7);
    const weakTopics = detectWeakTopics(65);
    const suggested = getSuggestedPractice(3);
    const timeAnalysis = getTimeAnalysis();

    return (
        <div className="space-y-6" dir="rtl">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <StatCard
                    label="إجمالي الاختبارات"
                    value={stats.totalAttempts}
                    icon={BookOpen}
                    color="#6C4CF1"
                    change={0}
                    changeLabel=""
                    index={0}
                />
                <StatCard
                    label="متوسط الدقة"
                    value={`${stats.avgAccuracy}%`}
                    icon={Target}
                    color="#00C2A8"
                    change={0}
                    changeLabel=""
                    index={1}
                />
                <StatCard
                    label="الأخطاء الإجمالية"
                    value={stats.totalMistakes}
                    icon={AlertCircle}
                    color="#FFD166"
                    change={0}
                    changeLabel=""
                    index={2}
                />
                <StatCard
                    label="وقت الدراسة"
                    value={`${Math.round(stats.totalStudyTime / 3600)}h`}
                    icon={Clock}
                    color="#EF4444"
                    change={0}
                    changeLabel=""
                    index={3}
                />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Performance Trend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 dark:text-[#E2E8F0]">
                            الأداء على مدار أسبوع
                        </h3>
                        <TrendingUp className="w-5 h-5 text-[#00C2A8]" />
                    </div>

                    {trend.length > 0 ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={trend}>
                                <defs>
                                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6C4CF1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6C4CF1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis dataKey="date" stroke="#94A3B8" />
                                <YAxis stroke="#94A3B8" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1E293B',
                                        border: '1px solid #334155',
                                        borderRadius: '12px',
                                    }}
                                    labelStyle={{ color: '#E2E8F0' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="accuracy"
                                    stroke="#6C4CF1"
                                    fillOpacity={1}
                                    fill="url(#colorAccuracy)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-[#94A3B8]">
                            لا توجد بيانات حتى الآن
                        </div>
                    )}
                </motion.div>

                {/* Weak Topics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 dark:text-[#E2E8F0]">
                            الموضوعات الضعيفة
                        </h3>
                        <AlertCircle className="w-5 h-5 text-[#FFD166]" />
                    </div>

                    {weakTopics.length > 0 ? (
                        <div className="space-y-3">
                            {weakTopics.map((topic, idx) => (
                                <motion.div
                                    key={topic.category}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    className="flex items-center justify-between p-3 bg-[#FFD166]/10 rounded-xl border border-[#FFD166]/20"
                                >
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-[#E2E8F0]">
                                            {topic.category}
                                        </p>
                                        <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">
                                            {topic.attemptCount} محاولات
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-2xl text-[#FFD166]">
                                            {topic.avgAccuracy}%
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-[#94A3B8] py-8">
                            ممتاز! لا توجد موضوعات ضعيفة 🎉
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Time Analysis & Suggestions Row */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Time Analysis */}
                {timeAnalysis && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 dark:text-[#E2E8F0]">
                                تحليل الوقت
                            </h3>
                            <Clock className="w-5 h-5 text-[#00C2A8]" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-[#00C2A8]/10 to-[#2DD4BF]/10 rounded-xl p-4 border border-[#00C2A8]/20">
                                <p className="text-sm text-[#64748b] dark:text-[#94A3B8] mb-1">
                                    متوسط الوقت
                                </p>
                                <p className="text-2xl font-black text-[#00C2A8]">
                                    {timeAnalysis.avgTimePerQuestion}s
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="bg-gradient-to-br from-[#2DD4BF]/10 to-[#236D96]/10 rounded-xl p-3 border border-[#2DD4BF]/20">
                                    <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">
                                        أسئلة سريعة
                                    </p>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="font-black text-lg text-[#2DD4BF]">
                                            {timeAnalysis.fastQuestions}
                                        </span>
                                        <span className="text-xs text-[#64748b] dark:text-[#94A3B8]">
                                            ({timeAnalysis.fastAccuracy}%)
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-[#EF4444]/10 to-[#FB7185]/10 rounded-xl p-3 border border-[#EF4444]/20">
                                    <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">
                                        أسئلة بطيئة
                                    </p>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="font-black text-lg text-[#EF4444]">
                                            {timeAnalysis.slowQuestions}
                                        </span>
                                        <span className="text-xs text-[#64748b] dark:text-[#94A3B8]">
                                            ({timeAnalysis.slowAccuracy}%)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Suggested Practice */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 dark:text-[#E2E8F0]">
                            الاختبارات المقترحة
                        </h3>
                        <Zap className="w-5 h-5 text-[#FFD166]" />
                    </div>

                    {suggested.length > 0 ? (
                        <div className="space-y-3">
                            {suggested.map((exam, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + idx * 0.1 }}
                                    className="p-3 bg-gradient-to-l from-[#8B5CF6]/10 to-[#236D96]/10 rounded-xl border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/40 transition-all cursor-pointer"
                                >
                                    <p className="font-bold text-gray-900 dark:text-[#E2E8F0] text-sm">
                                        {exam.reason}
                                    </p>
                                    <p className="text-xs text-[#64748b] dark:text-[#94A3B8] mt-1">
                                        الصعوبة: {exam.difficulty === 'easy' ? 'سهل' : 'متوسط'}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-[#94A3B8] py-8">
                            لا توجد اختبارات مقترحة حالياً
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
