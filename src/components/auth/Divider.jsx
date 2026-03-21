import React from 'react';

export default function Divider({ label = 'أو' }) {
    return (
        <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-slate-500 text-sm font-medium px-2">{label}</span>
            <div className="flex-1 h-px bg-slate-700" />
        </div>
    );
}