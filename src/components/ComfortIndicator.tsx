import { Smile, Meh, Frown } from "lucide-react";

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
  const getGradient = () => {
    if (score >= 80) return "bg-gradient-comfort";
    if (score >= 60) return "bg-gradient-cool";
    if (score >= 40) return "bg-gradient-warm";
    return "bg-gradient-to-r from-destructive to-secondary";
  };

  const getIcon = () => {
    if (score >= 70) return <Smile className="w-8 h-8" />;
    if (score >= 40) return <Meh className="w-8 h-8" />;
    return <Frown className="w-8 h-8" />;
  };

  return (
    <div className="glass-card rounded-3xl p-8">
      <h3 className="text-xl font-semibold mb-6">Comfort Level</h3>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`${getGradient()} p-6 rounded-full animate-pulse-slow`}>
          {getIcon()}
        </div>
        <div>
          <h4 className="text-3xl font-bold mb-2">{level}</h4>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-48 h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${getGradient()} transition-all duration-500`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{score}/100</span>
          </div>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>🌡️ {temperatureComment}</p>
          <p>💧 {humidityComment}</p>
        </div>
      </div>
    </div>
  );
};
