import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Filter, Play, Heart, ClipboardList, Trophy, BarChart3 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EnhancedEmptyState';
import { StatCardGroup } from '../../components/EnhancedStatCard';
import { Card, CardHeader, CardBody, ProgressBadge } from '../../components/EnhancedCardComponents';

const courses = [
    { id: 1, title: 'التناظر اللفظي', instructor: 'أ. محمد السلمي', progress: 75, lessons: 12, completed: 9, rating: 4.8, cover: '#6C4CF1' },
    { id: 2, title: 'إكمال الجمل', instructor: 'أ. فاطمة العتيبي', progress: 45, lessons: 10, completed: 4, rating: 4.5, cover: '#00C2A8' },
    { id: 3, title: 'الخطأ السياقي', instructor: 'أ. عمر الدعجاني', progress: 0, lessons: 8, completed: 0, rating: 4.9, cover: '#FFD166' },
];

export default function StudentCoursesView() {
    const [filter, setFilter] = useState('all');
    const [loading] = useState(false);

    const filtered = filter === 'all' ? courses : filter === 'completed' ? courses.filter(c => c.progress === 100) : courses.filter(c => c.progress > 0 && c.progress < 100);
    
    const stats = [
        { id: 1, label: 'إجمالي الدورات', value: courses.length, icon: BookOpen, color: 'purple' },
        { id: 2, label: 'الدورات المكتملة', value: courses.filter(c => c.progress === 100).length, icon: Trophy, color: 'teal' },
        { id: 3, label: 'الدورات الجارية', value: courses.filter(c => c.progress > 0 && c.progress < 100).length, icon: BarChart3, color: 'amber' },
        { id: 4, label: 'متوسط التقدم', value: Math.round(courses.reduce((a, c) => a + c.progress, 0) / courses.length), format: 'percentage', icon: ClipboardList, color: 'green' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-8" dir="rtl">
            <PageHeader
                title="دوراتي"
                description="اختر من بين الدورات المتاحة وابدأ رحلة التعلم"
                breadcrumbs={['الرئيسية', 'دوراتي']}
            />

            {/* Stats */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">ملخص الدورات</h2>
                <StatCardGroup stats={stats} columns={4} loading={loading} />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                {['all', 'active', 'completed'].map(f => (
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
                        <Filter className="w-4 h-4" />
                        {f === 'all' ? 'الكل' : f === 'active' ? 'جارية' : 'مكتملة'}
                    </motion.button>
                ))}
            </div>

            {/* Courses Grid */}
            {filtered.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((course, idx) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="group"
                        >
                            <Card elevated interactive>
                                <div className="relative h-32 overflow-hidden rounded-t-xl" style={{ backgroundColor: course.cover }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Play className="w-10 h-10 text-white fill-white" />
                                    </motion.button>
                                </div>
                                <CardBody>
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2">{course.title}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{course.instructor}</p>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                <span>{course.completed}/{course.lessons} الدروس</span>
                                                <span className="font-semibold text-[#6C4CF1]">{course.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 dark:bg-[#334155] rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${course.progress}%` }}
                                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                                    className="h-full bg-gradient-to-r from-[#6C4CF1] to-[#5b3ee0]"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm font-semibold text-amber-500">★</span>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">{course.rating}</span>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.2 }}
                                                className="text-red-500 hover:text-red-600 transition-colors"
                                            >
                                                <Heart className="w-5 h-5" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </CardBody>
                                <div className="px-4 py-3 bg-gray-50 dark:bg-[#0F172A] border-t border-gray-100 dark:border-[#334155]">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-[#6C4CF1] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors"
                                    >
                                        {course.progress === 100 ? 'اعادة الدورة' : 'المتابعة'}
                                    </motion.button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="لا توجد دورات"
                    description={filter === 'completed' ? 'لم تكمل أي دورات بعد' : 'ابدأ بدورة جديدة'}
                    action={{ label: 'استكشف الدورات', onClick: () => setFilter('all') }}
                />
            )}
        </div>
    );
}
