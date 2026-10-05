/*
File Purpose:
Displays a goal progress area for charts or progress bars.

Connected With:
- frontend/src/pages/GoalsPage.jsx

Future Use:
- Backend progress calculations.
*/
import { TrendingUp, Award } from "lucide-react";

export default function GoalProgressPanel({ goals = [] }) {
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalProgress = goals.reduce((sum, g) => sum + g.currentProgress, 0);
  const overallProgressPct = totalTarget > 0 ? Math.min(100, Math.round((totalProgress / totalTarget) * 100)) : 0;

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center text-center h-full">
      <div className="mb-6 w-full flex items-center justify-between">
        <div className="text-left">
          <p className="text-sm font-medium uppercase tracking-widest text-orange-400">Progress</p>
          <h3 className="text-xl font-bold text-white mt-1">Overall Active Progress</h3>
        </div>
        <TrendingUp className="text-slate-400" size={24} />
      </div>

      <div className="relative flex items-center justify-center w-48 h-48 rounded-full bg-slate-800 shadow-inner mb-6">
        <div className="absolute inset-2 rounded-full bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 border border-white/5">
          <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">
            {overallProgressPct}%
          </span>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Completed</span>
        </div>
        {/* Simple CSS-based circular progress (semi-circle ring approximation) */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle cx="96" cy="96" r="90" className="text-slate-800" strokeWidth="12" stroke="currentColor" fill="none" />
          <circle 
            cx="96" cy="96" r="90" 
            className="text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] transition-all duration-1000" 
            strokeWidth="12" 
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={2 * Math.PI * 90 * (1 - overallProgressPct / 100)}
            strokeLinecap="round"
            stroke="currentColor" 
            fill="none" 
          />
        </svg>
      </div>

      {totalTarget > 0 ? (
        <p className="text-sm text-slate-300 max-w-xs">
          You are <span className="font-bold text-orange-400">{overallProgressPct}%</span> towards your active goal targets. Keep up the momentum!
        </p>
      ) : (
        <div className="flex flex-col items-center text-slate-400 max-w-xs">
          <Award size={32} className="mb-2 opacity-50" />
          <p className="text-sm">Add goals with target amounts to see your overall progress ring fill up.</p>
        </div>
      )}
    </section>
  );
}
