import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Archive, Eye } from 'lucide-react';

export default function BulkActionBar({ 
    selectedCount = 0, 
    actions = [],
    onClearSelection 
}) {
    if (selectedCount === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#6C4CF1]/10 dark:bg-[#6C4CF1]/20 border border-[#6C4CF1]/30 dark:border-[#6C4CF1]/40 rounded-lg p-4 mb-4 flex items-center justify-between gap-4"
                dir="rtl"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#6C4CF1] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{selectedCount}</span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            تم تحديد {selectedCount} عنصر
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            اختر إجراء من الخيارات أدناه
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap justify-end">
                    {actions.map((action, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={action.onClick}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap ${
                                action.className ||
                                'bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#334155]'
                            }`}
                        >
                            {action.icon}
                            {action.label}
                        </motion.button>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClearSelection}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors font-semibold text-sm"
                    >
                        <X className="w-4 h-4" />
                        إلغاء
                    </motion.button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
