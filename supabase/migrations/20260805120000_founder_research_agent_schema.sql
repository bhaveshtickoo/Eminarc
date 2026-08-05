-- ==============================================================================
-- Eminarc Growth OS — Founder Research Agent Schema Migration
-- Migration: 20260805120000_founder_research_agent_schema.sql
-- Description: Creates companies, founders, research_jobs, and research_reports
--              tables with foreign keys, indexes, triggers, and workspace-level RLS.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. SCHEMAS & TABLES
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. COMPANIES TABLE
-- Stores company profiles scraped and analyzed by the Founder Research Agent.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  website TEXT,
  linkedin_url TEXT,
  industry TEXT,
  company_size TEXT,
  location TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at on companies
CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for companies
CREATE INDEX IF NOT EXISTS idx_companies_workspace_id ON public.companies(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_companies_website ON public.companies(website) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_companies_name ON public.companies(name) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- 2. FOUNDERS TABLE
-- Stores founder and executive persona intelligence associated with a company.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.founders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  title TEXT,
  linkedin_url TEXT,
  bio TEXT,
  email TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at on founders
CREATE TRIGGER update_founders_updated_at
BEFORE UPDATE ON public.founders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for founders
CREATE INDEX IF NOT EXISTS idx_founders_company_id ON public.founders(company_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_founders_email ON public.founders(email) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- 3. RESEARCH_JOBS TABLE
-- Tracks asynchronous execution status, percentage progress, and logs for agent runs.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.research_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  progress INT DEFAULT 0 NOT NULL CHECK (progress >= 0 AND progress <= 100),
  started_at TIMESTAMPTZ NULL,
  completed_at TIMESTAMPTZ NULL,
  error TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at on research_jobs
CREATE TRIGGER update_research_jobs_updated_at
BEFORE UPDATE ON public.research_jobs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for research_jobs
CREATE INDEX IF NOT EXISTS idx_research_jobs_workspace_id ON public.research_jobs(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_research_jobs_company_id ON public.research_jobs(company_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_research_jobs_status ON public.research_jobs(status) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- 4. RESEARCH_REPORTS TABLE
-- Stores deep-dive AI analysis, ICP match, pain points, tech stack, and raw payloads.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.research_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  founder_id UUID NULL REFERENCES public.founders(id) ON DELETE SET NULL,
  summary TEXT,
  icp JSONB DEFAULT '{}'::jsonb,
  pain_points JSONB DEFAULT '[]'::jsonb,
  buying_signals JSONB DEFAULT '[]'::jsonb,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  competitors JSONB DEFAULT '[]'::jsonb,
  opportunities JSONB DEFAULT '[]'::jsonb,
  confidence_score NUMERIC(5,2) DEFAULT 0.00 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  raw_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at on research_reports
CREATE TRIGGER update_research_reports_updated_at
BEFORE UPDATE ON public.research_reports
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for research_reports
CREATE INDEX IF NOT EXISTS idx_research_reports_company_id ON public.research_reports(company_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_research_reports_founder_id ON public.research_reports(founder_id) WHERE deleted_at IS NULL;

-- ==============================================================================
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- Multi-tenant workspace isolation using public.is_workspace_member(workspace_id)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- RLS POLICIES: COMPANIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Companies are viewable by workspace members"
ON public.companies FOR SELECT
USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);

CREATE POLICY "Companies can be created by workspace members"
ON public.companies FOR INSERT
WITH CHECK (public.is_workspace_member(workspace_id));

CREATE POLICY "Companies can be updated by workspace members"
ON public.companies FOR UPDATE
USING (public.is_workspace_member(workspace_id))
WITH CHECK (public.is_workspace_member(workspace_id));

CREATE POLICY "Companies can be soft deleted by workspace members"
ON public.companies FOR DELETE
USING (public.is_workspace_member(workspace_id));

-- ------------------------------------------------------------------------------
-- RLS POLICIES: FOUNDERS
-- ------------------------------------------------------------------------------
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Founders are viewable by workspace members"
ON public.founders FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.companies c
    WHERE c.id = founders.company_id
      AND public.is_workspace_member(c.workspace_id)
      AND c.deleted_at IS NULL
  )
  AND deleted_at IS NULL
);

CREATE POLICY "Founders can be created by workspace members"
ON public.founders FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.companies c
    WHERE c.id = founders.company_id
      AND public.is_workspace_member(c.workspace_id)
      AND c.deleted_at IS NULL
  )
);

CREATE POLICY "Founders can be updated by workspace members"
ON public.founders FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.companies c
    WHERE c.id = founders.company_id
      AND public.is_workspace_member(c.workspace_id)
      AND c.deleted_at IS NULL
  )
);

CREATE POLICY "Founders can be deleted by workspace members"
ON public.founders FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.companies c
    WHERE c.id = founders.company_id
      AND public.is_workspace_member(c.workspace_id)
      AND c.deleted_at IS NULL
  )
);

-- ------------------------------------------------------------------------------
-- RLS POLICIES: RESEARCH_JOBS
-- ------------------------------------------------------------------------------
ALTER TABLE public.research_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Research jobs are viewable by workspace members"
ON public.research_jobs FOR SELECT
USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);

CREATE POLICY "Research jobs can be created by workspace members"
ON public.research_jobs FOR INSERT
WITH CHECK (public.is_workspace_member(workspace_id));

CREATE POLICY "Research jobs can be updated by workspace members"
ON public.research_jobs FOR UPDATE
USING (public.is_workspace_member(workspace_id))
WITH CHECK (public.is_workspace_member(workspace_id));

CREATE POLICY "Research jobs can be deleted by workspace members"
ON public.research_jobs FOR DELETE
USING (public.is_workspace_member(workspace_id));

-- ------------------------------------------------------------------------------
-- RLS POLICIES: RESEARCH_REPORTS
-- ------------------------------------------------------------------------------
ALTER TABLE public.research_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Research reports are viewable by workspace members"
ON public.research_reports FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.companies c
    WHERE c.id = research_reports.company_id
      AND public.is_workspace_member(c.workspace_id)
      AND c.deleted_at IS NULL
  )
  AND deleted_at IS NULL
);

CREATE POLICY "Research reports can be created by workspace members"
ON public.research_reports FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.companies c
    WHERE c.id = research_reports.company_id
      AND public.is_workspace_member(c.workspace_id)
      AND c.deleted_at IS NULL
  )
);

CREATE POLICY "Research reports can be updated by workspace members"
ON public.research_reports FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.companies c
    WHERE c.id = research_reports.company_id
      AND public.is_workspace_member(c.workspace_id)
      AND c.deleted_at IS NULL
  )
);

CREATE POLICY "Research reports can be deleted by workspace members"
ON public.research_reports FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.companies c
    WHERE c.id = research_reports.company_id
      AND public.is_workspace_member(c.workspace_id)
      AND c.deleted_at IS NULL
  )
);
