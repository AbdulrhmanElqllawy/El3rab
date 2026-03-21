import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Mail, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import StatCard from '../../../StatCard';

const monthlyReports = [
    { month: 'يناير', users: 120, exams: 456, revenue: 4200, engagement: 68 },
    { month: 'فبراير', users: 180, exams: 523, revenue: 5100, engagement: 72 },
    { month: 'مارس', users: 240, exams: 687, revenue: 6800, engagement: 78 },
    { month: 'أبريل', users: 200, exams: 612, revenue: 5900, engagement: 75 },
    { month: 'مايو', users: 320, exams: 845, revenue: 8200, engagement: 82 },
    { month: 'يونيو', users: 410, exams: 967, revenue: 9400, engagement: 85 },
];

const reportArchive = [
    { id: 1, month: 'يونيو 2024', date: '2024-06-30', status: 'مُنشور', sections: 8, downloads: 124 },
    { id: 2, month: 'مايو 2024', date: '2024-05-31', status: 'مُنشور', sections: 8, downloads: 98 },
    { id: 3, month: 'أبريل 2024', date: '2024-04-30', status: 'مُنشور', sections: 8, downloads: 87 },
    { id: 4, month: 'مارس 2024', date: '2024-03-31', status: 'مُنشور', sections: 8, downloads: 156 },
    { id: 5, month: 'فبراير 2024', date: '2024-02-29', status: 'مُنشور', sections: 8, downloads: 112 },
];

const reportSections = [
    { id: 1, name: 'ملخص تنفيذي', icon: 'ℹ️', status: 'جاهز' },
    { id: 2, name: 'إحصائيات المستخدمين', icon: '👥', status: 'جاهز' },
    { id: 3, name: 'تحليل الاختبارات', icon: '📝', status: 'جاهز' },
    { id: 4, name: 'أداء الكورسات', icon: '📚', status: 'جاهز' },
    { id: 5, name: 'المالية والإيرادات', icon: '💰', status: 'جاهز' },
    { id: 6, name: 'المقاييس الرئيسية', icon: '📊', status: 'جاهز' },
    { id: 7, name: 'ملاحظات المشكلات', icon: '⚠️', status: 'جاهز' },
    { id: 8, name: 'التوصيات', icon: '💡', status: 'جاهز' },
];

