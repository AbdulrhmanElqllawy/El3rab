# El3rab 0.1

## Project Description

El3rab is a cutting-edge educational platform engineered to revolutionize learning and assessment processes for modern institutions. As a scalable, role-based web application, it empowers students with immersive exam simulations and personalized dashboards, while equipping administrators and employees with robust tools for content management, real-time analytics, and operational oversight. Designed with enterprise-grade security, performance, and user experience in mind, El3rab serves as a comprehensive solution for academic environments, corporate training programs, and self-directed education. Leveraging modular architecture and advanced UI components, it ensures seamless scalability, intuitive navigation, and data-driven insights to drive educational excellence.

## Features

El3rab delivers a suite of advanced features tailored to enhance educational workflows, with a focus on usability, security, and extensibility.

### Core Functionality
- **Secure Authentication & Authorization**: Integrated Telegram-based login with multi-factor validation, password strength enforcement, and seamless role assignment.
- **Interactive Exam Simulator**: Dynamic exam interfaces featuring question banks, adaptive difficulty levels, timers, and instant result analysis for realistic practice.
- **Personalized Dashboards**: Role-specific views with customizable widgets, stat cards, and navigation for efficient user interaction.
- **Simulator Performance Tracking System** *(NEW)*: Comprehensive analytics platform tracking exam attempts, mistakes, and performance trends with:
  - **Real-time Data Sync**: Every exam saved automatically with detailed metrics (accuracy, duration, category performance)
  - **Daily Mistake Tracking**: Mistakes grouped by date with category breakdown and personal notes
  - **Advanced Analytics**: Performance trends, question-level analysis, exam type comparisons
  - **Weakness Detection**: AI-powered algorithm identifying struggling topics and suggesting targeted practice
  - **Custom Folders**: Students organize mistakes by topic with color-coding and descriptions
  - **Time Analysis**: Fast vs slow question patterns with accuracy insights
  - Access from Dashboard → Simulator section with 5 analytical tabs
- **Comprehensive Landing Experience**: Engaging hero sections, feature showcases, testimonials, FAQs, and conversion-optimized call-to-actions to onboard users effectively.

### Advanced Administrative Tools
- **Admin Control Panel**: Full-spectrum management of users, content, and system configurations, including employee oversight and question curation.
- **Analytics & Reporting Engine**: Visual dashboards with interactive charts, KPIs, and exportable reports for performance tracking and decision-making.
- **Theme & Accessibility Customization**: Global dark/light mode toggling, responsive design, and ARIA-compliant components for inclusive access.
- **Real-Time Collaboration**: Shared views and notifications for team-based operations, with context-aware loading states.

### User Experience Enhancements
- **Progressive Web App (PWA) Ready**: Optimized for offline access and mobile performance.
- **Form Validation & Feedback**: Advanced input handling with OTP verification, error messaging, and toast notifications.
- **Navigation & Tracking**: Intelligent sidebar menus, breadcrumb trails, and page analytics for streamlined user journeys.

## User Roles & Permissions

El3rab enforces a granular role-based access control (RBAC) system to maintain data integrity and operational security. Permissions are dynamically enforced at the component and API levels, ensuring users only access authorized features. Below is a detailed breakdown of each role, including capabilities, limitations, and use cases.

- **Admin**:
  - **Capabilities**: Unrestricted access to all system features, including user creation, editing, and deletion; content management (e.g., questions, courses); system-wide analytics and reporting; configuration of global settings like themes and permissions; override capabilities for exams and results.
  - **Limitations**: None within the platform; however, actions are logged for audit trails.
  - **Use Cases**: Ideal for institution leaders or IT administrators overseeing platform governance, ensuring compliance, and driving strategic improvements.
  - **Permissions Level**: Full CRUD (Create, Read, Update, Delete) across all entities, plus administrative overrides.

