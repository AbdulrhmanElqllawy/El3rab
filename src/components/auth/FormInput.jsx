import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function FormInput({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    hint,
    required = false,
    autoComplete,
    icon: Icon,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-semibold text-slate-300">
                    {label}
                    {required && <span className="text-amber-400 mr-1">*</span>}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <input
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    autoComplete={autoComplete}
                    className={`w-full bg-slate-800/60 border ${
                        error ? 'border-red-500 focus:border-red-400' : 'border-slate-600/60 focus:border-amber-500/80'
                    } text-white placeholder-slate-500 rounded-xl py-4 px-4 ${Icon ? 'pr-12' : ''} ${isPassword ? 'pl-12' : ''} text-base outline-none transition-all duration-200 focus:bg-slate-800/80 focus:ring-2 focus:ring-amber-500/20`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                    <span>⚠</span> {error}
                </p>
            )}
            {hint && !error && (
                <p className="text-slate-500 text-xs">{hint}</p>
            )}
        </div>
    );
}