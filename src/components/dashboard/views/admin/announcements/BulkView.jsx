import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Users, Clock } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import AdminModal from '../../../components/AdminModal';

export default function BulkView() {
    const [showComposeModal, setShowComposeModal] = useState(false);
    const [bulkMessages, setBulkMessages] = useState([
        { id: 1, title: 'دعوة للاشتراك في الكورس الجديد', recipients: 5000, sentDate: '2024-03-20', status: 'completed' },
        { id: 2, title: 'تذكير بموعد الاختبار', recipients: 3200, sentDate: '2024-03-19', status: 'completed' },
        { id: 3, title: 'عرض خاص متزامن', recipients: 8500, sentDate: '2024-03-18', status: 'scheduled' },
    ]);

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="الرسائل الجماعية"
                    description="إرسال رسائل جماعية إلى مجموعات محددة من المستخدمين"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowComposeModal(true)}
                    className="px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center gap-2"
                >
                    <Mail className="w-4 h-4" />
                    رسالة جماعية جديدة
                </motion.button>
            </div>

            {/* Template Builder */}
            <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">قوالب الرسائل</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[{ name: 'عرض ترويجي', icon: '🎁' }, { name: 'تذكير', icon: '⏰' }, { name: 'إعلان', icon: '📢' }].map((template, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 rounded-lg border border-gray-200 dark:border-[#334155] hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors text-center"
                        >
                            <div className="text-3xl mb-2">{template.icon}</div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{template.name}</p>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Messages History */}
            <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-[#334155]/50">
                    <h3 className="font-bold text-gray-900 dark:text-white">سجل الرسائل الجماعية</h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                    {bulkMessages.map((msg, idx) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                        >
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-white">{msg.title}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {msg.recipients.toLocaleString()} مستقبل
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {msg.sentDate}
                                    </div>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                msg.status === 'completed'
                                    ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                                    : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                            }`}>
                                {msg.status === 'completed' ? 'تم الإرسال' : 'مجدول'}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Compose Modal */}
            <AdminModal
                isOpen={showComposeModal}
                onClose={() => setShowComposeModal(false)}
                title="رسالة جماعية جديدة"
                size="lg"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المجموعة المستهدفة</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white">
                            <option>جميع الطلاب</option>
                            <option>الطلاب النشطاء</option>
                            <option>الطلاب الجدد</option>
                            <option>الطلاب المتقاعسون</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الموضوع</label>
                        <input
                            type="text"
                            placeholder="موضوع الرسالة"
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">النص</label>
                        <textarea
                            placeholder="نص الرسالة..."
                            rows={5}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white resize-none"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        إرسال الآن
                    </motion.button>
                </div>
            </AdminModal>
        </div>
    );
}
