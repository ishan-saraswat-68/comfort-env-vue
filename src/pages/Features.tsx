import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    Thermometer,
    Droplets,
    Wind,
    Activity,
    Smartphone,
    Lock,
    History,
    Bell
} from "lucide-react";

export const Features = () => {
    const features = [
        {
            icon: <Thermometer className="w-12 h-12 text-primary" />,
            title: "Precision Temperature",
            desc: "High-accuracy sensors provide temperature readings within ±0.1°C accuracy. Calibrated for industrial and residential use cases.",
            image: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
        },
        {
            icon: <Droplets className="w-12 h-12 text-pink-500" />,
            title: "Humidity Monitoring",
            desc: "Track relative humidity levels to ensure optimal comfort and equipment safety. Prevent mold growth and protect sensitive electronics.",
            image: "bg-gradient-to-br from-pink-500/20 to-rose-500/20"
        },
        {
            icon: <Activity className="w-12 h-12 text-green-500" />,
            title: "Real-time Analytics",
            desc: "Visualize historical data with interactive charts. Identify patterns, spot anomalies, and make data-driven decisions instantly.",
            image: "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
        },
        {
            icon: <Lock className="w-12 h-12 text-orange-500" />,
            title: "Secure Encryption",
            desc: "End-to-end encryption ensures your environmental data remains private. Compliant with industry standards for IoT security.",
            image: "bg-gradient-to-br from-orange-500/20 to-yellow-500/20"
        },
    ];

    return (
        <Layout>
            <div className="max-w-5xl mx-auto py-12 space-y-24">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold">System Capabilities</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore the advanced features that make HumiTemp the industry standard.
                    </p>
                </div>

                <div className="space-y-32">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Text Content */}
                            <div className="flex-1 space-y-6">
                                <div className="inline-block p-4 rounded-2xl bg-card border border-border shadow-sm">
                                    {feature.icon}
                                </div>
                                <h2 className="text-3xl font-bold">{feature.title}</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>

                            {/* Visual Content */}
                            <div className="flex-1 w-full">
                                <Card className={`aspect-square md:aspect-[4/3] w-full ${feature.image} border-0 relative overflow-hidden group`}>
                                    <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-32 h-32 bg-white/10 backdrop-blur-xl rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};
