import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import DataTable from '../../../components/DataTable';

const coursesData = [
    { id: 1, name: 'التناظر اللفظي', instructor: 'أ. محمد', students: 234, lessons: 12, status: 'نشط' },
    { id: 2, name: 'إكمال الجمل', instructor: 'أ. فاطمة', students: 156, lessons: 10, status: 'نشط' },
    { id: 3, name: 'الخطأ السياقي', instructor: 'أ. عمر', students: 98, lessons: 8, status: 'مؤرشف' },
];

export default function AdminCoursesAllView() {
    const [courses, setCourses] = useState(coursesData);

    const columns = [
        { key: 'id', label: '#', render: (val) => `#${val}` },
        { key: 'name', label: 'اسم الكورس' },
        { key: 'instructor', label: 'المعلم' },
        { key: 'students', label: 'الطلاب', render: (val) => `${val} طالب` },
        { key: 'lessons', label: 'الدروس' },
        { key: 'status', label: 'الحالة', render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${val === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {val}
            </span>
        )},
    ];

    const actions = [
        { label: 'عرض', icon: <Eye className="w-4 h-4" />, onClick: (item) => alert(`عرض: ${item.name}`) },
        { label: 'تعديل', icon: <Edit2 className="w-4 h-4" />, onClick: (item) => alert(`تعديل: ${item.name}`) },
        { label: 'حذف', icon: <Trash2 className="w-4 h-4" />, className: 'text-red-600 hover:bg-red-50', onClick: (item) => setCourses(courses.filter(c => c.id !== item.id)) },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="جميع الكورسات"
                description="إدارة كل الكورسات المتاحة على الموقع"
                actions={
                    <motion.button whileHover={{ scale: 1.05 }} className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        كورس جديد
                    </motion.button>
                }
            />
            <DataTable columns={columns} data={courses} actions={actions} />
        </div>
    );
}
