/*
File Purpose:
Shows analytics summary metrics.

Connected With:
- frontend/src/pages/AnalyticsPage.jsx
*/
import { Timer, CheckSquare, Target, Flame } from "lucide-react";

export default function AnalyticsSummaryGrid({ overview }) {
  const { totalFocusTime = 0, completedTasks = 0, completedGoals = 0, streak = 0 } = overview || {};

  const items = [
    { label: "Total Focus Time", value: `${Math.round(totalFocusTime / 60)}h`, icon: Timer, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Completed Tasks", value: completedTasks, icon: CheckSquare, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Goals Reached", value: completedGoals, icon: Target, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Current Streak", value: `${streak} days`, icon: Flame, color: "text-orange-400", bg: "bg-orange-400/10" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ label, value, icon: Icon, color, bg }) => (
        <article key={label} className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl shadow-lg transition-all hover:-translate-y-1 hover:bg-slate-900/60 hover:shadow-xl hover:border-white/20">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bg}`}>
              <Icon size={24} className={color} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">{label}</p>
              <p className="mt-1 text-2xl font-bold text-white">{value}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
