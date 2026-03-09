import React from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, MessageCircle, Users, Clock, ArrowLeft } from 'lucide-react';

export default function LiveClassesSection() {
    return (
        <section className="py-24 bg-[#f8fafc] dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#236D96]/5 dark:bg-[#236D96]/8 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content */}
                    <motion.div
                        className="flex-1 text-center lg:text-right"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] font-semibold text-sm mb-4">
                            <Video className="w-4 h-4" />
                            البث المباشر
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#E2E8F0] mb-6 leading-tight">
                            حصص مباشرة
                            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#8B5CF6] to-[#236D96]"> كل أسبوع</span>
                        </h2>
                        <p className="text-lg text-[#64748b] dark:text-[#94A3B8] mb-8 leading-relaxed">
                            تواصل مباشر مع المدرب، اسأل أسئلتك، واحصل على إجابات فورية في جلسات تفاعلية ممتعة
                        </p>

                        <div className="grid sm:grid-cols-2 gap-3 mb-10">
                            {[
                                { icon: Calendar, text: "كل أربعاء الساعة 8 مساءً", color: "#236D96" },
                                { icon: MessageCircle, text: "أسئلة وأجوبة مباشرة", color: "#2DD4BF" },
                                { icon: Users, text: "تفاعل مع الطلاب الآخرين", color: "#8B5CF6" },
                                { icon: Clock, text: "الجلسات مسجّلة للمراجعة", color: "#FACC15" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-3 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/70 rounded-xl p-4 hover:border-gray-300 dark:hover:border-[#334155] shadow-sm dark:shadow-none transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}>
                                        <item.icon className="w-4 h-4" style={{ color: item.color }} />
                                    </div>
                                    <span className="text-gray-800 dark:text-[#E2E8F0] font-medium text-sm">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        <button
                            onClick={() => window.location.href = "/register"}
                            className="group inline-flex items-center gap-2 bg-gradient-to-l from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl shadow-purple-500/20 transition-all duration-300 hover:scale-105"
                        >
                            احجز مقعدك الآن
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </button>
                    </motion.div>

                    {/* Visual */}
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/15 to-[#236D96]/15 rounded-3xl blur-2xl scale-105" />
                            <div className="relative bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden border border-gray-200 dark:border-[#334155]/70 shadow-md dark:shadow-none">
                                <div className="aspect-video relative bg-gradient-to-br from-[#1B5471]/60 to-[#7C3AED]/30 flex items-center justify-center">
                                    <motion.div
                                        className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-r-[24px] border-r-white" style={{ transform: 'rotate(180deg)' }} />
                                    </motion.div>

                                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#EF4444] rounded-full px-3 py-1.5 shadow-lg shadow-red-500/30">
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        <span className="text-white font-bold text-xs">مباشر</span>
                                    </div>

                                    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5">
                                        <Users className="w-3 h-3 text-white" />
                                        <span className="text-white font-medium text-xs">234 مشاهد</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 dark:bg-[#0F172A]/50 border-t border-gray-200 dark:border-[#334155]/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#236D96] to-[#8B5CF6] flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">أ</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-900 dark:text-[#E2E8F0] font-bold text-sm">العراب</p>
                                                <p className="text-[#64748b] dark:text-[#94A3B8] text-xs">شرح التناظر اللفظي</p>
                                            </div>
                                        </div>
                                        <div className="text-[#64748b] dark:text-[#94A3B8] text-sm font-mono">45:23</div>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                className="absolute -bottom-5 -left-5 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-lg rounded-2xl p-4 border border-gray-200 dark:border-[#334155]/70 shadow-xl max-w-xs"
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-[#2DD4BF]/15 border border-[#2DD4BF]/30 flex items-center justify-center flex-shrink-0">
                                        <MessageCircle className="w-4 h-4 text-[#2DD4BF]" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 dark:text-[#E2E8F0] text-sm font-medium">أحمد:</p>
                                        <p className="text-[#64748b] dark:text-[#94A3B8] text-xs mt-0.5">شكراً أستاذ، الشرح واضح جداً! 🎯</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}