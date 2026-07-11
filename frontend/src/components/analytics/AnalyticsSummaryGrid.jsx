/*
File Purpose:
Shows analytics summary metrics.

Connected With:
- frontend/src/pages/AnalyticsPage.jsx
*/
export default function AnalyticsSummaryGrid() {
  const items = [
    ["Study hours", "24h"],
    ["Completion rate", "82%"],
    ["Focus sessions", "18"],
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
