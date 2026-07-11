/*
File Purpose:
Reusable summary card for dashboard metrics.

Connected With:
- frontend/src/pages/DashboardPage.jsx
- future analytics or summary sections
*/
export default function StatCard({
  label,
  value,
  helperText = "",
  trend = "",
}) {
  return (
    <article className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <p className="text-sm text-text-secondary">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {trend ? (
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-200">
            {trend}
          </span>
        ) : null}
      </div>
      {helperText ? (
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          {helperText}
        </p>
      ) : null}
    </article>
  ); 
}
