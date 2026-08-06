import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Building2,
  Globe,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Check,
  Target,
  Zap,
  Briefcase,
  TrendingUp,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { profileService } from "@/lib/supabase/services/profile-service";
import { workspaceService } from "@/lib/supabase/services/workspace-service";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Workspace Setup — Eminarc Growth OS" },
      { name: "description", content: "Configure your AI growth workspace." },
    ],
  }),
  component: () => (
    <ProtectedRoute>
      <OnboardingWizard />
    </ProtectedRoute>
  ),
});

const INDUSTRIES = [
  "B2B SaaS & Enterprise Software",
  "Artificial Intelligence & ML",
  "FinTech & Financial Services",
  "Growth Consultancy & Agency",
  "Developer Tools & Infrastructure",
  "HealthTech & Life Sciences",
  "E-Commerce & Digital Media",
  "Cyber Security & IT Services",
];

const COMPANY_SIZES = [
  { id: "1-10", label: "1-10 employees", detail: "Seed / Early Stage" },
  { id: "11-50", label: "11-50 employees", detail: "Growth Stage" },
  { id: "51-200", label: "51-200 employees", detail: "Mid-Market" },
  { id: "201-500", label: "201-500 employees", detail: "Scale-Up" },
  { id: "500+", label: "500+ employees", detail: "Enterprise" },
];

const GROWTH_GOALS = [
  {
    id: "organic_ai",
    title: "Organic AI & Search Visibility",
    desc: "Dominate search engines and LLM recommendations (ChatGPT, Perplexity, Claude).",
    icon: TrendingUp,
  },
  {
    id: "lead_gen",
    title: "Inbound Lead Generation",
    desc: "Identify and score high-intent B2B target accounts in real-time.",
    icon: Target,
  },
  {
    id: "outreach",
    title: "Outreach & Pipeline Automation",
    desc: "Automate multi-channel outreach campaigns and meeting booking.",
    icon: Zap,
  },
  {
    id: "thought_leadership",
    title: "Content & Thought Leadership",
    desc: "Generate high-authority B2B content strategy and LinkedIn positioning.",
    icon: Briefcase,
  },
];

type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

