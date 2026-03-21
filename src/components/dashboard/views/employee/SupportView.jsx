import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Plus, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import EnhancedDataTable from '../../components/EnhancedDataTable';
import { StatCardGroup } from '../../components/EnhancedStatCard';
import { Card, CardHeader, CardBody } from '../../components/EnhancedCardComponents';
import EmptyState from '../../components/EnhancedEmptyState';

const supportData = [
    { id: 1, title: 'مشكلة في الوصول للمحاضرة', user: 'أحمد محمد', priority: 'عالي', status: 'جديد', date: '2024-03-21' },
    { id: 2, title: 'سؤال عن شهادة الإتمام', user: 'فاطمة علي', priority: 'عادي', status: 'قيد المعالجة', date: '2024-03-20' },
    { id: 3, title: 'طلب استرجاع الرسوم', user: 'محمد عمر', priority: 'عالي', status: 'مغلق', date: '2024-03-19' },
];

export default function EmployeeSupportView() {
    const [tickets, setTickets] = useState(supportData);
    const [loading] = useState(false);

    const stats = [
        { id: 1, label: 'إجمالي الطلبات', value: tickets.length, icon: MessageSquare, color: 'purple' },
        { id: 2, label: 'جديد', value: tickets.filter(t => t.status === 'جديد').length, icon: AlertCircle, color: 'red' },
        { id: 3, label: 'قيد المعالجة', value: tickets.filter(t => t.status === 'قيد المعالجة').length, icon: Clock, color: 'amber' },
        { id: 4, label: 'مغلق', value: tickets.filter(t => t.status === 'مغلق').length, icon: CheckCircle2, color: 'green' },
    ];

    const columns = [
        { key: 'title', label: 'الموضوع', sortable: true },
        { key: 'user', label: 'المستخدم', sortable: true },
        { key: 'priority', label: 'الأولوية', sortable: true, render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${
                val === 'عالي' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
                {val}
            </span>
        )},
        { key: 'status', label: 'الحالة', sortable: true, render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${
                val === 'جديد' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                val === 'قيد المعالجة' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            }`}>
                {val}
            </span>
        )},
    ];

    return (
        <div className="p-4 lg:p-6 space-y-8" dir="rtl">
            <PageHeader
                title="إدارة الدعم"
                description="تابع وأدر طلبات دعم العملاء"
                breadcrumbs={['الرئيسية', 'الدعم']}
            />

            {/* Stats */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">ملخص الطلبات</h2>
                <StatCardGroup stats={stats} columns={4} loading={loading} />
            </div>

            {/* Data Table */}
            <Card elevated>
                <CardHeader title="جميع طلبات الدعم" />
                <CardBody>
                    {tickets.length > 0 ? (
                        <EnhancedDataTable
                            columns={columns}
                            data={tickets}
                            searchPlaceholder="ابحث عن طلب..."
                            loading={loading}
                        />
                    ) : (
                        <EmptyState
                            title="لا توجد طلبات"
                            description="لا توجد طلبات دعم في الوقت الحالي"
                            action={{ label: 'عودة للصفحة الرئيسية' }}
                        />
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
