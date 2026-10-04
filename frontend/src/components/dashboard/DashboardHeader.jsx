/*
File Purpose:
Top dashboard hero header with greeting, date, and a quick action button.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
import { Plus } from "lucide-react";

export default function DashboardHeader({
  greeting = "Good Morning",
  userName = "User",
  dateLabel = "",
  onQuickAction,
  quickActionLabel = "Add Task",
}) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl sm:p-8">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px]" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
            {dateLabel}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {greeting}, <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">{userName}</span>
          </h2>
          <p className="text-sm font-medium text-slate-400">
            Let's make today productive and focused.
          </p>
        </div>

        <button
          type="button"
          onClick={onQuickAction}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] active:scale-[0.98] sm:w-auto"
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          {quickActionLabel}
        </button>
      </div>
    </header>
  );
}
