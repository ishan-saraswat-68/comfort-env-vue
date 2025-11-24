import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const LocationDisplay = () => {
    // You can make this dynamic by integrating with browser geolocation API or a location service
    const location = "New Delhi, India"; // Default location

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-emerald-500/20 border-2 border-cyan-500/40 dark:border-cyan-500/20 px-6 py-4 backdrop-blur-sm min-w-[220px]"
        >
            {/* Animated gradient orb */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />

            <div className="relative flex items-center gap-4">
                <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="p-3 bg-cyan-500/30 dark:bg-cyan-500/20"
                >
                    <MapPin className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </motion.div>
                <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-cyan-600/90 dark:text-cyan-300/70 font-semibold mb-1">Location</span>
                    <span className="text-base font-bold text-cyan-700 dark:text-cyan-200">
                        {location}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
