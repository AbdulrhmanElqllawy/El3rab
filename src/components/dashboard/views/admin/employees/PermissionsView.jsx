import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Circle, Save, RotateCcw } from 'lucide-react';

const PERMISSIONS = {
    'إدارة المستخدمين': ['عرض المستخدمين', 'إضافة مستخدم', 'تعديل المستخدمين', 'حذف المستخدمين', 'حظر/فك الحظر'],
    'إدارة الكورسات': ['عرض الكورسات', 'إضافة كورس', 'تعديل الكورسات', 'حذف الكورسات', 'إدارة الدروس'],
    'إدارة الاختبارات': ['عرض الاختبارات', 'إنشاء اختبار', 'تعديل الاختبارات', 'حذف الاختبارات', 'عرض النتائج'],
    'إدارة الأسئلة': ['عرض الأسئلة', 'إضافة سؤال', 'تعديل الأسئلة', 'حذف الأسئلة', 'استيراد الأسئلة'],
    'الإعدادات': ['عرض الإعدادات', 'تعديل الإعدادات', 'إدارة الدفع', 'الأمان والخصوصية'],
    'التقارير': ['عرض التقارير', 'تصدير التقارير', 'عرض التحليلات', 'الأداء والإحصائيات'],
};

const ROLES = [
    { id: 'admin', name: 'مدير كامل', description: 'صلاحيات كاملة على النظام' },
    { id: 'manager', name: 'مدير محدود', description: 'صلاحيات محدودة في الإدارة' },
    { id: 'teacher', name: 'معلم', description: 'صلاحيات تدريسية فقط' },
    { id: 'support', name: 'دعم فني', description: 'صلاحيات الدعم الفني' },
];

const mockEmployees = [
    { id: 1, name: 'خالد يوسف', email: 'khalid@example.com', role: 'teacher', permissions: ['عرض الأسئلة', 'عرض الاختبارات', 'عرض الكورسات'] },
    { id: 2, name: 'فاطمة الشهري', email: 'fatima@example.com', role: 'manager', permissions: ['عرض المستخدمين', 'عرض الكورسات', 'عرض الاختبارات'] },
];

export default function PermissionsView() {
    const [selectedEmployee, setSelectedEmployee] = useState(mockEmployees[0]);
    const [permissions, setPermissions] = useState(selectedEmployee.permissions);
    const [hasChanges, setHasChanges] = useState(false);

    const handlePermissionToggle = (permission) => {
        setHasChanges(true);
        if (permissions.includes(permission)) {
            setPermissions(permissions.filter(p => p !== permission));
        } else {
            setPermissions([...permissions, permission]);
        }
    };

    const handleSave = () => {
        setHasChanges(false);
    };

    const handleReset = () => {
        setPermissions(selectedEmployee.permissions);
        setHasChanges(false);
    };

    const handleEmployeeSelect = (employee) => {
        if (hasChanges) {
            if (window.confirm('هناك تغييرات لم يتم حفظها. هل تريد المتابعة؟')) {
                setSelectedEmployee(employee);
                setPermissions(employee.permissions);
                setHasChanges(false);
            }
        } else {
            setSelectedEmployee(employee);
            setPermissions(employee.permissions);
        }
    };

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">إدارة الصلاحيات</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">تحكم دقيق في صلاحيات كل موظف والميزات المتاحة له</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Sidebar - Employees List */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden"
                >
                    <div className="p-4 border-b border-gray-100 dark:border-[#334155]/50">
                        <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9]">الموظفون</h3>
                    </div>
                    <div className="space-y-1 p-2">
                        {mockEmployees.map((emp) => (
                            <button
                                key={emp.id}
                                onClick={() => handleEmployeeSelect(emp)}
                                className={`w-full text-right px-3 py-2.5 rounded-lg text-sm transition-all ${
                                    selectedEmployee.id === emp.id
                                        ? 'bg-[#6C4CF1] text-white font-semibold'
                                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#0F172A]'
                                }`}
                            >
                                <p className="font-medium">{emp.name}</p>
                                <p className="text-xs opacity-75">{emp.email}</p>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Main Content - Permissions Editor */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="lg:col-span-3 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6 space-y-6"
                >
                    {/* Employee Info */}
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-100 dark:border-[#334155]">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#6C4CF1] to-[#00C2A8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {selectedEmployee.name.slice(0, 2)}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9]">{selectedEmployee.name}</h3>
                            <p className="text-sm text-gray-400">{selectedEmployee.email}</p>
                            <div className="mt-1">
                                <select className="text-xs px-2.5 py-1 rounded-lg bg-[#6C4CF1]/10 text-[#6C4CF1] border border-[#6C4CF1]/20 outline-none">
                                    {ROLES.map(role => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Permissions Grid */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-[#6C4CF1]" />
                            <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9]">الصلاحيات التفصيلية</h3>
                        </div>

                        <div className="space-y-3">
                            {Object.entries(PERMISSIONS).map(([category, perms]) => (
                                <div key={category} className="bg-gray-50 dark:bg-[#0F172A]/50 rounded-lg p-4 space-y-2.5">
                                    <h4 className="font-semibold text-gray-700 dark:text-[#F1F5F9] text-sm">{category}</h4>
                                    <div className="space-y-2">
                                        {perms.map((perm) => (
                                            <label key={perm} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white dark:hover:bg-[#1E293B] rounded transition-colors">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        checked={permissions.includes(perm)}
                                                        onChange={() => handlePermissionToggle(perm)}
                                                        className="sr-only"
                                                    />
                                                    {permissions.includes(perm) ? (
                                                        <CheckCircle className="w-5 h-5 text-[#00C2A8]" />
                                                    ) : (
                                                        <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-700 dark:text-gray-200">{perm}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 bg-gray-50 dark:bg-[#0F172A]/50 rounded-lg p-3">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">الصلاحيات الممنوحة</p>
                            <p className="font-black text-[#6C4CF1] text-lg mt-1">{permissions.length}</p>
                        </div>
                        <div className="text-center border-l border-r border-gray-200 dark:border-[#334155]">
                            <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الصلاحيات</p>
                            <p className="font-black text-gray-700 dark:text-[#F1F5F9] text-lg mt-1">{Object.values(PERMISSIONS).flat().length}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">نسبة الوصول</p>
                            <p className="font-black text-blue-600 dark:text-blue-300 text-lg mt-1">{Math.round((permissions.length / Object.values(PERMISSIONS).flat().length) * 100)}%</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 justify-end pt-4 border-t border-gray-100 dark:border-[#334155]">
                        <button
                            onClick={handleReset}
                            disabled={!hasChanges}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#334155] rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            إعادة تعيين
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!hasChanges}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#6C4CF1] rounded-lg hover:bg-[#5b3ee0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            حفظ التغييرات
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Role Templates */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6">
                <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9] mb-4">قوالب الأدوار</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {ROLES.map((role) => (
                        <button key={role.id} className="text-left p-4 border border-gray-200 dark:border-[#334155] rounded-lg hover:border-[#6C4CF1] hover:bg-[#6C4CF1]/5 transition-all group">
                            <p className="font-semibold text-gray-800 dark:text-[#F1F5F9] group-hover:text-[#6C4CF1] transition-colors">{role.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{role.description}</p>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
