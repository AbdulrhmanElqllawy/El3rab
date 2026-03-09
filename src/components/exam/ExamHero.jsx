import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Brain } from 'lucide-react';

export default function ExamHero({ onStart }) {
    return (
        <div className="relative py-20 overflow-hidden bg-[#f1f5f9] dark:bg-transparent transition-colors duration-300">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#8B5CF6]/12 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[350px] bg-[#236D96]/12 rounded-full blur-3xl" />
                <div className="absolute inset-0 opacity-[0.025]" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #E2E8F0 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] font-semibold text-sm mb-6">
                        <Brain className="w-4 h-4" />
                        بيئة اختبار تفاعلية
                    </span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-6xl font-black text-gray-900 dark:text-[#E2E8F0] mb-4 leading-tight"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    محاكي
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#8B5CF6] to-[#236D96]"> العراب</span>
                </motion.h1>

                <motion.p
                    className="text-lg text-[#64748b] dark:text-[#94A3B8] mb-10 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    اختبر نفسك في بيئة تحاكي الاختبار الحقيقي وتابع تقدمك خطوة بخطوة
                </motion.p>

                <motion.button
                    onClick={onStart}
                    className="inline-flex items-center gap-2 bg-gradient-to-l from-[#8B5CF6] to-[#236D96] hover:from-[#7C3AED] hover:to-[#1F6084] text-white font-black text-lg px-12 py-4 rounded-2xl shadow-xl shadow-purple-500/20 transition-all duration-300 hover:scale-105"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <Zap className="w-5 h-5 fill-white" />
                    ابدأ الاختبار
                </motion.button>
            </div>
        </div>
    );
}