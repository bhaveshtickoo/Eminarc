# SaaS Dashboard MVP — Customer-Facing (UI Prototype with Mock Data)

## Overview

Build a customer-facing SaaS dashboard MVP as a UI prototype with realistic mock data (no backend yet — wiring up Lovable Cloud later is a natural next step). Visual direction: **dark, modern, minimal** (Linear / Vercel aesthetic) — dark background, clean type, dense data, restrained color accents.

The stack already has everything we need: TanStack Start + Router, TanStack Query, full shadcn/ui component library, recharts for charts, sonner for toasts, and a sidebar component.

## Design tokens (src/styles.css)

Override the default slate theme with a dark-first palette:

- `--background`: near-black slate (oklch ~0.145) for app surfaces
- `--card` / `--popover`: slightly lighter slate panels (~0.185)
- `--primary`: a single restrained accent — vivid indigo/blue (~oklch 0.62 0.19 264) used sparingly for CTAs, active states, chart highlights
- `--muted-foreground`: desaturated slate text (~0.65)
- `--border`: low-opacity white (oklch 1 0 0 / 8%)
- Set the app to dark mode by default (apply `dark` class on the root shell)
- Keep radius tight (0.5rem), spacing generous, no heavy shadows — flat surfaces with subtle borders.

## Mock data layer (src/lib/mock-data.ts)

A single module exporting typed mock datasets and helper functions:

- `metrics`: KPI summary (MRR, active users, churn rate, NPS) with current + % change
- `revenueSeries`: 12-month revenue + expense area chart data
- `usageSeries`: weekly active sessions / API calls bar/line data
- `customers`: ~20 rows (name, email, plan, status, MRR, signup date, last active)
- `plans`: subscription tiers (Free / Pro / Business / Enterprise) with price, features, current
- `invoices`: billing history rows
- Helpers: `getCustomers()`, `createCustomer()`, `updateCustomer()`, `deleteCustomer()` operating on an in-memory array (state resets on reload — acceptable for a prototype)

## Routes & layout

Use a pathless `_dashboard` layout to share the sidebar + topbar chrome across all authenticated pages:

```
src/routes/
  __root.tsx                 -> root (already exists; wrap with dark class, mount <Toaster/>)
  login.tsx                  -> /login      mock login screen
  _dashboard.tsx             -> layout: sidebar + topbar shell, renders <Outlet/>
  _dashboard.index.tsx       -> /           overview dashboard (KPIs + charts)
  _dashboard.customers.tsx   -> /customers  data table with CRUD (add/edit/delete via dialog)
  _dashboard.settings.tsx    -> /settings  profile settings + subscription/billing
```

- `/login` is a mock auth screen — a polished centered card with email/password fields. On "Sign in" it just navigates to `/` (no real auth; the focus is the dashboard UI). A "demo" note clarifies it's a prototype.
- The `_dashboard` layout uses the shadcn `Sidebar` component (collapsible icon mode) with nav items: Overview, Customers, Settings. Topbar holds a page title / search input / avatar dropdown.
- `__root.tsx`: add `dark` class to `<html>`, mount `<Toaster />` once, keep existing error/notfound components. Update root head meta to app-specific title/description.

## Pages

### 1. Overview (`/`)

- 4 KPI cards (MRR, Active Users, Churn, NPS) with value, delta badge (up/down), sparkline or icon.
- Revenue area chart (12 months, recharts AreaChart) — primary accent fill.
- Usage bar chart (weekly sessions, recharts BarChart).
- Recent activity / recent customers compact list.

### 2. Customers (`/customers`)

- shadcn `Table` with columns: Name, Email, Plan (badge), Status (badge), MRR, Joined, actions.
- Search input filters by name/email.
- "Add customer" button opens a `Dialog` with a form (react-hook-form + zod).
- Row edit/delete via dropdown menu → dialog (edit) / alert-dialog (delete confirm).
- CRUD updates the in-memory mock array; changes reflect immediately in the table.

### 3. Settings & billing (`/settings`)

