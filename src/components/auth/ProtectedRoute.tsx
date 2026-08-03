import React from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles } from "lucide-react";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, isConfigured } = useAuth();
  const navigate = useNavigate();
  const currentLocation = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    // If Supabase is configured and authentication check is complete
    if (!isLoading && isConfigured && !isAuthenticated) {
      const redirectPath = currentLocation && currentLocation !== "/" ? currentLocation : "";
      const searchParams = redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : "";
      navigate({ to: `/login${searchParams}` });
    }
  }, [isAuthenticated, isLoading, isConfigured, currentLocation, navigate]);

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

  // If Supabase is configured but user is not authenticated, render loading/empty while redirecting
  if (isConfigured && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
