-- ==============================================================================
-- Eminarc Growth OS — Complete Production Supabase Database Schema Migration
-- Migration: 20260803000000_initial_schema.sql
-- Description: Creates 19 production tables with RLS tenant isolation, FKs, indexes,
--              soft-delete support (deleted_at), and updated_at triggers.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. HELPER FUNCTIONS & TRIGGERS
-- ==============================================================================

-- Auto-update updated_at timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Security Definer function to check if current auth user is a member of a workspace
CREATE OR REPLACE FUNCTION public.is_workspace_member(ws_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_members wm
    WHERE wm.workspace_id = ws_id
      AND wm.user_id = auth.uid()
      AND wm.deleted_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ==============================================================================
-- 2. SCHEMAS & TABLES
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. USERS (Profiles extending auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 2. WORKSPACES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  brand TEXT,
  country TEXT,
  timezone TEXT,
  logo_url TEXT,
  logo_letter TEXT,
  status TEXT DEFAULT 'Active' NOT NULL,
  target_market JSONB DEFAULT '["USA"]'::jsonb,
  brand_voice JSONB DEFAULT '[]'::jsonb,
  metrics JSONB DEFAULT '{}'::jsonb,
  weekly_goal JSONB DEFAULT '{}'::jsonb,
  knowledge_base JSONB DEFAULT '{}'::jsonb,
  owner_id UUID REFERENCES public.users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_workspaces_updated_at
BEFORE UPDATE ON public.workspaces
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 3. WORKSPACE MEMBERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL,
  UNIQUE(workspace_id, user_id)
);

CREATE TRIGGER update_workspace_members_updated_at
BEFORE UPDATE ON public.workspace_members
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 4. RESEARCH REPORTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.research_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company_domain TEXT,
  industry TEXT,
  icp_data JSONB DEFAULT '{}'::jsonb,
  market_insights JSONB DEFAULT '{}'::jsonb,
  competitor_matrix JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'Complete' NOT NULL,
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_research_reports_updated_at
BEFORE UPDATE ON public.research_reports
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 5. KNOWLEDGE BASE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_profile JSONB DEFAULT '{}'::jsonb,
  founder_profile JSONB DEFAULT '{}'::jsonb,
  icp JSONB DEFAULT '{}'::jsonb,
  products JSONB DEFAULT '[]'::jsonb,
  services JSONB DEFAULT '[]'::jsonb,
  messaging JSONB DEFAULT '{}'::jsonb,
  brand_voice JSONB DEFAULT '{}'::jsonb,
  competitors JSONB DEFAULT '[]'::jsonb,
  goals JSONB DEFAULT '[]'::jsonb,
  challenges JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL,
  UNIQUE(workspace_id)
);

CREATE TRIGGER update_knowledge_base_updated_at
BEFORE UPDATE ON public.knowledge_base
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 6. CONTENT
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'Post' NOT NULL,
  status TEXT DEFAULT 'Draft' NOT NULL,
  channel TEXT,
  body_content TEXT,
  scheduled_at TIMESTAMPTZ NULL,
  published_at TIMESTAMPTZ NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_content_updated_at
BEFORE UPDATE ON public.content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 7. CAMPAIGNS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'Outreach' NOT NULL,
  status TEXT DEFAULT 'Draft' NOT NULL,
  start_date TIMESTAMPTZ NULL,
  end_date TIMESTAMPTZ NULL,
  budget NUMERIC(12,2) DEFAULT 0.00,
  target_audience JSONB DEFAULT '{}'::jsonb,
  metrics JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 8. VISIBILITY REPORTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.visibility_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  query_text TEXT NOT NULL,
  overall_score NUMERIC(5,2) DEFAULT 0.00,
  llm_citations JSONB DEFAULT '[]'::jsonb,
  per_engine_breakdown JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'Completed' NOT NULL,
  scanned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_visibility_reports_updated_at
BEFORE UPDATE ON public.visibility_reports
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 9. COMPANIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  employee_count INT,
  revenue_range TEXT,
  city TEXT,
  country TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 10. CONTACTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  job_title TEXT,
  linkedin_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 11. DEALS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  value NUMERIC(14,2) DEFAULT 0.00,
  currency TEXT DEFAULT 'USD' NOT NULL,
  stage TEXT DEFAULT 'Lead' NOT NULL,
  probability INT DEFAULT 20,
  expected_close_date DATE NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_deals_updated_at
