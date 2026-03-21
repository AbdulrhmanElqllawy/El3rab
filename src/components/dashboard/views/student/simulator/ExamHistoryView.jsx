import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, RotateCcw, Calendar, Target, Clock, CheckCircle2 } from 'lucide-react';
import { useSimulator } from '@/contexts/SimulatorContext';

export default function ExamHistoryView() {
    const { attempts } = useSimulator();
    const [sortBy, setSortBy] = useState('date'); // date, score, accuracy
    const [filterType, setFilterType] = useState('all');

    const filteredAttempts = filterType === 'all'
        ? attempts
        : attempts.filter(a => a.type === filterType);

    const sortedAttempts = [...filteredAttempts].sort((a, b) => {
        if (sortBy === 'date') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'score') {
            return b.accuracy - a.accuracy;
        }
        return 0;
    });

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', year: '2-digit' });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}د ${secs}ث`;
    };

    const getScoreColor = (accuracy) => {
        if (accuracy >= 85) return 'text-[#2DD4BF]';
        if (accuracy >= 65) return 'text-[#8B5CF6]';
        return 'text-[#FFD166]';
    };

    const examTypeLabel = (type) => {
        const labels = {
            'level': 'تحديد المستوى',
            'full': 'الاختبار الشامل',
            'banks': 'بنك محوسب',
            'levelup': 'رفع المستوى',
        };
        return labels[type] || type;
    };

    return (
        <div className="space-y-4" dir="rtl">
            {/* Controls */}
            <div className="flex gap-3 flex-wrap">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 text-gray-900 dark:text-[#E2E8F0] font-bold text-sm"
                >
                    <option value="date">ترتيب: الأحدث أولاً</option>
                    <option value="score">ترتيب: الأفضل أولاً</option>
                </select>

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 text-gray-900 dark:text-[#E2E8F0] font-bold text-sm"
                >
                    <option value="all">جميع الأنواع</option>
                    <option value="level">تحديد المستوى</option>
                    <option value="full">الاختبار الشامل</option>
                    <option value="banks">البنوك</option>
                    <option value="levelup">رفع المستوى</option>
                </select>
            </div>

            {/* Table */}
            {sortedAttempts.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-[#1E293B] rounded-2xl">
                    <div className="text-5xl mb-4">📋</div>
                    <p className="text-[#64748b] dark:text-[#94A3B8] font-bold mb-1">
                        لا توجد اختبارات
                    </p>
                    <p className="text-sm text-[#94A3B8]">
                        ابدأ باختبار جديد لإنشاء السجل
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-[#334155]/50">
                                <th className="px-4 py-3 text-right font-bold text-[#64748b] dark:text-[#94A3B8] text-sm">
                                    التاريخ
                                </th>
                                <th className="px-4 py-3 text-right font-bold text-[#64748b] dark:text-[#94A3B8] text-sm">
                                    الاختبار
                                </th>
                                <th className="px-4 py-3 text-center font-bold text-[#64748b] dark:text-[#94A3B8] text-sm">
                                    الدرجة
                                </th>
                                <th className="px-4 py-3 text-center font-bold text-[#64748b] dark:text-[#94A3B8] text-sm">
                                    الدقة
                                </th>
                                <th className="px-4 py-3 text-center font-bold text-[#64748b] dark:text-[#94A3B8] text-sm">
                                    الوقت
                                </th>
                                <th className="px-4 py-3 text-center font-bold text-[#64748b] dark:text-[#94A3B8] text-sm">
                                    الإجراءات
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                            {sortedAttempts.map((attempt, idx) => (
                                <motion.tr
                                    key={attempt.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-gray-50 dark:hover:bg-[#0F172A]/50 transition-colors"
                                >
                                    {/* Date */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-[#64748b] dark:text-[#94A3B8]" />
                                            <span className="font-bold text-gray-900 dark:text-[#E2E8F0] text-sm">
                                                {formatDate(attempt.createdAt)}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Exam Name */}
                                    <td className="px-4 py-3">
                                        <span className="font-bold text-gray-900 dark:text-[#E2E8F0] text-sm">
                                            {attempt.examName || examTypeLabel(attempt.type)}
                                        </span>
                                    </td>

                                    {/* Score */}
                                    <td className="px-4 py-3 text-center">
                                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#6C4CF1]/10 border border-[#6C4CF1]/20">
                                            <CheckCircle2 className="w-4 h-4 text-[#6C4CF1]" />
                                            <span className="font-black text-[#6C4CF1] text-sm">
                                                {attempt.correctAnswers}/{attempt.totalQuestions}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Accuracy */}
                                    <td className="px-4 py-3 text-center">
                                        <span className={`font-black text-lg ${getScoreColor(attempt.accuracy)}`}>
                                            {attempt.accuracy}%
                                        </span>
                                    </td>

                                    {/* Duration */}
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-1 text-[#64748b] dark:text-[#94A3B8] font-bold text-sm">
                                            <Clock className="w-4 h-4" />
                                            {formatTime(attempt.duration)}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                title="عرض التفاصيل"
                                                className="p-1.5 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                title="إعادة"
                                                className="p-1.5 rounded-lg bg-[#00C2A8]/10 text-[#00C2A8] hover:bg-[#00C2A8]/20 transition-colors"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Summary Stats */}
            {sortedAttempts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-[#6C4CF1]/10 to-[#00C2A8]/10 rounded-2xl border border-[#6C4CF1]/20"
                >
                    <div className="text-center">
                        <p className="text-[#64748b] dark:text-[#94A3B8] text-xs font-bold mb-1">
                            إجمالي الاختبارات
                        </p>
                        <p className="text-2xl font-black text-[#6C4CF1]">
                            {sortedAttempts.length}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-[#64748b] dark:text-[#94A3B8] text-xs font-bold mb-1">
                            أفضل درجة
                        </p>
                        <p className="text-2xl font-black text-[#2DD4BF]">
                            {Math.max(...sortedAttempts.map(a => a.accuracy))}%
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-[#64748b] dark:text-[#94A3B8] text-xs font-bold mb-1">
                            متوسط الدقة
                        </p>
                        <p className="text-2xl font-black text-[#00C2A8]">
                            {Math.round(
                                sortedAttempts.reduce((sum, a) => sum + a.accuracy, 0) /
                                sortedAttempts.length
                            )}%
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
