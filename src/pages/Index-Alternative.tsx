import { useState } from "react";
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, RefreshCw } from "lucide-react";
import { HeroStats } from "@/components/HeroStats";
import { StatsCard } from "@/components/StatsCard";
import { ComfortIndicator } from "@/components/ComfortIndicator";
import { TimeSelector } from "@/components/TimeSelector";
import { TrendChart } from "@/components/TrendChart";
import { AnomalyAlert } from "@/components/AnomalyAlert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useClimateData } from "@/hooks/useClimateData";

const Index = () => {
  const [selectedHours, setSelectedHours] = useState(24);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { readings, analysis, isLoading, isError, error, refetch } = useClimateData({
    hours: selectedHours,
    autoRefresh,
  });

  const handleRefresh = async () => {
    try {
      await refetch();
      toast.success("Data refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh data");
    }
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
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        {/* Error State */}
        {isError && (
          <div className="glass-card rounded-3xl p-6 mb-8 border border-red-500/20 bg-red-500/5">
            <div className="flex items-center gap-3">
              <div className="text-red-500">⚠️</div>
              <div>
                <h3 className="font-semibold text-red-500">Connection Error</h3>
                <p className="text-sm text-muted-foreground">
                  {(error as Error)?.message || 
                   'Unable to fetch data. Please ensure the API server is running at http://127.0.0.1:8000'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Stats */}
        {isLoading ? (
          <div className="glass-card rounded-3xl p-8 mb-8 animate-pulse">
            <div className="h-32 bg-muted/20 rounded-xl"></div>
          </div>
        ) : latestReading && (
          <HeroStats
            temperature={latestReading.temperature}
            humidity={latestReading.humidity}
            trend={analysis?.temperature.trend || "Loading..."}
          />
        )}

        {/* Stats Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card rounded-3xl p-6 animate-pulse">
                <div className="h-20 bg-muted/20 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : analysis && (
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
            {isLoading ? (
              <div className="glass-card rounded-3xl p-6 h-[400px] animate-pulse">
                <div className="h-full bg-muted/20 rounded-xl"></div>
              </div>
            ) : readings && readings.length > 0 ? (
              <TrendChart data={readings} />
            ) : (
              <div className="glass-card rounded-3xl p-6 h-full flex items-center justify-center">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </div>
          <div>
            {isLoading ? (
              <div className="glass-card rounded-3xl p-6 h-[400px] animate-pulse">
                <div className="h-full bg-muted/20 rounded-xl"></div>
              </div>
            ) : analysis && (
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
