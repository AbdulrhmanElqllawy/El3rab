import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Target, CheckCircle2, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EnhancedEmptyState';
import { StatCardGroup } from '../../components/EnhancedStatCard';
import { Card, CardHeader, CardBody, ProgressBadge, StatusBadge } from '../../components/EnhancedCardComponents';

const plans = [
    { id: 1, name: 'خطة الأسبوع', startDate: '2024-03-20', endDate: '2024-03-26', progress: 60, tasks: 12, completed: 7, color: '#6C4CF1', status: 'in-progress' },
    { id: 2, name: 'خطة الشهر', startDate: '2024-03-01', endDate: '2024-03-31', progress: 45, tasks: 30, completed: 13, color: '#00C2A8', status: 'in-progress' },
    { id: 3, name: 'خطة فصلية', startDate: '2024-01-01', endDate: '2024-03-31', progress: 55, tasks: 60, completed: 33, color: '#FFD166', status: 'completed' },
];

export default function StudentPlansView() {
    const [filter, setFilter] = useState('all');
    const [loading] = useState(false);
    const filtered = filter === 'all' ? plans : plans.filter(p => p.status === filter);
    const stats = [
        { id: 1, label: 'إجمالي الخطط', value: plans.length, icon: Target, color: 'purple' },
        { id: 2, label: 'الخطط المكتملة', value: plans.filter(p => p.progress === 100).length, icon: CheckCircle2, color: 'teal' },
        { id: 3, label: 'المهام المنجزة', value: plans.reduce((a, p) => a + p.completed, 0), icon: Clock, color: 'green' },
        { id: 4, label: 'متوسط التقدم', value: Math.round(plans.reduce((a, p) => a + p.progress, 0) / plans.length), format: 'percentage', icon: Calendar, color: 'amber' },
    ];
    return (
        <div className="p-4 lg:p-6 space-y-8" dir="rtl">
            <PageHeader
                title="خطط المذاكرة"
                description="تتبع خططك وأهدافك الدراسية وتنظم وقتك بفعالية"
                breadcrumbs={['الرئيسية', 'الخطط']}
            />

            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">ملخص الخطط</h2>
                <StatCardGroup stats={stats} columns={4} loading={loading} />
            </div>

            <div className="flex gap-2 flex-wrap">
                {['all', 'in-progress', 'completed'].map(f => (
                    <motion.button
                        key={f}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                            filter === f
                                ? 'bg-[#6C4CF1] text-white shadow-lg shadow-[#6C4CF1]/20'
                                : 'bg-gray-100 dark:bg-[#334155] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#475569]'
                        }`}
                    >
                        {f === 'all' ? 'الكل' : f === 'in-progress' ? 'جارية' : 'مكتملة'}
                    </motion.button>
                ))}
            </div>

            {filtered.length > 0 ? (
            <div className="space-y-4">
                {filtered.map((plan, idx) => (
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ x: -4 }}
                    >
                        <Card elevated interactive>
                            <CardBody>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{plan.name}</h3>
                                            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {plan.startDate} إلى {plan.endDate}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold" style={{ color: plan.color }}>
                                                {plan.progress}%
                                            </div>
                                            <StatusBadge
                                                status={{
                                                    type: plan.status === 'completed' ? 'success' : 'info',
                                                    label: plan.status === 'completed' ? 'مكتملة' : 'جارية'
                                                }}
                                                size="sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">{plan.completed} / {plan.tasks} مهام</span>
                                            <span className="font-semibold text-[#6C4CF1]">{Math.round((plan.completed / plan.tasks) * 100)}% المهام المكتملة</span>
                                        </div>
                                        <div className="relative h-3 bg-gray-200 dark:bg-[#334155] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${plan.progress}%` }}
                                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                                className="h-full bg-gradient-to-r from-[#6C4CF1] to-[#5b3ee0]"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 bg-[#6C4CF1] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors"
                                        >
                                            عرض التفاصيل
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 border border-gray-300 dark:border-[#334155] text-gray-700 dark:text-gray-300 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
                                        >
                                            تعديل
                                        </motion.button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </motion.div>
                ))}
            </div>
            ) : (
                <EmptyState
                    title="لا توجد خطط"
                    description="ابدأ بإنشاء خطة دراسية لتنظيم وقتك"
                    action={{ label: 'إنشاء خطة', onClick: () => setFilter('all') }}
                />
            )}

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3"
            >
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">نصيحة</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">حاول الالتزام بخطتك اليومية للحصول على أفضل النتائج والمحافظة على التركيز</p>
                </div>
            </motion.div>
        </div>
    );
}
