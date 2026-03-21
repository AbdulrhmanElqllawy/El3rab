import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ label, value, icon: IconComponent, color = '#6C4CF1', change, changeLabel, index = 0 }) {
    const Icon = IconComponent;
    const isPositive = change >= 0;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-none transition-all duration-300 hover:-translate-y-0.5"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                </div>
                {change !== undefined && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${isPositive ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                        {isPositive ? '+' : ''}{change}%
                    </span>
                )}
            </div>
            <p className="text-2xl font-black text-gray-900 dark:text-[#F1F5F9] mb-1">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            {changeLabel && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{changeLabel}</p>}
        </motion.div>
    );
}