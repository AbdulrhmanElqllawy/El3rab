import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';
import PageHeader from '../../../components/PageHeader';

const resultsData = [
    { name: 'اختبار 1', students: 234, passed: 187, failed: 47, average: 78 },
    { name: 'اختبار 2', students: 198, passed: 156, failed: 42, average: 81 },
    { name: 'اختبار 3', students: 212, passed: 178, failed: 34, average: 85 },
];

const performanceData = [
    { name: 'الأسبوع 1', score: 72 },
    { name: 'الأسبوع 2', score: 75 },
    { name: 'الأسبوع 3', score: 78 },
    { name: 'الأسبوع 4', score: 82 },
];

export default function AdminExamsResultsView() {
    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader title="نتائج الاختبارات" description="عرض نتائج وإحصائيات الاختبارات" />

            <div className="grid lg:grid-cols-2 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#1E293B] rounded-xl p-5 border border-gray-100 dark:border-[#334155]/50"
                >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[#6C4CF1]" />
                        النتائج الإجمالية
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={resultsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Bar dataKey="passed" stackId="a" fill="#6C4CF1" />
                            <Bar dataKey="failed" stackId="a" fill="#EF4444" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-[#1E293B] rounded-xl p-5 border border-gray-100 dark:border-[#334155]/50"
                >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#00C2A8]" />
                        متوسط الأداء
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Line type="monotone" dataKey="score" stroke="#00C2A8" strokeWidth={2} dot={{ fill: '#00C2A8' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
}
