import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useSimulator } from '@/contexts/SimulatorContext';

export default function AnalyticsView() {
    const { getExamAnalytics, getQuestionAnalytics, getPerformanceTrend } = useSimulator();
    const [view, setView] = useState('category'); // category or question

    const examAnalytics = getExamAnalytics();
    const questionAnalytics = getQuestionAnalytics();
    const performanceTrend = getPerformanceTrend(30);

    const COLORS = ['#6C4CF1', '#00C2A8', '#FFD166', '#FF5252', '#2DD4BF', '#8B5CF6'];

    // Prepare category performance data for pie chart
    const categoryData = Object.entries(examAnalytics).map(([type, data]) => ({
        name: {
            'level': 'تحديد المستوى',
            'full': 'الشامل',
            'banks': 'البنوك',
            'levelup': 'رفع المستوى',
        }[type] || type,
        value: data.avgScore || 0,
        attempts: data.attempts,
    })).filter(d => d.attempts > 0);

    // Prepare top/bottom questions
    const topQuestions = [...questionAnalytics]
        .sort((a, b) => b.successRate - a.successRate)
        .slice(0, 5);

    const bottomQuestions = [...questionAnalytics]
        .sort((a, b) => a.successRate - b.successRate)
        .slice(0, 5);

    return (
        <div className="space-y-6" dir="rtl">
            {/* Performance Trend - Full Month */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
            >
                <h3 className="font-bold text-gray-900 dark:text-[#E2E8F0] mb-4">
                    الأداء على مدار شهر
                </h3>

                {performanceTrend.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="date" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1E293B',
                                    border: '1px solid #334155',
                                    borderRadius: '12px',
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="accuracy"
                                stroke="#6C4CF1"
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                name="الدقة %"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-64 flex items-center justify-center text-[#94A3B8]">
                        لا توجد بيانات
                    </div>
                )}
            </motion.div>

            {/* Category Performance */}
            {categoryData.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <h3 className="font-bold text-gray-900 dark:text-[#E2E8F0] mb-4">
                        متوسط الأداء حسب نوع الاختبار
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${Math.round(value)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1E293B',
                                    border: '1px solid #334155',
                                    borderRadius: '12px',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {categoryData.map((item, idx) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                                />
                                <span className="text-sm text-[#64748b] dark:text-[#94A3B8] font-bold">
                                    {item.name}: {Math.round(item.value)}% ({item.attempts})
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Top Questions vs Weak Questions */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Best Performing Questions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <h3 className="font-bold text-gray-900 dark:text-[#E2E8F0] mb-4 flex items-center gap-2">
                        <span className="text-2xl">✨</span>
                        أفضل أسئلتك
                    </h3>

                    {topQuestions.length > 0 ? (
                        <div className="space-y-2">
                            {topQuestions.map((q, idx) => (
                                <motion.div
                                    key={q.questionId}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.05 }}
                                    className="p-3 bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 rounded-lg"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold text-gray-900 dark:text-[#E2E8F0]">
                                            {q.questionText?.substring(0, 40)}...
                                        </span>
                                        <span className="text-lg font-black text-[#2DD4BF]">
                                            {q.successRate}%
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">
                                        {q.attempts} محاولات · {q.category}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-[#94A3B8] text-sm">لا توجد بيانات</p>
                    )}
                </motion.div>

                {/* Weakest Performing Questions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <h3 className="font-bold text-gray-900 dark:text-[#E2E8F0] mb-4 flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        أضعف أسئلتك
                    </h3>

                    {bottomQuestions.length > 0 ? (
                        <div className="space-y-2">
                            {bottomQuestions.map((q, idx) => (
                                <motion.div
                                    key={q.questionId}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.05 }}
                                    className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold text-gray-900 dark:text-[#E2E8F0]">
                                            {q.questionText?.substring(0, 40)}...
                                        </span>
                                        <span className="text-lg font-black text-[#EF4444]">
                                            {q.successRate}%
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">
                                        {q.attempts} محاولات · {q.category}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-[#94A3B8] text-sm">لا توجد بيانات</p>
                    )}
                </motion.div>
            </div>

            {/* Category Performance Details */}
            {Object.keys(examAnalytics).length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <h3 className="font-bold text-gray-900 dark:text-[#E2E8F0] mb-4">
                        تفاصيل الأداء حسب الفئة
                    </h3>

                    <div className="space-y-3">
                        {Object.entries(examAnalytics).map(([type, data]) => (
                            data.attempts > 0 && (
                                <div key={type} className="p-4 bg-gray-50 dark:bg-[#0F172A]/50 rounded-lg border border-gray-200 dark:border-[#334155]/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-bold text-gray-900 dark:text-[#E2E8F0]">
                                            {{
                                                'level': 'تحديد المستوى',
                                                'full': 'الاختبار الشامل',
                                                'banks': 'بنوك المحوسب',
                                                'levelup': 'رفع المستوى',
                                            }[type] || type}
                                        </h4>
                                        <span className="text-sm font-bold text-[#64748b] dark:text-[#94A3B8]">
                                            {data.attempts} محاولات
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 text-sm">
                                        <div>
                                            <p className="text-[#64748b] dark:text-[#94A3B8] text-xs mb-1">متوسط</p>
                                            <p className="font-black text-lg text-[#6C4CF1]">
                                                {Math.round(data.avgScore)}%
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[#64748b] dark:text-[#94A3B8] text-xs mb-1">أفضل</p>
                                            <p className="font-black text-lg text-[#2DD4BF]">
                                                {data.bestScore}%
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[#64748b] dark:text-[#94A3B8] text-xs mb-1">الوقت</p>
                                            <p className="font-black text-lg text-[#00C2A8]">
                                                {Math.round(data.totalDuration / data.attempts / 60)}د
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
