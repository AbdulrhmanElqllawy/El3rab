import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, LogIn, LogOut, FileEdit, UserCheck, Shield, Clock, ChevronDown } from 'lucide-react';

const ACTIVITY_TYPES = {
    login: { label: 'تسجيل دخول', icon: LogIn, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-500/10' },
    logout: { label: 'تسجيل خروج', icon: LogOut, color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-500/10' },
    edit: { label: 'تعديل ملف', icon: FileEdit, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/10' },
    verify: { label: 'تحقق البريد', icon: UserCheck, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-500/10' },
    permission: { label: 'تغيير صلاحيات', icon: Shield, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-500/10' },
};

const mockActivities = [
    { id: 1, user: 'أحمد محمد', email: 'ahmed@example.com', action: 'login', timestamp: '2024-05-20 14:32:10', ip: '192.168.1.1', device: 'Chrome - Windows', details: 'تسجيل دخول ناجح' },
    { id: 2, user: 'سارة علي', email: 'sara@example.com', action: 'edit', timestamp: '2024-05-20 13:45:30', ip: '192.168.1.5', device: 'Safari - iPhone', details: 'تعديل بيانات ملف شخصي' },
    { id: 3, user: 'خالد يوسف', email: 'khalid@example.com', action: 'verify', timestamp: '2024-05-20 12:20:15', ip: '192.168.1.8', device: 'Firefox - MacOS', details: 'تحقق من البريد الإلكتروني' },
    { id: 4, user: 'نورة الحربي', email: 'noura@example.com', action: 'permission', timestamp: '2024-05-20 11:10:45', ip: '192.168.1.3', device: 'Chrome - Linux', details: 'تغيير الصلاحيات بواسطة المدير' },
    { id: 5, user: 'فيصل العتيبي', email: 'faisal@example.com', action: 'logout', timestamp: '2024-05-20 10:05:20', ip: '192.168.1.2', device: 'Chrome - Windows', details: 'تسجيل خروج' },
    { id: 6, user: 'أحمد محمد', email: 'ahmed@example.com', action: 'login', timestamp: '2024-05-20 09:15:00', ip: '192.168.1.1', device: 'Chrome - Windows', details: 'تسجيل دخول ناجح' },
];

export default function UserActivityLogView() {
    const [search, setSearch] = useState('');
    const [activityFilter, setActivityFilter] = useState('all');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [expandedActivity, setExpandedActivity] = useState(null);

    const filtered = mockActivities.filter(a => {
        const matchesSearch = a.user.includes(search) || a.email.includes(search) || a.details.includes(search);
        const matchesActivity = activityFilter === 'all' || a.action === activityFilter;
        return matchesSearch && matchesActivity;
    });

    const stats = [
        { label: 'إجمالي الأنشطة', value: mockActivities.length, icon: '📊', color: 'bg-[#6C4CF1]/10 text-[#6C4CF1]' },
        { label: 'تسجيلات الدخول', value: mockActivities.filter(a => a.action === 'login').length, icon: '📈', color: 'bg-green-100 text-green-600' },
        { label: 'التعديلات', value: mockActivities.filter(a => a.action === 'edit').length, icon: '✏️', color: 'bg-blue-100 text-blue-600' },
        { label: 'الأنشطة الإدارية', value: mockActivities.filter(a => a.action === 'permission').length, icon: '🔐', color: 'bg-yellow-100 text-yellow-600' },
    ];

    const getActivityTypeInfo = (action) => ACTIVITY_TYPES[action] || ACTIVITY_TYPES.login;

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">سجل أنشطة المستخدمين</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">تتبع جميع أنشطة المستخدمين والتعديلات والدخول والخروج</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((stat) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`${stat.color} rounded-xl p-3.5 border border-current/20`}>
                        <p className="text-xl font-black">{stat.value}</p>
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
                        placeholder="ابحث بالاسم أو البريد أو التفاصيل..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        dir="rtl"
                    />
                </div>

                {/* Activity Type Filter */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Filter className="w-4 h-4" />
                        نوع النشاط:
                    </span>
                    <button
                        onClick={() => setActivityFilter('all')}
                        className={`text-xs px-3 py-1.5 rounded-lg transition-all ${activityFilter === 'all' ? 'bg-[#6C4CF1] text-white' : 'bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}
                    >
                        الكل
                    </button>
                    {Object.entries(ACTIVITY_TYPES).map(([key, type]) => (
                        <button
                            key={key}
                            onClick={() => setActivityFilter(key)}
                            className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${activityFilter === key ? 'bg-[#6C4CF1] text-white' : 'bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}
                        >
                            <type.icon className="w-3 h-3" />
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Activity Timeline */}
            <div className="space-y-2">
                {filtered.map((activity, idx) => {
                    const info = getActivityTypeInfo(activity.action);
                    const IconComp = info.icon;

                    return (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => setExpandedActivity(expandedActivity === activity.id ? null : activity.id)}
                                className="w-full p-4 hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors text-left"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={`w-10 h-10 rounded-lg ${info.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                        <IconComp className={`w-5 h-5 ${info.color}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <h4 className="font-bold text-gray-800 dark:text-[#F1F5F9]">{activity.user}</h4>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#334155] text-gray-600 dark:text-gray-300">{activity.email}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{activity.details}</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {activity.timestamp}
                                            </span>
                                            <span className="text-gray-400 dark:text-gray-600">•</span>
                                            <span>{activity.ip}</span>
                                            <span className="text-gray-400 dark:text-gray-600">•</span>
                                            <span>{activity.device}</span>
                                        </div>
                                    </div>

                                    {/* Expand Button */}
                                    <motion.div
                                        animate={{ rotate: expandedActivity === activity.id ? 180 : 0 }}
                                        className="flex-shrink-0"
                                    >
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </motion.div>
                                </div>
                            </button>

                            {/* Expanded Details */}
                            {expandedActivity === activity.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="border-t border-gray-100 dark:border-[#334155]/50 p-4 bg-gray-50 dark:bg-[#0F172A]/50"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">تفاصيل النشاط</p>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm p-2 bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]">
                                                    <span className="text-gray-600 dark:text-gray-400">الإجراء:</span>
                                                    <span className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{info.label}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm p-2 bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]">
                                                    <span className="text-gray-600 dark:text-gray-400">الوقت:</span>
                                                    <span className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{activity.timestamp}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">معلومات الجهاز</p>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm p-2 bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]">
                                                    <span className="text-gray-600 dark:text-gray-400">IP:</span>
                                                    <span className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{activity.ip}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm p-2 bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]">
                                                    <span className="text-gray-600 dark:text-gray-400">الجهاز:</span>
                                                    <span className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{activity.device}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#334155]">
                                        <button className="text-sm text-[#6C4CF1] hover:underline font-semibold">
                                            تصدير التقرير
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">لا توجد أنشطة مطابقة للمعايير المحددة</p>
                </div>
            )}
        </div>
    );
}