BEFORE UPDATE ON public.deals
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 12. TASKS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Pending' NOT NULL,
  priority TEXT DEFAULT 'Medium' NOT NULL,
  due_date TIMESTAMPTZ NULL,
  assigned_to UUID REFERENCES public.users(id) ON DELETE SET NULL,
  related_entity_type TEXT,
  related_entity_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON public.tasks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 13. MEETINGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 30 NOT NULL,
  meeting_link TEXT,
  status TEXT DEFAULT 'Scheduled' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_meetings_updated_at
BEFORE UPDATE ON public.meetings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 14. EMAILS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  body TEXT,
  sender TEXT NOT NULL,
  recipient TEXT NOT NULL,
  status TEXT DEFAULT 'Sent' NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_emails_updated_at
BEFORE UPDATE ON public.emails
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 15. NOTIFICATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' NOT NULL,
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  link_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_notifications_updated_at
BEFORE UPDATE ON public.notifications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 16. REPORTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'Growth' NOT NULL,
  metrics_data JSONB DEFAULT '{}'::jsonb,
  file_url TEXT,
  generated_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_reports_updated_at
BEFORE UPDATE ON public.reports
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 17. AGENT RUNS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  agent_type TEXT NOT NULL,
  input_prompt TEXT,
  output_result JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'Completed' NOT NULL,
  duration_ms INT DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_agent_runs_updated_at
BEFORE UPDATE ON public.agent_runs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 18. ACTIVITY LOGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_activity_logs_updated_at
BEFORE UPDATE ON public.activity_logs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 19. SUBSCRIPTIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  plan_name TEXT DEFAULT 'Pro' NOT NULL,
  status TEXT DEFAULT 'Active' NOT NULL,
  billing_cycle TEXT DEFAULT 'monthly' NOT NULL,
  amount NUMERIC(10,2) DEFAULT 0.00,
  currency TEXT DEFAULT 'USD' NOT NULL,
  current_period_start TIMESTAMPTZ DEFAULT NOW(),
  current_period_end TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL,
  UNIQUE(workspace_id)
);

CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================================================
-- 3. INDEXES FOR PERFORMANCE
-- ==============================================================================

-- Workspace Indexes
CREATE INDEX IF NOT EXISTS idx_users_deleted_at ON public.users(deleted_at);

