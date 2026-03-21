import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Check, AlertCircle } from 'lucide-react';

export default function ImportQuestionsView() {
    const [file, setFile] = useState(null);
    const [importing, setImporting] = useState(false);
    const [results, setResults] = useState(null);

    const handleImport = () => {
        setImporting(true);
        setTimeout(() => {
            setImporting(false);
            setResults({
                success: 45,
                failed: 3,
                duplicates: 2,
                total: 50
            });
        }, 2000);
    };

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">استيراد الأسئلة</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">استيراد أسئلة من ملف Excel أو CSV</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6 space-y-5"
            >
                <div className="border-2 border-dashed border-gray-300 dark:border-[#334155]/50 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">اسحب الملف هنا أو انقر للاختيار</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">يدعم: Excel (.xlsx, .xls) أو CSV</p>
                    <input type="file" accept=".xlsx,.xls,.csv" onChange={(e) => setFile(e.target.files?.[0])} className="hidden" />
                </div>

                {file && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-500/20">
                        <p className="text-sm text-blue-700 dark:text-blue-400">✓ تم اختيار الملف: <strong>{file.name}</strong></p>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">القسم الافتراضي</label>
                        <select className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none">
                            <option value="">لا تعيين</option>
                            <option value="المفردة الشاذة">المفردة الشاذة</option>
                            <option value="التناظر اللفظي">التناظر اللفظي</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 block">مستوى الصعوبة</label>
                        <select className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm focus:border-[#6C4CF1] outline-none">
                            <option value="">لا تعيين</option>
                            <option value="سهل">سهل</option>
                            <option value="متوسط">متوسط</option>
                            <option value="صعب">صعب</option>
                        </select>
                    </div>
                </div>

                <button onClick={handleImport} disabled={!file || importing} className="w-full bg-[#6C4CF1] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#5b3ee0] disabled:bg-gray-400 transition-colors">
                    {importing ? 'جاري الاستيراد...' : 'استيراد الآن'}
                </button>

                {results && (
                    <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-[#334155]/50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
                                <p className="text-xs text-green-600 dark:text-green-400">مُستوردة</p>
                                <p className="text-lg font-bold text-green-700 dark:text-green-300">{results.success}</p>
                            </div>
                            <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-lg">
                                <p className="text-xs text-red-600 dark:text-red-400">أخطاء</p>
                                <p className="text-lg font-bold text-red-700 dark:text-red-300">{results.failed}</p>
                            </div>
                            <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
                                <p className="text-xs text-yellow-600 dark:text-yellow-400">مكررة</p>
                                <p className="text-lg font-bold text-yellow-700 dark:text-yellow-300">{results.duplicates}</p>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                                <p className="text-xs text-blue-600 dark:text-blue-400">المجموع</p>
                                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{results.total}</p>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
