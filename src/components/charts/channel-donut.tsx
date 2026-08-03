import { DonutChart } from "./DonutChart";
import { channelMix } from "@/data/overview-data";

export function ChannelDonut() {
  const total = channelMix.reduce((sum, c) => sum + c.value, 0);

  return (
    <DonutChart
      segments={channelMix.map((c) => ({
        name: c.name,
        value: c.value,
        color: c.color,
        share: c.share,
      }))}
      centerLabel="Total Leads"
      centerValue={total}
      size={135}
      innerRadius={42}
      outerRadius={62}
      showLegend={true}
      ariaLabel="Channel distribution donut chart"
    />
  );
}
