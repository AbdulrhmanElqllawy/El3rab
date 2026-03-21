import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import DataTable from '../../../components/DataTable';

const videosData = [
    { id: 1, title: 'فيديو شرح المقدمة', duration: '15:30', lesson: 'المقدمة', size: '250 MB', status: 'منشور' },
    { id: 2, title: 'فيديو الدرس الأول', duration: '45:20', lesson: 'الدرس الأول', size: '520 MB', status: 'منشور' },
    { id: 3, title: 'فيديو الدرس الثاني', duration: '38:45', lesson: 'الدرس الثاني', size: '420 MB', status: 'قيد الترميز' },
];

export default function AdminCoursesVideosView() {
    const [videos, setVideos] = useState(videosData);

    const columns = [
        { key: 'id', label: '#', render: (val) => `#${val}` },
        { key: 'title', label: 'عنوان الفيديو' },
        { key: 'lesson', label: 'الدرس' },
        { key: 'duration', label: 'المدة' },
        { key: 'size', label: 'الحجم' },
        { key: 'status', label: 'الحالة', render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${val === 'منشور' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {val}
            </span>
        )},
    ];

    const actions = [
        { label: 'عرض', icon: <Play className="w-4 h-4" />, onClick: (item) => alert(`تشغيل: ${item.title}`) },
        { label: 'تعديل', icon: <Edit2 className="w-4 h-4" />, onClick: (item) => alert(`تعديل: ${item.title}`) },
        { label: 'حذف', icon: <Trash2 className="w-4 h-4" />, className: 'text-red-600 hover:bg-red-50', onClick: (item) => setVideos(videos.filter(v => v.id !== item.id)) },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="إدارة الفيديوهات"
                description="أضف وأدر فيديوهات الكورس"
                actions={
                    <motion.button whileHover={{ scale: 1.05 }} className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        فيديو جديد
                    </motion.button>
                }
            />
            <DataTable columns={columns} data={videos} actions={actions} />
        </div>
    );
}
