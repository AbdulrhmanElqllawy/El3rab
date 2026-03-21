import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';

const solutions = [
    "شروحات مبسّطة بأسلوب سهل وواضح",
    "تدريبات تفاعلية على جميع أنواع الأسئلة",
    "بث مباشر أسبوعي للإجابة على استفساراتك",
    "خطط تعلّم مخصصة حسب مستواك",
    "أكثر من 7000 سؤال للتدريب",
    "متابعة مستمرة لتقدمك"
];

export default function SolutionSection() {
    return (
        <section className="py-24 bg-[#f1f5f9] dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#236D96]/5 dark:bg-[#236D96]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/8 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Visual Side */}
                    <motion.div
                        className="flex-1 relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#236D96]/20 to-[#8B5CF6]/20 rounded-3xl blur-2xl scale-105" />
                            <div className="relative bg-white dark:bg-[#1E293B] rounded-3xl p-8 border border-gray-200 dark:border-[#334155]/70 shadow-md dark:shadow-none">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#236D96] to-[#8B5CF6] flex items-center justify-center shadow-lg">
                                        <Sparkles className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-[#E2E8F0]">الحل مع العراب</h3>
                                        <p className="text-[#64748b] dark:text-[#94A3B8] text-sm">منهجية تعلّم مثبتة</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {solutions.map((solution, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-3 bg-gray-50 dark:bg-[#0F172A]/50 border border-gray-200 dark:border-[#334155]/40 rounded-xl px-4 py-3 hover:border-[#236D96]/40 transition-all duration-300"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.08 }}
                                        >
                                            <div className="w-7 h-7 rounded-full bg-[#2DD4BF]/15 border border-[#2DD4BF]/30 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-[#2DD4BF]" />
                                            </div>
                                            <span className="text-gray-800 dark:text-[#E2E8F0] font-medium text-sm">{solution}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* <motion.div
                                className="absolute -top-5 -right-5 bg-gradient-to-br from-[#FB923C] to-[#F97316] rounded-2xl px-5 py-3 shadow-xl shadow-orange-500/20"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <p className="text-white font-semibold text-sm">نسبة تحسّن الدرجات</p>
                                <p className="text-3xl font-black text-white">40%+</p>
                            </motion.div> */}
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        className="flex-1 text-center lg:text-right"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-[#2DD4BF]/15 border border-[#2DD4BF]/30 text-[#2DD4BF] font-semibold text-sm mb-4">
                            الحل الأمثل
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#E2E8F0] mb-6 leading-tight">
                            مع العراب،
                            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#2DD4BF] to-[#236D96]"> كل شيء يتغير</span>
                        </h2>
                        <p className="text-lg text-[#64748b] dark:text-[#94A3B8] mb-8 leading-relaxed">
                            صممنا منصة العراب لتكون رفيقك في رحلة التحضير للفظي. نقدم لك شروحات واضحة، تدريبات بنوك المحوسب الجديدة، ودعم مستمر حتى تحقق الدرجة التي تستحقها.
                        </p>

                        <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 mb-8 border border-gray-200 dark:border-[#334155]/70 border-r-2 border-r-[#236D96] shadow-sm dark:shadow-none">
                            <p className="text-[#64748b] dark:text-[#94A3B8] leading-relaxed">
                                "هدفنا أن نجعل التحضير للفظي تجربة ممتعة وفعّالة، لا مجرد حفظ ومراجعة مملة"
                            </p>
                            <p className="text-[#4FA3D1] font-bold mt-2 text-sm">— فريق العراب</p>
                        </div>

                        <button
                            onClick={() => window.location.href = "/register"}
                            className="group inline-flex items-center gap-2 bg-gradient-to-l from-[#FB923C] to-[#F97316] hover:from-[#F97316] hover:to-[#EA580C] text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/35"
                        >
                            ابدأ التجربة المجانية
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}