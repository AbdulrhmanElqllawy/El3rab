import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Send, DollarSign } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import StatCard from '../../../components/StatCard';

const invoicesData = [
    { id: 1, invoiceNumber: 'INV-001', customer: 'محمد أحمد', amount: 1500, date: '2024-03-15', dueDate: '2024-03-25', status: 'paid', items: 3 },
    { id: 2, invoiceNumber: 'INV-002', customer: 'فاطمة علي', amount: 1200, date: '2024-03-14', dueDate: '2024-03-24', status: 'pending', items: 2 },
    { id: 3, invoiceNumber: 'INV-003', customer: 'علي محمود', amount: 800, date: '2024-03-13', dueDate: '2024-03-23', status: 'overdue', items: 1 },
    { id: 4, invoiceNumber: 'INV-004', customer: 'خديجة حسن', amount: 2000, date: '2024-03-12', dueDate: '2024-03-22', status: 'paid', items: 4 },
];

export default function InvoicesView() {
    const [invoices, setInvoices] = useState(invoicesData);
    const [filterStatus, setFilterStatus] = useState('all');

    const stats = [
        { label: 'إجمالي الفواتير', value: invoices.length, icon: FileText, color: 'purple' },
        { label: 'المبلغ المدفوع', value: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0), icon: DollarSign, color: 'green', subtitle: 'ر.س' },
        { label: 'المبلغ المعلق', value: invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0), icon: DollarSign, color: 'amber', subtitle: 'ر.س' },
        { label: 'فواتير متأخرة', value: invoices.filter(i => i.status === 'overdue').length, icon: FileText, color: 'red' },
    ];

    const filteredInvoices = filterStatus === 'all' ? invoices : invoices.filter(i => i.status === filterStatus);

    const getStatusColor = (status) => {
        switch(status) {
            case 'paid': return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400';
            case 'pending': return 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400';
            case 'overdue': return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400';
            default: return 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400';
        }
    };

    const getStatusLabel = (status) => {
        switch(status) {
            case 'paid': return 'مدفوع';
            case 'pending': return 'معلق';
            case 'overdue': return 'متأخر';
            default: return status;
        }
    };

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="الفواتير"
                description="إدارة وعرض جميع فواتير الاشتراكات والخدمات"
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
            <div className="flex gap-3 flex-wrap">
                {['all', 'paid', 'pending', 'overdue'].map((status) => (
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
                        {status === 'all' ? 'الكل' : status === 'paid' ? 'مدفوع' : status === 'pending' ? 'معلق' : 'متأخر'}
                    </motion.button>
                ))}
            </div>

            {/* Invoices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredInvoices.map((invoice, idx) => (
                    <motion.div
                        key={invoice.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-6 hover:shadow-lg transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{invoice.invoiceNumber}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.customer}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(invoice.status)}`}>
                                {getStatusLabel(invoice.status)}
                            </span>
                        </div>

                        <div className="space-y-2 mb-4 pb-4 border-b border-gray-100 dark:border-[#334155]">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">المبلغ:</span>
                                <span className="font-bold text-gray-900 dark:text-white">{invoice.amount} ر.س</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">تاريخ الإصدار:</span>
                                <span className="text-gray-900 dark:text-white">{new Date(invoice.date).toLocaleDateString('ar-SA')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">تاريخ الاستحقاق:</span>
                                <span className="text-gray-900 dark:text-white">{new Date(invoice.dueDate).toLocaleDateString('ar-SA')}</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="flex-1 px-3 py-2 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2"
                            >
                                <Eye className="w-4 h-4" />
                                عرض
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                                title="تحميل"
                            >
                                <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                                title="إرسال"
                            >
                                <Send className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
