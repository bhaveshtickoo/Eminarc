-- ==============================================================================
-- Eminarc Growth OS — Strategy Database Schema Migration
-- Migration: 20260805160000_strategy_database_schema.sql
-- Description: Creates 6 production-ready strategy tables:
--              1. growth_strategies
--              2. personas
--              3. positioning
--              4. messaging_frameworks
--              5. channel_plans
--              6. roadmaps
-- Each table belongs to workspace_id, company_id, and research_report_id.
-- Includes Foreign Keys, Indexes, Triggers, and Multi-Tenant RLS Policies.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. GROWTH_STRATEGIES TABLE
-- Master strategic growth playbook records.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.growth_strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  research_report_id UUID NULL REFERENCES public.research_reports(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  executive_summary TEXT NOT NULL,
  icp_summary TEXT NOT NULL,
  value_proposition TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('draft', 'generating', 'completed', 'failed')),
  version INTEGER NOT NULL DEFAULT 1,
  raw_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at
CREATE TRIGGER update_growth_strategies_updated_at
BEFORE UPDATE ON public.growth_strategies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for growth_strategies
CREATE INDEX IF NOT EXISTS idx_growth_strategies_ws ON public.growth_strategies(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_growth_strategies_company ON public.growth_strategies(company_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_growth_strategies_report ON public.growth_strategies(research_report_id) WHERE deleted_at IS NULL;


-- ------------------------------------------------------------------------------
-- 2. PERSONAS TABLE
-- Detailed buyer persona profiles & decision triggers.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  research_report_id UUID NULL REFERENCES public.research_reports(id) ON DELETE SET NULL,
  strategy_id UUID NULL REFERENCES public.growth_strategies(id) ON DELETE CASCADE,
  role_title TEXT NOT NULL,
  seniority_level TEXT NOT NULL DEFAULT 'Executive',
  key_motivations JSONB NOT NULL DEFAULT '[]'::jsonb,
  buying_triggers JSONB NOT NULL DEFAULT '[]'::jsonb,
  objections JSONB NOT NULL DEFAULT '[]'::jsonb,
  preferred_channels JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_personas_updated_at
BEFORE UPDATE ON public.personas
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_personas_ws ON public.personas(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_personas_company ON public.personas(company_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_personas_report ON public.personas(research_report_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_personas_strategy ON public.personas(strategy_id) WHERE deleted_at IS NULL;


-- ------------------------------------------------------------------------------
-- 3. POSITIONING TABLE
-- Market category definitions, brand taglines, and competitive differentiators.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.positioning (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  research_report_id UUID NULL REFERENCES public.research_reports(id) ON DELETE SET NULL,
  strategy_id UUID NULL REFERENCES public.growth_strategies(id) ON DELETE CASCADE,
  category_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  core_differentiation TEXT NOT NULL,
  competitor_gaps JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_positioning_updated_at
BEFORE UPDATE ON public.positioning
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_positioning_ws ON public.positioning(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_positioning_company ON public.positioning(company_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_positioning_report ON public.positioning(research_report_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_positioning_strategy ON public.positioning(strategy_id) WHERE deleted_at IS NULL;


-- ------------------------------------------------------------------------------
-- 4. MESSAGING_FRAMEWORKS TABLE
-- Core messaging pillars, proof points, and objection handling matrices.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.messaging_frameworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  research_report_id UUID NULL REFERENCES public.research_reports(id) ON DELETE SET NULL,
  strategy_id UUID NULL REFERENCES public.growth_strategies(id) ON DELETE CASCADE,
  pillar_name TEXT NOT NULL,
  core_message TEXT NOT NULL,
  proof_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  objection_handles JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_messaging_frameworks_updated_at
BEFORE UPDATE ON public.messaging_frameworks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_messaging_frameworks_ws ON public.messaging_frameworks(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_messaging_frameworks_company ON public.messaging_frameworks(company_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_messaging_frameworks_report ON public.messaging_frameworks(research_report_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_messaging_frameworks_strategy ON public.messaging_frameworks(strategy_id) WHERE deleted_at IS NULL;


-- ------------------------------------------------------------------------------
-- 5. CHANNEL_PLANS TABLE
-- Multi-channel growth distribution strategies and channel priority metrics.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.channel_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  research_report_id UUID NULL REFERENCES public.research_reports(id) ON DELETE SET NULL,
  strategy_id UUID NULL REFERENCES public.growth_strategies(id) ON DELETE CASCADE,
  channel_name TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'High' CHECK (priority IN ('High', 'Medium', 'Low')),
  target_audience TEXT NOT NULL,
  target_metrics TEXT NOT NULL,
  execution_tactics JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_channel_plans_updated_at
BEFORE UPDATE ON public.channel_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_channel_plans_ws ON public.channel_plans(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_channel_plans_company ON public.channel_plans(company_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_channel_plans_report ON public.channel_plans(research_report_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_channel_plans_strategy ON public.channel_plans(strategy_id) WHERE deleted_at IS NULL;


-- ------------------------------------------------------------------------------
-- 6. ROADMAPS TABLE
-- Growth roadmaps, quarterly deliverables, 30/60/90 plans, and KPIs.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  research_report_id UUID NULL REFERENCES public.research_reports(id) ON DELETE SET NULL,
  strategy_id UUID NULL REFERENCES public.growth_strategies(id) ON DELETE CASCADE,
  timeframe TEXT NOT NULL,
  milestone_title TEXT NOT NULL,
  key_deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  plan_30_60_90 JSONB NOT NULL DEFAULT '{}'::jsonb,
  success_metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

CREATE TRIGGER update_roadmaps_updated_at
BEFORE UPDATE ON public.roadmaps
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_roadmaps_ws ON public.roadmaps(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_roadmaps_company ON public.roadmaps(company_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_roadmaps_report ON public.roadmaps(research_report_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_roadmaps_strategy ON public.roadmaps(strategy_id) WHERE deleted_at IS NULL;


-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES FOR ALL 6 TABLES
-- Enforces Workspace Isolation via public.is_workspace_member(workspace_id)
-- ------------------------------------------------------------------------------

-- 1. growth_strategies RLS
ALTER TABLE public.growth_strategies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "growth_strategies_select" ON public.growth_strategies FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "growth_strategies_insert" ON public.growth_strategies FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "growth_strategies_update" ON public.growth_strategies FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "growth_strategies_delete" ON public.growth_strategies FOR DELETE USING (public.is_workspace_member(workspace_id));

-- 2. personas RLS
ALTER TABLE public.personas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "personas_select" ON public.personas FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "personas_insert" ON public.personas FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "personas_update" ON public.personas FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "personas_delete" ON public.personas FOR DELETE USING (public.is_workspace_member(workspace_id));

-- 3. positioning RLS
ALTER TABLE public.positioning ENABLE ROW LEVEL SECURITY;
CREATE POLICY "positioning_select" ON public.positioning FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "positioning_insert" ON public.positioning FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "positioning_update" ON public.positioning FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "positioning_delete" ON public.positioning FOR DELETE USING (public.is_workspace_member(workspace_id));

-- 4. messaging_frameworks RLS
ALTER TABLE public.messaging_frameworks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messaging_frameworks_select" ON public.messaging_frameworks FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "messaging_frameworks_insert" ON public.messaging_frameworks FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "messaging_frameworks_update" ON public.messaging_frameworks FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "messaging_frameworks_delete" ON public.messaging_frameworks FOR DELETE USING (public.is_workspace_member(workspace_id));

-- 5. channel_plans RLS
ALTER TABLE public.channel_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "channel_plans_select" ON public.channel_plans FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "channel_plans_insert" ON public.channel_plans FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "channel_plans_update" ON public.channel_plans FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "channel_plans_delete" ON public.channel_plans FOR DELETE USING (public.is_workspace_member(workspace_id));

-- 6. roadmaps RLS
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "roadmaps_select" ON public.roadmaps FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "roadmaps_insert" ON public.roadmaps FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "roadmaps_update" ON public.roadmaps FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "roadmaps_delete" ON public.roadmaps FOR DELETE USING (public.is_workspace_member(workspace_id));
