import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import StatCard from '../../../components/StatCard';
import AdvancedDataTable from '../../../components/AdvancedDataTable';

const attendeesData = [
    { id: 1, name: 'محمد أحمد', email: 'ahmed@example.com', joinTime: '18:05', duration: 45, status: 'still_watching', engagement: 'عالي' },
    { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', joinTime: '18:10', duration: 40, status: 'still_watching', engagement: 'متوسط' },
    { id: 3, name: 'علي محمود', email: 'ali@example.com', joinTime: '18:00', duration: 50, status: 'still_watching', engagement: 'عالي' },
    { id: 4, name: 'خديجة حسن', email: 'khadija@example.com', joinTime: '18:15', duration: 35, status: 'left', engagement: 'متوسط' },
    { id: 5, name: 'يوسف محمود', email: 'youssef@example.com', joinTime: '18:08', duration: 42, status: 'still_watching', engagement: 'منخفض' },
];

export default function LiveAttendeesView() {
    const [attendees, setAttendees] = useState(attendeesData);
    const [liveSession] = useState({
        title: 'شرح التناظر اللفظي',
        startTime: '18:00',
        duration: 50,
        instructor: 'أ. محمد أحمد',
    });

    const stats = [
        { label: 'الحاضرون الآن', value: attendees.filter(a => a.status === 'still_watching').length, icon: Users, color: 'purple' },
        { label: 'المشاهدات الكلية', value: attendees.length, icon: Eye, color: 'teal' },
        { label: 'متوسط التفاعل', value: attendees.filter(a => a.engagement === 'عالي').length, icon: MessageSquare, color: 'amber' },
        { label: 'متوسط المدة', value: ((attendees.reduce((sum, a) => sum + a.duration, 0) / attendees.length)).toFixed(0), icon: Clock, color: 'green', subtitle: 'دقيقة' },
    ];

    const columns = [
        {
            key: 'name',
            label: 'المشاهد',
            render: (val, item) => (
                <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{val}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.email}</p>
                </div>
            )
        },
        {
            key: 'joinTime',
            label: 'وقت الانضمام',
            render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span>
        },
        {
            key: 'duration',
            label: 'مدة المشاهدة',
            render: (val) => <span className="text-gray-600 dark:text-gray-400">{val} دقيقة</span>
        },
        {
            key: 'status',
            label: 'الحالة',
            render: (val) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    val === 'still_watching' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' :
                    'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400'
                }`}>
                    {val === 'still_watching' ? 'يشاهد' : 'غادر'}
                </span>
            )
        },
        {
            key: 'engagement',
            label: 'مستوى التفاعل',
            render: (val) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    val === 'عالي' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                    val === 'متوسط' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' :
                    'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                }`}>
                    {val}
                </span>
            )
        },
    ];

    const actions = [
        { label: 'إرسال رسالة', icon: <MessageSquare className="w-4 h-4" /> },
        { label: 'إزالة', icon: <CheckCircle className="w-4 h-4" /> },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="الطلاب الحاضرون"
                description={`${liveSession.title} - ${liveSession.instructor}`}
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <StatCard 
                        key={stat.label} 
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        color={stat.color}
                        trend={undefined}
                        subtitle={stat.subtitle || undefined}
                        onClick={() => {}}
                    />
                ))}
            </div>

            {/* Attendees Table */}
            <AdvancedDataTable
                columns={columns}
                data={attendees}
                actions={actions}
                searchable={true}
                pagination={true}
                itemsPerPage={10}
                selectable={true}
                onSelectionChange={() => {}}
                onBulkAction={() => {}}
            />
        </div>
    );
}
