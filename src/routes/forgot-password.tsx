import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — Eminarc Growth OS" },
      { name: "description", content: "Reset your Eminarc Growth OS password." },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const { forgotPassword, isConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    if (!isConfigured) {
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
        toast.success("Password reset email sent (Demo Mode)");
      }, 600);
      return;
    }

    const { error } = await forgotPassword(email);
    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to send reset instructions.");
    } else {
      setSubmitted(true);
      toast.success("Check your email for reset instructions.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary card-glow">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold">Reset your password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll send you instructions to reset your password
          </p>
        </div>

        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          {submitted ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">Check your inbox</h3>
              <p className="text-xs text-muted-foreground">
                We sent a password recovery link to{" "}
                <span className="font-medium text-foreground">{email}</span>.
              </p>
              <Button asChild variant="outline" className="w-full gap-2">
                <Link to="/login">
                  <ArrowLeft className="h-4 w-4" /> Back to sign in
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? "Sending reset link…" : "Send reset link"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>
              <div className="text-center pt-1">
                <Link
                  to="/login"
                  className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground gap-1"
                >
                  <ArrowLeft className="h-3 w-3" /> Back to sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
