import { LineChart, LineSeriesConfig } from "./LineChart";
import { growthDays } from "@/data/overview-data";

const series: LineSeriesConfig[] = [
  { key: "profileViews", name: "Profile Views", color: "var(--color-chart-1)" },
  { key: "engagements", name: "Engagements", color: "var(--color-chart-2)" },
  { key: "leads", name: "Leads", color: "var(--color-chart-3)" },
  { key: "meetings", name: "Meetings", color: "var(--color-chart-4)" },
];

export function GrowthLineChart() {
  return (
    <LineChart
      data={growthDays}
      xAxisKey="day"
      series={series}
      height={260}
      showGrid={true}
      showLegend={true}
      showTooltip={true}
      yAxisFormatter={(v: number) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
      ariaLabel="Growth performance line chart"
    />
  );
}
