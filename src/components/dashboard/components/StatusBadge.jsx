import React from 'react';
import { motion } from 'framer-motion';

export default function StatusBadge({ 
    status, 
    variant = 'default',
    size = 'md',
    icon: Icon
}) {
    const statusConfig = {
        active: {
            color: 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20',
            label: 'نشط'
        },
        inactive: {
            color: 'bg-gray-100 dark:bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-500/20',
            label: 'غير نشط'
        },
        pending: {
            color: 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
            label: 'قيد الانتظار'
        },
        banned: {
            color: 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20',
            label: 'محظور'
        },
        approved: {
            color: 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20',
            label: 'موافق عليه'
        },
        rejected: {
            color: 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20',
            label: 'مرفوض'
        },
        published: {
            color: 'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
            label: 'منشور'
        },
        draft: {
            color: 'bg-gray-100 dark:bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-500/20',
            label: 'مسودة'
        },
        archived: {
            color: 'bg-slate-100 dark:bg-slate-500/15 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-500/20',
            label: 'مؤرشف'
        },
    };

    const config = statusConfig[status] || statusConfig.inactive;
    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base'
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${config.color} ${sizeClasses[size]} rounded-full font-semibold border inline-flex items-center gap-2`}
        >
            {Icon && <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
            {config.label}
        </motion.div>
    );
}
