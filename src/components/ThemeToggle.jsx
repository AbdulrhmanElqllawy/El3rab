import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle({ className = '' }) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={toggleTheme}
            title={isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 text-[#94A3B8] hover:text-[#E2E8F0]'
                    : 'bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 hover:text-gray-900'
            } ${className}`}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
        >
            <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
            >
                {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </motion.div>
        </motion.button>
    );
}