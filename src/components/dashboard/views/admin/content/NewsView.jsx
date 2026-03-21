import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, Calendar, User } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';

const newsData = [
    { id: 1, title: 'إطلاق كورس جديد في الرياضيات', content: '...', author: 'أ. محمد', date: '2024-03-21', status: 'published', views: 450 },
    { id: 2, title: 'نتائج الاختبارات الشهرية', content: '...', author: 'أ. فاطمة', date: '2024-03-20', status: 'published', views: 320 },
    { id: 3, title: 'ندوة عن التحضير للاختبارات', content: '...', author: 'أ. علي', date: '2024-03-19', status: 'draft', views: 0 },
];

export default function NewsView() {
    const [news, setNews] = useState(newsData);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="إدارة الأخبار"
                    description="نشر وتحديث الأخبار والتحديثات على الموقع"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => { setEditingId(null); setShowForm(true); }}
                    className="px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    خبر جديد
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
                            placeholder="عنوان الخبر"
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                        />
                        <textarea
                            placeholder="محتوى الخبر"
                            rows={5}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white resize-none"
                        />
                        <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white">
                            <option>منشور</option>
                            <option>مسودة</option>
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

            {/* News List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {news.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-6 hover:shadow-lg transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-gray-900 dark:text-white flex-1">{item.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
                                item.status === 'published'
                                    ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                                    : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                            }`}>
                                {item.status === 'published' ? 'منشور' : 'مسودة'}
                            </span>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <User className="w-4 h-4" />
                                {item.author}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Calendar className="w-4 h-4" />
                                {new Date(item.date).toLocaleDateString('ar-SA')}
                            </div>
                            {item.status === 'published' && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <Eye className="w-4 h-4" />
                                    {item.views} عرض
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-[#334155]">
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
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
