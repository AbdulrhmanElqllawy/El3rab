import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Trash2, Eye, Calendar, Users } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import StatCard from '../../../components/StatCard';

const recordingsData = [
    { id: 1, title: 'شرح التناظر اللفظي - الجزء الأول', date: '2024-03-20', size: '2.4 GB', duration: 120, views: 450, instructor: 'أ. محمد أحمد' },
    { id: 2, title: 'حل اختبارات تجريبية -مع نقاش', date: '2024-03-19', size: '1.8 GB', duration: 90, views: 320, instructor: 'أ. فاطمة علي' },
    { id: 3, title: 'أساسيات الكتابة الأكاديمية', date: '2024-03-18', size: '1.2 GB', duration: 60, views: 280, instructor: 'أ. علي محمود' },
    { id: 4, title: 'استراتيجيات الحل السريع', date: '2024-03-17', size: '2.1 GB', duration: 110, views: 520, instructor: 'أ. محمد أحمد' },
];

export default function LiveRecordingsView() {
    const [recordings, setRecordings] = useState(recordingsData);
    const [selectedSort, setSelectedSort] = useState('recent');

    const stats = [
        { label: 'إجمالي التسجيلات', value: recordings.length, icon: Play, color: 'purple' },
        { label: 'إجمالي الساعات', value: (recordings.reduce((sum, r) => sum + r.duration, 0) / 60).toFixed(1), icon: Calendar, color: 'teal', subtitle: 'ساعة' },
        { label: 'المشاهدات الكلية', value: recordings.reduce((sum, r) => sum + r.views, 0), icon: Eye, color: 'amber' },
        { label: 'إجمالي الحجم', value: (recordings.reduce((sum, r) => sum + parseFloat(r.size), 0)).toFixed(1), icon: Users, color: 'green', subtitle: 'GB' },
    ];

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('ar-SA');
    };

    const sortedRecordings = [...recordings].sort((a, b) => {
        if (selectedSort === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (selectedSort === 'views') return b.views - a.views;
        return a.title.localeCompare(b.title);
    });

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="تسجيلات البث المباشر"
                description="أرشيف تسجيلات الجلسات المباشرة السابقة"
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

            {/* Filters and Sort */}
            <div className="flex items-center justify-between bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-4">
                <input
                    type="text"
                    placeholder="بحث في التسجيلات..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-gray-50 dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                />
                <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="ml-3 px-4 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-gray-50 dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                >
                    <option value="recent">الأحدث</option>
                    <option value="views">الأكثر مشاهدة</option>
                    <option value="title">الأبجدية</option>
                </select>
            </div>

            {/* Recordings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedRecordings.map((recording, idx) => (
                    <motion.div
                        key={recording.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden hover:shadow-lg transition-all"
                    >
                        {/* Preview */}
                        <div className="relative bg-gradient-to-br from-[#6C4CF1]/20 to-[#00C2A8]/20 aspect-video flex items-center justify-center group cursor-pointer">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            <Play className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                            <span className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/50 text-white text-xs font-bold">
                                {recording.duration} دقيقة
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{recording.title}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{recording.instructor}</p>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(recording.date)}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {recording.views}
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100 dark:border-[#334155] text-xs text-gray-600 dark:text-gray-400">
                                {recording.size}
                            </div>

                            <div className="flex gap-2 pt-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="flex-1 px-3 py-2 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    تشغيل
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                                    title="تحميل"
                                >
                                    <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-2 rounded-lg border border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
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
    );
}
