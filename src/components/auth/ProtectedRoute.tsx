import React from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { isDemoModeEnabled } from "@/context/AuthContext";
import { Sparkles } from "lucide-react";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, isConfigured, profile, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const currentLocation = useRouterState({ select: (s) => s.location.pathname });

  const isDemo = isDemoMode || isDemoModeEnabled();

  useEffect(() => {
    // If Demo Mode is enabled, always allow access
    if (isDemo) return;

    // If Supabase is configured and authentication check is complete
    if (!isLoading && isConfigured) {
      if (!isAuthenticated) {
        const redirectPath = currentLocation && currentLocation !== "/" ? currentLocation : "";
        const searchParams = redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : "";
        navigate({ to: `/login${searchParams}` });
      } else if (profile && !profile.onboarding_completed && currentLocation !== "/onboarding") {
        // First-time user detection: profile exists but onboarding is incomplete -> redirect to /onboarding
        navigate({ to: "/onboarding" });
      }
    }
  }, [isAuthenticated, isLoading, isConfigured, profile, currentLocation, navigate, isDemo]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary card-glow animate-pulse">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Authenticating session…</p>
        </div>
      </div>
    );
  }

  // If Supabase is configured but user is not authenticated, render empty while redirecting
  if (isConfigured && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
