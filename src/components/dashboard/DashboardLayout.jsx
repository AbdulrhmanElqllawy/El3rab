import React from 'react';
import { DashboardProvider, useDashboard } from './DashboardContext';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';
import LoadingSkeleton from './LoadingSkeleton';
import { AnimatePresence, motion } from 'framer-motion';

import StudentDashboard from './views/StudentDashboard';
import EmployeeDashboard from './views/EmployeeDashboard';
import AdminDashboard from './views/AdminDashboard';
import PlaceholderView from './views/PlaceholderView';

// Student views
import StudentCoursesView from './views/student/CoursesView';
import StudentPlansView from './views/student/PlansView';
import StudentAnalyticsView from './views/student/AnalyticsView';
import StudentLiveView from './views/student/LiveView';
import StudentProfileView from './views/student/ProfileView';
import SimulatorView from './views/student/simulator/SimulatorView';

// Employee views
import EmployeeQuestionsView from './views/employee/QuestionsView';
import EmployeeCoursesView from './views/employee/CoursesView';
import EmployeeLiveView from './views/employee/LiveView';
import EmployeeSupportView from './views/employee/SupportView';

// Admin views
import UsersAllView from './views/admin/users/UsersAllView';
import StudentsView from './views/admin/users/StudentsView';
import UserSearchView from './views/admin/users/UserSearchView';
import BannedUsersView from './views/admin/users/BannedUsersView';
import UserActivityLogView from './views/admin/users/UserActivityLogView';
import EmployeesAllView from './views/admin/employees/EmployeesAllView';
import AddEmployeeView from './views/admin/employees/AddEmployeeView';
import PermissionsView from './views/admin/employees/PermissionsView';
import EmployeePerformanceView from './views/admin/employees/EmployeePerformanceView';
import EmployeeAuditLogView from './views/admin/employees/EmployeeAuditLogView';
import QuestionBankView from './views/admin/questions/BankView';
import AddQuestionView from './views/admin/questions/AddView';
import EditQuestionView from './views/admin/questions/EditView';
import ImportQuestionsView from './views/admin/questions/ImportView';
import CategoriesView from './views/admin/questions/CategoriesView';
import DifficultyLevelsView from './views/admin/questions/LevelsView';
import GeneralSettingsView from './views/admin/settings/GeneralSettingsView';
import UserSettingsView from './views/admin/settings/UserSettingsView';
import CourseSettingsView from './views/admin/settings/CourseSettingsView';
import ExamSettingsView from './views/admin/settings/ExamSettingsView';
import PaymentSettingsView from './views/admin/settings/PaymentSettingsView';
import SecuritySettingsView from './views/admin/settings/SecuritySettingsView';
import UserAnalyticsView from './views/admin/analytics/UserAnalyticsView';
import ExamAnalyticsView from './views/admin/analytics/ExamAnalyticsView';
import PerformanceAnalyticsView from './views/admin/analytics/PerformanceAnalyticsView';
import CourseAnalyticsView from './views/admin/analytics/CourseAnalyticsView';
import ReportsView from './views/admin/analytics/ReportsView';
import ActivityView from './views/admin/ActivityView';
import AdminAlertsView from './views/admin/AdminAlertsView';
import AdminCoursesAllView from './views/admin/courses/AllView';
import AdminCoursesAddView from './views/admin/courses/AddView';
import AdminCoursesLessonsView from './views/admin/courses/LessonsView';
import AdminCoursesVideosView from './views/admin/courses/VideosView';
import AdminCoursesFilesView from './views/admin/courses/FilesView';
import AdminExamsCreateView from './views/admin/exams/CreateView';
import AdminExamsResultsView from './views/admin/exams/ResultsView';
import CurrentExamsView from './views/admin/exams/CurrentExamsView';
// import ExamSettingsView from './views/admin/exams/ExamSettingsView';
import ExamSimulatorView from './views/admin/exams/ExamSimulatorView';
import AdminLiveCreateView from './views/admin/live/CreateView';
import AdminLiveScheduleView from './views/admin/live/ScheduleView';
import AdminLiveAttendeesView from './views/admin/live/AttendeesView';
import AdminLiveRecordingsView from './views/admin/live/RecordingsView';
import AdminSupportTicketsView from './views/admin/support/TicketsView';
import AdminSupportComplaintsView from './views/admin/support/ComplaintsView';
import AdminSupportRepliesView from './views/admin/support/RepliesView';
import AdminSupportArchiveView from './views/admin/support/ArchiveView';
import AdminPaymentsPlansView from './views/admin/payments/PlansView';
import AdminPaymentsHistoryView from './views/admin/payments/HistoryView';
import AdminPaymentsInvoicesView from './views/admin/payments/InvoicesView';
import AdminPaymentsDiscountsView from './views/admin/payments/DiscountsView';
import AdminAnnouncementsCreateView from './views/admin/announcements/CreateView';
import AdminAnnounceNotifyView from './views/admin/announcements/NotifyView';
import AdminAnnounceBulkView from './views/admin/announcements/BulkView';
import AdminAnnounceSystemView from './views/admin/announcements/SystemView';
import AdminContentArticlesView from './views/admin/content/ArticlesView';
import NewsView from './views/admin/content/NewsView';
import PagesView from './views/admin/content/PagesView';
import FAQView from './views/admin/content/FAQView';
import AdminCoursesEditView from './views/admin/courses/EditView';

