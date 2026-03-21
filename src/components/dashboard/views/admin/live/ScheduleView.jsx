import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Eye, Edit2, Trash2, Play } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import StatCard from '../../../components/StatCard';

const scheduledLives = [
    {
        id: 1,
        title: 'شرح التناظر اللفظي',
        instructor: 'أ. محمد أحمد',
        date: '2024-03-25',
        time: '18:00',
        duration: 120,
        expectedViewers: 250,
        status: 'scheduled',
    },
    {
        id: 2,
        title: 'حل اختبارات تجريبية',
        instructor: 'أ. فاطمة علي',
        date: '2024-03-26',
        time: '20:00',
        duration: 90,
        expectedViewers: 180,
        status: 'scheduled',
    },
    {
        id: 3,
        title: 'أساسيات الكتابة الأكاديمية',
        instructor: 'أ. علي محمود',
        date: '2024-03-27',
        time: '19:00',
        duration: 60,
        expectedViewers: 320,
        status: 'scheduled',
    },
];

export default function LiveScheduleView() {
    const [lives, setLives] = useState(scheduledLives);
    const [selectedMonth, setSelectedMonth] = useState('مارس 2024');

    const stats = [
        { label: 'جلسات مجدولة', value: lives.length, icon: Calendar, color: 'purple' },
        { label: 'ساعات البث المتوقعة', value: (lives.reduce((sum, l) => sum + l.duration, 0) / 60).toFixed(1), icon: Clock, color: 'teal', subtitle: 'ساعة' },
        { label: 'المشاهدون المتوقعون', value: lives.reduce((sum, l) => sum + l.expectedViewers, 0), icon: Users, color: 'amber' },
        { label: 'متوسط المشاهدين', value: Math.round(lives.reduce((sum, l) => sum + l.expectedViewers, 0) / lives.length), icon: Eye, color: 'green' },
    ];

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('ar-SA', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="جدول البث المباشر"
                description="إدارة جدول البث المباشر والجلسات المجدولة"
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <StatCard 
                        key={stat.label} 
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        color={stat.color}
                        trend={undefined}
                        subtitle={stat.subtitle || undefined}
                        onClick={() => {}}
                    />
                ))}
            </div>

            {/* Calendar View */}
            <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">جدول البث</h3>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                    >
                        <option>مارس 2024</option>
                        <option>أبريل 2024</option>
                        <option>مايو 2024</option>
                    </select>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {lives.map((live, idx) => (
                        <motion.div
                            key={live.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-4 rounded-lg border border-gray-100 dark:border-[#334155]/50 hover:border-[#6C4CF1] hover:shadow-lg transition-all dark:hover:border-[#6C4CF1]/50"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Play className="w-5 h-5 text-[#6C4CF1]" />
                                        <h4 className="font-bold text-gray-900 dark:text-white">{live.title}</h4>
                                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400">
                                            {live.status === 'scheduled' ? 'مجدول' : 'قادم'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{live.instructor}</p>
                                    <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(live.date)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {live.time} ({live.duration} دقيقة)
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {live.expectedViewers} مشاهد متوقع
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
                                        title="تعديل"
                                    >
                                        <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                                        title="حذف"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
