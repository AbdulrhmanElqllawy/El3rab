import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, XCircle, Clock, RefreshCw, Home, Star } from 'lucide-react';
import { useSimulator } from '@/contexts/SimulatorContext';

function getPerformance(pct) {
    if (pct >= 85) return { label: 'ممتاز! 🎉', color: '#2DD4BF', bg: 'from-[#2DD4BF]/20 to-[#236D96]/20', border: '#2DD4BF', msg: 'أداء رائع، أنت على الطريق الصحيح!' };
    if (pct >= 65) return { label: 'جيد 👍', color: '#8B5CF6', bg: 'from-[#8B5CF6]/20 to-[#236D96]/20', border: '#8B5CF6', msg: 'نتيجة جيدة، استمر في التدريب لتحسينها.' };
    return { label: 'يحتاج تحسين 💪', color: '#FACC15', bg: 'from-[#FACC15]/15 to-[#FB923C]/10', border: '#FACC15', msg: 'لا تستسلم! راجع الدروس وأعد المحاولة.' };
}

function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m} دقيقة ${sec} ثانية`;
}

export default function ExamResultScreen({ total, correct, timeUsed, config, onRetry, onHome, questionDetails = [] }) {
    const { saveAttempt } = useSimulator();
    const wrong = total - correct;
    const pct = Math.round((correct / total) * 100);
    const perf = getPerformance(pct);

    const circumference = 2 * Math.PI * 54;
    const dash = (pct / 100) * circumference;

    // Save attempt to SimulatorContext
    useEffect(() => {
        const categoryPerformance = {};
        questionDetails.forEach(q => {
            if (!categoryPerformance[q.category]) {
                categoryPerformance[q.category] = 0;
            }
            if (q.isCorrect) {
                categoryPerformance[q.category] += 1;
            }
        });

        // Convert to percentages
        Object.keys(categoryPerformance).forEach(cat => {
            const catQuestions = questionDetails.filter(q => q.category === cat).length;
            if (catQuestions > 0) {
                categoryPerformance[cat] = Math.round((categoryPerformance[cat] / catQuestions) * 100);
            }
        });

        saveAttempt({
            type: config.type || 'full',
            examName: config.title || 'اختبار عام',
            bank: config.bank,
            test: config.test,
            totalQuestions: total,
            correctAnswers: correct,
            wrongAnswers: wrong,
            accuracy: pct,
            duration: timeUsed,
            status: 'completed',
            questionDetails: questionDetails.map((q, idx) => ({
                ...q,
                id: q.id || idx,
                timeSpent: q.timeSpent || 0,
            })),
            categoryPerformance,
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0A1120] flex items-center justify-center p-6 transition-colors duration-300" dir="rtl">
            <div className="w-full max-w-lg">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                    <div className={`bg-gradient-to-br ${perf.bg} rounded-3xl border-2 p-8 mb-4`} style={{ borderColor: `${perf.border}40` }}>
                        <div className="text-center mb-8">
                            {/* Circular Score */}
                            <div className="relative w-36 h-36 mx-auto mb-5">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="10" className="text-gray-200 dark:text-[#1E293B]" />
                                    <motion.circle
                                        cx="60" cy="60" r="54" fill="none"
                                        stroke={perf.color} strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        initial={{ strokeDashoffset: circumference }}
                                        animate={{ strokeDashoffset: circumference - dash }}
                                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <motion.p
                                        className="text-4xl font-black text-gray-900 dark:text-[#E2E8F0]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {pct}%
                                    </motion.p>
                                </div>
                            </div>

                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <p className="text-3xl font-black text-gray-900 dark:text-[#E2E8F0] mb-2">{perf.label}</p>
                                <p className="text-[#64748b] dark:text-[#94A3B8]">{perf.msg}</p>
                            </motion.div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {[
                                { icon: CheckCircle2, label: 'صحيح', value: correct, color: '#2DD4BF' },
                                { icon: XCircle, label: 'خطأ', value: wrong, color: '#EF4444' },
                                { icon: Clock, label: 'الوقت', value: formatTime(timeUsed), color: '#94A3B8', small: true },
                            ].map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-4 text-center shadow-sm dark:shadow-none border border-gray-100 dark:border-transparent"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <s.icon className="w-5 h-5 mx-auto mb-2" style={{ color: s.color }} />
                                    <p className={`font-black mb-1 ${s.small ? 'text-sm' : 'text-2xl'}`} style={{ color: s.color }}>{s.value}</p>
                                    <p className="text-[#64748b] dark:text-[#94A3B8] text-xs">{s.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stars */}
                        <motion.div
                            className="flex justify-center gap-1 mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            {[1, 2, 3].map(star => (
                                <Star
                                    key={star}
                                    className={`w-8 h-8 transition-all ${star <= Math.ceil(pct / 34) ? 'fill-[#FACC15] text-[#FACC15]' : 'text-gray-300 dark:text-[#334155]'}`}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <motion.button
                            onClick={onHome}
                            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/70 text-[#64748b] dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#E2E8F0] font-bold transition-all hover:border-gray-300 dark:hover:border-[#334155] shadow-sm dark:shadow-none"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <Home className="w-5 h-5" />
                            الرئيسية
                        </motion.button>
                        <motion.button
                            onClick={onRetry}
                            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-l from-[#8B5CF6] to-[#236D96] text-white font-black transition-all hover:opacity-90 hover:scale-105"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                        >
                            <RefreshCw className="w-5 h-5" />
                            إعادة المحاولة
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}