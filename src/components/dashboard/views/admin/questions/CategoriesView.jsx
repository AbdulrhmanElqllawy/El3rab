import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Plus, Edit2, Trash2 } from 'lucide-react';

const mockCategories = [
    { id: 1, name: 'التناظر اللفظي', count: 120, description: 'أسئلة عن العلاقات بين الكلمات' },
    { id: 2, name: 'إكمال الجمل', count: 95, description: 'أسئلة إكمال الجمل ناقصة' },
    { id: 3, name: 'الخطأ السياقي', count: 87, description: 'تحديد الخطأ في الجملة' },
    { id: 4, name: 'استيعاب المقروء', count: 110, description: 'أسئلة الفهم والاستيعاب' },
    { id: 5, name: 'المفردة الشاذة', count: 105, description: 'تحديد الكلمة الشاذة' },
];

export default function CategoriesView() {
    const [categories, setCategories] = useState(mockCategories);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">تصنيف الأسئلة</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إدارة تصنيفات وفئات الأسئلة</p>
                </div>
                <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2 bg-[#6C4CF1] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#5b3ee0] transition-colors">
                    <Plus className="w-4 h-4" />
                    تصنيف جديد
                </button>
            </div>

            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-5 space-y-3"
                >
                    <input
                        type="text"
                        placeholder="اسم التصنيف"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none"
                    />
                    <textarea
                        placeholder="وصف التصنيف"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none resize-none h-16"
                    />
                    <div className="flex gap-2">
                        <button className="flex-1 bg-[#6C4CF1] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#5b3ee0]">حفظ</button>
                        <button onClick={() => setShowAddForm(false)} className="flex-1 bg-gray-200 dark:bg-[#334155] text-gray-900 dark:text-white font-semibold px-4 py-2 rounded-lg">إلغاء</button>
                    </div>
                </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
                {categories.map((cat, i) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-5 space-y-3"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 bg-[#6C4CF1]/10 rounded-lg">
                                    <FolderOpen className="w-5 h-5 text-[#6C4CF1]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{cat.name}</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{cat.description}</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button className="text-[#00C2A8] hover:text-[#00b096]"><Edit2 className="w-4 h-4" /></button>
                                <button className="text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-bold text-[#6C4CF1]">{cat.count} سؤال</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
