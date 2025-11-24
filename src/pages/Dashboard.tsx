import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, RefreshCw, Activity, Gauge, CloudRain, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ComfortIndicator } from "@/components/ComfortIndicator";
import { TimeSelector } from "@/components/TimeSelector";
import { TrendChart } from "@/components/TrendChart";
import { AnomalyAlert } from "@/components/AnomalyAlert";
import { ProductivityAdvisor } from "@/components/ProductivityAdvisor";
import { RealTimeClock } from "@/components/RealTimeClock";
import { LocationDisplay } from "@/components/LocationDisplay";
import { ComfortChart } from "@/components/ComfortChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DotGrid from "@/components/ui/DotGrid";
import { toast } from "sonner";
import { getReadings, getAnalysis } from "@/services/api";
import type { Reading, Analysis } from "@/types/api";

export const Dashboard = () => {
    const [selectedHours, setSelectedHours] = useState(24);
    const [autoRefresh, setAutoRefresh] = useState(true);

    const {
        data: readings,
        refetch: refetchReadings,
        isLoading: readingsLoading,
        isError: readingsError,
    } = useQuery<Reading[]>({
        queryKey: ["readings", selectedHours],
        queryFn: () => getReadings(selectedHours),
        refetchInterval: autoRefresh ? 60000 : false,
        retry: 2,
    });

    const {
        data: analysis,
        refetch: refetchAnalysis,
        isLoading: analysisLoading,
        isError: analysisError,
    } = useQuery<Analysis>({
        queryKey: ["analysis", selectedHours],
        queryFn: () => getAnalysis(selectedHours),
        refetchInterval: autoRefresh ? 60000 : false,
        retry: 2,
    });

    const handleRefresh = async () => {
        try {
            await Promise.all([refetchReadings(), refetchAnalysis()]);
            toast.success("Data refreshed successfully");
        } catch (error) {
            toast.error("Failed to refresh data");
        }
    };

    const latestReading = readings?.[readings.length - 1];
    const isLoading = readingsLoading || analysisLoading;

    return (
        <Layout>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-bold tracking-tight">Environmental Insights Panel</h1>
                        <p className="text-muted-foreground">Real-time environmental monitoring system.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Real-time Clock */}
                        <RealTimeClock />

                        {/* Location Display */}
                        <LocationDisplay />

                        {/* Time Selector */}
                        <div className="bg-card/50 p-2 border border-border/50 backdrop-blur-sm">
                            <TimeSelector selectedHours={selectedHours} onSelect={setSelectedHours} />
                        </div>
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">


                    {/* Temperature Chart - Full Width */}
                    <div className="md:col-span-2 md:row-span-2">
                        {readings && readings.length > 0 ? (
                            <TrendChart data={readings} type="temperature" />
                        ) : (
                            <Card className="h-full flex items-center justify-center">
                                <div className="text-muted-foreground">No temperature data available</div>
                            </Card>
                        )}
                    </div>

                    {/* Humidity Chart - Full Width */}
                    <div className="md:col-span-2 md:row-span-2">
                        {readings && readings.length > 0 ? (
                            <TrendChart data={readings} type="humidity" />
                        ) : (
                            <Card className="h-full flex items-center justify-center">
                                <div className="text-muted-foreground">No humidity data available</div>
                            </Card>
                        )}
                    </div>

                    {/* Stat Cards Row - Below Charts */}
                    {/* Temperature Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-1"
                    >
                        <Card className="p-6 flex flex-col justify-between group hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden">
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <motion.div
                                        className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-400 border border-blue-500/20"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Gauge className="w-6 h-6" />
                                    </motion.div>
                                    {analysis && (
                                        <motion.span
                                            className="text-xs font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20"
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <ArrowUp className="w-3 h-3" />
                                            {analysis.temperature.max.toFixed(1)}°
                                        </motion.span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium mb-2">Temperature</p>
                                    <motion.h3
                                        className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3, type: "spring" }}
                                    >
                                        {latestReading?.temperature.toFixed(1) || "--"}
                                        <span className="text-xl text-muted-foreground font-normal ml-1">°C</span>
                                    </motion.h3>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Humidity Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-1"
                    >
                        <Card className="p-6 flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 relative overflow-hidden">
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <motion.div
                                        className="p-3 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-emerald-400 border border-emerald-500/20"
                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <CloudRain className="w-6 h-6" />
                                    </motion.div>
                                    {analysis && (
                                        <motion.span
                                            className="text-xs font-semibold text-blue-400 flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20"
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <ArrowDown className="w-3 h-3" />
                                            {analysis.humidity.min.toFixed(0)}%
                                        </motion.span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium mb-2">Humidity</p>
                                    <motion.h3
                                        className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.4, type: "spring" }}
                                    >
                                        {latestReading?.humidity.toFixed(0) || "--"}
                                        <span className="text-xl text-muted-foreground font-normal ml-1">%</span>
                                    </motion.h3>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Air Quality Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-1"
                    >
                        <Card className="p-6 flex flex-col justify-between group hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden">
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <motion.div
                                        className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/10 text-purple-400 border border-purple-500/20"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Sparkles className="w-6 h-6" />
                                    </motion.div>
                                    <motion.span
                                        className="text-xs font-semibold text-green-400 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        ✓ Optimal
                                    </motion.span>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium mb-2">Air Quality</p>
                                    <motion.h3
                                        className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5, type: "spring" }}
                                    >
                                        Good
                                    </motion.h3>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Comfort Chart - Replaces empty slot */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="md:col-span-1"
                    >
                        {readings && readings.length > 0 ? (
                            <ComfortChart data={readings} />
                        ) : (
                            <Card className="h-full flex items-center justify-center p-6">
                                <div className="text-muted-foreground text-center">No data for chart</div>
                            </Card>
                        )}
                    </motion.div>

                    {/* Weather Status - Full Width Below Stats */}
                    <div className="md:col-span-4">
                        {analysis ? (
                            <ComfortIndicator
                                level={analysis.comfort.level}
                                score={analysis.comfort.score}
                                temperatureComment={analysis.comfort.temperature_comment}
                                humidityComment={analysis.comfort.humidity_comment}
                            />
                        ) : (
                            <Card className="h-full animate-pulse bg-muted/20" />
                        )}
                    </div>


                </div>

                {/* Productivity Advisor - Full Width */}
                {latestReading && (
                    <ProductivityAdvisor
                        temperature={latestReading.temperature}
                        humidity={latestReading.humidity}
                    />
                )}

            </div>
        </Layout>
    );
};
