import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

export default function PlaceholderView({ title = 'قريباً' }) {
    return (
        <div className="flex flex-col items-center justify-center h-64 p-6" dir="rtl">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <div className="w-16 h-16 rounded-2xl bg-[#6C4CF1]/10 flex items-center justify-center mx-auto mb-4">
                    <Construction className="w-8 h-8 text-[#6C4CF1]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-[#F1F5F9] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">هذا القسم قيد التطوير، سيكون متاحاً قريباً.</p>
            </motion.div>
        </div>
    );
}