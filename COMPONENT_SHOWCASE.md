# 📚 Component Showcase & Usage Examples

## Overview
This file demonstrates all new dashboard components with real usage examples and best practices.

---

## 1. Enhanced Stat Card

### Basic Usage
```jsx
import EnhancedStatCard from '../components/EnhancedStatCard';
import { Users, Activity } from 'lucide-react';

// Simple stat card
<EnhancedStatCard
    label="Total Users"
    value={865}
    icon={Users}
    color="purple"
/>

// With comparison indicator
<EnhancedStatCard
    label="Total Users"
    value={865}
    icon={Users}
    color="purple"
    comparison={{ value: '+68', direction: 'up' }}
/>

// With custom format
<EnhancedStatCard
    label="Revenue"
    value={15250}
    icon={Activity}
    color="teal"
    format="currency"
    comparison={{ value: '+22%', direction: 'up' }}
/>

// Loading state
<EnhancedStatCard
    label="Total Users"
    value={0}
    icon={Users}
    loading={true}
/>

// All props
<EnhancedStatCard
    label="الطلاب النشطون"
    value={450}
    icon={Users}
    color="green"
    format="number"
    size="lg"
    comparison={{ value: '+15', direction: 'up' }}
    subtitle="هذا الشهر"
    loading={false}
    onClick={() => handleCardClick()}
/>
```

### Stat Card Group
```jsx
import { StatCardGroup } from '../components/EnhancedStatCard';

const stats = [
    {
        id: 1,
        label: 'Total Users',
        value: 865,
        icon: Users,
        color: 'purple',
        comparison: { value: '+68', direction: 'up' },
    },
    {
        id: 2,
        label: 'Exams This Month',
        value: 4200,
        icon: Activity,
        color: 'teal',
        comparison: { value: '+22%', direction: 'up' },
    },
    // ... more stats
];

<StatCardGroup
    stats={stats}
    columns={4}  // Responsive: 1 mobile, 2 tablet, 4 desktop
    loading={false}
/>
```

---

## 2. Enhanced Data Table

### Basic Usage
```jsx
import EnhancedDataTable from '../components/EnhancedDataTable';

const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: false },
    { key: 'status', label: 'Status' },
];

const data = [
    { name: 'Ahmed', email: 'ahmed@ex.com', role: 'Student', status: 'Active' },
    { name: 'Sarah', email: 'sarah@ex.com', role: 'Teacher', status: 'Active' },
];

<EnhancedDataTable
    columns={columns}
    data={data}
    loading={false}
/>
```

### With Custom Rendering
```jsx
const columns = [
    { key: 'name', label: 'Name' },
    { 
        key: 'score',
        label: 'Score',
        sortable: true,
        render: (value) => (
            <span className={value >= 80 ? 'text-green-600' : 'text-red-600'}>
                {value}%
            </span>
        )
    },
    {
        key: 'status',
        label: 'Status',
        render: (value) => (
            <StatusBadge 
                status={{
                    type: value === 'active' ? 'success' : 'neutral',
                    label: value === 'active' ? 'Active' : 'Inactive'
                }}
            />
        )
    },
];

<EnhancedDataTable
    columns={columns}
    data={userData}
    loading={loadingState}
    searchPlaceholder="البحث عن مستخدم..."
    onRowClick={(row) => handleRowClick(row)}
/>
```

---

## 3. Enhanced Empty State

### Basic Usage
```jsx
import EmptyState from '../components/EnhancedEmptyState';
import { InboxIcon } from 'lucide-react';

<EmptyState
    icon={InboxIcon}
    title="No data available"
    description="Create an item to get started"
/>
```

### With Action
```jsx
<EmptyState
    title="No Users"
    description="Start by adding a new user"
    action={{
        label: 'Add User',
        onClick: () => router.push('/create-user')
    }}
/>
```

### Different Sizes
```jsx
// Small
<EmptyState size="sm" title="Empty" />

// Medium (default)
<EmptyState size="md" title="Empty" />

// Large
<EmptyState size="lg" title="Empty" />
```

### Empty State Variations
```jsx
import {
    EmptyState,
    NoSearchResults,
    NoPermissionState,
    ErrorState
} from '../components/EnhancedEmptyState';

// Search results
{filteredData.length === 0 && (
    <NoSearchResults searchTerm={searchTerm} />
)}

// No permission
{!hasAccess && (
    <NoPermissionState />
)}

// Error occurred
{error && (
    <ErrorState
        title="خطأ في التحميل"
        description="حاول بإعادة المحاولة لاحقاً"
        onRetry={() => reloadData()}
    />
)}
```

