/*
File Purpose:
Small insight card for analytics highlights.

Connected With:
- frontend/src/pages/AnalyticsPage.jsx
*/
export default function InsightsCard() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Insights</p>
        <h3 className="text-lg font-semibold text-foreground">What stands out</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        Use this area for performance notes, trends, and actionable suggestions.
      </p>
    </section>
  );
}
