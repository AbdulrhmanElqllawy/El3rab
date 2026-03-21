import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, AlertCircle, CheckCircle, Info, Settings, Bell, Trash2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import AdvancedFilters from '../../components/AdvancedFilters';
import StatusBadge from '../../components/StatusBadge';

const alertsData = [
    { id: 1, severity: 'high', title: 'استخدام عالي لقاعدة البيانات', message: 'استخدام قاعدة البيانات وصل إلى 85%', timestamp: '2024-03-21T10:30:00', read: false, category: 'system' },
    { id: 2, severity: 'medium', title: 'عدد متصلين كبير', message: 'عدد المتصلين حالياً 1234 مستخدم', timestamp: '2024-03-21T09:45:00', read: false, category: 'performance' },
    { id: 3, severity: 'low', title: 'نسخة احتياطية جديدة', message: 'تم إنشاء نسخة احتياطية بنجاح', timestamp: '2024-03-21T08:15:00', read: true, category: 'backup' },
    { id: 4, severity: 'high', title: 'محاولات دخول مريبة', message: 'تم اكتشاف 5 محاولات دخول فاشلة', timestamp: '2024-03-21T07:30:00', read: false, category: 'security' },
    { id: 5, severity: 'medium', title: 'تحديث النظام متاح', message: 'إصدار جديد متاح: v3.2.1', timestamp: '2024-03-21T06:00:00', read: true, category: 'update' },
];

export default function AdminAlertsView() {
    const [alerts, setAlerts] = useState(alertsData);
    const [filterSeverity, setFilterSeverity] = useState('all');
    const [filterRead, setFilterRead] = useState('all');

    const stats = [
        { label: 'إجمالي التنبيهات', value: alerts.length, icon: Bell, color: 'purple' },
        { label: 'تنبيهات عالية', value: alerts.filter(a => a.severity === 'high').length, icon: AlertTriangle, color: 'red' },
        { label: 'غير مقروءة', value: alerts.filter(a => !a.read).length, icon: AlertCircle, color: 'amber', trend: { direction: 'down', percentage: 20 } },
        { label: 'مقروءة', value: alerts.filter(a => a.read).length, icon: CheckCircle, color: 'green' },
    ];

    const severityConfig = {
        high: { 
            color: 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20',
            label: 'عالي',
            icon: AlertTriangle
        },
        medium: { 
            color: 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
            label: 'متوسط',
            icon: AlertCircle
        },
        low: { 
            color: 'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
            label: 'منخفض',
            icon: Info
        },
    };

    const categoryConfig = {
        system: 'نظام',
        performance: 'الأداء',
        backup: 'نسخ احتياطي',
        security: 'الأمان',
        update: 'تحديث'
    };

    const filteredAlerts = alerts.filter(alert => {
        const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
        const matchesRead = filterRead === 'all' || (filterRead === 'unread' ? !alert.read : alert.read);
        return matchesSeverity && matchesRead;
    });

    const dismissAlert = (id) => {
        setAlerts(alerts.filter(a => a.id !== id));
    };

    const markAsRead = (id) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
    };

    const markAllAsRead = () => {
        setAlerts(alerts.map(a => ({ ...a, read: true })));
    };

    const clearAll = () => {
        setAlerts([]);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = Number(now) - Number(date);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `منذ ${minutes} دقيقة`;
        if (hours < 24) return `منذ ${hours} ساعة`;
        if (days < 7) return `منذ ${days} يوم`;
        return date.toLocaleDateString('ar-SA');
    };

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="التنبيهات والإشعارات"
                    description="إدارة شاملة لتنبيهات النظام والإشعارات المهمة"
                />
                {alerts.length > 0 && (
                    <div className="flex gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={markAllAsRead}
                            className="px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors"
                        >
                            وضع علامة على الكل بأنه مقروء
                        </motion.button>
                    </div>
                )}
            </div>

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-4">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        المستوى
                    </label>
                    <select
                        value={filterSeverity}
                        onChange={(e) => setFilterSeverity(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                    >
                        <option value="all">جميع المستويات</option>
                        <option value="high">عالي</option>
                        <option value="medium">متوسط</option>
                        <option value="low">منخفض</option>
                    </select>
                </div>

                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-4">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        الحالة
                    </label>
                    <select
                        value={filterRead}
                        onChange={(e) => setFilterRead(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                    >
                        <option value="all">جميع التنبيهات</option>
                        <option value="unread">غير مقروءة</option>
                        <option value="read">مقروءة</option>
                    </select>
                </div>

                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-4">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        الإجراء
                    </label>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={clearAll}
                        disabled={alerts.length === 0}
                        className="w-full px-3 py-2 rounded-lg border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        حذف الكل
                    </motion.button>
                </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-3">
                {filteredAlerts.length > 0 ? (
                    <AnimatePresence mode="popLayout">
                        {filteredAlerts.map((alert, idx) => {
                            const config = severityConfig[alert.severity];
                            return (
                                <motion.div
                                    key={alert.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`${config.color} rounded-xl p-4 border transition-all hover:shadow-lg group ${alert.read ? 'opacity-75' : 'opacity-100'}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="p-2.5 rounded-lg bg-current/20 flex-shrink-0">
                                            {React.createElement(config.icon, { className: 'w-5 h-5' })}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <h4 className="font-bold text-sm">{alert.title}</h4>
                                                <div className="flex gap-1 flex-wrap">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${config.color}`}>
                                                        {config.label}
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
                                                        {categoryConfig[alert.category]}
                                                    </span>
                                                    {!alert.read && (
                                                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#6C4CF1] text-white">
                                                            جديد
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm mb-2">{alert.message}</p>
                                            <p className="text-xs opacity-75">{formatTime(alert.timestamp)}</p>
                                        </div>
                                        <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {!alert.read && (
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    onClick={() => markAsRead(alert.id)}
                                                    className="p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-colors"
                                                    title="وضع علامة بأنه مقروء"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </motion.button>
                                            )}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                onClick={() => dismissAlert(alert.id)}
                                                className="p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-colors"
                                                title="إزالة"
                                            >
                                                <X className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-12 text-center"
                    >
                        <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 font-semibold mb-2">لا توجد تنبيهات</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">اكتمل! لا توجد تنبيهات جديدة مطابقة لمرشحاتك</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