---

## 4. Card Components

### Card with Header and Footer
```jsx
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    StatusBadge
} from '../components/EnhancedCardComponents';

<Card elevated interactive>
    <CardHeader
        title="Users"
        subtitle="List of all active users"
        action={<Button>Export</Button>}
    />
    <CardBody>
        <EnhancedDataTable {...tableProps} />
    </CardBody>
    <CardFooter>
        <StatusBadge status={{ type: 'success', label: 'All Good' }} />
        <div>12 users total</div>
    </CardFooter>
</Card>
```

### Simple Card
```jsx
<Card className="p-6">
    <h3 className="text-lg font-bold mb-4">Quick Info</h3>
    <p className="text-gray-600">Some content here</p>
</Card>
```

### Status Badges
```jsx
import { StatusBadge } from '../components/EnhancedCardComponents';

// Success
<StatusBadge
    status={{ type: 'success', label: 'Active' }}
    size="md"
/>

// Error
<StatusBadge
    status={{ type: 'error', label: 'Inactive' }}
    size="md"
/>

// Variants: 'success', 'error', 'warning', 'info', 'primary', 'secondary'
```

### Progress Badge
```jsx
import { ProgressBadge } from '../components/EnhancedCardComponents';

<ProgressBadge percentage={65} size="md" showLabel={true} />
// Shows: ===== 65%

// Without label
<ProgressBadge percentage={78} showLabel={false} />

// Sizes: 'sm', 'md', 'lg'
```

### Tags
```jsx
import { Tag } from '../components/EnhancedCardComponents';

<div className="flex gap-2 flex-wrap">
    <Tag label="React" variant="primary" />
    <Tag label="Tailwind" variant="primary" />
    <Tag
        label="Removable"
        onRemove={() => removeTag('removable')}
        variant="secondary"
    />
</div>

// Variants: 'default', 'primary', 'success', 'error'
```

### Skeleton Loaders
```jsx
import { Skeleton } from '../components/EnhancedCardComponents';

{loading ? (
    <div className="space-y-4">
        <Skeleton width="100%" height="40px" />
        <Skeleton width="100%" height="40px" />
        <Skeleton width="100%" height="40px" count={3} />
    </div>
) : (
    <DataTable {...props} />
)}

// Variants: 'rectangular' (default), 'circular'
```

---

## 5. Complete Page Example

### Full Admin Dashboard
```jsx
import React, { useState, useEffect } from 'react';
import { Users, Activity, BookOpen, HelpCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { StatCardGroup } from '../components/EnhancedStatCard';
import EnhancedDataTable from '../components/EnhancedDataTable';
import { Card, CardHeader, CardBody } from '../components/EnhancedCardComponents';
import EmptyState from '../components/EnhancedEmptyState';

export default function AdminDashboard() {
    const [stats, setStats] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // API calls
            setStats([...]);
            setUsers([...]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 lg:p-6 space-y-8" dir="rtl">
            {/* Header */}
            <PageHeader
                title="لوحة التحكم"
                description="عرض شامل لأداء النظام"
                breadcrumbs={['الرئيسية']}
            />

            {/* Stats */}
            <div>
                <h2 className="text-lg font-bold mb-4">الإحصائيات الرئيسية</h2>
                <StatCardGroup
                    stats={stats}
                    columns={4}
                    loading={loading}
                />
            </div>

            {/* Users Table */}
            <Card elevated>
                <CardHeader title="أحدث المستخدمين" />
                <CardBody>
                    {users.length === 0 && !loading ? (
                        <EmptyState
                            title="لا توجد مستخدمين"
                            action={{ label: 'إضافة مستخدم' }}
                        />
                    ) : (
                        <EnhancedDataTable
                            columns={[
                                { key: 'name', label: 'الاسم', sortable: true },
                                { key: 'email', label: 'البريد', sortable: true },
                                { key: 'role', label: 'الدور' },
                            ]}
                            data={users}
                            loading={loading}
                        />
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
```

---

## 6. Design Tokens Usage

### Importing Tokens
```jsx
import {
    SPACING,
    SHADOWS,
    COLORS,
    BORDER_RADIUS,
    TRANSITIONS,
    TYPOGRAPHY,
} from '../components/DesignTokens';

// Using spacing
<div className="space-y-8">  {/* lg */}
    <div className="space-y-6">{/* lg */}
        <div className="space-y-4">  {/* md */}
    </div>
</div>

// Using colors
<div style={{ color: COLORS.primary }}>
<div style={{ backgroundColor: COLORS.gray[100] }}>
<div style={{ borderColor: COLORS.danger }}>

// Using transitions
<motion.div
    transition={{ duration: 0.2 }}  // Use TRANSITIONS.base
    className="transition-all"
>
```

