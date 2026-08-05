-- ==============================================================================
-- Eminarc Growth OS — Planning Engine Schema Migration
-- Migration: 20260805170000_planning_engine_schema.sql
-- Description: Creates execution_plans table for persisting machine-readable
--              campaigns, projects, tasks, owners, deadlines, dependencies, and KPIs.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- EXECUTION_PLANS TABLE
-- Stores machine-readable DAG execution plans compiled from Growth Strategies.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.execution_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  strategy_id UUID NULL REFERENCES public.growth_strategies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  campaigns JSONB NOT NULL DEFAULT '[]'::jsonb,
  projects JSONB NOT NULL DEFAULT '[]'::jsonb,
  tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
  kpis JSONB NOT NULL DEFAULT '[]'::jsonb,
  machine_readable_spec JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at on execution_plans
CREATE TRIGGER update_execution_plans_updated_at
BEFORE UPDATE ON public.execution_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for execution_plans
CREATE INDEX IF NOT EXISTS idx_execution_plans_ws ON public.execution_plans(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_execution_plans_strategy ON public.execution_plans(strategy_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_execution_plans_status ON public.execution_plans(status) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.execution_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "execution_plans_select" ON public.execution_plans FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "execution_plans_insert" ON public.execution_plans FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "execution_plans_update" ON public.execution_plans FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "execution_plans_delete" ON public.execution_plans FOR DELETE USING (public.is_workspace_member(workspace_id));
