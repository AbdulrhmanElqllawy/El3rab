import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronDown, Check, Minus, MoreVertical, ArrowUpDown, 
    Search, Filter, Trash2, Copy 
} from 'lucide-react';
import EmptyState from './EnhancedEmptyState';

/**
 * Enhanced Data Table with SaaS Features
 * Features:
 * - Sortable columns
 * - Row selection with bulk actions
 * - Search & filter
 * - Empty states
 * - Loading skeletons
 * - Responsive design
 * - Sticky headers
 */
export default function EnhancedDataTable({
    columns,
    data,
    loading = false,
    onRowClick = null,
    onBulkAction = null,
    searchPlaceholder = 'البحث...',
    emptyTitle = 'لا توجد بيانات',
    emptyDescription = 'لا توجد عناصر لعرضها حالياً',
}) {
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');

    // Sorting logic
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    // Filtering logic
    const filteredData = useMemo(() => {
        if (!searchTerm) return sortedData;
        return sortedData.filter(row =>
            Object.values(row).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [sortedData, searchTerm]);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const handleSelectAll = () => {
        if (selectedRows.size === filteredData.length) {
            setSelectedRows(new Set());
        } else {
            setSelectedRows(new Set(filteredData.map((_, idx) => idx)));
        }
    };

    const handleSelectRow = (idx) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(idx)) {
            newSelected.delete(idx);
        } else {
            newSelected.add(idx);
        }
        setSelectedRows(newSelected);
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                ))}
            </div>
        );
    }

    if (filteredData.length === 0) {
        return <EmptyState title={emptyTitle} description={emptyDescription} />;
    }

    return (
        <div className="space-y-4" dir="rtl">
            {/* Search Bar */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg border border-gray-200 dark:border-[#334155]">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none text-sm"
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Batch Actions Bar */}
            <AnimatePresence>
                {selectedRows.size > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-between p-3 bg-[#6C4CF1]/10 border border-[#6C4CF1]/20 rounded-lg"
                    >
                        <span className="text-sm font-semibold text-[#6C4CF1]">
                            تم اختيار {selectedRows.size} عنصر
                        </span>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-[#6C4CF1]/10 rounded-lg transition-colors">
                                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-[#334155]/50">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-gray-50 dark:bg-[#0F172A] border-b border-gray-200 dark:border-[#334155]">
                        <tr>
                            <th className="px-4 py-3 text-right">
                                <button
                                    onClick={handleSelectAll}
                                    className="inline-flex items-center justify-center w-5 h-5 rounded border border-gray-300 dark:border-[#334155] hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
                                >
                                    {selectedRows.size === filteredData.length && selectedRows.size > 0 ? (
                                        <Check className="w-3 h-3 text-[#6C4CF1]" />
                                    ) : selectedRows.size > 0 ? (
                                        <Minus className="w-3 h-3 text-gray-400" />
                                    ) : null}
                                </button>
                            </th>
                            {columns.map(col => (
                                <th
                                    key={col.key}
                                    className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300"
                                >
                                    {col.sortable !== false ? (
                                        <button
                                            onClick={() => handleSort(col.key)}
                                            className="flex items-center justify-between w-full hover:text-gray-900 dark:hover:text-white transition-colors"
                                        >
                                            {col.label}
                                            <ArrowUpDown
                                                className={`w-4 h-4 ml-2 transition-all ${
                                                    sortConfig.key === col.key
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                }`}
                                            />
                                        </button>
                                    ) : (
                                        col.label
                                    )}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">
                                الإجراءات
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-[#334155]/50">
                        {filteredData.map((row, rowIdx) => (
                            <motion.tr
                                key={rowIdx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`hover:bg-gray-50 dark:hover:bg-[#1E293B] transition-colors ${
                                    selectedRows.has(rowIdx) ? 'bg-[#6C4CF1]/5' : ''
                                }`}
                            >
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => handleSelectRow(rowIdx)}
                                        className="inline-flex items-center justify-center w-5 h-5 rounded border border-gray-300 dark:border-[#334155] hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
                                    >
                                        {selectedRows.has(rowIdx) && (
                                            <Check className="w-3 h-3 text-[#6C4CF1]" />
                                        )}
                                    </button>
                                </td>
                                {columns.map(col => (
                                    <td
                                        key={col.key}
                                        className="px-4 py-3 text-gray-900 dark:text-white cursor-pointer"
                                        onClick={() => onRowClick?.(row)}
                                    >
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </td>
                                ))}
                                <td className="px-4 py-3 text-center">
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#334155] rounded-lg transition-colors">
                                        <MoreVertical className="w-4 h-4 text-gray-400" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
                <span>
                    عرض {filteredData.length} من {data.length} نتيجة
                </span>
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="text-[#6C4CF1] hover:underline"
                    >
                        مسح البحث
                    </button>
                )}
            </div>
        </div>
    );
}
