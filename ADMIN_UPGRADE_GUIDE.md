# ADMIN PAGES UPGRADE PATTERNS & TEMPLATES

## ✅ COMPLETED UPGRADES (Reference Examples)

### 1. ActivityView.jsx - Dashboard Activity Tracking
**Features Implemented:**
- Stats cards with trends
- Advanced data table with sorting & pagination
- Row selection for bulk operations
- Advanced filtering (type, date range, status)
- Expandable details view
- Loading/empty states

**Key Imports:**
```javascript
import AdvancedDataTable from '../../components/AdvancedDataTable';
import AdvancedFilters from '../../components/AdvancedFilters';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
```

### 2. AdminAlertsView.jsx - Alert Management
**Features Implemented:**
- Categorized alerts with severity levels
- Filter by severity & read status
- Stats cards showing counts
- Bulk actions (mark all read, delete all)
- Expandable alert details
- Time formatting utilities

### 3. AdminCoursesAddView.jsx - Multi-Step Form
**Features Implemented:**
- 3-step wizard with progress indicator
- Form validation on each step
- Error display per field
- Review/confirmation step
- Success modal with animation
- Form reset on completion

---

## 🎯 PATTERN TEMPLATES FOR REMAINING PAGES

### PATTERN 1: List/Management Pages (AllView, SearchView, etc.)
```javascript
// Structure:
1. Stats Cards (top section)
2. Filters (advanced filters sidebar)
3. AdvancedDataTable with:
   - Row selection
   - Sorting
   - Pagination
   - Action buttons (edit, delete, view, etc.)
4. BulkActionBar (when rows selected)

// Example: Users, Courses, Questions, Exams
// Key components:
- AdvancedDataTable
- AdvancedFilters
- BulkActionBar
- StatusBadge
- StatCard
```

### PATTERN 2: Create/Add Forms (AddView, CreateView)
```javascript
// Structure:
1. Multi-step form (2-3 steps)
2. Step indicator with progress
3. Form validation per step
4. Review step before submission
5. Success modal

// Example: Add Course, Add Question, Add Payment Plan
// Key components:
- AdminModal
- Form inputs with validation
- Step indicator
```

### PATTERN 3: Edit Forms (EditView, SettingsView)
```javascript
// Structure:
1. Form with existing data pre-filled
2. Field validation
3. Save/Cancel buttons
4. Change history (optional)
5. Success/error notifications

// Example: Edit Course, Edit Profile, Edit Settings
// Key components:
- Form with validation
- AdminModal for confirmations
```

### PATTERN 4: Analytics/Dashboard Pages (AnalyticsView, ReportsView)
```javascript
// Structure:
1. Stat cards with trends
2. Charts (line, bar, pie)
3. Data table with metrics
4. Date range filters
5. Export functionality

// Example: Performance Analytics, Exam Results, Revenue Reports
// Key imports:
- Recharts (already available)
- StatCard
- AdvancedFilters
```

---

## 📋 REMAINING PAGES & RECOMMENDED APPROACH

### HIGH PRIORITY (Most Used)
1. **Support Group** (4 pages)
   - support/TicketsView.jsx - List with status, priority
   - support/ComplaintsView.jsx - List with categorization
   - support/RepliesView.jsx - Thread view
   - support/ArchiveView.jsx - Archived items

2. **Payments Group** (4 pages)
   - payments/PlansView.jsx - List with pricing tiers
   - payments/InvoicesView.jsx - List with download
   - payments/HistoryView.jsx - Transaction list
   - payments/DiscountsView.jsx - Manage coupons

3. **Questions Group** (6 pages)
   - questions/BankView.jsx - List (similar to courses)
   - questions/AddView.jsx - Multi-step form
   - questions/EditView.jsx - Edit form
   - questions/ImportView.jsx - File upload
   - questions/CategoriesView.jsx - Management
   - questions/LevelsView.jsx - Management

### MEDIUM PRIORITY
4. **Exams Group** (5 pages)
5. **Analytics Group** (5 pages)
6. **Content Group** (4 pages)

### LOW PRIORITY
7. **Announcements Group** (4 pages)
8. **Live Broadcasting Group** (4 pages)

---

## 🛠️ UPGRADE CHECKLIST FOR EACH PAGE

When upgrading any admin page:

