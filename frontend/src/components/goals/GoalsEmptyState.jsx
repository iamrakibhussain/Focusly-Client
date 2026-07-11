/*
File Purpose:
Empty state for the Goals page when no goals are available.

Connected With:
- frontend/src/pages/GoalsPage.jsx
*/
export default function GoalsEmptyState() {
  return (
    <div className="rounded-panel border border-dashed border-white/15 bg-background/60 p-6 text-center shadow-soft">
      <h4 className="text-base font-semibold text-foreground">No goals yet</h4>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Add your first learning goal to start tracking progress.
      </p>
    </div>
  );
}
