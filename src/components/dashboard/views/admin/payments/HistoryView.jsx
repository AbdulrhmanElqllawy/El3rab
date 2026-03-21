import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import AdvancedDataTable from '../../../components/AdvancedDataTable';
import StatCard from '../../../components/StatCard';

const paymentHistory = [
    { id: 1, transactionId: 'TRX-001', customer: 'محمد أحمد', email: 'ahmed@example.com', amount: 150, method: 'بطاقة ائتمان', date: '2024-03-21', status: 'success' },
    { id: 2, transactionId: 'TRX-002', customer: 'فاطمة علي', email: 'fatima@example.com', amount: 120, method: 'تحويل بنكي', date: '2024-03-20', status: 'success' },
    { id: 3, transactionId: 'TRX-003', customer: 'علي محمود', email: 'ali@example.com', amount: 200, method: 'محفظة رقمية', date: '2024-03-20', status: 'pending' },
    { id: 4, transactionId: 'TRX-004', customer: 'خديجة حسن', email: 'khadija@example.com', amount: 100, method: 'بطاقة ائتمان', date: '2024-03-19', status: 'success' },
    { id: 5, transactionId: 'TRX-005', customer: 'يوسف محمود', email: 'youssef@example.com', amount: 150, method: 'تحويل بنكي', date: '2024-03-19', status: 'failed' },
];

export default function PaymentHistoryView() {
    const [payments, setPayments] = useState(paymentHistory);
    const [filterStatus, setFilterStatus] = useState('all');

    const stats = [
        { label: 'إجمالي المدفوعات', value: payments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0), icon: DollarSign, color: 'purple', subtitle: 'ر.س' },
        { label: 'عدد المعاملات', value: payments.length, icon: Users, color: 'teal' },
        { label: 'معاملات ناجحة', value: payments.filter(p => p.status === 'success').length, icon: TrendingUp, color: 'green' },
        { label: 'معاملات معلقة', value: payments.filter(p => p.status === 'pending').length, icon: Calendar, color: 'amber' },
    ];

    const filteredPayments = filterStatus === 'all' ? payments : payments.filter(p => p.status === filterStatus);

    const columns = [
        {
            key: 'transactionId',
            label: 'معرف المعاملة',
            render: (val) => <span className="font-bold text-[#6C4CF1]">{val}</span>
        },
        {
            key: 'customer',
            label: 'العميل',
            render: (val, item) => (
                <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{val}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.email}</p>
                </div>
            )
        },
        {
            key: 'amount',
            label: 'المبلغ',
            render: (val) => <span className="font-bold text-gray-900 dark:text-white">{val} ر.س</span>
        },
        {
            key: 'method',
            label: 'طريقة الدفع',
            render: (val) => <span className="text-gray-600 dark:text-gray-400">{val}</span>
        },
        {
            key: 'date',
            label: 'التاريخ',
            render: (val) => new Date(val).toLocaleDateString('ar-SA')
        },
        {
            key: 'status',
            label: 'الحالة',
            render: (val) => (
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    val === 'success' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' :
                    val === 'pending' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' :
                    'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                }`}>
                    {val === 'success' ? 'نجحت' : val === 'pending' ? 'معلقة' : 'فشلت'}
                </span>
            )
        },
    ];

    const actions = [
        { label: 'عرض التفاصيل', icon: <DollarSign className="w-4 h-4" /> },
        { label: 'تحميل الإيصال', icon: <DollarSign className="w-4 h-4" /> },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="سجل المدفوعات"
                description="عرض وتتبع جميع المعاملات المالية والمدفوعات"
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

            {/* Filters */}
            <div className="flex gap-3">
                {['all', 'success', 'pending', 'failed'].map((status) => (
                    <motion.button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                            filterStatus === status
                                ? 'bg-[#6C4CF1] text-white'
                                : 'bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-[#334155]/50 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#0F172A]'
                        }`}
                    >
                        {status === 'all' ? 'الكل' : status === 'success' ? 'نجحت' : status === 'pending' ? 'معلقة' : 'فشلت'}
                    </motion.button>
                ))}
            </div>

            {/* Table */}
            <AdvancedDataTable
                columns={columns}
                data={filteredPayments}
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
