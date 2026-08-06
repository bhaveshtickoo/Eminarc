# Architecture Guide — Eminarc Growth OS

**Version**: 1.0.0  
**Stack**: React 19 + Vite + TanStack Router + Tailwind CSS v4 + shadcn/ui + Recharts  
**Architectural Pattern**: Modular Feature-Driven Architecture (Domain-Driven Partitioning)

---

## 1. Directory Structure & Folder Hierarchy

The Eminarc Growth OS codebase is structured into clear, decoupled layers designed for enterprise SaaS scalability, developer ergonomics, and maintainability:

```
src/
├── app/                            # Application Orchestration Layer
│   ├── providers/                  # Global Context & State Providers (AppProviders, WorkspaceProvider)
│   ├── router/                     # TanStack Router Config & Execution Instance (router.tsx)
│   └── layouts/                    # Master App Layouts & Shell Containers (DashboardLayout)
│
├── components/                     # Core Design System & Generic UI Components
│   ├── ui/                         # Headless shadcn/ui Primitives (Button, Card, Dialog, Table, etc.)
│   ├── charts/                     # Reusable Charting Library (LineChart, AreaChart, BarChart, StackedBarChart, DonutChart, PieChart, FunnelChart, Sparkline, ProgressRing, ChartCard)
│   ├── layout/                     # Application Shell Primitives (AppSidebar, AiChatPanel)
│   ├── forms/                      # Generic Form Controls & Helper Components
│   └── shared/                     # Cross-Feature Shared UI Widgets (PageHeader, KPICard, Breadcrumbs, etc.)
│
├── features/                       # Modular Domain Features
│   ├── dashboard/                  # Command Center Overview, KPI Widgets, Activity Stream & Quick Actions
│   ├── research/                   # Founder Research Engine, Form Controls, McKinsey Audit Reports
│   ├── content/                    # Content OS Studio, AI Copilot, 1-Click Repurpose Engine & Calendar
│   ├── distribution/               # Multi-Channel Outreach & Campaign Distribution Modules
│   ├── visibility/                 # 9-Engine LLM Citation Radar & AI Search Visibility Auditor
│   ├── analytics/                  # Growth Velocity Charts, Traffic & Citation Analytics
│   ├── crm/                        # Lead Intelligence Table, Account Scoring & Pipeline Board
│   ├── agents/                     # Autonomous AI Agents Command Panel & Copilot Cards
│   ├── reports/                    # Executive Growth Reports & Export Engine
│   ├── tasks/                      # Priority Workload Checklist & Weekly Schedule
│   └── settings/                   # Workspace, Billing, Profile & Team Management
│
├── context/                        # Global State Contexts (WorkspaceContext)
├── hooks/                          # Custom React Hooks (useWorkspace, use-mobile)
├── services/                       # Typed API Service Layer & Endpoint Abstractions (research, content, analytics, crm, visibility, agents, workspace)
├── types/                          # Global TypeScript Interfaces & Data Models (workspace.ts)
├── utils/                          # Utility Helper Functions (cn.ts)
├── constants/                      # Central System Constants & Navigation Config (index.ts)
├── data/                           # In-Memory Datasets & Prototype Store (mock-data.ts, overview-data.ts)
├── lib/                            # Infrastructure Helpers & Utilities (utils.ts)
├── assets/                         # Static Brand Media, Logos & Vectors
└── styles/                         # Global Tailwind CSS v4 Design Tokens (styles.css)
```

---

## 2. Feature Ownership & Domain Boundaries

Each feature directory in `src/features/*` operates as a self-contained domain module containing its specific components, state hooks, and helper logic:

