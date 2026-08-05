-- ==============================================================================
-- Eminarc Growth OS — Execution Planner Operating Plan Schema Migration
-- Migration: 20260805200000_execution_operating_plan_schema.sql
-- Description: Creates operating_plans table for persisting machine-executable plans:
--              Campaigns, Projects, Milestones, Tasks, Priority, Expected impact,
--              Owner (placeholder agent/user), Timeline, Dependencies, and KPIs.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- OPERATING_PLANS TABLE
-- Stores operating plan specs compiled from AI Growth Strategies and Research.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.operating_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  strategy_id UUID NULL REFERENCES public.growth_strategies(id) ON DELETE CASCADE,
  research_report_id UUID NULL REFERENCES public.research_reports(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'in_progress', 'completed', 'archived')),
  campaigns JSONB NOT NULL DEFAULT '[]'::jsonb,
  projects JSONB NOT NULL DEFAULT '[]'::jsonb,
  milestones JSONB NOT NULL DEFAULT '[]'::jsonb,
  tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
  kpis JSONB NOT NULL DEFAULT '[]'::jsonb,
  operating_plan_spec JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at on operating_plans
CREATE TRIGGER update_operating_plans_updated_at
BEFORE UPDATE ON public.operating_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for operating_plans
CREATE INDEX IF NOT EXISTS idx_operating_plans_ws ON public.operating_plans(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_operating_plans_strategy ON public.operating_plans(strategy_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_operating_plans_report ON public.operating_plans(research_report_id) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.operating_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "operating_plans_select" ON public.operating_plans FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "operating_plans_insert" ON public.operating_plans FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "operating_plans_update" ON public.operating_plans FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "operating_plans_delete" ON public.operating_plans FOR DELETE USING (public.is_workspace_member(workspace_id));
