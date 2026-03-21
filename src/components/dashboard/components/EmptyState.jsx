import React from 'react';
import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, description, action = null }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 px-4"
            dir="rtl"
        >
            <div className="w-20 h-20 rounded-2xl bg-[#6C4CF1]/10 flex items-center justify-center mb-4">
                <Icon className="w-10 h-10 text-[#6C4CF1]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center max-w-xs">{description}</p>
            {action && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action.onClick}
                    className="bg-[#6C4CF1] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors"
                >
                    {action.label}
                </motion.button>
            )}
        </motion.div>
    );
}
