import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, ArrowLeft, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ExamSimulatorSection() {
    return (
        <section className="py-24 bg-[#f1f5f9] dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8B5CF6]/4 dark:bg-[#8B5CF6]/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="max-w-5xl mx-auto bg-white dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#1B2D4A] rounded-3xl border border-gray-200 dark:border-[#334155]/70 p-10 md:p-14 overflow-hidden relative shadow-lg dark:shadow-none"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B5CF6] via-[#236D96] to-[#2DD4BF]" />
                    <div className="absolute top-0 right-0 w-72 h-72 bg-[#8B5CF6]/8 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 text-right">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] font-semibold text-sm mb-5">
                                <Brain className="w-4 h-4" />
                                جديد في العراب
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-[#E2E8F0] mb-4 leading-tight">
                                محاكي الاختبار
                                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#8B5CF6] to-[#2DD4BF]"> التفاعلي</span>
                            </h2>
                            <p className="text-[#64748b] dark:text-[#94A3B8] leading-relaxed mb-8">
                                اختبر مستواك وتمرّن على نمط الاختبار الحقيقي. بنوك أسئلة متنوعة، محاكاة فعلية، ونتائج فورية.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {[
                                    { icon: Trophy, text: '4 أنواع اختبارات', color: '#FACC15' },
                                    { icon: Clock, text: 'توقيت دقيق', color: '#2DD4BF' },
                                    { icon: Zap, text: 'نتائج فورية', color: '#8B5CF6' },
                                ].map(({ icon: Icon, text, color }, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-gray-100 dark:bg-[#0F172A]/50 border border-gray-200 dark:border-[#334155]/50 rounded-xl px-3 py-2">
                                        <Icon className="w-4 h-4" style={{ color }} />
                                        <span className="text-[#64748b] dark:text-[#94A3B8] text-sm">{text}</span>
                                    </div>
                                ))}
                            </div>

                            <Link to={createPageUrl('ExamSimulator')}>
                                <motion.button
                                    className="inline-flex items-center gap-2 bg-gradient-to-l from-[#8B5CF6] to-[#236D96] hover:from-[#7C3AED] hover:to-[#1F6084] text-white font-black text-lg px-10 py-4 rounded-2xl shadow-xl shadow-purple-500/20 transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    جرّب الآن
                                    <ArrowLeft className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </div>

                        {/* Visual */}
                        <div className="flex-shrink-0 w-full md:w-64">
                            <div className="bg-gray-50 dark:bg-[#0F172A]/60 rounded-2xl border border-gray-200 dark:border-[#334155]/50 p-5">
                                <p className="text-[#4FA3D1] text-xs font-bold mb-3 text-center">لوحة الأسئلة</p>
                                <div className="grid grid-cols-7 gap-1.5">
                                    {Array.from({ length: 20 }, (_, i) => (
                                        <div
                                            key={i}
                                            className={`aspect-square rounded-lg text-xs font-bold flex items-center justify-center ${
                                                i === 4 ? 'bg-[#8B5CF6] text-white' :
                                                i < 4 ? 'bg-[#2DD4BF]/20 text-[#2DD4BF] border border-[#2DD4BF]/30' :
                                                i === 7 ? 'bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/30' :
                                                'bg-white dark:bg-[#1E293B] text-gray-400 dark:text-[#475569] border border-gray-200 dark:border-[#334155]/40'
                                            }`}
                                        >
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 h-2 bg-gray-200 dark:bg-[#1E293B] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-l from-[#8B5CF6] to-[#236D96] rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '25%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                    />
                                </div>
                                <p className="text-center text-[#64748b] dark:text-[#94A3B8] text-xs mt-2">5 / 20 سؤال</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}