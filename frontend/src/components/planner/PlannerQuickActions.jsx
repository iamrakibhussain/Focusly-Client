/*
File Purpose:
Provides small action area for planner-related tasks.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Add session, add reminder, jump to today.
*/
export default function PlannerQuickActions() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Quick Actions</p>
        <h3 className="text-lg font-semibold text-foreground">Shortcuts</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {["Add session", "Jump to today", "Create reminder"].map((label) => (
          <button
            key={label}
            type="button"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-foreground transition hover:bg-white/10"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
