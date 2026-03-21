import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Plus, Edit2, Trash2, Check } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';

const systemAlerts = [
    { id: 1, type: 'warning', title: 'صيانة مخطط لها', message: 'سيتم إجراء صيانة غداً من 2 إلى 4 صباحاً', date: '2024-03-22', priority: 'high', active: true },
    { id: 2, type: 'info', title: 'تحديث جديد متاح', message: 'تم دقة جديدة للنظام بتحسينات الأداء', date: '2024-03-21', priority: 'medium', active: true },
    { id: 3, type: 'danger', title: 'مشكلة أمنية', message: 'تم التعرف على محاولة اختراق وتم حجبها', date: '2024-03-21', priority: 'high', active: true },
    { id: 4, type: 'success', title: 'تحديث مكتمل', message: 'تم تحديث قاعدة البيانات بنجاح', date: '2024-03-20', priority: 'low', active: false },
];

export default function SystemView() {
    const [alerts, setAlerts] = useState(systemAlerts);
    const [showForm, setShowForm] = useState(false);

    const getTypeColor = (type) => {
        switch(type) {
            case 'danger': return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20';
            case 'warning': return 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
            case 'info': return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
            case 'success': return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20';
            default: return 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-500/20';
        }
    };

    const getTypeIcon = (type) => {
        return type === 'success' ? '✓' : type === 'danger' ? '⚠️' : type === 'warning' ? '⏰' : 'ℹ️';
    };

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="تنبيهات النظام"
                    description="إدارة التنبيهات والرسائل الحرجة للنظام"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    تنبيه جديد
                </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{alerts.length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي التنبيهات</p>
                </div>
                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-4 text-center">
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{alerts.filter(a => a.priority === 'high').length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">عالية الأولوية</p>
                </div>
                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-4 text-center">
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{alerts.filter(a => a.active).length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">نشطة الآن</p>
                </div>
                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-4 text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{alerts.filter(a => !a.active).length}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">محل العمل</p>
                </div>
            </div>

            {/* Form */}
            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-6"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">نوع التنبيه</label>
                            <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white">
                                <option>تحذير</option>
                                <option>معلومة</option>
                                <option>خطأ</option>
                                <option>نجاح</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">العنوان</label>
                            <input
                                type="text"
                                placeholder="عنوان التنبيه"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الرسالة</label>
                            <textarea
                                placeholder="رسالة التنبيه"
                                rows={3}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white resize-none"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            className="w-full px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors"
                        >
                            إنشاء التنبيه
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Alerts List */}
            <div className="space-y-3">
                {alerts.map((alert, idx) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`rounded-xl p-4 border ${getTypeColor(alert.type)} transition-all`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xl">{getTypeIcon(alert.type)}</span>
                                    <h4 className="font-bold text-sm">{alert.title}</h4>
                                    {alert.active && (
                                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-Current/20">
                                            نشط
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm mb-2">{alert.message}</p>
                                <p className="text-xs opacity-75">{alert.date}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    title="تعديل"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    title="حذف"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
