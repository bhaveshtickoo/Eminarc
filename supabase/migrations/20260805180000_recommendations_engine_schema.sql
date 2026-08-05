-- ==============================================================================
-- Eminarc Growth OS — Recommendation Engine Schema Migration
-- Migration: 20260805180000_recommendations_engine_schema.sql
-- Description: Creates recommendations table for persisting AI growth directives:
--              Highest priority action, Biggest opportunity, Highest risk,
--              Quick wins, Weekly recommendations, Monthly recommendations, Confidence Score.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- RECOMMENDATIONS TABLE
-- Stores real-time growth directives with calculated confidence scores.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  company_id UUID NULL REFERENCES public.companies(id) ON DELETE SET NULL,
  strategy_id UUID NULL REFERENCES public.growth_strategies(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  highest_priority_action JSONB NOT NULL DEFAULT '{}'::jsonb,
  biggest_opportunity JSONB NOT NULL DEFAULT '{}'::jsonb,
  highest_risk JSONB NOT NULL DEFAULT '{}'::jsonb,
  quick_wins JSONB NOT NULL DEFAULT '[]'::jsonb,
  weekly_recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  monthly_recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  confidence_score INTEGER NOT NULL DEFAULT 85 CHECK (confidence_score BETWEEN 0 AND 100),
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at on recommendations
CREATE TRIGGER update_recommendations_updated_at
BEFORE UPDATE ON public.recommendations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for recommendations
CREATE INDEX IF NOT EXISTS idx_recommendations_ws ON public.recommendations(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_recommendations_company ON public.recommendations(company_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_recommendations_strategy ON public.recommendations(strategy_id) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "recommendations_select" ON public.recommendations FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "recommendations_insert" ON public.recommendations FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "recommendations_update" ON public.recommendations FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "recommendations_delete" ON public.recommendations FOR DELETE USING (public.is_workspace_member(workspace_id));
