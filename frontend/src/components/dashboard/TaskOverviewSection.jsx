/*
File Purpose:
Dashboard section for active task overview.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
import { CheckSquare, MoreHorizontal } from "lucide-react";

export default function TaskOverviewSection({ tasks = [], onComplete }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
      <div className="absolute top-0 right-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-cyan-500/5 blur-[50px]" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Active Tasks</h3>
          <p className="text-sm text-slate-400 mt-1">Keep up the good work</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
          <CheckSquare className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-sm text-slate-500">No active tasks.</p>
        ) : (
          tasks.slice(0, 4).map((task) => (
            <div key={task.id} className="group rounded-xl border border-slate-800 bg-slate-800/30 p-4 transition-all hover:border-slate-600/50 hover:bg-slate-800/50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-white">
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{task.status}</p>
                </div>
                <button 
                  onClick={() => onComplete?.(task.id)}
                  title="Mark as completed"
                  className="text-slate-500 hover:text-cyan-400 transition"
                >
                  <CheckSquare className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
