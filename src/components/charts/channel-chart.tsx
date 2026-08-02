import { StackedBarChart, StackedBarSeriesConfig } from "./StackedBarChart";
import { channelSeries } from "@/data/mock-data";

const series: StackedBarSeriesConfig[] = [
  { key: "linkedin", name: "LinkedIn", color: "var(--color-primary)", stackId: "a" },
  { key: "email", name: "Email", color: "var(--color-chart-2)", stackId: "a" },
  { key: "reddit", name: "Reddit", color: "var(--color-chart-3)", stackId: "a" },
  { key: "search", name: "Search", color: "var(--color-chart-4)", stackId: "a", radius: [4, 4, 0, 0] },
];

export function ChannelChart() {
  return (
    <StackedBarChart
      data={channelSeries}
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
