
import React from 'react';
import { ENGINE_METADATA } from '../constants';
import { Shield, LayoutDashboard, BrainCircuit, Activity, BookOpen } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', name: 'AURA Core', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'sagas', name: 'Trusted Sagas', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'kernel', name: 'Kernel Sentry', icon: ENGINE_METADATA.KERNEL.icon },
    { id: 'user', name: 'User Empath', icon: ENGINE_METADATA.USER.icon },
    { id: 'network', name: 'Network Sentinel', icon: ENGINE_METADATA.NETWORK.icon },
    { id: 'loki', name: 'Loki Engine', icon: ENGINE_METADATA.LOKI.icon },
    { id: 'vault', name: 'Vault Keeper', icon: ENGINE_METADATA.VAULT.icon },
    { id: 'testing', name: 'Simulation', icon: <Activity className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-slate-950/50 border-r border-slate-800 h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800 bg-slate-950">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
          <Shield className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tighter text-white">AURA</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-500 font-bold">OS Empath</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
              activeTab === tab.id
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <span className={`${activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
              {tab.icon}
            </span>
            <span className="text-sm font-medium">{tab.name}</span>
            {activeTab === tab.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,1)]" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">System Trust</span>
            <span className="text-xs text-emerald-400 font-bold">98.2%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[98.2%] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
