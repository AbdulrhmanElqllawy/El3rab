import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, ArrowLeft, Zap } from 'lucide-react';

const courses = [
    {
        level: "مبتدئ",
        title: "دورة التأسيس اللفظي",
        description: "للطلاب الذين يبدأون رحلتهم في التحضير للفظي",
        price: "150",
        features: ["30 درس فيديو مسجّل", "أكثر من 500 سؤال تدريبي", "اختبارات تجريبية", "شرح أساسيات كل قسم", "دعم فني عبر الواتساب"],
        color: "from-[#236D96] to-[#1B5471]",
        accent: "#236D96",
        popular: false
    },
    {
        level: "متوسط",
        title: "دورة المحوسب اللفظي",
        description: "الخيار الأمثل لتحقيق درجة عالية في القدرات اللفظي",
        price: "150",
        features: ["60 درس فيديو مسجّل", "أكثر من 2000 سؤال تدريبي", "بث مباشر أسبوعي", "خطة تعلّم مخصصة", "تحليل أدائك وتوصيات", "دعم فني متقدم"],
        color: "from-[#FB923C] to-[#F97316]",
        accent: "#FB923C",
        popular: true
    },
    {
        level: "متقدم",
        title: "دورة الإنقاذ اللفظي",
        description: "للطلاب الطامحين للحصول على أعلى الدرجات",
        price: "200",
        features: ["100+ درس فيديو مسجّل", "جميع أسئلة المنصة (+5000)", "بث مباشر مرتين أسبوعياً", "متابعة شخصية من المدرب", "اختبارات محاكية للاختبار الفعلي", "ضمان استرداد الأموال"],
        color: "from-[#8B5CF6] to-[#7C3AED]",
        accent: "#8B5CF6",
        popular: false
    }
];

export default function CoursesSection() {
    return (
        <section className="py-24 bg-[#f8fafc] dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8B5CF6]/4 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] font-semibold text-sm mb-4">
                        الدورات المتاحة
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#E2E8F0] mb-6">
                        اختر المسار
                        <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#8B5CF6] to-[#236D96]"> المناسب لك</span>
                    </h2>
                    <p className="text-lg text-[#64748b] dark:text-[#94A3B8] leading-relaxed">
                        دورات مصممة بعناية لتناسب جميع المستويات وتحقيق أفضل النتائج
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {courses.map((course, index) => (
                        <motion.div
                            key={index}
                            className={`relative bg-white dark:bg-[#1E293B] rounded-3xl border-2 transition-all duration-500 overflow-hidden ${course.popular ? 'border-[#FB923C]/60 shadow-2xl shadow-orange-500/10' : 'border-gray-200 dark:border-[#334155]/70 shadow-sm dark:shadow-none hover:border-gray-300 dark:hover:border-[#334155]'}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -6 }}
                        >
                            {/* Top glow line */}
                            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(to right, transparent, ${course.accent}, transparent)` }} />

                            {course.popular && (
                                <div className="bg-gradient-to-l from-[#FB923C] to-[#F97316] py-2 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <Star className="w-4 h-4 text-white fill-white" />
                                        <span className="text-white font-bold text-sm">الأكثر طلباً</span>
                                    </div>
                                </div>
                            )}

                            <div className="p-7">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-l ${course.color} mb-4`}>
                                    {course.level}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-2">{course.title}</h3>
                                <p className="text-[#64748b] dark:text-[#94A3B8] text-sm mb-6">{course.description}</p>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-4xl font-black text-gray-900 dark:text-[#E2E8F0]">{course.price}</span>
                                        <span className="text-[#64748b] dark:text-[#94A3B8]">ريال</span>
                                    </div>
                                </div>

                                <div className="space-y-2.5 mb-7">
                                    {course.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: course.accent }} />
                                            <span className="text-[#64748b] dark:text-[#94A3B8] text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
                                        course.popular
                                            ? 'bg-gradient-to-l from-[#FB923C] to-[#F97316] hover:from-[#F97316] hover:to-[#EA580C] text-white shadow-lg shadow-orange-500/20'
                                            : 'bg-gray-100 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] text-gray-800 dark:text-[#E2E8F0] hover:bg-gray-200 dark:hover:border-[#334155]/80 dark:hover:bg-[#0F172A]/80'
                                    }`}
                                >
                                    سجّل الآن
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Special Offer */}
                <motion.div
                    className="mt-14 max-w-4xl mx-auto bg-gradient-to-l from-gray-50 dark:from-[#1E293B] to-[#1B5471]/10 dark:to-[#1B5471]/30 rounded-3xl p-8 md:p-10 text-center border border-[#236D96]/30"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Zap className="w-6 h-6 text-[#FACC15] fill-[#FACC15]" />
                        <span className="text-[#FACC15] font-bold">عرض خاص لفترة محدودة</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-[#E2E8F0] mb-3">
                        احصل على خصم 20% عند التسجيل اليوم
                    </h3>
                    <p className="text-[#64748b] dark:text-[#94A3B8] mb-6">استخدم كود الخصم: <span className="font-mono text-[#4FA3D1] font-bold">ELRAB20</span></p>
                    <button
                        className="inline-flex items-center gap-2 bg-gradient-to-l from-[#FB923C] to-[#F97316] hover:from-[#F97316] hover:to-[#EA580C] text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        استفد من العرض الآن
                    </button>
                </motion.div>
            </div>
        </section>
    );
}