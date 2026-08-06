# Workspace Creation & Onboarding Flow — Eminarc Growth OS

This document outlines the architecture for workspace creation, user workspace membership, and the post-signup 3-step onboarding wizard in **Eminarc Growth OS**.

---

## 🏢 Workspace Data Architecture

Every authenticated user in Eminarc Growth OS belongs to at least one **Workspace**.

### Workspace Attributes

| Field Name           | Type       | Description                                                      |
| :------------------- | :--------- | :--------------------------------------------------------------- |
| `name`               | `string`   | Company / Workspace Name (e.g., _Eminarc Growth Labs_).          |
| `industry`           | `string`   | Primary business industry (e.g., _B2B SaaS_, _Growth Agency_).   |
| `domain` / `website` | `string`   | Corporate web URL (e.g., `https://eminarc.com`).                 |
| `brand`              | `string`   | Brand voice & positioning tone (e.g., _Strategic & Analytical_). |
| `country`            | `string`   | Headquarter country (e.g., _United States_).                     |
| `timezone`           | `string`   | Primary operational timezone (e.g., _UTC-5 EST_).                |
| `targetMarkets`      | `string[]` | Target geographical markets (e.g., `["USA", "MENA", "Europe"]`). |
| `logoLetter`         | `string`   | Monogram letter preview (e.g., `E`).                             |
| `logoUrl`            | `string`   | Custom logo image URL (optional).                                |
| `ownerId`            | `string`   | User ID of the workspace creator.                                |

---

## 🧙 Onboarding Wizard Workflow (`/onboarding`)

After completing user signup, the user is automatically navigated to `/onboarding`:

```
 [ Signup Complete ]
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│ Step 1: Create Workspace                                │
│ • Company Name (Required)                               │
│ • Industry                                              │
│ • Website URL                                           │
│ • Brand Tone & Positioning                              │
│ • Country & Timezone                                    │
│ • Target Markets (USA, MENA, Europe, APAC, LATAM)       │
│ • Logo Monogram Preview                                 │
└──────────────────────────┬──────────────────────────────┘
                           │ Next: Continue to Team Setup
                           ▼
┌─────────────────────────────────────────────────────────┐
│ Step 2: Invite Team                                     │
│ • Add teammate email addresses                          │
│ • Assign Roles (Admin, Member, Viewer)                  │
│ • Dynamic add/remove controls or Skip option            │
└──────────────────────────┬──────────────────────────────┘
                           │ Next: Review & Finish
                           ▼
┌─────────────────────────────────────────────────────────┐
│ Step 3: Finish & Launch                                 │
│ • Summary Card displaying workspace configuration       │
│ • Confirmation of team invitations                      │
│ • "Launch Eminarc Growth OS" action button              │
└──────────────────────────┬──────────────────────────────┘
                           │ Saves to Supabase & Syncs WorkspaceContext
                           ▼
                 [ Dashboard ( / ) ]
```

---

## 🗄️ Supabase Persistence & Database Schema

### 1. `workspaces` Table

Stores primary workspace metadata:

```sql
CREATE TABLE public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  brand TEXT,
  country TEXT,
  timezone TEXT,
  logo_url TEXT,
  logo_letter TEXT,
  status TEXT DEFAULT 'Active',
  target_market JSONB DEFAULT '["USA"]',
  brand_voice JSONB,
  metrics JSONB,
  weekly_goal JSONB,
  knowledge_base JSONB,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 2. `workspace_members` Table

Associates authenticated users with workspaces and roles (`owner`, `admin`, `member`, `viewer`):

```sql
CREATE TABLE public.workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 3. `workspace_invites` Table

Tracks pending team member invitations:

```sql
CREATE TABLE public.workspace_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'member',
  status TEXT DEFAULT 'pending',
  invited_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 🧪 Testing Guide

- [x] Register new user account at `/signup` -> verify automatic redirect to `/onboarding`.
- [x] Complete Step 1 with company name, industry, website, brand tone, country, timezone, and target markets.
- [x] Add dynamic team invites in Step 2 with role selection.
- [x] Click "Launch Eminarc Growth OS" in Step 3 -> verify workspace data is saved to Supabase and synced to `WorkspaceContext`.
- [x] Verify dashboard top navigation bar reflects newly created workspace monogram and company name.
