import { Thermometer, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-border/40 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="bg-primary/10 p-2 rounded-xl">
                                <Thermometer className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-xl font-heading font-bold">HumiTemp</span>
                        </Link>
                        <p className="text-muted-foreground mt-2">
                            Real-time environmental monitoring made simple.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link to="/" className="hover:text-foreground transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="hover:text-foreground transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-foreground transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-heading font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground transition-colors">
                                    API
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground transition-colors">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex justify-between items-center">
                    <p>© 2024 HumiTemp. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
