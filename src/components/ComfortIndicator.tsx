import { Thermometer, Snowflake, Sun } from "lucide-react";

interface ComfortIndicatorProps {
  level: string;
  score: number;
  temperatureComment: string;
  humidityComment: string;
}

export const ComfortIndicator = ({
  level,
  score,
  temperatureComment,
  humidityComment,
}: ComfortIndicatorProps) => {
  // Determine weather condition based on temperature comment
  const getWeatherCondition = () => {
    const tempLower = temperatureComment.toLowerCase();

    // Check for extreme heat
    if (tempLower.includes("too hot") || tempLower.includes("very hot") || tempLower.includes("extremely hot")) {
      return { status: "Too Hot", color: "text-purple-400", bg: "bg-purple-500/20", icon: Sun };
    }
    // Check for hot/warm
    else if (tempLower.includes("hot") || tempLower.includes("warm") || tempLower.includes("high")) {
      return { status: "Hot", color: "text-purple-500", bg: "bg-purple-500/15", icon: Sun };
    }
    // Check for extreme cold
    else if (tempLower.includes("too cold") || tempLower.includes("very cold") || tempLower.includes("extremely cold") || tempLower.includes("freezing")) {
      return { status: "Too Cold", color: "text-purple-600", bg: "bg-purple-500/10", icon: Snowflake };
    }
    // Check for cold/cool
    else if (tempLower.includes("cold") || tempLower.includes("cool") || tempLower.includes("low")) {
      return { status: "Cold", color: "text-purple-500", bg: "bg-purple-500/10", icon: Snowflake };
    }
    // Default to Normal
    else {
      return { status: "Normal", color: "text-purple-500", bg: "bg-purple-500/10", icon: Thermometer };
    }
  };

  const weather = getWeatherCondition();
  const Icon = weather.icon;

  return (
    <div className="glass-card rounded-3xl p-8 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-6">Weather Status</h3>
      <div className="flex flex-col items-center text-center space-y-6 flex-1 justify-center">
        <div className={`${weather.bg} p-6 rounded-full`}>
          <Icon className={`w-12 h-12 ${weather.color}`} />
        </div>
        <div>
          <h4 className={`text-4xl font-bold mb-4 ${weather.color}`}>{weather.status}</h4>
        </div>
        <div className="space-y-3 text-sm w-full">
          <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
            <p className="text-purple-400 font-medium">Temperature</p>
            <p className="text-foreground mt-1">{temperatureComment}</p>
          </div>
          <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
            <p className="text-emerald-400 font-medium">Humidity</p>
            <p className="text-foreground mt-1">{humidityComment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

