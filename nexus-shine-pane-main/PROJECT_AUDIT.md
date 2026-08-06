# PROJECT AUDIT REPORT — Eminarc Growth OS (Lovable Vite Stack)

**Date**: August 1, 2026  
**Project Base**: Vite + React 19 + TanStack Router + Tailwind CSS v4 + shadcn/ui + Recharts  
**Audit Objective**: Complete architectural analysis of the primary frontend codebase prior to productionization.

---

## 1. Folder Structure

```
nexus-shine-pane-main/
├── .lovable/                        # Lovable platform metadata & execution plans
│   ├── project.json
│   └── plan/
├── public/                          # Public static assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/                  # UI Components
│   │   ├── charts/                  # Recharts Wrapper Components
│   │   │   ├── channel-chart.tsx
│   │   │   ├── channel-donut.tsx
│   │   │   ├── growth-line-chart.tsx
│   │   │   └── revenue-chart.tsx
│   │   ├── ui/                      # 42 shadcn/ui primitive components
│   │   ├── ai-chat-panel.tsx        # Right drawer AI Growth Copilot
│   │   ├── app-sidebar.tsx          # Left collapsible navigation sidebar
│   │   ├── dashboard-layout.tsx     # Master layout container with top header
│   │   ├── kpi-card.tsx             # Stat widget primitive
│   │   └── page-header.tsx          # Section header primitive
│   ├── hooks/
│   │   └── use-mobile.tsx           # Responsive mobile breakpoint hook
│   ├── lib/
│   │   ├── error-capture.ts         # Lovable error telemetry adapter
│   │   ├── error-page.ts            # Error boundary page fallback
│   │   ├── lovable-error-reporting.ts # Telemetry reporter
│   │   ├── mock-data.ts             # CRM Lead datasets & options
│   │   ├── overview-data.ts         # Overview KPIs, funnel, activity datasets
│   │   └── utils.ts                 # Classname merger (clsx + tailwind-merge)
│   ├── routes/                      # TanStack Router File-Based Routes
│   │   ├── __root.tsx               # Application root wrapper
│   │   ├── login.tsx                # Authentication screen (/login)
│   │   ├── _dashboard.tsx           # Dashboard layout route parent
│   │   ├── _dashboard.index.tsx     # Overview / Command Center (/)
│   │   ├── _dashboard.clients.tsx   # Client workspaces (/clients)
│   │   ├── _dashboard.leads.tsx     # Lead Intelligence table (/leads)
│   │   ├── _dashboard.content.tsx   # Content Hub workspace (/content)
│   │   ├── _dashboard.outreach.tsx  # Outreach campaigns (/outreach)
│   │   ├── _dashboard.linkedin.tsx  # AI Agents / LinkedIn Co-Pilot (/linkedin)
│   │   ├── _dashboard.analytics.tsx # Unified Growth Analytics (/analytics)
│   │   ├── _dashboard.reports.tsx   # Executive Reports (/reports)
│   │   ├── _dashboard.tasks.tsx     # Task Backlog (/tasks)
│   │   ├── _dashboard.integrations.tsx # Third-party integrations (/integrations)
│   │   └── _dashboard.settings.tsx  # Account & workspace settings (/settings)
│   ├── router.tsx                   # TanStack Router configuration
│   ├── routeTree.gen.ts             # Auto-generated route tree
│   ├── server.ts                    # TanStack Start SSR entry point
│   ├── start.ts                     # TanStack Start initialization
│   └── styles.css                   # Global Tailwind v4 design system tokens
├── bun.lock                         # Package lockfile (Bun)
├── components.json                  # shadcn/ui configuration
├── eslint.config.js                 # ESLint flat config
├── package.json                     # Project manifest & dependencies
├── tsconfig.json                    # TypeScript compiler config
└── vite.config.ts                   # Vite bundler configuration
```

---

## 2. Route Map

