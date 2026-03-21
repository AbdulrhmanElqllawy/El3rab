import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Edit2, Trash2, Eye, Users } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EnhancedDataTable from '../../components/EnhancedDataTable';
import { StatCardGroup } from '../../components/EnhancedStatCard';
import { Card, CardHeader, CardBody } from '../../components/EnhancedCardComponents';
import EmptyState from '../../components/EnhancedEmptyState';

const coursesData = [
    { id: 1, title: 'التناظر اللفظي', instructor: 'أ. محمد السلمي', students: 145, lessons: 12, status: 'نشط', progress: 75 },
    { id: 2, title: 'إكمال الجمل', instructor: 'أ. فاطمة العتيبي', students: 98, lessons: 10, status: 'نشط', progress: 60 },
    { id: 3, title: 'الخطأ السياقي', instructor: 'أ. عمر الدعجاني', students: 67, lessons: 8, status: 'مسودة', progress: 30 },
];

export default function EmployeeCoursesView() {
    const [courses, setCourses] = useState(coursesData);
    const [loading] = useState(false);

    const stats = [
        { id: 1, label: 'إجمالي الدورات', value: courses.length, icon: BookOpen, color: 'purple' },
        { id: 2, label: 'الدورات النشطة', value: courses.filter(c => c.status === 'نشط').length, icon: Eye, color: 'teal' },
        { id: 3, label: 'إجمالي الطلاب', value: courses.reduce((a, c) => a + c.students, 0), icon: Users, color: 'amber' },
        { id: 4, label: 'الدروس الكلية', value: courses.reduce((a, c) => a + c.lessons, 0), icon: BookOpen, color: 'green' },
    ];

    const columns = [
        { key: 'title', label: 'الدورة', sortable: true },
        { key: 'instructor', label: 'المعلم', sortable: true },
        { key: 'students', label: 'الطلاب', sortable: true, render: (val) => `${val} طالب` },
        { key: 'lessons', label: 'الدروس', sortable: true },
        { key: 'status', label: 'الحالة', sortable: true, render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${
                val === 'نشط' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
                {val}
            </span>
        )},
    ];

    return (
        <div className="p-4 lg:p-6 space-y-8" dir="rtl">
            <PageHeader
                title="إدارة الدورات"
                description="عرض وإدارة جميع الدورات المتاحة"
                breadcrumbs={['الرئيسية', 'الدورات']}
                actions={
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        دورة جديدة
                    </motion.button>
                }
            />

            {/* Stats */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">ملخص الدورات</h2>
                <StatCardGroup stats={stats} columns={4} loading={loading} />
            </div>

            {/* Data Table */}
            <Card elevated>
                <CardHeader title="جميع الدورات" />
                <CardBody>
                    {courses.length > 0 ? (
                        <EnhancedDataTable
                            columns={columns}
                            data={courses}
                            searchPlaceholder="ابحث عن دورة..."
                            loading={loading}
                        />
                    ) : (
                        <EmptyState
                            title="لا توجد دورات"
                            description="ابدأ بإنشاء دورة جديدة"
                            action={{ label: 'دورة جديدة' }}
                        />
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
