/*
File Purpose:
Reusable summary card for dashboard metrics.

Connected With:
- frontend/src/pages/DashboardPage.jsx
- future analytics or summary sections
*/
import { Flame, CalendarDays, CheckCircle2, TrendingUp, Activity } from "lucide-react";

export default function StatCard({
  label,
  value,
  helperText = "",
  trend = "",
}) {
  const getIcon = () => {
    switch (label) {
      case "Focus streak": return <Flame className="h-6 w-6 text-rose-500" />;
      case "Tasks due": return <CalendarDays className="h-6 w-6 text-amber-500" />;
      case "Completed tasks": return <CheckCircle2 className="h-6 w-6 text-emerald-500" />;
      case "Weekly progress": return <TrendingUp className="h-6 w-6 text-indigo-500" />;
      default: return <Activity className="h-6 w-6 text-cyan-500" />;
    }
  };

  const getBgGlow = () => {
    switch (label) {
      case "Focus streak": return "bg-rose-500/10";
      case "Tasks due": return "bg-amber-500/10";
      case "Completed tasks": return "bg-emerald-500/10";
      case "Weekly progress": return "bg-indigo-500/10";
      default: return "bg-cyan-500/10";
    }
  };

  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl hover:border-slate-600/50 group">
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition group-hover:scale-110 ${getBgGlow()}`}></div>
      
      <div className="relative flex items-center justify-between mb-4">
        <p className="font-medium text-slate-400">{label}</p>
        <div className="p-2.5 rounded-xl bg-slate-800/80 shadow-inner border border-slate-700/50">
          {getIcon()}
        </div>
      </div>
      
      <div className="relative flex items-baseline gap-3 mb-1">
        <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
      </div>

      <div className="relative flex items-center justify-between mt-4">
        {helperText ? (
          <p className="text-xs font-medium text-slate-500">
            {helperText}
          </p>
        ) : <div />}
        {trend ? (
          <span className="inline-flex items-center rounded-lg bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
            {trend}
          </span>
        ) : null}
      </div>
    </article>
  ); 
}
