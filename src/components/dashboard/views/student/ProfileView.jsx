import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Award, Edit2, Save, X } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { Card, CardHeader, CardBody } from '../../components/EnhancedCardComponents';

const studentData = {
    name: 'عبد الرحمن محمد',
    email: 'abdulrhman@example.com',
    phone: '+966 50 1234567',
    location: 'الرياض، المملكة العربية السعودية',
    avatar: '👨‍🎓',
    level: 'متوسط',
    joinDate: '2024-01-15',
    courses: 12,
    completedCourses: 5,
    totalScore: 78,
};

export default function StudentProfileView() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(studentData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here we would save to backend
    };

    return (
        <div className="p-4 lg:p-6 space-y-8" dir="rtl">
            <PageHeader
                title="ملفي الشخصي"
                description="عرض وتعديل معلومات حسابك"
                breadcrumbs={['الرئيسية', 'الملف الشخصي']}
            />

            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card elevated>
                    <CardBody>
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <div className="text-6xl">{profile.avatar}</div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">مستوى: <span className="font-semibold text-[#6C4CF1]">{profile.level}</span></p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">انضم في: {profile.joinDate}</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                                    isEditing
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : 'bg-[#6C4CF1] text-white hover:bg-[#5b3ee0]'
                                }`}
                            >
                                {isEditing ? (
                                    <>
                                        <X className="w-4 h-4" />
                                        إلغاء
                                    </>
                                ) : (
                                    <>
                                        <Edit2 className="w-4 h-4" />
                                        تعديل
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card elevated>
                        <CardBody>
                            <div className="text-center">
                                <Award className="w-8 h-8 text-[#6C4CF1] mx-auto mb-3" />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">إجمالي الدورات</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{profile.courses}</p>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <Card elevated>
                        <CardBody>
                            <div className="text-center">
                                <Award className="w-8 h-8 text-green-500 mx-auto mb-3" />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">الدورات المكتملة</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{profile.completedCourses}</p>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card elevated>
                        <CardBody>
                            <div className="text-center">
                                <Award className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">المتوسط العام</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{profile.totalScore}%</p>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>

            {/* Personal Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
            >
                <Card elevated>
                    <CardHeader title="المعلومات الشخصية" />
                    <CardBody>
                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الاسم</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-[#334155] rounded-lg bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white"
                                    />
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400">{profile.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    البريد الإلكتروني
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-[#334155] rounded-lg bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white"
                                    />
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    الهاتف
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-[#334155] rounded-lg bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white"
                                    />
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400">{profile.phone}</p>
                                )}
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    الموقع
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={profile.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-[#334155] rounded-lg bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white"
                                    />
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400">{profile.location}</p>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSave}
                                className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                حفظ التغييرات
                            </motion.button>
                        )}
                    </CardBody>
                </Card>
            </motion.div>
        </div>
    );
}
