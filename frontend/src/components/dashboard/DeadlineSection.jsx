/*
File Purpose:
Dashboard section placeholder for upcoming deadlines.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
export default function DeadlineSection() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Upcoming Deadlines</p>
        <h3 className="text-lg font-semibold text-foreground">Exams and assignments</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        Show upcoming exams, assignments, remaining days, and priority hints here.
      </p>
    </section>
  );
}
