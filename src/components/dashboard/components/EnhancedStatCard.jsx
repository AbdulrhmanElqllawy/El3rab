import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Loader } from 'lucide-react';
import { TRANSITIONS } from './DesignTokens';

/**
 * Enhanced StatCard with SaaS-grade polish
 * Features:
 * - Loading skeleton state
 * - Comparison indicators (vs previous period)
 * - Multiple value formats
 * - Better visual hierarchy
 * - Micro-interactions
 */
export default function EnhancedStatCard({
    label,
    value,
    icon: Icon,
    comparison,
    subtitle,
    color = 'purple',
    loading = false,
    onClick,
    trend,
    format = 'number', // 'number', 'currency', 'percentage'
    size = 'md', // 'sm', 'md', 'lg'
}) {
    const colorClasses = {
        purple: {
            bg: 'bg-[#6C4CF1]/10',
            text: 'text-[#6C4CF1]',
            border: 'border-[#6C4CF1]/20',
            icon: 'bg-[#6C4CF1]/10',
            dark: 'dark:bg-[#6C4CF1]/5 dark:border-[#6C4CF1]/10',
        },
        teal: {
            bg: 'bg-[#00C2A8]/10',
            text: 'text-[#00C2A8]',
            border: 'border-[#00C2A8]/20',
            icon: 'bg-[#00C2A8]/10',
            dark: 'dark:bg-[#00C2A8]/5 dark:border-[#00C2A8]/10',
        },
        amber: {
            bg: 'bg-[#FFD166]/10',
            text: 'text-amber-700 dark:text-[#FFD166]',
            border: 'border-[#FFD166]/20',
            icon: 'bg-[#FFD166]/10',
            dark: 'dark:bg-[#FFD166]/5 dark:border-[#FFD166]/10',
        },
        red: {
            bg: 'bg-red-100 dark:bg-red-500/10',
            text: 'text-red-700 dark:text-red-400',
            border: 'border-red-200 dark:border-red-500/20',
            icon: 'bg-red-100 dark:bg-red-500/10',
            dark: 'dark:bg-red-500/5 dark:border-red-500/10',
        },
        green: {
            bg: 'bg-green-100 dark:bg-green-500/10',
            text: 'text-green-700 dark:text-green-400',
            border: 'border-green-200 dark:border-green-500/20',
            icon: 'bg-green-100 dark:bg-green-500/10',
            dark: 'dark:bg-green-500/5 dark:border-green-500/10',
        },
        blue: {
            bg: 'bg-blue-100 dark:bg-blue-500/10',
            text: 'text-blue-700 dark:text-blue-400',
            border: 'border-blue-200 dark:border-blue-500/20',
            icon: 'bg-blue-100 dark:bg-blue-500/10',
            dark: 'dark:bg-blue-500/5 dark:border-blue-500/10',
        },
    };

    const colors = colorClasses[color];

    const sizeClasses = {
        sm: {
            padding: 'p-3',
            icon: 'w-8 h-8',
            label: 'text-xs',
            value: 'text-2xl',
        },
        md: {
            padding: 'p-4',
            icon: 'w-10 h-10',
            label: 'text-sm',
            value: 'text-3xl',
        },
        lg: {
            padding: 'p-6',
            icon: 'w-12 h-12',
            label: 'text-base',
            value: 'text-4xl',
        },
    };

    const sizes = sizeClasses[size];

    const formatValue = (val) => {
        if (format === 'currency') return `$${val.toLocaleString()}`;
        if (format === 'percentage') return `${val}%`;
        return val.toLocaleString();
    };

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`${colors.bg} ${colors.border} ${colors.dark} rounded-lg border ${sizes.padding} space-y-3`}
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 animate-pulse" />
                        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 animate-pulse" />
                    </div>
                    <div className={`${sizes.icon} bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse`} />
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, translateY: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={onClick}
            className={`${colors.bg} ${colors.border} ${colors.dark} rounded-lg border ${sizes.padding} transition-all cursor-pointer hover:shadow-md`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <p className={`${colors.text} font-semibold uppercase tracking-wider ${sizes.label} opacity-80`}>
                        {label}
                    </p>
                    <div className="mt-3 flex items-baseline gap-2">
                        <p className={`font-black text-gray-900 dark:text-white ${sizes.value}`}>
                            {formatValue(value)}
                        </p>
                        {comparison && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`flex items-center gap-0.5 text-xs font-bold ${
                                    comparison.direction === 'up'
                                        ? 'text-green-600 dark:text-green-400'
                                        : comparison.direction === 'down'
                                        ? 'text-red-600 dark:text-red-400'
                                        : 'text-gray-500 dark:text-gray-400'
                                }`}
                            >
                                {comparison.direction === 'up' && <TrendingUp className="w-3 h-3" />}
                                {comparison.direction === 'down' && <TrendingDown className="w-3 h-3" />}
                                {comparison.value}
                            </motion.div>
                        )}
                    </div>
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {subtitle}
                        </p>
                    )}
                </div>
                {Icon && (
                    <div className={`${colors.icon} ${sizes.icon} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`${colors.text} w-2/3 h-2/3`} />
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/**
 * Loading Skeleton for StatCard
 */
export function StatCardSkeleton({ size = 'md' }) {
    const sizeClasses = {
        sm: 'h-20',
        md: 'h-24',
        lg: 'h-32',
    };

    return (
        <div className={`${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse`} />
    );
}

/**
 * StatCard Group - Display multiple stat cards in grid
 */
export function StatCardGroup({ stats, loading = false, columns = 4 }) {
    const gridClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid ${gridClasses[columns]} gap-4 lg:gap-6`}>
            {loading ? (
                Array(columns).fill(0).map((_, i) => <StatCardSkeleton key={i} />)
            ) : (
                stats.map((stat, idx) => (
                    <motion.div
                        key={stat.id || idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <EnhancedStatCard {...stat} />
                    </motion.div>
                ))
            )}
        </div>
    );
}
