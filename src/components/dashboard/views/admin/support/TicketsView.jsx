import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Search, MoreVertical, Clock, AlertCircle, CheckCircle, Eye, Archive, X, MessageCircle, Send, Hash } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import AdvancedDataTable from '../../../components/AdvancedDataTable';
import AdvancedFilters from '../../../components/AdvancedFilters';
import StatCard from '../../../components/StatCard';
import StatusBadge from '../../../components/StatusBadge';
import AdminModal from '../../../components/AdminModal';

const ticketsData = [
    { id: 'TKT-001', title: 'مشكلة في الدخول للمنصة', customer: 'أحمد محمد', email: 'ahmed@example.com', status: 'open', priority: 'high', category: 'technical', created: '2024-03-21T10:00:00', updated: '2024-03-21T10:30:00', assignedTo: 'محمود', messageCount: 3 },
    { id: 'TKT-002', title: 'طلب استرجاع مبلغ', customer: 'سارة علي', email: 'sara@example.com', status: 'in_progress', priority: 'medium', category: 'billing', created: '2024-03-20T14:00:00', updated: '2024-03-21T08:00:00', assignedTo: 'فاطمة', messageCount: 5 },
    { id: 'TKT-003', title: 'تحديث ملف المستخدم', customer: 'عمر يوسف', email: 'omar@example.com', status: 'resolved', priority: 'low', category: 'account', created: '2024-03-19T10:00:00', updated: '2024-03-20T15:00:00', assignedTo: 'علي', messageCount: 2 },
    { id: 'TKT-004', title: 'شهادة لم تصل إلى بريدي', customer: 'نورة الحربي', email: 'nora@example.com', status: 'open', priority: 'medium', category: 'certificate', created: '2024-03-21T09:00:00', updated: '2024-03-21T11:00:00', assignedTo: 'لم يتم التعيين', messageCount: 1 },
];

