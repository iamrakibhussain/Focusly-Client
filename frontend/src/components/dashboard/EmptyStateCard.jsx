/*
File Purpose:
Reusable empty state card for dashboard-style sections.

Connected With:
- frontend/src/pages/DashboardPage.jsx
- future empty state screens
*/
export default function EmptyStateCard({
  title = "Nothing to show yet",
  description = "Add real data to populate this section.",
  actionLabel = "",
  onAction,
}) {
  return (
    <div className="rounded-panel border border-dashed border-white/15 bg-background/60 p-6 text-center">
      <h4 className="text-base font-semibold text-foreground">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex items-center justify-center rounded-control border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/10"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
