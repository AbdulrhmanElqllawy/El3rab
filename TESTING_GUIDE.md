# 🧪 Dashboard Testing & Navigation Guide

## 🎯 How to Test All Generated Pages

### Prerequisites
- Your app should be running
- You're logged into the dashboard
- You have access to different roles (student/employee/admin)

---

## 👨‍🎓 Student Dashboard Testing

### Access Student Pages
1. **Ensure you're logged in as a student**
2. **Navigate through Sidebar Items:**

| Page | Sidebar Item | Features to Test |
|------|--------------|------------------|
| **Courses** | 📚 الدورات | Filter by status, View course details, Progress tracking |
| **Plans** | 📋 خطط المذاكرة | View study plans, Progress visualization, Status badges |
| **Analytics** | 📊 التحليلات | Charts rendering, Weekly performance data |
| **Live Classes** | 📡 البث المباشر | Live badge animation, Button states for live/scheduled/completed |
| **Profile** | 👤 الملف الشخصي | Edit profile, View stats, Avatar section |

### Student Page Test Checklist

```
Courses Page:
☐ Filter buttons work (All/Active/Completed)
☐ Course cards display correctly
☐ Progress bars animate
☐ "Start Now" / "Continue" buttons clickable
☐ Rating stars visible
☐ Responsive on mobile

Plans Page:
☐ Study plans display with progress
☐ Progress bars fill correctly
☐ Status colors visible
☐ "View Details" buttons clickable
☐ Warning box displays at bottom
☐ Date ranges show properly

Analytics Page:
☐ Line chart renders with 7 days of data
☐ Bar chart shows 4 categories
☐ Stat cards display with colors
☐ Color gradient on stat cards works
☐ Charts responsive on container resize

Live Classes Page:
☐ Live badge pulses with red color
☐ Status badges color correctly (red/blue/gray)
☐ Attendee count displays
☐ Button states change (Join Now/Remind/Watch)
☐ Time and date information visible

Profile Page:
☐ Avatar circle displays
☐ Edit/Save button toggle works
☐ Form inputs enable/disable correctly
☐ Save button submits form data
☐ Stats cards display
☐ Dark mode text visible
```

---

## 👨‍💼 Employee Dashboard Testing

### Access Employee Pages
1. **Switch role to Employee**
2. **Navigate through Sidebar Items:**

| Page | Sidebar Item | Features to Test |
|------|--------------|------------------|
| **Questions** | ❓ إدارة الأسئلة | Add/Edit/Delete in table, Search functionality |
| **Courses** | 📚 إدارة الكورسات | CRUD operations on courses |
| **Live** | 📡 البث المباشر | Manage broadcasts, Edit/Delete functionality |
| **Support** | 💬 الدعم الفني | View support tickets, Stat cards update |

### Employee Page Test Checklist

```
Questions Management:
☐ "Add New" button visible
☐ Table headers display correctly
☐ Data rows show questions
☐ Level badges color correctly (green/yellow/red)
☐ Status badges show states
☐ Search input filters questions
☐ Pagination works (if >10 items)
☐ Edit/View/Delete buttons clickable

Courses Management:
☐ List of courses displays
☐ Student count shows
☐ Status badges visible
☐ "Add New Course" button works
☐ "Edit" button opens form
☐ "Delete" button removes item

Live Broadcasts:
☐ Broadcast cards display
☐ Status badges color correctly
☐ Attendee count shows
☐ Time information visible
☐ Action buttons clickable

Support Tickets:
☐ Three stat cards at top (Open/Pending/Closed)
☐ Stat card values display
☐ Stat icons visible
☐ Ticket table shows
☐ Search filters tickets
☐ Status color coding works
☐ Priority badges visible
```

---

## 🛡️ Admin Dashboard Testing

### Access Admin Pages
1. **Switch role to Admin**
2. **You'll see many more sidebar items**

### Admin Dashboard Group

#### Activity View (آخر النشاطات)
```
☐ Recent activity list displays
☐ Activity type icons show
☐ Time stamps visible
☐ User names display
☐ Hover effects on items
☐ Smooth scroll if many items
```

