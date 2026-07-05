import { CheckCircle2, PencilLine, RotateCcw, Trash2 } from "lucide-react";

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

function getPriorityClass(priority) {
  switch (priority) {
    case "HIGH":
      return "border-red-500/20 bg-red-500/10 text-red-200";
    case "LOW":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-200";
    default:
      return "border-cyan-500/20 bg-cyan-500/10 text-cyan-200";
  }
}

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const isCompleted = task.status === "COMPLETED";
  const statusButtonClass = isCompleted
    ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20"
    : "border border-amber-500/20 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20";
  const StatusIcon = isCompleted ? RotateCcw : CheckCircle2;
  const statusButtonLabel = isCompleted ? "Reopen" : "Mark Complete";

  return (
    <article className="rounded-panel border border-white/10 bg-background p-4 shadow-soft transition hover:border-white/15 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-semibold leading-6 text-foreground sm:truncate">
            {task.title}
          </h4>
          {task.description ? (
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {task.description}
            </p>
          ) : (
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              No description provided.
            </p>
          )}
        </div>

        <span
          className={`inline-flex w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${getPriorityClass(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
          Status: {task.status}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
          Due: {formatDate(task.dueDate)}
        </span>
        <button
          type="button"
          onClick={() => onEdit?.(task)}
          title="Edit task"
          aria-label="Edit task"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-foreground transition hover:bg-white/10"
        >
          <PencilLine className="h-3.5 w-3.5" />
          <span>Edit</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(task.id)}
          title="Delete task"
          aria-label="Delete task"
          className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 font-medium text-red-200 transition hover:bg-red-500/20"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
        <button
          type="button"
          onClick={() => onToggleStatus?.(task)}
          title={statusButtonLabel}
          aria-label={statusButtonLabel}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium transition ${statusButtonClass}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          <span>{statusButtonLabel}</span>
        </button>
      </div>
    </article>
  );
}
