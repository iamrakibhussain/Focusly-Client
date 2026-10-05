/*
File Purpose:
Top section for the Goals page with page context and purpose.

Connected With:
- frontend/src/pages/GoalsPage.jsx

Future Use:
- Goal creation actions and target summaries.
*/
import { Target, Plus } from "lucide-react";

export default function GoalsHeader({ onNewGoal }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl flex items-center gap-2">
          <Target className="text-orange-400" size={28} />
          Goals & Milestones
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Set targets, track progress, and build long-term success.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onNewGoal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-orange-600 shadow-lg shadow-orange-500/20 hover:-translate-y-0.5"
        >
          <Plus size={18} />
          <span>New Goal</span>
        </button>
      </div>
    </div>
  );
}
