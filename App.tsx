
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TrustMeter from './components/TrustMeter';
import RippleFeed from './components/RippleFeed';
import GlyphGrid from './components/GlyphGrid';
import SagaExplorer from './components/SagaExplorer';
import NetworkSentinelView from './components/NetworkSentinelView';
import { INITIAL_EVENTS } from './constants';
import { SystemEvent, ThreatLevel } from './types';
import { Shield, Bell, Settings, Search, Cpu, Activity, Lock, Ghost, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [events, setEvents] = useState<SystemEvent[]>(INITIAL_EVENTS);
  const [trustScore, setTrustScore] = useState(98);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrustScore(prev => {
        const delta = (Math.random() - 0.5) * 2;
        const next = Math.max(90, Math.min(100, prev + delta));
        return parseFloat(next.toFixed(1));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <TrustMeter score={trustScore} />
                <GlyphGrid />
              </div>
              <div className="xl:col-span-1">
                <RippleFeed events={events} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Neural Load</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Inference engine</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">14.2<span className="text-sm font-normal text-slate-500 ml-1">ms latency</span></div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[14%]" />
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Lock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Vault Seals</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Three-jawed seal</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">3<span className="text-sm font-normal text-slate-500 ml-1">Active Rituals</span></div>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-full h-1 bg-purple-500 rounded-full" />)}
                  <div className="w-full h-1 bg-slate-800 rounded-full" />
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Ghost className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Decoy Hooks</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Loki playground</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">842<span className="text-sm font-normal text-slate-500 ml-1">Bait nodes</span></div>
                <div className="text-xs text-amber-500/80 font-mono tracking-tighter">0 Intrusions detected</div>
              </div>
            </div>
          </div>
        );
      case 'sagas':
        return <SagaExplorer />;
      case 'network':
        return <NetworkSentinelView />;
      case 'kernel':
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-cyan-500/10 rounded-xl">
                  <Cpu className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Kernel Sentry</h2>
                  <p className="text-slate-400">Deep behavioral analysis of OS system calls and process lineage.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2">Active Process Heuristics</h3>
                  <div className="space-y-3">
                    {['svchost.exe', 'lsass.exe', 'explorer.exe', 'chrome.exe'].map((p, i) => (
                      <div key={i} className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <div>
                            <span className="text-sm font-bold text-slate-200">{p}</span>
                            <div className="text-[10px] text-slate-500 font-mono uppercase">Sequence: ᛉᛋᛒᚾ...</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-cyan-400">99.{9 - i}% Normal</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs overflow-hidden">
                   <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                     <span className="text-cyan-500 uppercase font-bold text-[10px]">Real-time API Hook Log</span>
                     <span className="text-slate-600">v3.4.1-SENTRY</span>
                   </div>
                   <div className="space-y-1 text-slate-400">
                     <p className="text-emerald-500">[SAFE] 12:44:01 NTCreateFile (pid: 1422) -> SUCCESS</p>
                     <p>[INFO] 12:44:02 NTQuerySystemInfo (pid: 882) -> SUCCESS</p>
                     <p>[INFO] 12:44:03 RegOpenKeyExW (pid: 2210) -> SUCCESS</p>
                     <p className="text-cyan-400">[EMPATH] 12:44:05 Sequence Cluster Identified: "Benign UI Loop"</p>
                     <p>[INFO] 12:44:06 NTMapViewOfSection (pid: 1422) -> SUCCESS</p>
                     <p className="animate-pulse">_</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
            <Activity className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm font-mono uppercase tracking-[0.3em]">Module offline / Placeholder</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/50 via-slate-950 to-slate-950">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="h-10 w-px bg-slate-800" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">Sentinel ID</span>
                <span className="text-xs text-slate-400 font-mono tracking-tight">AURA-X99-PROXIMA</span>
              </div>
              <h1 className="text-sm font-bold text-slate-500 italic">"The eye of Heimdall watches every ripple."</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full">
              <Search className="w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Query telemetry..." 
                className="bg-transparent border-none text-xs text-slate-300 focus:outline-none w-48 font-mono"
              />
            </div>
            <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors relative">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border-2 border-slate-950" />
            </button>
            <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <Settings className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </header>

        {renderContent()}

        <footer className="mt-12 pt-8 border-t border-slate-900 text-center">
          <p className="text-[10px] text-slate-600 uppercase tracking-[0.4em] font-bold">
            Project AURA &copy; 2025 - All ripples monitored
          </p>
        </footer>
      </main>

      {/* Persistent Call-to-Action / Status Bar */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-2xl shadow-[0_10px_30px_rgba(8,145,178,0.4)] transition-all duration-300 flex items-center gap-3 aura-glow group">
          <div className="p-1.5 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold tracking-widest opacity-80 leading-tight">Emergency</div>
            <div className="text-sm leading-tight">Total Lockdown</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default App;