function OnboardingWizard() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();

  const [step, setStep] = useState<StepNumber>(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("B2B SaaS & Enterprise Software");
  const [companySize, setCompanySize] = useState("11-50");
  const [growthGoal, setGrowthGoal] = useState("Organic AI & Search Visibility");

  // Populate initial values from auth profile when available
  useEffect(() => {
    if (profile?.onboarding_completed) {
      navigate({ to: "/" });
    }
    if (profile?.fullName || profile?.full_name) {
      setFullName(profile.fullName || profile.full_name || "");
    }
  }, [profile, navigate]);

  const handleNext = () => {
    if (step === 2 && !fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (step === 3 && !companyName.trim()) {
      toast.error("Please enter your company name.");
      return;
    }
    if (step < 8) {
      setStep((prev) => (prev + 1) as StepNumber);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as StepNumber);
    }
  };

  const handleFinalSubmit = async () => {
    if (!user?.id) {
      toast.error("User session not found.");
      return;
    }

    setLoading(true);
    try {
      // 1. Update Profile (including full_name and onboarding_completed = true)
      const profileResult = await profileService.updateProfile(user.id, {
        full_name: fullName.trim() || profile?.full_name || "Eminarc User",
        onboarding_completed: true,
      });

      if (profileResult.error) {
        console.warn("[Onboarding] Profile update warning:", profileResult.error);
      }

      // 2. Update Workspace
      const wsResult = await workspaceService.ensureWorkspace(
        user.id,
        companyName.trim() || "My Workspace",
      );
      if (wsResult.data) {
        const logoLetter = companyName.trim() ? companyName.trim()[0].toUpperCase() : "E";
        const formattedDomain = website.trim()
          ? website.trim().replace(/^https?:\/\//, "")
          : `${(companyName || "mycompany").toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;

        await workspaceService.updateWorkspace(wsResult.data.id, {
          name: companyName.trim() || "My Workspace",
          domain: formattedDomain,
          industry,
          tagline: growthGoal,
          logo_letter: logoLetter,
          metrics: {
            growthScore: 85,
            companySize,
            primaryGoal: growthGoal,
          },
        });
      }

      // 3. Refresh Profile state in context
      await refreshProfile();

      toast.success("Welcome to Eminarc Growth OS! Your workspace is ready.");
      navigate({ to: "/" });
    } catch (err) {
      console.error("Onboarding completion failed:", err);
      toast.error("Failed to finish setup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      // Step 1: Welcome
      case 1:
        return (
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Gen Growth OS</span>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome to Eminarc Growth OS
            </h1>
            <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
              The AI-powered operating system for B2B growth teams — research, plan, execute, and
              measure every growth channel from one system.
            </p>
            <div className="mt-8 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex flex-col items-center rounded-xl border border-border/50 bg-card p-3 text-center">
                <Target className="mb-2 h-5 w-5 text-primary" />
                <span className="text-xs font-semibold">AI Research</span>
              </div>
              <div className="flex flex-col items-center rounded-xl border border-border/50 bg-card p-3 text-center">
                <Zap className="mb-2 h-5 w-5 text-primary" />
                <span className="text-xs font-semibold">Growth Engine</span>
              </div>
              <div className="flex flex-col items-center rounded-xl border border-border/50 bg-card p-3 text-center">
                <TrendingUp className="mb-2 h-5 w-5 text-primary" />
                <span className="text-xs font-semibold">Visibility OS</span>
              </div>
            </div>
            <Button onClick={handleNext} size="lg" className="mt-8 w-full max-w-xs gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        );

      // Step 2: Name
      case 2:
        return (
          <div className="flex flex-col text-left">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold">What is your full name?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We will personalize your Growth OS copilot and workspace profile.
            </p>
            <div className="mt-6 space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="e.g. Alex Morgan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoFocus
                className="h-11"
              />
            </div>
          </div>
        );

      // Step 3: Company
      case 3:
        return (
          <div className="flex flex-col text-left">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold">What is your company name?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              This will serve as the primary title of your growth workspace.
            </p>
            <div className="mt-6 space-y-2">
              <Label htmlFor="companyName">Company / Workspace Name</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="e.g. Acme Technologies"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                autoFocus
                className="h-11"
              />
            </div>
          </div>
        );

      // Step 4: Website
      case 4:
        return (
          <div className="flex flex-col text-left">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Globe className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold">What is your company website?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Used by AI agents to research your market, brand positioning, and products.
            </p>
            <div className="mt-6 space-y-2">
              <Label htmlFor="website">Website Domain</Label>
              <Input
                id="website"
                type="text"
                placeholder="e.g. acmetechnologies.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                autoFocus
                className="h-11"
              />
            </div>
          </div>
        );

      // Step 5: Industry
      case 5:
        return (
          <div className="flex flex-col text-left">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Briefcase className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold">
              Which industry describes your business?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tailors ICP templates, competitor analysis, and visibility scoring.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setIndustry(ind)}
                  className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-sm font-medium transition-all ${
                    industry === ind
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border/60 bg-card hover:border-primary/40 hover:bg-accent/40"
                  }`}
                >
                  <span className="truncate">{ind}</span>
                  {industry === ind && <Check className="h-4 w-4 shrink-0 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        );

      // Step 6: Company Size
      case 6:
        return (
          <div className="flex flex-col text-left">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold">What is your company size?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Helps us configure team member limits and workflow defaults.
            </p>
            <div className="mt-6 space-y-2.5">
              {COMPANY_SIZES.map((cs) => (
                <button
                  key={cs.id}
                  type="button"
                  onClick={() => setCompanySize(cs.label)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                    companySize === cs.label
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border/60 bg-card hover:border-primary/40 hover:bg-accent/40"
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold">{cs.label}</div>
                    <div className="text-xs text-muted-foreground">{cs.detail}</div>
                  </div>
                  {companySize === cs.label && <Check className="h-5 w-5 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        );

      // Step 7: Growth Goal
      case 7:
        return (
          <div className="flex flex-col text-left">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold">What is your primary growth goal?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select the core outcome you want your AI Growth OS to deliver first.
            </p>
            <div className="mt-6 space-y-3">
              {GROWTH_GOALS.map((gg) => {
                const IconComp = gg.icon;
                const selected = growthGoal === gg.title;
                return (
                  <button
                    key={gg.id}
                    type="button"
                    onClick={() => setGrowthGoal(gg.title)}
                    className={`flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${
                      selected
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-border/60 bg-card hover:border-primary/40 hover:bg-accent/40"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      <IconComp className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{gg.title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{gg.desc}</div>
                    </div>
                    {selected && <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        );

      // Step 8: Finish
      case 8:
        return (
          <div className="flex flex-col text-left">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold">Your Workspace is Ready!</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Review your configuration details below before launching your Growth OS dashboard.
            </p>

            <div className="mt-6 divide-y divide-border/60 rounded-xl border border-border/60 bg-card/60 p-4">
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">Full Name</span>
                <span className="font-medium text-foreground">{fullName || "Eminarc User"}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">Company Name</span>
                <span className="font-medium text-foreground">{companyName || "My Workspace"}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">Website</span>
                <span className="font-medium text-foreground">{website || "Not specified"}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">Industry</span>
                <span className="font-medium text-foreground">{industry}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">Company Size</span>
                <span className="font-medium text-foreground">{companySize}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">Primary Goal</span>
                <span className="font-medium text-primary">{growthGoal}</span>
              </div>
            </div>

            <Button
              onClick={handleFinalSubmit}
              disabled={loading}
              size="lg"
              className="mt-6 w-full gap-2 font-semibold"
            >
              {loading ? "Initializing Workspace…" : "Launch Growth OS Dashboard"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
      <div className="w-full max-w-xl">
        {/* Header Branding */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl gradient-primary card-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-sm font-semibold tracking-wide text-foreground">
            Eminarc Growth OS
          </span>
        </div>

        {/* Stepper Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Step {step} of 8</span>
            <span>
              {step === 1 && "Welcome"}
              {step === 2 && "Name"}
              {step === 3 && "Company"}
              {step === 4 && "Website"}
              {step === 5 && "Industry"}
              {step === 6 && "Company Size"}
              {step === 7 && "Growth Goal"}
              {step === 8 && "Finish"}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${(step / 8) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Card Container */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-lg sm:p-8">
          {renderStepContent()}

          {/* Bottom Actions for steps 2 to 7 */}
          {step > 1 && step < 8 && (
            <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBack}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button type="button" onClick={handleNext} className="gap-2">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
