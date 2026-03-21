import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({ title, description, breadcrumbs = [], actions = null }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
            dir="rtl"
        >
            {breadcrumbs.length > 0 && (
                <div className="flex items-center gap-2 mb-4 text-sm">
                    {breadcrumbs.map((item, idx) => (
                        <React.Fragment key={idx}>
                            <span className="text-gray-600 dark:text-gray-400">{item}</span>
                            {idx < breadcrumbs.length - 1 && (
                                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600 rotate-180" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#1E293B] rounded-xl p-5 border border-gray-100 dark:border-[#334155]/50">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                    {description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>}
                </div>
                {actions && <div className="flex gap-2 w-full sm:w-auto">{actions}</div>}
            </div>
        </motion.div>
    );
}
