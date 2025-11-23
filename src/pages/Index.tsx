import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, RefreshCw } from "lucide-react";
import { HeroStats } from "@/components/HeroStats";
import { StatsCard } from "@/components/StatsCard";
import { ComfortIndicator } from "@/components/ComfortIndicator";
import { TimeSelector } from "@/components/TimeSelector";
import { TrendChart } from "@/components/TrendChart";
import { AnomalyAlert } from "@/components/AnomalyAlert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const API_BASE_URL = "http://127.0.0.1:8000";

interface Reading {
  temperature: number;
  humidity: number;
  timestamp: string;
}

interface Analysis {
  period_hours: number;
  readings_count: number;
  temperature: {
    average: number;
    max: number;
    min: number;
    trend: string;
  };
  humidity: {
    average: number;
    max: number;
    min: number;
    trend: string;
  };
  comfort: {
    level: string;
    score: number;
    temperature_comment: string;
    humidity_comment: string;
  };
  anomalies: Array<{
    temperature: number;
    humidity: number;
    timestamp: string;
    reason: string;
  }>;
}

const Index = () => {
  const [selectedHours, setSelectedHours] = useState(24);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { data: readings, refetch: refetchReadings } = useQuery<Reading[]>({
    queryKey: ["readings", selectedHours],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/readings?hours=${selectedHours}`);
      if (!response.ok) throw new Error("Failed to fetch readings");
      return response.json();
    },
    refetchInterval: autoRefresh ? 60000 : false,
  });

  const { data: analysis, refetch: refetchAnalysis } = useQuery<Analysis>({
    queryKey: ["analysis", selectedHours],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/analysis?hours=${selectedHours}`);
      if (!response.ok) throw new Error("Failed to fetch analysis");
      return response.json();
    },
    refetchInterval: autoRefresh ? 60000 : false,
  });

  const handleRefresh = () => {
    refetchReadings();
    refetchAnalysis();
    toast.success("Data refreshed successfully");
  };

  const latestReading = readings?.[readings.length - 1];

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-cool bg-clip-text text-transparent">
            Climate Monitor
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time Temperature & Humidity Tracking
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <TimeSelector selectedHours={selectedHours} onSelect={setSelectedHours} />
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="glass-card hover:bg-muted/50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Hero Stats */}
        {latestReading && (
          <HeroStats
            temperature={latestReading.temperature}
            humidity={latestReading.humidity}
            trend={analysis?.temperature.trend || "Loading..."}
          />
        )}

        {/* Stats Grid */}
        {analysis && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard
              icon={TrendingUp}
              label="Avg Temperature"
              value={`${analysis.temperature.average.toFixed(1)}°C`}
              subtitle="Current period"
            />
            <StatsCard
              icon={ArrowUp}
              label="Max Temperature"
              value={`${analysis.temperature.max.toFixed(1)}°C`}
              subtitle="Peak recorded"
            />
            <StatsCard
              icon={TrendingDown}
              label="Avg Humidity"
              value={`${analysis.humidity.average.toFixed(0)}%`}
              subtitle="Current period"
            />
            <StatsCard
              icon={ArrowDown}
              label="Min Humidity"
              value={`${analysis.humidity.min.toFixed(0)}%`}
              subtitle="Lowest recorded"
            />
          </div>
        )}

        {/* Chart and Comfort */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            {readings && readings.length > 0 ? (
              <TrendChart data={readings} />
            ) : (
              <div className="glass-card rounded-3xl p-6 h-full flex items-center justify-center">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </div>
          <div>
            {analysis && (
              <ComfortIndicator
                level={analysis.comfort.level}
                score={analysis.comfort.score}
                temperatureComment={analysis.comfort.temperature_comment}
                humidityComment={analysis.comfort.humidity_comment}
              />
            )}
          </div>
        </div>

        {/* Anomalies */}
        {analysis && analysis.anomalies.length > 0 && (
          <AnomalyAlert anomalies={analysis.anomalies} />
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {analysis && `Showing ${analysis.readings_count} readings from the last ${selectedHours}h`}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Auto-refresh: {autoRefresh ? "Enabled (60s)" : "Disabled"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