- **Employee**:
  - **Capabilities**: Access to operational dashboards for assigned tasks; editing and moderating questions within designated scopes; viewing aggregated user statistics and limited analytics; assisting in user support and content updates.
  - **Limitations**: Cannot create or delete users, access sensitive admin data, or modify global settings; read-only access to certain reports.
  - **Use Cases**: Suited for educators, content creators, or support staff who need to contribute to content without full administrative privileges.
  - **Permissions Level**: Read/Update on assigned content; Read on analytics; No access to user management or overrides.

- **Student**:
  - **Capabilities**: Personalized dashboard access for progress tracking; full exam simulation with result reviews; enrollment in courses and live classes; viewing public content and testimonials.
  - **Limitations**: No editing, creation, or administrative access; cannot view other users' data or analytics.
  - **Use Cases**: Primary for learners seeking self-paced education, exam preparation, and skill assessment.
  - **Permissions Level**: Read-only on personal data and public content; Execute on exams.

This RBAC model supports scalability by allowing easy addition of new roles or fine-tuned permissions via configuration files.

## Tech Stack

### Frontend
- **React 18**: Declarative component library for building dynamic user interfaces with hooks and concurrent features.
- **Vite**: Lightning-fast build tool with hot module replacement for efficient development.
- **Tailwind CSS**: Utility-first styling framework for responsive, maintainable designs.
- **Shadcn/UI**: High-quality, accessible UI primitives built on Radix UI for consistent componentry.

### Backend
- **Frontend-Only Architecture**: Currently client-side; extensible for integration with backend services via APIs.

### Database
- **Client-Side Storage**: Utilizes local state and browser storage; designed for seamless migration to databases like PostgreSQL or Firebase for persistence.

### Tools & Libraries
- **React Query (TanStack Query)**: Robust data fetching, caching, and synchronization for API interactions.
- **React Router**: Declarative routing for single-page application navigation.
- **Lucide React**: Scalable icon library for UI elements.
- **ESLint & Prettier**: Automated code quality and formatting tools.
- **TypeScript (Partial)**: Type safety in utilities for enhanced reliability.

## System Overview / Architecture

El3rab adopts a modular, component-oriented architecture inspired by modern React best practices, ensuring maintainability and scalability:

- **Application Structure**: Centralized entry via `main.jsx`, with `App.jsx` orchestrating routes and global providers.
- **State Management**: Context APIs (`AuthContext`, `ThemeContext`, `DashboardContext`, `SimulatorContext`) for role-based state and performance analytics, supplemented by React Query for server state. SimulatorContext provides real-time exam tracking, mistake management, and analytics computations.
- **Component Hierarchy**: Organized into reusable modules under `components/`, with pages in `pages/` and views in `dashboard/views/` for separation of concerns.
- **Routing & Navigation**: Client-side routing with protected routes, integrated with `NavigationTracker` for analytics.
- **Styling & Theming**: Global styles in `globals.css`, with Tailwind for utility classes and theme context for dynamic switching.
- **Performance Optimizations**: Lazy loading, code splitting via Vite, and skeleton loaders for perceived speed.
- **Extensibility**: API-ready design for backend integration, with utilities in `lib/` and hooks for custom logic.

This architecture supports horizontal scaling, micro-frontend patterns, and easy deployment to cloud platforms like Vercel or AWS.

## Installation & Setup

Get El3rab up and running on your Linux environment with these straightforward steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/el3rab.git
   cd el3rab
   ```

2. **Install Dependencies**:
   Ensure Node.js (v18+) and npm are installed.
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Copy `.env.example` to `.env` and configure as detailed below.

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Access at `http://localhost:5173`.

5. **Build for Production**:
   ```bash
   npm run build
   npm run preview
   ```

For VS Code integration, open the workspace at `/home/abdulrhman_elqllawy/el3rab 0.1` and use the terminal for commands.

## Environment Variables

Configure a `.env` file in the root directory with the following variables for secure operation:

