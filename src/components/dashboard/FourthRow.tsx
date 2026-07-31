import React from 'react';
import { Activity, FlaskConical } from 'lucide-react';
import { EmptyCardPlaceholder } from '../shared/EmptyCardPlaceholder';

export const FourthRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Activity Feed Card Container */}
      <EmptyCardPlaceholder
        title="Activity Feed"
        subtitle="Real-time log of team, research & distribution events"
        indexCode="LOGS / REALTIME"
        heightClass="min-h-[280px]"
        headerAction={
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EBE1] text-[#18181B]">
            <Activity className="h-4 w-4" />
          </div>
        }
      >
        <div className="space-y-3 w-full py-4 text-center">
          <div className="mx-auto max-w-sm space-y-2">
            <div className="h-6 rounded-lg bg-[#EFEAE1]/50 border border-dashed border-[#D8D2C5]" />
            <div className="h-6 rounded-lg bg-[#EFEAE1]/30 border border-dashed border-[#D8D2C5]" />
          </div>
          <p className="font-mono text-xs text-[#716D64] font-medium uppercase tracking-wider pt-2">
            Activity Feed Module Shell
          </p>
        </div>
      </EmptyCardPlaceholder>

      {/* Running Experiments Card Container */}
      <EmptyCardPlaceholder
        title="Running Experiments"
        subtitle="Hypothesis testing, status & conversion learnings"
        indexCode="LABS / EXP"
        heightClass="min-h-[280px]"
        headerAction={
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EBE1] text-[#18181B]">
            <FlaskConical className="h-4 w-4" />
          </div>
        }
      >
        <div className="space-y-3 w-full py-4 text-center">
          <div className="mx-auto max-w-sm space-y-2">
            <div className="h-6 rounded-lg bg-[#EFEAE1]/50 border border-dashed border-[#D8D2C5]" />
            <div className="h-6 rounded-lg bg-[#EFEAE1]/30 border border-dashed border-[#D8D2C5]" />
          </div>
          <p className="font-mono text-xs text-[#716D64] font-medium uppercase tracking-wider pt-2">
            Running Experiments Module Shell
          </p>
        </div>
      </EmptyCardPlaceholder>
    </div>
  );
};
