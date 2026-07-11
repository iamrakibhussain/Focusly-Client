/*
File Purpose:
Shows a compact goal summary area for the Goals page.

Connected With:
- frontend/src/pages/GoalsPage.jsx

Future Use:
- Completed goals, active goals, streak, monthly target.
*/
export default function GoalSummaryGrid() {
  const items = [
    ["Active goals", "4"],
    ["Completed this month", "7"],
    ["Current streak", "12 days"],
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map(([label, value]) => (
        <article key={label} className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
          <p className="text-sm text-text-secondary">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        </article>
      ))}
    </div>
  );
}
