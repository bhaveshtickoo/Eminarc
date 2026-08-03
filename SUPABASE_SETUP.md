# Supabase Integration & Architecture Guide — Eminarc Growth OS

This document outlines the backend integration architecture for **Eminarc Growth OS** using [Supabase](https://supabase.com/).

> [!IMPORTANT]
> **Database Table Migration Status**: No database tables have been created yet. The codebase is prepared with full TypeScript database schema types, client singletons, SSR server helpers, context providers, custom hooks, and modular service layers. When production tables are ready, no UI or route changes will be required.

---

## 📁 Folder Structure

Below is the directory structure created for the Supabase backend layer:

```
src/
├── lib/
│   └── supabase/
│       ├── client.ts                      # Browser Supabase client singleton instance
│       ├── server.ts                      # Server-side Supabase client for SSR & API routes
│       ├── types.ts                       # TypeScript Database schema & domain interfaces
│       ├── config.ts                      # Environment variables loader & validator
│       ├── index.ts                       # Public barrel exports
│       └── services/
│           ├── auth-service.ts            # Modular auth operations (login, signup, reset)
│           └── supabase-workspace-service.ts # Modular workspace database CRUD
├── context/
│   ├── SupabaseContext.tsx                # React Context provider for Auth & Supabase state
│   └── WorkspaceContext.tsx               # Existing Workspace Context
├── hooks/
│   ├── useAuth.ts                         # Custom hook for auth session & user management
│   └── useWorkspace.ts                    # Hook for workspace context & database sync
├── routes/
│   └── __root.tsx                         # Root router with SupabaseProvider context wrapper
.env                                       # Local environment variables
.env.example                               # Environment variables template
```

---

## 📄 Files Created & Description

| File Path | Description |
| :--- | :--- |
| [`src/lib/supabase/config.ts`](file:///l:/VS%20CODE/Eminarc/src/lib/supabase/config.ts) | Reads and validates `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from Vite env. |
| [`src/lib/supabase/types.ts`](file:///l:/VS%20CODE/Eminarc/src/lib/supabase/types.ts) | TypeScript definitions for Supabase Database (`profiles`, `workspaces`, `workspace_members`, `leads`, `content_items`). |
| [`src/lib/supabase/client.ts`](file:///l:/VS%20CODE/Eminarc/src/lib/supabase/client.ts) | Client-side Supabase instance (`createClient`) with persistent session storage. |
| [`src/lib/supabase/server.ts`](file:///l:/VS%20CODE/Eminarc/src/lib/supabase/server.ts) | SSR/Server-side client factories (`createServerClient`, `createAdminClient`). |
| [`src/lib/supabase/index.ts`](file:///l:/VS%20CODE/Eminarc/src/lib/supabase/index.ts) | Centralized export module for clean imports across the application. |
| [`src/context/SupabaseContext.tsx`](file:///l:/VS%20CODE/Eminarc/src/context/SupabaseContext.tsx) | React Context Provider wrapping the app and managing `onAuthStateChange` listeners. |
| [`src/hooks/useAuth.ts`](file:///l:/VS%20CODE/Eminarc/src/hooks/useAuth.ts) | Primary hook for components to access `user`, `session`, `profile`, `signIn`, `signOut`, `signUp`. |
| [`src/hooks/useWorkspace.ts`](file:///l:/VS%20CODE/Eminarc/src/hooks/useWorkspace.ts) | Re-exported hook providing workspace context and modular DB service. |
| [`src/lib/supabase/services/auth-service.ts`](file:///l:/VS%20CODE/Eminarc/src/lib/supabase/services/auth-service.ts) | Encapsulated Auth API service. |
| [`src/lib/supabase/services/supabase-workspace-service.ts`](file:///l:/VS%20CODE/Eminarc/src/lib/supabase/services/supabase-workspace-service.ts) | Encapsulated Workspace DB API service. |
| [`.env.example`](file:///l:/VS%20CODE/Eminarc/.env.example) | Environment variable template. |

---

## 🔑 Environment Variables

The project requires the following environment variables in `.env` (development) or your hosting platform (production):

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Server / Admin Environments (Optional for privileged API routes):
```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

---

## 🚀 How to Connect Production

To connect Eminarc Growth OS to a live production Supabase instance:

### Step 1: Create a Supabase Project
1. Log in to [Supabase Dashboard](https://database.new).
2. Click **New Project**, choose your organization, project name, region, and database password.
3. Once provisioned, navigate to **Project Settings** -> **API**.

### Step 2: Set Production Credentials
Copy the credentials into your deployment platform environment variables (Vercel, Netlify, Cloudflare Pages, etc.):

- Set `VITE_SUPABASE_URL` to your project URL (`https://<project-ref>.supabase.co`).
- Set `VITE_SUPABASE_ANON_KEY` to your project `anon` / `public` API key.

### Step 3: Configure Authentication Settings
1. In Supabase Dashboard, go to **Authentication** -> **URL Configuration**.
2. Set **Site URL** to your production domain (e.g. `https://eminarc.com`).
3. Add your redirect URLs:
   - `https://eminarc.com/`
   - `https://eminarc.com/login`

### Step 4: Database Schema Deployment (Future Step)
When ready to create database tables, run the SQL schema migrations for `profiles`, `workspaces`, `workspace_members`, `leads`, and `content_items` via the Supabase SQL Editor or Supabase CLI (`supabase db push`).

---

## 🧪 Modular Usage Examples

### Using `useAuth()` in Components

```tsx
import { useAuth } from "@/hooks/useAuth";

export function UserProfileCard() {
  const { user, profile, isAuthenticated, signOut, isLoading } = useAuth();

  if (isLoading) return <div>Loading user state...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;

  return (
    <div>
      <p>Logged in as: {profile?.fullName || user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

### Using Modular Services

```tsx
import { authService } from "@/lib/supabase/services/auth-service";

async function handleLogin(email: string, pass: string) {
  const { data, error } = await authService.signInWithPassword(email, pass);
  if (error) {
    console.error("Login failed:", error.message);
  } else {
    console.log("Logged in user ID:", data?.user?.id);
  }
}
```
