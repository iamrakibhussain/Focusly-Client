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

export default function TaskCard({ task }) {
  return (
    <article className="rounded-panel border border-white/10 bg-background p-4 shadow-soft transition hover:border-white/15">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-base font-semibold text-foreground">
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
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${getPriorityClass(
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
      </div>
    </article>
  );
}
