import React from 'react';
import { motion } from 'framer-motion';
import { InboxIcon, Plus, ArrowRight } from 'lucide-react';

/**
 * Empty State Component
 * Displays when no data is available
 * Features:
 * - Custom icon support
 * - Clear CTA
 * - Helpful description
 */
export default function EmptyState({
    icon: Icon = InboxIcon,
    title = 'لا توجد بيانات',
    description = 'ابدأ بإنشاء عنصر جديد لعرض المحتوى هنا',
    action = null,
    imageUrl = null,
    size = 'md',
}) {
    const sizeClasses = {
        sm: {
            container: 'py-8',
            icon: 'w-12 h-12',
            title: 'text-lg',
            desc: 'text-sm',
        },
        md: {
            container: 'py-12',
            icon: 'w-16 h-16',
            title: 'text-xl',
            desc: 'text-base',
        },
        lg: {
            container: 'py-20',
            icon: 'w-24 h-24',
            title: 'text-2xl',
            desc: 'text-lg',
        },
    };

    const sizes = sizeClasses[size];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex flex-col items-center justify-center ${sizes.container} px-4`}
        >
            {imageUrl ? (
                <img src={imageUrl} alt={title} className={`${sizes.icon} mb-4 opacity-80`} />
            ) : (
                <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-4"
                >
                    <Icon className={`${sizes.icon} text-gray-300 dark:text-gray-600`} />
                </motion.div>
            )}

            <h3 className={`${sizes.title} font-bold text-gray-900 dark:text-white mb-2 text-center`}>
                {title}
            </h3>
            <p className={`${sizes.desc} text-gray-600 dark:text-gray-400 text-center max-w-md mb-6`}>
                {description}
            </p>

            {action && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2.5 bg-[#6C4CF1] text-white rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    {action.label}
                </motion.button>
            )}
        </motion.div>
    );
}

/**
 * Empty State Variations
 */

export function NoSearchResults({ searchTerm }) {
    return (
        <EmptyState
            icon={InboxIcon}
            title={`لم نجد نتائج لـ "${searchTerm}"`}
            description="حاول البحث عن مصطلح مختلف أو تصفية النتائج"
            size="md"
        />
    );
}

export function NoPermissionState() {
    return (
        <EmptyState
            icon={InboxIcon}
            title="لا توجد صلاحيات"
            description="ليس لديك صلاحيات كافية للوصول إلى هذا المحتوى"
            size="md"
        />
    );
}

export function ErrorState({ title = 'حدث خطأ', description = 'يرجى المحاولة لاحقاً', onRetry }) {
    return (
        <EmptyState
            icon={InboxIcon}
            title={title}
            description={description}
            action={onRetry ? { label: 'إعادة محاولة', onClick: onRetry } : null}
            size="md"
        />
    );
}
