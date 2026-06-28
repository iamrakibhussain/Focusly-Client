const emptyStateContent = {
  empty: {
    eyebrow: "No tasks yet",
    title: "Create your first task",
    description:
      "Add a study task to start organizing your workflow and deadlines.",
    actionLabel: "Create Task",
  },
  filtered: {
    eyebrow: "No results found",
    title: "Try a different filter",
    description:
      "Your tasks exist, but none match the current search or filter settings.",
    actionLabel: "Clear Filters",
  },
};

export default function TaskEmptyState({ type = "empty", onAction }) {
  const current = emptyStateContent[type] || emptyStateContent.empty;

  return (
    <section className="rounded-panel border border-dashed border-white/15 bg-surface/60 p-6 text-center shadow-soft sm:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
        {current.eyebrow}
      </p>
      <h3 className="mt-3 text-lg font-semibold text-foreground sm:text-xl">
        {current.title}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-secondary">
        {current.description}
      </p>
      <button
        type="button"
        onClick={onAction}
        className="mt-6 inline-flex w-full items-center justify-center rounded-control border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-white/10 sm:w-auto"
      >
        {current.actionLabel}
      </button>
    </section>
  );
}
