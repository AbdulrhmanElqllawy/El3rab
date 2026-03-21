export const sidebarItems = {
    student: [
        { id: 'dashboard', label: 'لوحة التحكم',    icon: 'LayoutDashboard' },
        { id: 'simulator', label: 'المحاكي',          icon: 'Brain' },
        { id: 'courses',   label: 'الدورات',          icon: 'BookOpen' },
        { id: 'plans',     label: 'خطط المذاكرة',    icon: 'CalendarCheck' },
        { id: 'analytics', label: 'التحليلات',        icon: 'BarChart3' },
        { id: 'live',      label: 'البث المباشر',     icon: 'Radio' },
        { id: 'profile',   label: 'الملف الشخصي',    icon: 'UserCircle' },
    ],
    employee: [
        { id: 'dashboard', label: 'لوحة التحكم',     icon: 'LayoutDashboard' },
        { id: 'questions', label: 'إدارة الأسئلة',   icon: 'HelpCircle' },
        { id: 'courses',   label: 'إدارة الكورسات',  icon: 'BookOpen' },
        { id: 'live',      label: 'البث المباشر',     icon: 'Radio' },
        { id: 'support',   label: 'الدعم الفني',      icon: 'HeadphonesIcon' },
    ],
    admin: [
        {
            group: 'لوحة التحكم', icon: 'LayoutDashboard', id: 'dashboard_group',
            items: [
                { id: 'dashboard',          label: 'نظرة عامة' },
                { id: 'admin_activity',     label: 'آخر النشاطات' },
                { id: 'admin_alerts',       label: 'التنبيهات' },
            ]
        },
        {
            group: 'إدارة المستخدمين', icon: 'Users', id: 'users_group',
            items: [
                { id: 'users_all',          label: 'جميع المستخدمين' },
                { id: 'users_students',     label: 'الطلاب' },
                { id: 'users_search',       label: 'البحث عن مستخدم' },
                { id: 'users_banned',       label: 'حظر / فك حظر' },
                { id: 'users_log',          label: 'سجل النشاط' },
            ]
        },
        {
            group: 'إدارة الموظفين', icon: 'Briefcase', id: 'employees_group',
            items: [
                { id: 'employees_all',      label: 'جميع الموظفين' },
                { id: 'employees_add',      label: 'إضافة موظف' },
                { id: 'employees_perms',    label: 'تعديل الصلاحيات' },
                { id: 'employees_perf',     label: 'مراقبة الأداء' },
                { id: 'employees_log',      label: 'سجل التعديلات' },
            ]
        },
        {
            group: 'إدارة الكورسات', icon: 'BookOpen', id: 'courses_group',
            items: [
                { id: 'courses_all',        label: 'جميع الكورسات' },
                { id: 'courses_add',        label: 'إضافة كورس' },
                { id: 'courses_edit',       label: 'تعديل كورس' },
                { id: 'courses_lessons',    label: 'إدارة الدروس' },
                { id: 'courses_videos',     label: 'إدارة الفيديوهات' },
                { id: 'courses_files',      label: 'إدارة الملفات' },
            ]
        },
        {
            group: 'إدارة الأسئلة', icon: 'HelpCircle', id: 'questions_group',
            items: [
                { id: 'questions_bank',     label: 'بنك الأسئلة' },
                { id: 'questions_add',      label: 'إضافة سؤال' },
                { id: 'questions_edit',     label: 'تعديل سؤال' },
                { id: 'questions_import',   label: 'استيراد أسئلة' },
                { id: 'questions_cats',     label: 'تصنيف الأسئلة' },
                { id: 'questions_levels',   label: 'مستويات الصعوبة' },
            ]
        },
        {
            group: 'إدارة الاختبارات', icon: 'ClipboardList', id: 'exams_group',
            items: [
                { id: 'exams_create',       label: 'إنشاء اختبار' },
                { id: 'exams_current',      label: 'الاختبارات الحالية' },
                { id: 'exams_results',      label: 'نتائج الاختبارات' },
                { id: 'exams_settings',     label: 'إعدادات الاختبار' },
                { id: 'exams_simulator',    label: 'محاكي الاختبار' },
            ]
        },
        {
            group: 'تحليلات الموقع', icon: 'BarChart3', id: 'analytics_group',
            items: [
                { id: 'analytics_users',    label: 'تحليلات المستخدمين' },
                { id: 'analytics_exams',    label: 'تحليلات الاختبارات' },
                { id: 'analytics_perf',     label: 'تحليلات الأداء' },
                { id: 'analytics_courses',  label: 'تحليلات الكورسات' },
                { id: 'analytics_reports',  label: 'تقارير شهرية' },
            ]
        },
        {
            group: 'البث المباشر', icon: 'Radio', id: 'live_group',
            items: [
                { id: 'live_create',        label: 'إنشاء بث' },
                { id: 'live_schedule',      label: 'جدول البث' },
                { id: 'live_attendees',     label: 'الطلاب الحاضرون' },
                { id: 'live_recordings',    label: 'تسجيلات البث' },
            ]
        },
        {
            group: 'الدعم الفني', icon: 'HeadphonesIcon', id: 'support_group',
            items: [
                { id: 'support_tickets',    label: 'التذاكر' },
                { id: 'support_complaints', label: 'شكاوى الطلاب' },
                { id: 'support_replies',    label: 'الردود' },
                { id: 'support_archive',    label: 'أرشيف الدعم' },
            ]
        },
        {
            group: 'الاشتراكات والدفع', icon: 'CreditCard', id: 'payments_group',
            items: [
                { id: 'payments_plans',     label: 'خطط الاشتراك' },
                { id: 'payments_history',   label: 'المدفوعات' },
                { id: 'payments_invoices',  label: 'الفواتير' },
                { id: 'payments_discounts', label: 'العروض والخصومات' },
            ]
        },
        {
            group: 'الإعلانات والتنبيهات', icon: 'Megaphone', id: 'announcements_group',
            items: [
                { id: 'ann_create',         label: 'إنشاء إعلان' },
                { id: 'ann_notify',         label: 'إرسال إشعار' },
                { id: 'ann_bulk',           label: 'رسائل جماعية' },
                { id: 'ann_system',         label: 'تنبيهات النظام' },
            ]
        },
        {
            group: 'إدارة المحتوى', icon: 'FileText', id: 'content_group',
            items: [
                { id: 'content_articles',   label: 'المقالات' },
                { id: 'content_news',       label: 'الأخبار' },
                { id: 'content_pages',      label: 'صفحات الموقع' },
                { id: 'content_faq',        label: 'FAQ' },
            ]
        },
        {
            group: 'إعدادات الموقع', icon: 'Settings', id: 'settings_group',
            items: [
                { id: 'settings_general',   label: 'إعدادات عامة' },
                { id: 'settings_users',     label: 'إعدادات المستخدمين' },
                { id: 'settings_courses',   label: 'إعدادات الكورسات' },
                { id: 'settings_exams',     label: 'إعدادات الاختبارات' },
                { id: 'settings_payments',  label: 'إعدادات الدفع' },
                { id: 'settings_security',  label: 'إعدادات الأمان' },
            ]
        },
    ],
};