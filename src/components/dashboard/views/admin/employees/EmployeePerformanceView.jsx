import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Clock, Users, BarChart3, LineChart as LineChartIcon } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceData = [
    { month: 'يناير', rating: 78, productivity: 75, studentSatisfaction: 82 },
    { month: 'فبراير', rating: 82, productivity: 78, studentSatisfaction: 85 },
    { month: 'مارس', rating: 85, productivity: 82, studentSatisfaction: 88 },
    { month: 'أبريل', rating: 88, productivity: 85, studentSatisfaction: 90 },
    { month: 'مايو', rating: 90, productivity: 88, studentSatisfaction: 92 },
];

const employeePerformance = [
    { name: 'خالد يوسف', rating: 90, courses: 8, students: 150, satisfaction: 92, attendance: 98 },
    { name: 'فاطمة الشهري', rating: 92, courses: 6, students: 120, satisfaction: 94, attendance: 99 },
    { name: 'محمد علي', rating: 78, courses: 0, students: 0, satisfaction: 85, attendance: 92 },
    { name: 'سارة محمود', rating: 88, courses: 3, students: 50, satisfaction: 90, attendance: 88 },
];

export default function EmployeePerformanceView() {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [timeRange, setTimeRange] = useState('month');

    const stats = [
        { label: 'متوسط التقييم', value: '87.2%', icon: Award, color: 'bg-yellow-100 text-yellow-600', subtle: 'من 100%' },
        { label: 'إجمالي الطلاب', value: '320', icon: Users, color: 'bg-blue-100 text-blue-600', subtle: 'طالب نشط' },
        { label: 'متوسط الحضور', value: '94.3%', icon: Clock, color: 'bg-green-100 text-green-600', subtle: 'هذا الشهر' },
        { label: 'رضا الطلاب', value: '91.5%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600', subtle: 'متوسط المنصة' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">مراقبة أداء الموظفين</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">تتبع أداء الموظفين والمقاييس الرئيسية والإنتاجية</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`${stat.color} rounded-xl p-3.5 border border-current/20`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-lg font-black">{stat.value}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 opacity-75">{stat.subtle}</p>
                                </div>
                                <Icon className="w-6 h-6 opacity-25" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">الفترة:</span>
                {['week', 'month', 'quarter', 'year'].map(tr => (
                    <button key={tr} onClick={() => setTimeRange(tr)} className={`text-xs px-3 py-1.5 rounded-lg transition-all ${timeRange === tr ? 'bg-[#6C4CF1] text-white' : 'bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
                        {tr === 'week' ? 'أسبوع' : tr === 'month' ? 'شهر' : tr === 'quarter' ? 'ربع سنة' : 'سنة'}
                    </button>
                ))}
            </div>

            {/* Overall Performance Chart */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <LineChartIcon className="w-5 h-5 text-[#6C4CF1]" />
                    <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9]">نسبة الأداء الشهرية</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }} />
                        <Legend />
                        <Line type="monotone" dataKey="rating" stroke="#6C4CF1" strokeWidth={2} name="تقييم الأداء" dot={{ fill: '#6C4CF1', r: 4 }} />
                        <Line type="monotone" dataKey="productivity" stroke="#00C2A8" strokeWidth={2} name="الإنتاجية" dot={{ fill: '#00C2A8', r: 4 }} />
                        <Line type="monotone" dataKey="studentSatisfaction" stroke="#FFD166" strokeWidth={2} name="رضا الطلاب" dot={{ fill: '#FFD166', r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Employees Performance List */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-[#6C4CF1]" />
                    <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9]">أداء الموظفين</h3>
                </div>

                <div className="space-y-3">
                    {employeePerformance.map((emp, idx) => (
                        <motion.button
                            key={emp.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => setSelectedEmployee(selectedEmployee === emp.name ? null : emp.name)}
                            className={`w-full text-right p-4 rounded-xl border transition-all ${selectedEmployee === emp.name ? 'bg-[#6C4CF1]/5 border-[#6C4CF1]' : 'bg-gray-50 dark:bg-[#0F172A]/50 border-gray-200 dark:border-[#334155]/50 hover:border-[#6C4CF1]'}`}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C4CF1] to-[#00C2A8] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                            {emp.name.slice(0, 2)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{emp.name}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 flex-shrink-0">
                                    <div className="text-center">
                                        <div className="relative w-12 h-12">
                                            <svg className="w-12 h-12 transform -rotate-90">
                                                <circle cx="24" cy="24" r="20" className="fill-none stroke-gray-200 dark:stroke-[#334155]" strokeWidth="3" />
                                                <circle
                                                    cx="24" cy="24" r="20"
                                                    className="fill-none stroke-[#6C4CF1]"
                                                    strokeWidth="3"
                                                    strokeDasharray={`${(emp.rating / 100) * 125.6} 125.6`}
                                                />
                                            </svg>
                                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#6C4CF1]">{emp.rating}%</span>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-600 dark:text-gray-400 text-left">
                                        <p>👥 {emp.students} طالب</p>
                                        <p>⭐ {emp.satisfaction}%</p>
                                    </div>
                                </div>
                            </div>

                            {selectedEmployee === emp.name && (
                                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="mt-4 pt-4 border-t border-gray-200 dark:border-[#334155]">
                                    <div className="grid grid-cols-4 gap-2 text-sm">
                                        <div className="text-center">
                                            <p className="text-gray-600 dark:text-gray-400">الكورسات</p>
                                            <p className="font-bold text-[#6C4CF1] text-lg">{emp.courses}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-600 dark:text-gray-400">الحضور</p>
                                            <p className="font-bold text-green-600 text-lg">{emp.attendance}%</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-600 dark:text-gray-400">التقييم</p>
                                            <p className="font-bold text-yellow-600 text-lg">{emp.rating}%</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-600 dark:text-gray-400">الرضا</p>
                                            <p className="font-bold text-purple-600 text-lg">{emp.satisfaction}%</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Performance Comparison Chart */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-[#6C4CF1]" />
                    <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9]">مقارنة الأداء</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={employeePerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }} />
                        <Legend />
                        <Bar dataKey="rating" fill="#6C4CF1" name="التقييم %" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="satisfaction" fill="#00C2A8" name="الرضا %" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="attendance" fill="#FFD166" name="الحضور %" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
}
