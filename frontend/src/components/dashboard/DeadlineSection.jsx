/*
File Purpose:
Dashboard section for upcoming deadlines.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
import { AlertCircle, Timer } from "lucide-react";

export default function DeadlineSection({ deadlines = [] }) {
  const getPriorityColor = (type) => {
    switch (type) {
      case "HIGH": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "MEDIUM": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "LOW": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
      default: return "text-slate-400 bg-slate-500/10 border-slate-500/20";
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
      <div className="absolute top-0 right-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-rose-500/5 blur-[50px]" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Upcoming Deadlines</h3>
          <p className="text-sm text-slate-400 mt-1">Don't miss these dates</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
          <Timer className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-3">
        {deadlines.length === 0 ? (
          <p className="text-sm text-slate-500">No upcoming deadlines.</p>
        ) : (
          deadlines.slice(0, 5).map((item) => (
            <div key={item.id} className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/30 p-4 transition-all hover:border-slate-600/50 hover:bg-slate-800/50">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${getPriorityColor(item.priority)}`}>
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200 group-hover:text-white">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{new Date(item.deadline).toLocaleDateString()}</p>
              </div>
              <div>
                <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${getPriorityColor(item.priority).split(" ")[0]} bg-transparent`}>
                  {item.priority || "NORMAL"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
