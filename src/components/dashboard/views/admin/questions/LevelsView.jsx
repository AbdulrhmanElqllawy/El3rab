import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus, Edit2, Trash2 } from 'lucide-react';

const mockLevels = [
    { id: 1, level: 'سهل جداً', range: '0-40', color: '#10B981', count: 45 },
    { id: 2, level: 'سهل', range: '40-60', color: '#3B82F6', count: 87 },
    { id: 3, level: 'متوسط', range: '60-70', color: '#F59E0B', count: 120 },
    { id: 4, level: 'صعب', range: '70-85', color: '#EF4444', count: 95 },
    { id: 5, level: 'صعب جداً', range: '85-100', color: '#7C3AED', count: 38 },
];

export default function DifficultyLevelsView() {
    const [levels, setLevels] = useState(mockLevels);
    const [editing, setEditing] = useState(null);

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">مستويات الصعوبة</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إدارة مستويات صعوبة الأسئلة</p>
                </div>
                <button className="flex items-center gap-2 bg-[#6C4CF1] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#5b3ee0] transition-colors">
                    <Plus className="w-4 h-4" />
                    مستوى جديد
                </button>
            </div>

            <div className="space-y-3">
                {levels.map((lvl, i) => (
                    <motion.div
                        key={lvl.id}
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-5 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: lvl.color }}></div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{lvl.level}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">النسبة: {lvl.range}%</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-[#6C4CF1]">{lvl.count} سؤال</span>
                            <div className="flex gap-1">
                                <button onClick={() => setEditing(lvl.id)} className="text-[#00C2A8] hover:text-[#00b096]"><Edit2 className="w-4 h-4" /></button>
                                <button className="text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {editing && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 dark:bg-blue-500/10 rounded-2xl border border-blue-200 dark:border-blue-500/20 p-5 space-y-3"
                >
                    <p className="text-sm text-blue-700 dark:text-blue-400 font-semibold">تعديل المستوى</p>
                    <div className="grid md:grid-cols-2 gap-3">
                        <input type="text" placeholder="اسم المستوى" className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none" />
                        <input type="text" placeholder="النسبة الدنيا" className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none" />
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-[#6C4CF1] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#5b3ee0]">حفظ</button>
                        <button onClick={() => setEditing(null)} className="bg-gray-200 dark:bg-[#334155] text-gray-900 dark:text-white font-semibold px-4 py-2 rounded-lg">إلغاء</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
