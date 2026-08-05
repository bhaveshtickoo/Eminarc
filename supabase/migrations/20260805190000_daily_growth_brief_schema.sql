-- ==============================================================================
-- Eminarc Growth OS — Daily Growth Brief Schema Migration
-- Migration: 20260805190000_daily_growth_brief_schema.sql
-- Description: Creates daily_growth_briefs table for storing daily workspace executive briefs:
--              Today's focus, Top opportunities, Risks, Tasks due, Research completed,
--              Campaign performance, and Recommended actions.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- DAILY_GROWTH_BRIEFS TABLE
-- Stores daily intelligence brief snapshots per workspace.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.daily_growth_briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  brief_date DATE NOT NULL DEFAULT CURRENT_DATE,
  todays_focus TEXT NOT NULL,
  top_opportunities JSONB NOT NULL DEFAULT '[]'::jsonb,
  risks JSONB NOT NULL DEFAULT '[]'::jsonb,
  tasks_due JSONB NOT NULL DEFAULT '[]'::jsonb,
  research_completed JSONB NOT NULL DEFAULT '[]'::jsonb,
  campaign_performance JSONB NOT NULL DEFAULT '{}'::jsonb,
  recommended_actions JSONB NOT NULL DEFAULT '[]'::jsonb,
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL,
  CONSTRAINT unique_workspace_daily_brief UNIQUE (workspace_id, brief_date)
);

-- Trigger for auto-updating updated_at on daily_growth_briefs
CREATE TRIGGER update_daily_growth_briefs_updated_at
BEFORE UPDATE ON public.daily_growth_briefs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for daily_growth_briefs
CREATE INDEX IF NOT EXISTS idx_daily_briefs_ws ON public.daily_growth_briefs(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_daily_briefs_date ON public.daily_growth_briefs(brief_date) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.daily_growth_briefs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "daily_briefs_select" ON public.daily_growth_briefs FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "daily_briefs_insert" ON public.daily_growth_briefs FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "daily_briefs_update" ON public.daily_growth_briefs FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "daily_briefs_delete" ON public.daily_growth_briefs FOR DELETE USING (public.is_workspace_member(workspace_id));
