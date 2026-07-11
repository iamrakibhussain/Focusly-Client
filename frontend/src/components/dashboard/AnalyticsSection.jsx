/*
File Purpose:
Dashboard preview section for analytics summary.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
export default function AnalyticsSection() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Study Analytics</p>
        <h3 className="text-lg font-semibold text-foreground">Progress summary</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        Add charts or progress visuals for weekly study hours and completion trends.
      </p>
    </section>
  );
}
