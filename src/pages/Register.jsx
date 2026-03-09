import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { createPageUrl } from '@/utils';

import AuthLayout from '@/components/auth/AuthLayout';
import FormInput from '@/components/auth/FormInput';
import PasswordStrength from '@/components/auth/PasswordStrength';
import TelegramButton from '@/components/auth/TelegramButton';
import Divider from '@/components/auth/Divider';

export default function Register() {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [tgLoading, setTgLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');
    const [success, setSuccess] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const tgWidgetRef = useRef(null);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
        setGlobalError('');
    };

    const validate = () => {
        const newErrors = {};
        if (!form.fullName.trim()) newErrors.fullName = 'الاسم الكامل مطلوب';
        else if (form.fullName.trim().length < 3) newErrors.fullName = 'الاسم يجب أن يكون 3 أحرف على الأقل';

        if (!form.email) newErrors.email = 'البريد الإلكتروني مطلوب';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'البريد الإلكتروني غير صحيح';

        if (!form.password) newErrors.password = 'كلمة المرور مطلوبة';
        else if (form.password.length < 8) newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';

        if (!form.confirmPassword) newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
        else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'كلمتا المرور غير متطابقتين';

        if (!agreed) newErrors.agreed = 'يجب الموافقة على الشروط والأحكام';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setGlobalError('');
        try {
            window.location.href = "/Dashboard";
        } catch {
            setGlobalError('حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    const handleTelegramRegister = () => {
        setTgLoading(true);
        if (tgWidgetRef.current) {
            tgWidgetRef.current.innerHTML = '';
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://telegram.org/js/telegram-widget.js?22';
            script.setAttribute('data-telegram-login', 'YOUR_BOT_USERNAME');
            script.setAttribute('data-size', 'large');
            script.setAttribute('data-radius', '12');
            script.setAttribute('data-onauth', 'onTelegramAuthRegister(user)');
            script.setAttribute('data-request-access', 'write');
            tgWidgetRef.current.appendChild(script);
        }
        window.onTelegramAuthRegister = async (user) => {
            setTgLoading(false);
            console.log('Telegram register user:', user);
            // POST to /api/auth/telegram/register
            window.location.href = createPageUrl('Dashboard');
        };
        setTimeout(() => setTgLoading(false), 3000);
    };
//      const handleSubmit = async () => {
//          setLoading(true)
//          const res = await fetch("/api/register", {
//                  method: "POST",
//                  body: JSON.stringify(form)
//          })
//          const data = await res.json()

//          console.log(data)
//          setLoading(false)
//      }
    
    if (success) {
        return (
            <AuthLayout title="تم إنشاء حسابك!" subtitle="">
                <div className="text-center py-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <p className="text-slate-400">تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.</p>
                    <Link
                        to={createPageUrl('Login')}
                        className="inline-block mt-4 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-900 font-bold px-8 py-3 rounded-xl"
                    >
                        تسجيل الدخول
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="أنشئ حسابك"
            subtitle="انضم لأكثر من 2000 طالب في منصة العراب"
        >
            {/* Telegram Register */}
            <div className="mb-6">
                <TelegramButton
                    label="التسجيل عبر تيليجرام"
                    onClick={handleTelegramRegister}
                    loading={tgLoading}
                />
                <div ref={tgWidgetRef} className="hidden" />
            </div>

            <Divider label="أو أنشئ حساباً بالبريد الإلكتروني" />

            {/* Global Error */}
            <AnimatePresence>
                {globalError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm text-center"
                    >
                        {globalError}
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4" noValidate>
                <FormInput
                    label="الاسم الكامل"
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="مثال: محمد العتيبي"
                    error={errors.fullName}
                    required
                    autoComplete="name"
                    icon={User}
                />

                <FormInput
                    label="البريد الإلكتروني"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    error={errors.email}
                    required
                    autoComplete="email"
                    icon={Mail}
                />

                <div className="space-y-2">
                    <FormInput
                        label="كلمة المرور"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="اختر كلمة مرور قوية"
                        error={errors.password}
                        required
                        autoComplete="new-password"
                        icon={Lock}
                    />
                    <PasswordStrength password={form.password} />
                </div>

                <FormInput
                    label="تأكيد كلمة المرور"
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="أعد كتابة كلمة المرور"
                    error={errors.confirmPassword}
                    required
                    autoComplete="new-password"
                    icon={Lock}
                />

                {/* Terms */}
                <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => {
                                setAgreed(e.target.checked);
                                setErrors(prev => ({ ...prev, agreed: '' }));
                            }}
                            className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 accent-amber-500 cursor-pointer"
                        />
                        <span className="text-slate-400 text-sm leading-relaxed">
                            أوافق على{' '}
                            <a href="#" className="text-amber-400 hover:text-amber-300">الشروط والأحكام</a>
                            {' '}و{' '}
                            <a href="#" className="text-amber-400 hover:text-amber-300">سياسة الخصوصية</a>
                        </span>
                    </label>
                    {errors.agreed && (
                        <p className="text-red-400 text-xs mt-1">⚠ {errors.agreed}</p>
                    )}
                </div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-slate-900 font-black text-lg py-4 rounded-2xl shadow-xl shadow-amber-500/20 transition-all duration-200"
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    ) : (
                        <>
                            إنشاء حساب مجاناً
                            <ArrowLeft className="w-5 h-5" />
                        </>
                    )}
                </motion.button>
            </form>

            {/* Login Link */}
            <p className="text-center text-slate-500 text-sm mt-6">
                لديك حساب بالفعل؟{' '}
                <Link to={createPageUrl('Login')} className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
                    سجّل دخولك
                </Link>
            </p>
        </AuthLayout>
    );
}