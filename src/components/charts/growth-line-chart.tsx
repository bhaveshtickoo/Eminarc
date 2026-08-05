import { LineChart, LineSeriesConfig } from "./LineChart";

const series: LineSeriesConfig[] = [
  { key: "profileViews", name: "Profile Views", color: "var(--color-chart-1)" },
  { key: "engagements", name: "Engagements", color: "var(--color-chart-2)" },
  { key: "leads", name: "Leads", color: "var(--color-chart-3)" },
  { key: "meetings", name: "Meetings", color: "var(--color-chart-4)" },
];

const chartData = [
  { day: "Mon", profileViews: 450, engagements: 120, leads: 4, meetings: 1 },
  { day: "Tue", profileViews: 680, engagements: 210, leads: 7, meetings: 2 },
  { day: "Wed", profileViews: 520, engagements: 170, leads: 5, meetings: 1 },
  { day: "Thu", profileViews: 890, engagements: 310, leads: 9, meetings: 3 },
  { day: "Fri", profileViews: 1200, engagements: 450, leads: 12, meetings: 4 },
  { day: "Sat", profileViews: 740, engagements: 230, leads: 6, meetings: 2 },
  { day: "Sun", profileViews: 950, engagements: 340, leads: 8, meetings: 3 },
];

export function GrowthLineChart() {
  return (
    <LineChart
      data={chartData}
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
