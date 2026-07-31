import React from 'react';
import { ListTodo, Bot, ArrowRight } from 'lucide-react';
import { EmptyCardPlaceholder } from '../shared/EmptyCardPlaceholder';

export const SecondRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Today&apos;s Priorities Card Container */}
      <EmptyCardPlaceholder
        title="Today's Priorities"
        subtitle="High-impact actions recommended by AI Growth Partner"
        indexCode="TASKS / 001"
        heightClass="min-h-[300px]"
        headerAction={
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF]">
            <ListTodo className="h-4 w-4" />
          </div>
        }
      >
        <div className="space-y-3 w-full py-4 text-center">
          <div className="mx-auto max-w-xs space-y-2">
            <div className="h-8 rounded-lg bg-[#EFEAE1]/60 border border-dashed border-[#D8D2C5]" />
            <div className="h-8 rounded-lg bg-[#EFEAE1]/40 border border-dashed border-[#D8D2C5]" />
            <div className="h-8 rounded-lg bg-[#EFEAE1]/20 border border-dashed border-[#D8D2C5]" />
          </div>
          <p className="font-mono text-xs text-[#716D64] font-medium uppercase tracking-wider pt-2">
            Today&apos;s Priorities Module Shell
          </p>
        </div>
      </EmptyCardPlaceholder>

      {/* AI Growth Copilot Card Container */}
      <EmptyCardPlaceholder
        title="AI Growth Copilot"
        subtitle="Autonomous strategic agent & insights assistant"
        indexCode="COPILOT / AI"
        heightClass="min-h-[300px]"
        badge={
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#1E4620] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
            ONLINE
          </span>
        }
        headerAction={
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF]">
            <Bot className="h-4 w-4" />
          </div>
        }
      >
        <div className="w-full flex flex-col items-center justify-center py-6 text-center space-y-3">
          <div className="h-10 w-10 rounded-2xl bg-[#EFEAE1] flex items-center justify-center text-[#18181B]">
            <Bot className="h-5 w-5" />
          </div>
          <p className="font-serif italic text-lg text-[#111111]">
            &quot;Ask AI Growth Copilot for strategic recommendations...&quot;
          </p>
          <div className="w-full max-w-md h-10 rounded-full bg-[#FFFFFF] border border-[#E5E0D6] flex items-center px-4 justify-between text-xs text-[#9E988D]">
            <span>Type a command or prompt...</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#716D64]" />
          </div>
        </div>
      </EmptyCardPlaceholder>
    </div>
  );
};
