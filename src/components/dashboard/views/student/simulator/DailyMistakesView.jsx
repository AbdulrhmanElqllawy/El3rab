import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trash2, FolderPlus, MessageSquare } from 'lucide-react';
import { useSimulator } from '@/contexts/SimulatorContext';

export default function DailyMistakesView() {
    const { getDailyMistakes, removeMistake, updateMistakeNotes, folders } = useSimulator();
    const dailyMistakes = getDailyMistakes();
    const [expandedDays, setExpandedDays] = useState(new Set());
    const [editingNotes, setEditingNotes] = useState({});

    const toggleDayExpanded = (dateStr) => {
        setExpandedDays(prev => {
            const next = new Set(prev);
            if (next.has(dateStr)) next.delete(dateStr);
            else next.add(dateStr);
            return next;
        });
    };

    const handleNoteChange = (mistakeId, notes) => {
        setEditingNotes(prev => ({ ...prev, [mistakeId]: notes }));
    };

    const handleSaveNotes = (mistakeId) => {
        if (editingNotes[mistakeId]) {
            updateMistakeNotes(mistakeId, editingNotes[mistakeId]);
            setEditingNotes(prev => ({ ...prev, [mistakeId]: undefined }));
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const dateOnly = date.toISOString().split('T')[0];
        const todayStr = today.toISOString().split('T')[0];
        const yestStr = yesterday.toISOString().split('T')[0];

        if (dateOnly === todayStr) return 'اليوم';
        if (dateOnly === yestStr) return 'أمس';
        return date.toLocaleDateString('ar-EG', { weekday: 'long', month: 'short', day: 'numeric' });
    };

    return (
        <div className="space-y-4" dir="rtl">
            {Object.entries(dailyMistakes).length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-5xl mb-4">✨</div>
                    <p className="text-[#64748b] dark:text-[#94A3B8] font-bold mb-1">
                        لا توجد أخطاء مسجلة
                    </p>
                    <p className="text-sm text-[#94A3B8]">
                        ابدأ بحل الاختبارات لتتبع أخطائك
                    </p>
                </div>
            ) : (
                Object.entries(dailyMistakes).map(([dateStr, dayData]) => {
                    const isExpanded = expandedDays.has(dateStr);
                    return (
                        <motion.div
                            key={dateStr}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden shadow-sm"
                        >
                            {/* Day Header */}
                            <button
                                onClick={() => toggleDayExpanded(dateStr)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-left">
                                        <p className="font-bold text-gray-900 dark:text-[#E2E8F0]">
                                            {formatDate(dateStr)}
                                        </p>
                                        <p className="text-sm text-[#64748b] dark:text-[#94A3B8]">
                                            {dayData.count} خطأ
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <div className="flex gap-2">
                                            {Object.entries(dayData.categories).map(([cat, count]) => (
                                                <span
                                                    key={cat}
                                                    className="inline-flex items-center px-2 py-1 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs font-bold text-[#8B5CF6]"
                                                >
                                                    {cat}: {count}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-[#64748b] dark:text-[#94A3B8]" />
                                    </motion.div>
                                </div>
                            </button>

                            {/* Mistakes */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-gray-100 dark:border-[#334155]/50 divide-y divide-gray-100 dark:divide-[#334155]/50"
                                    >
                                        {dayData.mistakes.map(mistake => (
                                            <div
                                                key={mistake.id}
                                                className="p-4 space-y-3 hover:bg-gray-50 dark:hover:bg-[#0F172A]/50 transition-colors"
                                            >
                                                {/* Question */}
                                                <div>
                                                    <p className="text-sm text-[#64748b] dark:text-[#94A3B8] mb-1">
                                                        {mistake.category} — صعوبة: {mistake.difficulty === 'easy' ? 'سهل' : mistake.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                                                    </p>
                                                    <p className="font-bold text-gray-900 dark:text-[#E2E8F0]">
                                                        {mistake.questionText}
                                                    </p>
                                                </div>

                                                {/* Answers */}
                                                <div className="grid grid-cols-2 gap-3 text-sm">
                                                    <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg p-3">
                                                        <p className="text-[#64748b] dark:text-[#94A3B8] text-xs mb-1">إجابتك</p>
                                                        <p className="font-bold text-[#EF4444]">
                                                            {['أ', 'ب', 'ج', 'د'][mistake.userAnswer] || 'لم تجب'}
                                                        </p>
                                                    </div>
                                                    <div className="bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 rounded-lg p-3">
                                                        <p className="text-[#64748b] dark:text-[#94A3B8] text-xs mb-1">الإجابة الصحيحة</p>
                                                        <p className="font-bold text-[#2DD4BF]">
                                                            {['أ', 'ب', 'ج', 'د'][mistake.correctAnswer]}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Notes */}
                                                <div>
                                                    {editingNotes[mistake.id] !== undefined ? (
                                                        <div className="space-y-2">
                                                            <textarea
                                                                value={editingNotes[mistake.id]}
                                                                onChange={(e) =>
                                                                    handleNoteChange(mistake.id, e.target.value)
                                                                }
                                                                placeholder="أضف ملاحظاتك..."
                                                                className="w-full p-2 rounded-lg bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] text-gray-900 dark:text-[#E2E8F0] text-sm"
                                                                rows={3}
                                                            />
                                                            <button
                                                                onClick={() => handleSaveNotes(mistake.id)}
                                                                className="px-3 py-1.5 bg-[#6C4CF1] text-white text-sm font-bold rounded-lg hover:opacity-90 transition-all"
                                                            >
                                                                حفظ الملاحظة
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                handleNoteChange(
                                                                    mistake.id,
                                                                    mistake.notes || ''
                                                                )
                                                            }
                                                            className="flex items-center gap-2 text-sm text-[#6C4CF1] hover:text-[#7C5CFF] transition-colors font-bold"
                                                        >
                                                            <MessageSquare className="w-4 h-4" />
                                                            {mistake.notes
                                                                ? 'تعديل الملاحظة'
                                                                : 'إضافة ملاحظة'}
                                                        </button>
                                                    )}
                                                    {mistake.notes && editingNotes[mistake.id] === undefined && (
                                                        <p className="text-sm text-[#64748b] dark:text-[#94A3B8] mt-2 p-2 bg-gray-50 dark:bg-[#0F172A] rounded-lg border border-gray-200 dark:border-[#334155]">
                                                            {mistake.notes}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2 pt-2">
                                                    <button
                                                        onClick={() => removeMistake(mistake.id)}
                                                        className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20 transition-colors font-bold"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                        حذف
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })
            )}
        </div>
    );
}
