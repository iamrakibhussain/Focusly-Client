/*
File Purpose:
Dashboard widget placeholder for focus session / Pomodoro controls.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
export default function FocusSessionCard() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Focus Session</p>
        <h3 className="text-lg font-semibold text-foreground">Pomodoro widget</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        This card can later hold a timer, start/pause/reset controls, and session stats.
      </p>
    </section>
  );
}
