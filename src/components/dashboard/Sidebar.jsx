import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Brain, BookOpen, CalendarCheck, BarChart3, Radio,
    UserCircle, HelpCircle, Users, Briefcase, Settings, X, ChevronLeft,
    ChevronDown, Headphones, CreditCard, FileText, ClipboardList, Megaphone
} from 'lucide-react';
import { useDashboard } from './DashboardContext';
import { sidebarItems } from './sidebarConfig';

const LOGO = "src/imgs/logo.png";

const iconMap = {
    LayoutDashboard, Brain, BookOpen, CalendarCheck, BarChart3, Radio,
    UserCircle, HelpCircle, Users, Briefcase, Settings, CreditCard, FileText,
    ClipboardList, Megaphone, HeadphonesIcon: Headphones,
};

const roleColors = {
    student:  { gradient: 'from-[#6C4CF1] to-[#00C2A8]', dot: 'bg-[#00C2A8]', label: 'طالب' },
    employee: { gradient: 'from-[#6C4CF1] to-[#FFD166]', dot: 'bg-[#FFD166]', label: 'موظف' },
    admin:    { gradient: 'from-[#6C4CF1] to-[#EF4444]', dot: 'bg-[#EF4444]',  label: 'مدير' },
};

// Detect which group contains the active section
function getActiveGroup(items, activeSection) {
    for (const item of items) {
        if (item.group && item.items?.some(s => s.id === activeSection)) return item.id;
        if (item.id === activeSection) return null;
    }
    return null;
}

function FlatNavItem({ item, isActive, onClick }) {
    const Icon = iconMap[item.icon] || LayoutDashboard;
    return (
        <motion.button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                    ? 'bg-[#6C4CF1] text-white shadow-lg shadow-[#6C4CF1]/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-[#F1F5F9]'
                }`}
            whileHover={{ x: -2 }} whileTap={{ scale: 0.98 }}
        >
            <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`} />
            <span className="flex-1 text-right">{item.label}</span>
            {isActive && <ChevronLeft className="w-3 h-3 opacity-60" />}
        </motion.button>
    );
}

function GroupNavItem({ group, activeSection, onSelect, defaultOpen }) {
    const Icon = iconMap[group.icon] || LayoutDashboard;
    const hasActive = group.items?.some(s => s.id === activeSection);
    const [open, setOpen] = useState(defaultOpen || hasActive);

    return (
        <div>
            <button
                onClick={() => setOpen(o => !o)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    ${hasActive
                        ? 'text-[#6C4CF1] bg-[#6C4CF1]/8 dark:bg-[#6C4CF1]/15'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
            >
                <Icon className={`w-4 h-4 flex-shrink-0 ${hasActive ? 'text-[#6C4CF1]' : 'text-gray-400 dark:text-gray-500'}`} />
                <span className="flex-1 text-right">{group.group}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''} ${hasActive ? 'text-[#6C4CF1]' : 'text-gray-400'}`} />
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-0.5 mr-3 pr-3 border-r-2 border-gray-200 dark:border-[#334155]/60 space-y-0.5 py-1">
                            {group.items.map(sub => {
                                const isActive = activeSection === sub.id;
                                return (
                                    <button
                                        key={sub.id}
                                        onClick={() => onSelect(sub.id)}
                                        className={`w-full text-right text-xs px-3 py-2 rounded-lg transition-all duration-150
                                            ${isActive
                                                ? 'bg-[#6C4CF1] text-white font-semibold'
                                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-[#F1F5F9]'
                                            }`}
                                    >
                                        {sub.label}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Sidebar() {
    const { user, sidebarOpen, setSidebarOpen, activeSection, setActiveSection } = useDashboard();
    if (!user) return null;

    const items = sidebarItems[user.role] || sidebarItems.student;
    const colors = roleColors[user.role];
    const initials = user.name?.slice(0, 2) || 'م';

    const handleSelect = (id) => {
        setActiveSection(id);
        if (window.innerWidth < 1024) setSidebarOpen(false);
    };

    return (
        <>
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={{ x: sidebarOpen ? 0 : '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-64 z-40 flex flex-col
                    bg-white dark:bg-[#1E293B] border-l border-gray-200 dark:border-[#334155]/60
                    shadow-2xl lg:translate-x-0 lg:relative lg:shadow-none"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-[#334155]/50 flex-shrink-0">

                    <a href="/" className="hidden lg:flex items-center group mr-2">
                        <img src={LOGO} alt="العراب" className="h-10 w-auto object-contain" />
                    </a>
                    <button
                        className="lg:hidden p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* User Card */}
                <div className="p-4 flex-shrink-0">
                    <div className={`bg-gradient-to-l ${colors.gradient} p-0.5 rounded-2xl`}>
                        <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-3 flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                {initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-900 dark:text-[#F1F5F9] font-semibold text-sm truncate">{user.name}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{colors.label}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5" dir="rtl">
                    {items.map((item) => {
                        if (item.group) {
                            return (
                                <GroupNavItem
                                    key={item.id}
                                    group={item}
                                    activeSection={activeSection}
                                    onSelect={handleSelect}
                                    defaultOpen={item.id === 'dashboard_group'}
                                />
                            );
                        }
                        return (
                            <FlatNavItem
                                key={item.id}
                                item={item}
                                isActive={activeSection === item.id}
                                onClick={() => handleSelect(item.id)}
                            />
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 dark:border-[#334155]/50 flex-shrink-0">
                    <p className="text-xs text-gray-400 dark:text-gray-600 text-center">العراب © 2025</p>
                </div>
            </motion.aside>
        </>
    );
}