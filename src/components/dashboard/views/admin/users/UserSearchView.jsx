import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, BarChart3 } from 'lucide-react';

const ROLES = { student: 'طالب', employee: 'موظف', admin: 'مدير' };
const ROLE_COLORS = {
    student:  'bg-[#6C4CF1]/10 text-[#6C4CF1]',
    employee: 'bg-[#00C2A8]/10 text-[#00C2A8]',
    admin:    'bg-[#FFD166]/20 text-yellow-700 dark:text-[#FFD166]',
};

const mockResults = [
    { id: 1, name: 'أحمد محمد',   email: 'ahmed@example.com',   role: 'student',  joined: '2024-01-15', tests: 42, avg: 78 },
    { id: 2, name: 'سارة علي',    email: 'sara@example.com',    role: 'student',  joined: '2024-02-10', tests: 18, avg: 91 },
    { id: 5, name: 'فيصل العتيبي', email: 'faisal@example.com', role: 'student',  joined: '2024-01-28', tests: 30, avg: 82 },
];

export default function UserSearchView() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    
    // Filter states
    const [filterRole, setFilterRole] = useState('all');
    const [filterJoinedFrom, setFilterJoinedFrom] = useState('');
    const [filterJoinedTo, setFilterJoinedTo] = useState('');
    const [filterTestsMin, setFilterTestsMin] = useState('');
    const [filterTestsMax, setFilterTestsMax] = useState('');
    const [filterAvgMin, setFilterAvgMin] = useState('');
    const [filterAvgMax, setFilterAvgMax] = useState('');
    const [activityFilter, setActivityFilter] = useState('all');

    const handleSearch = () => {
        setHasSearched(true);
        // Apply filters to mock results
        let filtered = mockResults.filter(r => {
            const matchesSearch = !search || r.name.includes(search) || r.email.includes(search);
            const matchesRole = filterRole === 'all' || r.role === filterRole;
            const matchesTests = (!filterTestsMin || r.tests >= parseInt(filterTestsMin)) && (!filterTestsMax || r.tests <= parseInt(filterTestsMax));
            const matchesAvg = (!filterAvgMin || r.avg >= parseInt(filterAvgMin)) && (!filterAvgMax || r.avg <= parseInt(filterAvgMax));
            return matchesSearch && matchesRole && matchesTests && matchesAvg;
        });
        setResults(filtered);
    };

    const handleReset = () => {
        setSearch('');
        setResults([]);
        setHasSearched(false);
        setFilterRole('all');
        setFilterJoinedFrom('');
        setFilterJoinedTo('');
        setFilterTestsMin('');
        setFilterTestsMax('');
        setFilterAvgMin('');
        setFilterAvgMax('');
        setActivityFilter('all');
    };

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">بحث متقدم عن المستخدمين</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">ابحث عن المستخدمين بمعايير متعددة ومتقدمة</p>
            </div>

            {/* Main Search Bar */}
            <div className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155]/60 rounded-xl px-4 py-3 shadow-sm">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                    className="flex-1 bg-transparent text-sm text-gray-700 dark:text-[#F1F5F9] outline-none placeholder:text-gray-400"
                    placeholder="ابحث بالاسم أو البريد الإلكتروني..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSearch()}
                    dir="rtl"
                />
                <button onClick={handleSearch} className="bg-[#6C4CF1] text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#5b3ee0] transition-colors flex-shrink-0">
                    بحث
                </button>
            </div>

            {/* Advanced Filters */}
            <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-5 space-y-4"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-4 h-4 text-[#6C4CF1]" />
                    <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9]">مرشحات متقدمة</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Role Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">الدور</label>
                        <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none">
                            <option value="all">جميع الأدوار</option>
                            <option value="student">طالب</option>
                            <option value="employee">موظف</option>
                            <option value="admin">مدير</option>
                        </select>
                    </div>

                    {/* Activity Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">النشاط الأخير</label>
                        <select value={activityFilter} onChange={e => setActivityFilter(e.target.value)} className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none">
                            <option value="all">الكل</option>
                            <option value="today">اليوم</option>
                            <option value="week">هذا الأسبوع</option>
                            <option value="month">هذا الشهر</option>
                            <option value="old">أكثر من شهر</option>
                        </select>
                    </div>

                    {/* Join Date From */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">تاريخ التسجيل من</label>
                        <input type="date" value={filterJoinedFrom} onChange={e => setFilterJoinedFrom(e.target.value)} className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Join Date To */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">تاريخ التسجيل إلى</label>
                        <input type="date" value={filterJoinedTo} onChange={e => setFilterJoinedTo(e.target.value)} className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none" />
                    </div>

                    {/* Tests Range */}
                    <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">عدد الاختبارات من</label>
                            <input type="number" value={filterTestsMin} onChange={e => setFilterTestsMin(e.target.value)} placeholder="0" className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">إلى</label>
                            <input type="number" value={filterTestsMax} onChange={e => setFilterTestsMax(e.target.value)} placeholder="999" className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Average Score Range */}
                    <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">متوسط الدرجات من</label>
                            <input type="number" value={filterAvgMin} onChange={e => setFilterAvgMin(e.target.value)} placeholder="0" min="0" max="100" className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">إلى</label>
                            <input type="number" value={filterAvgMax} onChange={e => setFilterAvgMax(e.target.value)} placeholder="100" min="0" max="100" className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-end gap-2">
                        <button onClick={handleSearch} className="flex-1 bg-[#6C4CF1] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#5b3ee0] transition-colors">
                            تطبيق
                        </button>
                        <button onClick={handleReset} className="flex-1 bg-gray-200 dark:bg-[#334155] text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors">
                            إعادة تعيين
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Results */}
            {hasSearched && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="w-4 h-4 text-[#6C4CF1]" />
                        <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9]">نتائج البحث ({results.length})</h3>
                    </div>

                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {results.map((user) => (
                                <motion.div key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6C4CF1] to-[#00C2A8] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                            {user.name.slice(0, 2)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-bold text-gray-800 dark:text-[#F1F5F9] text-sm">{user.name}</h4>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[user.role]}`}>{ROLES[user.role]}</span>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-0.5 truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100 dark:border-[#334155]/50">
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">الاختبارات</p>
                                            <p className="font-bold text-[#6C4CF1] text-sm mt-0.5">{user.tests}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">المعدل</p>
                                            <p className="font-bold text-[#00C2A8] text-sm mt-0.5">{user.avg}%</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">التسجيل</p>
                                            <p className="font-bold text-gray-600 dark:text-gray-300 text-xs mt-0.5">{user.joined}</p>
                                        </div>
                                    </div>

                                    <button className="w-full mt-3 py-1.5 text-xs font-semibold text-[#6C4CF1] hover:bg-[#6C4CF1]/5 rounded-lg transition-colors">
                                        عرض الملف الشخصي
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">لم يتم العثور على نتائج مطابقة للمعايير المحددة</p>
                            <button onClick={handleReset} className="mt-4 text-sm text-[#6C4CF1] hover:underline font-semibold">
                                إعادة تعيين المرشحات
                            </button>
                        </div>
                    )}
                </motion.div>
            )}

            {!hasSearched && (
                <div className="text-center py-20">
                    <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">اعتمد على المرشحات أعلاه والبدء في البحث</p>
                </div>
            )}
        </div>
    );
}
