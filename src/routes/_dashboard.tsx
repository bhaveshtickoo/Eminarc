import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const Route = createFileRoute("/_dashboard")({
  component: () => (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),
});