#### Alerts View (التنبيهات)
```
☐ High severity alert shows red (bg-red-50)
☐ Medium severity shows yellow
☐ Low severity shows blue
☐ X button appears on hover
☐ Close button removes alerts
☐ Badges show severity level
☐ Icons display correctly
```

---

### User Management Pages

#### All Users (جميع المستخدمين)
```
☐ Data table shows all users
☐ Search box filters users
☐ View/Edit/Delete buttons appear
☐ User count col
✓ Email column displays
☐ Pagination shows if needed
☐ Responsive table on mobile
```

#### Other User Pages
- `users_students` - Filter to show only students
- `users_search` - Advanced search interface
- `users_banned` - Ban/unban list
- `users_log` - Activity logs

---

### Course Management Pages (6 Pages)

#### 1. All Courses (جميع الكورسات)
```
☐ List of all courses displays
☐ Instructor names visible
☐ Student count shows
☐ Lesson count shows
☐ Status badges work
☐ Add/Edit/Delete buttons work
☐ Search filters courses
```

#### 2. Add Course (إضافة كورس)
```
☐ Form displays all fields
☐ Course name input works
☐ Instructor input works
☐ Category dropdown populated
☐ Level dropdown works
☐ Price input accepts numbers
☐ Description textarea works
☐ Save button active
☐ Cancel button works
```

#### 3. Manage Lessons (إدارة الدروس)
```
☐ Lesson list displays
☐ Lesson order shows
☐ Duration displays
☐ Status badges color correctly
☐ Add button works
☐ Edit/Delete buttons work
```

#### 4. Manage Videos (إدارة الفيديوهات)
```
☐ Video list displays
☐ Video titles show
☐ Duration displays
☐ File size shows
☐ Status badges work
☐ Add button visible
☐ Action buttons work
```

#### 5. Manage Files (إدارة الملفات)
```
☐ File list displays
☐ File names show
☐ File type visible
☐ Upload date shows
☐ Download button works
☐ Edit/Delete work
```

---

### Exam Management Pages (2 Pages Created, 3 Placeholder)

#### 1. Create Exam (إنشاء اختبار)
```
☐ Exam list displays
☐ Question count shows
☐ Duration field shows
☐ Passing score shows
☐ Category shows
☐ Status badges work
☐ Add/Edit/Delete work
```

#### 2. Results (نتائج الاختبارات)
```
☐ Bar chart renders (passed vs failed)
☐ Line chart shows performance trend
☐ Chart data is visible
☐ Tooltips work on hover
☐ Charts responsive
```

---

### Live Broadcast Management (1 Page Created, 3 Placeholder)

#### Create/Manage Broadcasts (إنشاء بث)
```
☐ Broadcast list displays
☐ Live badge animates (red pulse)
☐ Speaker names show
☐ Attend count shows (if live)
☐ Status badges color correctly
☐ Add button visible
☐ Action buttons work
```

---

### Support System (1 Page Created, 3 Placeholder)

#### Support Tickets (التذاكر)
```
☐ Ticket list displays
☐ Ticket IDs show (#SUP001, etc)
☐ Student names visible
☐ Subject displays
☐ Status badges work
☐ Priority badges work
☐ View/Reply buttons work
```

---

### Payment Management (1 Page Created, 3 Placeholder)

#### Subscription Plans (خطط الاشتراك)
```
☐ Plans table displays
☐ Plan names visible
☐ Prices show in ريال
☐ Duration displays
☐ Features count shows
☐ Subscriber count shows
☐ Status badges work
☐ Add/Edit/Delete work
```

---

### Announcements (1 Page Created, 3 Placeholder)

#### Create Announcements (إنشاء إعلان)
```
☐ Announcement list displays
☐ Title shows
☐ Audience shows
☐ Date displays
☐ Status badges work
☐ Edit/Send/Delete work
```

---

### Content Management (1 Page Created, 3 Placeholder)

#### Articles (المقالات)
```
☐ Article list displays
☐ Article titles show
☐ Author names visible
☐ View counts show
☐ Status badges work
☐ Edit/Delete work
```

---

## 🎨 UI/UX Testing