const STUDENT_VIEWS = {
    courses:   StudentCoursesView,
    plans:     StudentPlansView,
    analytics: StudentAnalyticsView,
    live:      StudentLiveView,
    profile:   StudentProfileView,
    simulator: SimulatorView,
};

const EMPLOYEE_VIEWS = {
    questions: EmployeeQuestionsView,
    courses:   EmployeeCoursesView,
    live:      EmployeeLiveView,
    support:   EmployeeSupportView,
};

const ADMIN_VIEWS = {
    // Dashboard group
    admin_activity:     ActivityView,
    admin_alerts:       AdminAlertsView,
    // Users group
    users_all:          UsersAllView,
    users_students:     StudentsView,
    users_search:       UserSearchView,
    users_banned:       BannedUsersView,
    users_log:          UserActivityLogView,
    // Employees group
    employees_all:      EmployeesAllView,
    employees_add:      AddEmployeeView,
    employees_perms:    PermissionsView,
    employees_perf:     EmployeePerformanceView,
    employees_log:      EmployeeAuditLogView,
    // Courses group
    courses_all:        AdminCoursesAllView,
    courses_add:        AdminCoursesAddView,
    courses_edit:       AdminCoursesEditView,
    courses_lessons:    AdminCoursesLessonsView,
    courses_videos:     AdminCoursesVideosView,
    courses_files:      AdminCoursesFilesView,
    // Questions group
    questions_bank:     QuestionBankView,
    questions_add:      AddQuestionView,
    questions_edit:     EditQuestionView,
    questions_import:   ImportQuestionsView,
    questions_cats:     CategoriesView,
    questions_levels:   DifficultyLevelsView,
    // Exams group
    exams_create:       AdminExamsCreateView,
    exams_current:      CurrentExamsView,
    exams_results:      AdminExamsResultsView,
    exams_settings:     ExamSettingsView,
    exams_simulator:    ExamSimulatorView,
    // Analytics group
    analytics_users:    UserAnalyticsView,
    analytics_exams:    ExamAnalyticsView,
    analytics_perf:     PerformanceAnalyticsView,
    analytics_courses:  CourseAnalyticsView,
    analytics_reports:  ReportsView,
    // Live group
    live_create:        AdminLiveCreateView,
    live_schedule:      AdminLiveScheduleView,
    live_attendees:     AdminLiveAttendeesView,
    live_recordings:    AdminLiveRecordingsView,
    // Support group
    support_tickets:    AdminSupportTicketsView,
    support_complaints: AdminSupportComplaintsView,
    support_replies:    AdminSupportRepliesView,
    support_archive:    AdminSupportArchiveView,
    // Payments group
    payments_plans:     AdminPaymentsPlansView,
    payments_history:   AdminPaymentsHistoryView,
    payments_invoices:  AdminPaymentsInvoicesView,
    payments_discounts: AdminPaymentsDiscountsView,
    // Announcements group
    ann_create:         AdminAnnouncementsCreateView,
    ann_notify:         AdminAnnounceNotifyView,
    ann_bulk:           AdminAnnounceBulkView,
    ann_system:         AdminAnnounceSystemView,
    // Content group
    content_articles:   AdminContentArticlesView,
    content_news:       NewsView,
    content_pages:      PagesView,
    content_faq:        FAQView,
    // Settings group
    settings_general:   GeneralSettingsView,
    settings_users:     UserSettingsView,
    settings_courses:   CourseSettingsView,
    settings_exams:     ExamSettingsView,
    settings_payments:  PaymentSettingsView,
    settings_security:  SecuritySettingsView,
};

function DashboardContent() {
    const { user, loading, activeSection } = useDashboard();

    if (loading) {
        return (
            <div className="min-h-screen flex bg-[#F8FAFC] dark:bg-[#0F172A]" dir="rtl">
                <div className="hidden lg:block w-64 flex-shrink-0 bg-white dark:bg-[#1E293B] border-l border-gray-200 dark:border-[#334155]/60 animate-pulse" />
                <div className="flex-1"><LoadingSkeleton /></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A]" dir="rtl">
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">يجب تسجيل الدخول للوصول للوحة التحكم</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-[#6C4CF1] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#5b3ee0] transition-colors"
                    >
                        العودة للرئيسية
                    </button>
                </div>
            </div>
        );
    }

    // Determine which view to show
    let MainView;
    if (activeSection === 'dashboard') {
        if (user.role === 'admin') MainView = AdminDashboard;
        else if (user.role === 'employee') MainView = EmployeeDashboard;
        else MainView = StudentDashboard;
    } else if (user.role === 'admin' && ADMIN_VIEWS[activeSection]) {
        MainView = ADMIN_VIEWS[activeSection];
    } else if (user.role === 'employee' && EMPLOYEE_VIEWS[activeSection]) {
        MainView = EMPLOYEE_VIEWS[activeSection];
    } else if (user.role === 'student' && STUDENT_VIEWS[activeSection]) {
        MainView = STUDENT_VIEWS[activeSection];
    } else {
        MainView = () => <PlaceholderView title={activeSection} />;
    }

    return (
        <div className="min-h-screen flex bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300" dir="rtl">
            {/* Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="h-screen sticky top-0">
                    <Sidebar />
                </div>
            </div>

            {/* Mobile sidebar */}
            <div className="lg:hidden">
                <Sidebar />
            </div>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <DashboardNavbar />
                <main className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <MainView />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}

export default function DashboardLayout() {
    return (
        <DashboardProvider>
            <DashboardContent />
        </DashboardProvider>
    );
}