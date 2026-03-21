import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    { question: "هل المنصة مناسبة للمبتدئين؟", answer: "نعم، المنصة مصممة لتناسب جميع المستويات. لدينا دورات خاصة للمبتدئين تبدأ من الأساسيات وتتدرج حتى المستويات المتقدمة. كل طالب يحصل على خطة تعلّم مخصصة حسب مستواه." },
    { question: "كم المدة اللازمة لرؤية تحسّن في درجتي؟", answer: "معظم طلابنا يلاحظون تحسّناً ملحوظاً خلال 2-4 أسابيع من الالتزام بالخطة الدراسية. بالطبع، النتائج تختلف حسب الجهد المبذول ومستوى الطالب الأولي." },
    { question: "هل يمكنني مشاهدة الدروس في أي وقت؟", answer: "نعم، جميع الدروس المسجّلة متاحة على مدار الساعة. يمكنك مشاهدتها في أي وقت يناسبك وإعادتها عدة مرات حسب حاجتك." },
    { question: "ما الفرق بين الدورات المختلفة؟", answer: "الدورات تختلف في عدد الدروس، كمية الأسئلة التدريبية، ومستوى المتابعة. دورة المبتدئ تركز على الأساسيات، بينما دورة التفوق الشاملة تقدم محتوى أعمق مع بث مباشر، ودورة القمة تشمل متابعة شخصية من المدرب." },
    { question: "هل هناك ضمان لاسترداد الأموال؟", answer: "نعم، نقدم ضمان استرداد كامل للأموال خلال 14 يوماً من الاشتراك إذا لم تكن راضياً عن المحتوى. نحن واثقون من جودة خدماتنا." },
    { question: "كيف يمكنني التواصل مع الدعم؟", answer: "يمكنك التواصل معنا عبر الواتساب على الرقم 0563629802 أو عبر البريد الإلكتروني support@el3rab.com. فريق الدعم متاح للرد على استفساراتك خلال ساعات العمل." },
    { question: "هل البث المباشر إلزامي؟", answer: "لا، البث المباشر اختياري لكنه مفيد جداً للتفاعل المباشر مع المدرب. جميع جلسات البث يتم تسجيلها وإتاحتها للمشاهدة لاحقاً إذا فاتك الموعد." },
    { question: "هل يمكنني الاشتراك من خارج السعودية؟", answer: "نعم، المنصة متاحة للطلاب من جميع أنحاء العالم. المحتوى بالكامل باللغة العربية ومصمم خصيصاً لاختبار القدرات السعودي." }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-[#f1f5f9] dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 opacity-[0.02]" style={{
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
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#236D96]/15 border border-[#236D96]/30 text-[#4FA3D1] font-semibold text-sm mb-4">
                        <HelpCircle className="w-4 h-4" />
                        الأسئلة الشائعة
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#E2E8F0] mb-6">
                        عندك
                        <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#236D96] to-[#8B5CF6]"> سؤال؟</span>
                    </h2>
                    <p className="text-lg text-[#64748b] dark:text-[#94A3B8] leading-relaxed">
                        إجابات على أكثر الأسئلة شيوعاً من طلابنا
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className={`bg-white dark:bg-[#1E293B] rounded-2xl overflow-hidden border shadow-sm dark:shadow-none transition-all duration-300 ${openIndex === index ? 'border-[#236D96]/50' : 'border-gray-200 dark:border-[#334155]/60 hover:border-gray-300 dark:hover:border-[#334155]'}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.04 }}
                        >
                            <button
                                className="w-full flex items-center justify-between p-5 text-right"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            >
                                <span className={`text-base font-bold transition-colors ${openIndex === index ? 'text-[#4FA3D1]' : 'text-gray-900 dark:text-[#E2E8F0]'}`}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex-shrink-0 mr-3 transition-colors ${openIndex === index ? 'text-[#4FA3D1]' : 'text-[#475569]'}`}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <div className="px-5 pb-5">
                                            <p className="text-[#64748b] dark:text-[#94A3B8] leading-relaxed text-sm">{faq.answer}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}