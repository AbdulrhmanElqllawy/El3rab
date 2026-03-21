import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Plus, Edit2, Trash2, Eye, Users } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import DataTable from '../../../components/DataTable';

const broadcastsData = [
    { id: 1, title: 'محاضرة التناظر', speaker: 'أ. محمد', startTime: '8:00 PM', date: '2024-03-20', attendees: 342, status: 'live' },
    { id: 2, title: 'شرح الجمل', speaker: 'أ. فاطمة', startTime: '7:00 PM', date: '2024-03-21', attendees: 0, status: 'scheduled' },
    { id: 3, title: 'تدريب الخطأ', speaker: 'أ. عمر', startTime: '6:00 PM', date: '2024-03-19', attendees: 215, status: 'completed' },
];

export default function AdminLiveCreateView() {
    const [broadcasts, setBroadcasts] = useState(broadcastsData);

    const columns = [
        { key: 'id', label: '#', render: (val) => `#${val}` },
        { key: 'title', label: 'العنوان' },
        { key: 'speaker', label: 'المتحدث' },
        { key: 'date', label: 'التاريخ' },
        { key: 'startTime', label: 'الوقت' },
        { key: 'attendees', label: 'الحاضرون', render: (val) => `${val} طالب` },
        { key: 'status', label: 'الحالة', render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${
                val === 'live' ? 'bg-red-100 text-red-800' :
                val === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
            }`}>
                {val === 'live' ? 'مباشر' : val === 'scheduled' ? 'مجدول' : 'مكتمل'}
            </span>
        )},
    ];

    const actions = [
        { label: 'عرض', icon: <Eye className="w-4 h-4" />, onClick: (item) => alert(`عرض: ${item.title}`) },
        { label: 'تعديل', icon: <Edit2 className="w-4 h-4" />, onClick: (item) => alert(`تعديل: ${item.title}`) },
        { label: 'حذف', icon: <Trash2 className="w-4 h-4" />, className: 'text-red-600 hover:bg-red-50', onClick: (item) => setBroadcasts(broadcasts.filter(b => b.id !== item.id)) },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="إنشاء بث"
                description="أنشئ جلسات بث مباشرة جديدة"
                actions={
                    <motion.button whileHover={{ scale: 1.05 }} className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        بث جديد
                    </motion.button>
                }
            />
            <DataTable columns={columns} data={broadcasts} actions={actions} />
        </div>
    );
}
