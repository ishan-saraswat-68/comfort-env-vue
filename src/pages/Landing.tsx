import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const Landing = () => {
  const statusRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic anime.js import with type workaround
    import('animejs').then((animeModule) => {
      // @ts-ignore - anime.js types are complex, using runtime import
      const anime = animeModule.default;

      // Pulse animations for orbs
      anime({
        targets: [orb1Ref.current, orb2Ref.current],
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3],
        duration: 3000,
        easing: 'easeInOutQuad',
        loop: true,
        delay: anime.stagger(500),
      });
    });
  }, []);

  // Framer Motion variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 space-y-8 text-center lg:text-left"
        >
          <motion.div
            ref={statusRef}
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live System v2.0
          </motion.div>

          <motion.h1
            variants={containerVariants}
            className="text-5xl lg:text-7xl font-heading font-bold leading-tight"
          >
            <motion.span variants={wordVariants} className="inline-block">Master </motion.span>
            <motion.span variants={wordVariants} className="inline-block">Your</motion.span>
            <br />
            <motion.span
              variants={wordVariants}
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 inline-block"
            >
              Environment
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Advanced telemetry for modern spaces. Monitor temperature, humidity, and air quality with military-grade precision and beautiful analytics.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg gap-2 shadow-xl shadow-primary/20">
                  Launch Console <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/features">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                  Documentation
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>99.9% Uptime</span>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>End-to-End Encrypted</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 w-full max-w-[600px] lg:max-w-none"
        >
          <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
            {/* Abstract UI Representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent animate-pulse-slow" />
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="h-4 w-1/3 bg-white/20 rounded mb-4" />
              <div className="h-32 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl border border-white/5" />
              <div className="mt-4 flex gap-4">
                <div className="h-12 w-12 rounded-full bg-white/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 bg-white/10 rounded" />
                  <div className="h-3 w-1/2 bg-white/10 rounded" />
                </div>
              </div>
            </motion.div>

            {/* Decorative Orbs with anime.js */}
            <div ref={orb1Ref} className="absolute top-10 right-10 w-20 h-20 bg-purple-500/30 rounded-full blur-2xl" />
            <div ref={orb2Ref} className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
