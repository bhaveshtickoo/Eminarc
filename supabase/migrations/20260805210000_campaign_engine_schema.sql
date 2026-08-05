-- ==============================================================================
-- Eminarc Growth OS — Campaign Engine Schema Migration
-- Migration: 20260805210000_campaign_engine_schema.sql
-- Description: Creates growth_campaigns table for persisting multi-channel campaigns:
--              LinkedIn, Email, SEO, Website, Partnerships, Events, Paid, Communities.
--              Every campaign includes Goal, Audience, Messaging, Assets, Tasks, Timeline, KPIs, Status.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- GROWTH_CAMPAIGNS TABLE
-- Stores multi-channel campaign specs compiled from AI Operating Plans.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.growth_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  operating_plan_id UUID NULL REFERENCES public.operating_plans(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('LinkedIn', 'Email', 'SEO', 'Website', 'Partnerships', 'Events', 'Paid', 'Communities')),
  goal TEXT NOT NULL,
  audience TEXT NOT NULL,
  messaging TEXT NOT NULL,
  assets JSONB NOT NULL DEFAULT '[]'::jsonb,
  tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
  timeline TEXT NOT NULL,
  kpis JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'active', 'paused', 'completed', 'archived')),
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at on growth_campaigns
CREATE TRIGGER update_growth_campaigns_updated_at
BEFORE UPDATE ON public.growth_campaigns
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for growth_campaigns
CREATE INDEX IF NOT EXISTS idx_growth_campaigns_ws ON public.growth_campaigns(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_growth_campaigns_type ON public.growth_campaigns(type) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_growth_campaigns_status ON public.growth_campaigns(status) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.growth_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "growth_campaigns_select" ON public.growth_campaigns FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "growth_campaigns_insert" ON public.growth_campaigns FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "growth_campaigns_update" ON public.growth_campaigns FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "growth_campaigns_delete" ON public.growth_campaigns FOR DELETE USING (public.is_workspace_member(workspace_id));
