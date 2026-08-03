import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  Database,
  ShieldCheck,
  ShieldAlert,
  Wifi,
  WifiOff,
  UserCheck,
  UserX,
  Building2,
  RefreshCw,
  Copy,
  Check,
  ArrowLeft,
  Key,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspace } from "@/hooks/useWorkspace";
import { supabase } from "@/lib/supabase/client";
import { supabaseConfig } from "@/lib/supabase/config";

export const Route = createFileRoute("/debug/supabase")({
  head: () => ({
    meta: [
      { title: "Supabase Debug Portal — Eminarc Growth OS" },
      { name: "description", content: "Temporary developer debugging route for Supabase telemetry." },
    ],
  }),
  component: SupabaseDebugPage,
});

function SupabaseDebugPage() {
  const { user, session, isAuthenticated, isConfigured } = useAuth();
  const { currentWorkspace } = useWorkspace();

  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "disconnected">("checking");
  const [connectionLatency, setConnectionLatency] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const testConnection = async () => {
    setIsTesting(true);
    setConnectionStatus("checking");
    setErrorMessage(null);
    const start = performance.now();

    try {
      if (!isConfigured) {
        throw new Error("Supabase environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) are missing or set to defaults.");
      }

      // Query database table health check
      const { error } = await supabase.from("workspaces").select("id").limit(1);

      // Even if table empty or RLS blocks rows, a network return means client connected
      if (error && error.code !== "PGRST116" && error.code !== "42P01") {
        // Only actual network/auth credentials errors fail connection test
        if (error.message.includes("fetch") || error.message.includes("API key")) {
          throw error;
        }
      }

      const latency = Math.round(performance.now() - start);
      setConnectionLatency(latency);
      setConnectionStatus("connected");
      toast.success(`Connected to Supabase (${latency}ms)`);
    } catch (err: any) {
      setConnectionStatus("disconnected");
      setErrorMessage(err.message || "Failed to reach Supabase endpoint.");
      toast.error("Supabase connection failed");
    } finally {
      setIsTesting(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const copyDebugJson = () => {
    const payload = {
      timestamp: new Date().toISOString(),
      supabaseUrl: supabaseConfig.url,
      isConfigured,
      connectionStatus,
      connectionLatencyMs: connectionLatency,
      isAuthenticated,
      user: user
        ? {
            id: user.id,
            email: user.email,
            role: user.role,
            lastSignInAt: user.last_sign_in_at,
          }
        : null,
      session: session
        ? {
            expiresAt: session.expires_at,
            tokenType: session.token_type,
            userProvider: session.user?.app_metadata?.provider || "email",
          }
        : null,
      workspaceId: currentWorkspace?.id || null,
      workspaceName: currentWorkspace?.name || null,
      errorMessage,
    };

    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    toast.success("Debug JSON payload copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#18181B] font-sans p-4 md:p-8 select-none">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFFFF] border border-[#E5E0D6] p-5 rounded-[18px] shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
                DEVELOPER TOOLING
              </span>
              <span className="font-mono text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full">
                TEMPORARY DEBUG ROUTE
              </span>
            </div>
            <h1 className="font-sans font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
              Supabase Telemetry & Health Radar
            </h1>
            <p className="text-xs md:text-sm text-[#716D64]">
              Inspect client connectivity, auth tokens, session state, and workspace scoping parameters.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={testConnection}
              disabled={isTesting}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] font-mono text-xs font-bold hover:bg-[#F7F4EE] transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isTesting ? "animate-spin text-primary" : ""}`} />
              <span>Test Connection</span>
            </button>

            <button
              type="button"
              onClick={copyDebugJson}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#222222] transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>Copy Debug JSON</span>
            </button>
          </div>
        </div>

        {/* Status Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Connection Status Badge */}
          <div className="p-5 rounded-[18px] bg-[#FFFFFF] border border-[#E5E0D6] space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-[#716D64]">
                CONNECTION STATUS
              </span>
              {connectionStatus === "connected" ? (
                <Wifi className="h-4 w-4 text-emerald-600" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-600" />
              )}
            </div>

            <div className="flex items-center space-x-2 pt-1">
              {connectionStatus === "checking" ? (
                <span className="font-mono text-xs px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                  TESTING CONNECTION...
                </span>
              ) : connectionStatus === "connected" ? (
                <span className="font-mono text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping inline-block" />
                  CONNECTED ({connectionLatency}ms)
                </span>
              ) : (
                <span className="font-mono text-xs px-2.5 py-1 rounded-full font-bold bg-red-100 text-red-800 border border-red-300">
                  DISCONNECTED
                </span>
              )}
            </div>
          </div>

          {/* Authentication Status Badge */}
          <div className="p-5 rounded-[18px] bg-[#FFFFFF] border border-[#E5E0D6] space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-[#716D64]">
                AUTH STATUS
              </span>
              {isAuthenticated ? (
                <UserCheck className="h-4 w-4 text-emerald-600" />
              ) : (
                <UserX className="h-4 w-4 text-red-600" />
              )}
            </div>

            <div className="flex items-center space-x-2 pt-1">
              {isAuthenticated ? (
                <span className="font-mono text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  AUTHENTICATED
                </span>
              ) : (
                <span className="font-mono text-xs px-2.5 py-1 rounded-full font-bold bg-red-100 text-red-800 border border-red-300">
                  UNAUTHENTICATED
                </span>
              )}
            </div>
          </div>

          {/* Workspace ID Badge */}
          <div className="p-5 rounded-[18px] bg-[#FFFFFF] border border-[#E5E0D6] space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-[#716D64]">
                WORKSPACE SCOPE
              </span>
              <Building2 className={`h-4 w-4 ${currentWorkspace?.id ? "text-emerald-600" : "text-red-600"}`} />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              {currentWorkspace?.id ? (
                <span className="font-mono text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 truncate max-w-full">
                  ACTIVE ({currentWorkspace.name})
                </span>
              ) : (
                <span className="font-mono text-xs px-2.5 py-1 rounded-full font-bold bg-red-100 text-red-800 border border-red-300">
                  NO WORKSPACE SET
                </span>
              )}
            </div>
          </div>

          {/* Supabase URL Config Badge */}
          <div className="p-5 rounded-[18px] bg-[#FFFFFF] border border-[#E5E0D6] space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-[#716D64]">
                CONFIG STATUS
              </span>
              <Database className={`h-4 w-4 ${isConfigured ? "text-emerald-600" : "text-red-600"}`} />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              {isConfigured ? (
                <span className="font-mono text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ENV CONFIGURED
                </span>
              ) : (
                <span className="font-mono text-xs px-2.5 py-1 rounded-full font-bold bg-red-100 text-red-800 border border-red-300">
                  ENV MISSING
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Telemetry Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Panel 1: Environment & Workspace Details */}
          <div className="p-6 rounded-[18px] bg-[#FFFFFF] border border-[#E5E0D6] space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-[#E5E0D6] pb-3">
              <Database className="h-4 w-4 text-[#18181B]" />
              <h2 className="font-sans font-bold text-base text-[#111111]">
                Environment & Workspace Metadata
              </h2>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-[#716D64] block font-semibold">SUPABASE URL</span>
                <span className="text-[#18181B] bg-[#F7F4EE] px-3 py-1.5 rounded-lg block mt-1 border border-[#E5E0D6] truncate">
                  {supabaseConfig.url}
                </span>
              </div>

              <div>
                <span className="text-[#716D64] block font-semibold">WORKSPACE ID</span>
                <span className="text-[#18181B] bg-[#F7F4EE] px-3 py-1.5 rounded-lg block mt-1 border border-[#E5E0D6] truncate">
                  {currentWorkspace?.id || "None"}
                </span>
              </div>

              <div>
                <span className="text-[#716D64] block font-semibold">COMPANY NAME</span>
                <span className="text-[#18181B] bg-[#F7F4EE] px-3 py-1.5 rounded-lg block mt-1 border border-[#E5E0D6]">
                  {currentWorkspace?.name || "Not initialized"}
                </span>
              </div>

              <div>
                <span className="text-[#716D64] block font-semibold">DOMAIN / INDUSTRY</span>
                <span className="text-[#18181B] bg-[#F7F4EE] px-3 py-1.5 rounded-lg block mt-1 border border-[#E5E0D6]">
                  {currentWorkspace?.domain} · {currentWorkspace?.industry}
                </span>
              </div>
            </div>
          </div>

          {/* Panel 2: User Profile Details */}
          <div className="p-6 rounded-[18px] bg-[#FFFFFF] border border-[#E5E0D6] space-y-4 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-[#E5E0D6] pb-3">
              <UserCheck className="h-4 w-4 text-[#18181B]" />
              <h2 className="font-sans font-bold text-base text-[#111111]">
                Current Authenticated User
              </h2>
            </div>

            {user ? (
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-[#716D64] block font-semibold">USER ID</span>
                  <span className="text-[#18181B] bg-[#F7F4EE] px-3 py-1.5 rounded-lg block mt-1 border border-[#E5E0D6] truncate">
                    {user.id}
                  </span>
                </div>

                <div>
                  <span className="text-[#716D64] block font-semibold">EMAIL ADDRESS</span>
                  <span className="text-[#18181B] bg-[#F7F4EE] px-3 py-1.5 rounded-lg block mt-1 border border-[#E5E0D6]">
                    {user.email}
                  </span>
                </div>

                <div>
                  <span className="text-[#716D64] block font-semibold">ROLE / AUTH PROVIDER</span>
                  <span className="text-[#18181B] bg-[#F7F4EE] px-3 py-1.5 rounded-lg block mt-1 border border-[#E5E0D6]">
                    {user.role || "authenticated"} · {session?.user?.app_metadata?.provider || "email"}
                  </span>
                </div>

                <div>
                  <span className="text-[#716D64] block font-semibold">LAST SIGN-IN TIMESTAMP</span>
                  <span className="text-[#18181B] bg-[#F7F4EE] px-3 py-1.5 rounded-lg block mt-1 border border-[#E5E0D6]">
                    {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "Active Session"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center space-y-2 bg-[#F7F4EE] rounded-xl border border-dashed border-[#E5E0D6]">
                <UserX className="h-8 w-8 text-red-500 mx-auto" />
                <p className="font-bold text-sm text-[#111111]">Unauthenticated Session</p>
                <p className="text-xs text-[#716D64]">
                  No authenticated Supabase user profile detected in browser memory.
                </p>
                <Link
                  to="/login"
                  className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold"
                >
                  Go to Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Panel 3: Session JSON Payload */}
        <div className="p-6 rounded-[18px] bg-[#FFFFFF] border border-[#E5E0D6] space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4 text-[#18181B]" />
              <h2 className="font-sans font-bold text-base text-[#111111]">
                Active Supabase Session Payload
              </h2>
            </div>
            <span className="font-mono text-[10px] text-[#716D64] uppercase font-bold">
              {session ? "SESSION ACTIVE" : "NO ACTIVE SESSION"}
            </span>
          </div>

          <pre className="p-4 rounded-xl bg-[#18181B] text-emerald-400 font-mono text-xs overflow-x-auto border border-black shadow-inner max-h-72">
            {session
              ? JSON.stringify(
                  {
                    access_token: `${session.access_token.slice(0, 20)}...[TRUNCATED]`,
                    token_type: session.token_type,
                    expires_in: session.expires_in,
                    expires_at: session.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : null,
                    refresh_token: session.refresh_token ? "PRESENT" : "MISSING",
                    user: {
                      id: session.user?.id,
                      email: session.user?.email,
                      aud: session.user?.aud,
                      role: session.user?.role,
                    },
                  },
                  null,
                  2
                )
              : JSON.stringify({ status: "NO_ACTIVE_SESSION", message: "User is unauthenticated." }, null, 2)}
          </pre>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-2 text-xs font-mono text-[#716D64]">
          <Link
            to="/"
            className="flex items-center space-x-1.5 hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Application</span>
          </Link>
          <span>EMINARC GROWTH OS · SUPABASE DEBUGGER</span>
        </div>
      </div>
    </div>
  );
}
