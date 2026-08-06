import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  FileText,
  Send,
  Target,
  BarChart3,
  ClipboardList,
  Bot,
  ListTodo,
  Blocks,
  Settings,
  CircleDot,
  Search,
  Share2,
  FolderKanban,
  Eye,
  Kanban,
  Rocket,
  Zap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const nav = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Founder Research", url: "/research", icon: Search },
  { title: "Execution Planner", url: "/execution", icon: Rocket },
  { title: "Campaign Engine", url: "/campaigns", icon: Zap },
  { title: "AI Search Visibility", url: "/visibility", icon: Eye },
  { title: "Growth CRM", url: "/crm", icon: Kanban },
  { title: "Agents (AI Hub)", url: "/agents", icon: Bot },
  { title: "Content Hub", url: "/content", icon: FileText },
  { title: "Content Library", url: "/content/library", icon: FolderKanban },
  { title: "Distribution Queue", url: "/distribution", icon: Share2 },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Leads & ICP", url: "/leads", icon: Target },
  { title: "Outreach", url: "/outreach", icon: Send },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reports", url: "/reports", icon: ClipboardList },
  { title: "Tasks", url: "/tasks", icon: ListTodo },
  { title: "Integrations", url: "/integrations", icon: Blocks },
  { title: "Settings", url: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath === path || currentPath.startsWith(`${path}/`);

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent className="gap-0">
        <div className="flex h-16 items-center gap-2.5 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="font-display text-base font-bold leading-none">e</span>
          </div>
          {!collapsed && (
            <span className="font-display text-lg font-bold tracking-tight">Eminarc</span>
          )}
        </div>

        <SidebarGroup className="pt-1">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {nav.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className={cn(
                        "h-10 rounded-xl px-3 text-[0.9rem] font-medium",
                        active &&
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                      )}
                    >
                      <Link to={item.url as any} className="flex items-center gap-3">
                        <item.icon className="h-[1.05rem] w-[1.05rem]" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="gap-3 p-3">
          <div className="rounded-xl border bg-card p-4">
            <p className="section-label text-muted-foreground">Active Plan</p>
            <p className="mt-1.5 font-display text-base font-bold">Eminarc Pro</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Renews on Aug 24, 2026</p>
            <Link
              to="/settings"
              className="mt-3 inline-flex text-xs font-semibold underline underline-offset-4"
            >
              Manage Plan →
            </Link>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border bg-card px-3 py-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary">
              <Blocks className="h-3.5 w-3.5" />
            </div>
            <div className="leading-tight">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                Eminarc OS
              </p>
              <p className="text-[0.7rem] text-muted-foreground">v1.0.0</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border bg-card px-3 py-2.5 text-xs text-muted-foreground">
            <CircleDot className="h-3.5 w-3.5 text-success" />
            All systems operational
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
