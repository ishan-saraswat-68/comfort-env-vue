import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export const RealTimeClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 border-2 border-violet-500/40 dark:border-violet-500/20 px-6 py-4 backdrop-blur-sm min-w-[200px]"
        >
            {/* Animated gradient orb */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />

            <div className="relative flex items-center gap-4">
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="p-3 bg-violet-500/30 dark:bg-violet-500/20 rounded-xl"
                >
                    <Clock className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </motion.div>
                <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-violet-600/90 dark:text-violet-300/70 font-semibold mb-1">Live Time</span>
                    <span className="text-2xl font-bold tabular-nums text-violet-700 dark:text-violet-200">
                        {format(currentTime, "HH:mm:ss")}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
