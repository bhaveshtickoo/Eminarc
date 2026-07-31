import React from 'react';
import { TrendingUp, Users, FileText, Eye } from 'lucide-react';
import { EmptyCardPlaceholder } from '../shared/EmptyCardPlaceholder';

export const kpiItems = [
  {
    id: 'kpi-1',
    title: 'Growth Score',
    index: 'KPI / 001',
    icon: TrendingUp,
    subtitle: 'Overall velocity rating',
  },
  {
    id: 'kpi-2',
    title: 'Active Leads',
    index: 'KPI / 002',
    icon: Users,
    subtitle: 'Qualified pipeline contacts',
  },
  {
    id: 'kpi-3',
    title: 'Content Velocity',
    index: 'KPI / 003',
    icon: FileText,
    subtitle: 'Weekly output count',
  },
  {
    id: 'kpi-4',
    title: 'AI Visibility Index',
    index: 'KPI / 004',
    icon: Eye,
    subtitle: 'LLM presence score',
  },
];

export const KPICards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {kpiItems.map((kpi) => {
        const Icon = kpi.icon;

        return (
          <EmptyCardPlaceholder
            key={kpi.id}
            title={kpi.title}
            subtitle={kpi.subtitle}
            indexCode={kpi.index}
            heightClass="min-h-[160px]"
            headerAction={
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F0EBE1] text-[#18181B]">
                <Icon className="h-4 w-4" />
              </div>
            }
          >
            <div className="py-1">
              <span className="font-mono text-xl font-bold text-[#111111]">--</span>
              <p className="font-mono text-[10px] text-[#9E988D] uppercase tracking-wider mt-0.5">
                Metric Placeholder
              </p>
            </div>
          </EmptyCardPlaceholder>
        );
      })}
    </div>
  );
};
