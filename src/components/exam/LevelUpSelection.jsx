import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpCircle } from 'lucide-react';

const TYPES = [
    { id: 'analogy', label: 'التناظر اللفظي', emoji: '🔗', color: '#2DD4BF', desc: 'قياس العلاقات بين المفردات' },
    { id: 'completion', label: 'إكمال الجمل', emoji: '✏️', color: '#8B5CF6', desc: 'اختيار الكلمة المناسبة للجملة' },
    { id: 'context', label: 'الخطأ السياقي', emoji: '🔍', color: '#FB923C', desc: 'اكتشاف الكلمة الخاطئة في السياق' },
    { id: 'reading', label: 'استيعاب المقروء', emoji: '📖', color: '#FACC15', desc: 'فهم النصوص والإجابة عن أسئلتها' },
    { id: 'odd', label: 'المفردة الشاذة', emoji: '⚡', color: '#EF4444', desc: 'تحديد الكلمة التي لا تنتمي للمجموعة' },
];

export default function LevelUpSelection({ onStart, onBack }) {
    return (
        <div className="container mx-auto px-6 pb-20 max-w-3xl">
            <button onClick={onBack} className="flex items-center gap-2 text-[#64748b] dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#E2E8F0] mb-8 text-sm font-medium transition-colors group">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                العودة لأنواع الاختبارات
            </button>

            <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] font-semibold text-sm mb-4">
                    <ArrowUpCircle className="w-4 h-4" />
                    رفع المستوى
                </span>
                <h2 className="text-3xl font-black text-gray-900 dark:text-[#E2E8F0]">اختر نوع السؤال</h2>
                <p className="text-[#64748b] dark:text-[#94A3B8] mt-2">سيتم إعطاؤك 50 سؤالاً في النوع المختار</p>
            </div>

            <div className="space-y-3">
                {TYPES.map((type, i) => (
                    <motion.button
                        key={type.id}
                        className="w-full group bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-[#334155]/70 hover:border-gray-300 dark:hover:border-[#334155] p-5 flex items-center gap-4 text-right transition-all duration-300 shadow-sm dark:shadow-none"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        whileHover={{ x: -4 }}
                        onClick={() => onStart({ type: 'levelup', questionType: type.id, label: type.label })}
                    >
                        <div className="text-3xl flex-shrink-0">{type.emoji}</div>
                        <div className="flex-1 text-right">
                            <p className="text-gray-900 dark:text-[#E2E8F0] font-bold text-base">{type.label}</p>
                            <p className="text-[#64748b] dark:text-[#94A3B8] text-sm">{type.desc}</p>
                        </div>
                        <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: `${type.color}25`, border: `1px solid ${type.color}40` }}
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" style={{ color: type.color }} />
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}