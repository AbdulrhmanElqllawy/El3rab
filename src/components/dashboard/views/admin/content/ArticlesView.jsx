import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import PageHeader from '../../../components/PageHeader';
import DataTable from '../../../components/DataTable';

const articlesData = [
    { id: 1, title: 'نصائح للنجاح في الاختبار', author: 'أ. محمد', date: '2024-03-20', views: 234, status: 'منشور' },
    { id: 2, title: 'كيفية إدارة الوقت في الدراسة', author: 'أ. فاطمة', date: '2024-03-19', views: 156, status: 'منشور' },
];

export default function AdminContentArticlesView() {
    const [articles, setArticles] = useState(articlesData);

    const columns = [
        { key: 'id', label: '#', render: (val) => `#${val}` },
        { key: 'title', label: 'العنوان' },
        { key: 'author', label: 'الكاتب' },
        { key: 'date', label: 'التاريخ' },
        { key: 'views', label: 'المشاهدات', render: (val) => `${val} مشاهدة` },
        { key: 'status', label: 'الحالة', render: (val) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${val === 'منشور' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {val}
            </span>
        )},
    ];

    const actions = [
        { label: 'عرض', icon: <Eye className="w-4 h-4" />, onClick: (item) => alert(`عرض: ${item.title}`) },
        { label: 'تعديل', icon: <Edit2 className="w-4 h-4" />, onClick: (item) => alert(`تعديل: ${item.title}`) },
        { label: 'حذف', icon: <Trash2 className="w-4 h-4" />, className: 'text-red-600 hover:bg-red-50', onClick: (item) => setArticles(articles.filter(a => a.id !== item.id)) },
    ];

    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader
                title="المقالات"
                description="إدارة المقالات والمحتوى التعليمي"
                actions={
                    <motion.button whileHover={{ scale: 1.05 }} className="w-full sm:w-auto bg-[#6C4CF1] text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5b3ee0] transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        مقالة جديدة
                    </motion.button>
                }
            />
            <DataTable columns={columns} data={articles} actions={actions} />
        </div>
    );
}
