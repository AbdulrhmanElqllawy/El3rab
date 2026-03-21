import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Target, Flame, Play, TrendingUp, Clock, Award, CheckCircle2 } from 'lucide-react';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import StatCard from '../StatCard';
import { useDashboard } from '../DashboardContext';

const radarData = [
    { subject: 'التناظر اللفظي', A: 72 },
    { subject: 'إكمال الجمل',    A: 85 },
    { subject: 'الخطأ السياقي',  A: 61 },
    { subject: 'استيعاب المقروء', A: 78 },
    { subject: 'المفردة الشاذة', A: 90 },
];

const weeklyData = [
    { day: 'السبت',   score: 65 },
    { day: 'الأحد',   score: 72 },
    { day: 'الاثنين', score: 68 },
    { day: 'الثلاثاء', score: 80 },
    { day: 'الأربعاء', score: 75 },
    { day: 'الخميس',  score: 88 },
    { day: 'الجمعة',  score: 82 },
];

const recentTests = [
    { name: 'اختبار التناظر اللفظي', score: 18, total: 20, date: 'منذ يومين',  color: '#6C4CF1' },
    { name: 'اختبار إكمال الجمل',    score: 15, total: 20, date: 'منذ 3 أيام', color: '#00C2A8' },
    { name: 'اختبار الخطأ السياقي',  score: 12, total: 20, date: 'منذ أسبوع',  color: '#FFD166' },
];

const streakDays = [true, true, true, false, true, true, false];
const dayLabels = ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'];

export default function StudentDashboard() {
    const { user } = useDashboard();

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-l from-[#6C4CF1] to-[#00C2A8] rounded-2xl p-5 text-white relative overflow-hidden"
            >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-white/70 text-sm mb-1">أهلاً بعودتك 👋</p>
                        <h2 className="text-xl font-black">{user?.name}</h2>
                        <p className="text-white/80 text-sm mt-1">استمر في التقدم، أنت على الطريق الصحيح!</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="bg-white text-[#6C4CF1] font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg flex-shrink-0"
                    >
                        <Play className="w-4 h-4 fill-[#6C4CF1]" />
                        ابدأ اختبار جديد
                    </motion.button>
                </div>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <StatCard label="الاختبارات المكتملة" value="47"  icon={CheckCircle2} color="#6C4CF1" change={12}  changeLabel="هذا الشهر" index={0} />
                <StatCard label="متوسط الدرجات"       value="79%" icon={Target}       color="#00C2A8" change={5}   changeLabel="عن الشهر الماضي" index={1} />
                <StatCard label="ساعات الدراسة"       value="38"  icon={Clock}        color="#FFD166" change={8}   changeLabel="هذا الأسبوع" index={2} />
                <StatCard label="الإنجازات" value="12" icon={Award} color="#EF4444" changeLabel="إنجاز جديد!" index={3} change={undefined} />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Radar Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-5 h-5 text-[#6C4CF1]" />
                        <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9] text-sm">الأداء حسب القسم</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="#334155" strokeOpacity={0.3} />
                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                            <Radar name="الأداء" dataKey="A" stroke="#6C4CF1" fill="#6C4CF1" fillOpacity={0.25} strokeWidth={2} />
                        </RadarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Area Chart */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-[#00C2A8]" />
                        <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9] text-sm">الأداء الأسبوعي</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={weeklyData}>
                            <defs>
                                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00C2A8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00C2A8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.2} />
                            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 8, color: '#F1F5F9', fontSize: 12 }} />
                            <Area type="monotone" dataKey="score" stroke="#00C2A8" strokeWidth={2.5} fill="url(#perfGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Recent Tests */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none"
                >
                    <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9] text-sm mb-4">آخر الاختبارات</h3>
                    <div className="space-y-3">
                        {recentTests.map((t, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#0F172A]/50">
                                <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: t.color }} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-[#F1F5F9] truncate">{t.name}</p>
                                    <p className="text-xs text-gray-400">{t.date}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="font-black text-base" style={{ color: t.color }}>{t.score}/{t.total}</p>
                                    <p className="text-xs text-gray-400">{Math.round(t.score / t.total * 100)}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Streak */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl p-5 border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                        <h3 className="font-bold text-gray-900 dark:text-[#F1F5F9] text-sm">سلسلة المذاكرة الأسبوعية</h3>
                    </div>
                    <div className="flex justify-between mb-6">
                        {streakDays.map((done, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${done ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-md shadow-orange-500/20' : 'bg-gray-100 dark:bg-[#0F172A]/60 text-gray-400'}`}>
                                    {done ? <Flame className="w-4 h-4" /> : dayLabels[i]}
                                </div>
                                <span className="text-xs text-gray-400">{dayLabels[i]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gradient-to-l from-orange-50 dark:from-orange-500/10 to-red-50 dark:to-red-500/10 rounded-xl p-4 border border-orange-100 dark:border-orange-500/20">
                        <p className="text-center text-gray-700 dark:text-gray-300 text-sm font-medium">🔥 5 أيام متواصلة — رائع!</p>
                        <p className="text-center text-xs text-gray-400 mt-1">داوم على المذاكرة للحفاظ على سلسلتك</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}