CREATE INDEX IF NOT EXISTS idx_workspaces_owner_id ON public.workspaces(owner_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_deleted_at ON public.workspaces(deleted_at);

CREATE INDEX IF NOT EXISTS idx_workspace_members_workspace_id ON public.workspace_members(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id ON public.workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_deleted_at ON public.workspace_members(deleted_at);

-- Domain Module Indexes
CREATE INDEX IF NOT EXISTS idx_research_reports_workspace_id ON public.research_reports(workspace_id);
CREATE INDEX IF NOT EXISTS idx_research_reports_deleted_at ON public.research_reports(deleted_at);

CREATE INDEX IF NOT EXISTS idx_knowledge_base_workspace_id ON public.knowledge_base(workspace_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_deleted_at ON public.knowledge_base(deleted_at);

CREATE INDEX IF NOT EXISTS idx_content_workspace_id ON public.content(workspace_id);
CREATE INDEX IF NOT EXISTS idx_content_status ON public.content(status);
CREATE INDEX IF NOT EXISTS idx_content_deleted_at ON public.content(deleted_at);

CREATE INDEX IF NOT EXISTS idx_campaigns_workspace_id ON public.campaigns(workspace_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_deleted_at ON public.campaigns(deleted_at);

CREATE INDEX IF NOT EXISTS idx_visibility_reports_workspace_id ON public.visibility_reports(workspace_id);
CREATE INDEX IF NOT EXISTS idx_visibility_reports_deleted_at ON public.visibility_reports(deleted_at);

-- CRM Indexes
CREATE INDEX IF NOT EXISTS idx_companies_workspace_id ON public.companies(workspace_id);
CREATE INDEX IF NOT EXISTS idx_companies_deleted_at ON public.companies(deleted_at);

CREATE INDEX IF NOT EXISTS idx_contacts_workspace_id ON public.contacts(workspace_id);
CREATE INDEX IF NOT EXISTS idx_contacts_company_id ON public.contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_contacts_deleted_at ON public.contacts(deleted_at);

CREATE INDEX IF NOT EXISTS idx_deals_workspace_id ON public.deals(workspace_id);
CREATE INDEX IF NOT EXISTS idx_deals_company_id ON public.deals(company_id);
CREATE INDEX IF NOT EXISTS idx_deals_contact_id ON public.deals(contact_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON public.deals(stage);
CREATE INDEX IF NOT EXISTS idx_deals_deleted_at ON public.deals(deleted_at);

-- Workflow & Comm Indexes
CREATE INDEX IF NOT EXISTS idx_tasks_workspace_id ON public.tasks(workspace_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_deleted_at ON public.tasks(deleted_at);

CREATE INDEX IF NOT EXISTS idx_meetings_workspace_id ON public.meetings(workspace_id);
CREATE INDEX IF NOT EXISTS idx_meetings_deal_id ON public.meetings(deal_id);
CREATE INDEX IF NOT EXISTS idx_meetings_deleted_at ON public.meetings(deleted_at);

CREATE INDEX IF NOT EXISTS idx_emails_workspace_id ON public.emails(workspace_id);
CREATE INDEX IF NOT EXISTS idx_emails_contact_id ON public.emails(contact_id);
CREATE INDEX IF NOT EXISTS idx_emails_deleted_at ON public.emails(deleted_at);

CREATE INDEX IF NOT EXISTS idx_notifications_workspace_id ON public.notifications(workspace_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_deleted_at ON public.notifications(deleted_at);

CREATE INDEX IF NOT EXISTS idx_reports_workspace_id ON public.reports(workspace_id);
CREATE INDEX IF NOT EXISTS idx_reports_deleted_at ON public.reports(deleted_at);

CREATE INDEX IF NOT EXISTS idx_agent_runs_workspace_id ON public.agent_runs(workspace_id);
CREATE INDEX IF NOT EXISTS idx_agent_runs_deleted_at ON public.agent_runs(deleted_at);

CREATE INDEX IF NOT EXISTS idx_activity_logs_workspace_id ON public.activity_logs(workspace_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_deleted_at ON public.activity_logs(deleted_at);

CREATE INDEX IF NOT EXISTS idx_subscriptions_workspace_id ON public.subscriptions(workspace_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_deleted_at ON public.subscriptions(deleted_at);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visibility_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- USERS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id AND deleted_at IS NULL);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id AND deleted_at IS NULL);

CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- WORKSPACES POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Workspace members can view workspace"
  ON public.workspaces FOR SELECT
  USING (public.is_workspace_member(id) AND deleted_at IS NULL);

CREATE POLICY "Users can create workspaces"
  ON public.workspaces FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Workspace owners & admins can update workspace"
  ON public.workspaces FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members wm
      WHERE wm.workspace_id = id
        AND wm.user_id = auth.uid()
        AND wm.role IN ('owner', 'admin')
        AND wm.deleted_at IS NULL
    )
    AND deleted_at IS NULL
  );

-- ------------------------------------------------------------------------------
-- WORKSPACE MEMBERS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Members can view co-members in workspace"
  ON public.workspace_members FOR SELECT
  USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);

CREATE POLICY "Workspace owners & admins can insert members"
  ON public.workspace_members FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.workspace_members wm
      WHERE wm.workspace_id = workspace_id
        AND wm.user_id = auth.uid()
        AND wm.role IN ('owner', 'admin')
        AND wm.deleted_at IS NULL
    )
    OR auth.uid() = user_id -- Allow creator self-assignment
  );

CREATE POLICY "Workspace owners & admins can update members"
  ON public.workspace_members FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.workspace_members wm
      WHERE wm.workspace_id = workspace_id
        AND wm.user_id = auth.uid()
        AND wm.role IN ('owner', 'admin')
        AND wm.deleted_at IS NULL
    )
    AND deleted_at IS NULL
  );

-- ------------------------------------------------------------------------------
-- GENERIC TENANT ISOLATION RLS MACRO POLICIES FOR WORKSPACE SCOPED TABLES
-- ------------------------------------------------------------------------------

-- Function to generate standard 4 CRUD RLS policies on workspace-scoped tables
DO $$
DECLARE
  tbl TEXT;
  tbls TEXT[] := ARRAY[
    'research_reports',
    'knowledge_base',
    'content',
    'campaigns',
    'visibility_reports',
    'companies',
    'contacts',
    'deals',
    'tasks',
    'meetings',
    'emails',
    'notifications',
    'reports',
    'agent_runs',
    'activity_logs',
    'subscriptions'
  ];
BEGIN
  FOREACH tbl IN ARRAY tbls LOOP
    EXECUTE format('
      CREATE POLICY "%s_select_tenant" ON public.%I
        FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);

      CREATE POLICY "%s_insert_tenant" ON public.%I
        FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));

      CREATE POLICY "%s_update_tenant" ON public.%I
        FOR UPDATE USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);

      CREATE POLICY "%s_delete_tenant" ON public.%I
        FOR DELETE USING (public.is_workspace_member(workspace_id));
    ', tbl, tbl, tbl, tbl, tbl, tbl, tbl, tbl);
  END LOOP;
END $$;
