import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle: string;
}

export const StatsCard = ({ icon: Icon, label, value, subtitle }: StatsCardProps) => {
  return (
    <Card variant="glass" className="hover:scale-105 transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-muted rounded-xl">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </Card>
  );
};
