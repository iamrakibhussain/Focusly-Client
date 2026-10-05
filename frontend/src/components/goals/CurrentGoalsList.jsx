/*
File Purpose:
Lists current goals in a clean card-based layout.

Connected With:
- frontend/src/pages/GoalsPage.jsx

Future Use:
- Dynamic goal records from database.
*/
import { Edit2, Trash2, PlusCircle, MinusCircle, Loader2 } from "lucide-react";

export default function CurrentGoalsList({ goals = [], isLoading, onEdit, onDelete, onUpdateProgress }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl shadow-xl flex flex-col h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-orange-400">Current Goals</p>
          <h3 className="text-xl font-bold text-white mt-1">What you are tracking</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        ) : goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-center">
            <p>No active goals.</p>
            <p className="text-sm">Click "New Goal" to get started.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {goals.map((goal) => {
              const progressPct = Math.min(100, Math.round((goal.currentProgress / goal.targetAmount) * 100)) || 0;
              
              return (
                <article key={goal.id} className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{goal.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {goal.type}
                        </span>
                        {goal.endDate && (
                          <span className="text-xs text-slate-400">
                            Due: {new Date(goal.endDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(goal)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(goal.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-slate-300 font-medium">
                      {goal.currentProgress} <span className="text-slate-500">/ {goal.targetAmount} {goal.unit}</span>
                    </span>
                    <span className="font-bold text-orange-400">{progressPct}%</span>
                  </div>
                  
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onUpdateProgress(goal.id, Math.max(0, goal.currentProgress - 1))}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                    >
                      <MinusCircle size={20} />
                    </button>
                    <button 
                      onClick={() => onUpdateProgress(goal.id, goal.currentProgress + 1)}
                      className="p-1 text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      <PlusCircle size={20} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
