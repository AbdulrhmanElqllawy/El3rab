import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const LOGO = "src/imgs/logo.png";

export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300" dir="rtl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#236D96]/5 dark:bg-[#236D96]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.025]" style={{
                backgroundImage: 'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />

            <motion.div
                className="relative w-full max-w-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-2xl rounded-3xl border border-gray-200 dark:border-[#334155]/60 shadow-xl dark:shadow-2xl overflow-hidden">
                    <div className="h-0.5 bg-gradient-to-l from-[#236D96] via-[#8B5CF6] to-[#2DD4BF]" />

                    <div className="p-8 md:p-10">
                        <div className="flex justify-center mb-8">
                            <Link to={createPageUrl('Home')}>
                                <img
                                    src={LOGO}
                                    alt="العراب"
                                    className="h-14 w-auto object-contain hover:opacity-75 transition-opacity duration-300 drop-shadow-[0_0_12px_rgba(35,109,150,0.4)]"
                                />
                            </Link>
                        </div>

                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-black text-gray-900 dark:text-[#E2E8F0] mb-2">{title}</h1>
                            {subtitle && <p className="text-[#64748b] dark:text-[#94A3B8] text-sm">{subtitle}</p>}
                        </div>

                        {children}
                    </div>
                </div>

                <div className="text-center mt-5">
                    <Link to={createPageUrl('Home')} className="text-[#64748b] dark:text-[#475569] hover:text-gray-900 dark:hover:text-[#94A3B8] text-sm transition-colors">
                        ← العودة للصفحة الرئيسية
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}