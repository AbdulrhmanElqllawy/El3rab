import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, Plus, Save, X } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import DataTable from '../../../components/DataTable';

const lessonsData = [
    { id: 1, title: 'المقدمة', duration: '15:30', order: 1, status: 'منشور' },
    { id: 2, title: 'الدرس الأول', duration: '45:20', order: 2, status: 'منشور' },
    { id: 3, title: 'الدرس الثاني', duration: '38:45', order: 3, status: 'قيد التحرير' },
];

export default function AdminCoursesLessonsView() {
    const [lessons, setLessons] = useState(lessonsData);
    const [editingId, setEditingId] = useState(null);

    const columns = [
        { key: 'order', label: '#' },
        { key: 'title', label: 'عنوان الدرس' },
        { key: 'duration', label: 'المدة' },
        { key: 'status', label: 'الحالة', render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${val === 'منشور' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                {val}
            </span>
        )},
    ];

    const actions = [
        { label: 'عرض', icon: <Eye className="w-4 h-4" />, onClick: (item) => alert(`عرض الدرس: ${item.title}`) },
        { label: 'تعديل', icon: <Edit2 className="w-4 h-4" />, onClick: (item) => setEditingId(item.id) },
        { label: 'حذف', icon: <Trash2 className="w-4 h-4" />, className: 'text-red-600 hover:bg-red-50', onClick: (item) => setLessons(lessons.filter(l => l.id !== item.id)) },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="إدارة الدروس"
                description="أضف وعدّل دروس الكورس"
                actions={
                    <motion.button whileHover={{ scale: 1.05 }} className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        درس جديد
                    </motion.button>
                }
            />
            <DataTable columns={columns} data={lessons} actions={actions} />
        </div>
    );
}