| Path            | File                                     | Description                               | Active Status    |
| :-------------- | :--------------------------------------- | :---------------------------------------- | :--------------- |
| `/login`        | `src/routes/login.tsx`                   | Mock user login & authentication view     | Production Ready |
| `/`             | `src/routes/_dashboard.index.tsx`        | Growth Command Center Overview & KPIs     | Active           |
| `/clients`      | `src/routes/_dashboard.clients.tsx`      | Client program progress & onboarding      | Active           |
| `/leads`        | `src/routes/_dashboard.leads.tsx`        | Lead Intelligence table with scoring      | Active           |
| `/content`      | `src/routes/_dashboard.content.tsx`      | Content Operating System workspace        | Active           |
| `/outreach`     | `src/routes/_dashboard.outreach.tsx`     | Multi-channel outreach campaign manager   | Active           |
| `/linkedin`     | `src/routes/_dashboard.linkedin.tsx`     | AI Agents command & LinkedIn Copilot      | Active           |
| `/analytics`    | `src/routes/_dashboard.analytics.tsx`    | Unified Analytics & AI Visibility Auditor | Active           |
| `/reports`      | `src/routes/_dashboard.reports.tsx`      | Executive Growth Reports & Audits         | Active           |
| `/tasks`        | `src/routes/_dashboard.tasks.tsx`        | Task management & priority checklist      | Active           |
| `/integrations` | `src/routes/_dashboard.integrations.tsx` | CRM, LinkedIn, & Email integrations       | Active           |
| `/settings`     | `src/routes/_dashboard.settings.tsx`     | Workspace, billing, & profile settings    | Active           |

---

## 3. Component Hierarchy

```
__root.tsx (Root Container + Toast Provider)
└── DashboardLayout (_dashboard.tsx)
    └── SidebarProvider
        ├── AppSidebar (Left Navigation)
        │   ├── Workspace Logo & Title ("Eminarc")
        │   ├── Main Navigation Items (Overview, Clients, Leads, Content, etc.)
        │   ├── Active Plan Widget ("Eminarc Pro")
        │   ├── Version Badge ("EMINARC OS v1.0.0")
        │   └── System Status Pill ("All systems operational")
        ├── SidebarInset (Center Viewport)
        │   ├── Top Header Bar
        │   │   ├── SidebarTrigger
        │   │   ├── Navigation Links (TopNav)
        │   │   ├── Global Search Bar
        │   │   ├── "Ask AI" Drawer Toggle Button
        │   │   ├── Notifications Popover
        │   │   └── User Avatar & Profile Dropdown Menu
        │   └── <Outlet /> (Main Route View)
        │       ├── Route View (Overview / Clients / Leads / Content / etc.)
        │       └── Shared Page Panels & Recharts Containers
        └── AiChatPanel (Right Collapsible Drawer)
            ├── AI Copilot Chat Stream
            ├── Quick Action Suggestions
            └── Input Prompt Toolbar
```

---

## 4. Reusable Components

- **`KpiCard` (`src/components/kpi-card.tsx`)**: Reusable metric card widget with title, value, change indicator, and icon slot.
- **`PageHeader` (`src/components/page-header.tsx`)**: Standardized page title header with subtitle and primary action slots.
- **`AppSidebar` (`src/components/app-sidebar.tsx`)**: Collapsible navigation sidebar with built-in plan, version, and status widgets.
- **`DashboardLayout` (`src/components/dashboard-layout.tsx`)**: Wrapper providing top navigation, global search, AI drawer toggle, and user dropdown.
- **`AiChatPanel` (`src/components/ai-chat-panel.tsx`)**: Right drawer AI Growth Copilot interface.
- **`shadcn/ui` Primitives (`src/components/ui/*`)**: 42 modular primitives including `Button`, `Card`, `Dialog`, `DropdownMenu`, `Popover`, `Table`, `Tabs`, `Badge`, `Avatar`, `Input`, `Checkbox`, `Progress`, `Skeleton`, `Switch`, `Tooltip`, and `Sonner`.

---

## 5. Chart Components

All charts are encapsulated in `src/components/charts/` using **Recharts**:

