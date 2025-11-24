import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

interface Reading {
    temperature: number;
    humidity: number;
    timestamp: string;
}

interface ComfortChartProps {
    data: Reading[];
}

export const ComfortChart = ({ data }: ComfortChartProps) => {
    // Calculate comfort distribution
    const distribution = data.reduce(
        (acc, reading) => {
            const temp = reading.temperature;
            const hum = reading.humidity;

            // Simple comfort logic
            const isTempGood = temp >= 20 && temp <= 26;
            const isHumGood = hum >= 30 && hum <= 60;

            const isTempModerate = (temp >= 18 && temp < 20) || (temp > 26 && temp <= 28);
            const isHumModerate = (hum >= 20 && hum < 30) || (hum > 60 && hum <= 70);

            if (isTempGood && isHumGood) {
                acc.Optimal++;
            } else if ((isTempGood || isTempModerate) && (isHumGood || isHumModerate)) {
                acc.Good++;
            } else if (isTempModerate || isHumModerate) {
                acc.Moderate++;
            } else {
                acc.Poor++;
            }
            return acc;
        },
        { Optimal: 0, Good: 0, Moderate: 0, Poor: 0 }
    );

    const total = data.length;
    const chartData = [
        { name: "Optimal", value: distribution.Optimal, color: "#10b981" }, // emerald-500
        { name: "Good", value: distribution.Good, color: "#3b82f6" },    // blue-500
        { name: "Moderate", value: distribution.Moderate, color: "#f59e0b" }, // amber-500
        { name: "Poor", value: distribution.Poor, color: "#ef4444" },    // red-500
    ].filter(item => item.value > 0);

    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Comfort Distribution</h3>
            <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "0.5rem",
                                color: "hsl(var(--foreground))",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            }}
                            itemStyle={{ padding: 0 }}
                            formatter={(value: number) => [`${((value / total) * 100).toFixed(1)}%`, "Time Spent"]}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value) => <span className="text-sm font-medium ml-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
