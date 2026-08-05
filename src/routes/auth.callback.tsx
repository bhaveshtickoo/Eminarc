import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { profileService } from "@/lib/supabase/services/profile-service";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface CallbackSearch {
  redirect?: string;
}

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (search: Record<string, unknown>): CallbackSearch => {
    return {
      redirect: typeof search["redirect"] === "string" ? search["redirect"] : undefined,
    };
  },
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth/callback" });
  const redirectUrl = search.redirect || "/";

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(async ({ data, error }) => {
        if (error) {
          toast.error("Authentication failed: " + error.message);
          navigate({ to: "/login" });
        } else if (data.session) {
          toast.success("Successfully authenticated!");
          const { data: userProfile } = await profileService.ensureProfile(data.session.user);
          if (userProfile && !userProfile.onboarding_completed) {
            navigate({ to: "/onboarding" });
          } else {
            navigate({ to: redirectUrl });
          }
        } else {
          // Check session again after brief delay in case hash params are processing
          setTimeout(() => {
            navigate({ to: redirectUrl });
          }, 800);
        }
      })
      .catch((err) => {
        console.error("Auth callback exception:", err);
        navigate({ to: "/login" });
      });
  }, [redirectUrl, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary card-glow animate-pulse">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">Completing sign in…</p>
      </div>
    </div>
  );
}
