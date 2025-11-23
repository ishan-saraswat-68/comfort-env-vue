import { Thermometer, Droplets } from "lucide-react";

interface HeroStatsProps {
  temperature: number;
  humidity: number;
  trend: string;
}

export const HeroStats = ({ temperature, humidity, trend }: HeroStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-cool rounded-2xl">
              <Thermometer className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-medium text-muted-foreground">Temperature</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold bg-gradient-cool bg-clip-text text-transparent">
              {temperature.toFixed(1)}
            </span>
            <span className="text-3xl font-medium text-muted-foreground">°C</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{trend}</p>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-warm rounded-2xl">
              <Droplets className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-lg font-medium text-muted-foreground">Humidity</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold bg-gradient-warm bg-clip-text text-transparent">
              {humidity.toFixed(0)}
            </span>
            <span className="text-3xl font-medium text-muted-foreground">%</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Current level</p>
        </div>
      </div>
    </div>
  );
};
