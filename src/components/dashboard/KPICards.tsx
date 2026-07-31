import React from 'react';
import { TrendingUp, Eye, DollarSign, FileText } from 'lucide-react';
import { KPICard } from './KPICard';

export const KPICards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {/* Card 1: Growth Score */}
      <KPICard
        title="Growth Score"
        value="78 / 100"
        badgeText="↑ +6 this week"
        badgeVariant="success"
        subtitle="OVERALL VELOCITY RATING"
        indexCode="KPI / 001"
        sparklineData={[62, 65, 64, 70, 68, 74, 72, 78]}
        sparklineColor="#2D6A4F"
        icon={<TrendingUp className="h-4 w-4" />}
      />

      {/* Card 2: AI Visibility */}
      <KPICard
        title="AI Visibility"
        value="63%"
        badgeText="Needs improvement"
        badgeVariant="warning"
        subtitle="LLM CITATION COVERAGE"
        indexCode="KPI / 002"
        sparklineData={[72, 70, 68, 65, 62, 60, 64, 63]}
        sparklineColor="#B45309"
        icon={<Eye className="h-4 w-4" />}
      />

      {/* Card 3: Pipeline Value */}
      <KPICard
        title="Pipeline Value"
        value="$12,400"
        badgeText="14 Opportunities"
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
        value="5 / 8"
        badgeText="This Week"
        badgeVariant="success"
        subtitle="OUTPUT PACING (62%)"
        indexCode="KPI / 004"
        sparklineData={[1, 2, 2, 3, 4, 4, 5, 5]}
        sparklineColor="#2D6A4F"
        icon={<FileText className="h-4 w-4" />}
      />
    </div>
  );
};
