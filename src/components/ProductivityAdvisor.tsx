import { Brain, Moon, Thermometer, Clock, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ProductivityAdvisorProps {
    temperature: number;
    humidity: number;
}

interface Recommendation {
    type: "study" | "sleep" | "adjust";
    title: string;
    message: string;
    icon: any;
    color: string;
    bg: string;
    priority: number;
}

export const ProductivityAdvisor = ({ temperature, humidity }: ProductivityAdvisorProps) => {
    const currentHour = new Date().getHours();

    const getRecommendations = (): Recommendation[] => {
        const recommendations: Recommendation[] = [];

        // Temperature ranges (in Celsius for calculations)
        const OPTIMAL_STUDY = { min: 20, max: 22 }; // 68-72°F
        const OPTIMAL_SLEEP = { min: 15, max: 19 }; // 60-67°F
        const COMFORTABLE = { min: 22, max: 26 }; // 72-78°F

        // Study Time Recommendation
        if (currentHour >= 8 && currentHour <= 17) {
            // During work hours
            if (temperature >= OPTIMAL_STUDY.min && temperature <= OPTIMAL_STUDY.max) {
                recommendations.push({
                    type: "study",
                    title: "Prime Focus Time",
                    message: `Current temperature (${temperature}°C) is ideal for concentrated work and studying. Maximum productivity expected.`,
                    icon: Brain,
                    color: "text-purple-400",
                    bg: "bg-purple-500/10",
                    priority: 1
                });
            } else if (temperature > OPTIMAL_STUDY.max) {
                recommendations.push({
                    type: "study",
                    title: "Reduce Temperature for Focus",
                    message: `Room is ${(temperature - OPTIMAL_STUDY.max).toFixed(1)}°C above optimal study temperature. Cool to 20-22°C for better concentration.`,
                    icon: Brain,
                    color: "text-orange-400",
                    bg: "bg-orange-500/10",
                    priority: 2
                });
            } else {
                recommendations.push({
                    type: "study",
                    title: "Warm Up for Productivity",
                    message: `Temperature is ${(OPTIMAL_STUDY.min - temperature).toFixed(1)}°C below optimal. Increase to 20-22°C for enhanced focus.`,
                    icon: Brain,
                    color: "text-blue-400",
                    bg: "bg-blue-500/10",
                    priority: 2
                });
            }
        }

        // Sleep Time Recommendation
        if (currentHour >= 20 || currentHour <= 6) {
            // During sleep hours
            if (temperature >= OPTIMAL_SLEEP.min && temperature <= OPTIMAL_SLEEP.max) {
                recommendations.push({
                    type: "sleep",
                    title: "Perfect Sleep Temperature",
                    message: `Ideal for quality sleep. Research shows 15-19°C promotes deeper, more restorative rest.`,
                    icon: Moon,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/10",
                    priority: 1
                });
            } else if (temperature > OPTIMAL_SLEEP.max) {
                recommendations.push({
                    type: "sleep",
                    title: "Too Warm for Sleep",
                    message: `${(temperature - OPTIMAL_SLEEP.max).toFixed(1)}°C above optimal sleep range. Lower to 15-19°C for better rest quality.`,
                    icon: Moon,
                    color: "text-red-400",
                    bg: "bg-red-500/10",
                    priority: 1
                });
            } else if (temperature < OPTIMAL_SLEEP.min) {
                recommendations.push({
                    type: "sleep",
                    title: "Too Cold for Comfort",
                    message: `May affect sleep quality. Increase slightly to reach 15-19°C range.`,
                    icon: Moon,
                    color: "text-cyan-400",
                    bg: "bg-cyan-500/10",
                    priority: 2
                });
            }
        }

        // Room Adjustment Recommendations
        if (temperature > 26) {
            recommendations.push({
                type: "adjust",
                title: "Cool Room Now",
                message: `Temperature (${temperature}°C) is too high. Turn on AC or open windows to improve comfort and reduce fatigue.`,
                icon: TrendingDown,
                color: "text-red-400",
                bg: "bg-red-500/10",
                priority: 1
            });
        } else if (temperature < 18 && (currentHour >= 8 && currentHour <= 20)) {
            recommendations.push({
                type: "adjust",
                title: "Warm Room Recommended",
                message: `Below comfortable range during active hours. Increase heating for better comfort and productivity.`,
                icon: TrendingUp,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                priority: 1
            });
        }

        // Humidity-based recommendation
        if (humidity < 30) {
            recommendations.push({
                type: "adjust",
                title: "Low Humidity Alert",
                message: `Humidity at ${humidity}% may cause dry air discomfort. Use humidifier for optimal 40-60% range.`,
                icon: AlertCircle,
                color: "text-yellow-400",
                bg: "bg-yellow-500/10",
                priority: 3
            });
        } else if (humidity > 70) {
            recommendations.push({
                type: "adjust",
                title: "High Humidity Alert",
                message: `Humidity at ${humidity}% may feel stuffy. Use dehumidifier or ventilation for optimal 40-60% range.`,
                icon: AlertCircle,
                color: "text-yellow-400",
                bg: "bg-yellow-500/10",
                priority: 3
            });
        }

        // Sort by priority and return top 3
        return recommendations.sort((a, b) => a.priority - b.priority).slice(0, 3);
    };

    const recommendations = getRecommendations();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-500/10 p-3 rounded-xl">
                    <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Productivity Advisor</h3>
                    <p className="text-sm text-muted-foreground">Research-based recommendations</p>
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {recommendations.map((rec, index) => {
                    const Icon = rec.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`${rec.bg} border border-${rec.color.replace('text-', '')}/20 rounded-xl p-4 hover:scale-105 transition-transform`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`${rec.color} mt-1`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className={`font-semibold mb-1 ${rec.color}`}>{rec.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{rec.message}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {recommendations.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>All conditions are optimal. No recommendations at this time.</p>
                </div>
            )}
        </div>
    );
};
