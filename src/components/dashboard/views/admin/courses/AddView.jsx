import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, X, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import AdminModal from '../../../components/AdminModal';

export default function AdminCoursesAddView() {
    const [step, setStep] = useState(1); // 1: Basic Info, 2: Details, 3: Review
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errors, setErrors] = useState({ name: '', category: '', instructor: '', description: '', price: '', maxStudents: '' });
    
    const [formData, setFormData] = useState({
        // Step 1
        name: '',
        category: '',
        instructor: '',
        // Step 2
        description: '',
        level: 'متوسط',
        price: '',
        maxStudents: '',
        // Step 3
        imageUrl: '',
        tags: '',
    });

    const validateStep = (stepNum) => {
        const newErrors = {};
        if (stepNum === 1) {
            if (!formData.name.trim()) newErrors.name = 'اسم الكورس مطلوب';
            if (!formData.category) newErrors.category = 'الفئة مطلوبة';
            if (!formData.instructor.trim()) newErrors.instructor = 'اسم المعلم مطلوب';
        } else if (stepNum === 2) {
            if (!formData.description.trim()) newErrors.description = 'الوصف مطلوب';
            if (!formData.price || parseInt(formData.price) < 0) newErrors.price = 'السعر غير صحيح';
            if (!formData.maxStudents || parseInt(formData.maxStudents) < 1) newErrors.maxStudents = 'عدد الطلاب غير صحيح';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors?.[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleNext = () => {
        const stepErrors = validateStep(step);
        if (Object.keys(stepErrors).length === 0) {
            setStep(step + 1);
        } else {
            setErrors(stepErrors);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const stepErrors = validateStep(3);
        
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }

        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        setShowSuccessModal(true);
    };

    const steps = [
        { number: 1, title: 'معلومات المقرر الأساسية' },
        { number: 2, title: 'التفاصيل والتسعير' },
        { number: 3, title: 'المراجعة والنشر' }
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader 
                title="إضافة كورس جديد" 
                description="أنشئ كورس جديد متكامل على المنصة"
            />

            {/* Progress Indicator */}
            <div className="flex gap-4 mb-8">
                {steps.map((s) => (
                    <motion.div key={s.number} className="flex items-center gap-2 flex-1">
                        <motion.div
                            animate={{
                                scale: step === s.number ? 1.1 : 1,
                                backgroundColor: step > s.number ? '#6C4CF1' : step === s.number ? '#6C4CF1' : '#E2E8F0'
                            }}
                            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white dark:text-gray-900"
                        >
                            {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
                        </motion.div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">{s.title}</p>
                        </div>
                        {s.number < steps.length && (
                            <div className={`flex-1 h-1 mx-2 rounded-full ${step > s.number ? 'bg-[#6C4CF1]' : 'bg-gray-200 dark:bg-[#334155]'}`} />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1E293B] rounded-xl p-6 border border-gray-100 dark:border-[#334155]/50"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">اسم الكورس *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border rounded-lg focus:ring-2 focus:outline-none dark:text-white transition-ring ${
                                        errors?.name ? 'border-red-500 ring-red-500' : 'border-gray-200 dark:border-[#334155] focus:ring-[#6C4CF1]'
                                    }`}
                                    placeholder="مثال: التناظر اللفظي المتقدم"
                                />
                                {errors?.name && <p className="text-red-600 text-xs mt-2">{errors?.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الفئة *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border rounded-lg focus:ring-2 focus:outline-none dark:text-white transition-ring ${
                                        errors?.category ? 'border-red-500 ring-red-500' : 'border-gray-200 dark:border-[#334155] focus:ring-[#6C4CF1]'
                                    }`}
                                >
                                    <option value="">اختر الفئة</option>
                                    <option value="لغة">لغة عربية</option>
                                    <option value="رياضيات">رياضيات</option>
                                    <option value="علوم">علوم</option>
                                    <option value="اختبارات">اختبارات التحضيرية</option>
                                </select>
                                {errors?.category && <p className="text-red-600 text-xs mt-2">{errors?.category}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المعلم/المدرب *</label>
                                <input
                                    type="text"
                                    name="instructor"
                                    value={formData.instructor}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border rounded-lg focus:ring-2 focus:outline-none dark:text-white transition-ring ${
                                        errors?.instructor ? 'border-red-500 ring-red-500' : 'border-gray-200 dark:border-[#334155] focus:ring-[#6C4CF1]'
                                    }`}
                                    placeholder="مثال: أ. محمد أحمد"
                                />
                                {errors?.instructor && <p className="text-red-600 text-xs mt-2">{errors?.instructor}</p>}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Details */}
                    {step === 2 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الوصف *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border rounded-lg focus:ring-2 focus:outline-none dark:text-white transition-ring resize-none ${
                                        errors?.description ? 'border-red-500 ring-red-500' : 'border-gray-200 dark:border-[#334155] focus:ring-[#6C4CF1]'
                                    }`}
                                    placeholder="أدخل وصفاً تفصيلياً للكورس..."
                                />
                                {errors?.description && <p className="text-red-600 text-xs mt-2">{errors?.description}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المستوى التعليمي</label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none dark:text-white"
                                    >
                                        <option value="سهل">سهل للمبتدئين</option>
                                        <option value="متوسط">متوسط</option>
                                        <option value="صعب">متقدم</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">السعر (ريال) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
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
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الحد الأقصى للطلاب *</label>
                                <input
                                    type="number"
                                    name="maxStudents"
                                    value={formData.maxStudents}
                                    onChange={handleChange}
                                    min="1"
                                    className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0F172A] border rounded-lg focus:ring-2 focus:outline-none dark:text-white transition-ring ${
                                            errors?.maxStudents ? 'border-red-500 ring-red-500' : 'border-gray-200 dark:border-[#334155] focus:ring-[#6C4CF1]'
                                    }`}
                                    placeholder="مثال: 50"
                                />
                                {errors?.maxStudents && <p className="text-red-600 text-xs mt-2">{errors?.maxStudents}</p>}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 flex gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-blue-900 dark:text-blue-300 text-sm">تحقق من المعلومات</p>
                                    <p className="text-blue-700 dark:text-blue-400 text-xs mt-1">تأكد من صحة جميع البيانات قبل النشر</p>
                                </div>
                            </div>

                            <div className="space-y-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg p-6">
                                <div className="flex justify-between items-start">
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">اسم الكورس:</span>
                                    <span className="text-gray-900 dark:text-white font-semibold">{formData.name}</span>
                                </div>
                                <div className="flex justify-between items-start border-t border-gray-200 dark:border-[#334155] pt-3">
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">المعلم:</span>
                                    <span className="text-gray-900 dark:text-white font-semibold">{formData.instructor}</span>
                                </div>
                                <div className="flex justify-between items-start border-t border-gray-200 dark:border-[#334155] pt-3">
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">الفئة:</span>
                                    <span className="text-gray-900 dark:text-white font-semibold">{formData.category}</span>
                                </div>
                                <div className="flex justify-between items-start border-t border-gray-200 dark:border-[#334155] pt-3">
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">السعر:</span>
                                    <span className="text-[#6C4CF1] font-bold text-lg">{formData.price} ر.س</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 pt-6 border-t border-gray-100 dark:border-[#334155]/50">
                        {step > 1 && (
                            <motion.button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm bg-gray-200 dark:bg-[#334155] text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#475569] transition-colors"
                            >
                                السابق
                            </motion.button>
                        )}
                        {step < 3 ? (
                            <motion.button
                                type="button"
                                onClick={handleNext}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm bg-[#6C4CF1] text-white hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2"
                            >
                                التالي
                                <Plus className="w-4 h-4" />
                            </motion.button>
                        ) : (
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                {loading ? 'جاري الحفظ...' : 'نشر الكورس'}
                            </motion.button>
                        )}
                    </div>
                </form>
            </motion.div>

            {/* Success Modal */}
            <AdminModal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    setStep(1);
                    setFormData({
                        name: '', category: '', instructor: '', description: '', 
                        level: 'متوسط', price: '', maxStudents: '', imageUrl: '', tags: ''
                    });
                }}
                title="تم النشر بنجاح!"
                size="md"
            >
                <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">تم إضافة الكورس الجديد بنجاح!</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">يمكنك الآن البدء في إضافة الدروس والمحتويات</p>
                </div>
            </AdminModal>
        </div>
    );
}
