import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, Server, AlertTriangle } from 'lucide-react';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';
import StatCard from '../../../StatCard';

const systemPerf = [
    { time: '12:00 AM', cpu: 32, memory: 45, requests: 1200 },
    { time: '4:00 AM', cpu: 28, memory: 38, requests: 890 },
    { time: '8:00 AM', cpu: 56, memory: 62, requests: 3450 },
    { time: '12:00 PM', cpu: 78, memory: 81, requests: 5600 },
    { time: '4:00 PM', cpu: 65, memory: 72, requests: 4200 },
    { time: '8:00 PM', cpu: 72, memory: 76, requests: 4800 },
    { time: '12:00 AM', cpu: 45, memory: 52, requests: 2300 },
];

const responseTime = [
    { endpoint: 'تسجيل الدخول', avg: 145, p95: 280, p99: 450 },
    { endpoint: 'جلب الاختبارات', avg: 320, p95: 680, p99: 950 },
    { endpoint: 'حفظ النتيجة', avg: 210, p95: 420, p99: 680 },
    { endpoint: 'تحميل الدورات', avg: 380, p95: 750, p99: 1200 },
];

const errorRates = [
    { day: 'السبت', errors: 12, warnings: 45, critical: 2 },
    { day: 'الأحد', errors: 8, warnings: 32, critical: 0 },
    { day: 'الاثنين', errors: 15, warnings: 58, critical: 1 },
    { day: 'الثلاثاء', errors: 6, warnings: 28, critical: 0 },
    { day: 'الأربعاء', errors: 9, warnings: 35, critical: 0 },
    { day: 'الخميس', errors: 20, warnings: 72, critical: 2 },
    { day: 'الجمعة', errors: 11, warnings: 42, critical: 1 },
];

const uptime = [
    { month: 'يناير', uptime: 99.98 },
    { month: 'فبراير', uptime: 99.95 },
    { month: 'مارس', uptime: 99.99 },
    { month: 'أبريل', uptime: 99.92 },
    { month: 'مايو', uptime: 99.97 },
    { month: 'يونيو', uptime: 99.99 },
];

export default function PerformanceAnalyticsView() {
    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">تحليلات الأداء</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">مراقبة صحة وأداء النظام</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard label="استخدام المعالج" value="65%" icon={Zap} color="#6C4CF1" change={-5} changeLabel="معدل آمن" index={0} />
                <StatCard label="استخدام الذاكرة" value="72%" icon={Server} color="#00C2A8" change={3} changeLabel="عن الساعة الماضية" index={1} />
                <StatCard label="وقت الاستجابة" value="285ms" icon={Gauge} color="#FFD166" change={-12} changeLabel="أفضل من الأمس" index={2} />
                <StatCard label="معدل الأخطاء" value="0.2%" icon={AlertTriangle} color="#EF4444" change={-1} changeLabel="منخفض" index={3} />
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* System Resources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Server className="w-5 h-5 text-[#6C4CF1]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">موارد النظام (24 ساعة أخيرة)</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={systemPerf}>
                            <defs>
                                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6C4CF1" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#6C4CF1" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00C2A8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#00C2A8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="time" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Legend />
                            <Area type="monotone" dataKey="cpu" stroke="#6C4CF1" fillOpacity={1} fill="url(#colorCpu)" />
                            <Area type="monotone" dataKey="memory" stroke="#00C2A8" fillOpacity={1} fill="url(#colorMemory)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Requests Per Hour */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-[#FFD166]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">الطلبات في الساعة</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={systemPerf}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="time" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Bar dataKey="requests" fill="#FFD166" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Error Rates */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">معدلات الأخطاء اليومية</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={errorRates}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="day" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Legend />
                            <Bar dataKey="errors" fill="#EF4444" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="warnings" fill="#FFD166" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="critical" fill="#6C4CF1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Uptime */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Gauge className="w-5 h-5 text-[#00C2A8]" />
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">توفر الخدمة الشهري</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={uptime}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="month" stroke="#94A3B8" />
                            <YAxis stroke="#94A3B8" domain={[99.8, 100]} />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            <Line type="monotone" dataKey="uptime" stroke="#00C2A8" strokeWidth={2.5} dot={{ fill: '#00C2A8', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
}
