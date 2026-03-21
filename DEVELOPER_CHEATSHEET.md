# Dashboard Developer Quick Reference

## 🚀 Quick Start Commands

### Add a New Admin Page

**Step 1: Create the component**
```javascript
// src/components/dashboard/views/admin/myfeature/MyFeatureView.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';

export default function MyFeatureView() {
    return (
        <div className="p-4 lg:p-6 space-y-6" dir="rtl">
            <PageHeader title="My Feature" description="Description" />
            {/* Your content */}
        </div>
    );
}
```

**Step 2: Import in DashboardLayout.jsx**
```javascript
import MyFeatureView from './views/admin/myfeature/MyFeatureView';
```

**Step 3: Add to ADMIN_VIEWS**
```javascript
const ADMIN_VIEWS = {
    my_feature: MyFeatureView,
    // ... other views
};
```

**Step 4: Update sidebarConfig.jsx**
```javascript
{
    id: 'my_feature',
    label: 'My Feature',
    icon: 'IconName'
}
```

---

## 📱 Responsive Classes

```javascript
// Mobile-first responsive design
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"

// Hide on mobile
className="hidden md:block lg:flex"

// Show only on mobile
className="md:hidden"

// Padding responsive
className="p-4 lg:p-6"

// Text size responsive
className="text-sm md:text-base lg:text-lg"
```

---

## 🎨 Tailwind Patterns

### Success State
```jsx
className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-100"
```

### Loading State
```jsx
className="animate-pulse bg-gray-200 dark:bg-[#334155] rounded-lg"
```

### Hover Effects
```jsx
className="hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
```

### Border & Shadow
```jsx
className="border border-gray-100 dark:border-[#334155]/50 shadow-sm dark:shadow-none"
```

### Gradient Background
```jsx
className="bg-gradient-to-r from-[#6C4CF1] to-[#00C2A8]"
```

---

## 🎬 Animation Patterns

### Fade In
```jsx
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
>
    Content
</motion.div>
```

### Slide In
```jsx
<motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
>
    Content
</motion.div>
```

### Scale In
```jsx
<motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
>
    Content
</motion.div>
```

### List Stagger
```jsx
{items.map((item, idx) => (
    <motion.div
        key={idx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
    >
        {item}
    </motion.div>
))}
```

---

## 📊 Chart Examples

### Line Chart
```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="name" stroke="#94A3B8" />
        <YAxis stroke="#94A3B8" />
        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none' }} />
        <Line type="monotone" dataKey="value" stroke="#6C4CF1" strokeWidth={2} />
    </LineChart>
</ResponsiveContainer>
```

### Bar Chart
```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="name" stroke="#94A3B8" />
        <YAxis stroke="#94A3B8" />
        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none' }} />
        <Bar dataKey="value" fill="#6C4CF1" />
    </BarChart>
</ResponsiveContainer>
```

---

## 📋 Form Pattern

```javascript
const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
});

const [errors, setErrors] = useState({});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }
    
    // Submit
    console.log('Submitting:', formData);
};

return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label>Name *</label>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#6C4CF1] focus:outline-none"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>
        
        <button type="submit" className="bg-[#6C4CF1] text-white px-6 py-2.5 rounded-lg">
            Submit
        </button>
    </form>
);
```

---

## 🔍 Common Icon Names (from Lucide)

```javascript
// Navigation
Menu, ChevronDown, ChevronRight, ChevronLeft, ChevronUp, Home, Search

// Status
CheckCircle2, AlertCircle, Clock, Eye, EyeOff, X, Plus, Edit2, Trash2

// Business
Users, LayoutDashboard, BarChart3, TrendingUp, Calendar, BookOpen, Brain, Radio

// Content
FileText, Mail, Phone, MapPin, User, UserCircle, Settings, HelpCircle, Megaphone

// Actions
Download, Upload, Send, Share2, Copy, Lock, Unlock, Save, RefreshCw
```

---

## 🎯 Status Badge Patterns

```jsx
// Success
<span className="px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-800">
    Active
</span>

// Pending
<span className="px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-800">
    Pending
</span>

// Error
<span className="px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-800">
    Failed
</span>

// Info
<span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-800">
    Info
</span>
```

---

## 🧬 State Management Pattern

