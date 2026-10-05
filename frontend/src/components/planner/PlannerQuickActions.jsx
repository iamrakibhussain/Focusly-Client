/*
File Purpose:
Provides small action area for planner-related tasks.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Add session, add reminder, jump to today.
*/
import { Plus, Target, CalendarDays, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function PlannerQuickActions({ selectedDate, onOpenTaskModal }) {
  const linkActions = [
    { label: "Focus Mode", icon: Target, to: "/dashboard", color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { label: "Habits", icon: Zap, to: "/habits", color: "text-orange-400", bg: "bg-orange-400/10" },
  ];

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-xl shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
        
        {/* Button for New Task that triggers modal */}
        <button
          onClick={onOpenTaskModal}
          className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-all hover:bg-white/10 hover:border-white/10 hover:shadow-md text-left"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10">
            <Plus size={16} className="text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-slate-300">New Task</span>
        </button>

        {/* Links for other actions */}
        {linkActions.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-all hover:bg-white/10 hover:border-white/10 hover:shadow-md"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${action.bg}`}>
              <action.icon size={16} className={action.color} />
            </div>
            <span className="text-sm font-medium text-slate-300">{action.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
