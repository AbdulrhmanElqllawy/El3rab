import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Check, Minus, ChevronUp, ChevronDown } from 'lucide-react';

export default function AdvancedDataTable({
    columns = [],
    data = [],
    actions = [],
    searchable = true,
    pagination = true,
    itemsPerPage = 10,
    onSelectionChange,
    selectable = true,
    sortable = true,
    empty = 'لا توجد بيانات',
    onBulkAction,
    loading = false
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Filter data
    const filteredData = useMemo(() => {
        return data.filter(item =>
            columns.some(col =>
                String(item[col.key] ?? '').toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, columns, searchTerm]);

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Paginate data
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIdx, startIdx + itemsPerPage);

    const handleSelectAll = () => {
        if (selectedRows.size === paginatedData.length) {
            setSelectedRows(new Set());
        } else {
            setSelectedRows(new Set(paginatedData.map((_, i) => startIdx + i)));
        }
    };

    const handleSelectRow = (idx) => {
        const newSelection = new Set(selectedRows);
        if (newSelection.has(idx)) {
            newSelection.delete(idx);
        } else {
            newSelection.add(idx);
        }
        setSelectedRows(newSelection);
    };

    const handleSort = (key) => {
        if (sortConfig.key === key) {
            setSortConfig({
                key,
                direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
            });
        } else {
            setSortConfig({ key, direction: 'asc' });
        }
    };

    const isAllSelected = paginatedData.length > 0 && selectedRows.size === paginatedData.length;
    const isIndeterminate = selectedRows.size > 0 && selectedRows.size < paginatedData.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden"
            dir="rtl"
        >
            {/* Search Bar */}
            {searchable && (
                <div className="p-4 border-b border-gray-100 dark:border-[#334155]/50">
                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="البحث..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1] dark:text-white placeholder:text-gray-500"
                        />
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-[#0F172A] border-b border-gray-200 dark:border-[#334155]">
                        <tr>
                            {selectable && (
                                <th className="px-4 py-3 text-right">
                                    <button
                                        onClick={handleSelectAll}
                                        className="flex items-center justify-center w-5 h-5 rounded border border-gray-300 dark:border-[#475569] hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
                                    >
                                        {isAllSelected ? (
                                            <Check className="w-4 h-4 text-[#6C4CF1]" />
                                        ) : isIndeterminate ? (
                                            <Minus className="w-4 h-4 text-[#6C4CF1]" />
                                        ) : null}
                                    </button>
                                </th>
                            )}
                            {columns.map(col => (
                                <th
                                    key={col.key}
                                    className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right"
                                >
                                    <div className="flex items-center justify-between gap-2 cursor-pointer group"
                                        onClick={() => sortable && col.sortable !== false && handleSort(col.key)}
                                    >
                                        {col.label}
                                        {sortable && col.sortable !== false && (
                                            <motion.div
                                                animate={{ opacity: sortConfig.key === col.key ? 1 : 0.3 }}
                                            >
                                                {sortConfig.key === col.key && sortConfig.direction === 'asc' ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </motion.div>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {actions.length > 0 && (
                                <th className="px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">
                                    الإجراءات
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode="popLayout">
                            {!loading && paginatedData.length > 0 ? (
                                paginatedData.map((item, idx) => {
                                    const globalIdx = startIdx + idx;
                                    const isSelected = selectedRows.has(globalIdx);

                                    return (
                                        <motion.tr
                                            key={globalIdx}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className={`border-b border-gray-100 dark:border-[#334155]/50 transition-colors ${
                                                isSelected 
                                                    ? 'bg-[#6C4CF1]/5 dark:bg-[#6C4CF1]/10' 
                                                    : 'hover:bg-gray-50 dark:hover:bg-[#0F172A]'
                                            }`}
                                        >
                                            {selectable && (
                                                <td className="px-4 py-4 text-center">
                                                    <button
                                                        onClick={() => handleSelectRow(globalIdx)}
                                                        className="flex items-center justify-center w-5 h-5 rounded border border-gray-300 dark:border-[#475569] hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
                                                    >
                                                        {isSelected && (
                                                            <Check className="w-4 h-4 text-[#6C4CF1]" />
                                                        )}
                                                    </button>
                                                </td>
                                            )}
                                            {columns.map(col => (
                                                <td key={col.key} className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                                                </td>
                                            ))}
                                            {actions.length > 0 && (
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        {actions.slice(0, 3).map((action, aIdx) => (
                                                            <motion.button
                                                                key={aIdx}
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => action.onClick?.(item)}
                                                                className={`p-2 rounded-lg transition-colors ${
                                                                    action.className ||
                                                                    'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#334155]'
                                                                }`}
                                                                title={action.label}
                                                            >
                                                                {action.icon}
                                                            </motion.button>
                                                        ))}
                                                        {actions.length > 3 && (
                                                            <div className="relative group">
                                                                <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#334155] transition-colors">
                                                                    ⋯
                                                                </button>
                                                                <div className="absolute left-0 top-full mt-1 bg-white dark:bg-[#0F172A] rounded-lg shadow-lg hidden group-hover:block z-10 min-w-max">
                                                                    {actions.slice(3).map((action, aIdx) => (
                                                                        <button
                                                                            key={aIdx}
                                                                            onClick={() => action.onClick?.(item)}
                                                                            className={`w-full px-4 py-2 text-sm text-left transition-colors flex items-center gap-2 ${
                                                                                action.className ||
                                                                                'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#334155]'
                                                                            }`}
                                                                        >
                                                                            {action.icon}
                                                                            {action.label}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            )}
                                        </motion.tr>
                                    );
                                })
                            ) : !loading ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + (actions.length > 0 ? 1 : 0) + (selectable ? 1 : 0)}
                                        className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        {empty}
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length + (actions.length > 0 ? 1 : 0) + (selectable ? 1 : 0)}
                                        className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        جاري التحميل...
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 dark:border-[#334155]/50 flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        الصفحة {currentPage} من {totalPages} • {sortedData.length} نتيجة
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#334155] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#334155] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
