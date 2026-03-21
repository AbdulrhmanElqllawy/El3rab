import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function AdminModal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    actions = null,
    loading = false
}) {
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40"
                        dir="rtl"
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" dir="rtl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className={`bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}
                        >
                            {/* Header */}
                            {title && (
                                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-[#334155]/50 sticky top-0 bg-white dark:bg-[#1E293B] z-10">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onClose}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    </motion.button>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6">
                                {children}
                            </div>

                            {/* Actions */}
                            {actions && (
                                <div className="p-6 border-t border-gray-100 dark:border-[#334155]/50 bg-gray-50 dark:bg-[#0F172A] flex gap-3 justify-end sticky bottom-0">
                                    {actions.map((action, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={action.onClick}
                                            disabled={loading}
                                            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                                                action.variant === 'primary'
                                                    ? 'bg-[#6C4CF1] text-white hover:bg-[#5b3ee0] disabled:opacity-50'
                                                    : action.variant === 'danger'
                                                    ? 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-50'
                                                    : 'bg-gray-200 dark:bg-[#334155] text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#475569] disabled:opacity-50'
                                            }`}
                                        >
                                            {loading && action.variant === 'primary' ? 'جاري الحفظ...' : action.label}
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
