/*
File Purpose:
Dashboard preview section for study goals.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
export default function GoalsSection() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Study Goals</p>
        <h3 className="text-lg font-semibold text-foreground">Goal tracking</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        Use this section for daily, weekly, and monthly goal progress indicators.
      </p>
    </section>
  );
}
