import { CheckCircle2, PencilLine, RotateCcw, Trash2, Calendar, Clock, AlertCircle } from "lucide-react";

function formatDate(dateValue) {
  if (!dateValue) {
    return "No due date";
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "No due date";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getPriorityConfig(priority) {
  switch (priority) {
    case "URGENT":
      return { class: "border-rose-500/30 bg-rose-500/10 text-rose-300", icon: <AlertCircle className="w-3 h-3 mr-1" /> };
    case "HIGH":
      return { class: "border-orange-500/30 bg-orange-500/10 text-orange-300", icon: <AlertCircle className="w-3 h-3 mr-1" /> };
    case "LOW":
      return { class: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300", icon: null };
    default:
      return { class: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300", icon: null };
  }
}

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const isCompleted = task.status === "COMPLETED";
  const priorityConfig = getPriorityConfig(task.priority);

  return (
    <article 
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isCompleted 
          ? "border-emerald-500/20 bg-emerald-950/20 opacity-70 hover:opacity-100" 
          : "border-white/10 bg-slate-900/60 hover:bg-slate-800/80 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
      } p-5 backdrop-blur-xl`}
    >
      {/* Decorative gradient blob on hover */}
      <div className="absolute -inset-x-2 -inset-y-2 z-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-cyan-500/0 opacity-0 blur-2xl transition-all duration-500 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 group-hover:opacity-100" />
      
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h4 className={`text-lg font-bold leading-6 sm:truncate transition-colors ${isCompleted ? 'text-emerald-400 line-through decoration-emerald-500/50' : 'text-white'}`}>
              {task.title}
            </h4>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${priorityConfig.class}`}
            >
              {priorityConfig.icon}
              {task.priority}
            </span>
          </div>
          
          <p className={`mt-2 text-sm leading-relaxed ${isCompleted ? 'text-slate-500 line-through decoration-slate-500/50' : 'text-slate-300'}`}>
            {task.description || <span className="italic text-slate-500">No description provided.</span>}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4">
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-950/40 px-2.5 py-1 rounded-md border border-white/5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span className="capitalize">{task.status.replace("_", " ").toLowerCase()}</span>
          </div>
          
          {task.deadline && (
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
              isCompleted ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' 
              : new Date(task.deadline) < new Date() ? 'border-rose-500/20 bg-rose-500/10 text-rose-300' 
              : 'border-white/5 bg-slate-950/40'
            }`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(task.deadline)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(task)}
            title="Edit task"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:bg-indigo-500 hover:text-white hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] active:scale-95"
          >
            <PencilLine className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(task.id)}
            title="Delete task"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:bg-rose-500 hover:text-white hover:border-rose-400 hover:shadow-[0_0_15px_rgba(244,63,94,0.5)] active:scale-95"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          
          <div className="w-px h-6 bg-white/10 mx-1" /> {/* Divider */}

          <button
            type="button"
            onClick={() => onToggleStatus?.(task)}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-all active:scale-95 shadow-lg ${
              isCompleted
                ? "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600"
                : "bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:from-emerald-400 hover:to-teal-300 border border-emerald-400/50 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]"
            }`}
          >
            {isCompleted ? (
              <>
                <RotateCcw className="h-4 w-4" />
                Reopen
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Complete
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
