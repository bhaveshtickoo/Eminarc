import { DonutChart } from "./DonutChart";

const channelMix = [
  { name: "LinkedIn", value: 45, color: "#0A66C2", share: "45%" },
  { name: "Organic Search & LLM", value: 30, color: "#10B981", share: "30%" },
  { name: "Cold Email Outreach", value: 15, color: "#F59E0B", share: "15%" },
  { name: "Direct Referral", value: 10, color: "#6366F1", share: "10%" },
];

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
