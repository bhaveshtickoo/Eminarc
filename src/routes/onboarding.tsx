import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Building2,
  Globe,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { supabaseWorkspaceService, TeamMemberInvite } from "@/lib/supabase/services/supabase-workspace-service";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Workspace Setup — Eminarc Growth OS" },
      { name: "description", content: "Create and configure your growth workspace." },
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
  "Growth Consultancy & Agency",
  "Artificial Intelligence & ML",
  "FinTech & Financial Services",
  "Developer Tools & Infrastructure",
  "HealthTech & Life Sciences",
  "E-Commerce & Digital Media",
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "India",
  "Canada",
  "Germany",
  "Singapore",
  "Australia",
];

const TIMEZONES = [
  "UTC-8:00 (Pacific Time - PST)",
  "UTC-5:00 (Eastern Time - EST)",
  "UTC+0:00 (Greenwich Mean Time - GMT)",
  "UTC+1:00 (Central European Time - CET)",
  "UTC+4:00 (Gulf Standard Time - GST)",
  "UTC+5:30 (Indian Standard Time - IST)",
  "UTC+8:00 (Singapore Standard Time - SGT)",
];

const TARGET_MARKET_OPTIONS = ["USA", "MENA", "Europe", "APAC", "LATAM", "Global"];

const BRAND_TONE_OPTIONS = [
  "Strategic & Analytical",
  "Founder-First & Authority",
  "Minimalist & Direct",
  "Data-Driven & Bold",
  "Visionary & High-Growth",
];

