/*
File Purpose:
Milestone/achievement area for the Goals page.

Connected With:
- frontend/src/pages/GoalsPage.jsx

Future Use:
- Badges, achievements, and milestone tracking.
*/
import { Award, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export default function GoalMilestones({ goals = [], isLoading }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl shadow-xl">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-widest text-orange-400">Milestones</p>
        <h3 className="text-xl font-bold text-white">Achievements</h3>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-slate-400 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
          <Award size={48} className="mb-3 opacity-30" />
          <p className="font-medium text-white">No milestones yet</p>
          <p className="text-sm mt-1 max-w-sm">Complete your active goals to unlock achievements and see them here.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {goals.map((goal) => (
            <article key={goal.id} className="relative overflow-hidden group rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 transition-all hover:bg-emerald-900/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/20">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles size={48} className="text-emerald-400" />
              </div>
              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-semibold uppercase tracking-wider">Completed</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{goal.title}</h4>
                  <p className="text-sm text-emerald-200 mt-1">
                    Achieved {goal.targetAmount} {goal.unit}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
