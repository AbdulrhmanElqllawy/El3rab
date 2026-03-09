import React from 'react';

function getStrength(password) {
    if (!password) return { score: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score, label: 'ضعيفة جداً', color: 'bg-red-500' };
    if (score === 2) return { score, label: 'ضعيفة', color: 'bg-orange-500' };
    if (score === 3) return { score, label: 'جيدة', color: 'bg-amber-500' };
    return { score, label: 'قوية', color: 'bg-emerald-500' };
}

export default function PasswordStrength({ password }) {
    if (!password) return null;
    const { score, label, color } = getStrength(password);

    return (
        <div className="space-y-2">
            <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= score ? color : 'bg-slate-700'}`}
                    />
                ))}
            </div>
            <p className={`text-xs font-medium ${
                score <= 1 ? 'text-red-400' :
                score === 2 ? 'text-orange-400' :
                score === 3 ? 'text-amber-400' :
                'text-emerald-400'
            }`}>
                قوة كلمة المرور: {label}
            </p>
            <ul className="text-xs text-slate-500 space-y-0.5">
                {password.length < 8 && <li>• 8 أحرف على الأقل</li>}
                {!/[A-Z]/.test(password) && <li>• حرف كبير واحد على الأقل</li>}
                {!/[0-9]/.test(password) && <li>• رقم واحد على الأقل</li>}
                {!/[^A-Za-z0-9]/.test(password) && <li>• رمز خاص (!@#$...)</li>}
            </ul>
        </div>
    );
}