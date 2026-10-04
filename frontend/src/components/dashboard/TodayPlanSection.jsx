/*
File Purpose:
Dashboard section for today's study plan.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
import { CheckCircle2, Circle, Clock } from "lucide-react";

export default function TodayPlanSection({ tasks = [], onComplete }) {
  const displayTasks = tasks.length > 0 ? tasks : [];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
      <div className="absolute top-0 right-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-indigo-500/5 blur-[50px]" />
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Today's Plan</h3>
          <p className="text-sm text-slate-400 mt-1">Your focus blocks for today</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
          <Clock className="h-5 w-5" />
        </div>
      </div>
      
      <div className="space-y-3">
        {displayTasks.length === 0 ? (
          <p className="text-sm text-slate-500">No active tasks for today. You're all caught up!</p>
        ) : (
          displayTasks.slice(0, 5).map((item) => (
            <div key={item.id} className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/30 p-4 transition-all hover:border-slate-600/50 hover:bg-slate-800/50">
              <button 
                onClick={() => onComplete?.(item.id)}
                disabled={item.status === "COMPLETED"}
                className="text-slate-400 transition hover:text-indigo-400 disabled:opacity-50"
              >
                {item.status === "COMPLETED" ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              <div className="flex-1">
                <p className={`text-sm font-medium ${item.status === "COMPLETED" ? "text-slate-500 line-through" : "text-slate-200"}`}>
                  {item.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{item.priority || "NORMAL"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
