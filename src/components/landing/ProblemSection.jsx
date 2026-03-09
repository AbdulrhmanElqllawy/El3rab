import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, HelpCircle, Clock } from 'lucide-react';

const problems = [
    { icon: HelpCircle, title: "صعوبة فهم الأسئلة", description: "الكثير من الطلاب يواجهون صعوبة في فهم طبيعة أسئلة القدرات اللفظي وكيفية التعامل معها", color: "from-[#EF4444] to-[#DC2626]", glow: "rgba(239,68,68,0.15)" },
    { icon: TrendingDown, title: "درجات منخفضة", description: "عدم التحضير الجيد يؤدي لدرجات أقل من المتوقع رغم المحاولات المتكررة", color: "from-[#FB923C] to-[#F97316]", glow: "rgba(251,146,60,0.15)" },
    { icon: AlertCircle, title: "شروحات معقدة", description: "أغلب المصادر تقدم شروحات صعبة ومعقدة لا تناسب جميع مستويات الطلاب", color: "from-[#8B5CF6] to-[#7C3AED]", glow: "rgba(139,92,246,0.15)" },
    { icon: Clock, title: "ضيق الوقت", description: "عدم القدرة على إدارة الوقت بشكل صحيح أثناء حل الأسئلة في الاختبار", color: "from-[#236D96] to-[#1B5471]", glow: "rgba(35,109,150,0.15)" }
];

export default function ProblemSection() {
    return (
        <section className="py-24 bg-[#f1f5f9] dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 opacity-[0.025]" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #E2E8F0 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }} />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] font-semibold text-sm mb-4">
                        هل تعاني من هذه المشاكل؟
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#E2E8F0] mb-6">
                        تحديات يواجهها معظم
                        <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#EF4444] to-[#FB923C]"> الطلاب</span>
                    </h2>
                    <p className="text-lg text-[#64748b] dark:text-[#94A3B8] leading-relaxed">
                        نعرف تماماً التحديات التي تواجهك، لأننا مررنا بنفس التجربة وصممنا حلولاً فعّالة لها
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-200 dark:border-[#334155]/70 hover:border-gray-300 dark:hover:border-[#334155] shadow-sm dark:shadow-none transition-all duration-500 overflow-hidden cursor-default"
                            style={{ '--glow': problem.glow }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                        >
                            {/* Hover glow bg */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" style={{ background: `radial-gradient(circle at 50% 0%, ${problem.glow}, transparent 70%)` }} />
                            
                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${problem.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <problem.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-3">{problem.title}</h3>
                                <p className="text-[#64748b] dark:text-[#94A3B8] leading-relaxed">{problem.description}</p>
                            </div>

                            <div className={`absolute bottom-0 right-0 w-0 group-hover:w-1/2 h-0.5 bg-gradient-to-l ${problem.color} transition-all duration-500 rounded-full`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}