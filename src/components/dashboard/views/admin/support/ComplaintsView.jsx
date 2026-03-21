import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Eye, MessageSquare, Trash2, CheckCircle } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import AdvancedDataTable from '../../../components/AdvancedDataTable';
import StatCard from '../../../components/StatCard';
import AdminModal from '../../../components/AdminModal';

const complaintsData = [
    { id: 1, title: 'محتوى الكورس غير واضح', student: 'محمد أحمد', email: 'ahmed@example.com', date: '2024-03-21', priority: 'high', status: 'open', category: 'content' },
    { id: 2, title: 'مشكلة في الدفع', student: 'فاطمة علي', email: 'fatima@example.com', date: '2024-03-20', priority: 'high', status: 'open', category: 'payment' },
    { id: 3, title: 'الاختبار صعب جداً', student: 'علي محمود', email: 'ali@example.com', date: '2024-03-19', priority: 'medium', status: 'resolved', category: 'exam' },
    { id: 4, title: 'طلب استرجاع رسوم', student: 'خديجة حسن', email: 'khadija@example.com', date: '2024-03-18', priority: 'high', status: 'open', category: 'refund' },
];

export default function ComplaintsView() {
    const [complaints, setComplaints] = useState(complaintsData);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const stats = [
        { label: 'إجمالي الشكاوى', value: complaints.length, icon: AlertTriangle, color: 'purple' },
        { label: 'مفتوحة', value: complaints.filter(c => c.status === 'open').length, icon: MessageSquare, color: 'red' },
        { label: 'عالية الأولوية', value: complaints.filter(c => c.priority === 'high').length, icon: AlertTriangle, color: 'amber' },
        { label: 'تم حلها', value: complaints.filter(c => c.status === 'resolved').length, icon: CheckCircle, color: 'green' },
    ];

    const columns = [
        {
            key: 'title',
            label: 'الشكوى',
            render: (val) => <p className="font-semibold text-gray-900 dark:text-white truncate">{val}</p>
        },
        {
            key: 'student',
            label: 'الطالب',
            render: (val, item) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">{val}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.email}</p>
                </div>
            )
        },
        {
            key: 'priority',
            label: 'الأولوية',
            render: (val) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    val === 'high' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400' :
                    'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                }`}>
                    {val === 'high' ? 'عالية' : 'متوسطة'}
                </span>
            )
        },
        {
            key: 'status',
            label: 'الحالة',
            render: (val) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    val === 'open' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                    'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                }`}>
                    {val === 'open' ? 'مفتوحة' : 'مغلقة'}
                </span>
            )
        },
        {
            key: 'date',
            label: 'التاريخ',
            render: (val) => new Date(val).toLocaleDateString('ar-SA')
        },
    ];

    const actions = [
        { label: 'عرض التفاصيل', icon: <Eye className="w-4 h-4" />, onClick: (item) => { setSelectedComplaint(item); setShowDetailModal(true); } },
        { label: 'الرد على الشكوى', icon: <MessageSquare className="w-4 h-4" /> },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="شكاوى الطلاب"
                description="إدارة شكاوى وملاحظات الطلاب والمستخدمين"
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
                        subtitle={undefined}
                        onClick={() => {}}
                    />
                ))}
            </div>

            {/* Table */}
            <AdvancedDataTable
                columns={columns}
                data={complaints}
                actions={actions}
                searchable={true}
                pagination={true}
                itemsPerPage={10}
                selectable={true}
                onSelectionChange={() => {}}
                onBulkAction={() => {}}
            />

            {/* Detail Modal */}
            <AdminModal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                title="تفاصيل الشكوى"
                size="lg"
            >
                {selectedComplaint && (
                    <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الشكوى</p>
                            <p className="font-bold text-gray-900 dark:text-white">{selectedComplaint.title}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الطالب</p>
                                <p className="font-bold text-gray-900 dark:text-white">{selectedComplaint.student}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedComplaint.email}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">التصنيف</p>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400">
                                    {selectedComplaint.category}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </AdminModal>
        </div>
    );
}
