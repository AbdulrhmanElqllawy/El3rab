import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import ExamHero from '@/components/exam/ExamHero';
import ExamTypeCards from '@/components/exam/ExamTypeCards';
import BankSelection from '@/components/exam/BankSelection';
import LevelUpSelection from '@/components/exam/LevelUpSelection';
import ExamInterface from '@/components/exam/ExamInterface';
import ThemeToggle from '@/components/ThemeToggle';

const EXAM_CONFIGS = {
    level:   { title: 'اختبار تحديد المستوى', count: 20, minutes: 20 },
    full:    { title: 'الاختبار الشامل (المحاكي)', count: 65, minutes: 60 },
    banks:   { title: 'بنوك المحوسب', count: 20, minutes: 30 },
    levelup: { title: 'اختبار رفع المستوى', count: 50, minutes: 45 },
};

// Screens: 'home' | 'banks' | 'levelup' | 'exam'
export default function ExamSimulator() {
    const [screen, setScreen] = useState('home');
    const [examConfig, setExamConfig] = useState(null);

    const handleTypeSelect = (type) => {
        if (type === 'banks')   return setScreen('banks');
        if (type === 'levelup') return setScreen('levelup');
        // level and full start immediately
        setExamConfig({ ...EXAM_CONFIGS[type], type });
        setScreen('exam');
    };

    const handleBankStart = ({ bank, test }) => {
        setExamConfig({ ...EXAM_CONFIGS.banks, title: `البنك ${bank} — اختبار ${test}`, type: 'banks', bank, test });
        setScreen('exam');
    };

    const handleLevelUpStart = ({ questionType, label }) => {
        setExamConfig({ ...EXAM_CONFIGS.levelup, title: `رفع المستوى — ${label}`, type: 'levelup', questionType });
        setScreen('exam');
    };

    const handleExamEnd = (action) => {
        if (action === 'retry') {
            // re-start same exam
            setScreen('exam');
            setExamConfig(c => ({ ...c, _reset: Date.now() }));
        } else {
            setScreen('home');
            setExamConfig(null);
        }
    };

    // Exam interface takes full screen
    if (screen === 'exam' && examConfig) {
        return <ExamInterface key={examConfig._reset} config={examConfig} onEnd={handleExamEnd} />;
    }

    return (
        <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0A1120] transition-colors duration-300" dir="rtl">
            {/* Minimal top nav */}
            <div className="border-b border-gray-200 dark:border-[#1E293B]">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <a href={createPageUrl('Home')} className="flex items-center">
                        <img
                            src="src/imgs/logo.png"
                            alt="العراب"
                            className="h-9 w-auto object-contain"
                        />
                    </a>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <a href={createPageUrl('Home')} className="text-[#64748b] dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#E2E8F0] text-sm transition-colors">
                            العودة للرئيسية
                        </a>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {screen === 'home' && (
                    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ExamHero onStart={() => document.getElementById('exam-types')?.scrollIntoView({ behavior: 'smooth' })} />
                        <div id="exam-types">
                            <ExamTypeCards onSelect={handleTypeSelect} />
                        </div>
                    </motion.div>
                )}

                {screen === 'banks' && (
                    <motion.div key="banks" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                        <div className="pt-10">
                            <BankSelection onStart={handleBankStart} onBack={() => setScreen('home')} />
                        </div>
                    </motion.div>
                )}

                {screen === 'levelup' && (
                    <motion.div key="levelup" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                        <div className="pt-10">
                            <LevelUpSelection onStart={handleLevelUpStart} onBack={() => setScreen('home')} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}