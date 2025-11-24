import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { LineChart, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

interface Reading {
  temperature: number;
  humidity: number;
  timestamp: string;
}

interface TrendChartProps {
  data: Reading[];
  type: "temperature" | "humidity";
}

export const TrendChart = ({ data, type }: TrendChartProps) => {
  const [chartType, setChartType] = useState<"area" | "bar">("area");

  const chartData = data.map((reading) => ({
    ...reading,
    time: format(new Date(reading.timestamp), "HH:mm"),
  }));

  // Filter data for bar chart - show only 5-minute intervals
  const barChartData = chartData.filter((_, index) => {
    // Calculate approximate minutes interval based on data density
    const totalDataPoints = chartData.length;
    const interval = Math.max(1, Math.floor(totalDataPoints / 12)); // Roughly 5-min intervals
    return index % interval === 0;
  });

  const isTemperature = type === "temperature";
  const config = isTemperature
    ? {
      title: "Temperature Trend",
      dataKey: "temperature",
      color: "hsl(270, 95%, 60%)",
      gradientId: "colorTemp",
      unit: "°C",
    }
    : {
      title: "Humidity Trend",
      dataKey: "humidity",
      color: "hsl(150, 100%, 50%)",
      gradientId: "colorHum",
      unit: "%",
    };

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">{config.title}</h3>

        {/* Chart Type Toggle */}
        <div className="flex gap-1 bg-muted/50 p-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType("area")}
            className={`p-2 transition-colors ${chartType === "area"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
              }`}
            title="Line Chart"
          >
            <LineChart className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType("bar")}
            className={`p-2 transition-colors ${chartType === "bar"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
              }`}
            title="Bar Chart"
          >
            <BarChart3 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Chart Display */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={config.gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={config.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} vertical={false} />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                  color: "hsl(var(--foreground))",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ padding: 0 }}
                formatter={(value: number) => [`${value}${config.unit}`, config.title]}
              />
              <Area
                type="monotone"
                dataKey={config.dataKey}
                stroke={config.color}
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#${config.gradientId})`}
                name={`${config.title} (${config.unit})`}
              />
            </AreaChart>
          ) : (
            <BarChart data={barChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} vertical={false} />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                  color: "hsl(var(--foreground))",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ padding: 0 }}
                formatter={(value: number) => [`${value}${config.unit}`, config.title]}
              />
              <Bar
                dataKey={config.dataKey}
                fill={config.color}
                radius={[4, 4, 0, 0]}
                name={`${config.title} (${config.unit})`}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
