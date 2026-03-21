import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ChevronRight, ArrowRight } from 'lucide-react';

const BANKS = [
    { id: 1, count: 15 },
    { id: 2, count: 15 },
    { id: 3, count: 20 },
    { id: 4, count: 20 },
    { id: 5, count: 20 },
    { id: 6, count: 20 },
    { id: 7, count: 20 },
    { id: 8, count: 20 },
];

export default function BankSelection({ onStart, onBack }) {
    const [selectedBank, setSelectedBank] = useState(null);

    return (
        <div className="container mx-auto px-6 pb-20 max-w-4xl">
            {/* Back */}
            <button onClick={onBack} className="flex items-center gap-2 text-[#64748b] dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#E2E8F0] mb-8 text-sm font-medium transition-colors group">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                العودة لأنواع الاختبارات
            </button>

            <AnimatePresence mode="wait">
                {!selectedBank ? (
                    <motion.div key="banks" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                        <div className="text-center mb-10">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#236D96]/15 border border-[#236D96]/30 text-[#4FA3D1] font-semibold text-sm mb-4">
                                <Database className="w-4 h-4" />
                                بنوك المحوسب
                            </span>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-[#E2E8F0]">اختر البنك</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {BANKS.map((bank, i) => (
                                <motion.button
                                    key={bank.id}
                                    className="group bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-200 dark:border-[#334155]/70 hover:border-[#236D96]/50 p-6 text-center transition-all duration-300 hover:bg-[#236D96]/10 shadow-sm dark:shadow-none"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    whileHover={{ y: -4 }}
                                    onClick={() => setSelectedBank(bank)}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#236D96] to-[#8B5CF6] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-[#236D96]/20">
                                        <span className="text-white font-black text-lg">{bank.id}</span>
                                    </div>
                                    <p className="text-gray-900 dark:text-[#E2E8F0] font-bold mb-1">البنك {bank.id}</p>
                                    <p className="text-[#64748b] dark:text-[#94A3B8] text-sm">{bank.count} اختبار</p>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="tests" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                        <button onClick={() => setSelectedBank(null)} className="flex items-center gap-2 text-[#64748b] dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#E2E8F0] mb-8 text-sm font-medium transition-colors group">
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            العودة لاختيار البنك
                        </button>

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-[#E2E8F0] mb-2">البنك {selectedBank.id}</h2>
                            <p className="text-[#64748b] dark:text-[#94A3B8]">اختر رقم الاختبار</p>
                        </div>

                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3">
                            {Array.from({ length: selectedBank.count }, (_, i) => i + 1).map((num) => (
                                <motion.button
                                    key={num}
                                    className="aspect-square rounded-2xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/70 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 text-gray-900 dark:text-[#E2E8F0] font-bold text-sm transition-all duration-200 hover:scale-105 shadow-sm dark:shadow-none"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: num * 0.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onStart({ type: 'banks', bank: selectedBank.id, test: num })}
                                >
                                    {num}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}