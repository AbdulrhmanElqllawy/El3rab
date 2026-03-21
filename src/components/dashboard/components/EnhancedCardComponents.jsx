import React from 'react';
import { motion } from 'framer-motion';

/**
 * Enhanced Card Component
 * Consistent card styling across dashboard
 */
export function Card({
    children,
    className = '',
    elevated = false,
    interactive = false,
    onClick = null,
    ...props
}) {
    const baseClass = 'bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]/50 transition-all';
    const elevatedClass = elevated ? 'shadow-md hover:shadow-lg' : '';
    const interactiveClass = interactive ? 'cursor-pointer hover:border-[#6C4CF1]' : '';

    return (
        <motion.div
            whileHover={interactive ? { scale: 1.02 } : {}}
            onClick={onClick}
            className={`${baseClass} ${elevatedClass} ${interactiveClass} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/**
 * Card Header Component
 */
export function CardHeader({
    title,
    subtitle = null,
    action = null,
    className = '',
}) {
    return (
        <div className={`flex items-start justify-between gap-4 p-6 border-b border-gray-200 dark:border-[#334155]/50 ${className}`}>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && (
                <div>
                    {action}
                </div>
            )}
        </div>
    );
}

/**
 * Card Body Component
 */
export function CardBody({ children, className = '' }) {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
}

/**
 * Card Footer Component
 */
export function CardFooter({ children, className = '' }) {
    return (
        <div className={`flex items-center justify-between gap-4 p-6 border-t border-gray-200 dark:border-[#334155]/50 ${className}`}>
            {children}
        </div>
    );
}

/**
 * Status Badge Component
 */
export function StatusBadge({
    status,
    size = 'md',
    icon = null,
    className = '',
}) {
    const statusStyles = {
        success: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400',
        error: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400',
        warning: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400',
        info: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400',
        neutral: 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400',
        primary: 'bg-[#6C4CF1]/10 text-[#6C4CF1]',
        secondary: 'bg-[#00C2A8]/10 text-[#00C2A8]',
    };

    const sizeStyles = {
        xs: 'px-2 py-0.5 text-xs',
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    const statusType = status.type || 'neutral';

    return (
        <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${statusStyles[statusType]} ${sizeStyles[size]} ${className}`}>
            {icon && React.cloneElement(icon, { className: 'w-3 h-3' })}
            {status.label}
        </span>
    );
}

/**
 * Progress Badge for loading/completion
 */
export function ProgressBadge({
    percentage,
    size = 'md',
    showLabel = true,
}) {
    const getColor = (percent) => {
        if (percent >= 80) return 'bg-green-500';
        if (percent >= 60) return 'bg-[#FFD166]';
        if (percent >= 40) return 'bg-amber-500';
        return 'bg-red-500';
    };

    const sizeStyles = {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
    };

    return (
        <div className="flex items-center gap-2">
            <div className={`flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizeStyles[size]}`}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`${getColor(percentage)} h-full rounded-full`}
                />
            </div>
            {showLabel && (
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {percentage}%
                </span>
            )}
        </div>
    );
}

/**
 * Tag Component
 */
export function Tag({
    label,
    onRemove = null,
    variant = 'default',
    size = 'md',
    icon = null,
}) {
    const variantClasses = {
        default: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
        primary: 'bg-[#6C4CF1]/10 text-[#6C4CF1]',
        success: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400',
        error: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400',
    };

    const sizeStyles = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`inline-flex items-center gap-2 rounded-full font-medium ${variantClasses[variant]} ${sizeStyles[size]}`}
        >
            {icon && React.cloneElement(icon, { className: 'w-3 h-3' })}
            {label}
            {onRemove && (
                <button
                    onClick={onRemove}
                    className="hover:opacity-70 transition-opacity ml-1"
                >
                    ✕
                </button>
            )}
        </motion.div>
    );
}

/**
 * Divider Component
 */
export function Divider({
    orientation = 'horizontal',
    className = '',
}) {
    if (orientation === 'vertical') {
        return <div className={`w-px bg-gray-200 dark:bg-[#334155] ${className}`} />;
    }

    return <div className={`h-px bg-gray-200 dark:bg-[#334155] ${className}`} />;
}

/**
 * Skeleton Loader Component
 */
export function Skeleton({
    width = '100%',
    height = '20px',
    variant = 'rectangular',
    count = 1,
    className = '',
}) {
    const borderRadiusClass = variant === 'rectangular' ? 'rounded-lg' : 'rounded-full';

    return (
        <div className={`space-y-2 ${className}`}>
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        style={{ width, height }}
                        className={`bg-gray-300 dark:bg-gray-600 animate-pulse ${borderRadiusClass}`}
                    />
                ))}
        </div>
    );
}
