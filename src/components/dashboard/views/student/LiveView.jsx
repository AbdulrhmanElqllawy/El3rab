import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Users, Calendar, Zap } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EnhancedEmptyState';
import { StatCardGroup } from '../../components/EnhancedStatCard';
import { Card, CardHeader, CardBody } from '../../components/EnhancedCardComponents';

const liveClasses = [
    { id: 1, title: 'التناظر اللفظي المباشر', instructor: 'أ. محمد السلمي', time: '3:00 PM', duration: 90, viewers: 256, status: 'live', color: '#FF5252' },
    { id: 2, title: 'شرح إكمال الجمل', instructor: 'أ. فاطمة العتيبي', time: '4:30 PM', duration: 120, viewers: 180, status: 'scheduled', color: '#6C4CF1' },
    { id: 3, title: 'مراجعة عامة', instructor: 'أ. عمر الدعجاني', time: 'غداً 10:00 صباحاً', duration: 60, viewers: 0, status: 'upcoming', color: '#00C2A8' },
];

export default function StudentLiveView() {
    const [filter, setFilter] = useState('all');
    const [loading] = useState(false);
    
    const filtered = filter === 'all' ? liveClasses : liveClasses.filter(c => c.status === filter);
    
    const stats = [
        { id: 1, label: 'الفصول المباشرة', value: liveClasses.filter(c => c.status === 'live').length, icon: Zap, color: 'red' },
        { id: 2, label: 'المحاضرات المجدولة', value: liveClasses.filter(c => c.status === 'scheduled').length, icon: Calendar, color: 'purple' },
        { id: 3, label: 'إجمالي المشاهدين', value: liveClasses.reduce((a, c) => a + c.viewers, 0), icon: Users, color: 'teal' },
        { id: 4, label: 'ساعات البث', value: liveClasses.reduce((a, c) => a + c.duration, 0), format: 'hours', icon: Clock, color: 'amber' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-8" dir="rtl">
            <PageHeader
                title="الفصول المباشرة"
                description="شارك في الفصول التفاعلية المباشرة مع المعلمين"
                breadcrumbs={['الرئيسية', 'الفصول المباشرة']}
            />

            {/* Stats */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">ملخص الفصول</h2>
                <StatCardGroup stats={stats} columns={4} loading={loading} />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                {['all', 'live', 'scheduled', 'upcoming'].map(f => (
                    <motion.button
                        key={f}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            filter === f
                                ? 'bg-[#6C4CF1] text-white shadow-lg shadow-[#6C4CF1]/20'
                                : 'bg-gray-100 dark:bg-[#334155] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#475569]'
                        }`}
                    >
                        {f === 'all' ? 'الكل' : f === 'live' ? 'البث المباشر' : f === 'scheduled' ? 'مجدولة' : 'قادمة'}
                    </motion.button>
                ))}
            </div>

            {/* Classes Grid */}
            {filtered.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((cls, idx) => (
                        <motion.div
                            key={cls.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -4 }}
                        >
                            <Card elevated interactive>
                                <div className="relative h-32 overflow-hidden rounded-t-xl" style={{ backgroundColor: cls.color }}>
                                    {cls.status === 'live' && (
                                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                            <Zap className="w-3 h-3" />
                                            مباشر الآن
                                        </div>
                                    )}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition-colors"
                                    >
                                        <Play className="w-12 h-12 text-white fill-white" />
                                    </motion.button>
                                </div>
                                <CardBody>
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2">{cls.title}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{cls.instructor}</p>
                                        </div>
                                        
                                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {cls.time} • {cls.duration} دقيقة
                                            </div>
                                            {cls.viewers > 0 && (
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4" />
                                                    {cls.viewers} مشاهد
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardBody>
                                <div className="px-4 py-3 bg-gray-50 dark:bg-[#0F172A] border-t border-gray-100 dark:border-[#334155]">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-[#6C4CF1] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Play className="w-4 h-4" />
                                        {cls.status === 'live' ? 'انضم الآن' : 'اشترك للتذكير'}
                                    </motion.button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="لا توجد فصول"
                    description="لا توجد فصول متاحة في الوقت الحالي"
                    action={{ label: 'عرض الجميع', onClick: () => setFilter('all') }}
                />
            )}
        </div>
    );
}
