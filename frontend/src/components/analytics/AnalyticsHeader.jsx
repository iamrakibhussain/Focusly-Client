/*
File Purpose:
Top section for the Analytics page.

Connected With:
- frontend/src/pages/AnalyticsPage.jsx
*/
export default function AnalyticsHeader() {
  return (
    <header className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft sm:p-6">
      <p className="text-sm text-text-secondary">Insights</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        Analytics
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
        Review focus time, completion trends, and productivity patterns across your study workflow.
      </p>
    </header>
  );
}
