import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Thermometer,
    ShieldCheck,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const Sidebar = () => {
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const links = [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Features", path: "/features", icon: Thermometer },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6">
                <Link to="/" className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-lg">
                        <Thermometer className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tight">ClimateMonitor</span>
                </Link>
            </div>

            <div className="flex-1 px-4 py-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsMobileOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground")} />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-border/50 space-y-2">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Theme</span>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 border-r border-border bg-card/50 backdrop-blur-xl fixed inset-y-0 left-0 z-40">
                <SidebarContent />
            </aside>

            {/* Mobile Trigger */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Button size="sm" variant="outline" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                    {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border md:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
