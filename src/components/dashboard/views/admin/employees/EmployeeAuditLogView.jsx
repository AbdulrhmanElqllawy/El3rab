import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, FileEdit, User, AlertCircle, ChevronDown } from 'lucide-react';

const mockAuditLog = [
    { id: 1, employee: 'خالد يوسف', fieldChanged: 'الراتب', oldValue: '3200', newValue: '3500', changedBy: 'محمد علي', timestamp: '2024-05-20 14:32:10', reason: 'زيادة سنوية' },
    { id: 2, employee: 'فاطمة الشهري', fieldChanged: 'القسم', oldValue: 'تدريس', newValue: 'إدارة', changedBy: 'علي الحمادي', timestamp: '2024-05-19 10:15:30', reason: 'ترقية وظيفية' },
    { id: 3, employee: 'محمد علي', fieldChanged: 'نوع التوظيف', oldValue: 'دوام كامل', newValue: 'عقد مؤقت', changedBy: 'سارة محمود', timestamp: '2024-05-18 09:45:00', reason: 'تحديث العقد' },
    { id: 4, employee: 'سارة محمود', fieldChanged: 'الحالة', oldValue: 'نشط', newValue: 'إجازة', changedBy: 'محمد علي', timestamp: '2024-05-17 16:20:45', reason: 'إجازة مرضية' },
    { id: 5, employee: 'خالد يوسف', fieldChanged: 'الصلاحيات', oldValue: 'معلم', newValue: 'مدير محدود', changedBy: 'علي الحمادي', timestamp: '2024-05-16 11:00:20', reason: 'إعادة توزيع المسؤوليات' },
];

export default function EmployeeAuditLogView() {
    const [search, setSearch] = useState('');
    const [expandedLog, setExpandedLog] = useState(null);
    const [fieldFilter, setFieldFilter] = useState('all');

    const filtered = mockAuditLog.filter(log => {
        const matchesSearch = log.employee.includes(search) || log.changedBy.includes(search) || log.fieldChanged.includes(search);
        const matchesField = fieldFilter === 'all' || log.fieldChanged === fieldFilter;
        return matchesSearch && matchesField;
    });

    const uniqueFields = [...new Set(mockAuditLog.map(log => log.fieldChanged))];

    const stats = [
        { label: 'إجمالي التعديلات', value: mockAuditLog.length, icon: '📊', color: 'bg-[#6C4CF1]/10 text-[#6C4CF1]' },
        { label: 'تعديلات اليوم', value: mockAuditLog.filter(l => l.timestamp.includes('2024-05-20')).length, icon: '📅', color: 'bg-blue-100 text-blue-600' },
        { label: 'الموظفون المتأثرون', value: new Set(mockAuditLog.map(l => l.employee)).size, icon: '👥', color: 'bg-green-100 text-green-600' },
        { label: 'المديرون', value: new Set(mockAuditLog.map(l => l.changedBy)).size, icon: '👨‍💼', color: 'bg-yellow-100 text-yellow-600' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">سجل تعديلات الموظفين</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">تتبع جميع التعديلات على بيانات وملفات الموظفين والتغييرات المسجلة</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((stat) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`${stat.color} rounded-xl p-3.5 border border-current/20`}>
                        <p className="text-lg font-black">{stat.value}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="space-y-3">
                {/* Search */}
                <div className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 rounded-xl px-4 py-2.5 shadow-sm">
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                        className="flex-1 bg-transparent text-sm text-gray-700 dark:text-[#F1F5F9] outline-none placeholder:text-gray-400"
                        placeholder="ابحث بالموظف أو المحرر..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        dir="rtl"
                    />
                </div>

                {/* Field Filter */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Filter className="w-4 h-4" />
                        نوع التعديل:
                    </span>
                    <button
                        onClick={() => setFieldFilter('all')}
                        className={`text-xs px-3 py-1.5 rounded-lg transition-all ${fieldFilter === 'all' ? 'bg-[#6C4CF1] text-white' : 'bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}
                    >
                        الكل
                    </button>
                    {uniqueFields.map(field => (
                        <button
                            key={field}
                            onClick={() => setFieldFilter(field)}
                            className={`text-xs px-3 py-1.5 rounded-lg transition-all ${fieldFilter === field ? 'bg-[#6C4CF1] text-white' : 'bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}
                        >
                            {field}
                        </button>
                    ))}
                </div>
            </div>

            {/* Audit Log Timeline */}
            <div className="space-y-2">
                {filtered.map((log, idx) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <button
                            onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                            className="w-full p-4 hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors text-left"
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <FileEdit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h4 className="font-bold text-gray-800 dark:text-[#F1F5F9]">{log.employee}</h4>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#334155] text-gray-600 dark:text-gray-300">
                                            {log.fieldChanged}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">تم التعديل من قبل: {log.changedBy}</p>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {log.timestamp}
                                        </span>
                                        <span className="text-gray-400 dark:text-gray-600">•</span>
                                        <span className="flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {log.reason}
                                        </span>
                                    </div>
                                </div>

                                {/* Expand Button */}
                                <motion.div
                                    animate={{ rotate: expandedLog === log.id ? 180 : 0 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </motion.div>
                            </div>
                        </button>

                        {/* Expanded Details */}
                        {expandedLog === log.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="border-t border-gray-100 dark:border-[#334155]/50 p-4 bg-gray-50 dark:bg-[#0F172A]/50 space-y-3"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Change Details */}
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">تفاصيل التعديل</p>
                                        <div className="space-y-2">
                                            <div className="flex items-start justify-between text-sm p-2 bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]">
                                                <span className="text-gray-600 dark:text-gray-400">الحقل:</span>
                                                <span className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{log.fieldChanged}</span>
                                            </div>
                                            <div className="flex items-start justify-between text-sm p-2 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-200 dark:border-red-500/20">
                                                <span className="text-red-600 dark:text-red-400">القيمة السابقة:</span>
                                                <span className="font-semibold text-red-700 dark:text-red-300">{log.oldValue}</span>
                                            </div>
                                            <div className="flex items-start justify-between text-sm p-2 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-200 dark:border-green-500/20">
                                                <span className="text-green-600 dark:text-green-400">القيمة الجديدة:</span>
                                                <span className="font-semibold text-green-700 dark:text-green-300">{log.newValue}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Change Metadata */}
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">معلومات التعديل</p>
                                        <div className="space-y-2">
                                            <div className="flex items-start justify-between text-sm p-2 bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]">
                                                <span className="text-gray-600 dark:text-gray-400">بواسطة:</span>
                                                <span className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{log.changedBy}</span>
                                            </div>
                                            <div className="flex items-start justify-between text-sm p-2 bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]">
                                                <span className="text-gray-600 dark:text-gray-400">الوقت:</span>
                                                <span className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{log.timestamp}</span>
                                            </div>
                                            <div className="flex items-start justify-between text-sm p-2 bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]">
                                                <span className="text-gray-600 dark:text-gray-400">السبب:</span>
                                                <span className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{log.reason}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-3 flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">معلومات إضافية</p>
                                        <p className="text-xs text-blue-600 dark:text-blue-400">يمكن استخدام هذا السجل للتدقيق والمحاسبة والكشف عن التغييرات غير المصرح بها</p>
                                    </div>
                                </div>

                                {/* Export Option */}
                                <button className="text-sm text-[#6C4CF1] hover:underline font-semibold">
                                    تصدير التقرير
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">لا توجد تعديلات مطابقة للمعايير المحددة</p>
                </div>
            )}
        </div>
    );
}
