import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Eminarc Growth OS" },
      { name: "description", content: "Sign in to your Eminarc Growth OS workspace." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Welcome back to Eminarc Growth OS");
      navigate({ to: "/" });
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary card-glow">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold">Eminarc Growth OS</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            The AI operating system for B2B growth teams
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="pl-9"
                defaultValue="jordan@eminarc.com"
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
                placeholder="••••••••"
                className="pl-9"
                defaultValue="demo1234"
              />
            </div>
          </div>
          <Button type="submit" className="w-full gap-2" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
          <div className="flex items-center justify-between text-xs">
            <Link to="/login" className="text-muted-foreground hover:text-foreground">
              Forgot password?
            </Link>
            <span className="text-muted-foreground">
              New here?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign up
              </Link>
            </span>
          </div>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Prototype — any credentials work. No real auth yet.
        </p>
      </div>
    </div>
  );
}