export default function ReportsView() {
    const [selectedFormat, setSelectedFormat] = useState('pdf');
    const [selectedSections, setSelectedSections] = useState(new Set(reportSections.map(s => s.id)));

    const toggleSection = (id) => {
        const newSections = new Set(selectedSections);
        if (newSections.has(id)) newSections.delete(id);
        else newSections.add(id);
        setSelectedSections(newSections);
    };

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">التقارير الشهرية</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إنشاء وتحميل وإدارة التقارير الشاملة</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label="تقارير مُنشورة" value="58" icon={FileText} color="#6C4CF1" change={12} changeLabel="هذا العام" index={0} />
                <StatCard label="التحميلات هذا الشهر" value="1.2K" icon={Download} color="#00C2A8" change={34} changeLabel="عن الشهر الماضي" index={1} />
                <StatCard label="المشتركين في الرسائل" value="342" icon={Mail} color="#FFD166" change={28} changeLabel="متزايد" index={2} />
                <StatCard label="متوسط أحجام التقارير" value="2.4MB" icon={BarChart3} color="#EF4444" change={-5} changeLabel="أقل من الماضي" index={3} />
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-4">
                {/* Report Creator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="lg:col-span-2 bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">إنشاء تقرير جديد</h3>
                    
                    <div className="space-y-5">
                        {/* Format Selection */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">صيغة التقرير</label>
                            <div className="flex gap-2">
                                {['pdf', 'excel', 'csv'].map(fmt => (
                                    <button
                                        key={fmt}
                                        onClick={() => setSelectedFormat(fmt)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            selectedFormat === fmt
                                                ? 'bg-[#6C4CF1] text-white shadow-sm'
                                                : 'bg-gray-100 dark:bg-[#334155] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#475569]'
                                        }`}
                                    >
                                        {fmt.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sections Selection */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">أقسام التقرير</label>
                            <div className="grid grid-cols-2 gap-2">
                                {reportSections.map(section => (
                                    <label key={section.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-[#0F172A] cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1E293B] transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={selectedSections.has(section.id)}
                                            onChange={() => toggleSection(section.id)}
                                            className="accent-[#6C4CF1] rounded"
                                        />
                                        <span className="text-xs">{section.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-[#334155]/50">
                            <button className="flex-1 bg-[#6C4CF1] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" />
                                تحميل التقرير
                            </button>
                            <button className="flex-1 bg-[#00C2A8] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#00b096] transition-colors flex items-center justify-center gap-2">
                                <Mail className="w-4 h-4" />
                                إرسال عبر البريد
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">إحصائيات هذا الشهر</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-[#6C4CF1]/10 rounded-lg">
                            <p className="text-xs text-gray-600 dark:text-gray-400">طلاب جدد</p>
                            <p className="text-lg font-bold text-[#6C4CF1]">+410</p>
                        </div>
                        <div className="p-3 bg-[#00C2A8]/10 rounded-lg">
                            <p className="text-xs text-gray-600 dark:text-gray-400">اختبارات</p>
                            <p className="text-lg font-bold text-[#00C2A8]">967</p>
                        </div>
                        <div className="p-3 bg-[#FFD166]/10 rounded-lg">
                            <p className="text-xs text-gray-600 dark:text-gray-400">الإيرادات</p>
                            <p className="text-lg font-bold text-[#FFD166]">$9.4K</p>
                        </div>
                        <div className="p-3 bg-[#EF4444]/10 rounded-lg">
                            <p className="text-xs text-gray-600 dark:text-gray-400">المشاركة</p>
                            <p className="text-lg font-bold text-[#EF4444]">85%</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-[#6C4CF1]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">النمو الشهري</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={monthlyReports}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="month" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Line type="monotone" dataKey="users" stroke="#6C4CF1" strokeWidth={2.5} dot={{ fill: '#6C4CF1', r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-5 h-5 text-[#00C2A8]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">الإيرادات الشهرية</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={monthlyReports}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="month" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Bar dataKey="revenue" fill="#00C2A8" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Report Archive */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
            >
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">أرشيف التقارير</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-[#334155]/50">
                                <th className="text-right py-3 px-2 text-gray-700 dark:text-gray-300 font-semibold">الشهر</th>
                                <th className="text-right py-3 px-2 text-gray-700 dark:text-gray-300 font-semibold">التاريخ</th>
                                <th className="text-right py-3 px-2 text-gray-700 dark:text-gray-300 font-semibold">الحالة</th>
                                <th className="text-right py-3 px-2 text-gray-700 dark:text-gray-300 font-semibold">الأقسام</th>
                                <th className="text-right py-3 px-2 text-gray-700 dark:text-gray-300 font-semibold">التحميلات</th>
                                <th className="text-right py-3 px-2 text-gray-700 dark:text-gray-300 font-semibold">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportArchive.map(report => (
                                <tr key={report.id} className="border-b border-gray-100 dark:border-[#334155]/30 hover:bg-gray-50 dark:hover:bg-[#0F172A]/50 transition-colors">
                                    <td className="py-3 px-2">{report.month}</td>
                                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{report.date}</td>
                                    <td className="py-3 px-2">
                                        <span className="px-2 py-1 bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2">{report.sections}</td>
                                    <td className="py-3 px-2">{report.downloads}</td>
                                    <td className="py-3 px-2">
                                        <button className="text-[#6C4CF1] hover:text-[#5b3ee0] font-semibold text-xs">تحميل</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
