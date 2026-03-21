import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function TelegramWidgetLogin({ onSuccess, onError }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = '';

        // Define global callback
        window.onTelegramWidgetAuth = async (user) => {
            try {
                // send to backend: POST /api/auth/telegram-widget
                const res = await fetch('/api/auth/telegram-widget', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user),
                });
                const data = await res.json();
                if (res.ok && data.token) {
                    localStorage.setItem('auth_token', data.token);
                    onSuccess(data);
                } else {
                    onError(data.message || 'فشل تسجيل الدخول');
                }
            } catch {
                onError('حدث خطأ في الاتصال بالسيرفر');
            }
        };

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-login', 'el3rabqudrat_bot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-radius', '12');
        script.setAttribute('data-onauth', 'onTelegramWidgetAuth(user)');
        script.setAttribute('data-request-access', 'write');
        containerRef.current.appendChild(script);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#229ED9]/20 border border-[#229ED9]/30 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#229ED9]" />
                </div>
                <div>
                    <p className="text-[#E2E8F0] font-bold text-sm">تسجيل الدخول السريع</p>
                    <p className="text-[#94A3B8] text-xs">اضغط الزر واسمح للبوت بالوصول</p>
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex justify-center min-h-[48px] items-center"
            />

            <p className="text-[#475569] text-xs text-center">
                سيتم استخدام حسابك في تيليجرام فقط للتحقق من هويتك
            </p>
        </motion.div>
    );
}