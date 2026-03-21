import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ 
    label, 
    value, 
    icon: Icon, 
    trend,
    subtitle,
    color = 'purple',
    onClick
}) {
    const colorClasses = {
        purple: 'bg-[#6C4CF1]/10 text-[#6C4CF1] border-[#6C4CF1]/20',
        teal: 'bg-[#00C2A8]/10 text-[#00C2A8] border-[#00C2A8]/20',
        amber: 'bg-[#FFD166]/20 text-amber-700 dark:text-[#FFD166] border-[#FFD166]/30',
        red: 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20',
        green: 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20',
        blue: 'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={onClick}
            className={`${colorClasses[color]} rounded-xl p-5 border cursor-pointer transition-all ${onClick ? 'hover:shadow-lg' : ''}`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        {label}
                    </p>
                    <div className="mt-3 flex items-baseline gap-2">
                        <p className="text-3xl font-black text-gray-900 dark:text-white">
                            {value}
                        </p>
                        {trend && (
                            <div className={`flex items-center gap-1 text-xs font-bold ${
                                trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                                {trend.direction === 'up' ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                {trend.percentage}%
                            </div>
                        )}
                    </div>
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {subtitle}
                        </p>
                    )}
                </div>
                {Icon && (
                    <div className="p-3 rounded-lg bg-current/10">
                        <Icon className="w-6 h-6 text-current opacity-60" />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
