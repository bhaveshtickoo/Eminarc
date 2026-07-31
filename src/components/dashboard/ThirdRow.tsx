import React from 'react';
import { Calendar, Kanban } from 'lucide-react';
import { EmptyCardPlaceholder } from '../shared/EmptyCardPlaceholder';

export const ThirdRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Content Calendar Card Container */}
      <EmptyCardPlaceholder
        title="Content Calendar"
        subtitle="Scheduled LinkedIn, X, Medium & Blog publications"
        indexCode="CALENDAR / 001"
        heightClass="min-h-[300px]"
        headerAction={
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EBE1] text-[#18181B]">
            <Calendar className="h-4 w-4" />
          </div>
        }
      >
        <div className="space-y-3 w-full py-4 text-center">
          <div className="grid grid-cols-7 gap-1 max-w-sm mx-auto">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div
                key={i}
                className="h-7 flex items-center justify-center rounded bg-[#EFEAE1]/60 font-mono text-[10px] text-[#716D64]"
              >
                {day}
              </div>
            ))}
          </div>
          <p className="font-mono text-xs text-[#716D64] font-medium uppercase tracking-wider pt-2">
            Content Calendar Module Shell
          </p>
        </div>
      </EmptyCardPlaceholder>

      {/* Pipeline Card Container */}
      <EmptyCardPlaceholder
        title="Growth Pipeline"
        subtitle="Active B2B opportunities & CRM stage tracking"
        indexCode="CRM / STAGE"
        heightClass="min-h-[300px]"
        headerAction={
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EBE1] text-[#18181B]">
            <Kanban className="h-4 w-4" />
          </div>
        }
      >
        <div className="space-y-3 w-full py-4 text-center">
          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
            <div className="h-16 rounded-xl bg-[#EFEAE1]/50 border border-dashed border-[#D8D2C5]" />
            <div className="h-16 rounded-xl bg-[#EFEAE1]/50 border border-dashed border-[#D8D2C5]" />
            <div className="h-16 rounded-xl bg-[#EFEAE1]/50 border border-dashed border-[#D8D2C5]" />
          </div>
          <p className="font-mono text-xs text-[#716D64] font-medium uppercase tracking-wider pt-2">
            Growth Pipeline Module Shell
          </p>
        </div>
      </EmptyCardPlaceholder>
    </div>
  );
};
