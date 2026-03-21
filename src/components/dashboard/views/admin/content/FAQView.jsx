import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, ChevronDown } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';

const faqData = [
    {
        id: 1,
        question: 'كيف يمكنني إنشاء حساب؟',
        answer: 'يمكنك إنشاء حساب بسهولة من خلال التسجيل باستخدام بريدك الإلكتروني أو حسابك على تلغرام.',
        category: 'عام',
        views: 450
    },
    {
        id: 2,
        question: 'هل الاختبارات التدريبية مجانية؟',
        answer: 'نعم، توفر المنصة عددًا من الاختبارات المجانية ومميزات إضافية متقدمة للمشتركين.',
        category: 'الاختبارات',
        views: 320
    },
    {
        id: 3,
        question: 'كيف يمكنني الاتصال بفريق الدعم؟',
        answer: 'يمكنك التواصل معنا من خلال بريد الاتصال في الموقع أو رسالة مباشرة على حسابنا بتلغرام.',
        category: 'الدعم',
        views: 280
    },
];

export default function FAQView() {
    const [faqs, setFaqs] = useState(faqData);
    const [expandedId, setExpandedId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="الأسئلة الشائعة"
                    description="إدارة الأسئلة الشائعة والإجابات عليها"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    سؤال جديد
                </motion.button>
            </div>

            {/* Form */}
            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-6"
                >
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="السؤال"
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                        />
                        <textarea
                            placeholder="الإجابة"
                            rows={5}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white resize-none"
                        />
                        <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white">
                            <option>اختر الفئة</option>
                            <option>عام</option>
                            <option>الاختبارات</option>
                            <option>الدعم</option>
                            <option>الحسابات</option>
                        </select>
                        <div className="flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors"
                            >
                                حفظ
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setShowForm(false)}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-gray-200 dark:bg-[#334155] text-gray-900 dark:text-white font-semibold text-sm hover:bg-gray-300 transition-colors"
                            >
                                إلغاء
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* FAQ Accordion */}
            <div className="space-y-3">
                {faqs.map((faq, idx) => (
                    <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden hover:shadow-lg transition-all"
                    >
                        <button
                            onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#1E293B]/50 transition-colors text-right"
                        >
                            <div className="flex-1 text-right">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base mb-1">{faq.question}</h3>
                                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                                    <span className="bg-[#6C4CF1]/10 text-[#6C4CF1] px-2.5 py-0.5 rounded-full">{faq.category}</span>
                                    <span>{faq.views} عرض</span>
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                                className="ml-4 flex-shrink-0"
                            >
                                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {expandedId === faq.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t border-gray-100 dark:border-[#334155]/50"
                                >
                                    <div className="px-6 py-4 bg-gray-50 dark:bg-[#0F172A] space-y-4">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                                        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-[#334155]">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                className="flex-1 px-3 py-2 rounded-lg bg-[#6C4CF1]/10 text-[#6C4CF1] font-semibold text-sm hover:bg-[#6C4CF1]/20 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                تعديل
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                className="px-3 py-2 rounded-lg border border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
