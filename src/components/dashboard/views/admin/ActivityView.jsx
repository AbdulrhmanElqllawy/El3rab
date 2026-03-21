import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, TrendingUp, AlertCircle, Bell, User, BookOpen, BarChart3, 
    Zap, FileText, Settings, Download, Eye, Filter, Clock
} from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import AdvancedDataTable from '../../components/AdvancedDataTable';
import AdvancedFilters from '../../components/AdvancedFilters';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';

const activityData = [
    { 
        id: 1, 
        type: 'user_register',
        message: 'تسجيل مستخدم جديد',
        user: 'محمد أحمد',
        email: 'ahmed@example.com',
        timestamp: '2024-03-21T10:30:00',
        ip: '192.168.1.1',
        device: 'Chrome - Windows',
        status: 'success',
        icon: Users
    },
    { 
        id: 2, 
        type: 'course_created',
        message: 'إضافة كورس جديد',
        user: 'أ. فاطمة',
        email: 'fatima@example.com',
        timestamp: '2024-03-21T09:45:00',
        ip: '192.168.1.5',
        device: 'Safari - Mac',
        status: 'success',
        icon: TrendingUp
    },
    { 
        id: 3, 
        type: 'exam_completed',
        message: 'إكمال اختبار',
        user: 'عمر محمود',
        email: 'omar@example.com',
        timestamp: '2024-03-21T08:15:00',
        ip: '192.168.1.10',
        device: 'Chrome Mobile - iOS',
        status: 'success',
        icon: AlertCircle
    },
    { 
        id: 4, 
        type: 'permission_changed',
        message: 'تغيير صلاحيات',
        user: 'خالد يوسف',
        email: 'khalid@example.com',
        timestamp: '2024-03-21T07:30:00',
        ip: '192.168.1.8',
        device: 'Firefox - Windows',
        status: 'warning',
        icon: Zap
    },
    { 
        id: 5, 
        type: 'user_banned',
        message: 'حظر مستخدم',
        user: 'نورة الحربي',
        email: 'nora@example.com',
        timestamp: '2024-03-21T06:00:00',
        ip: '192.168.1.15',
        device: 'Chrome - Android',
        status: 'danger',
        icon: Bell
    },
];

export default function AdminActivityView() {
    const [filter, setFilter] = useState('all');
    const [filteredData, setFilteredData] = useState(activityData);
    const [expandedRow, setExpandedRow] = useState(null);

    const stats = [
        { label: 'إجمالي الأنشطة', value: activityData.length, icon: AlertCircle, color: 'purple' },
        { label: 'أنشطة اليوم', value: 5, icon: Clock, color: 'teal', trend: { direction: 'up', percentage: 12 } },
        { label: 'عمليات ناجحة', value: 4, icon: TrendingUp, color: 'green' },
        { label: 'عمليات محفوفة بالمخاطر', value: 1, icon: AlertCircle, color: 'red' },
    ];

    const typeIcons = {
        user_register: Users,
        course_created: BookOpen,
        exam_completed: BarChart3,
        permission_changed: Zap,
        user_banned: Bell,
    };

    const typeLabels = {
        user_register: 'تسجيل مستخدم',
        course_created: 'إضافة كورس',
        exam_completed: 'إكمال اختبار',
        permission_changed: 'تغيير صلاحيات',
        user_banned: 'حظر مستخدم',
    };

    const columns = [
        {
            key: 'message',
            label: 'النشاط',
            render: (val, item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#6C4CF1]/10">
                        {React.createElement(typeIcons[item.type] || AlertCircle, { className: 'w-4 h-4 text-[#6C4CF1]' })}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{val}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{typeLabels[item.type]}</p>
                    </div>
                </div>
            )
        },
        {
            key: 'user',
            label: 'المستخدم',
            render: (val, item) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">{val}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.email}</p>
                </div>
            )
        },
        {
            key: 'timestamp',
            label: 'الوقت',
            sortable: true,
            render: (val) => new Date(val).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        },
        {
            key: 'status',
            label: 'الحالة',
            render: (val) => (
                <StatusBadge 
                    status={val === 'success' ? 'approved' : val === 'warning' ? 'pending' : 'banned'} 
                    size="sm"
                    icon={null}
                />
            )
        },
    ];

    const actions = [
        { 
            label: 'عرض التفاصيل', 
            icon: <Eye className="w-4 h-4" />,
            onClick: (item) => setExpandedRow(item.id)
        },
        { 
            label: 'تصدير', 
            icon: <Download className="w-4 h-4" />,
            onClick: (item) => console.log('تصدير', item)
        },
    ];

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('ar-SA', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="آخر النشاطات"
                description="تتبع وتحليل جميع الأنشطة على المنصة في الوقت الفعلي"
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
                        trend={stat.trend || undefined}
                        subtitle={undefined}
                        onClick={() => {}}
                    />
                ))}
            </div>

            {/* Filters */}
            <AdvancedFilters
                compact={true}
                filters={[
                    {
                        id: 'type',
                        label: 'نوع النشاط',
                        type: 'select',
                        options: [
                            { value: 'user_register', label: 'تسجيل مستخدم' },
                            { value: 'course_created', label: 'إضافة كورس' },
                            { value: 'exam_completed', label: 'إكمال اختبار' },
                            { value: 'permission_changed', label: 'تغيير صلاحيات' },
                            { value: 'user_banned', label: 'حظر مستخدم' },
                        ]
                    },
                    {
                        id: 'date',
                        label: 'نطاق التاريخ',
                        type: 'dateRange',
                    },
                    {
                        id: 'status',
                        label: 'الحالة',
                        type: 'checkbox',
                        options: [
                            { value: 'success', label: 'ناجح' },
                            { value: 'warning', label: 'تحذير' },
                            { value: 'danger', label: 'خطر' },
                        ]
                    }
                ]}
                onApply={() => {}}
                onReset={() => {}}
            />

            {/* Table */}
            <AdvancedDataTable
                columns={columns}
                data={activityData}
                actions={actions}
                searchable={true}
                pagination={true}
                itemsPerPage={10}
                selectable={true}
                onSelectionChange={() => {}}
                onBulkAction={() => {}}
            />

            {/* Expanded Row Details */}
            {expandedRow && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-6"
                >
                    {(() => {
                        const item = activityData.find(a => a.id === expandedRow);
                        return (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">تفاصيل النشاط</h3>
                                    <button
                                        onClick={() => setExpandedRow(null)}
                                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">المستخدم</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.user}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">البريد الإلكتروني</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">عنوان IP</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.ip}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الجهاز</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.device}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">التاريخ والوقت</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{formatTime(item.timestamp)}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </motion.div>
            )}
        </div>
    );
}
