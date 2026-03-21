import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, Target, AlertCircle, Folder } from 'lucide-react';
import { useSimulator } from '@/contexts/SimulatorContext';
import SimulatorOverview from './SimulatorOverview';
import DailyMistakesView from './DailyMistakesView';
import ExamHistoryView from './ExamHistoryView';
import AnalyticsView from './AnalyticsView';
import MistakeFoldersView from './MistakeFoldersView';

const TABS = [
    { id: 'overview', label: 'النظرة العامة', icon: Target },
    { id: 'mistakes', label: 'الأخطاء اليومية', icon: AlertCircle },
    { id: 'history', label: 'السجل', icon: Activity },
    { id: 'analytics', label: 'التحليلات', icon: BarChart3 },
    { id: 'folders', label: 'المجلدات', icon: Folder },
];

export default function SimulatorView() {
    const [activeTab, setActiveTab] = useState('overview');
    const { attempts, mistakes, loading } = useSimulator();

    if (loading) {
        return (
            <div className="p-4 lg:p-6 space-y-6" dir="rtl">
                <div className="h-8 bg-gray-200 dark:bg-[#1E293B] rounded-lg animate-pulse w-48" />
                <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-24 bg-gray-200 dark:bg-[#1E293B] rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-[#E2E8F0] mb-1">
                    محاكي الاختبار
                </h1>
                <p className="text-[#64748b] dark:text-[#94A3B8]">
                    تتبع تقدمك وحلّل أدائك في الاختبارات
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-[#334155]/50">
                {TABS.map(tab => {
                    const TabIcon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition-all border-b-2 pb-3 ${
                                isActive
                                    ? 'text-[#6C4CF1] border-[#6C4CF1]'
                                    : 'text-[#64748b] dark:text-[#94A3B8] border-transparent hover:text-gray-900 dark:hover:text-[#E2E8F0]'
                            }`}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            <TabIcon className="w-4 h-4" />
                            {tab.label}
                        </motion.button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                {activeTab === 'overview' && <SimulatorOverview />}
                {activeTab === 'mistakes' && <DailyMistakesView />}
                {activeTab === 'history' && <ExamHistoryView />}
                {activeTab === 'analytics' && <AnalyticsView />}
                {activeTab === 'folders' && <MistakeFoldersView />}
            </motion.div>
        </div>
    );
}
