import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Hash, CheckCircle2, AlertCircle, Clock, RefreshCw, ExternalLink } from 'lucide-react';

const BOT_URL = 'https://t.me/el3rabqudrat_bot';
const CODE_EXPIRY_SECONDS = 300; // 5 minutes

export default function TelegramCodeLogin({ onSuccess, onError }) {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [timeLeft, setTimeLeft] = useState(CODE_EXPIRY_SECONDS);
    const [timerActive, setTimerActive] = useState(false);
    const inputRefs = useRef([]);
    const timerRef = useRef(null);

    useEffect(() => {
        if (timerActive && timeLeft > 0) {
            timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        }
        return () => clearTimeout(timerRef.current);
    }, [timerActive, timeLeft]);

    const startTimer = () => {
        setTimeLeft(CODE_EXPIRY_SECONDS);
        setTimerActive(true);
    };

    const resetTimer = () => {
        setTimeLeft(CODE_EXPIRY_SECONDS);
        setTimerActive(true);
        setCode(['', '', '', '', '', '']);
        setError('');
        inputRefs.current[0]?.focus();
    };

    const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

    const handleInput = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);
        setError('');

        // Auto-advance
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all 6 digits filled
        if (newCode.every(d => d !== '') && value) {
            handleSubmit(newCode.join(''));
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasted.length === 6) {
            const arr = pasted.split('');
            setCode(arr);
            handleSubmit(pasted);
        }
    };

    const handleOpenBot = () => {
        window.open(BOT_URL, '_blank');
        startTimer();
    };

    const handleSubmit = async (codeStr) => {
        const finalCode = codeStr || code.join('');
        if (finalCode.length !== 6) return;
        if (timeLeft === 0) {
            setError('الكود انتهت صلاحيته. اضغط "إعادة" للحصول على كود جديد');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/telegram-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: finalCode }),
            });
            const data = await res.json();

            if (res.ok && data.token) {
                setTimerActive(false);
                setSuccess(true);
                localStorage.setItem('auth_token', data.token);
                setTimeout(() => onSuccess(data), 1200);
            } else {
                setError(
                    data.message === 'expired' ? 'الكود انتهت صلاحيته، اضغط إعادة' :
                    data.message === 'used'    ? 'تم استخدام هذا الكود من قبل' :
                    'الكود غير صحيح، تحقق وأعد المحاولة'
                );
                setCode(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch {
            setError('حدث خطأ في الاتصال. تحقق من الإنترنت وأعد المحاولة');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
        >
            {/* Steps */}
            <div className="space-y-3">
                {/* Step 1 */}
                <div className="flex items-start gap-3 bg-gray-50 dark:bg-[#0F172A]/50 rounded-2xl p-4 border border-gray-200 dark:border-[#334155]/40">
                    <div className="w-7 h-7 rounded-full bg-[#236D96] flex items-center justify-center flex-shrink-0 text-white text-xs font-black mt-0.5">
                        1
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-900 dark:text-[#E2E8F0] font-semibold text-sm mb-2">افتح البوت واضغط Start</p>
                        <button
                            onClick={handleOpenBot}
                            className="inline-flex items-center gap-2 bg-[#229ED9] hover:bg-[#1a8bbf] text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-[#229ED9]/20"
                        >
                            <ExternalLink className="w-4 h-4" />
                            افتح البوت @el3rabqudrat_bot
                        </button>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3 bg-gray-50 dark:bg-[#0F172A]/50 rounded-2xl p-4 border border-gray-200 dark:border-[#334155]/40">
                    <div className="w-7 h-7 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 text-white text-xs font-black mt-0.5">
                        2
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-900 dark:text-[#E2E8F0] font-semibold text-sm">استلم الكود المكوّن من 6 أرقام</p>
                        <p className="text-[#64748b] dark:text-[#94A3B8] text-xs mt-1">سيرسل لك البوت كوداً مباشرة في تيليجرام</p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3 bg-gray-50 dark:bg-[#0F172A]/50 rounded-2xl p-4 border border-gray-200 dark:border-[#334155]/40">
                    <div className="w-7 h-7 rounded-full bg-[#2DD4BF] flex items-center justify-center flex-shrink-0 text-white text-xs font-black mt-0.5">
                        3
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-900 dark:text-[#E2E8F0] font-semibold text-sm mb-3">أدخل الكود هنا</p>

                        {/* 6-digit input */}
                        <div className="flex gap-2 justify-center" dir="ltr" onPaste={handlePaste}>
                            {code.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={el => inputRefs.current[i] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleInput(i, e.target.value)}
                                    onKeyDown={e => handleKeyDown(i, e)}
                                    disabled={loading || success}
                                    className={`w-11 h-14 text-center text-2xl font-black rounded-xl border-2 bg-white dark:bg-[#1E293B] text-gray-900 dark:text-[#E2E8F0] outline-none transition-all duration-200 ${
                                        error ? 'border-[#EF4444]/70 bg-[#EF4444]/5' :
                                        success ? 'border-[#2DD4BF]/70 bg-[#2DD4BF]/5' :
                                        digit ? 'border-[#236D96]/70 bg-[#236D96]/10' :
                                        'border-gray-300 dark:border-[#334155] focus:border-[#236D96]/60 focus:bg-[#236D96]/5'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timer */}
            <AnimatePresence>
                {timerActive && timeLeft > 0 && !success && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between bg-gray-50 dark:bg-[#0F172A]/60 rounded-xl px-4 py-2.5 border border-gray-200 dark:border-[#334155]/40"
                    >
                        <div className="flex items-center gap-2 text-[#64748b] dark:text-[#94A3B8] text-sm">
                            <Clock className="w-4 h-4" />
                            <span>الكود صالح لمدة:</span>
                        </div>
                        <span className={`font-mono font-bold text-base ${timeLeft < 60 ? 'text-[#EF4444]' : 'text-[#2DD4BF]'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Timer expired */}
            {timerActive && timeLeft === 0 && !success && (
                <div className="flex items-center justify-between bg-[#EF4444]/10 rounded-xl px-4 py-2.5 border border-[#EF4444]/20">
                    <span className="text-[#EF4444] text-sm font-medium">انتهت صلاحية الكود</span>
                    <button
                        onClick={resetTimer}
                        className="flex items-center gap-1.5 text-[#EF4444] hover:text-white text-sm font-bold transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        إعادة
                    </button>
                </div>
            )}

            {/* Error */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2.5 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl px-4 py-3"
                    >
                        <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
                        <p className="text-[#EF4444] text-sm">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2.5 bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 rounded-xl px-4 py-3"
                    >
                        <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] flex-shrink-0" />
                        <p className="text-[#2DD4BF] text-sm font-semibold">تم تسجيل الدخول! جاري التحويل...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit button */}
            {!success && (
                <motion.button
                    type="button"
                    disabled={code.some(d => !d) || loading || (timerActive && timeLeft === 0)}
                    onClick={() => handleSubmit()}
                    whileHover={{ scale: (code.every(d => d) && !loading) ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-[#236D96] to-[#2679A9] hover:from-[#1F6084] hover:to-[#236D96] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-base py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-[#236D96]/20"
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    ) : (
                        <>
                            <Hash className="w-5 h-5" />
                            تأكيد الكود
                        </>
                    )}
                </motion.button>
            )}
        </motion.div>
    );
}