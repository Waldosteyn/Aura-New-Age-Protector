
import React, { useState, useEffect, useMemo } from 'react';
import { NetworkPacket, Direction, ThreatLevel } from '../types';
import { ENFORCER_METADATA, ENGINE_METADATA } from '../constants';
import { 
  Network, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ShieldAlert, 
  ZapOff, 
  Globe, 
  Terminal,
  Activity
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

const NetworkSentinelView: React.FC = () => {
  const [packets, setPackets] = useState<NetworkPacket[]>([]);
  const [enforcementActive, setEnforcementActive] = useState(false);
  const [anomalyScore, setAnomalyScore] = useState(12);
  
  // Simulate packet sniffing (WinPcap/Argus layer)
  useEffect(() => {
    const interval = setInterval(() => {
      const isAnomalous = Math.random() > 0.95;
      const direction: Direction = Math.random() > 0.3 ? 'EGRESS' : 'INGRESS';
      // Large packet trigger simulation: 4000KB rule
      const sizeKb = isAnomalous ? 4500 + Math.random() * 1000 : Math.random() * 500;
      
      const newPacket: NetworkPacket = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        sourceIp: direction === 'INGRESS' ? `45.33.${Math.floor(Math.random()*255)}.112` : '192.168.1.42',
        destIp: direction === 'EGRESS' ? `203.0.113.${Math.floor(Math.random()*255)}` : '192.168.1.42',
        port: [443, 80, 22, 53, 3389][Math.floor(Math.random()*5)],
        sizeKb: sizeKb,
        direction: direction,
        protocol: sizeKb > 4000 ? 'HTTPS' : 'TCP'
      };

      setPackets(prev => [newPacket, ...prev].slice(0, 50));

      if (sizeKb > 4000) {
        setAnomalyScore(prev => Math.min(100, prev + 25));
      } else {
        setAnomalyScore(prev => Math.max(5, prev - 0.5));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const trafficData = useMemo(() => {
    return packets.slice(0, 20).reverse().map(p => ({
      val: p.sizeKb,
      time: p.timestamp.toLocaleTimeString()
    }));
  }, [packets]);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Interface Overview */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <Network className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Argus Sniffer</h2>
                <p className="text-slate-400 text-sm">WinPcap Hook: Physical Interface <span className="text-emerald-500 font-mono">eth0</span></p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Anomaly Threshold</div>
              <div className={`text-2xl font-mono font-bold ${anomalyScore > 70 ? 'text-rose-500' : 'text-emerald-400'}`}>
                {anomalyScore.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Traffic Waveform */}
          <div className="h-32 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={anomalyScore > 70 ? "#f43f5e" : "#10b981"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={anomalyScore > 70 ? "#f43f5e" : "#10b981"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="val" 
                  stroke={anomalyScore > 70 ? "#f43f5e" : "#10b981"} 
                  fillOpacity={1} 
                  fill="url(#colorTraffic)" 
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Packet Feed */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {packets.map((p) => (
              <div 
                key={p.id} 
                className={`flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/50 group transition-all ${
                  p.sizeKb > 4000 ? 'border-rose-500/50 bg-rose-500/5 shadow-[0_0_10px_rgba(244,63,94,0.1)]' : 'hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${p.direction === 'INGRESS' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                    {p.direction === 'INGRESS' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-300">{p.sourceIp}</span>
                      <span className="text-slate-600 text-[10px]">→</span>
                      <span className="text-xs font-bold text-slate-300">{p.destIp}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {p.protocol} PORT {p.port} • {p.direction}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-mono font-bold ${p.sizeKb > 4000 ? 'text-rose-400' : 'text-slate-400'}`}>
                    {p.sizeKb.toFixed(2)} KB
                  </div>
                  {p.sizeKb > 4000 && (
                    <div className="text-[8px] text-rose-500 uppercase font-black tracking-tighter animate-pulse">Large Exfiltration Trigger</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eris Enforcer Control */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-rose-500/20 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${enforcementActive ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-rose-500/10 text-rose-400'}`}>
                <ZapOff className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Eris Enforcer</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Countermeasures</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-400">Blackhole Mode</span>
                  <button 
                    onClick={() => setEnforcementActive(!enforcementActive)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${enforcementActive ? 'bg-rose-500' : 'bg-slate-800'}`}
                  >
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${enforcementActive ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 italic">Automatically drop packets from IPs exceeding the 4000KB ripple threshold.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <h4 className="text-[10px] text-rose-400 font-bold uppercase mb-2">Active Bans</h4>
                <div className="space-y-1">
                  {anomalyScore > 70 ? (
                    <div className="text-[10px] font-mono text-rose-300 flex justify-between">
                      <span>45.33.12.112</span>
                      <span className="text-rose-600">LOCKED</span>
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-600 italic">No IPs currently restricted</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Ingress Topology</h3>
            </div>
            <div className="aspect-square bg-slate-950 rounded-full border border-slate-800 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 border border-indigo-500/10 rounded-full scale-75 animate-pulse" />
              <div className="absolute inset-0 border border-indigo-500/5 rounded-full scale-50" />
              <Activity className="w-12 h-12 text-indigo-500/20" />
              <div className="text-[8px] font-mono text-indigo-500/40 uppercase absolute bottom-4">Physical Scan Active</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NetworkSentinelView;
