# Authentication Flow & Architecture Guide — Eminarc Growth OS

This document details the complete frontend and Supabase authentication architecture for **Eminarc Growth OS**.

---

## 🎯 Architecture Overview

```
[ Unauthenticated User ]
          │
          ├── Accesses Protected Route (e.g. /analytics) ──> Redirects to /login?redirect=%2Fanalytics
          │
          ├── [ Login / Signup Options ]
          │     ├── Email & Password ────────> Supabase Auth (auth.signInWithPassword / signUp)
          │     ├── Google OAuth ────────────> Supabase OAuth (provider: 'google')
          │     └── GitHub OAuth ────────────> Supabase OAuth (provider: 'github')
          │
          └── [ Auth Success ] ──────────────> Auto-returns user to intended return URL (/analytics)

[ Authenticated User ]
          │
          ├── Session Persisted via LocalStorage & Cookie Sync
          ├── Token Auto-Refreshed via SessionManager
          └── Sign Out via Header Dropdown ──> Clears Session & Redirects to /login
```

---

## 📄 Authentication Pages & Routes

| Route | File Path | Description |
| :--- | :--- | :--- |
| `/login` | [`src/routes/login.tsx`](file:///l:/VS%20CODE/Eminarc/src/routes/login.tsx) | Email/Password login, Google & GitHub OAuth triggers, return-URL redirection. |
| `/signup` | [`src/routes/signup.tsx`](file:///l:/VS%20CODE/Eminarc/src/routes/signup.tsx) | User registration with full name, email, password, and social OAuth options. |
| `/forgot-password` | [`src/routes/forgot-password.tsx`](file:///l:/VS%20CODE/Eminarc/src/routes/forgot-password.tsx) | Requests password recovery link sent via Supabase email service. |
| `/reset-password` | [`src/routes/reset-password.tsx`](file:///l:/VS%20CODE/Eminarc/src/routes/reset-password.tsx) | Form for updating password after opening recovery link. |
| `/verify-email` | [`src/routes/verify-email.tsx`](file:///l:/VS%20CODE/Eminarc/src/routes/verify-email.tsx) | Registration email verification pending notification screen. |
| `/auth/callback` | [`src/routes/auth.callback.tsx`](file:///l:/VS%20CODE/Eminarc/src/routes/auth.callback.tsx) | OAuth and Magic Link callback handler exchanging auth tokens. |

---

## 🛡️ Protected Routes Architecture

Route protection is enforced at layout level via `<ProtectedRoute>`:

1. **Guard Implementation**:
   [`src/components/auth/ProtectedRoute.tsx`](file:///l:/VS%20CODE/Eminarc/src/components/auth/ProtectedRoute.tsx) wraps the dashboard layout in [`src/routes/_dashboard.tsx`](file:///l:/VS%20CODE/Eminarc/src/routes/_dashboard.tsx).

2. **Redirect Rule**:
   - If `isAuthenticated === false` and `isLoading === false`:
     - Captures `location.pathname` (e.g. `/content/strategy`).
     - Redirects to `/login?redirect=%2Fcontent%2Fstrategy`.
   - Upon successful login, the application reads the `redirect` query param and returns the user directly to `/content/strategy`.

3. **Already Authenticated Rule**:
   - If an authenticated user navigates to `/login` or `/signup`, they are automatically redirected back to their previous page or `/`.

---

## 🔑 Key Components & Hooks

### 1. `AuthProvider`
Defined in [`src/context/AuthContext.tsx`](file:///l:/VS%20CODE/Eminarc/src/context/AuthContext.tsx) and wrapped around the root shell in [`src/routes/__root.tsx`](file:///l:/VS%20CODE/Eminarc/src/routes/__root.tsx). Manages user, session, profile state, and exposes auth methods.

### 2. `useAuth()` Hook
Defined in [`src/hooks/useAuth.ts`](file:///l:/VS%20CODE/Eminarc/src/hooks/useAuth.ts). Provides components with:
```typescript
const {
  user,
  session,
  profile,
  isAuthenticated,
  isLoading,
  signInWithPassword,
  signUp,
  signInWithGoogle,
  signInWithGitHub,
  forgotPassword,
  resetPassword,
  signOut,
} = useAuth();
```

### 3. `SessionManager`
Defined in [`src/components/auth/SessionManager.tsx`](file:///l:/VS%20CODE/Eminarc/src/components/auth/SessionManager.tsx). Monitors `onAuthStateChange` events, auto-refreshes tokens before expiry, and synchronizes auth state across open browser tabs.

---

## 🌐 OAuth Setup Guide (Google & GitHub)

To activate live Google and GitHub sign-in for production:

### Google OAuth Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create OAuth 2.0 Credentials (Web application).
3. Set Authorized Redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`
4. Copy Client ID & Client Secret to **Supabase Dashboard** -> **Authentication** -> **Providers** -> **Google**.

### GitHub OAuth Setup:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers) -> OAuth Apps.
2. Register a new application.
3. Set Authorization Callback URL: `https://<your-project-ref>.supabase.co/auth/v1/callback`
4. Copy Client ID & Client Secret to **Supabase Dashboard** -> **Authentication** -> **Providers** -> **GitHub**.

---

## 🧪 Testing Checklist

- [x] Unauthenticated user accessing `/` or `/crm` is redirected to `/login?redirect=...`.
- [x] Submitting login form redirects to intended page.
- [x] Clicking Google or GitHub OAuth triggers redirect flow.
- [x] Sign up creates account and handles email verification workflow.
- [x] Forgot password sends reset email link to user.
- [x] Reset password updates user password successfully.
- [x] Session persists across page reloads.
- [x] Sign out from top header menu clears session and redirects to `/login`.