| Feature Domain          | Primary Responsibility                                   | Key Components                                                                                                                                             |
| :---------------------- | :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `features/dashboard`    | Main Command Center Overview & KPI telemetry             | `WelcomeHeader`, `KPICards`, `GrowthFunnel`, `RecentActivityFeed`, `QuickActions`, `TrafficSourcesCard`, `ExperimentCard`, `NotificationList`              |
| `features/research`     | Deep founder & company research generation               | `ResearchForm`, `ResearchHeader`, `ResearchReport`, `ResearchSection`, `ResearchSidebar`                                                                   |
| `features/content`      | Content creation, AI copilot & multi-channel repurposing | `ContentHeader`, `ContentEditor`, `ContentToolbar`, `AICopilot`, `CampaignSidebar`, `ContentCalendar`, `ContentCard`, `ContentQueueCard`, `RepurposePanel` |
| `features/distribution` | Campaign sequencing & channel delivery                   | Distribution channels, email & LinkedIn outreach dispatchers                                                                                               |
| `features/visibility`   | LLM Citation Radar & AI Search Audits                    | `AIVisibilityAuditorCards` across ChatGPT, Claude, Perplexity & Gemini                                                                                     |
| `features/analytics`    | Acquisition velocity & channel analytics                 | `AnalyticsChart`, time-series trend visualizers                                                                                                            |
| `features/crm`          | Lead scoring, pipeline velocity & account management     | `LeadIntelligenceTable`, `CRMAnalytics`, `PipelineCard`                                                                                                    |
| `features/agents`       | Autonomous agent execution monitoring                    | `AIAgentsPanel`, `CopilotCard`                                                                                                                             |
| `features/reports`      | Executive summary generation & PDF exports               | Client progress reports, export widgets                                                                                                                    |
| `features/tasks`        | Workload prioritization & daily checklists               | `TaskList`, `CalendarCard`                                                                                                                                 |
| `features/settings`     | Plan configuration, billing & profile settings           | Workspace management, plan tier selectors, invoice history                                                                                                 |

---

## 3. Shared Component Strategy

Generic, non-domain-bound UI widgets that are consumed across multiple features reside in `src/components/`:

- **UI Primitives (`src/components/ui/`)**: 42 headless UI primitives built on Radix UI and styled with Tailwind CSS (`Button`, `Card`, `Dialog`, `Table`, `Badge`, `Avatar`, `DropdownMenu`, etc.).
- **Reusable Chart Library (`src/components/charts/`)**: Recharts-powered charting primitives (`LineChart`, `AreaChart`, `BarChart`, `StackedBarChart`, `DonutChart`, `PieChart`, `FunnelChart`, `Sparkline`, `ProgressRing`, `ChartCard`).
- **Shared Domain Components (`src/components/shared/`)**:
  - `PageHeader` (`page-header.tsx`): Standardized header section with title, subtitle, and action slots.
  - `KPICard` / `KpiCard` (`KPICard.tsx`, `kpi-card.tsx`): Reusable metric widget with sparklines.
  - `SearchBar` (`SearchBar.tsx`): Global search input with shortcut key indicators (`⌘K`).
  - `UserAvatar` (`UserAvatar.tsx`): User profile avatar with active status dot.
  - `StatusBadge` (`StatusBadge.tsx`): Multi-variant status pill displaying confidence score & timestamps.
  - `EmptyCardPlaceholder` (`EmptyCardPlaceholder.tsx`): Paper card container for empty state views.
  - `Breadcrumbs` (`Breadcrumbs.tsx`): Contextual workspace breadcrumb bar.

---

## 4. Service Layer Strategy

The service layer in `src/services/` acts as an isolation contract between the React frontend UI and future backends:

```
                  ┌───────────────────────────────┐
                  │       UI Components           │
                  │   (src/features/<domain>)     │
                  └──────────────┬────────────────┘
                                 │
                                 ▼
                  ┌───────────────────────────────┐
                  │     React Query / Hooks       │
                  │   (TanStack Query / Custom)   │
                  └──────────────┬────────────────┘
                                 │
                                 ▼
                  ┌───────────────────────────────┐
                  │       Service Layer           │
                  │    (src/services/*)           │
                  └──────────────┬────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
     ┌───────────────────────┐       ┌───────────────────────┐
     │  Production REST API  │       │   Fallback Mock Data  │
     │  Supabase / OpenRouter│       │     (src/data/*)      │
     └───────────────────────┘       └───────────────────────┘
```

