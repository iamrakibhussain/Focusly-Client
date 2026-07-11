/*
File Purpose:
Displays a goal progress area for charts or progress bars.

Connected With:
- frontend/src/pages/GoalsPage.jsx

Future Use:
- Backend progress calculations.
*/
export default function GoalProgressPanel() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Progress</p>
        <h3 className="text-lg font-semibold text-foreground">Goal completion</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        This section can later hold progress bars, charts, and completion trends.
      </p>
    </section>
  );
}
