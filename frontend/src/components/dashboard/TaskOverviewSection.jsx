/*
File Purpose:
Dashboard section placeholder for active task overview.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
export default function TaskOverviewSection() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Active Tasks</p>
        <h3 className="text-lg font-semibold text-foreground">Task overview</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        Use this space for pending tasks, due dates, status badges, and quick actions.
      </p>
    </section>
  );
}
