import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { plans, invoices } from "@/lib/mock-data";
import { Check, CreditCard, Download, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Eminarc Growth OS" },
      { name: "description", content: "Profile, subscription, and billing." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [name, setName] = useState("Jordan Diaz");

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your profile, subscription, and billing." />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card className="max-w-xl p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="gradient-primary text-lg font-semibold text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">jordan@eminarc.com</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Change avatar
                </Button>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="space-y-2">
                <Label>Full name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="jordan@eminarc.com" />
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Input defaultValue="America/New_York (EST)" />
                </div>
              </div>
              <Button className="w-fit" onClick={() => toast.success("Profile saved")}>
                Save changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4 space-y-6">
          {/* Current plan */}
          <Card className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Pro plan</h2>
                  <Badge className="bg-primary/15 text-primary">Current</Badge>
                </div>
                <p className="text-sm text-muted-foreground">$79/month · renews Aug 1, 2026</p>
              </div>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => toast.info("Opening payment portal…")}
              >
                <CreditCard className="h-4 w-4" /> Manage payment
              </Button>
            </div>
          </Card>

          {/* Plans */}
          <div>
            <h2 className="mb-3 text-sm font-semibold">Switch plan</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {plans.map((p) => (
                <Card
                  key={p.name}
                  className={cn("flex flex-col p-5", p.current && "card-glow border-primary/50")}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold">{p.name}</h3>
                    {p.current && <Badge className="bg-primary/15 text-primary">Current</Badge>}
                  </div>
                  <p className="mt-1 text-2xl font-bold">
                    ${p.price}
                    <span className="text-sm font-normal text-muted-foreground">/mo</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.tagline}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={p.current ? "outline" : "default"}
                    className="mt-4"
                    disabled={p.current}
                    onClick={() => toast.success(`Switched to ${p.name} plan`)}
                  >
                    {p.current ? "Current plan" : `Switch to ${p.name}`}
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Invoices */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Billing history</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-16" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                      <TableCell>${inv.amount}.00</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-success">
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toast.info("Downloading invoice…")}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