### Design Consistency
```
All Pages Should Have:
☐ Consistent header styling
☐ Same button colors and hover states
☐ Matching card designs
☐ Consistent spacing/padding
☐ Aligned grid layouts
☐ Professional typography
```

### Dark Mode Testing
```
☐ Toggle dark mode (if available)
☐ All text readable in dark mode
☐ Backgrounds not too dark
☐ Colors contrast properly
☐ Borders visible in dark mode
☐ Icons visible in dark mode
```

### Responsive Design
```
☐ Test on mobile (375px width)
☐ Test on tablet (768px width)
☐ Test on desktop (1024px+ width)
☐ Tables don't overflow on mobile
☐ Buttons stack vertically on mobile
☐ Grids reduce columns on mobile
☐ Text sizes adjust appropriately
```

### Animation Testing
```
☐ Page transitions smooth (200ms)
☐ Button hover effects visible
☐ Card hover effects work
☐ Table row hover states work
☐ Loading animations smooth
☐ No lag or jank during animations
```

---

## 🔧 Common Testing Scenarios

### Scenario 1: Adding New Data
1. Navigate to any admin management page
2. Click "Add New" button
3. Verify form displays
4. Fill in required fields
5. Click Save/Submit
6. Check if item appears in list

### Scenario 2: Searching & Filtering
1. Go to any page with DataTable
2. Type in search box
3. Verify list filters in real-time
4. Try different search terms
5. Clear search and verify reset

### Scenario 3: Pagination
1. Go to admin tables with >10 items
2. Verify "Next" button enables/disables correctly
3. Click page numbers
4. Verify correct page displays
5. Check item count per page

### Scenario 4: Role-Based Access
1. Switch between Student/Employee/Admin roles
2. Verify correct dashboard loads
3. Verify correct sidebar items show
4. Verify correct pages load for role

### Scenario 5: Mobile Responsiveness
1. Open DevTools (F12)
2. Set device to iPhone 12 (390x844)
3. Navigate through all pages
4. Verify no horizontal scroll
5. Verify buttons clickable
6. Verify text readable

---

## ✅ Full Test Checklist

### Functionality
- [ ] All pages load without errors
- [ ] Navigation between pages works
- [ ] Search/filter functionality works
- [ ] Add/Edit/Delete operations work (or show success messages)
- [ ] Forms submit correctly
- [ ] Dark mode toggle works
- [ ] RTL layout displays correctly

### UI/UX
- [ ] All text readable
- [ ] All buttons clickable
- [ ] All icons visible
- [ ] Colors consistent
- [ ] Spacing uniform
- [ ] No visual glitches

### Performance
- [ ] Pages load quickly
- [ ] No console errors
- [ ] Tables don't lag with pagination
- [ ] Animations smooth (60fps)
- [ ] Charts render properly

### Responsive
- [ ] Mobile (375px) - works well
- [ ] Tablet (768px) - works well
- [ ] Desktop (1024px+) - works well
- [ ] No horizontal scroll
- [ ] All buttons accessible

### Accessibility
- [ ] Keyboard navigation works
- [ ] Text contrast sufficient
- [ ] Buttons have clear labels
- [ ] Forms clearly labeled
- [ ] Error messages visible

---

## 📝 Bug Report Template

If you find an issue:

```
Title: [Brief description]

Component: [Which page/component]

Steps to Reproduce:
1. [First step]
2. [Second step]
3. [Third step]

Expected: [What should happen]

Actual: [What actually happened]

Screenshots: [If applicable]

Browser: [Chrome/Firefox/Safari/Edge]
Device: [Desktop/Mobile/Tablet]
OS: [Windows/Mac/iOS/Android]
```

---

## 🚀 Ready to Deploy?

Before deploying, ensure:
- [ ] No console errors on any page
- [ ] All dummy data replaced with real API calls
- [ ] Error handling implemented
- [ ] Loading states working
- [ ] All buttons/forms tested
- [ ] Mobile responsiveness verified
- [ ] Dark mode working
- [ ] Performance acceptable
- [ ] Security checks passed

---

**Happy Testing! 🎉**
