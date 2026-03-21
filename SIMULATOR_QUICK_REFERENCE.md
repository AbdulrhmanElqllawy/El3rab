# Simulator Tracking System - Quick Reference

## 🎯 What Was Built

A complete **Performance Tracking System** that connects the ExamSimulator page with the Student Dashboard, allowing students to:

- ✅ Track all exam attempts with detailed metrics
- ✅ Analyze mistakes grouped by date and category
- ✅ View comprehensive performance analytics
- ✅ Organize mistakes into custom folders by topic
- ✅ Get AI-powered weakness detection & recommendations
- ✅ Analyze time management patterns
- ✅ Review exam history with filtering/sorting

---

## 📊 System Components

### 1. **SimulatorContext** (`src/contexts/SimulatorContext.jsx`)
Global state management for all simulator data.

**Key Methods:**
- `saveAttempt(data)` - Save exam attempt
- `getOverallStats()` - Summary statistics
- `detectWeakTopics()` - Find struggling areas
- `getDailyMistakes()` - Mistakes grouped by date
- `getPerformanceTrend()` - Performance over time
- `getSuggestedPractice()` - AI recommendations
- `createFolder()` / `deleteFolder()` - Mistake organization
- `moveMistakeToFolder()` - Organize mistakes

### 2. **SimulatorView** (`src/components/dashboard/views/student/simulator/SimulatorView.jsx`)
Main dashboard component with 5 tabs:

| Tab | Purpose | Features |
|-----|---------|----------|
| **Overview** | Dashboard summary | Key metrics, performance chart, weak topics, suggestions |
| **Mistakes** | Daily mistake analysis | Grouped by date, searchable, addable notes |
| **History** | Exam attempts log | Full table, sortable, filterable by type |
| **Analytics** | Detailed performance | Charts, trends, top/bottom questions |
| **Folders** | Mistake organization | Create folders, move mistakes, color-coded |

### 3. **Supporting Components**
- `SimulatorOverview.jsx` - Metrics cards + charts
- `DailyMistakesView.jsx` - Collapsible daily mistakes
- `ExamHistoryView.jsx` - Attempt table
- `AnalyticsView.jsx` - Performance visualization
- `MistakeFoldersView.jsx` - Folder management

---

## 💾 Data Flow

```
Student takes exam
    ↓
ExamInterface generates questionDetails
    ↓
ExamResultScreen saves to context via saveAttempt()
    ↓
SimulatorContext auto-extracts mistakes
    ↓
Data persisted to localStorage
    ↓
Dashboard → Simulator section displays data
```

---

## 🚀 How to Access

### Navigate to Simulator Section
```
Dashboard (Student) → Sidebar → "محاكي الاختبار" (Simulator)
or directly: /dashboard/simulator
```

### View Specific Data
- **Current Metrics**: Overview tab → Stat cards
- **Recent Mistakes**: Mistakes tab → Today section
- **Best/Worst Questions**: Analytics tab → Bottom right
- **Weak Topics**: Overview tab → Right side
- **Exam Attempts**: History tab → Full table

---

## 📈 Key Analytics Available

### Performance Metrics
- Total exam attempts
- Average accuracy (%)
- Best score & worst score
- Total study time (hours)
- Mistakes this week
- 7-day & 30-day trends

### Mistake Insights
- Daily mistake count
- Mistakes by category
- Mistakes by difficulty
- Mistakes per question
- Success rate per question
- Top 5 best & worst questions

### Weakness Detection
- Weak topics (< 65% accuracy)
- Sorted by severity
- Attempt count per topic
- Personalized practice recommendations

### Time Analysis
- Average time per question
- Fast questions vs slow questions
- Accuracy comparison (fast vs slow)
- Time management patterns

---

## 🔧 Integration Points

### What Was Modified

1. **ExamInterface.jsx**
   - Added category & difficulty to questions
   - Passes questionDetails to ExamResultScreen

2. **ExamResultScreen.jsx**
   - Imports `useSimulator()` hook
   - Calls `saveAttempt()` after exam completes
   - Auto-saves to context

3. **Layout.jsx**
   - Wraps app with `<SimulatorProvider>`

4. **DashboardLayout.jsx**
   - Imports `SimulatorView`
   - Maps to `STUDENT_VIEWS.simulator`

---

## 💡 Usage Examples

### Get Overall Statistics
```javascript
import { useSimulator } from '@/contexts/SimulatorContext';

function MyComponent() {
  const { getOverallStats } = useSimulator();
  const stats = getOverallStats();
  
  console.log(`${stats.totalAttempts} exams taken`);
  console.log(`Average accuracy: ${stats.avgAccuracy}%`);
}
```

### Detect Weak Topics
```javascript
const { detectWeakTopics } = useSimulator();
const weakAreas = detectWeakTopics(60); // threshold = 60%

weakAreas.forEach(topic => {
  console.log(`${topic.category}: ${topic.avgAccuracy}%`);
});
```