function OnboardingWizard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createAndSetWorkspace } = useWorkspace();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  // Step 1 State: Workspace Info
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("B2B SaaS & Enterprise Software");
  const [website, setWebsite] = useState("");
  const [brand, setBrand] = useState("Strategic & Analytical");
  const [country, setCountry] = useState("United States");
  const [timezone, setTimezone] = useState("UTC-5:00 (Eastern Time - EST)");
  const [selectedTargetMarkets, setSelectedTargetMarkets] = useState<string[]>(["USA"]);
  const [logoLetter, setLogoLetter] = useState("E");

  // Step 2 State: Team Invites
  const [teamInvites, setTeamInvites] = useState<TeamMemberInvite[]>([
    { email: "", role: "member" },
  ]);

  const toggleTargetMarket = (market: string) => {
    setSelectedTargetMarkets((prev) =>
      prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market]
    );
  };

  const handleAddInvite = () => {
    setTeamInvites((prev) => [...prev, { email: "", role: "member" }]);
  };

  const handleRemoveInvite = (index: number) => {
    setTeamInvites((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateInvite = (index: number, field: keyof TeamMemberInvite, value: string) => {
    setTeamInvites((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      toast.error("Please enter a company name.");
      return;
    }
    const initial = companyName.trim()[0].toUpperCase();
    setLogoLetter(initial);
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      // 1. Create Workspace
      const createdWorkspace = await createAndSetWorkspace({
        name: companyName,
        industry,
        domain: website || `${companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
        website,
        brand,
        country,
        timezone,
        targetMarkets: selectedTargetMarkets,
        targetMarket: selectedTargetMarkets,
        logoLetter,
      });

      // 2. Persist Team Invites if any valid emails exist
      const validInvites = teamInvites.filter((inv) => inv.email.trim().includes("@"));
      if (validInvites.length > 0 && user?.id) {
        await supabaseWorkspaceService.inviteTeamMembers(
          createdWorkspace.id,
          validInvites,
          user.id
        );
      }

      toast.success("Workspace created successfully! Welcome to Eminarc Growth OS.");
      navigate({ to: "/" });
    } catch (err) {
      console.error("Workspace setup failed:", err);
      toast.error("Failed to complete workspace setup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary card-glow">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Setup Your Growth Workspace</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure your AI growth engine parameters in 3 simple steps
          </p>
        </div>

        {/* Wizard Progress Stepper */}
        <div className="mb-8 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                step >= 1 ? "bg-primary text-primary-foreground" : "border bg-card text-muted-foreground"
              }`}
            >
              1
            </div>
            <span className={`text-xs font-medium ${step >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
              Workspace
            </span>
          </div>

          <div className={`h-[2px] flex-1 mx-4 ${step >= 2 ? "bg-primary" : "bg-border"}`} />

          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                step >= 2 ? "bg-primary text-primary-foreground" : "border bg-card text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className={`text-xs font-medium ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
              Team Invites
            </span>
          </div>

          <div className={`h-[2px] flex-1 mx-4 ${step >= 3 ? "bg-primary" : "bg-border"}`} />

          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                step >= 3 ? "bg-primary text-primary-foreground" : "border bg-card text-muted-foreground"
              }`}
            >
              3
            </div>
            <span className={`text-xs font-medium ${step >= 3 ? "text-foreground" : "text-muted-foreground"}`}>
              Launch
            </span>
          </div>
        </div>

        {/* STEP 1: CREATE WORKSPACE */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-5 rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b pb-3 text-sm font-semibold text-foreground">
              <Building2 className="h-4 w-4 text-primary" /> Step 1: Workspace Parameters
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="companyName">Company / Workspace Name *</Label>
                <Input
                  id="companyName"
                  placeholder="e.g. Eminarc Growth Labs"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <div className="relative">
                  <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://eminarc.com"
                    className="pl-9"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Brand Tone & Positioning</Label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand tone" />
                </SelectTrigger>
                <SelectContent>
                  {BRAND_TONE_OPTIONS.map((bt) => (
                    <SelectItem key={bt} value={bt}>
                      {bt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Target Markets Selection */}
            <div className="space-y-2">
              <Label>Target Markets</Label>
              <div className="flex flex-wrap gap-2 pt-1">
                {TARGET_MARKET_OPTIONS.map((market) => {
                  const isSelected = selectedTargetMarkets.includes(market);
                  return (
                    <button
                      key={market}
                      type="button"
                      onClick={() => toggleTargetMarket(market)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "border border-input bg-background text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                      {market}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button type="submit" className="w-full gap-2 pt-2">
              Continue to Team Setup <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}

        {/* STEP 2: INVITE TEAM */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-5 rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-3 text-sm font-semibold text-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Step 2: Invite Team Members
              </div>
              <span className="text-xs text-muted-foreground font-normal">Optional</span>
            </div>

            <p className="text-xs text-muted-foreground">
              Collaborate with your growth team, strategists, and founders in your new workspace.
            </p>

            <div className="space-y-3">
              {teamInvites.map((invite, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="email"
                    placeholder="teammate@company.com"
                    value={invite.email}
                    onChange={(e) => handleUpdateInvite(index, "email", e.target.value)}
                    className="flex-1"
                  />
                  <Select
                    value={invite.role}
                    onValueChange={(val) => handleUpdateInvite(index, "role", val)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>

                  {teamInvites.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveInvite(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={handleAddInvite}
              >
                <Plus className="h-3.5 w-3.5" /> Add another teammate
              </Button>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t">
              <Button type="button" variant="ghost" className="gap-1.5" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>

              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(3)}>
                  Skip for now
                </Button>
                <Button type="submit" className="gap-2">
                  Review & Finish <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 3: FINISH & LAUNCH */}
        {step === 3 && (
          <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b pb-3 text-sm font-semibold text-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Step 3: Review & Launch
            </div>

            <div className="rounded-lg border bg-accent/40 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                  {logoLetter}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{companyName || "My Workspace"}</h3>
                  <p className="text-xs text-muted-foreground">{website || "eminarc.com"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t">
                <div>
                  <span className="text-muted-foreground">Industry:</span>{" "}
                  <span className="font-medium text-foreground">{industry}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Country:</span>{" "}
                  <span className="font-medium text-foreground">{country}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Brand Tone:</span>{" "}
                  <span className="font-medium text-foreground">{brand}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Timezone:</span>{" "}
                  <span className="font-medium text-foreground">{timezone.split(" ")[0]}</span>
                </div>
              </div>

              <div className="pt-2 border-t text-xs">
                <span className="text-muted-foreground">Target Markets:</span>{" "}
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTargetMarkets.map((m) => (
                    <span key={m} className="rounded bg-background px-2 py-0.5 font-medium text-foreground border">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t text-xs flex justify-between items-center">
                <span className="text-muted-foreground">Team Member Invites:</span>
                <span className="font-medium text-foreground">
                  {teamInvites.filter((i) => i.email.trim()).length} invited
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <Button type="button" variant="ghost" className="gap-1.5" onClick={() => setStep(2)}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button
                type="button"
                className="gap-2 gradient-primary text-primary-foreground px-6 font-semibold"
                disabled={loading}
                onClick={handleFinalSubmit}
              >
                {loading ? (
                  "Setting up Workspace…"
                ) : (
                  <>
                    Launch Eminarc Growth OS <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
