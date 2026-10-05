/*
File Purpose:
Top section for the Planner page. Shows the page context, a short description,
and a quick action placeholder.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Dynamic week/date range, quick add schedule action.
*/
import { Calendar } from "lucide-react";

export default function PlannerHeader() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl sm:p-8">
      {/* Decorative gradient orb */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px]" />
      
      <div className="relative flex items-start gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          <Calendar className="h-6 w-6 text-white" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Planner
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Plan study sessions, organize your week, and keep your learning rhythm visible.
          </p>
        </div>
      </div>
    </header>
  );
}
