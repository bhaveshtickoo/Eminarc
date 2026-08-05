-- ==============================================================================
-- Eminarc Growth OS — AI Task Generator Schema Migration
-- Migration: 20260805220000_ai_task_generator_schema.sql
-- Description: Creates workspace_projects and workspace_tasks tables for persisting
--              automatically generated projects, tasks, subtasks, dependencies,
--              due dates, priority, estimated effort, and assigned owners.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- WORKSPACE_PROJECTS TABLE
-- Stores project initiatives linked to workspaces and campaigns.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workspace_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  campaign_id UUID NULL REFERENCES public.growth_campaigns(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NULL,
  category TEXT NOT NULL DEFAULT 'Growth',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at on workspace_projects
CREATE TRIGGER update_workspace_projects_updated_at
BEFORE UPDATE ON public.workspace_projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for workspace_projects
CREATE INDEX IF NOT EXISTS idx_workspace_projects_ws ON public.workspace_projects(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_workspace_projects_cmp ON public.workspace_projects(campaign_id) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- WORKSPACE_TASKS TABLE
-- Stores AI-generated tasks with subtasks, dependencies, estimated effort, etc.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workspace_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  campaign_id UUID NULL REFERENCES public.growth_campaigns(id) ON DELETE SET NULL,
  project_id UUID NULL REFERENCES public.workspace_projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NULL,
  subtasks JSONB NOT NULL DEFAULT '[]'::jsonb,
  dependencies JSONB NOT NULL DEFAULT '[]'::jsonb,
  due_date DATE NOT NULL DEFAULT CURRENT_DATE,
  priority TEXT NOT NULL DEFAULT 'High' CHECK (priority IN ('Critical', 'High', 'Medium', 'Low')),
  estimated_effort_hours DECIMAL(5,2) NOT NULL DEFAULT 2.0,
  assigned_owner TEXT NOT NULL DEFAULT 'Growth OS Agent',
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Blocked')),
  raw_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at on workspace_tasks
CREATE TRIGGER update_workspace_tasks_updated_at
BEFORE UPDATE ON public.workspace_tasks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for workspace_tasks
CREATE INDEX IF NOT EXISTS idx_workspace_tasks_ws ON public.workspace_tasks(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_workspace_tasks_cmp ON public.workspace_tasks(campaign_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_workspace_tasks_prj ON public.workspace_tasks(project_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_workspace_tasks_status ON public.workspace_tasks(status) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.workspace_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "workspace_projects_select" ON public.workspace_projects FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "workspace_projects_insert" ON public.workspace_projects FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "workspace_projects_update" ON public.workspace_projects FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "workspace_projects_delete" ON public.workspace_projects FOR DELETE USING (public.is_workspace_member(workspace_id));

CREATE POLICY "workspace_tasks_select" ON public.workspace_tasks FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "workspace_tasks_insert" ON public.workspace_tasks FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "workspace_tasks_update" ON public.workspace_tasks FOR UPDATE USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "workspace_tasks_delete" ON public.workspace_tasks FOR DELETE USING (public.is_workspace_member(workspace_id));
