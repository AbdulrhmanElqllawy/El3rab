import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Edit2, Trash2, Download } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import DataTable from '../../../components/DataTable';

const filesData = [
    { id: 1, name: 'ملزمة الدرس الأول', type: 'PDF', size: '2.5 MB', lesson: 'الدرس الأول', uploadDate: '2024-03-20' },
    { id: 2, name: 'تمارين الدرس الثاني', type: 'PDF', size: '1.8 MB', lesson: 'الدرس الثاني', uploadDate: '2024-03-19' },
    { id: 3, name: 'حل أسئلة الامتحان', type: 'PDF', size: '3.2 MB', lesson: 'المراجعة', uploadDate: '2024-03-18' },
];

export default function AdminCoursesFilesView() {
    const [files, setFiles] = useState(filesData);

    const columns = [
        { key: 'id', label: '#', render: (val) => `#${val}` },
        { key: 'name', label: 'اسم الملف' },
        { key: 'lesson', label: 'الدرس' },
        { key: 'type', label: 'النوع' },
        { key: 'size', label: 'الحجم' },
        { key: 'uploadDate', label: 'تاريخ الرفع' },
    ];

    const actions = [
        { label: 'تحميل', icon: <Download className="w-4 h-4" />, onClick: (item) => alert(`تحميل: ${item.name}`) },
        { label: 'تعديل', icon: <Edit2 className="w-4 h-4" />, onClick: (item) => alert(`تعديل: ${item.name}`) },
        { label: 'حذف', icon: <Trash2 className="w-4 h-4" />, className: 'text-red-600 hover:bg-red-50', onClick: (item) => setFiles(files.filter(f => f.id !== item.id)) },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="إدارة الملفات"
                description="أضف وأدر ملفات الكورس"
                actions={
                    <motion.button whileHover={{ scale: 1.05 }} className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        ملف جديد
                    </motion.button>
                }
            />
            <DataTable columns={columns} data={files} actions={actions} />
        </div>
    );
}
