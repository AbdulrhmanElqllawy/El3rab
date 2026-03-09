import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Database, ArrowUpCircle, Trophy, ArrowLeft } from 'lucide-react';

const TYPES = [
    {
        id: 'level',
        icon: TrendingUp,
        title: 'اختبار تحديد المستوى',
        description: 'اختبار سريع لتحديد مستواك واقتراح الدورة المناسبة لك',
        info: ['20 سؤال', '20 دقيقة'],
        badge: 'مقترح للمبتدئين',
        badgeColor: 'bg-[#2DD4BF]/15 text-[#2DD4BF] border-[#2DD4BF]/30',
        gradient: 'from-[#2DD4BF] to-[#236D96]',
        glow: '#2DD4BF',
        btnColor: 'bg-[#2DD4BF]/15 hover:bg-[#2DD4BF]/25 text-[#2DD4BF] border border-[#2DD4BF]/30',
    },
    {
        id: 'banks',
        icon: Database,
        title: 'بنوك المحوسب الجديدة',
        description: 'تدرب على أسئلة البنوك الجديدة بشكل منظم ومتسلسل',
        info: ['8 بنوك', '7000+ سؤال'],
        badge: 'منظّم ومتسلسل',
        badgeColor: 'bg-[#236D96]/15 text-[#4FA3D1] border-[#236D96]/30',
        gradient: 'from-[#236D96] to-[#8B5CF6]',
        glow: '#236D96',
        btnColor: 'bg-[#236D96]/15 hover:bg-[#236D96]/25 text-[#4FA3D1] border border-[#236D96]/30',
    },
    {
        id: 'levelup',
        icon: ArrowUpCircle,
        title: 'اختبار رفع المستوى',
        description: 'اختبار متخصص في نوع معين من الأسئلة لتعزيز نقاط قوتك',
        info: ['50 سؤال','45 دقيقة'],
        badge: 'تدريب مكثّف',
        badgeColor: 'bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/20',
        gradient: 'from-[#FACC15] to-[#FB923C]',
        glow: '#FACC15',
        btnColor: 'bg-[#FACC15]/10 hover:bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/20',
    },
    {
        id: 'full',
        icon: Trophy,
        title: 'الاختبار الشامل (المحاكي)',
        description: 'محاكاة كاملة للاختبار الحقيقي بنفس الشروط والوقت',
        info: ['65 سؤال','60 دقيقة'],
        badge: 'محاكاة حقيقية',
        badgeColor: 'bg-[#8B5CF6]/15 text-[#A78BFA] border-[#8B5CF6]/30',
        gradient: 'from-[#8B5CF6] to-[#EC4899]',
        glow: '#8B5CF6',
        btnColor: 'bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 text-[#A78BFA] border border-[#8B5CF6]/30',
    },
];

export default function ExamTypeCards({ onSelect }) {
    return (
        <div className="container mx-auto px-6 pb-20">
            <motion.h2
                className="text-2xl font-black text-gray-900 dark:text-[#E2E8F0] text-center mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                اختر نوع الاختبار
            </motion.h2>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
                {TYPES.map((type, i) => (
                    <motion.div
                        key={type.id}
                        className="group relative bg-white dark:bg-[#1E293B] rounded-3xl border border-gray-200 dark:border-[#334155]/70 hover:border-gray-300 dark:hover:border-[#334155] p-6 cursor-pointer overflow-hidden transition-all duration-300 shadow-sm dark:shadow-none"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -6 }}
                        onClick={() => onSelect(type.id)}
                    >
                        {/* Glow */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                            style={{ background: `radial-gradient(circle at 50% 0%, ${type.glow}18, transparent 65%)` }}
                        />
                        {/* Top gradient line */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
                            style={{ background: `linear-gradient(to right, transparent, ${type.glow}, transparent)` }} />

                        <div className="relative z-10">
                            {/* Badge */}
                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border mb-4 ${type.badgeColor}`}>
                                {type.badge}
                            </span>

                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                style={{ boxShadow: `0 4px 20px ${type.glow}30` }}>
                                <type.icon className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-base font-black text-gray-900 dark:text-[#E2E8F0] mb-2 leading-snug">{type.title}</h3>
                            <p className="text-[#64748b] dark:text-[#94A3B8] text-sm leading-relaxed mb-4">{type.description}</p>

                            {type.info.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {type.info.map(inf => (
                                        <span key={inf} className="bg-gray-100 dark:bg-[#0F172A]/60 border border-gray-200 dark:border-[#334155]/50 text-[#64748b] dark:text-[#94A3B8] text-xs px-2.5 py-1 rounded-lg">
                                            {inf}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <button className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${type.btnColor}`}>
                                ابدأ
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}