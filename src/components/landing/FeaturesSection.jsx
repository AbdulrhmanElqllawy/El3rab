import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, Brain, Target, Clock, Users, Headphones, BarChart3 } from 'lucide-react';

const features = [
    { icon: BookOpen, title: "شروحات مبسّطة", description: "محتوى تعليمي مُعد بأسلوب سهل يناسب جميع المستويات", color: "from-[#236D96] to-[#1B5471]", glow: "#236D96" },
    { icon: Video, title: "بث مباشر أسبوعي", description: "حصص تفاعلية مباشرة للإجابة على جميع استفساراتك", color: "from-[#8B5CF6] to-[#7C3AED]", glow: "#8B5CF6" },
    { icon: Brain, title: "تدريبات تفاعلية", description: "أكثر من 5000 سؤال للتدريب على جميع أنواع الأسئلة", color: "from-[#2DD4BF] to-[#0D9488]", glow: "#2DD4BF" },
    { icon: Target, title: "خطط مخصصة", description: "خطة تعلّم شخصية تتناسب مع مستواك وأهدافك", color: "from-[#FB923C] to-[#F97316]", glow: "#FB923C" },
    { icon: Clock, title: "تعلّم في أي وقت", description: "دروس مسجّلة متاحة 24/7 تتابعها حسب وقتك", color: "from-[#EF4444] to-[#DC2626]", glow: "#EF4444" },
    { icon: BarChart3, title: "تتبع تقدمك", description: "تقارير تفصيلية تُظهر نقاط قوتك ومجالات التحسين", color: "from-[#FACC15] to-[#EAB308]", glow: "#FACC15" },
    { icon: Headphones, title: "دعم مستمر", description: "فريق دعم متاح للإجابة على أسئلتك ومساعدتك", color: "from-[#2DD4BF] to-[#236D96]", glow: "#2DD4BF" },
    { icon: Users, title: "مجتمع طلابي", description: "تواصل مع زملائك وتبادل الخبرات والنصائح", color: "from-[#8B5CF6] to-[#236D96]", glow: "#8B5CF6" }
];

export default function FeaturesSection() {
    return (
        <section className="py-24 bg-[#f8fafc] dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-300">
            {/* Accent blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#236D96]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-[#236D96]/15 border border-[#236D96]/30 text-[#4FA3D1] font-semibold text-sm mb-4">
                        لماذا العراب؟
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#E2E8F0] mb-6">
                        مميزات تجعلنا
                        <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#236D96] to-[#8B5CF6]"> الخيار الأول</span>
                    </h2>
                    <p className="text-lg text-[#64748b] dark:text-[#94A3B8] leading-relaxed">
                        كل ما تحتاجه للتفوق في القدرات اللفظي في منصة واحدة متكاملة
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="group bg-white dark:bg-[#1E293B] rounded-3xl p-6 border border-gray-200 dark:border-[#334155]/70 hover:border-gray-300 dark:hover:border-[#334155] shadow-sm dark:shadow-none transition-all duration-400 relative overflow-hidden cursor-default"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Glow on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                                style={{ background: `radial-gradient(circle at 50% 0%, ${feature.glow}20, transparent 65%)` }}
                            />
                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                                    style={{ boxShadow: `0 4px 20px ${feature.glow}30` }}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-[#E2E8F0] mb-2">{feature.title}</h3>
                                <p className="text-[#64748b] dark:text-[#94A3B8] text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}