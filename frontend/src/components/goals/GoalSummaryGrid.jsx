/*
File Purpose:
Shows a compact goal summary area for the Goals page.

Connected With:
- frontend/src/pages/GoalsPage.jsx

Future Use:
- Completed goals, active goals, streak, monthly target.
*/
import { Trophy, Target, CheckCircle2 } from "lucide-react";

export default function GoalSummaryGrid({ goals = [] }) {
  const activeCount = goals.filter(g => !g.isCompleted).length;
  const completedCount = goals.filter(g => g.isCompleted).length;
  const totalCount = goals.length;

  const items = [
    { label: "Active Goals", value: activeCount, icon: Target, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Completed Goals", value: completedCount, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Total Goals", value: totalCount, icon: Trophy, color: "text-orange-400", bg: "bg-orange-400/10" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map(({ label, value, icon: Icon, color, bg }) => (
        <article key={label} className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl shadow-lg transition-all hover:-translate-y-1 hover:bg-slate-900/60 hover:shadow-xl hover:border-white/20">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
              <Icon size={24} className={color} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">{label}</p>
              <p className="mt-1 text-3xl font-bold text-white">{value}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