- `VITE_TELEGRAM_API_KEY`: Your Telegram Bot API key for authentication integration.
- `VITE_API_BASE_URL`: Endpoint for external APIs (e.g., data services).
- `VITE_APP_NAME`: Custom app name for branding (defaults to "El3rab").
- `VITE_ANALYTICS_ID`: Optional Google Analytics ID for tracking.

Example:
```
VITE_TELEGRAM_API_KEY=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
VITE_API_BASE_URL=https://api.el3rab.com
VITE_APP_NAME=El3rab Platform
VITE_ANALYTICS_ID=GA-XXXXXXXXXX
```

## Usage Guide

1. **Onboarding**: Visit the landing page to explore features and initiate registration.
2. **Authentication**: Authenticate via Telegram or manual login; roles are assigned during signup.
3. **Dashboard Navigation**: Access role-tailored dashboards via the sidebar; view stats, manage content, or start exams.
4. **Exam Workflow**: Select exam types, banks, and levels; complete simulations with auto-scoring and feedback.
5. **Administrative Tasks**: Admins can add employees, curate questions, and review analytics.
6. **Customization**: Toggle themes and adjust settings for personalized experiences.

Leverage VS Code's integrated terminal for debugging or running tests.

### Simulator Performance Tracking

The new Simulator Performance Tracking System provides students with comprehensive exam analytics:

1. **Access the Simulator**:
   - Dashboard (Student) → Sidebar → "محاكي الاختبار" (Simulator)
   - Or navigate to `/dashboard/simulator`

2. **Automatic Tracking**:
   - Every exam attempt is automatically saved with:
     - Total questions, correct/wrong answers, accuracy %
     - Duration and time per question
     - Category performance breakdown
     - Complete question details (text, difficulty, answers)

3. **Five Analytics Tabs**:
   - **Overview**: Key metrics, 7-day performance trend, weak topics, suggestions
   - **Mistakes**: Daily-grouped mistakes with searchable details and personal notes
   - **History**: Complete exam attempt table (sortable, filterable)
   - **Analytics**: 30-day trends, category comparisons, top/bottom questions
   - **Folders**: Custom organization of mistakes by topic with color coding

4. **Smart Insights**:
   - Weakness detection identifies topics below 65% accuracy
   - Time analysis compares fast vs slow question accuracy
   - Suggested practice recommendations based on weak areas
   - Question-level statistics (attempts, success rate, average time)

5. **Data Persistence**: All data saved to browser localStorage automatically and synced across tabs

## UI / Dashboard Description

El3rab's UI is crafted for professionalism and intuitiveness, utilizing Shadcn/UI for polished components:

- **Landing Page**: Bold hero banner, grid-based feature highlights, rotating testimonials, and a sticky footer.
- **Authentication Screens**: Minimalist forms with Telegram widgets, strength indicators, and contextual alerts.
- **Dashboards**: Collapsible sidebars with icon-based navigation, KPI cards, and chart visualizations (e.g., bar graphs for analytics).
- **Exam Interface**: Clean question layouts with radio buttons, progress bars, and result modals.
- **Responsive Elements**: Adaptive grids, drawers for mobile, and hover tooltips for enhanced interaction.

Dashboards dynamically adapt to roles, displaying admin-specific controls or student progress trackers, all optimized for accessibility and performance.

## Folder Structure