1. **`GrowthLineChart` (`growth-line-chart.tsx`)**:
   - Type: Multi-series Area / Line Chart
   - Metrics: Profile Views, Engagements, Leads, Meetings
   - Features: Customized tooltips, active dot indicators, responsive container.
2. **`ChannelDonut` (`channel-donut.tsx`)**:
   - Type: Donut (Pie) Chart
   - Metrics: LinkedIn Outreach (37%), Content / SEO (25%), Reddit (17%), Email (13%), Other (8%)
   - Features: Central summary text ("Total Leads: 112"), custom monochrome slice fills.
3. **`ChannelChart` (`channel-chart.tsx`)**:
   - Type: Stacked Bar Chart
   - Metrics: Weekly channel activity (Monday – Sunday) across 4 channels
   - Features: Stacked bar columns with neutral opacity scaling.
4. **`RevenueChart` (`revenue-chart.tsx`)**:
   - Type: Dual Area Chart
   - Metrics: Revenue & Pipeline trajectory ($120k to $192k)
   - Features: Smooth bezier curves with neutral gradient fills.

---

## 6. Design Tokens

Configured via `@theme inline` in `src/styles.css` using `oklch()` color space:

- **Canvas Background**: `oklch(0.966 0.005 92)` (Warm Cream Tone `#F6F2EB`)
- **Card Surface**: `oklch(0.995 0.003 92)` (Paper White `#FCFAF7`)
- **Primary Ink**: `oklch(0.17 0.004 90)` (Dark Charcoal `#18181B`)
- **Secondary Surface**: `oklch(0.945 0.006 92)` (Light Sand `#EFEAE1`)
- **Border**: `oklch(0.17 0.004 90 / 10%)` (`rgba(0,0,0,0.1)`)
- **Success Accent**: `oklch(0.55 0.13 150)` (Forest Green `#2D6A4F`)
- **Warning Accent**: `oklch(0.66 0.13 70)` (Amber `#B45309`)
- **Typography**: `"Archivo", ui-sans-serif, system-ui, sans-serif`
- **Border Radii**: `--radius: 0.75rem` (12px), `rounded-xl` (12px), `rounded-2xl` (16px), `card-glow` utility.

---

## 7. UI Libraries

- **`react` (^19.2.0)** & **`react-dom` (^19.2.0)**: Core UI view layer.
- **`@tanstack/react-router` (^1.170.18)**: Type-safe file-based client/SSR router.
- **`@tanstack/react-start` (^1.168.32)**: Server-side rendering & hydration framework.
- **`tailwindcss` (^4.2.1)** & **`@tailwindcss/vite`**: CSS utility engine v4.
- **`recharts` (^2.15.4)**: SVG chart rendering engine.
- **`lucide-react` (^0.575.0)**: Icon system.
- **`sonner` (^2.0.7)**: Toast notification provider.
- **`@radix-ui/react-*`**: 20+ headless accessibility primitives.
- **`react-hook-form` + `zod`**: Form validation & type schema enforcement.

---

## 8. State Management

- **Current Architecture**: Relying on isolated local component state (`useState`, `useMemo`) across individual route components.
- **Identified Gap**: Missing centralized **Global Workspace Context** (`WorkspaceContext`). Company metrics, industry, target market, brand voice, global growth score, and active client selections are currently disconnected across routes.
- **Impact**: Navigating between `/content`, `/leads`, `/analytics`, and `/outreach` does not preserve selected client or company context across the system.

---

## 9. Performance Risks

1. **Un-memoized State Updates**: Route components (`_dashboard.index.tsx`, `_dashboard.leads.tsx`) instantiate state objects (`setClients`, `setAgentList`, `setDoneTasks`) directly inside top-level functions without memoized handlers, forcing full tree re-renders on simple state toggles.
2. **Recharts Resize Observer Overhead**: Un-memoized `ResponsiveContainer` instances cause resize thrashing during window resizing.
3. **Bundle Bloat**: 42 shadcn/ui primitive files and server adapters (`server.ts`, `start.ts`) are currently loaded into the main bundle.

