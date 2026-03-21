import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, User, Clock } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';

const repliesData = [
    {
        id: 1,
        ticketId: 'TKT-001',
        title: 'مشكلة في الدخول',
        customer: 'محمد أحمد',
        thread: [
            { author: 'محمد أحمد', role: 'customer', message: 'لا أستطيع الدخول للحساب', time: '2024-03-21 10:30', type: 'initial' },
            { author: 'أحمد علي', role: 'support', message: 'شكراً على التواصل. هل تحصل على رسالة خطأ؟', time: '2024-03-21 10:45', type: 'response' },
            { author: 'محمد أحمد', role: 'customer', message: 'نعم، تقول إن البريد غير صحيح', time: '2024-03-21 11:00', type: 'reply' },
            { author: 'أحمد علي', role: 'support', message: 'يرجى إعادة تحديد كلمة المرور. سأرسل لك خطوات التفصيلة', time: '2024-03-21 11:15', type: 'response' },
        ],
        status: 'open'
    },
    {
        id: 2,
        ticketId: 'TKT-002',
        title: 'مشكلة في الدفع',
        customer: 'فاطمة علي',
        thread: [
            { author: 'فاطمة علي', role: 'customer', message: 'دفعتي لم تُقبل', time: '2024-03-20 14:20', type: 'initial' },
            { author: 'سارة محمود', role: 'support', message: 'سأتحقق من حسابك الآن', time: '2024-03-20 14:35', type: 'response' },
            { author: 'سارة محمود', role: 'support', message: 'وجدت المشكلة. يرجى المحاولة مرة أخرى', time: '2024-03-20 15:00', type: 'response' },
        ],
        status: 'resolved'
    },
];

export default function RepliesView() {
    const [selected, setSelected] = useState(repliesData[0]);
    const [replyText, setReplyText] = useState('');

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="الردود والمحادثات"
                description="متابعة ردود العملاء والمحادثات الجارية مع فريق الدعم"
            />

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Tickets List */}
                <div className="lg:col-span-1 space-y-2">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">التذاكر المفتوحة</h3>
                    {repliesData.map((ticket) => (
                        <motion.button
                            key={ticket.id}
                            onClick={() => setSelected(ticket)}
                            whileHover={{ scale: 1.02 }}
                            className={`w-full p-3 rounded-lg text-right transition-colors ${
                                selected.id === ticket.id 
                                    ? 'bg-[#6C4CF1] text-white' 
                                    : 'bg-white dark:bg-[#1E293B] hover:bg-gray-50 dark:hover:bg-[#0F172A]'
                            }`}
                        >
                            <p className="font-semibold text-sm truncate">{ticket.ticketId}</p>
                            <p className="text-xs opacity-75 truncate">{ticket.title}</p>
                        </motion.button>
                    ))}
                </div>

                {/* Chat */}
                <div className="lg:col-span-3 bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 flex flex-col h-96">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100 dark:border-[#334155]/50">
                        <h3 className="font-bold text-gray-900 dark:text-white">{selected.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selected.ticketId} • {selected.customer}</p>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {selected.thread.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-3 ${msg.role === 'support' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    msg.role === 'support' ? 'bg-[#6C4CF1]' : 'bg-gray-200 dark:bg-[#334155]'
                                }`}>
                                    <User className={`w-4 h-4 ${msg.role === 'support' ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                                </div>
                                <div className={`flex-1 ${msg.role === 'support' ? 'text-right' : ''}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm text-gray-900 dark:text-white">{msg.author}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {msg.time}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#0F172A] p-3 rounded-lg">
                                        {msg.message}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Reply Input */}
                    <div className="p-4 border-t border-gray-100 dark:border-[#334155]/50">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="اكتب ردك..."
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-gray-50 dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg bg-[#6C4CF1] text-white hover:bg-[#5b3ee0] transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
