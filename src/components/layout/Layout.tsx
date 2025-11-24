import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import DotGrid from "@/components/ui/DotGrid";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground relative overflow-hidden">
            {/* Global Dot Grid Background */}
            <DotGrid
                dotSize={10}
                gap={15}
                baseColor="#5227FF"
                activeColor="#5227FF"
                proximity={120}
                shockRadius={250}
                shockStrength={5}
                resistance={750}
                returnDuration={1.5}
                className="fixed inset-0 opacity-40 pointer-events-none"
            />

            <Navbar />
            <main className="min-h-screen pt-24 transition-all duration-300 relative z-10">
                <div className="container mx-auto p-6 md:p-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
};
