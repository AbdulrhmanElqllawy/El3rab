import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import DataTable from '../../../components/DataTable';

const examsData = [
    { id: 1, title: 'اختبار التناظر الأول', questions: 20, duration: 45, passingScore: 60, category: 'التناظر', status: 'نشط' },
    { id: 2, title: 'اختبار إكمال الجمل', questions: 15, duration: 30, passingScore: 60, category: 'الجمل', status: 'نشط' },
    { id: 3, title: 'امتحان نهائي شامل', questions: 50, duration: 120, passingScore: 70, category: 'شامل', status: 'قادم' },
];

export default function AdminExamsCreateView() {
    const [exams, setExams] = useState(examsData);

    const columns = [
        { key: 'id', label: '#', render: (val) => `#${val}` },
        { key: 'title', label: 'اسم الاختبار' },
        { key: 'category', label: 'الفئة' },
        { key: 'questions', label: 'عدد الأسئلة' },
        { key: 'duration', label: 'المدة (دقيقة)' },
        { key: 'status', label: 'الحالة', render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${val === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {val}
            </span>
        )},
    ];

    const actions = [
        { label: 'عرض', icon: <Eye className="w-4 h-4" />, onClick: (item) => alert(`عرض: ${item.title}`) },
        { label: 'تعديل', icon: <Edit2 className="w-4 h-4" />, onClick: (item) => alert(`تعديل: ${item.title}`) },
        { label: 'حذف', icon: <Trash2 className="w-4 h-4" />, className: 'text-red-600 hover:bg-red-50', onClick: (item) => setExams(exams.filter(e => e.id !== item.id)) },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="إنشاء اختبار"
                description="أنشئ اختبارات جديدة للطلاب"
                actions={
                    <motion.button whileHover={{ scale: 1.05 }} className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        اختبار جديد
                    </motion.button>
                }
            />
            <DataTable columns={columns} data={exams} actions={actions} />
        </div>
    );
}
