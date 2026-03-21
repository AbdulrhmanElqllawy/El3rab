import React from 'react';
import { Menu, Bell, Search, LogOut, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { useDashboard } from './DashboardContext';

const sectionTitles = {
    dashboard: 'لوحة التحكم',
    simulator: 'المحاكي', courses: 'الدورات', plans: 'خطط المذاكرة',
    analytics: 'التحليلات', live: 'البث المباشر', profile: 'الملف الشخصي',
    questions: 'إدارة الأسئلة', support: 'الدعم الفني',
    // Admin sections
    users_all: 'جميع المستخدمين', users_students: 'الطلاب', users_search: 'البحث عن مستخدم',
    users_banned: 'المستخدمون المحظورون', users_log: 'سجل النشاط',
    employees_all: 'جميع الموظفين', employees_add: 'إضافة موظف',
    employees_perms: 'تعديل الصلاحيات', employees_perf: 'مراقبة الأداء', employees_log: 'سجل التعديلات',
    courses_all: 'جميع الكورسات', courses_add: 'إضافة كورس', courses_edit: 'تعديل كورس',
    courses_lessons: 'إدارة الدروس', courses_videos: 'إدارة الفيديوهات', courses_files: 'إدارة الملفات',
    questions_bank: 'بنك الأسئلة', questions_add: 'إضافة سؤال', questions_edit: 'تعديل سؤال',
    questions_import: 'استيراد أسئلة', questions_cats: 'تصنيف الأسئلة', questions_levels: 'مستويات الصعوبة',
    exams_create: 'إنشاء اختبار', exams_current: 'الاختبارات الحالية', exams_results: 'نتائج الاختبارات',
    exams_settings: 'إعدادات الاختبار', exams_simulator: 'محاكي الاختبار',
    analytics_users: 'تحليلات المستخدمين', analytics_exams: 'تحليلات الاختبارات',
    analytics_perf: 'تحليلات الأداء', analytics_courses: 'تحليلات الكورسات', analytics_reports: 'تقارير شهرية',
    live_create: 'إنشاء بث', live_schedule: 'جدول البث', live_attendees: 'الطلاب الحاضرون', live_recordings: 'تسجيلات البث',
    support_tickets: 'التذاكر', support_complaints: 'شكاوى الطلاب', support_replies: 'الردود', support_archive: 'أرشيف الدعم',
    payments_plans: 'خطط الاشتراك', payments_history: 'المدفوعات', payments_invoices: 'الفواتير', payments_discounts: 'العروض والخصومات',
    ann_create: 'إنشاء إعلان', ann_notify: 'إرسال إشعار', ann_bulk: 'رسائل جماعية', ann_system: 'تنبيهات النظام',
    content_articles: 'المقالات', content_news: 'الأخبار', content_pages: 'صفحات الموقع', content_faq: 'FAQ',
    settings_general: 'إعدادات عامة', settings_users: 'إعدادات المستخدمين',
    settings_courses: 'إعدادات الكورسات', settings_exams: 'إعدادات الاختبارات',
    settings_payments: 'إعدادات الدفع', settings_security: 'إعدادات الأمان',
    admin_activity: 'آخر النشاطات', admin_alerts: 'التنبيهات',
};

export const BRAND_COLORS = {
  // Primary colors
  primary: '#f48329',
  primaryLight: '#fb923c',
  primaryDark: '#ea580c',
  primaryLighter: '#fed7aa',
  
  // Secondary colors
  secondary: '#6031b9',
  secondaryLight: '#7c3aed',
  secondaryDark: '#5b21b6',
  secondaryLighter: '#f3e8ff',
  
  // Accent colors
  accent: '#2bc9b8',
  accentLight: '#14b8a6',
  accentDark: '#0d9488',
  accentLighter: '#ccfbf1',
  
  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Neutral colors (for both light and dark modes)
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  // Dark mode colors
  dark: {
    bg: '#1e293b',
    bgSecondary: '#0f172a',
    border: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
  }
};


export default function DashboardNavbar() {
    const { sidebarOpen, setSidebarOpen, activeSection, user } = useDashboard();

    return (
        <header className="h-16 bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-[#334155]/60 flex items-center px-4 lg:px-6 gap-4 flex-shrink-0">
            {/* Mobile menu toggle */}
            <button
                className="lg:hidden p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Page title */}
            <div className="flex-1">
                <h1 className="text-lg font-bold text-gray-900 dark:text-[#F1F5F9]">
                    {sectionTitles[activeSection] || 'لوحة التحكم'}
                </h1>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
                {/* Search */}
                <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-[#0F172A]/60 rounded-xl px-3 py-2 border border-gray-200 dark:border-[#334155]/50">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="بحث..."
                        className="bg-transparent text-sm text-gray-700 dark:text-gray-300 outline-none w-32 placeholder:text-gray-400"
                        dir="rtl"
                    />
                </div>

                {/* Notifications */}
                <motion.button
                    className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#6C4CF1] rounded-full" />
                </motion.button>

                <ThemeToggle />
            

                {/* Logout */}
                <motion.button
                    // onClick={() => }
                    className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    title="تسجيل الخروج"
                >
                    <LogOut className="w-5 h-5" />
                </motion.button>
                {/* Back to Website Button */}
                <motion.a
                    href="/"
                    className="sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                        color: BRAND_COLORS.secondary,
                        borderWidth: '1.5px',
                        borderColor: BRAND_COLORS.dark.text + '40',
                    }}
                    whileHover={{ 
                        backgroundColor: BRAND_COLORS.secondary + '08',
                        borderColor: BRAND_COLORS.dark.text + '80',
                    }}
                    whileTap={{ scale: 0.95 }}
                    title="العودة إلى الموقع"
                >
                    <ArrowLeft className="dark:text-[#F1F5F9] w-4 h-4" />
                    <span className="hidden md:inline dark:text-[#F1F5F9]">العودة للرئيسية</span>
                </motion.a>
            </div>
        </header>
    );
}