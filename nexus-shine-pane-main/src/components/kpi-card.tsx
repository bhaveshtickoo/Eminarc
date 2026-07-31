import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  Users,
  Linkedin,
  Sparkles,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dollar: DollarSign,
  trending: TrendingUp,
  users: Users,
  linkedin: Linkedin,
  sparkles: Sparkles,
  activity: Activity,
};

export function KpiCard({
  label,
  value,
  change,
  trend,
  icon,
  spark,
}: {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: string;
  spark: number[];
}) {
  const Icon = iconMap[icon] ?? Activity;
  const max = Math.max(...spark);
  const min = Math.min(...spark);
  const range = max - min || 1;
  const positive = trend === "up";

  return (
    <Card className="relative overflow-hidden p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Badge
          variant="secondary"
          className={cn("gap-1 font-medium", positive ? "text-success" : "text-destructive")}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(change)}%
        </Badge>
        <svg width="90" height="32" viewBox="0 0 90 32" className="text-primary/40">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={spark
              .map(
                (v, i) => `${(i / (spark.length - 1)) * 90},${30 - ((v - min) / range) * 26 - 2}`,
              )
              .join(" ")}
          />
        </svg>
      </div>
    </Card>
  );
}
