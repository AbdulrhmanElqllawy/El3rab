import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-24 bg-gradient-to-br from-[#1B5471] via-[#236D96] to-[#1F6084] relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-3xl" />
                <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white/25 rounded-full"
                        style={{ top: `${(i * 19 + 5) % 85}%`, left: `${(i * 29 + 10) % 90}%` }}
                        animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.4 }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur border border-white/20 text-white font-semibold text-sm mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Sparkles className="w-4 h-4 text-[#FACC15]" />
                        ابدأ رحلتك نحو التفوق
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        جاهز ترفع درجتك في اللفظي؟
                    </h2>

                    <p className="text-xl text-white/85 mb-10 leading-relaxed max-w-2xl mx-auto">
                        انضم لأكثر من 2000 طالب حققوا نتائج خرافية مع منصة العراب. ابدأ اليوم وخلص على القدرات.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mb-10">
                        {["تجربة مجانية لمدة 7 أيام", "ضمان استرداد الأموال", "دعم فني على مدار الساعة"].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-white/90">
                                <CheckCircle2 className="w-5 h-5 text-[#2DD4BF]" />
                                <span className="font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.location.href = "/register"}
                            className="group inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-black text-lg px-12 py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            سجّل الآن مجاناً
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </button>
                        <button onClick={() => window.location.href = "tel:+966563629802"} className="inline-flex items-center justify-center border-2 border-white/40 hover:border-white/70 text-white hover:bg-white/10 font-bold text-lg px-10 py-4 rounded-2xl transition-all duration-300">
                            تواصل معنا
                        </button>
                    </div>

                    <p className="text-white/50 text-sm mt-6">لا حاجة لبطاقة ائتمان • إلغاء في أي وقت</p>
                </motion.div>
            </div>
        </section>
    );
}