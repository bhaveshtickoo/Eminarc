import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { WorkspaceHeader } from '@/components/workspace/WorkspaceHeader';
import { LeadIntelligenceTable } from '@/components/crm/LeadIntelligenceTable';
import { CRMAnalytics } from '@/components/crm/CRMAnalytics';

export default function GrowthCRMPage() {

  return (
    <DashboardShell activeNavId="crm">
      {/* Workspace Context Header Banner */}
      <WorkspaceHeader />

      {/* CRM Analytics Visualizations (4 SVG Charts) */}
      <CRMAnalytics />

      {/* Lead Intelligence Table */}
      <LeadIntelligenceTable />
    </DashboardShell>
  );
}
