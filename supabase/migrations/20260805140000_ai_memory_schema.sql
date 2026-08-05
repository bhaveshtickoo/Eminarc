-- ==============================================================================
-- Eminarc Growth OS — AI Memory Schema Migration
-- Migration: 20260805140000_ai_memory_schema.sql
-- Description: Creates ai_memories table for persisting Workspace, Company,
--              Founder, Conversation, Campaign, and Research AI memory layers.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- AI_MEMORIES TABLE
-- Stores multi-layer AI memory entries for automatic context injection.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  memory_type TEXT NOT NULL CHECK (memory_type IN ('workspace', 'company', 'founder', 'conversation', 'campaign', 'research')),
  entity_id UUID NULL,
  key TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ NULL
);

-- Trigger for auto-updating updated_at on ai_memories
CREATE TRIGGER update_ai_memories_updated_at
BEFORE UPDATE ON public.ai_memories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for ai_memories
CREATE INDEX IF NOT EXISTS idx_ai_memories_workspace_id ON public.ai_memories(workspace_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_ai_memories_type ON public.ai_memories(memory_type) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_ai_memories_entity ON public.ai_memories(entity_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_ai_memories_key ON public.ai_memories(key) WHERE deleted_at IS NULL;

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.ai_memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "AI memories are viewable by workspace members"
ON public.ai_memories FOR SELECT
USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);

CREATE POLICY "AI memories can be created by workspace members"
ON public.ai_memories FOR INSERT
WITH CHECK (public.is_workspace_member(workspace_id));

CREATE POLICY "AI memories can be updated by workspace members"
ON public.ai_memories FOR UPDATE
USING (public.is_workspace_member(workspace_id))
WITH CHECK (public.is_workspace_member(workspace_id));

CREATE POLICY "AI memories can be deleted by workspace members"
ON public.ai_memories FOR DELETE
USING (public.is_workspace_member(workspace_id));
