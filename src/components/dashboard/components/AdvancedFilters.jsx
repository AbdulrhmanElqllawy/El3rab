import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';

export default function AdvancedFilters({ 
    filters = [],
    onApply,
    onReset,
    compact = false
}) {
    const [isOpen, setIsOpen] = useState(!compact);
    const [filterValues, setFilterValues] = useState({});

    const handleFilterChange = (filterId, value) => {
        setFilterValues(prev => ({
            ...prev,
            [filterId]: value
        }));
    };

    const handleApply = () => {
        onApply?.(filterValues);
        if (compact) setIsOpen(false);
    };

    const handleReset = () => {
        setFilterValues({});
        onReset?.();
    };

    const hasActiveFilters = Object.values(filterValues).some(v => v !== '' && v !== null && v !== undefined);

    return (
        <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden" dir="rtl">
            {compact && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        التصفية المتقدمة
                        {hasActiveFilters && (
                            <span className="px-2 py-0.5 rounded-full bg-[#6C4CF1] text-white text-xs font-bold">
                                {Object.values(filterValues).filter(v => v !== '' && v !== null && v !== undefined).length}
                            </span>
                        )}
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-gray-100 dark:border-[#334155]/50"
                    >
                        <div className="p-4 space-y-4">
                            {filters.map((filter, idx) => (
                                <div key={idx} className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                                        {filter.label}
                                    </label>

                                    {filter.type === 'text' && (
                                        <input
                                            type="text"
                                            value={filterValues[filter.id] || ''}
                                            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                            placeholder={filter.placeholder}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                                        />
                                    )}

                                    {filter.type === 'select' && (
                                        <select
                                            value={filterValues[filter.id] || ''}
                                            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                                        >
                                            <option value="">جميع الخيارات</option>
                                            {filter.options?.map((opt, optIdx) => (
                                                <option key={optIdx} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}

                                    {filter.type === 'dateRange' && (
                                        <div className="flex gap-2">
                                            <input
                                                type="date"
                                                value={filterValues[`${filter.id}_from`] || ''}
                                                onChange={(e) => handleFilterChange(`${filter.id}_from`, e.target.value)}
                                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                                            />
                                            <input
                                                type="date"
                                                value={filterValues[`${filter.id}_to`] || ''}
                                                onChange={(e) => handleFilterChange(`${filter.id}_to`, e.target.value)}
                                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                                            />
                                        </div>
                                    )}

                                    {filter.type === 'numberRange' && (
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                value={filterValues[`${filter.id}_min`] || ''}
                                                onChange={(e) => handleFilterChange(`${filter.id}_min`, e.target.value)}
                                                placeholder="الحد الأدنى"
                                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                                            />
                                            <input
                                                type="number"
                                                value={filterValues[`${filter.id}_max`] || ''}
                                                onChange={(e) => handleFilterChange(`${filter.id}_max`, e.target.value)}
                                                placeholder="الحد الأقصى"
                                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]"
                                            />
                                        </div>
                                    )}

                                    {filter.type === 'checkbox' && (
                                        <div className="space-y-2">
                                            {filter.options?.map((opt, optIdx) => (
                                                <label key={optIdx} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={filterValues[`${filter.id}_${opt.value}`] || false}
                                                        onChange={(e) => handleFilterChange(`${filter.id}_${opt.value}`, e.target.checked)}
                                                        className="w-4 h-4 rounded border-gray-300 accent-[#6C4CF1] cursor-pointer"
                                                    />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-[#334155]/50">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleApply}
                                    className="flex-1 px-4 py-2.5 bg-[#6C4CF1] text-white rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors"
                                >
                                    تطبيق
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleReset}
                                    className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-[#334155] text-gray-900 dark:text-white rounded-lg font-semibold text-sm hover:bg-gray-200 dark:hover:bg-[#475569] transition-colors"
                                >
                                    إعادة تعيين
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
