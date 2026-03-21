import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, Calendar } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';

const pagesData = [
    { id: 1, title: 'عن الموقع', slug: 'about', status: 'published', date: '2024-03-21', views: 1250 },
    { id: 2, title: 'الخصوصية', slug: 'privacy', status: 'published', date: '2024-03-20', views: 890 },
    { id: 3, title: 'شروط الاستخدام', slug: 'terms', status: 'published', date: '2024-03-19', views: 560 },
    { id: 4, title: 'اتصل بنا', slug: 'contact', status: 'draft', date: '2024-03-18', views: 0 },
];

export default function PagesView() {
    const [pages, setPages] = useState(pagesData);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="الصفحات الثابتة"
                    description="إدارة الصفحات الثابتة مثل عن الموقع والخصوصية"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2.5 rounded-lg bg-[#6C4CF1] text-white font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    صفحة جديدة
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
                            placeholder="عنوان الصفحة"
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                        />
                        <input
                            type="text"
                            placeholder="slug (النطاق)"
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                        />
                        <textarea
                            placeholder="محتوى الصفحة"
                            rows={8}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white resize-none"
                        />
                        <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white">
                            <option>منشورة</option>
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

            {/* Pages Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-[#334155]">
                            <th className="py-3.5 px-4 text-right font-bold text-gray-700 dark:text-gray-300">العنوان</th>
                            <th className="py-3.5 px-4 text-right font-bold text-gray-700 dark:text-gray-300">النطاق</th>
                            <th className="py-3.5 px-4 text-right font-bold text-gray-700 dark:text-gray-300">الحالة</th>
                            <th className="py-3.5 px-4 text-right font-bold text-gray-700 dark:text-gray-300">التاريخ</th>
                            <th className="py-3.5 px-4 text-right font-bold text-gray-700 dark:text-gray-300">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-[#334155]">
                        {pages.map((page, idx) => (
                            <motion.tr
                                key={page.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="hover:bg-gray-50 dark:hover:bg-[#1E293B]/50 transition-colors"
                            >
                                <td className="py-3.5 px-4 text-gray-900 dark:text-white font-medium">{page.title}</td>
                                <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400 font-mono text-xs bg-gray-100 dark:bg-[#0F172A] rounded px-2 py-1 w-fit">{page.slug}</td>
                                <td className="py-3.5 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                        page.status === 'published'
                                            ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                                            : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                                    }`}>
                                        {page.status === 'published' ? 'منشورة' : 'مسودة'}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400 text-xs">
                                    {new Date(page.date).toLocaleDateString('ar-SA')}
                                </td>
                                <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-2">
                                        <motion.button whileHover={{ scale: 1.1 }} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#1E293B] rounded-lg transition-colors">
                                            <Edit2 className="w-4 h-4 text-[#6C4CF1]" />
                                        </motion.button>
                                        <motion.button whileHover={{ scale: 1.1 }} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                        </motion.button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
