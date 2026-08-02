import { AreaChart, AreaSeriesConfig } from "./AreaChart";
import { growthSeries } from "@/data/mock-data";

const series: AreaSeriesConfig[] = [
  { key: "pipeline", name: "Pipeline", color: "var(--color-chart-5)", fillOpacity: 0.3 },
  { key: "revenue", name: "Revenue", color: "var(--color-primary)", fillOpacity: 0.4 },
];

export function RevenueChart() {
  return (
    <AreaChart
      data={growthSeries}
      xAxisKey="month"
      series={series}
      height={280}
      showGrid={true}
      showLegend={false}
      showTooltip={true}
      ariaLabel="Revenue & pipeline area trend chart"
    />
  );
}
