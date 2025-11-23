import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";

interface Reading {
  temperature: number;
  humidity: number;
  timestamp: string;
}

interface TrendChartProps {
  data: Reading[];
}

export const TrendChart = ({ data }: TrendChartProps) => {
  const chartData = data.map((reading) => ({
    ...reading,
    time: format(new Date(reading.timestamp), "HH:mm"),
  }));

  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="text-xl font-semibold mb-6">Temperature & Humidity Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              color: "hsl(var(--foreground))",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="hsl(195, 100%, 50%)"
            strokeWidth={3}
            dot={{ fill: "hsl(195, 100%, 50%)", r: 4 }}
            activeDot={{ r: 6 }}
            name="Temperature (°C)"
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="hsl(340, 75%, 55%)"
            strokeWidth={3}
            dot={{ fill: "hsl(340, 75%, 55%)", r: 4 }}
            activeDot={{ r: 6 }}
            name="Humidity (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
