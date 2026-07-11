/*
File Purpose:
Displays a weekly navigation strip for the Planner page.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Switch between current week, next week, and date ranges.
*/
export default function WeekNavigator() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-text-secondary">Week View</p>
          <h3 className="text-lg font-semibold text-foreground">Navigate your schedule</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary">
          Jul 11 - Jul 17
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="rounded-control border border-white/10 bg-background/60 px-2 py-3 text-text-secondary">
            {day}
          </div>
        ))}
      </div>
    </section>
  );
}
