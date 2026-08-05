-- ==============================================================================
-- Eminarc Growth OS — Weekly Growth Review Schema Migration
-- Migration: 20260805230000_weekly_growth_review_schema.sql
-- Description: Creates weekly_growth_reviews table for storing weekly retrospective briefs:
--              Wins, Losses, Risks, Missed Opportunities, Campaign Summary,
--              Content Performance, Pipeline Health, and Recommended Next Steps.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- WEEKLY_GROWTH_REVIEWS TABLE
-- Stores weekly executive retrospective snapshots per workspace.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.weekly_growth_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  title TEXT NOT NULL,
  wins JSONB NOT NULL DEFAULT '[]'::jsonb,
  losses JSONB NOT NULL DEFAULT '[]'::jsonb,
  risks JSONB NOT NULL DEFAULT '[]'::jsonb,
  missed_opportunities JSONB NOT NULL DEFAULT '[]'::jsonb,
  campaign_summary JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_performance JSONB NOT NULL DEFAULT '{}'::jsonb,
  pipeline_health JSONB NOT NULL DEFAULT '{}'::jsonb,
  recommended_next_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL,
  CONSTRAINT unique_workspace_weekly_review UNIQUE (workspace_id, week_start_date)
);

-- Trigger for auto-updating updated_at on weekly_growth_reviews
CREATE TRIGGER update_weekly_growth_reviews_updated_at
BEFORE UPDATE ON public.weekly_growth_reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for weekly_growth_reviews
CREATE INDEX IF NOT EXISTS idx_weekly_reviews_ws ON public.weekly_growth_reviews(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_weekly_reviews_date ON public.weekly_growth_reviews(week_start_date) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.weekly_growth_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "weekly_reviews_select" ON public.weekly_growth_reviews FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "weekly_reviews_insert" ON public.weekly_growth_reviews FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "weekly_reviews_update" ON public.weekly_growth_reviews FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "weekly_reviews_delete" ON public.weekly_growth_reviews FOR DELETE USING (public.is_workspace_member(workspace_id));
