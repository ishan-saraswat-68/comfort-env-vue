import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, RefreshCw, Terminal } from "lucide-react";
import { useState } from "react";

export const DebugEncrypted = () => {
    const [logs, setLogs] = useState([
        { id: 1, timestamp: "2024-03-20 10:30:01", type: "INBOUND", payload: "e7b8a...9f2d1", status: "ENCRYPTED" },
        { id: 2, timestamp: "2024-03-20 10:30:05", type: "OUTBOUND", payload: "a1c4d...8e3b2", status: "ENCRYPTED" },
        { id: 3, timestamp: "2024-03-20 10:30:12", type: "INBOUND", payload: "f9e2c...1a4d5", status: "ENCRYPTED" },
        { id: 4, timestamp: "2024-03-20 10:30:15", type: "SYSTEM", payload: "Key rotation scheduled", status: "INFO" },
    ]);

    const refreshLogs = () => {
        // Mock refresh
        const newLog = {
            id: Date.now(),
            timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
            type: "INBOUND",
            payload: Math.random().toString(36).substring(7),
            status: "ENCRYPTED"
        };
        setLogs([newLog, ...logs]);
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-heading font-bold flex items-center gap-3">
                            <Lock className="w-8 h-8 text-primary" />
                            Encrypted Traffic Debugger
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Monitor raw encrypted payloads from sensor nodes.
                        </p>
                    </div>
                    <Button onClick={refreshLogs} variant="outline" className="gap-2">
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </Button>
                </div>

                <Card className="bg-slate-950 text-slate-50 font-mono text-sm overflow-hidden border-slate-800">
                    <div className="flex items-center gap-2 p-4 border-b border-slate-800 bg-slate-900/50">
                        <Terminal className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400">Live Stream</span>
                        <div className="ml-auto flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/50 text-slate-400">
                                <tr>
                                    <th className="p-4 font-medium">Timestamp</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium">Payload Preview</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-900/30 transition-colors">
                                        <td className="p-4 text-slate-400">{log.timestamp}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${log.type === 'INBOUND' ? 'bg-blue-500/20 text-blue-400' :
                                                log.type === 'OUTBOUND' ? 'bg-green-500/20 text-green-400' :
                                                    'bg-slate-700 text-slate-300'
                                                }`}>
                                                {log.type}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono text-slate-300">{log.payload}</td>
                                        <td className="p-4">
                                            <span className="flex items-center gap-2 text-xs text-yellow-400">
                                                <Lock className="w-3 h-3" /> {log.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
