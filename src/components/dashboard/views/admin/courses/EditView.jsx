import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import AdminModal from '../../../components/AdminModal';

const coursesData = [
    { id: 1, name: 'التناظر اللفظي المتقدم', instructor: 'أ. محمد أحمد', price: 150, level: 'متقدم', students: 45 },
    { id: 2, name: 'استراتيجيات الحل السريع', instructor: 'أ. فاطمة علي', price: 120, level: 'متوسط', students: 62 },
    { id: 3, name: 'أساسيات اللغة العربية', instructor: 'أ. علي محمود', price: 100, level: 'سهل', students: 89 },
];

export default function AdminCoursesEditView() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errors, setErrors] = useState({ name: '', instructor: '', price: '', maxStudents: '' });
    
    const [editData, setEditData] = useState({
        name: '',
        instructor: '',
        price: '',
        level: 'متوسط',
        description: '',
        maxStudents: '',
    });

    const validateForm = () => {
        const newErrors = {};
        if (!editData.name.trim()) newErrors.name = 'اسم الكورس مطلوب';
        if (!editData.instructor.trim()) newErrors.instructor = 'اسم المعلم مطلوب';
        if (!editData.price || parseInt(editData.price) < 0) newErrors.price = 'السعر غير صحيح';
        if (!editData.maxStudents || parseInt(editData.maxStudents) < 1) newErrors.maxStudents = 'عدد الطلاب غير صحيح';
        return newErrors;
    };

    const openEditModal = (course) => {
        setSelectedCourse(course);
        setEditData({
            name: course.name,
            instructor: course.instructor,
            price: course.price.toString(),
            level: course.level,
            description: '',
            maxStudents: '50',
        });
        setErrors({ name: '', instructor: '', price: '', maxStudents: '' });
        setShowEditModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
        if (errors && errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setShowSuccessModal(true);
    };

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="تعديل الكورسات"
                description="تحديث معلومات ومحتوى الكورسات الموجودة"
            />

            {/* Courses Table */}
            <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-[#334155]/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-[#0F172A] border-b border-gray-100 dark:border-[#334155]/50">
                            <tr>
                                <th className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">الكورس</th>
                                <th className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">المعلم</th>
                                <th className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">السعر</th>
                                <th className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">المستوى</th>
                                <th className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">الطلاب</th>
                                <th className="px-6 py-3 text-center font-bold text-gray-900 dark:text-white">الإجراء</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-[#334155]/50">
                            {coursesData.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors">
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{course.name}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{course.instructor}</td>
                                    <td className="px-6 py-4 font-bold text-[#6C4CF1]">{course.price} ر.س</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            course.level === 'متقدم' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400' :
                                            course.level === 'متوسط' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' :
                                            'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                                        }`}>
                                            {course.level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{course.students}</td>
                                    <td className="px-6 py-4 text-center">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => openEditModal(course)}
                                            className="px-4 py-2 bg-[#6C4CF1] text-white rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors"
                                        >
                                            تعديل
                                        </motion.button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <AdminModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title={`تعديل: ${selectedCourse?.name}`}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">اسم الكورس *</label>
                        <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border rounded-lg focus:ring-2 focus:outline-none dark:text-white transition-ring ${
                                errors?.name ? 'border-red-500 ring-red-500' : 'border-gray-200 dark:border-[#334155] focus:ring-[#6C4CF1]'
                            }`}
                            placeholder="اسم الكورس"
                        />
                        {errors?.name && <p className="text-red-600 text-xs mt-2">{errors?.name}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المعلم *</label>
                            <input
                                type="text"
                                name="instructor"
                                value={editData.instructor}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border rounded-lg focus:ring-2 focus:outline-none dark:text-white transition-ring ${
                                    errors?.instructor ? 'border-red-500 ring-red-500' : 'border-gray-200 dark:border-[#334155] focus:ring-[#6C4CF1]'
                                }`}
                                placeholder="اسم المعلم"
                            />
                            {errors?.instructor && <p className="text-red-600 text-xs mt-2">{errors?.instructor}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المستوى</label>
                            <select
                                name="level"
                                value={editData.level}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                            >
                                <option value="سهل">سهل</option>
                                <option value="متوسط">متوسط</option>
                                <option value="متقدم">متقدم</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">السعر (ريال) *</label>
                            <input
                                type="number"
                                name="price"
                                value={editData.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border rounded-lg focus:ring-2 focus:outline-none dark:text-white transition-ring ${
                                    errors?.price ? 'border-red-500 ring-red-500' : 'border-gray-200 dark:border-[#334155] focus:ring-[#6C4CF1]'
                                }`}
                                placeholder="0.00"
                            />
                            {errors?.price && <p className="text-red-600 text-xs mt-2">{errors?.price}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الحد الأقصى للطلاب *</label>
                            <input
                                type="number"
                                name="maxStudents"
                                value={editData.maxStudents}
                                onChange={handleChange}
                                min="1"
                                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border rounded-lg focus:ring-2 focus:outline-none dark:text-white transition-ring ${
                                    errors?.maxStudents ? 'border-red-500 ring-red-500' : 'border-gray-200 dark:border-[#334155] focus:ring-[#6C4CF1]'
                                }`}
                                placeholder="50"
                            />
                            {errors?.maxStudents && <p className="text-red-600 text-xs mt-2">{errors?.maxStudents}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الوصف</label>
                        <textarea
                            name="description"
                            value={editData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white resize-none"
                            placeholder="وصف الكورس..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#334155]">
                        <motion.button
                            type="button"
                            onClick={() => setShowEditModal(false)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm bg-gray-200 dark:bg-[#334155] text-gray-900 dark:text-white hover:bg-gray-300 transition-colors"
                        >
                            إلغاء
                        </motion.button>
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm bg-[#6C4CF1] text-white hover:bg-[#5b3ee0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {loading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                        </motion.button>
                    </div>
                </form>
            </AdminModal>

            {/* Success Modal */}
            <AdminModal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    setShowEditModal(false);
                }}
                title="تم التحديث بنجاح!"
                size="md"
            >
                <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">تم تحديث الكورس بنجاح!</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">جميع التغييرات تم حفظها بنجاح</p>
                </div>
            </AdminModal>
        </div>
    );
}
