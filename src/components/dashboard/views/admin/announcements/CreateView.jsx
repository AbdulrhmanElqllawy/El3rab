import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Plus, Edit2, Trash2, Send } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import DataTable from '../../../components/DataTable';

const announcementsData = [
    { id: 1, title: 'إطلاق كورس جديد', content: 'تم إضافة كورس التناظر المتقدم', date: '2024-03-20', audience: 'الكل', status: 'منشور' },
    { id: 2, title: 'صيانة الموقع', content: 'سيكون الموقع تحت الصيانة يوم الجمعة', date: '2024-03-21', audience: 'الكل', status: 'مكتوب' },
];

export default function AdminAnnouncementsCreateView() {
    const [announcements, setAnnouncements] = useState(announcementsData);

    const columns = [
        { key: 'id', label: '#', render: (val) => `#${val}` },
        { key: 'title', label: 'العنوان' },
        { key: 'audience', label: 'الجمهور' },
        { key: 'date', label: 'التاريخ' },
        { key: 'status', label: 'الحالة', render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${
                val === 'منشور' ? 'bg-green-100 text-green-800' :
                val === 'مكتوب' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
            }`}>
                {val}
            </span>
        )},
    ];

    const actions = [
        { label: 'تعديل', icon: <Edit2 className="w-4 h-4" />, onClick: (item) => alert(`تعديل: ${item.title}`) },
        { label: 'إرسال', icon: <Send className="w-4 h-4" />, onClick: (item) => alert(`إرسال: ${item.title}`) },
        { label: 'حذف', icon: <Trash2 className="w-4 h-4" />, className: 'text-red-600 hover:bg-red-50', onClick: (item) => setAnnouncements(announcements.filter(a => a.id !== item.id)) },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="إنشاء إعلان"
                description="أنشئ وأرسل إعلانات للمستخدمين"
                actions={
                    <motion.button whileHover={{ scale: 1.05 }} className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        إعلان جديد
                    </motion.button>
                }
            />
            <DataTable columns={columns} data={announcements} actions={actions} />
        </div>
    );
}
