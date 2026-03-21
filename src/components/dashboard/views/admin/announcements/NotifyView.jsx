import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Send, Users, CheckCircle } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import AdminModal from '../../../components/AdminModal';

export default function NotifyView() {
    const [showSendModal, setShowSendModal] = useState(false);
    const [recipients, setRecipients] = useState('all');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [sentNotifications, setSentNotifications] = useState([
        { id: 1, title: 'كورس جديد متاح', recipients: 2150, sentDate: '2024-03-21', status: 'sent' },
        { id: 2, title: 'احصل على خصم 20%', recipients: 3400, sentDate: '2024-03-20', status: 'sent' },
        { id: 3, title: 'اختبار جديد جاهز', recipients: 1850, sentDate: '2024-03-19', status: 'sent' },
    ]);

    const handleSend = async () => {
        // Simulated send
        setSentNotifications([
            { id: sentNotifications.length + 1, title, recipients: 2500, sentDate: new Date().toISOString().split('T')[0], status: 'sent' },
            ...sentNotifications
        ]);
        setTitle('');
        setMessage('');
        setShowSendModal(false);
    };

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="إرسال الإشعارات"
                    description="إرسال إشعارات فورية للمستخدمين والطلاب"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowSendModal(true)}
                    className="px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center gap-2"
                >
                    <Send className="w-4 h-4" />
                    إرسال إشعار جديد
                </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الإشعارات المرسلة</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{sentNotifications.length}</p>
                        </div>
                        <Bell className="w-12 h-12 text-[#6C4CF1]/20" />
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">إجمالي المستقبلين</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{sentNotifications.reduce((sum, n) => sum + n.recipients, 0).toLocaleString()}</p>
                        </div>
                        <Users className="w-12 h-12 text-teal-500/20" />
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">معدل التسليم</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">100%</p>
                        </div>
                        <CheckCircle className="w-12 h-12 text-green-500/20" />
                    </div>
                </div>
            </div>

            {/* Notifications History */}
            <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-[#334155]/50">
                    <h3 className="font-bold text-gray-900 dark:text-white">سجل الإشعارات</h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                    {sentNotifications.map((notif, idx) => (
                        <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                        >
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-white">{notif.title}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{notif.sentDate}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900 dark:text-white">{notif.recipients.toLocaleString()}</p>
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-bold">
                                    تم الإرسال
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Send Modal */}
            <AdminModal
                isOpen={showSendModal}
                onClose={() => setShowSendModal(false)}
                title="إرسال إشعار جديد"
                size="lg"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المستقبلون</label>
                        <select
                            value={recipients}
                            onChange={(e) => setRecipients(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                        >
                            <option value="all">جميع المستخدمين</option>
                            <option value="students">الطلاب فقط</option>
                            <option value="employees">الموظفين فقط</option>
                            <option value="admins">الإداريين فقط</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">العنوان *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="عنوان الإشعار"
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">النص *</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="نص الإشعار"
                            rows={4}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white resize-none"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={handleSend}
                        disabled={!title || !message}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        إرسال الإشعار
                    </motion.button>
                </div>
            </AdminModal>
        </div>
    );
}
