import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { channelSeries } from "@/lib/mock-data";

export function ChannelChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={channelSeries} margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="day"
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--color-muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "var(--color-muted)", opacity: 0.3 }}
          contentStyle={{
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: "0.5rem",
            fontSize: "0.8rem",
            color: "var(--color-popover-foreground)",
          }}
        />
        <Bar dataKey="linkedin" stackId="a" fill="var(--color-primary)" radius={[0, 0, 0, 0]} />
        <Bar dataKey="email" stackId="a" fill="var(--color-chart-2)" />
        <Bar dataKey="reddit" stackId="a" fill="var(--color-chart-3)" />
        <Bar dataKey="search" stackId="a" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
