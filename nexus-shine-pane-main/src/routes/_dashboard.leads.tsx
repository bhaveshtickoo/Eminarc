import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  type Lead,
  type LeadStatus,
  type Plan,
} from "@/lib/mock-data";
import { Plus, Search, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_dashboard/leads")({
  head: () => ({
    meta: [
      { title: "Leads — Eminarc Growth OS" },
      { name: "description", content: "Lead intelligence with enrichment and AI scoring." },
    ],
  }),
  component: Leads,
});

const statusColors: Record<LeadStatus, string> = {
  New: "bg-chart-2/15 text-chart-2",
  Engaged: "bg-chart-4/15 text-chart-4",
  Qualified: "bg-primary/15 text-primary",
  Won: "bg-success/15 text-success",
  Lost: "bg-destructive/15 text-destructive",
};

function emptyLead(): Omit<Lead, "id"> {
  return {
    name: "",
    email: "",
    company: "",
    title: "",
    plan: "Free",
    status: "New",
    score: 50,
    mrr: 0,
    source: "LinkedIn",
    joined: new Date().toISOString().slice(0, 10),
    lastActive: "now",
  };
}

function Leads() {
  const [leads, setLeads] = useState<Lead[]>(getLeads);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [form, setForm] = useState<Omit<Lead, "id">>(emptyLead());

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.email.toLowerCase().includes(query.toLowerCase()) ||
      l.company.toLowerCase().includes(query.toLowerCase()),
  );

  const openAdd = () => {
    setEditing(null);
    setForm(emptyLead());
    setOpen(true);
  };

  const openEdit = (lead: Lead) => {
    setEditing(lead);
    const { id: _id, ...rest } = lead;
    setForm(rest);
    setOpen(true);
  };

  const save = () => {
    if (!form.name || !form.email) {
      toast.error("Name and email are required");
      return;
    }
    if (editing) {
      updateLead(editing.id, form);
      setLeads(getLeads());
      toast.success("Lead updated");
    } else {
      createLead(form);
      setLeads(getLeads());
      toast.success("Lead added");
    }
    setOpen(false);
  };

  const remove = (id: string) => {
    deleteLead(id);
    setLeads(getLeads());
    toast.success("Lead removed");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lead Intelligence"
        description="Every lead enriched, scored, and ready for outreach."
        actions={
          <Button className="gap-2" onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add lead
          </Button>
        }
      />

      <Card className="p-4">
        <div className="relative mb-4 w-full sm:w-64">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads…"
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Score</TableHead>
                <TableHead className="hidden lg:table-cell">Source</TableHead>
                <TableHead className="hidden lg:table-cell">MRR</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                        {l.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{l.name}</p>
                        <p className="text-xs text-muted-foreground">{l.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>
                      <p className="text-sm">{l.company}</p>
                      <p className="text-xs text-muted-foreground">{l.title}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{l.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[l.status]}>{l.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className={l.score > 85 ? "font-semibold text-success" : ""}>
                      {l.score}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {l.source}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {l.mrr > 0 ? `$${l.mrr}/mo` : "—"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(l)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete {l.name}?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This removes the lead from your pipeline. This can't be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => remove(l.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">No leads found.</p>
        )}
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit lead" : "Add lead"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Plan</Label>
                <Select
                  value={form.plan}
                  onValueChange={(v) => setForm({ ...form, plan: v as Plan })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm({ ...form, status: v as LeadStatus })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Engaged">Engaged</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Won">Won</SelectItem>
                    <SelectItem value="Lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Source</Label>
                <Input
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Score (0–100)</Label>
                <Input
                  type="number"
                  value={form.score}
                  onChange={(e) => setForm({ ...form, score: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>MRR ($/mo)</Label>
                <Input
                  type="number"
                  value={form.mrr}
                  onChange={(e) => setForm({ ...form, mrr: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>{editing ? "Save changes" : "Add lead"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