```javascript
const [state, setState] = useState({
    items: [],
    loading: false,
    error: null,
    filters: { search: '', status: 'all' }
});

const handleFetch = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
        const data = await fetchData();
        setState(prev => ({ ...prev, items: data, loading: false }));
    } catch (error) {
        setState(prev => ({ ...prev, error: error.message, loading: false }));
    }
};

const handleFilter = (key, value) => {
    setState(prev => ({
        ...prev,
        filters: { ...prev.filters, [key]: value }
    }));
};
```

---

## 🔗 API Integration Pattern

```javascript
// Before (Dummy Data)
const [data, setData] = useState(dummyData);

// After (Real API)
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
        const response = await fetch('/api/items');
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
    }
});

if (isLoading) return <LoadingSkeleton />;
if (error) return <ErrorState error={error} />;

return <DataTable data={data} columns={columns} />;
```

---

## 🎨 Creating Custom Stat Card

```jsx
<motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white dark:bg-[#1E293B] rounded-xl p-4 border border-gray-100 dark:border-[#334155]/50"
>
    <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-[#6C4CF1]/10">
            <Icon className="w-5 h-5 text-[#6C4CF1]" />
        </div>
        <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Label</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">Value</p>
        </div>
    </div>
</motion.div>
```

---

## 📱 Mobile-First Grid Layout

```jsx
// Default: 1 column
// md: 2 columns  
// lg: 3 columns
// xl: 4 columns
<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {items.map(item => (
        <Card key={item.id}>{item.name}</Card>
    ))}
</div>
```

---

## 🚨 Error Boundary Pattern

```jsx
class ErrorBoundary extends React.Component {
    state = { hasError: false };
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    componentDidCatch(error, info) {
        console.error('Error:', error, info);
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 text-center">
                    <h1>Something went wrong</h1>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Try again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
```

---

## 🎯 Performance Optimization

```javascript
// Memoize components
const DataTable = React.memo(({ data, columns }) => {
    return (/* render table */);
});

// Memoize callbacks
const handleClick = useCallback(() => {
    fetchData();
}, []);

// Memoize values
const memoizedValue = useMemo(() => {
    return expensiveCalculation(data);
}, [data]);

// Lazy load components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

---

## 🔐 Protected Route Pattern

```jsx
function ProtectedRoute({ children, requiredRole }) {
    const { user, loading } = useDashboard();
    
    if (loading) return <LoadingSkeleton />;
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }
    
    return children;
}

// Usage
<ProtectedRoute requiredRole="admin">
    <AdminDashboard />
</ProtectedRoute>
```

---

## 📊 Table Action Handler

```jsx
const handleViewItem = (item) => {
    console.log('View:', item);
    // Navigate or open modal
};

const handleEditItem = (item) => {
    setEditingId(item.id);
    // Open edit form
};

const handleDeleteItem = (item) => {
    if (confirm('Are you sure?')) {
        setItems(items.filter(i => i.id !== item.id));
        // Call delete API
    }
};

const actions = [
    { label: 'View', icon: <Eye className="w-4 h-4" />, onClick: handleViewItem },
    { label: 'Edit', icon: <Edit2 className="w-4 h-4" />, onClick: handleEditItem },
    { label: 'Delete', icon: <Trash2 className="w-4 h-4" />, className: 'text-red-600 hover:bg-red-50', onClick: handleDeleteItem },
];
```

---

## 🎓 Common Issues & Solutions

### Problem: Dark mode not working
**Solution**: Ensure `dark:` classes are used and dark mode is enabled in `tailwind.config.js`

### Problem: Animations feel slow
**Solution**: Reduce transition duration and ensure GPU acceleration:
```javascript
className="transition-colors duration-200"
```

### Problem: Charts not responding
**Solution**: Ensure ResponsiveContainer is used and set explicit height

### Problem: Form validation not working
**Solution**: Check onChange handler updates state correctly and validation logic is sound

---

## 🚀 Deployment Checklist

- [ ] Remove all console.log statements
- [ ] Replace dummy data with real API calls
- [ ] Add error handling and logging
- [ ] Test across browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Test dark mode toggle
- [ ] Add loading states
- [ ] Add empty states
- [ ] Implement error boundaries
- [ ] Add analytics tracking
- [ ] Set up error monitoring
- [ ] Optimize bundle size
- [ ] Add security headers
- [ ] Test accessibility

---

> **Remember**: Keep code clean, Well-commented, and Production-ready! 🚀
