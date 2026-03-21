import React from 'react';
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Star, ArrowLeft, Play, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const LOGO = "src/imgs/logo.png";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen bg-[#f8fafc] dark:bg-[#0F172A] overflow-hidden transition-colors duration-300">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#236D96]/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#236D96]/5 to-[#8B5CF6]/5 rounded-full blur-3xl" />
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }} />
                {[...Array(18)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: `${2 + (i % 3)}px`,
                            height: `${2 + (i % 3)}px`,
                            background: i % 3 === 0 ? '#236D96' : i % 3 === 1 ? '#8B5CF6' : '#2DD4BF',
                            top: `${(i * 17 + 5) % 90}%`,
                            left: `${(i * 23 + 8) % 90}%`,
                            opacity: 0.4,
                        }}
                        animate={{ y: [0, -25, 0], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-6 pt-32 pb-24">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content */}
                    <motion.div
                        className="flex-1 text-center lg:text-right"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#236D96]/20 border border-[#236D96]/40 text-[#4FA3D1] font-semibold text-sm mb-6">
                                <Zap className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                                المنصة الأولى للقدرات اللفظي
                            </span>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-5">
                            <img
                                src={LOGO}
                                alt="العراب"
                                className="h-20 md:h-24 w-auto object-contain mx-auto lg:mx-0 drop-shadow-[0_0_20px_rgba(35,109,150,0.4)]"
                            />
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] dark:text-[#E2E8F0] mb-6 leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#236D96] to-[#8B5CF6]">
                                طريقك للتفوق
                            </span>
                            <br />
                            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#64748b] dark:text-[#94A3B8]">
                                في القدرات اللفظي
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-lg text-[#64748b] dark:text-[#94A3B8] mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            شرح مبسّط، تدريبات تفاعلية، وبث مباشر أسبوعي يرفع درجتك في القدرات اللفظي بأسلوب سهل وممتع
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <button
                                onClick={() => window.location.href = "/register"}
                                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-l from-[#FB923C] to-[#F97316] hover:from-[#F97316] hover:to-[#EA580C] text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/40"
                            >
                                ابدأ رحلتك الآن
                                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            </button>
                            <button
                                onClick={() => window.location.href = "/AuthPage"}
                                className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-[#334155] hover:border-[#236D96]/60 text-gray-800 dark:text-[#E2E8F0] hover:text-gray-900 dark:hover:text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-[#236D96]/10 hover:shadow-lg hover:shadow-[#236D96]/10"
                            >
                                <Play className="w-5 h-5 text-[#4FA3D1]" />
                               سجل الدخول
                            </button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mt-12 pt-10 border-t border-gray-200 dark:border-[#334155]/50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            {[
                                { icon: Users, value: '+2000', label: 'طالب مسجّل', color: 'from-[#236D96]/30 to-[#236D96]/20', iconColor: 'text-[#4FA3D1]' },
                                { icon: Star, value: '5', label: 'تقييم الطلاب', color: 'from-[#FACC15]/20 to-[#FACC15]/10', iconColor: 'text-[#FACC15]', fill: true },
                                { icon: GraduationCap, value: '95%', label: 'نسبة النجاح', color: 'from-[#2DD4BF]/20 to-[#2DD4BF]/10', iconColor: 'text-[#2DD4BF]' },
                            ].map(({ icon: Icon, value, label, color, iconColor, fill }, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} border border-white/5 flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${iconColor} ${fill ? 'fill-[#FACC15]' : ''}`} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                                        <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">{label}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Visual Card */}
                    <motion.div
                        className="flex-1 relative"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="relative w-full max-w-lg mx-auto">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#236D96]/20 to-[#8B5CF6]/20 rounded-3xl blur-2xl scale-105" />
                            
                            {/* Main Card */}
                            <div className="relative bg-white/90 dark:bg-[#1E293B]/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-[#334155]/70 shadow-2xl">
                                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white dark:bg-[#0F172A] rounded-2xl flex items-center justify-center shadow-xl p-2.5 border border-gray-200 dark:border-[#334155]">
                                    <img src={LOGO} alt="العراب" className="w-full h-full object-contain" />
                                </div>

                                <div className="mt-8 space-y-5">
                                    <div>
                                        <p className="text-[#4FA3D1] font-semibold text-sm mb-3">أقسام القدرات اللفظي</p>
                                        <div className="grid grid-cols-2 gap-2.5">
                                            {['التناظر اللفظي', 'إكمال الجمل', 'الخطأ السياقي', 'استيعاب المقروء', 'المفردة الشاذة'].map((item, i) => (
                                                <motion.div
                                                    key={item}
                                                    className="bg-gray-50 dark:bg-[#0F172A]/60 border border-gray-200 dark:border-[#334155]/50 rounded-xl px-3 py-2.5 text-center hover:border-[#236D96]/50 hover:bg-[#236D96]/10 transition-all duration-300 cursor-default"
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.8 + i * 0.1 }}
                                                >
                                                    <span className="text-gray-800 dark:text-[#E2E8F0] text-sm font-medium">{item}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-l from-[#2DD4BF]/15 to-[#236D96]/15 rounded-2xl p-4 border border-[#2DD4BF]/20">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[#2DD4BF] font-bold">درجتك القادمة</p>
                                                <p className="text-5xl font-black text-gray-900 dark:text-white mt-1">+100</p>
                                            </div>
                                            {/* Mini progress ring */}
                                            <svg viewBox="0 0 60 60" className="w-16 h-16">
                                                <circle cx="30" cy="30" r="24" fill="none" stroke="#334155" strokeWidth="5" />
                                                <circle cx="30" cy="30" r="24" fill="none" stroke="#2DD4BF" strokeWidth="5"
                                                    strokeDasharray={`${2 * Math.PI * 24} ${2 * Math.PI * 24}`}
                                                    strokeLinecap="round" transform="rotate(-90 30 30)" />
                                                <text x="30" y="35" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="bold">100%</text>
                                            </svg>
                                        </div>
                                    </div>

                                    {/* XP Bar */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs text-[#64748b] dark:text-[#94A3B8]">
                                            <span>المستوى 7</span>
                                            <span>1,240 / 2,000 XP</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-[#0F172A] rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-l from-[#8B5CF6] to-[#236D96] rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: '62%' }}
                                                transition={{ delay: 1.2, duration: 1.2, ease: 'easeOut' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card */}
                            <motion.div
                                className="absolute -bottom-5 -left-5 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-lg rounded-2xl p-4 border border-gray-200 dark:border-[#334155]/70 shadow-xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-[#236D96]/20 border border-[#236D96]/30 flex items-center justify-center">
                                        <Play className="w-4 h-4 text-[#4FA3D1]" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-semibold text-sm">بث مباشر</p>
                                        <p className="text-[#64748b] dark:text-[#94A3B8] text-xs">كل أسبوع</p>
                                    </div>
                                    <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse mr-1" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8fafc] dark:from-[#0F172A] to-transparent" />
        </section>
    );
}