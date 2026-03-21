import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, Edit2, Check, X } from 'lucide-react';
import { useSimulator } from '@/contexts/SimulatorContext';

export default function MistakeFoldersView() {
    const { folders, createFolder, deleteFolder, updateFolder, getMistakesForFolder, moveMistakeToFolder, mistakes } = useSimulator();
    const [expandedFolders, setExpandedFolders] = useState(new Set());
    const [showNewFolderForm, setShowNewFolderForm] = useState(false);
    const [newFolderData, setNewFolderData] = useState({ name: '', description: '', color: '#6C4CF1' });
    const [editingFolder, setEditingFolder] = useState(null);

    const COLORS = ['#6C4CF1', '#00C2A8', '#FFD166', '#EF4444', '#2DD4BF', '#8B5CF6'];

    const handleCreateFolder = () => {
        if (newFolderData.name.trim()) {
            createFolder(newFolderData.name, newFolderData.description, newFolderData.color);
            setNewFolderData({ name: '', description: '', color: '#6C4CF1' });
            setShowNewFolderForm(false);
        }
    };

    const toggleFolderExpanded = (folderId) => {
        setExpandedFolders(prev => {
            const next = new Set(prev);
            if (next.has(folderId)) next.delete(folderId);
            else next.add(folderId);
            return next;
        });
    };

    const unfolderedMistakes = getMistakesForFolder(null);

    return (
        <div className="space-y-4" dir="rtl">
            {/* New Folder Form */}
            {showNewFolderForm && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm space-y-4"
                >
                    <h3 className="font-bold text-gray-900 dark:text-[#E2E8F0]">
                        إنشاء مجلد جديد
                    </h3>

                    <input
                        type="text"
                        placeholder="اسم المجلد..."
                        value={newFolderData.name}
                        onChange={(e) => setNewFolderData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] text-gray-900 dark:text-[#E2E8F0] font-bold text-sm"
                    />

                    <textarea
                        placeholder="الوصف (اختياري)..."
                        value={newFolderData.description}
                        onChange={(e) => setNewFolderData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] text-gray-900 dark:text-[#E2E8F0] font-bold text-sm"
                        rows={2}
                    />

                    <div>
                        <p className="text-sm font-bold text-[#64748b] dark:text-[#94A3B8] mb-2">
                            اختر لوناً
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {COLORS.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setNewFolderData(prev => ({ ...prev, color }))}
                                    className={`w-8 h-8 rounded-full transition-transform ${
                                        newFolderData.color === color ? 'scale-125 ring-2 ring-offset-2' : ''
                                    }`}
                                    style={{
                                        backgroundColor: color,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleCreateFolder}
                            className="flex-1 px-4 py-2 rounded-lg bg-[#6C4CF1] text-white font-bold hover:opacity-90 transition-all"
                        >
                            إنشاء
                        </button>
                        <button
                            onClick={() => setShowNewFolderForm(false)}
                            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#0F172A] text-gray-900 dark:text-[#E2E8F0] font-bold hover:opacity-90 transition-all"
                        >
                            إلغاء
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Create Folder Button */}
            {!showNewFolderForm && (
                <motion.button
                    onClick={() => setShowNewFolderForm(true)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-[#6C4CF1] text-[#6C4CF1] font-bold hover:bg-[#6C4CF1]/5 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    إنشاء مجلد جديد
                </motion.button>
            )}

            {/* Folders List */}
            {folders.length === 0 && unfolderedMistakes.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-[#1E293B] rounded-2xl">
                    <div className="text-5xl mb-4">📁</div>
                    <p className="text-[#64748b] dark:text-[#94A3B8] font-bold mb-1">
                        لا توجد مجلدات حتى الآن
                    </p>
                    <p className="text-sm text-[#94A3B8]">
                        أنشئ مجلدات لتنظيم أخطائك حسب الموضوعات
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Unfoldered Mistakes */}
                    {unfolderedMistakes.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden shadow-sm"
                        >
                            <button
                                onClick={() => {
                                    const key = '__unfoldered__';
                                    setExpandedFolders(prev => {
                                        const next = new Set(prev);
                                        if (next.has(key)) next.delete(key);
                                        else next.add(key);
                                        return next;
                                    });
                                }}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded bg-gray-300 dark:bg-[#334155]" />
                                    <div className="text-left">
                                        <p className="font-bold text-gray-900 dark:text-[#E2E8F0]">
                                            أخطاء غير مصنفة
                                        </p>
                                        <p className="text-sm text-[#64748b] dark:text-[#94A3B8]">
                                            {unfolderedMistakes.length} أخطاء
                                        </p>
                                    </div>
                                </div>

                                <motion.div
                                    animate={{ rotate: expandedFolders.has('__unfoldered__') ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="w-5 h-5 text-[#64748b] dark:text-[#94A3B8]" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {expandedFolders.has('__unfoldered__') && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-gray-100 dark:border-[#334155]/50 divide-y divide-gray-100 dark:divide-[#334155]/50"
                                    >
                                        {unfolderedMistakes.map(mistake => (
                                            <div key={mistake.id} className="p-4">
                                                <p className="text-sm font-bold text-gray-900 dark:text-[#E2E8F0] mb-1">
                                                    {mistake.questionText?.substring(0, 60)}...
                                                </p>
                                                <p className="text-xs text-[#64748b] dark:text-[#94A3B8] mb-2">
                                                    {mistake.category}
                                                </p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Folders */}
                    {folders.map((folder, idx) => {
                        const folderMistakes = getMistakesForFolder(folder.id);
                        const isExpanded = expandedFolders.has(folder.id);

                        return (
                            <motion.div
                                key={folder.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden shadow-sm"
                            >
                                {/* Folder Header */}
                                <button
                                    onClick={() => toggleFolderExpanded(folder.id)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded"
                                            style={{ backgroundColor: folder.color }}
                                        />
                                        <div className="text-left">
                                            <p className="font-bold text-gray-900 dark:text-[#E2E8F0]">
                                                {folder.name}
                                            </p>
                                            {folder.description && (
                                                <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">
                                                    {folder.description}
                                                </p>
                                            )}
                                            <p className="text-sm text-[#64748b] dark:text-[#94A3B8]">
                                                {folderMistakes.length} أخطاء
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteFolder(folder.id);
                                            }}
                                            className="p-1.5 rounded-lg bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronDown className="w-5 h-5 text-[#64748b] dark:text-[#94A3B8]" />
                                        </motion.div>
                                    </div>
                                </button>

                                {/* Folder Contents */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-t border-gray-100 dark:border-[#334155]/50 divide-y divide-gray-100 dark:divide-[#334155]/50"
                                        >
                                            {folderMistakes.length === 0 ? (
                                                <div className="p-4 text-center text-[#94A3B8]">
                                                    هذا المجلد فارغ
                                                </div>
                                            ) : (
                                                folderMistakes.map(mistake => (
                                                    <div key={mistake.id} className="p-4">
                                                        <p className="text-sm font-bold text-gray-900 dark:text-[#E2E8F0] mb-1">
                                                            {mistake.questionText?.substring(0, 60)}...
                                                        </p>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <span className="text-xs text-[#64748b] dark:text-[#94A3B8]">
                                                                {mistake.category}
                                                            </span>
                                                            <span className="text-xs font-bold text-[#6C4CF1]">
                                                                محاولات: {mistake.retries}
                                                            </span>
                                                        </div>
                                                        {mistake.notes && (
                                                            <p className="text-xs text-[#94A3B8] mt-2 p-2 bg-gray-50 dark:bg-[#0F172A] rounded">
                                                                {mistake.notes}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
