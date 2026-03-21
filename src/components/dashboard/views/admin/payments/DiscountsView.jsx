import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Plus, Edit2, Trash2, Copy, Eye, ToggleLeft } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import StatCard from '../../../components/StatCard';
import AdminModal from '../../../components/AdminModal';

const discountsData = [
    { id: 1, code: 'SAVE2024', discount: 20, type: 'percentage', maxUses: 100, usedCount: 45, active: true, expiryDate: '2024-12-31' },
    { id: 2, code: 'STUDENT50', discount: 50, type: 'fixed', maxUses: 500, usedCount: 280, active: true, expiryDate: '2024-06-30' },
    { id: 3, code: 'WELCOME100', discount: 100, type: 'fixed', maxUses: 200, usedCount: 150, active: true, expiryDate: '2024-04-30' },
    { id: 4, code: 'NEWUSER2024', discount: 15, type: 'percentage', maxUses: 1000, usedCount: 750, active: false, expiryDate: '2024-03-25' },
];

export default function DiscountsView() {
    const [discounts, setDiscounts] = useState(discountsData);
    const [showAddModal, setShowAddModal] = useState(false);

    const stats = [
        { label: 'إجمالي الخصومات', value: discounts.length, icon: Gift, color: 'purple' },
        { label: 'خصومات نشطة', value: discounts.filter(d => d.active).length, icon: Gift, color: 'green' },
        { label: 'الاستخدامات الكلية', value: discounts.reduce((sum, d) => sum + d.usedCount, 0), icon: Gift, color: 'teal' },
        { label: 'معدل الاستخدام', value: ((discounts.reduce((sum, d) => sum + d.usedCount, 0) / discounts.reduce((sum, d) => sum + d.maxUses, 0)) * 100).toFixed(1), icon: Gift, color: 'amber', subtitle: '%' },
    ];

    const toggleActive = (id) => {
        setDiscounts(discounts.map(d => d.id === id ? { ...d, active: !d.active } : d));
    };

    const usagePercentage = (used, max) => ((used / max) * 100).toFixed(0);

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="العروض والخصومات"
                    description="إدارة أكواد الخصم والعروض الترويجية"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    إضافة خصم جديد
                </motion.button>
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
                        trend={undefined}
                        subtitle={stat.subtitle || undefined}
                        onClick={() => {}}
                    />
                ))}
            </div>

            {/* Discounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {discounts.map((discount, idx) => (
                    <motion.div
                        key={discount.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-6 hover:shadow-lg transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{discount.code}</h3>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                        discount.type === 'percentage'
                                            ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
                                            : 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400'
                                    }`}>
                                        {discount.type === 'percentage' ? `${discount.discount}%` : `${discount.discount} ر.س`}
                                    </span>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        onClick={() => toggleActive(discount.id)}
                                        className={`p-2 rounded-lg transition-colors ${
                                            discount.active
                                                ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400'
                                                : 'bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400'
                                        }`}
                                    >
                                        <ToggleLeft className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-3 mb-4 pb-4 border-b border-gray-100 dark:border-[#334155]">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">الاستخدام</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{discount.usedCount} / {discount.maxUses}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-[#0F172A] rounded-full h-2">
                                    <div 
                                        className="bg-[#6C4CF1] h-2 rounded-full"
                                        style={{ width: `${usagePercentage(discount.usedCount, discount.maxUses)}%` }}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">تاريخ الانتهاء:</span>
                                <span className="text-gray-900 dark:text-white">{new Date(discount.expiryDate).toLocaleDateString('ar-SA')}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="flex-1 px-3 py-2 rounded-lg bg-[#6C4CF1]/10 text-[#6C4CF1] font-semibold text-sm hover:bg-[#6C4CF1]/20 transition-colors flex items-center justify-center gap-2"
                            >
                                <Copy className="w-4 h-4" />
                                نسخ
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                            >
                                <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-2 rounded-lg border border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            >
                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Add Discount Modal */}
            <AdminModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="إضافة خصم جديد"
                size="lg"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">كود الخصم</label>
                        <input
                            type="text"
                            placeholder="مثال: SAVE2024"
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">نوع الخصم</label>
                            <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white">
                                <option>نسبة مئوية (%)</option>
                                <option>مبلغ ثابت (ر.س)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">قيمة الخصم</label>
                            <input
                                type="number"
                                placeholder="مثال: 20"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">عدد الاستخدامات</label>
                            <input
                                type="number"
                                placeholder="بدون حد"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">تاريخ الانتهاء</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                            />
                        </div>
                    </div>
                </div>
            </AdminModal>
        </div>
    );
}
