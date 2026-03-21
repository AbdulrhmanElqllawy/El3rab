import React from 'react';

function Skeleton({ className = '' }) {
    return <div className={`animate-pulse bg-gray-200 dark:bg-[#334155]/60 rounded-xl ${className}`} />;
}

export default function LoadingSkeleton() {
    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28" />)}
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
                <Skeleton className="h-64" />
                <Skeleton className="h-64" />
            </div>
            <Skeleton className="h-40" />
        </div>
    );
}