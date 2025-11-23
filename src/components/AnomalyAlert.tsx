import { AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface Anomaly {
  temperature: number;
  humidity: number;
  timestamp: string;
  reason: string;
}

interface AnomalyAlertProps {
  anomalies: Anomaly[];
}

export const AnomalyAlert = ({ anomalies }: AnomalyAlertProps) => {
  if (anomalies.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 border-destructive/50">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-5 h-5 text-destructive" />
        <h3 className="text-lg font-semibold text-destructive">Anomalies Detected</h3>
      </div>
      <div className="space-y-3">
        {anomalies.map((anomaly, index) => (
          <div key={index} className="p-4 bg-destructive/10 rounded-xl">
            <p className="font-medium text-sm mb-2">{anomaly.reason}</p>
            <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div>
                <span className="block font-medium">Temperature</span>
                <span>{anomaly.temperature.toFixed(1)}°C</span>
              </div>
              <div>
                <span className="block font-medium">Humidity</span>
                <span>{anomaly.humidity.toFixed(0)}%</span>
              </div>
              <div>
                <span className="block font-medium">Time</span>
                <span>{format(new Date(anomaly.timestamp), "HH:mm:ss")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
