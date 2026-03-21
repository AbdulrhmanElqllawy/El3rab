import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Archive, Eye, Download, Trash2 } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import AdvancedDataTable from '../../../components/AdvancedDataTable';
import StatCard from '../../../components/StatCard';

const archivedData = [
    { id: 1, ticketId: 'TKT-150', title: 'مشكلة قديمة', customer: 'أحمد محمود', resolved: '2024-02-15', duration: '5 أيام', category: 'technical' },
    { id: 2, ticketId: 'TKT-145', title: 'شكوى قديمة', customer: 'ليلى أحمد', resolved: '2024-02-10', duration: '3 أيام', category: 'complaint' },
    { id: 3, ticketId: 'TKT-140', title: 'استفسار سابق', customer: 'علي موسى', resolved: '2024-02-05', duration: '1 يوم', category: 'inquiry' },
    { id: 4, ticketId: 'TKT-135', title: 'مشكلة دفع قديمة', customer: 'منى علي', resolved: '2024-01-30', duration: '7 أيام', category: 'payment' },
];

export default function ArchiveView() {
    const [archived, setArchived] = useState(archivedData);

    const stats = [
        { label: 'إجمالي التذاكر المؤرشفة', value: archived.length, icon: Archive, color: 'purple' },
        { label: 'إجمالي وقت الحل', value: (archived.reduce((sum, a) => sum + parseInt(a.duration), 0)), icon: Archive, color: 'teal', subtitle: 'يوم' },
        { label: 'متوسط وقت الحل', value: (archived.reduce((sum, a) => sum + parseInt(a.duration), 0) / archived.length).toFixed(1), icon: Archive, color: 'amber', subtitle: 'أيام' },
        { label: 'جودة الخدمة', value: '98%', icon: Archive, color: 'green' },
    ];

    const columns = [
        {
            key: 'ticketId',
            label: 'رقم التذكرة',
            render: (val) => <span className="font-bold text-[#6C4CF1]">{val}</span>
        },
        {
            key: 'title',
            label: 'الموضوع',
            render: (val) => <p className="font-semibold text-gray-900 dark:text-white truncate">{val}</p>
        },
        {
            key: 'customer',
            label: 'العميل',
            render: (val) => <p className="text-gray-900 dark:text-white">{val}</p>
        },
        {
            key: 'category',
            label: 'التصنيف',
            render: (val) => (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400">
                    {val}
                </span>
            )
        },
        {
            key: 'duration',
            label: 'مدة الحل',
            render: (val) => <span className="text-gray-900 dark:text-white">{val}</span>
        },
        {
            key: 'resolved',
            label: 'تاريخ الإغلاق',
            render: (val) => new Date(val).toLocaleDateString('ar-SA')
        },
    ];

    const actions = [
        { label: 'عرض', icon: <Eye className="w-4 h-4" /> },
        { label: 'تحميل', icon: <Download className="w-4 h-4" /> },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="أرشيف الدعم الفني"
                description="التذاكر المغلقة والمؤرشفة من الجلسات السابقة"
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

            {/* Archived Table */}
            <AdvancedDataTable
                columns={columns}
                data={archived}
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
