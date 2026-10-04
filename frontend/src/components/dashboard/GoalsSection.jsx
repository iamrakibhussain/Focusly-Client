/*
File Purpose:
Dashboard section for study goals.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
import { Target, Trophy } from "lucide-react";

export default function GoalsSection({ goals = [] }) {
  const getGoalColor = (index) => {
    const colors = [
      "from-fuchsia-500 to-pink-500",
      "from-amber-400 to-orange-500",
      "from-cyan-400 to-blue-500",
      "from-emerald-400 to-teal-500"
    ];
    return colors[index % colors.length];
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
      <div className="absolute top-0 right-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-fuchsia-500/5 blur-[50px]" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Daily Goals</h3>
          <p className="text-sm text-slate-400 mt-1">Track your daily targets</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-400">
          <Target className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-4">
        {goals.length === 0 ? (
          <p className="text-sm text-slate-500">No active goals. Set one up to stay motivated!</p>
        ) : (
          goals.slice(0, 4).map((goal, index) => (
            <div key={goal.id} className="relative rounded-xl border border-slate-800 bg-slate-800/30 p-4 transition-all hover:bg-slate-800/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-200">
                  {goal.title}
                </p>
                {goal.currentProgress >= goal.targetAmount && (
                  <Trophy className="h-4 w-4 text-amber-400" />
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>{goal.currentProgress} / {goal.targetAmount} {goal.unit}</span>
                <span>{Math.round((goal.currentProgress / goal.targetAmount) * 100)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700/50">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${getGoalColor(index)} transition-all duration-500`}
                  style={{ width: `${Math.min((goal.currentProgress / goal.targetAmount) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
