
import React from 'react';
import { WORLD_TREE_ROOT, APP_SAGAS } from '../baselines';
import { ShieldCheck, BookOpen, Fingerprint, Database, CheckCircle2, AlertCircle } from 'lucide-react';

const SagaExplorer: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Golden Image Header */}
        <div className="lg:col-span-3 bg-slate-900/60 border border-cyan-500/20 rounded-3xl p-8 aura-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <ShieldCheck className="w-48 h-48 text-cyan-400" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded font-bold uppercase tracking-widest">Master Root</span>
                <span className="text-xs text-slate-500 font-mono italic">"The World Tree Root"</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                {WORLD_TREE_ROOT.version}
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </h2>
              <p className="text-slate-400 mt-2 max-w-xl">
                The cryptographically signed immutable state of the operating system. Every kernel call is verified against this root of trust.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
              <div className="text-slate-500 mb-1 uppercase tracking-tighter">Root Integrity Hash</div>
              <div className="text-cyan-400 truncate w-48">{WORLD_TREE_ROOT.integrityHash}</div>
            </div>
          </div>
        </div>

        {/* Behavioral Sagas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Trusted Application Sagas
            </h3>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Learned Patterns</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {APP_SAGAS.map((saga, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl hover:border-indigo-500/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-indigo-500/10 rounded-xl">
                    <Database className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-600">v1.2</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{saga.processName}</h4>
                <div className="space-y-2 mt-4">
                   <div className="flex justify-between text-[10px]">
                     <span className="text-slate-500 uppercase font-bold">Entropy Baseline</span>
                     <span className="text-indigo-400">{(saga.apiEntropyBaseline * 100).toFixed(0)}%</span>
                   </div>
                   <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500/50" style={{ width: `${saga.apiEntropyBaseline * 100}%` }} />
                   </div>
                   <div className="text-[10px] text-slate-500 mt-2">
                     <span className="text-slate-400 font-bold">Network Peers:</span> {saga.expectedNetworkPeers.join(', ')}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrity Monitor */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-emerald-400" />
            File Integrity Audit
          </h3>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl divide-y divide-slate-800/50 overflow-hidden">
            {WORLD_TREE_ROOT.criticalFiles.map((file, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/20 transition-colors">
                <div className="min-w-0 pr-4">
                  <div className="text-xs font-bold text-slate-300 truncate">{file.path.split('\\').pop()}</div>
                  <div className="text-[9px] text-slate-500 truncate">{file.path}</div>
                </div>
                {file.status === 'MATCH' ? (
                  <div className="flex items-center gap-1.5 text-emerald-500">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Valid</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-red-500">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Drift</span>
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition-all uppercase tracking-widest">
            Re-Calculate Sagas
          </button>
        </div>
      </div>
    </div>
  );
};

export default SagaExplorer;
