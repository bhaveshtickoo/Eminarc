'use client';

import React from 'react';
import { TrendingUp, Eye, DollarSign, FileText } from 'lucide-react';
import { KPICard } from './KPICard';
import { useWorkspace } from '@/hooks/useWorkspace';

export const KPICards: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const { metrics } = currentWorkspace;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {/* Card 1: Growth Score */}
      <KPICard
        title="Growth Score"
        value={`${metrics.growthScore} / 100`}
        badgeText={`↑ ${metrics.growthScoreChange}`}
        badgeVariant="success"
        subtitle="OVERALL VELOCITY RATING"
        indexCode="KPI / 001"
        sparklineData={[62, 65, 64, 70, 68, 74, 72, metrics.growthScore]}
        sparklineColor="#2D6A4F"
        icon={<TrendingUp className="h-4 w-4" />}
      />

      {/* Card 2: AI Visibility */}
      <KPICard
        title="AI Visibility"
        value={`${metrics.aiVisibility}%`}
        badgeText={metrics.aiVisibilityStatus}
        badgeVariant={metrics.aiVisibility >= 75 ? 'success' : 'warning'}
        subtitle="LLM CITATION COVERAGE"
        indexCode="KPI / 002"
        sparklineData={[50, 54, 58, 60, 59, 61, 62, metrics.aiVisibility]}
        sparklineColor={metrics.aiVisibility >= 75 ? '#2D6A4F' : '#B45309'}
        icon={<Eye className="h-4 w-4" />}
      />

      {/* Card 3: Pipeline Value */}
      <KPICard
        title="Pipeline Value"
        value={metrics.pipelineValue}
        badgeText={`${metrics.opportunitiesCount} Opportunities`}
        badgeVariant="info"
        subtitle="QUALIFIED ACTIVE DEALS"
        indexCode="KPI / 003"
        sparklineData={[4200, 6800, 5900, 8400, 9200, 11000, 10500, 12400]}
        sparklineColor="#18181B"
        icon={<DollarSign className="h-4 w-4" />}
      />

      {/* Card 4: Content Published */}
      <KPICard
        title="Content Published"
        value={`${metrics.contentPublishedCount} / ${metrics.contentTargetCount}`}
        badgeText="This Week"
        badgeVariant="success"
        subtitle={`OUTPUT PACING (${Math.round((metrics.contentPublishedCount / metrics.contentTargetCount) * 100)}%)`}
        indexCode="KPI / 004"
        sparklineData={[1, 2, 2, 3, 4, 4, 5, metrics.contentPublishedCount]}
        sparklineColor="#2D6A4F"
        icon={<FileText className="h-4 w-4" />}
      />
    </div>
  );
};
