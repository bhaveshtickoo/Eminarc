-- ==============================================================================
-- Eminarc Growth OS Database Migration
-- Migration: 20260805000000_add_onboarding_completed_to_profiles.sql
-- Description: Adds onboarding_completed column to profiles table for first-time user detection
-- ==============================================================================

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE NOT NULL;
