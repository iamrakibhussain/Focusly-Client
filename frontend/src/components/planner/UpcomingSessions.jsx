/*
File Purpose:
Highlights upcoming sessions or events on the Planner page.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Dynamic upcoming session data from backend.
*/
export default function UpcomingSessions() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Upcoming</p>
        <h3 className="text-lg font-semibold text-foreground">Sessions & reminders</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        Use this space for upcoming focus sessions, reminders, and quick schedule notes.
      </p>
    </section>
  );
}
