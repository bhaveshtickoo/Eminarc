import { AreaChart, AreaSeriesConfig } from "./AreaChart";

const series: AreaSeriesConfig[] = [
  { key: "pipeline", name: "Pipeline", color: "var(--color-chart-5)", fillOpacity: 0.3 },
  { key: "revenue", name: "Revenue", color: "var(--color-primary)", fillOpacity: 0.4 },
];

const chartData = [
  { month: "Jan", pipeline: 24000, revenue: 12000 },
  { month: "Feb", pipeline: 45000, revenue: 22000 },
  { month: "Mar", pipeline: 82000, revenue: 38000 },
  { month: "Apr", pipeline: 110000, revenue: 54000 },
  { month: "May", pipeline: 148500, revenue: 78000 },
];

export function RevenueChart() {
  return (
    <AreaChart
      data={chartData}
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
