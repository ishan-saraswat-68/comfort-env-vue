import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "glass" | "outline" | "gradient";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-card/80 text-card-foreground border border-border/40 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-border/60 transition-all duration-300",
      glass: "bg-card/40 backdrop-blur-2xl border border-white/10 shadow-2xl hover:bg-card/50 transition-all duration-300",
      outline: "border-2 border-border/50 bg-transparent hover:border-border transition-all duration-300",
      gradient: "bg-gradient-to-br from-card/90 via-card/80 to-card/70 border border-border/30 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300",
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn(
          "p-6 relative overflow-hidden group",
          variants[variant],
          className
        )}
        {...props}
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

Card.displayName = "Card";
