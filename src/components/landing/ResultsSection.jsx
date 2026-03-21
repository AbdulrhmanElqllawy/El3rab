import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, Sparkles } from 'lucide-react';

const stats = [
    { number: "40%", label: "متوسط تحسّن الدرجات", icon: TrendingUp, color: "#2DD4BF", bg: "from-[#2DD4BF]/20 to-[#2DD4BF]/10" },
    { number: "+95", label: "أقل درجة حققها طلابنا", icon: Award, color: "#FACC15", bg: "from-[#FACC15]/20 to-[#FACC15]/10" },
    { number: "2000+", label: "طالب استفاد من المنصة", icon: Target, color: "#236D96", bg: "from-[#236D96]/25 to-[#236D96]/10" },
    { number: "95%", label: "نسبة رضا الطلاب", icon: Sparkles, color: "#8B5CF6", bg: "from-[#8B5CF6]/20 to-[#8B5CF6]/10" }
];

export default function ResultsSection() {
    return (
        <section className="py-24 bg-[#f1f5f9] dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-[#236D96]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-[#8B5CF6]/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-[#2DD4BF]/15 border border-[#2DD4BF]/30 text-[#2DD4BF] font-semibold text-sm mb-4">
                        نتائج حقيقية
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#E2E8F0] mb-6">
                        أرقام تتحدث
                        <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#2DD4BF] to-[#236D96]"> عن نفسها</span>
                    </h2>
                    <p className="text-lg text-[#64748b] dark:text-[#94A3B8] leading-relaxed">
                        طلابنا يحققون نتائج استثنائية بفضل منهجية التعلّم الفعّالة
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <motion.div
                                className={`w-18 h-18 w-[72px] h-[72px] rounded-3xl bg-gradient-to-br ${stat.bg} border border-[#334155]/50 flex items-center justify-center mx-auto mb-4`}
                                style={{ boxShadow: `0 4px 24px ${stat.color}25` }}
                                whileHover={{ scale: 1.1, rotate: 3 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                            </motion.div>
                            <p className="text-4xl font-black text-gray-900 dark:text-[#E2E8F0] mb-2">{stat.number}</p>
                            <p className="text-[#64748b] dark:text-[#94A3B8] font-medium text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Success Story Cards */}
                <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {[
                        { before: "72", after: "100", name: "محمد العتيبي", improvement: "+28", color: "#2DD4BF" },
                        { before: "83", after: "100", name: "سارة الغامدي", improvement: "+17", color: "#8B5CF6" },
                        { before: "65", after: "97", name: "عبدالله الشهري", improvement: "+32", color: "#FACC15" }
                    ].map((student, index) => (
                        <motion.div
                            key={index}
                            className="bg-white dark:bg-[#1E293B] rounded-3xl p-6 border border-gray-200 dark:border-[#334155]/70 shadow-sm dark:shadow-none hover:border-gray-300 dark:hover:border-[#334155] transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <div className="text-center">
                                    <p className="text-xs text-[#64748b] dark:text-[#94A3B8] mb-1">قبل</p>
                                    <p className="text-3xl font-bold text-[#94a3b8] dark:text-[#475569]">{student.before}</p>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <TrendingUp className="w-5 h-5" style={{ color: student.color }} />
                                    <span className="text-2xl font-black" style={{ color: student.color }}>{student.improvement}</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-[#64748b] dark:text-[#94A3B8] mb-1">بعد</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-[#E2E8F0]">{student.after}</p>
                                </div>
                            </div>
                            {/* Progress bar */}
                            <div className="h-1.5 bg-gray-200 dark:bg-[#0F172A] rounded-full overflow-hidden mb-3">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: `linear-gradient(to left, ${student.color}, ${student.color}80)` }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${parseInt(student.after)}%` }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 1 }}
                                />
                            </div>
                            <p className="text-center text-gray-900 dark:text-[#E2E8F0] font-semibold text-sm">{student.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}