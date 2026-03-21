import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, BookOpen, HelpCircle, Activity, TrendingUp, 
    BarChart3, Calendar, Award
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import EnhancedStatCard, { StatCardGroup } from '../components/EnhancedStatCard';
import PageHeader from '../components/PageHeader';
import EnhancedDataTable from '../components/EnhancedDataTable';
import EmptyState from '../components/EnhancedEmptyState';

const CHART_DATA = {
    monthly: [
        { month: 'يناير', users: 120, exams: 85, courses: 12 },
        { month: 'فبراير', users: 180, exams: 120, courses: 15 },
        { month: 'مارس', users: 240, exams: 165, courses: 18 },
        { month: 'أبريل', users: 200, exams: 145, courses: 16 },
        { month: 'مايو', users: 320, exams: 210, courses: 22 },
        { month: 'يونيو', users: 410, exams: 285, courses: 25 },
    ],
    sections: [
        { name: 'التناظر اللفظي', avg: 72, completed: 450 },
        { name: 'إكمال الجمل', avg: 81, completed: 520 },
        { name: 'الخطأ السياقي', avg: 65, completed: 380 },
        { name: 'استيعاب المقروء', avg: 74, completed: 410 },
        { name: 'المفردة الشاذة', avg: 88, completed: 600 },
    ],
    users: [
        { type: 'طلاب', value: 850, color: '#6C4CF1' },
        { type: 'موظفون', value: 12, color: '#00C2A8' },
        { type: 'مديرون', value: 3, color: '#FFD166' },
    ],
};

const SAMPLE_USERS = [
    {
        id: 1,
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        role: 'طالب',
        tests: 42,
        avgScore: '78%',
        status: 'نشط',
        joinDate: '2024-01-15',
    },
    {
        id: 2,
        name: 'سارة علي',
        email: 'sara@example.com',
        role: 'طالبة',
        tests: 18,
        avgScore: '91%',
        status: 'نشط',
        joinDate: '2024-02-20',
    },
    {
        id: 3,
        name: 'خالد يوسف',
        email: 'khalid@example.com',
        role: 'معلم',
        tests: 5,
        avgScore: '85%',
        status: 'نشط',
        joinDate: '2024-01-01',
    },
];

const TABLE_COLUMNS = [
    { key: 'name', label: 'الاسم', sortable: true },
    { key: 'email', label: 'البريد الإلكتروني', sortable: true },
    { key: 'role', label: 'الدور', sortable: true },
    { key: 'tests', label: 'الاختبارات', sortable: true },
    {
        key: 'avgScore',
        label: 'متوسط الأداء',
        sortable: true,
        render: (value) => (
            <span className={value.includes('9') ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                {value}
            </span>
        ),
    },
    {
        key: 'status',
        label: 'الحالة',
        render: (value) => (
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400">
                {value}
            </span>
        ),
    },
];

/**
 * Enhanced Admin Dashboard
 * Shows SaaS-grade polish with:
 * - Professional layout
 * - Interactive charts
 * - Data tables with sorting
 * - Empty states
 * - Loading skeletons
 * - Smooth animations
 */
export default function EnhancedAdminDashboard() {
    const [loading, setLoading] = useState(false);

    const statCardData = [
        {
            id: 1,
            label: 'إجمالي المستخدمين',
            value: 865,
            icon: Users,
            color: 'purple',
            comparison: { value: '+68', direction: 'up' },
            format: 'number',
        },
        {
            id: 2,
            label: 'الاختبارات هذا الشهر',
            value: 4200,
            icon: Activity,
            color: 'teal',
            comparison: { value: '+22%', direction: 'up' },
            format: 'number',
        },
        {
            id: 3,
            label: 'الدورات النشطة',
            value: 9,
            icon: BookOpen,
            color: 'amber',
            comparison: { value: 'لا تغيير', direction: 'neutral' },
            format: 'number',
        },
        {
            id: 4,
            label: 'إجمالي الأسئلة',
            value: 1800,
            icon: HelpCircle,
            color: 'red',
            comparison: { value: '+8%', direction: 'up' },
            format: 'number',
        },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-8" dir="rtl">
            {/* Header */}
            <PageHeader
                title="لوحة التحكم"
                description="عرض شامل لأداء النظام والإحصائيات الرئيسية"
                breadcrumbs={['الرئيسية']}
            />

            {/* Main Statistics */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    الإحصائيات الرئيسية
                </h2>
                <StatCardGroup stats={statCardData} loading={loading} columns={4} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Growth Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]/50 p-6"
                >
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                        نمو المستخدمين
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={CHART_DATA.monthly}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1E293B',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                }}
                                labelStyle={{ color: '#FFF' }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="#6C4CF1"
                                strokeWidth={2}
                                dot={{ fill: '#6C4CF1' }}
                                name="المستخدمون"
                            />
                            <Line
                                type="monotone"
                                dataKey="exams"
                                stroke="#00C2A8"
                                strokeWidth={2}
                                dot={{ fill: '#00C2A8' }}
                                name="الاختبارات"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* User Distribution - Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]/50 p-6"
                >
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                        توزيع المستخدمين
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={CHART_DATA.users}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ type, value }) => `${type}: ${value}`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {CHART_DATA.users.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Performance by Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]/50 p-6"
            >
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                    الأداء حسب القسم
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={CHART_DATA.sections}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avg" fill="#6C4CF1" name="متوسط الأداء" />
                        <Bar dataKey="completed" fill="#00C2A8" name="المكتملة" />
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Recent Users Table */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-[#1E293B] rounded-lg border border-gray-200 dark:border-[#334155]/50 p-6"
            >
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                    أحدث المستخدمين
                </h3>
                <EnhancedDataTable
                    columns={TABLE_COLUMNS}
                    data={SAMPLE_USERS}
                    loading={loading}
                    searchPlaceholder="ابحث عن مستخدم..."
                />
            </motion.div>
        </div>
    );
}
