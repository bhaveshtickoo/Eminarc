import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { channelMix } from "@/lib/overview-data";

export function ChannelDonut() {
  const total = channelMix.reduce((sum, c) => sum + c.value, 0);

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative h-[180px] w-[180px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={channelMix}
              dataKey="value"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={1}
              isAnimationActive={false}
              stroke="var(--color-card)"
              strokeWidth={2}
            >
              {channelMix.map((c) => (
                <Cell key={c.name} fill={c.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">Total Leads</span>
          <span className="font-display text-2xl font-bold">{total}</span>
        </div>
      </div>

      <ul className="w-full space-y-2.5">
        {channelMix.map((c) => (
          <li key={c.name} className="flex items-center gap-2.5 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: c.color }}
            />
            <span className="flex-1 text-muted-foreground">{c.name}</span>
            <span className="font-medium tabular-nums">
              {c.value} ({c.share}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