- **Typed Placeholder Contracts**:
  - `services/research`: `getResearch()`, `generateResearch()`
  - `services/content`: `getContent()`, `generateContent()`, `repurposeContent()`
  - `services/analytics`: `getDashboard()`, `getAnalytics()`
  - `services/crm`: `getLeads()`, `getPipeline()`, `addLead()`
  - `services/visibility`: `getVisibilityAudit()`, `runVisibilityScan()`
  - `services/agents`: `getAgentsList()`, `getCopilotInsights()`
  - `services/workspace-service.ts`: `fetchWorkspaceData()`

---

## 5. State Management Strategy

1. **Global Workspace Context (`src/context/WorkspaceContext.tsx`)**:
   - Manages active workspace selection, metrics telemetry, and current workspace state accessible via `useWorkspace()`.
2. **Server State (`TanStack React Query`)**:
   - Managed globally via `AppProviders.tsx`. Serves as the caching and invalidation layer when connecting services to real API endpoints.
3. **Local Component State (`React.useState`)**:
   - Form inputs, tab selections, modal open/close states, and interactive search queries stay local to feature components.

---

## 6. Future Supabase Integration Points

1. **Authentication (`@supabase/supabase-js`)**:
   - Connect `src/context/WorkspaceContext.tsx` and `src/routes/login.tsx` to Supabase Auth (`supabase.auth.getSession()`, `supabase.auth.signInWithPassword()`).
2. **Lead & CRM Database Tables (`supabase.from('leads')`)**:
   - Wire `src/services/crm/index.ts` to Supabase PostgreSQL `leads`, `deals`, and `activity_logs` tables.
3. **Content Repository (`supabase.from('content_assets')`)**:
   - Store generated drafts, schedules, and repurpose history in Supabase.
4. **Row-Level Security (RLS)**:
   - Enforce workspace isolation using Supabase RLS policies (`workspace_id = auth.jwt() -> workspace_id`).

---

## 7. Future AI Integration Points (OpenRouter / LLM Engines)

1. **Founder Research Engine (`src/services/research/index.ts`)**:
   - Integrate OpenRouter API calls with Claude 3.5 Sonnet / GPT-4o for automated company audits and strategic positioning.
2. **AI Content Studio & 1-Click Repurpose Engine (`src/services/content/index.ts`)**:
   - Dispatch prompts to OpenRouter models for multi-format content generation (LinkedIn posts, Medium articles, Twitter threads, Reddit case studies).
3. **AI Search Visibility Radar (`src/services/visibility/index.ts`)**:
   - Automated citation checker scanning ChatGPT, Claude, Perplexity, and Gemini search queries for brand mentions.
4. **Autonomous AI Growth Copilot (`src/services/agents/index.ts`)**:
   - Background agent orchestrator providing real-time alerts and suggested growth actions based on engagement drop-offs.

---

## 8. Coding & Architectural Conventions

- **Path Aliases**: Always use `@/` for imports (`@/features/*`, `@/components/*`, `@/services/*`, `@/hooks/*`, `@/lib/*`, `@/types/*`).
- **Barrel Exports**: Every feature, component category, and service directory contains an `index.ts` file for clean module imports.
- **Component Standard**: Functional React components with explicit TypeScript interface props.
- **Styling**: Tailwind CSS v4 design tokens and utility classes with Eminarc Warm Paper palette (`#FCFAF7` card canvas, `#18181B` primary ink, `#2D6A4F` forest accent).
- **Type Safety**: Strictly avoid `any` where possible; use explicit interfaces from `src/types/`.

---

## 9. Build & Verification Commands

- **Development Server**: `npm run dev`
- **Production Build**: `cmd /c npm run build`
- **Type Checking**: `cmd /c npx tsc --noEmit`
