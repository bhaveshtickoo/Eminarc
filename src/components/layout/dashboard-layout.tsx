import { Outlet, useRouterState, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Search, Sparkles, Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AiChatPanel } from "@/components/layout/ai-chat-panel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  const [chatOpen, setChatOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const topNav = [
    { title: "Overview", url: "/" as const },
    { title: "Clients", url: "/clients" as const },
    { title: "Leads", url: "/leads" as const },
    { title: "Content", url: "/content" as const },
    { title: "Outreach", url: "/outreach" as const },
    { title: "Analytics", url: "/analytics" as const },
    { title: "Tasks", url: "/tasks" as const },
  ];

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath === path || currentPath.startsWith(`${path}/`);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 overflow-hidden">
          <SidebarInset className="flex flex-col">
            <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <nav className="hidden items-center gap-1 md:flex">
                {topNav.map((item) => (
                  <Link
                    key={item.url}
                    to={item.url}
                    aria-current={isActive(item.url) ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
                      isActive(item.url)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              <form
                className="relative ml-auto hidden w-64 sm:block"
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = search.trim();
                  if (!q) return;
                  toast.success(`Searching leads for “${q}”`);
                  navigate({ to: "/leads" });
                }}
              >
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search…"
                  className="h-9 pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
              <Button
                variant="outline"
                size="sm"
                className={cn("ml-auto gap-2 sm:ml-2", chatOpen && "bg-primary/10 text-primary")}
                onClick={() => setChatOpen((v) => !v)}
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Ask AI</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                aria-label="Notifications"
                onClick={() =>
                  toast("No new notifications", { description: "You're all caught up." })
                }
              >
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>jordan@eminarc.com</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate({ to: "/login" })}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>

            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              <Outlet />
            </main>
          </SidebarInset>

          {chatOpen && (
            <aside className="hidden w-80 shrink-0 border-l lg:block xl:w-96">
              <AiChatPanel onClose={() => setChatOpen(false)} />
            </aside>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
