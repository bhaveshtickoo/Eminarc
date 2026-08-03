import { createFileRoute, useSearch, Link } from "@tanstack/react-router";
import { Sparkles, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerifySearch {
  email?: string;
}

export const Route = createFileRoute("/verify-email")({
  validateSearch: (search: Record<string, unknown>): VerifySearch => {
    return {
      email: typeof search["email"] === "string" ? search["email"] : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Verify Email — Eminarc Growth OS" },
      { name: "description", content: "Verify your email address for Eminarc Growth OS." },
    ],
  }),
  component: VerifyEmail,
});

function VerifyEmail() {
  const search = useSearch({ from: "/verify-email" });
  const email = search.email || "your email";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary card-glow">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold">Check your email</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            We sent a verification link to <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="h-6 w-6" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Click the link in the verification email to complete your registration and log in to your Eminarc workspace.
          </p>
          <div className="pt-2">
            <Button asChild variant="outline" className="w-full gap-2">
              <Link to="/login">
                <ArrowLeft className="h-4 w-4" /> Return to sign in
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