export default function AdminSupportTicketsView() {
    const [tickets, setTickets] = useState(ticketsData);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');

    const stats = [
        { label: 'إجمالي التذاكر', value: tickets.length, icon: MessageSquare, color: 'purple' },
        { label: 'تذاكر مفتوحة', value: tickets.filter(t => t.status === 'open').length, icon: AlertCircle, color: 'red' },
        { label: 'قيد المعالجة', value: tickets.filter(t => t.status === 'in_progress').length, icon: Clock, color: 'amber' },
        { label: 'مغلقة', value: tickets.filter(t => t.status === 'resolved').length, icon: CheckCircle, color: 'green' },
    ];

    const statusConfig = {
        open: { label: 'مفتوحة', badge: 'pending' },
        in_progress: { label: 'قيد المعالجة', badge: 'pending' },
        resolved: { label: 'مغلقة', badge: 'approved' },
        closed: { label: 'أرشيف', badge: 'archived' },
    };

    const priorityConfig = {
        high: { label: 'عالية', color: 'text-red-600 dark:text-red-400' },
        medium: { label: 'متوسطة', color: 'text-amber-600 dark:text-amber-400' },
        low: { label: 'منخفضة', color: 'text-blue-600 dark:text-blue-400' },
    };

    const categoryLabels = {
        technical: 'مشكلة تقنية',
        billing: 'فواتير',
        account: 'حساب المستخدم',
        certificate: 'شهادات',
        other: 'أخرى'
    };

    const filteredTickets = tickets.filter(ticket => {
        const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
        return matchesStatus && matchesPriority;
    });

    const columns = [
        {
            key: 'id',
            label: 'رقم التذكرة',
            width: 'w-32',
            render: (val) => (
                <span className="font-bold text-[#6C4CF1]">{val}</span>
            )
        },
        {
            key: 'title',
            label: 'الموضوع',
            render: (val, item) => (
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{val}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.customer}</p>
                </div>
            )
        },
        {
            key: 'status',
            label: 'الحالة',
            render: (val) => (
                <StatusBadge status={statusConfig[val].badge} size="sm" icon={undefined} />
            )
        },
        {
            key: 'priority',
            label: 'الأولوية',
            render: (val) => (
                <span className={`font-semibold text-sm ${priorityConfig[val].color}`}>
                    {priorityConfig[val].label}
                </span>
            )
        },
        {
            key: 'category',
            label: 'الفئة',
            render: (val) => (
                <span className="px-2.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                    {categoryLabels[val]}
                </span>
            )
        },
        {
            key: 'messageCount',
            label: 'الرسائل',
            render: (val) => (
                <span className="flex items-center gap-1 text-sm">
                    <MessageCircle className="w-4 h-4" />
                    {val}
                </span>
            )
        },
    ];

    const actions = [
        {
            label: 'عرض التفاصيل',
            icon: <Eye className="w-4 h-4" />,
            onClick: (item) => {
                setSelectedTicket(item);
                setShowDetailModal(true);
            }
        },
        {
            label: 'الرد',
            icon: <Send className="w-4 h-4" />,
            className: 'text-[#6C4CF1] hover:bg-purple-100 dark:hover:bg-purple-900/30',
            onClick: (item) => alert(`الرد على: ${item.id}`)
        },
        {
            label: 'إغلاق',
            icon: <X className="w-4 h-4" />,
            className: 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30',
            onClick: (item) => {
                setTickets(tickets.map(t => t.id === item.id ? { ...t, status: 'resolved' } : t));
            }
        },
    ];

    const handleReply = () => {
        if (!replyText.trim()) return;
        alert(`تم إرسال الرد: ${replyText}`);
        setReplyText('');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="تذاكر الدعم الفني"
                description="إدارة شاملة لتذاكر الدعم والشكاوى"
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <StatCard trend={undefined} subtitle={undefined} onClick={undefined} key={stat.label} {...stat} />
                ))}
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-4">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">الحالة</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                    >
                        <option value="all">جميع الحالات</option>
                        <option value="open">مفتوحة</option>
                        <option value="in_progress">قيد المعالجة</option>
                        <option value="resolved">مغلقة</option>
                    </select>
                </div>

                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-4">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">الأولوية</label>
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                    >
                        <option value="all">جميع الأولويات</option>
                        <option value="high">عالية</option>
                        <option value="medium">متوسطة</option>
                        <option value="low">منخفضة</option>
                    </select>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#6C4CF1] text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    تذكرة جديدة
                </motion.button>
            </div>

            {/* Data Table */}
            <AdvancedDataTable
                columns={columns}
                data={filteredTickets}
                actions={actions}
                searchable={true}
                pagination={true}
                itemsPerPage={10}
                selectable={true} onSelectionChange={undefined} onBulkAction={undefined}            />

            {/* Detail Modal */}
            <AdminModal
                isOpen={showDetailModal}
                onClose={() => {
                    setShowDetailModal(false);
                    setSelectedTicket(null);
                }}
                title={selectedTicket ? `التذكرة: ${selectedTicket.id}` : ''}
                size="lg"
                actions={[
                    { label: 'إغلاق', variant: 'secondary', onClick: () => setShowDetailModal(false) },
                    { label: 'حفظ', variant: 'primary', onClick: () => { handleReply(); setShowDetailModal(false); } }
                ]}
            >
                {selectedTicket && (
                    <div className="space-y-6">
                        {/* Ticket Info */}
                        <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">الموضوع</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{selectedTicket.title}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">العميل</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{selectedTicket.customer}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">الأولوية</p>
                                    <p className={`text-sm font-bold mt-1 ${priorityConfig[selectedTicket.priority].color}`}>
                                        {priorityConfig[selectedTicket.priority].label}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">الفئة</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                                        {categoryLabels[selectedTicket.category]}
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">معين إلى</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{selectedTicket.assignedTo}</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                المحادثة ({selectedTicket.messageCount})
                            </h4>
                            <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-4 space-y-3 max-h-64 overflow-y-auto">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        👤
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400">{selectedTicket.customer} - 2024-03-21 10:00</p>
                                        <p className="text-sm text-gray-900 dark:text-white mt-1">أنا أواجه مشكلة في تسجيل الدخول</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        👨‍💼
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400">{selectedTicket.assignedTo} - 2024-03-21 10:30</p>
                                        <p className="text-sm text-gray-900 dark:text-white mt-1">شكراً للتواصل معنا. يرجى التحقق من بيانات دخولك</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reply Box */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">الرد</label>
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1] resize-none"
                                placeholder="اكتب ردك هنا..."
                            />
                        </div>
                    </div>
                )}
            </AdminModal>
        </div>
    );
}