### Tailwind Integration
```jsx
// Direct Tailwind classes (preferred)
<div className="space-y-6">  {/*= SPACING.lg */}
<div className="p-6">  {/* padding: SPACING.lg */}
<div className="rounded-lg">  {/* = BORDER_RADIUS.md */}
<div className="shadow-md">  {/* = SHADOWS.md */}
<div className="text-gray-900 dark:text-white">  {/* COLORS mapped */}
```

---

## 7. Best Practices

### DO ✅
```jsx
// Use StatCardGroup for multiple cards
<StatCardGroup stats={stats} columns={4} />

// Use EnhancedDataTable for any table
<EnhancedDataTable columns={cols} data={data} />

// Use EmptyState for empty pages
{emptyData && <EmptyState {...props} />}

// Use Card components for grouping
<Card><CardHeader /><CardBody /></Card>

// Use DesignTokens for spacing
className="space-y-6 p-6"  {/* SPACING.lg */}

// Add loading states
<StatCardGroup loading={loading} />

// Show skeletons while loading
{loading && <Skeleton count={3} />}
```

### DON'T ❌
```jsx
// Don't hardcode spacing
className="mt-32 p-20"  ❌

// Don't create custom colors
style={{ color: '#ff6b9d' }}  ❌

// Don't mix card styles
<div className="p-4 rounded-2xl">  ❌

// Don't forget empty states
{data.length === 0 && null}  ❌

// Don't skip loading states
data.map(...)  // No skeleton  ❌

// Don't mix animation times
transition={{ duration: 1.5 }}  ❌
```

---

## 8. Common Patterns

### Pattern 1: Data Fetching with Loading
```jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    loadData();
}, []);

const loadData = async () => {
    setLoading(true);
    try {
        const res = await api.getData();
        setData(res);
    } catch (error) {
        setData([]);
    } finally {
        setLoading(false);
    }
};

return (
    <EnhancedDataTable
        data={data}
        loading={loading}
    />
);
```

### Pattern 2: Search & Filter
```jsx
const [search, setSearch] = useState('');
const [filtered, setFiltered] = useState(data);

useEffect(() => {
    const results = data.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(search.toLowerCase())
        )
    );
    setFiltered(results);
}, [search, data]);

// EnhancedDataTable has built-in search

return (
    <EnhancedDataTable
        data={data}
        searchPlaceholder="ابحث..."
    />
);
```

### Pattern 3: Empty/Loading States
```jsx
if (loading) {
    return <Skeleton count={5} />;
}

if (error) {
    return <ErrorState onRetry={handleRetry} />;
}

if (data.length === 0) {
    return <EmptyState action={{ label: 'Create' }} />;
}

return <EnhancedDataTable data={data} />;
```

---

## 📖 Component Reference

| Component | File | Use Case |
|-----------|------|----------|
| EnhancedStatCard | `EnhancedStatCard.jsx` | Display metrics with trends |
| StatCardGroup | `EnhancedStatCard.jsx` | Multiple stat cards in grid |
| EnhancedDataTable | `EnhancedDataTable.jsx` | Display tabular data |
| EmptyState | `EnhancedEmptyState.jsx` | No data screens |
| Card | `EnhancedCardComponents.jsx` | Container/grouping |
| CardHeader | `EnhancedCardComponents.jsx` | Card title section |
| CardBody | `EnhancedCardComponents.jsx` | Card content area |
| CardFooter | `EnhancedCardComponents.jsx` | Card actions footer |
| StatusBadge | `EnhancedCardComponents.jsx` | Status indicators |
| ProgressBadge | `EnhancedCardComponents.jsx` | Progress bars |
| Tag | `EnhancedCardComponents.jsx` | Removable labels |
| Skeleton | `EnhancedCardComponents.jsx` | Loading placeholder |

---

## 🎓 Resources

- Component files: Full JSDoc comments
- `DESIGN_SYSTEM.md`: Visual specifications
- `DASHBOARD_UI_UX_GUIDE.md`: Implementation guide
- `EnhancedAdminDashboard.jsx`: Complete example

---

**Start using these components today for professional SaaS-grade UI! 🚀**
