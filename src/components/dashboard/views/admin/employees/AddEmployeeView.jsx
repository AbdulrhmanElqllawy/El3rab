import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ArrowLeft, Check, AlertCircle } from 'lucide-react';

export default function AddEmployeeView() {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: 'teaching',
        position: '',
        salary: '',
        joinDate: '',
        experience: '',
        qualifications: '',
        emergencyContact: '',
        employmentType: 'full-time',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setStep(1);
            setFormData({
                firstName: '', lastName: '', email: '', phone: '', department: 'teaching',
                position: '', salary: '', joinDate: '', experience: '', qualifications: '',
                emergencyContact: '', employmentType: 'full-time',
            });
        }, 2000);
    };

    return (
        <div className="p-4 lg:p-6 space-y-5" dir="rtl">
            {/* Header */}
            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-[#F1F5F9]">إضافة موظف جديد</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">ملء استمارة التعيين الخاصة بالموظف الجديد</p>
            </div>

            {/* Success Message */}
            {submitted && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-4 flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-green-700 dark:text-green-300">تم إضافة الموظف بنجاح!</p>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-0.5">سيتم إرسال بريد تأكيد للموظف الجديد</p>
                    </div>
                </motion.div>
            )}

            {/* Form Container */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-[#334155]/50 p-6 space-y-6"
            >
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-6">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <button
                                type="button"
                                onClick={() => setStep(s)}
                                className={`w-10 h-10 rounded-full font-bold transition-all ${
                                    step >= s ? 'bg-[#6C4CF1] text-white' : 'bg-gray-200 dark:bg-[#334155] text-gray-500'
                                }`}
                            >
                                {s}
                            </button>
                            {s < 3 && <div className={`h-1 flex-1 mx-2 rounded ${step > s ? 'bg-[#6C4CF1]' : 'bg-gray-200 dark:bg-[#334155]'}`} />}
                        </div>
                    ))}
                </div>

                {/* Step 1: Personal Information */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9] text-lg mb-4">البيانات الشخصية</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الاسم الأول *</label>
                                <input
                                    type="text" name="firstName" value={formData.firstName} onChange={handleChange} required
                                    className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                                    placeholder="أدخل الاسم الأول"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الاسم الأخير *</label>
                                <input
                                    type="text" name="lastName" value={formData.lastName} onChange={handleChange} required
                                    className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                                    placeholder="أدخل الاسم الأخير"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني *</label>
                                <input
                                    type="email" name="email" value={formData.email} onChange={handleChange} required
                                    className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                                    placeholder="example@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف *</label>
                                <input
                                    type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                                    className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                                    placeholder="+966 50 123 4567"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">جهة الاتصال الطوارئ</label>
                            <input
                                type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                                placeholder="اسم وهاتف جهة الاتصال الطوارئ"
                            />
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Employment Information */}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9] text-lg mb-4">معلومات التوظيف</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">القسم *</label>
                                <select name="department" value={formData.department} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]">
                                    <option value="teaching">التدريس</option>
                                    <option value="support">الدعم</option>
                                    <option value="admin">الإدارة</option>
                                    <option value="technical">التقني</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المسمى الوظيفي *</label>
                                <input
                                    type="text" name="position" value={formData.position} onChange={handleChange} required
                                    className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                                    placeholder="مثال: معلم لغة عربية"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">نوع التوظيف *</label>
                                <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]">
                                    <option value="full-time">دوام كامل</option>
                                    <option value="part-time">دوام جزئي</option>
                                    <option value="contract">عقد مؤقت</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">تاريخ البدء *</label>
                                <input
                                    type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} required
                                    className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الراتب الشهري (بالدولار) *</label>
                                <input
                                    type="number" name="salary" value={formData.salary} onChange={handleChange} required
                                    className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                                    placeholder="3500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">سنوات الخبرة *</label>
                                <input
                                    type="number" name="experience" value={formData.experience} onChange={handleChange} required
                                    className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                                    placeholder="5"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Qualifications & Confirmation */}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <h3 className="font-bold text-gray-800 dark:text-[#F1F5F9] text-lg mb-4">المؤهلات والتأكيد</h3>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المؤهلات والشهادات</label>
                            <textarea
                                name="qualifications" value={formData.qualifications} onChange={handleChange} rows={4}
                                className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-[#334155] rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-[#F1F5F9] outline-none focus:border-[#6C4CF1]"
                                placeholder="درجات شهادات التخرج والدورات والشهادات الأخرى"
                            />
                        </div>

                        {/* Review Section */}
                        <div className="bg-gray-50 dark:bg-[#0F172A] rounded-lg p-4 space-y-3">
                            <h4 className="font-semibold text-gray-800 dark:text-[#F1F5F9]">مراجعة البيانات</h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">الاسم الكامل</p>
                                    <p className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{formData.firstName} {formData.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">البريد الإلكتروني</p>
                                    <p className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{formData.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">القسم والمسمى</p>
                                    <p className="font-semibold text-gray-800 dark:text-[#F1F5F9]">{formData.position}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400">الراتب الشهري</p>
                                    <p className="font-semibold text-gray-800 dark:text-[#F1F5F9]">${formData.salary}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-3 flex gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-700 dark:text-blue-300">سيتم إرسال بيانات الدخول والبريد الترحيب إلى الموظف الجديد</p>
                        </div>
                    </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 justify-between pt-4 border-t border-gray-200 dark:border-[#334155]">
                    <button
                        type="button"
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#334155] rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        السابق
                    </button>

                    <div className="flex gap-3">
                        <button type="button" className="px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 transition-colors">
                            إلغاء
                        </button>
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={() => setStep(step + 1)}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#6C4CF1] rounded-lg hover:bg-[#5b3ee0] transition-colors"
                            >
                                التالي
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Check className="w-4 h-4" />
                                إضافة الموظف
                            </button>
                        )}
                    </div>
                </div>
            </motion.form>
        </div>
    );
}
