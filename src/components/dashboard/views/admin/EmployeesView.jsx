import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Edit2, Trash2, Shield, CheckSquare, Square, Save } from 'lucide-react';

const PERMS = [
    { group: 'المستخدمين', items: ['view_users','edit_users','delete_users','ban_users'] },
    { group: 'الكورسات',   items: ['create_course','edit_course','delete_course'] },
    { group: 'الأسئلة',   items: ['create_question','edit_question','delete_question'] },
    { group: 'الاختبارات', items: ['create_exam','edit_exam','view_results'] },
];

const PERM_LABELS = {
    view_users:'عرض المستخدمين', edit_users:'تعديل المستخدمين', delete_users:'حذف المستخدمين', ban_users:'حظر المستخدمين',
    create_course:'إنشاء كورس', edit_course:'تعديل كورس', delete_course:'حذف كورس',
    create_question:'إضافة سؤال', edit_question:'تعديل سؤال', delete_question:'حذف سؤال',
    create_exam:'إنشاء اختبار', edit_exam:'تعديل اختبار', view_results:'عرض النتائج',
};

const mockEmployees = [
    { id: 1, name: 'خالد يوسف',   email: 'khalid@example.com',  dept: 'الأسئلة',   questions: 120, courses: 3, perms: ['create_question','edit_question','view_results'] },
    { id: 2, name: 'منى العمري',  email: 'mona@example.com',    dept: 'الكورسات',  questions: 45,  courses: 7, perms: ['create_course','edit_course','view_results'] },
    { id: 3, name: 'طارق السالم', email: 'tariq@example.com',   dept: 'الدعم',     questions: 12,  courses: 0, perms: ['view_users','ban_users'] },
];

export default function EmployeesView() {
    const [editingPerms, setEditingPerms] = useState(null);
    const [editPerms, setEditPerms] = useState([]);

    const openPerms = (emp) => {
        setEditingPerms(emp);
        setEditPerms([...emp.perms]);
    };

    const togglePerm = (p) => {
        setEditPerms(ps => ps.includes(p) ? ps.filter(x => x !== p) : [...ps, p]);
    };

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">إدارة الموظفين</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">إدارة صلاحيات وأداء الموظفين</p>
                </div>
                <button className="flex items-center gap-2 bg-[#6C4CF1] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#5b3ee0] transition-colors shadow-sm">
                    <UserPlus className="w-4 h-4" />
                    إضافة موظف
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full" dir="rtl">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-[#0F172A]/40 border-b border-gray-100 dark:border-[#334155]/50">
                                {['الموظف','القسم','الأسئلة المضافة','الكورسات','الصلاحيات','الإجراءات'].map(h => (
                                    <th key={h} className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3 whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                            {mockEmployees.map(emp => (
                                <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors">
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C4CF1] to-[#FFD166] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{emp.name.slice(0,2)}</div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800 dark:text-[#F1F5F9]">{emp.name}</p>
                                                <p className="text-xs text-gray-400">{emp.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5"><span className="text-xs bg-[#00C2A8]/10 text-[#00C2A8] px-2.5 py-1 rounded-full">{emp.dept}</span></td>
                                    <td className="px-4 py-3.5 text-sm font-bold text-gray-700 dark:text-gray-300">{emp.questions}</td>
                                    <td className="px-4 py-3.5 text-sm font-bold text-gray-700 dark:text-gray-300">{emp.courses}</td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex flex-wrap gap-1">
                                            {emp.perms.slice(0, 2).map(p => (
                                                <span key={p} className="text-xs bg-[#6C4CF1]/10 text-[#6C4CF1] px-1.5 py-0.5 rounded">{PERM_LABELS[p]}</span>
                                            ))}
                                            {emp.perms.length > 2 && <span className="text-xs text-gray-400">+{emp.perms.length - 2}</span>}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => openPerms(emp)} className="p-1.5 rounded-lg text-gray-400 hover:text-[#6C4CF1] hover:bg-[#6C4CF1]/10 transition-all" title="تعديل الصلاحيات"><Shield className="w-3.5 h-3.5" /></button>
                                            <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all" title="تعديل"><Edit2 className="w-3.5 h-3.5" /></button>
                                            <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all" title="حذف"><Trash2 className="w-3.5 h-3.5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Permissions Modal */}
            {editingPerms && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditingPerms(null)}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 max-w-md w-full border border-gray-200 dark:border-[#334155]/60 shadow-2xl max-h-[80vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()} dir="rtl"
                    >
                        <h3 className="font-black text-gray-900 dark:text-[#F1F5F9] text-lg mb-1">تعديل صلاحيات</h3>
                        <p className="text-sm text-gray-400 mb-5">{editingPerms.name}</p>
                        <div className="space-y-5">
                            {PERMS.map(grp => (
                                <div key={grp.group}>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">{grp.group}</p>
                                    <div className="space-y-2">
                                        {grp.items.map(p => {
                                            const on = editPerms.includes(p);
                                            return (
                                                <button key={p} onClick={() => togglePerm(p)}
                                                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-sm transition-all ${on ? 'bg-[#6C4CF1]/10 dark:bg-[#6C4CF1]/20' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                                                    {on ? <CheckSquare className="w-4 h-4 text-[#6C4CF1] flex-shrink-0" /> : <Square className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />}
                                                    <span className={on ? 'text-[#6C4CF1] font-medium' : 'text-gray-600 dark:text-gray-400'}>{PERM_LABELS[p]}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setEditingPerms(null)} className="flex-1 py-2.5 text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#334155] rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">إلغاء</button>
                            <button onClick={() => setEditingPerms(null)} className="flex-1 py-2.5 text-sm bg-[#6C4CF1] text-white font-semibold rounded-xl hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2">
                                <Save className="w-4 h-4" />
                                حفظ الصلاحيات
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}