import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { toast } from "sonner";

export function SessionManager() {
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Logged in
      } else if (event === "SIGNED_OUT") {
        toast.info("You have signed out.");
      } else if (event === "TOKEN_REFRESHED") {
        console.log("[SessionManager] Auth session token refreshed.");
      } else if (event === "USER_UPDATED") {
        toast.success("User credentials updated.");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
}
