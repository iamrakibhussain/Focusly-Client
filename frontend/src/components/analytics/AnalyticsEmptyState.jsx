/*
File Purpose:
Fallback empty state for analytics content.

Connected With:
- frontend/src/pages/AnalyticsPage.jsx
*/
export default function AnalyticsEmptyState() {
  return (
    <div className="rounded-panel border border-dashed border-white/15 bg-background/60 p-6 text-center shadow-soft">
      <h4 className="text-base font-semibold text-foreground">No analytics data yet</h4>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Connect study and task data later to render meaningful insights.
      </p>
    </div>
  );
}
