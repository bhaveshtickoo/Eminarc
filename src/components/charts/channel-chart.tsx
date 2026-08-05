import { StackedBarChart, StackedBarSeriesConfig } from "./StackedBarChart";

const series: StackedBarSeriesConfig[] = [
  { key: "linkedin", name: "LinkedIn", color: "var(--color-primary)", stackId: "a" },
  { key: "email", name: "Email", color: "var(--color-chart-2)", stackId: "a" },
  { key: "reddit", name: "Reddit", color: "var(--color-chart-3)", stackId: "a" },
  { key: "search", name: "Search", color: "var(--color-chart-4)", stackId: "a", radius: [4, 4, 0, 0] },
];

const chartData = [
  { day: "Mon", linkedin: 12, email: 5, reddit: 3, search: 8 },
  { day: "Tue", linkedin: 18, email: 8, reddit: 5, search: 12 },
  { day: "Wed", linkedin: 15, email: 6, reddit: 4, search: 10 },
  { day: "Thu", linkedin: 22, email: 11, reddit: 7, search: 14 },
  { day: "Fri", linkedin: 28, email: 14, reddit: 9, search: 18 },
];

export function ChannelChart() {
  return (
    <StackedBarChart
      data={chartData}
      xAxisKey="day"
      series={series}
      height={280}
      showGrid={true}
      showLegend={false}
      showTooltip={true}
      ariaLabel="Channel performance bar chart"
    />
  );
}
