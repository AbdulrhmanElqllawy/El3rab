import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import DataTable from '../../../components/DataTable';

const plansData = [
    { id: 1, name: 'أساسي', price: 99, duration: '1 شهر', features: 3, students: 234, status: 'نشط' },
    { id: 2, name: 'احترافي', price: 199, duration: '3 أشهر', features: 7, students: 567, status: 'نشط' },
    { id: 3, name: 'فريق', price: 499, duration: '6 أشهر', features: 12, students: 123, status: 'نشط' },
];

export default function AdminPaymentsPlansView() {
    const [plans, setPlans] = useState(plansData);

    const columns = [
        { key: 'id', label: '#', render: (val) => `#${val}` },
        { key: 'name', label: 'اسم الخطة' },
        { key: 'price', label: 'السعر', render: (val) => `${val} ر.س` },
        { key: 'duration', label: 'المدة' },
        { key: 'features', label: 'الميزات' },
        { key: 'students', label: 'المشتركون' },
        { key: 'status', label: 'الحالة', render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${val === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {val}
            </span>
        )},
    ];

    const actions = [
        { label: 'عرض', icon: <Eye className="w-4 h-4" />, onClick: (item) => alert(`عرض: ${item.name}`) },
        { label: 'تعديل', icon: <Edit2 className="w-4 h-4" />, onClick: (item) => alert(`تعديل: ${item.name}`) },
        { label: 'حذف', icon: <Trash2 className="w-4 h-4" />, className: 'text-red-600 hover:bg-red-50', onClick: (item) => setPlans(plans.filter(p => p.id !== item.id)) },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="خطط الاشتراك"
                description="إدارة خطط الاشتراك والأسعار"
                actions={
                    <motion.button whileHover={{ scale: 1.05 }} className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        خطة جديدة
                    </motion.button>
                }
            />
            <DataTable columns={columns} data={plans} actions={actions} />
        </div>
    );
}
