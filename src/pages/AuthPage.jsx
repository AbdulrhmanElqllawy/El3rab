import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Zap, MessageCircle, ChevronLeft } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import TelegramWidgetLogin from '@/components/auth/TelegramWidgetLogin';
import TelegramCodeLogin from '@/components/auth/TelegramCodeLogin';

const TABS = [
    { id: 'widget', label: 'دخول سريع', icon: Zap, color: '#229ED9' },
    { id: 'code',   label: 'دخول بالكود', icon: MessageCircle, color: '#8B5CF6' },
];

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState('widget');
    const [globalError, setGlobalError] = useState('');

    const handleSuccess = (data) => {
        window.location.href = createPageUrl('Home'); // replace 'Home' with 'Dashboard' when ready
    };

    const handleError = (msg) => {
        setGlobalError(msg);
        setTimeout(() => setGlobalError(''), 5000);
    };

    return (
        <AuthLayout
            title="أهلاً بك في العراب"
            subtitle="سجّل دخولك وابدأ رحلة التفوق"
        >
            {/* Tab Switcher */}
            <div className="flex bg-gray-100 dark:bg-[#0F172A] rounded-2xl p-1 mb-6 gap-1">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setGlobalError(''); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                            activeTab === tab.id
                                ? 'bg-white dark:bg-[#1E293B] text-gray-900 dark:text-[#E2E8F0] shadow-md'
                                : 'text-[#64748b] dark:text-[#475569] hover:text-gray-900 dark:hover:text-[#94A3B8]'
                        }`}
                    >
                        <tab.icon
                            className="w-4 h-4"
                            style={{ color: activeTab === tab.id ? tab.color : undefined }}
                        />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Global Error */}
            <AnimatePresence>
                {globalError && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] rounded-xl px-4 py-3 text-sm text-center"
                    >
                        {globalError}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'widget' ? (
                    <motion.div
                        key="widget"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Info Card */}
                        <div className="bg-[#229ED9]/8 border border-[#229ED9]/20 rounded-2xl p-4 mb-5">
                            <p className="text-[#64748b] dark:text-[#94A3B8] text-xs leading-relaxed text-center">
                                🔒 يتطلب هذا الخيار أن يكون تيليجرام مثبتاً على جهازك.<br />
                                اضغط الزر أدناه وسجّل دخولك بلمسة واحدة.
                            </p>
                        </div>
                        <TelegramWidgetLogin onSuccess={handleSuccess} onError={handleError} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="code"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TelegramCodeLogin onSuccess={handleSuccess} onError={handleError} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Register hint */}
            <p className="text-center text-[#64748b] dark:text-[#475569] text-xs mt-6">
                أول مرة؟ فقط افتح البوت وسيتم إنشاء حسابك تلقائياً
            </p>
        </AuthLayout>
    );
}