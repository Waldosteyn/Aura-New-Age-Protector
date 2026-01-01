
import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

interface TrustMeterProps {
  score: number;
}

const TrustMeter: React.FC<TrustMeterProps> = ({ score }) => {
  const data = [
    { name: 'Trust', value: score },
    { name: 'Risk', value: 100 - score },
  ];

  const COLORS = ['#22d3ee', '#0f172a'];

  const historyData = [
    { time: '12:00', score: 98 },
    { time: '12:05', score: 97 },
    { time: '12:10', score: 99 },
    { time: '12:15', score: 94 },
    { time: '12:20', score: 96 },
    { time: '12:25', score: 98 },
    { time: '12:30', score: score },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="text-6xl font-mono">ᛉ</span>
        </div>
        <div className="w-full h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white tracking-tighter">{score}%</span>
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Trust Index</span>
          </div>
        </div>
        <p className="text-sm text-slate-400 mt-4 text-center">
          Baseline established. System is operating within 
          <span className="text-emerald-400 font-bold"> optimal parameters</span>.
        </p>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Empathy Drift</h3>
          <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">Live</span>
        </div>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historyData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#22d3ee" 
                fillOpacity={1} 
                fill="url(#colorScore)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TrustMeter;
