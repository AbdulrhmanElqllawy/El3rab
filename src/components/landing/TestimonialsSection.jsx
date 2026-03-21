import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    { name: "محمد العتيبي", role: "طالب ثانوي - الرياض", content: "كنت أعاني كثيراً من أسئلة التناظر والاستيعاب المقروء، لكن مع العراب أصبحت أفهم الأسئلة بسهولة وارتفعت درجتي من 62 إلى 97!", rating: 5, avatar: "م", color: "#236D96" },
    { name: "سارة الغامدي", role: "طالبة ثانوي - جدة", content: "الشرح بسيط وواضح جداً، والبث المباشر الأسبوعي ساعدني كثيراً في فهم النقاط الصعبة. أنصح كل طالب بتجربة المنصة.", rating: 5, avatar: "س", color: "#8B5CF6" },
    { name: "عبدالله الشهري", role: "طالب ثانوي - الدمام", content: "أفضل منصة للقدرات اللفظي! التدريبات التفاعلية والأسئلة الكثيرة ساعدتني أحقق درجة 100 من أول محاولة.", rating: 5, avatar: "ع", color: "#2DD4BF" },
    { name: "نورة القحطاني", role: "طالبة ثانوي - الرياض", content: "المستر محترف ويشرح بطريقة سهلة. الخطة المخصصة حسب مستواي كانت مفيدة جداً.", rating: 5, avatar: "ن", color: "#FACC15" },
    { name: "فهد الدوسري", role: "طالب ثانوي - مكة", content: "جربت كثير منصات قبل العراب، لكن هذي أفضلها بدون منافس. الشرح واضح والتدريبات ممتازة.", rating: 5, avatar: "ف", color: "#FB923C" },
    { name: "ريم الحربي", role: "طالبة ثانوي - الرياض", content: "شكراً العراب! حققت درجة 98 بفضل الله ثم بفضل شروحاتكم. المنصة غيرت نظرتي عن اللفظي فعلا.", rating: 5, avatar: "ر", color: "#236D96" }
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-[#f8fafc] dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#236D96]/4 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/20 text-[#FACC15] font-semibold text-sm mb-4">
                        آراء طلابنا
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#E2E8F0] mb-6">
                        ماذا يقول
                        <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#FACC15] to-[#FB923C]"> طلابنا؟</span>
                    </h2>
                    <p className="text-lg text-[#64748b] dark:text-[#94A3B8] leading-relaxed">
                        قصص نجاح حقيقية من طلاب حققوا أهدافهم مع العراب
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            className="group bg-white dark:bg-[#1E293B] rounded-3xl p-7 border border-gray-200 dark:border-[#334155]/70 hover:border-gray-300 dark:hover:border-[#334155] shadow-sm dark:shadow-none transition-all duration-400 relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.06 }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Top glow */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(to right, transparent, ${t.color}, transparent)` }} />

                            <Quote className="w-8 h-8 absolute top-5 left-5 opacity-10" style={{ color: t.color }} />

                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                                ))}
                            </div>

                            <p className="text-[#64748b] dark:text-[#94A3B8] leading-relaxed mb-6 text-sm relative z-10">
                                "{t.content}"
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-[#334155]/50">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                    style={{ background: `linear-gradient(135deg, ${t.color}CC, ${t.color}66)` }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-[#E2E8F0] text-sm">{t.name}</p>
                                    <p className="text-[#64748b] dark:text-[#94A3B8] text-xs">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}