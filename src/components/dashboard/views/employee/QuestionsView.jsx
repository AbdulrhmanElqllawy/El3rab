import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Plus, Edit2, Trash2, Eye, Filter, Search } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EnhancedDataTable from '../../components/EnhancedDataTable';
import { StatCardGroup } from '../../components/EnhancedStatCard';
import { Card, CardHeader, CardBody } from '../../components/EnhancedCardComponents';
import EmptyState from '../../components/EnhancedEmptyState';

const questionsData = [
    { id: 1, title: 'سؤال تناظر عن..', category: 'التناظر اللفظي', level: 'سهل', createdBy: 'أ. محمد', status: 'منشور', date: '2024-03-20' },
    { id: 2, title: 'إكمال جملة في..', category: 'إكمال الجمل', level: 'متوسط', createdBy: 'أ. فاطمة', status: 'قيد المراجعة', date: '2024-03-19' },
    { id: 3, title: 'تحديد الخطأ في..', category: 'الخطأ السياقي', level: 'صعب', createdBy: 'أ. عمر', status: 'منشور', date: '2024-03-18' },
];

export default function EmployeeQuestionsView() {
    const [questions, setQuestions] = useState(questionsData);
    const [loading] = useState(false);

    const stats = [
        { id: 1, label: 'إجمالي الأسئلة', value: questions.length, icon: HelpCircle, color: 'purple' },
        { id: 2, label: 'الأسئلة المنشورة', value: questions.filter(q => q.status === 'منشور').length, icon: Eye, color: 'teal' },
        { id: 3, label: 'قيد المراجعة', value: questions.filter(q => q.status === 'قيد المراجعة').length, icon: Filter, color: 'amber' },
        { id: 4, label: 'أسئلة صعبة', value: questions.filter(q => q.level === 'صعب').length, icon: HelpCircle, color: 'red' },
    ];

    const columns = [
        { key: 'id', label: '#', render: (val) => `#${val}` },
        { key: 'title', label: 'السؤال', sortable: true },
        { key: 'category', label: 'الفئة', sortable: true },
        { key: 'level', label: 'المستوى', sortable: true, render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${
                val === 'سهل' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                val === 'متوسط' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}>
                {val}
            </span>
        )},
        { key: 'status', label: 'الحالة', sortable: true, render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${
                val === 'منشور' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
            }`}>
                {val}
            </span>
        )},
    ];

    return (
        <div className="p-4 lg:p-6 space-y-8" dir="rtl">
            <PageHeader
                title="إدارة الأسئلة"
                description="أنشئ وعدّل وأدر مجموعة الأسئلة"
                breadcrumbs={['الرئيسية', 'الأسئلة']}
                actions={
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        سؤال جديد
                    </motion.button>
                }
            />

            {/* Stats */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">ملخص الأسئلة</h2>
                <StatCardGroup stats={stats} columns={4} loading={loading} />
            </div>

            {/* Data Table */}
            <Card elevated>
                <CardHeader title="جميع الأسئلة" />
                <CardBody>
                    {questions.length > 0 ? (
                        <EnhancedDataTable
                            columns={columns}
                            data={questions}
                            searchPlaceholder="ابحث عن أسئلة..."
                            loading={loading}
                        />
                    ) : (
                        <EmptyState
                            title="لا توجد أسئلة"
                            description="ابدأ بإنشاء سؤال جديد"
                            action={{ label: 'سؤال جديد' }}
                        />
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
