import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/components/ThemeContext';
import { createPageUrl } from '@/utils';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


// const navigate = useNavigate();

const LOGO = "src/imgs/logo.png";

const navLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'المميزات', href: '#features' },
    { label: 'الدورات', href: '#courses' },
    { label: 'المحاكي', href: createPageUrl('ExamSimulator') },
    { label: 'آراء الطلاب', href: '#testimonials' },
    { label: 'الأسئلة الشائعة', href: '#faq' }
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrolledBg = isDark
        ? 'bg-[#0F172A]/95 border-b border-[#334155]/50'
        : 'bg-white/97 border-b border-gray-200/80 shadow-sm';

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl ${
                isScrolled ? scrolledBg : 'bg-transparent'
            }`}>
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a href="/" className="flex items-center group">
                            <img
                                src={LOGO}
                                alt="العراب"
                                className="h-11 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(35,109,150,0.6)]"
                            />
                        </a>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-7">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className={`font-medium transition-all duration-200 text-sm ${
                                        isDark
                                            ? 'text-[#94A3B8] hover:text-white hover:drop-shadow-[0_0_8px_rgba(35,109,150,0.8)]'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden lg:flex items-center gap-3">
                            <ThemeToggle />
                            <button
                                // onClick={() => navigate("/AuthPage")}
                                //في مشكلة هنا معرفتش اعملها كراوت لما اضغط عليها مش بتوديني للصفحة 
                                // onClick={() => navigate(createPageUrl('AuthPage'))}
                                onClick={() => window.location.href = "/AuthPage"}
                                className={`font-medium px-4 py-2 rounded-xl transition-all duration-200 text-sm ${
                                    isDark
                                        ? 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                تسجيل الدخول
                            </button>
                            <button
                                onClick={() => window.location.href = "/Register"}
                                className="bg-gradient-to-l from-[#FB923C] to-[#F97316] hover:from-[#F97316] hover:to-[#EA580C] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
                            >
                                ابدأ مجاناً
                            </button>
                            <a
                                href="/dashboard"
                                className={`font-medium px-4 py-2 rounded-xl transition-all duration-200 text-sm border ${
                                    isDark
                                        ? 'border-[#334155] text-[#94A3B8] hover:text-white hover:border-[#6C4CF1]/50 hover:bg-[#6C4CF1]/10'
                                        : 'border-gray-200 text-gray-600 hover:text-[#6C4CF1] hover:border-[#6C4CF1]/40 hover:bg-[#6C4CF1]/5'
                                }`}
                            >
                                لوحة التحكم
                            </a>
                        </div>
                            
                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center gap-2">
                            <ThemeToggle />
                            <button
                                className={`p-2 rounded-xl transition-colors ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed inset-0 z-40 backdrop-blur-xl pt-24 px-6 lg:hidden ${
                            isDark
                                ? 'bg-[#0F172A]/98 border-b border-[#334155]/50'
                                : 'bg-white/98 border-b border-gray-200'
                        }`}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-center mb-6">
                                <img src={LOGO} alt="العراب" className="h-14 w-auto object-contain" />
                            </div>
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className={`text-lg font-medium py-3.5 px-4 rounded-xl transition-all ${
                                        isDark
                                            ? 'text-[#E2E8F0] border-b border-[#334155]/50 hover:text-white hover:bg-white/5'
                                            : 'text-gray-700 border-b border-gray-100 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="flex z-50 flex-col gap-3 mt-6">
                                {/* <Link to={createPageUrl('AuthPage')}> */}
                                    <button
                                        // onClick={() => navigate(createPageUrl('ExamSimulator'))}

                                        className={`w-full py-4 rounded-2xl font-semibold transition-all border ${
                                            isDark
                                                ? 'border-[#334155] text-[#E2E8F0] hover:bg-white/5'
                                                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        تسجيل الدخول
                                    </button>
                                {/* </Link> */}
                                <button
                                    className="w-full bg-gradient-to-l from-[#FB923C] to-[#F97316] text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                                >
                                    ابدأ مجاناً
                                </button>
                                <a
                                href="/dashboard"
                                className={`font-medium px-4 py-2 rounded-xl transition-all duration-200 text-sm border ${
                                    isDark
                                        ? 'border-[#334155] text-[#94A3B8] hover:text-white hover:border-[#6C4CF1]/50 hover:bg-[#6C4CF1]/10'
                                        : 'border-gray-200 text-gray-600 hover:text-[#6C4CF1] hover:border-[#6C4CF1]/40 hover:bg-[#6C4CF1]/5'
                                }`}
                            >
                                لوحة التحكم
                            </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}