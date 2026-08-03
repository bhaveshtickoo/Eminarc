import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Sparkles, Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — Eminarc Growth OS" },
      { name: "description", content: "Create your Eminarc Growth OS account." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated, signUp, signInWithGoogle, signInWithGitHub, isConfigured } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);

    if (!isConfigured) {
      setTimeout(() => {
        toast.success("Account created successfully! Let's set up your workspace.");
        navigate({ to: "/onboarding" });
        setLoading(false);
      }, 600);
      return;
    }

    const { data, error } = await signUp(email, password, fullName);
    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to create account.");
    } else if (data?.user) {
      if (data.session) {
        toast.success("Account created! Let's set up your workspace.");
        navigate({ to: "/onboarding" });
      } else {
        toast.success("Verification link sent to your email!");
        navigate({ to: `/verify-email?email=${encodeURIComponent(email)}` });
      }
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    if (!isConfigured) {
      setTimeout(() => {
        toast.info(`Creating account with ${provider === "google" ? "Google" : "GitHub"}…`);
        navigate({ to: "/onboarding" });
        setOauthLoading(null);
      }, 600);
      return;
    }

    const fn = provider === "google" ? signInWithGoogle : signInWithGitHub;
    const { data, error } = await fn("/onboarding");
    setOauthLoading(null);

    if (error) {
      toast.error(error.message || `Failed to connect with ${provider}.`);
    } else if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary card-glow">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold">Create your workspace</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Get started with Eminarc Growth OS in seconds
          </p>
        </div>

        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          {/* Social OAuth Providers */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              className="gap-2 text-xs font-medium"
              disabled={Boolean(oauthLoading || loading)}
              onClick={() => handleOAuth("google")}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              {oauthLoading === "google" ? "Connecting…" : "Google"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="gap-2 text-xs font-medium"
              disabled={Boolean(oauthLoading || loading)}
              onClick={() => handleOAuth("github")}
            >
              <Github className="h-4 w-4 text-foreground" />
              {oauthLoading === "github" ? "Connecting…" : "GitHub"}
            </Button>
          </div>

          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative bg-card px-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              Or sign up with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Jordan Lee"
                  className="pl-9"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading || Boolean(oauthLoading)}>
              {loading ? "Creating account…" : "Create account"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
            <div className="text-center text-xs text-muted-foreground pt-1">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
