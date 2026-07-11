/*
File Purpose:
Top dashboard hero header with greeting, date, and a quick action button.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
export default function DashboardHeader({
  greeting = "Good Morning",
  userName = "User",
  dateLabel = "",
  onQuickAction,
  quickActionLabel = "+ Add Task",
}) {

  return (
    <header className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-text-secondary">{dateLabel}</p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {greeting}, {userName}
          </h2>
          <p className="text-sm leading-6 text-text-secondary">
            Here is your dashboard overview for today.
          </p>
        </div>

        <button
          type="button"
          onClick={onQuickAction}
          className="inline-flex w-full items-center justify-center rounded-control bg-primary px-4 py-3 text-sm font-medium text-white shadow-glow transition hover:opacity-95 sm:w-auto"
        >
          {quickActionLabel}
        </button>
      </div>
    </header>
  );
}
