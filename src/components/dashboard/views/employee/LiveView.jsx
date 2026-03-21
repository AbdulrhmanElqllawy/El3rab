import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, Calendar, Users, Clock } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { StatCardGroup } from '../../components/EnhancedStatCard';
import { Card, CardHeader, CardBody } from '../../components/EnhancedCardComponents';
import EmptyState from '../../components/EnhancedEmptyState';

const liveClasses = [
    { id: 1, title: 'شرح مباشر: التناظر اللفظي', date: '2024-03-21', time: '15:00', duration: 90, viewers: 256, status: 'جارية' },
    { id: 2, title: 'جلسة أسئلة وأجوبة', date: '2024-03-22', time: '16:30', duration: 60, viewers: 0, status: 'مجدولة' },
];

export default function EmployeeLiveView() {
    const [loading] = useState(false);
    
    const stats = [
        { id: 1, label: 'الفصول المنشأة', value: liveClasses.length, icon: Play, color: 'purple' },
        { id: 2, label: 'الفصول الجارية', value: liveClasses.filter(c => c.status === 'جارية').length, icon: Play, color: 'red' },
        { id: 3, label: 'إجمالي المشاهدين', value: liveClasses.reduce((a, c) => a + c.viewers, 0), icon: Users, color: 'teal' },
        { id: 4, label: 'ساعات البث', value: liveClasses.reduce((a, c) => a + c.duration, 0) / 60, format: 'decimal', icon: Clock, color: 'amber', suffix: 'ساعة' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-8" dir="rtl">
            <PageHeader
                title="إدارة البث المباشر"
                description="أنشئ وأدر الفصول المباشرة التفاعلية"
                breadcrumbs={['الرئيسية', 'البث المباشر']}
                actions={
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        فصل مباشر جديد
                    </motion.button>
                }
            />

            {/* Stats */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">ملخص البث</h2>
                <StatCardGroup stats={stats} columns={4} loading={loading} />
            </div>

            {/* Live Classes */}
            {liveClasses.length > 0 ? (
                <div className="space-y-4">
                    {liveClasses.map((cls, idx) => (
                        <motion.div
                            key={cls.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card elevated interactive>
                                <CardBody>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{cls.title}</h3>
                                            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {cls.date}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {cls.time} • {cls.duration} دقيقة
                                                </div>
                                                {cls.viewers > 0 && (
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {cls.viewers} مشاهد
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                cls.status === 'جارية'
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 animate-pulse'
                                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                            }`}>
                                                {cls.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            className="flex-1 bg-[#6C4CF1] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Play className="w-4 h-4" />
                                            تفاصيل
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            className="flex-1 border border-gray-300 dark:border-[#334155] text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
                                        >
                                            تعديل
                                        </motion.button>
                                    </div>
                                </CardBody>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="لا توجد فصول مباشرة"
                    description="ابدأ بإنشاء فصل مباشر جديد"
                    action={{ label: 'فصل جديد' }}
                />
            )}
        </div>
    );
}
