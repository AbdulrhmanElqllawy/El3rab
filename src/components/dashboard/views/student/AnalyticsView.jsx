import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, TrendingUp, Activity, Target, Award } from 'lucide-react';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import PageHeader from '../../components/PageHeader';
import { StatCardGroup } from '../../components/EnhancedStatCard';
import { Card, CardHeader, CardBody } from '../../components/EnhancedCardComponents';

const weeklyData = [
    { day: 'السبت', score: 65 },
    { day: 'الأحد', score: 72 },
    { day: 'الاثنين', score: 68 },
    { day: 'الثلاثاء', score: 80 },
    { day: 'الأربعاء', score: 75 },
    { day: 'الخميس', score: 88 },
    { day: 'الجمعة', score: 82 },
];

const categoryData = [
    { name: 'التناظر', value: 78 },
    { name: 'إكمال الجمل', value: 85 },
    { name: 'الخطأ السياقي', value: 72 },
    { name: 'المقروء', value: 88 },
];

const COLORS = ['#6C4CF1', '#00C2A8', '#FFD166', '#FF5252'];

export default function StudentAnalyticsView() {
    const [loading] = useState(false);
    
    const stats = [
        { id: 1, label: 'المتوسط الكلي', value: 76, format: 'percentage', icon: Award, color: 'purple', comparison: { value: '+4%', direction: 'up' } },
        { id: 2, label: 'أفضل أداء', value: 88, icon: TrendingUp, color: 'teal', format: 'percentage' },
        { id: 3, label: 'الاختبارات المكتملة', value: 12, icon: Activity, color: 'amber' },
        { id: 4, label: 'ساعات الدراسة', value: 48, icon: Target, color: 'green', suffix: 'ساعة' },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-8" dir="rtl">
            <PageHeader
                title="التحليلات"
                description="تابع تقدمك الأكاديمي والإحصائيات التفصيلية"
                breadcrumbs={['الرئيسية', 'التحليلات']}
            />

            {/* Stats */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">الملخص</h2>
                <StatCardGroup stats={stats} columns={4} loading={loading} />
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card elevated>
                        <CardHeader title="الأداء الأسبوعي" icon={<LineChart className="w-5 h-5 text-[#6C4CF1]" />} />
                        <CardBody>
                            <ResponsiveContainer width="100%" height={300}>
                                <ReLineChart data={weeklyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis dataKey="day" stroke="#94A3B8" />
                                    <YAxis stroke="#94A3B8" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                    <Line type="monotone" dataKey="score" stroke="#6C4CF1" strokeWidth={2} dot={{ fill: '#6C4CF1' }} />
                                </ReLineChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card elevated>
                        <CardHeader title="الأداء حسب الفئة" icon={<BarChart3 className="w-5 h-5 text-[#00C2A8]" />} />
                        <CardBody>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={categoryData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis dataKey="name" stroke="#94A3B8" />
                                    <YAxis stroke="#94A3B8" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                    <Bar dataKey="value" fill="#00C2A8" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>

            {/* Distribution */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card elevated>
                    <CardHeader title="توزيع الفئات" icon={<PieChart className="w-5 h-5 text-[#FFD166]" />} />
                    <CardBody>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            </motion.div>
        </div>
    );
}
