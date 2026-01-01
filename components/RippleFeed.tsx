
import React, { useState } from 'react';
import { SystemEvent, ThreatLevel } from '../types';
import { getThreatExplanation } from '../services/geminiService';
import { AlertTriangle, Info, ShieldAlert, Cpu, User, Network, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { ENGINE_METADATA } from '../constants';

interface RippleFeedProps {
  events: SystemEvent[];
}

const RippleFeed: React.FC<RippleFeedProps> = ({ events }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleExpand = async (event: SystemEvent) => {
    if (expandedId === event.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(event.id);
    setLoadingAi(true);
    const analysis = await getThreatExplanation(event);
    setAiAnalysis(analysis);
    setLoadingAi(false);
  };

  const getSeverityColor = (severity: ThreatLevel) => {
    switch (severity) {
      case ThreatLevel.STABLE: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case ThreatLevel.LOW: return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case ThreatLevel.MEDIUM: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case ThreatLevel.HIGH: return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case ThreatLevel.CRITICAL: return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'KERNEL': return <Cpu className="w-4 h-4" />;
      case 'USER': return <User className="w-4 h-4" />;
      case 'NETWORK': return <Network className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          Ripple Telemetry
        </h2>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Real-time Stream</span>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div 
            key={event.id}
            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
              expandedId === event.id ? 'bg-slate-900 border-slate-700' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div 
              className="p-4 flex items-center gap-4 cursor-pointer"
              onClick={() => handleExpand(event)}
            >
              <div className={`p-2 rounded-lg ${getSeverityColor(event.severity)}`}>
                {getSourceIcon(event.source)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {event.timestamp.toLocaleTimeString()}
                  </span>
                  {event.codename && (
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/50">
                      {event.codename}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-slate-200 truncate">{event.title}</h3>
              </div>
              <div className="text-slate-500">
                {expandedId === event.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {expandedId === event.id && (
              <div className="px-4 pb-4 border-t border-slate-800 pt-4 animate-in slide-in-from-top-2">
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  {event.description}
                </p>

                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">AURA Core Analysis (XAI)</span>
                  </div>
                  
                  {loadingAi ? (
                    <div className="flex items-center gap-2 py-4">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      <span className="text-xs text-slate-500 italic ml-2">Consulting the Sagas...</span>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] text-cyan-500 font-bold uppercase block mb-1">The Insight</span>
                        <p className="text-xs text-slate-300 leading-relaxed italic">"{aiAnalysis.analysis}"</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                        <div>
                          <span className="text-[10px] text-amber-500 font-bold uppercase block mb-1">Impact</span>
                          <p className="text-xs text-slate-400">{aiAnalysis.impact}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-emerald-500 font-bold uppercase block mb-1">Remediation</span>
                          <p className="text-xs text-slate-400">{aiAnalysis.remediation}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">No analysis available.</p>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors border border-slate-700">
                    Squelch False Positive
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                    Enact Quarantine
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RippleFeed;
