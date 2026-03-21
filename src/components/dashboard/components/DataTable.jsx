import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Edit2, Trash2, Eye } from 'lucide-react';

export default function DataTable({ 
    columns = [], 
    data = [], 
    actions = [], 
    searchable = true, 
    pagination = true,
    itemsPerPage = 10,
    empty = 'لا توجد بيانات'
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = data.filter(item =>
        columns.some(col => 
            String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden"
            dir="rtl"
        >
            {searchable && (
                <div className="p-4 border-b border-gray-100 dark:border-[#334155]/50">
                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="ابحث..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4CF1] dark:text-white"
                        />
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-[#0F172A] border-b border-gray-200 dark:border-[#334155]">
                        <tr>
                            {columns.map(col => (
                                <th
                                    key={col.key}
                                    className="px-6 py-3 text-right font-semibold text-gray-700 dark:text-gray-300"
                                >
                                    {col.label}
                                </th>
                            ))}
                            {actions.length > 0 && (
                                <th className="px-6 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">
                                    الإجراءات
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, idx) => (
                                <motion.tr
                                    key={idx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="border-b border-gray-100 dark:border-[#334155]/50 hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                                >
                                    {columns.map(col => (
                                        <td key={col.key} className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                            {col.render ? col.render(item[col.key], item) : item[col.key]}
                                        </td>
                                    ))}
                                    {actions.length > 0 && (
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                {actions.map((action, aIdx) => (
                                                    <motion.button
                                                        key={aIdx}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => action.onClick(item)}
                                                        className={`p-2 rounded-lg transition-colors ${action.className || 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#334155]'}`}
                                                        title={action.label}
                                                    >
                                                        {action.icon}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="px-6 py-10 text-center text-gray-500">
                                    {empty}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 dark:border-[#334155]/50 flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        الصفحة {currentPage} من {totalPages}
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