```
el3rab-0.1/
├── src/
│   ├── App.jsx                 # Core app logic and routing
│   ├── globals.css             # Global stylesheet
│   ├── index.css               # Base CSS imports
│   ├── index.js                # DOM rendering entry
│   ├── Layout.jsx              # Main layout component (+SimulatorProvider)
│   ├── main.jsx                # Vite application bootstrap
│   ├── pages.config.js         # Page routing configuration
│   ├── contexts/
│   │   └── SimulatorContext.jsx # Exam tracking & analytics state (NEW)
│   ├── components/
│   │   ├── ThemeContext.jsx    # Theme state provider
│   │   ├── ThemeToggle.jsx     # Theme switch component
│   │   ├── UserNotRegisteredError.jsx # Error handling UI
│   │   ├── auth/               # Authentication-related components
│   │   ├── dashboard/
│   │   │   ├── DashboardLayout.jsx # Updated: imports SimulatorView
│   │   │   └── views/
│   │   │       └── student/
│   │   │           └── simulator/ # NEW: Performance tracking system
│   │   │               ├── SimulatorView.jsx        # 5-tab interface
│   │   │               ├── SimulatorOverview.jsx    # Overview tab
│   │   │               ├── DailyMistakesView.jsx    # Mistakes tab
│   │   │               ├── ExamHistoryView.jsx      # History tab
│   │   │               ├── AnalyticsView.jsx        # Analytics tab
│   │   │               └── MistakeFoldersView.jsx   # Folders tab
│   │   ├── exam/               # Exam simulation components (updated)
│   │   ├── landing/            # Landing page sections
│   │   └── ui/                 # Reusable UI library components
│   ├── hooks/                  # Custom React hooks
│   ├── imgs/                   # Static image assets
│   ├── lib/                    # Shared utilities and contexts
│   ├── pages/                  # Top-level page components
│   └── utils/                  # Helper functions and types
├── SIMULATOR_TRACKING_GUIDE.md       # Complete system documentation (NEW)
├── SIMULATOR_QUICK_REFERENCE.md      # Quick reference guide (NEW)
├── README.md                   # Project documentation
└── ...                         # Configuration files (e.g., package.json, vite.config.js)
```

## Recent Updates (v1.1)

### Simulator Performance Tracking System *(March 2026)*
A complete performance analytics platform connecting exam simulations with student dashboards:

**New Components**:
- `SimulatorContext.jsx` (550+ lines) - Global state management and analytics engine
- 6 new dashboard view components (1500+ lines)
- Full integration with exam interface for automatic data capture

**Key Capabilities**:
- ✅ Real-time exam attempt tracking
- ✅ Automatic mistake extraction and categorization
- ✅ Daily mistake grouping with notes
- ✅ Advanced performance analytics with charts
- ✅ Weakness detection algorithm
- ✅ Custom mistake folders
- ✅ Time management analysis
- ✅ Suggested practice recommendations
- ✅ Dark mode & RTL support
- ✅ localStorage persistence

**Documentation**: See `SIMULATOR_TRACKING_GUIDE.md` for comprehensive guide and `SIMULATOR_QUICK_REFERENCE.md` for quick start.

## Future Improvements / Roadmap

El3rab is poised for continuous evolution with a focus on innovation and user feedback:

- **Backend Integration**: Connect SimulatorContext to backend API for persistent analytics
- **Advanced AI**: Implement machine learning for personalized learning recommendations
- **Full-Stack Backend**: Develop a RESTful API with Node.js/Express and databases
- **Mobile Application**: Launch a React Native app for cross-platform accessibility
- **Export Reports**: PDF/CSV reports of performance analytics
- **Video Explanations**: Per-mistake video tutorials
- **Peer Comparison**: Safe benchmarking against anonymized peer performance
- **Achievement Badges**: Gamification elements (streaks, milestones, awards)
- **Globalization**: Add i18n support for multiple languages, including Arabic localization
- **Monetization**: Introduce subscription tiers with Stripe integration for premium access
- **Security Upgrades**: Enhance with OAuth2, encryption, and compliance audits (e.g., GDPR)
- **Performance Scaling**: Optimize with CDN, caching layers, and microservices architecture

## Contributing Guidelines

Contributions are vital to El3rab's growth. Follow these guidelines:

1. Fork the repo and branch off `main` for features.
2. Adhere to code standards with ESLint and Prettier.
3. Develop with tests; aim for 80%+ coverage using Jest.
4. Commit descriptively and submit PRs with issue links.
5. Participate in code reviews and address feedback promptly.

Report bugs via GitHub Issues. Maintainers will review contributions within 48 hours.

## License

El3rab is licensed under the MIT License, permitting free use, modification, and distribution. Refer to [LICENSE](LICENSE) for full terms.