- [ ] Add stats cards at the top (if relevant)
- [ ] Implement advanced filtering
- [ ] Use AdvancedDataTable for lists
- [ ] Add row selection for bulk operations
- [ ] Implement BulkActionBar
- [ ] Add action buttons (edit, delete, view, archive, etc.)
- [ ] Implement modals for detailed views
- [ ] Add form validation (for create/edit)
- [ ] Use StatusBadge for status indicators
- [ ] Add loading states
- [ ] Add empty states
- [ ] Add error states
- [ ] Use Framer Motion for animations
- [ ] Ensure RTL support (dir="rtl")
- [ ] Support dark mode (dark: classes)
- [ ] Test pagination
- [ ] Test search/filter functionality

---

## 💡 KEY PATTERNS TO APPLY

### Stats Cards Pattern
```javascript
const stats = [
    { label: '...', value: 0, icon: IconName, color: 'purple' },
];

return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
    </div>
);
```

### Filtering Pattern
```javascript
<AdvancedFilters 
    compact={true}
    filters={[
        { id: 'status', label: 'الحالة', type: 'select', options: [...] },
        { id: 'date', label: 'التاريخ', type: 'dateRange' },
    ]}
    onApply={handleApply}
    onReset={handleReset}
/>
```

### Data Table Pattern
```javascript
<AdvancedDataTable
    columns={[
        { key: 'name', label: 'الاسم' },
        { key: 'status', label: 'الحالة', render: (val) => <StatusBadge status={val} /> },
    ]}
    data={data}
    actions={[
        { label: 'عرض', icon: <Eye />, onClick: handleView },
        { label: 'تعديل', icon: <Edit />, onClick: handleEdit },
    ]}
    selectable={true}
    sortable={true}
    pagination={true}
/>
```

### Form with Validation Pattern
```javascript
const [errors, setErrors] = useState({});

const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'مطلوب';
    return newErrors;
};

const handleSubmit = (e) => {
    const errs = validate();
    if (Object.keys(errs).length) {
        setErrors(errs);
        return;
    }
    // Submit...
};

// In JSX:
<input 
    value={value}
    onChange={...}
    className={errors.name ? 'border-red-500' : 'border-gray-200'}
/>
{errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}
```

---

## 📊 EXAMPLE IMPLEMENTATIONS

### Example 1: Support Tickets List Page
```javascript
// Should include:
- Stat: Total tickets, open, closed, assigned
- Filter: Status, priority, category, date range
- Table: ID, Title, Customer, Status, Priority, Assigned To
- Actions: View, Reply, Close, Reassign
- Bulk actions: Close multiple, Reassign multiple
```

### Example 2: Payments/Invoices Page
```javascript
// Should include:
- Stat: Total revenue, pending, paid, refunded
- Filter: Status, date range, payment method, customer
- Table: Invoice ID, Customer, Amount, Status, Date, Due Date
- Actions: View, Download, Send Reminder, Refund
- Chart: Revenue trend
```

### Example 3: Questions Management Page
```javascript
// Should include:
- Stat: Total questions, by category, by difficulty
- Filter: Category, difficulty, status, type
- Table: ID, Question text, Category, Difficulty, Type
- Actions: View, Edit, Delete, Preview
- Bulk actions: Delete multiple, Change category
```

---

## 🎨 COLOR & STATUS REFERENCE

### Status Color Mapping
```javascript
{
    active: 'approved',      // green
    inactive: 'inactive',    // gray
    pending: 'pending',      // amber
    banned: 'banned',        // red
    approved: 'approved',    // green
    rejected: 'rejected',    // red
    published: 'published',  // blue
    draft: 'draft',          // gray
    archived: 'archived',    // slate
}
```

### Color Palette
```javascript
purple: '#6C4CF1'  (primary)
teal:   '#00C2A8'  (secondary)
amber:  '#FFD166'  (warning)
red:    '#EF4444'  (danger)
green:  '#10B981'  (success)
blue:   '#3B82F6'  (info)
```

---

## 🚀 NEXT STEPS FOR FULL UPGRADE

1. Use this template for Support pages (highest impact)
2. Apply pattern to Payments pages
3. Continue with Questions group
4. Apply to remaining groups

Each page typically requires:
- 200-400 lines of well-structured code
- Proper state management with useState
- Form validation where needed
- Error/loading/empty states
- Framer Motion animations
- Tailwind responsive design
- RTL support
- Dark mode support

---

## 📝 NAMING CONVENTION
- List pages: `xxxAllView.jsx` or `xxxView.jsx`
- Add pages: `xxxAddView.jsx` or `xxxCreateView.jsx`
- Edit pages: `xxxEditView.jsx`
- Details pages: `xxxDetailsView.jsx`
- Analytics: `xxxAnalyticsView.jsx`

---

Updated: 2024-03-21
Reference Components Available In:
`src/components/dashboard/components/`