- Tabs: "Profile" (name, email, avatar, timezone), "Billing" (current plan card, plan comparison grid, invoices table, payment method placeholder).
- Plan cards show price + features with a "Switch plan" button (mock — shows a toast).
- Invoices table with status badges and a download link (mock).

## Shared components

- `src/components/app-sidebar.tsx` — sidebar nav (Overview / Customers / Settings) using `useRouterState` for active highlighting.
- `src/components/kpi-card.tsx` — reusable KPI card.
- `src/components/charts/revenue-chart.tsx` and `usage-chart.tsx` — small recharts wrappers (client-only fine; recharts works with SSR but we can lazy-render to be safe).
- `src/components/page-header.tsx` — title + actions row used across pages.

## Verification

- Build passes (`vite build` via the harness auto-check).
- Navigate `/login` → sign in → land on `/` overview with charts rendering.
- `/customers` table loads mock rows; add/edit/delete flows work and update the table.
- `/settings` tabs switch; plan switch shows a toast.
- Dark theme applied; no hardcoded colors (all semantic tokens); responsive down to mobile (sidebar collapses).
- No console errors from the preview.

## Out of scope (noted for later)

- Real backend / auth / database (enable Lovable Cloud when ready).
- Persistent data (in-memory mock resets on reload).
- Payment integration.  
  Based on everything we've built so far, this is what I'd tell Lovable.
  ---
  # Eminarc Growth OS
  ## One-line vision
  **Eminarc Growth OS is an AI-powered operating system for B2B growth teams that researches, plans, executes, measures and improves every growth channel from one dashboard.**
  Not another CRM.  
  Not another LinkedIn tool.  
  Not another marketing automation platform.
  It becomes the operating system that coordinates the entire demand generation engine.
  ---
  # Core philosophy
  Most companies have
  - HubSpot for CRM
  - Apollo for leads
  - Clay for enrichment
  - LinkedIn manually
  - Email manually
  - Reddit manually
  - Analytics separately
  - AI tools separately
  - Notion for planning
    Everything is disconnected.
    Growth OS becomes the layer above all of them.
    It thinks like a growth consultant while acting like an AI operations team.
  ***
  # Target customers
  Primary
  - Founder-led B2B SaaS
  - AI startups
  - Agencies
  - GTM teams
  - Revenue teams
    Markets
  - USA
  - MENA
  ***
  # MVP Goal
  Replace an expensive growth agency's repetitive work with AI while keeping strategic decisions human.
  ---
  # Main Dashboard
  Shows
  - Revenue
  - Pipeline
  - Outreach
  - LinkedIn
  - Reddit
  - SEO
  - AI Visibility
  - Website traffic
  - Tasks
  - Weekly recommendations
    Instead of showing numbers, it answers
  > What should I do today to grow?
  ***
  # Modules
  ## 1. Founder Research Agent
  Input
  Company website
  Output
  - Founder profile
  - Company analysis
  - ICP
  - Competitors
  - Pain points
  - Funding
  - Recent news
  - Hiring
  - Product positioning
  - Buying signals
    Automatically builds a complete GTM profile.
  ***
  ## 2. ICP Builder
  Instead of filters
  Describe your ideal customer
  Example
  "Series A AI startup selling to enterprises"
  System builds
  - industries
  - company size
  - technologies
  - hiring signals
  - locations
  - job titles
    Then finds matching companies.
  ***
  ## 3. Lead Intelligence
  Every lead gets enriched with
  - LinkedIn
  - Website
  - Technologies
  - Funding
  - News
  - Intent
  - Hiring
  - Social activity
    Then receives a score.
  ***
  ## 4. Outreach Engine
  Automatically generates
  - Emails
  - LinkedIn DMs
  - Follow-ups
  - Personalization
    Uses
  - company research
  - founder research
  - recent posts
  - funding
  - hiring
    No generic outreach.
  ***
  ## 5. LinkedIn Copilot
  Handles
  - Content ideas
  - Writing
  - Carousel planning
  - Comments
  - Engagement
  - Growth analytics
  - Posting schedule
    Tracks
  - impressions
  - followers
  - engagement
  - inbound leads
  ***
  ## 6. Reddit Growth Agent
  Finds
  - relevant subreddits
  - discussions
  - questions
    Suggests
  - comments
  - posts
  - engagement strategy
    Tracks
  - karma
  - clicks
  - mentions
  ***
  ## 7. AI Visibility Auditor
  Checks
  Can ChatGPT find your company?
  Can Claude?
  Can Gemini?
  Can Perplexity?
  Shows
  - citations
  - mentions
  - missing pages
  - optimization suggestions
  ***
  ## 8. Website Intelligence
  Scans website
  Finds
  - broken messaging
  - missing CTAs
  - SEO issues
  - conversion issues
  - performance issues
    Suggests improvements.
  ***
  ## 9. Competitor Intelligence
  Tracks competitors
  Shows
  - new content
  - product launches
  - pricing
  - hiring
  - social growth
  - website changes
  ***
  ## 10. Content Operating System
  Creates
  - LinkedIn
  - Medium
  - X
  - Blog
  - Newsletter
  - Reddit
    Everything from one knowledge base.
  ***
  ## 11. Growth Consultant
  Instead of dashboards
  Ask
  "Why are leads down?"
  System analyses everything
  Returns
  - reasons
  - evidence
  - recommendations
    Exactly like a senior growth consultant.
  ***
  ## 12. Weekly Action Plan
  Every Monday
  System generates
  - biggest bottlenecks
  - highest ROI actions
  - campaigns to launch
  - experiments
  - risks
  - opportunities
  ***
  ## 13. Task Center
  Shows
  Today's work
  Example
  - Approve LinkedIn post
  - Reply to Reddit comments
  - Send 20 emails
  - Review AI visibility report
  - Call 5 warm leads
  ***
  ## 14. Analytics
  Combines
  - LinkedIn
  - Website
  - Email
  - CRM
  - Reddit
  - Search
  - AI visibility
    Everything in one place.
  ***
  # AI Agents
  - Founder Research Agent
  - Company Research Agent
  - ICP Agent
  - Lead Scoring Agent
  - Outreach Agent
  - LinkedIn Agent
  - Reddit Agent
  - AI Visibility Agent
  - SEO Agent
  - Competitor Agent
  - Content Agent
  - Strategy Agent
  - Reporting Agent
  ***
  # User Flow
  1. User signs up.
  2. Connects website and LinkedIn.
  3. Growth OS researches the business.
  4. Builds ICP automatically.
  5. Finds leads.
  6. Generates outreach.
  7. Creates content.
  8. Tracks performance.
  9. Suggests improvements daily.
  10. Repeats continuously.
  ***
  # Tech Stack (MVP)
  **Frontend**
  - Next.js
  - React
  - Tailwind CSS
  - shadcn/ui
    **Backend**
  - FastAPI (Python)
    **Database**
  - PostgreSQL
  - Supabase
    **Authentication**
  - Clerk or Supabase Auth
    **AI**
  - OpenRouter
  - OpenAI
  - Gemini
  - Groq (fast inference)
    **Automation**
  - n8n
    **Vector Search**
  - Qdrant
    **Background Jobs**
  - Celery + Redis (or simpler queue initially)
    **Deployment**
  - Vercel (frontend)
  - Railway or Render (backend)
  ***
  # Design Style for Lovable
  - Modern SaaS UI
  - Dark mode first
  - Purple/blue gradient accents
  - Minimal, clean interface
  - Left sidebar navigation
  - AI chat panel always accessible
  - Rich charts with actionable insights (not vanity metrics)
  - Card-based dashboard
  - Fast, keyboard-friendly UX
  ***
  ## What makes Eminarc Growth OS different?
  Most tools optimize **one channel**.
  Eminarc Growth OS optimizes the **entire growth system**.
  It acts like a virtual growth team: researching markets, finding opportunities, creating content, powering outreach, monitoring competitors, measuring results, and telling founders exactly what to do next—all from a single operating system.