---

## 10. Accessibility Issues

1. **Icon Button Labels**: Interactive table action triggers and notification buttons in `_dashboard.leads.tsx` lack `aria-label` tags.
2. **Contrast Ratio**: Muted text elements (`text-muted-foreground`) using `oklch(0.53 0.008 88)` show borderline contrast against the `#F6F2EB` background in bright display conditions.
3. **Focus States**: Custom `card-glow` action cards lack high-visibility focus ring styles for keyboard navigation.

---

## 11. Dead Code & Telemetry Artifacts

- `src/lib/error-capture.ts`: Lovable sandbox error adapter.
- `src/lib/error-page.ts`: Lovable fallback view.
- `src/lib/lovable-error-reporting.ts`: Lovable dev telemetry runner.
- `.lovable/`: Development platform metadata folder.
- `bun.lock` & `bunfig.toml`: Redundant configuration when using Vite + npm.
- **Unused UI Primitives**: `input-otp.tsx`, `resizable.tsx`, `menubar.tsx`, `navigation-menu.tsx`, `context-menu.tsx`, `carousel.tsx`, `drawer.tsx`.

---

## 12. Duplicate Components & Logic

- **Header Links**: `topNav` array in `DashboardLayout` duplicates route paths defined in `AppSidebar`.
- **Card Containers**: Local `Panel` component wrapper defined inside `_dashboard.index.tsx` duplicates container styles used in `_dashboard.analytics.tsx`.
- **Chart Wrappers**: `growth-line-chart.tsx` and `revenue-chart.tsx` duplicate identical tooltip and grid styling logic.

---

## 13. Suggested Folder Improvements

```
src/
├── context/
│   └── WorkspaceContext.tsx       # Global Workspace & Company State
├── hooks/
│   ├── useWorkspace.ts            # Workspace Context Access Hook
│   └── use-mobile.tsx             # Viewport Responsive Hook
├── types/
│   ├── workspace.ts               # Company, Industry & Metric Types
│   ├── lead.ts                    # Lead Intelligence & Pipeline Types
│   └── content.ts                 # Content OS & Campaign Types
├── components/
│   ├── layout/                    # Layout Containers (Sidebar, Header, Shell)
│   ├── charts/                    # Reusable Recharts Components
│   ├── dashboard/                 # Overview Widgets & Panels
│   ├── crm/                       # Lead Intelligence & Pipeline Components
│   ├── content/                   # Content OS 3-Column Components
│   ├── analytics/                 # Unified Analytics & AI Visibility Components
│   └── ui/                        # Curated shadcn/ui Primitives
└── routes/                        # TanStack Router File-Based Routes
```

---

## 14. Missing Features compared to Eminarc Growth OS

1. **Founder Research Workspace (`/research`)**:
   - Currently absent in the Lovable codebase (mapped only to basic `/clients`).
   - _Required_: McKinsey-grade 2-column research input panel & strategic growth report generator.
2. **AI Visibility Scanner Auditor (`/visibility`)**:
   - Currently represented as static text cards inside Analytics.
   - _Required_: Dedicated 9-platform citation radar tracking ChatGPT, Claude, Gemini, Perplexity, Google AI Overviews, Reddit, LinkedIn, Medium.
3. **Global Workspace Context Engine**:
   - Top header & sidebar currently render static text ("Eminarc") instead of reading from a shared `WorkspaceContext`.
4. **Content OS 3-Column Editorial Layout**:
   - Current `/content` route is a standard single-column editor instead of the 3-column Notion + Linear editorial workspace (Campaigns Left, Editor Center, AI Copilot Right).

---

### Conclusion & Next Steps

The codebase provides a solid, highly polished React + Vite + TanStack Router foundation. To productionize it into **Eminarc Growth OS**:

1. Implement `WorkspaceContext` for shared company state.
2. Build the missing `/research` and `/visibility` routes.
3. Upgrade `/content` into the 3-column editorial workspace.
4. Clean up telemetry dead code and optimize re-render performance.