### Get Daily Mistakes
```javascript
const { getDailyMistakes } = useSimulator();
const daily = getDailyMistakes();

Object.entries(daily).forEach(([date, data]) => {
  console.log(`${date}: ${data.count} mistakes`);
  console.log(`Categories:`, data.categories);
});
```

### Create Mistake Folder
```javascript
const { createFolder } = useSimulator();

const folder = createFolder(
  'Geometry Problems',
  'Mistakes in geometry topics',
  '#6C4CF1'
);
```

---

## 📁 File Locations

| Component | Path |
|-----------|------|
| Main Context | `src/contexts/SimulatorContext.jsx` |
| Dashboard Container | `src/components/dashboard/views/student/simulator/SimulatorView.jsx` |
| Overview Tab | `src/components/dashboard/views/student/simulator/SimulatorOverview.jsx` |
| Mistakes Tab | `src/components/dashboard/views/student/simulator/DailyMistakesView.jsx` |
| History Tab | `src/components/dashboard/views/student/simulator/ExamHistoryView.jsx` |
| Analytics Tab | `src/components/dashboard/views/student/simulator/AnalyticsView.jsx` |
| Folders Tab | `src/components/dashboard/views/student/simulator/MistakeFoldersView.jsx` |
| Full Guide | `SIMULATOR_TRACKING_GUIDE.md` |

---

## 🎨 UI Features

- ✅ Dark mode support
- ✅ Arabic (RTL) support
- ✅ Mobile responsive
- ✅ Smooth animations
- ✅ Loading states
- ✅ Empty states
- ✅ Sortable tables
- ✅ Expandable sections
- ✅ Color-coded data
- ✅ Interactive charts

---

## 📊 Data Storage

**LocalStorage Key:** `simulator_data`

**Structure:**
```json
{
  "attempts": [...],
  "mistakes": [...],
  "folders": [...]
}
```

**Persistence:** Auto-synced on every operation

---

## ✨ Key Features Implemented

### Phase 1: Data Infrastructure ✅
- SimulatorContext with all CRUD methods
- Automatic mistake extraction
- Real-time localStorage persistence
- Complete analytics engine

### Phase 2: Integration ✅
- ExamInterface produces detailed metrics
- ExamResultScreen saves to context
- SimulatorProvider wraps entire app
- Dashboard routes wired up

### Phase 3: Dashboard Components ✅
- 5 main tabs (Overview, Mistakes, History, Analytics, Folders)
- 15+ sub-components
- Comprehensive visualizations
- Interactive controls

### Phase 4: Features ✅
- Weakness detection algorithm
- Custom mistake folders
- Daily mistake grouping
- Performance trend tracking
- Time analysis
- Suggested practice engine

### Phase 5: UI/UX ✅
- Dark mode support
- RTL/Arabic support
- Responsive design
- Smooth animations
- Loading & empty states

---

## 🚦 Current Status

- ✅ **Fully Implemented** - All core features working
- ✅ **Tested** - No compilation/runtime errors
- ✅ **Documented** - Comprehensive guides created
- ✅ **Integrated** - Connected to dashboard & simulator
- ✅ **Production Ready** - Can be deployed as-is
- 🔄 **Can Be Enhanced** - Backend integration, more analytics, etc.

---

## 📞 Quick Troubleshooting

### Data not saving?
- Check browser console for errors
- Verify localStorage is not disabled
- Check that SimulatorProvider is in Layout.jsx

### Analytics showing wrong data?
- Verify exam has questionDetails with category/difficulty
- Check that attempts have categoryPerformance field
- Review data in browser DevTools → Application → Local Storage

### Views not showing?
- Verify SimulatorView imported in DashboardLayout.jsx
- Check that simulator route is registered in STUDENT_VIEWS
- Ensure student role is set in dashboard context

---

## 🎓 Learning Path

To understand the system better:

1. Start with `SimulatorContext.jsx` - understand data models
2. Review `SimulatorView.jsx` - see tab structure
3. Explore individual tab components - see specific implementations
4. Check DashboardLayout.jsx - see integration
5. Review ExamResultScreen.jsx - see data flow

---

## 📊 Metrics Dashboard

**Overview provides:**
- 📊 4 key stat cards with real numbers
- 📈 7-day performance trend chart
- ⚠️ Weak topics section
- ⏱️ Time analysis (fast vs slow)
- 💡 Suggested practice recommendations

**History provides:**
- 📋 Full attempt table
- 🔍 Type-based filtering
- 📊 Summary statistics
- ↔️ Sort by date or score

**Analytics provides:**
- 📉 30-day trend chart
- 🎯 Exam type performance pie
- ✨ Top 5 best questions
- ⚠️ Top 5 worst questions
- 📊 Category breakdowns

---

Developed: March 21, 2026
Version: 1.0 - Complete Implementation
