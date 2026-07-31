import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";

export const Route = createFileRoute("/_dashboard")({
  component: () => <DashboardLayout />,
});
