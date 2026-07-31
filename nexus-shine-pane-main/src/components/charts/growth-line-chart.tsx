import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { growthDays } from "@/lib/overview-data";

const series = [
  { key: "profileViews", label: "Profile Views", color: "var(--color-chart-1)" },
  { key: "engagements", label: "Engagements", color: "var(--color-chart-2)" },
  { key: "leads", label: "Leads", color: "var(--color-chart-3)" },
  { key: "meetings", label: "Meetings", color: "var(--color-chart-4)" },
] as const;

export function GrowthLineChart() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-5">
        {series.map((s) => (
          <div key={s.key} className="flex items-center gap-2 text-xs font-medium">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </div>
        ))}
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={growthDays} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              interval={4}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              tickFormatter={(v: number) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                isAnimationActive={false}
                dot={{ r: 2.5, strokeWidth: 0, fill: s.color }}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
