import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flag, ChevronRight, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import ExamResultScreen from './ExamResultScreen';

// Generate mock questions
function generateQuestions(count) {
    const options = ['الخيار الأول', 'الخيار الثاني', 'الخيار الثالث', 'الخيار الرابع'];
    const categories = ['التناظر اللفظي', 'إكمال الجمل', 'الخطأ السياقي', 'استيعاب المقروء', 'المفردة الشاذة'];
    const difficulties = ['easy', 'medium', 'hard'];

    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        text: `السؤال رقم ${i + 1}: ليل : ظلام`,
        category: categories[i % categories.length],
        difficulty: difficulties[i % difficulties.length],
        options: ['سفر : تعب', 'هواء : تنقية', 'ثمر : سوق', 'سمك : صيد'],
        correct: 0,
    }));
}

const OPTION_LABELS = ['أ', 'ب', 'ج', 'د'];

export default function ExamInterface({ config, onEnd }) {
    const totalSeconds = (config.minutes || 45) * 60;
    const questions = generateQuestions(config.count || 20);

    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [marked, setMarked] = useState(new Set());
    const [timeLeft, setTimeLeft] = useState(totalSeconds);
    const [showSubmit, setShowSubmit] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) { clearInterval(timerRef.current); handleSubmitConfirm(); return 0; }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, []);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const handleAnswer = (optIdx) => {
        setAnswers(prev => ({ ...prev, [current]: optIdx }));
    };

    const toggleMark = () => {
        setMarked(prev => {
            const next = new Set(prev);
            next.has(current) ? next.delete(current) : next.add(current);
            return next;
        });
    };

    const handleSubmitConfirm = () => {
        clearInterval(timerRef.current);
        setShowSubmit(false);
        setSubmitted(true);
    };

    const getQuestionStatus = (idx) => {
        if (idx === current) return 'current';
        if (marked.has(idx)) return 'marked';
        if (answers[idx] !== undefined) return 'answered';
        return 'unanswered';
    };

    const answeredCount = Object.keys(answers).length;
    const unansweredCount = questions.length - answeredCount;

    if (submitted) {
        const correct = Object.entries(answers).filter(([idx, ans]) => questions[idx].correct === ans).length;
        const questionDetails = questions.map((q, idx) => ({
            id: q.id,
            text: q.text,
            category: q.category || 'عام',
            difficulty: q.difficulty || 'medium',
            userAnswer: answers[idx],
            correctAnswer: q.correct,
            isCorrect: answers[idx] === q.correct,
            timeSpent: 0, // Could be tracked if timer is per question
            isMarked: marked.has(idx),
        }));

        return <ExamResultScreen
            total={questions.length}
            correct={correct}
            timeUsed={totalSeconds - timeLeft}
            config={config}
            onRetry={() => onEnd('retry')}
            onHome={() => onEnd('home')}
            questionDetails={questionDetails}
        />;
    }
    // const [seconds, setSeconds] = useState(0)

    // useEffect(() => {
    //   const timer = setInterval(() => {
    //     setSeconds(prev => prev + 1)
    //   }, 1000)

    //   return () => clearInterval(timer)
    // }, [])

    const isWarning = timeLeft < 60;
    const isLow = timeLeft < 300;

    return (
        <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0A1120] transition-colors duration-300" dir="rtl">
            {/* Top Bar */}
            <div className="sticky top-0 z-30 bg-[#f1f5f9]/95 dark:bg-[#0A1120]/95 backdrop-blur-xl border-b border-gray-200 dark:border-[#1E293B]">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-[#64748b] dark:text-[#94A3B8] text-sm hidden sm:block">{config.title}</span>
                        <span className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 text-gray-900 dark:text-[#E2E8F0] text-sm font-bold px-3 py-1.5 rounded-xl shadow-sm dark:shadow-none">
                            {current + 1} / {questions.length}
                        </span>
                    </div>

                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-black text-xl transition-colors ${
                        isWarning ? 'bg-[#EF4444]/15 border-[#EF4444]/40 text-[#EF4444] animate-pulse' :
                        isLow ? 'bg-[#FACC15]/10 border-[#FACC15]/30 text-[#FACC15]' :
                        'bg-white dark:bg-[#1E293B] border-gray-200 dark:border-[#334155]/60 text-[#2DD4BF] shadow-sm dark:shadow-none'
                    }`}>
                        <Clock className="w-5 h-5" />
                        {formatTime(timeLeft)}
                    </div>

                    <button
                        onClick={() => setShowSubmit(true)}
                        className="bg-gradient-to-l from-[#8B5CF6] to-[#236D96] hover:opacity-90 text-white font-bold text-sm px-5 py-2 rounded-xl transition-all hover:scale-105"
                    >
                        إنهاء الاختبار
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 flex flex-col xl:flex-row gap-6">
                {/* Main Question Area */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Question Card */}
                            <div className="bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-200 dark:border-[#334155]/70 p-6 md:p-8 mb-5 shadow-sm dark:shadow-none">
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#236D96] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                                            {current + 1}
                                        </div>
                                        <span className="text-[#94A3B8] text-sm">السؤال</span>
                                    </div>
                                    <button
                                        onClick={toggleMark}
                                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                                            marked.has(current)
                                                ? 'bg-[#FACC15]/15 border-[#FACC15]/40 text-[#FACC15]'
                                                : 'bg-gray-100 dark:bg-[#0F172A]/50 border-gray-200 dark:border-[#334155]/50 text-[#64748b] dark:text-[#94A3B8] hover:text-[#FACC15] hover:border-[#FACC15]/30'
                                        }`}
                                    >
                                        <Flag className="w-3.5 h-3.5" />
                                        {marked.has(current) ? 'محدّد للمراجعة' : 'حدّد للمراجعة'}
                                    </button>
                                </div>

                                <p className="text-gray-900 dark:text-[#E2E8F0] text-lg leading-relaxed font-medium">
                                    {questions[current].text}
                                </p>
                            </div>

                            {/* Options */}
                            <div className="space-y-3">
                                {questions[current].options.map((opt, i) => {
                                    const selected = answers[current] === i;
                                    return (
                                        <motion.button
                                            key={i}
                                            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-right transition-all duration-200 ${
                                                selected
                                                    ? 'bg-[#8B5CF6]/15 border-[#8B5CF6]/60 shadow-lg shadow-[#8B5CF6]/10'
                                                    : 'bg-white dark:bg-[#1E293B] border-gray-200 dark:border-[#334155]/60 hover:border-gray-300 dark:hover:border-[#334155] shadow-sm dark:shadow-none'
                                            }`}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => handleAnswer(i)}
                                        >
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-all ${
                                                selected
                                                    ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/30'
                                                    : 'bg-gray-100 dark:bg-[#0F172A]/60 border border-gray-200 dark:border-[#334155]/50 text-[#64748b] dark:text-[#94A3B8]'
                                            }`}>
                                                {OPTION_LABELS[i]}
                                            </div>
                                            <span className={`text-base font-medium flex-1 ${selected ? 'text-gray-900 dark:text-[#E2E8F0]' : 'text-[#64748b] dark:text-[#94A3B8]'}`}>
                                                {opt}
                                            </span>
                                            {selected && <CheckCircle2 className="w-5 h-5 text-[#8B5CF6] flex-shrink-0" />}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Navigation */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    disabled={current === 0}
                                    onClick={() => setCurrent(c => c - 1)}
                                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/70 text-[#64748b] dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#E2E8F0] hover:border-gray-300 dark:hover:border-[#334155] disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-sm shadow-sm dark:shadow-none"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                    السابق
                                </button>
                                <button
                                    disabled={current === questions.length - 1}
                                    onClick={() => setCurrent(c => c + 1)}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-l from-[#8B5CF6]/20 to-[#236D96]/20 border border-[#8B5CF6]/30 text-[#A78BFA] hover:from-[#8B5CF6]/30 hover:to-[#236D96]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-sm"
                                >
                                    التالي
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Sidebar */}
                <div className="xl:w-72 flex-shrink-0">
                    <div className="bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-200 dark:border-[#334155]/70 p-5 sticky top-24 shadow-sm dark:shadow-none">
                        <h3 className="text-gray-900 dark:text-[#E2E8F0] font-bold mb-4 text-sm">لوحة الأسئلة</h3>

                        {/* Legend */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {[
                                { color: 'bg-[#8B5CF6]', label: 'الحالي' },
                                { color: 'bg-[#2DD4BF]', label: 'تمّت الإجابة' },
                                { color: 'bg-[#FACC15]', label: 'للمراجعة' },
                                { color: 'bg-gray-300 dark:bg-[#334155]', label: 'لم يُجب' },
                            ].map(l => (
                                <div key={l.label} className="flex items-center gap-1.5">
                                    <div className={`w-3 h-3 rounded ${l.color}`} />
                                    <span className="text-[#64748b] dark:text-[#94A3B8] text-xs">{l.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-7 gap-1.5 mb-5">
                            {questions.map((_, idx) => {
                                const status = getQuestionStatus(idx);
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrent(idx)}
                                        className={`aspect-square rounded-lg text-xs font-bold transition-all duration-150 hover:scale-110 ${
                                            status === 'current'    ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/30' :
                                            status === 'answered'   ? 'bg-[#2DD4BF]/20 text-[#2DD4BF] border border-[#2DD4BF]/40' :
                                            status === 'marked'     ? 'bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/40' :
                                            'bg-gray-100 dark:bg-[#0F172A]/60 text-[#94a3b8] dark:text-[#475569] border border-gray-200 dark:border-[#334155]/40'
                                        }`}
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Stats */}
                        <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-[#334155]/50">
                            {[
                                { label: 'تمّت الإجابة', value: answeredCount, color: 'text-[#2DD4BF]' },
                                { label: 'لم يُجب عنها', value: unansweredCount, color: 'text-[#94A3B8]' },
                                { label: 'محدّدة للمراجعة', value: marked.size, color: 'text-[#FACC15]' },
                            ].map(s => (
                                <div key={s.label} className="flex justify-between items-center text-sm">
                                    <span className="text-[#64748b] dark:text-[#94A3B8]">{s.label}</span>
                                    <span className={`font-bold ${s.color}`}>{s.value}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowSubmit(true)}
                            className="w-full mt-4 bg-gradient-to-l from-[#8B5CF6] to-[#236D96] hover:opacity-90 text-white font-black py-3 rounded-2xl transition-all hover:scale-105 text-sm"
                        >
                            إنهاء الاختبار
                        </button>
                    </div>
                </div>
            </div>

            {/* Submit Modal */}
            <AnimatePresence>
                {showSubmit && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-200 dark:border-[#334155]/70 p-8 max-w-md w-full shadow-2xl"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                        >
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-[#FACC15]/15 border border-[#FACC15]/30 flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle className="w-8 h-8 text-[#FACC15]" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-[#E2E8F0] mb-2">إنهاء الاختبار؟</h3>
                                <p className="text-[#64748b] dark:text-[#94A3B8]">هل أنت متأكد من إنهاء الاختبار؟</p>
                            </div>

                            <div className="grid grid-cols-3 gap-3 bg-gray-50 dark:bg-[#0F172A]/50 rounded-2xl p-4 mb-6">
                                <div className="text-center">
                                    <p className="text-2xl font-black text-[#2DD4BF]">{answeredCount}</p>
                                    <p className="text-[#94A3B8] text-xs mt-1">أُجيب عنها</p>
                                </div>
                                <div className="text-center border-x border-gray-200 dark:border-[#334155]/50">
                                    <p className="text-2xl font-black text-[#94A3B8]">{unansweredCount}</p>
                                    <p className="text-[#94A3B8] text-xs mt-1">لم يُجب</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-black text-[#FACC15]">{marked.size}</p>
                                    <p className="text-[#94A3B8] text-xs mt-1">للمراجعة</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowSubmit(false)}
                                    className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-[#0F172A]/60 border border-gray-200 dark:border-[#334155]/60 text-[#64748b] dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#E2E8F0] font-bold transition-all"
                                >
                                    متابعة الاختبار
                                </button>
                                <button
                                    onClick={handleSubmitConfirm}
                                    className="flex-1 py-3 rounded-2xl bg-gradient-to-l from-[#8B5CF6] to-[#236D96] text-white font-black transition-all hover:opacity-90"
                                >
                                    إنهاء وعرض النتيجة
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}