
import React from 'react';
import { HUNTER_GLYPHS } from '../constants';

const GlyphGrid: React.FC = () => {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Hunter Glyphs</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-500 font-bold uppercase">Integrity Confirmed</span>
        </div>
      </div>
      
      <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
        {HUNTER_GLYPHS.map((glyph, i) => (
          <div 
            key={i}
            className="aspect-square flex items-center justify-center text-xl font-mono border border-slate-800 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all cursor-default group"
          >
            <span className={i % 7 === 0 ? 'text-amber-500 opacity-80 glyph-pulse' : 'text-slate-600 group-hover:text-cyan-400'}>
              {glyph}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>RUNIC HASH: 0xF3...9A1</span>
          <span>ENTROPY: 0.94</span>
        </div>
      </div>
    </div>
  );
};

export default GlyphGrid;
