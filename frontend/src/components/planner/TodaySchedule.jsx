/*
File Purpose:
Shows today's study schedule blocks for the Planner page.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Dynamic schedule from database.
*/
export default function TodaySchedule() {
  const items = [
    ["08:00 AM", "Mathematics", "2h"],
    ["02:00 PM", "Physics Revision", "1.5h"],
    ["07:00 PM", "Quick Review", "1h"],
  ];

  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Today&apos;s Plan</p>
        <h3 className="text-lg font-semibold text-foreground">Study blocks</h3>
      </div>

      <div className="grid gap-3">
        {items.map(([time, title, duration]) => (
          <article key={`${time}-${title}`} className="flex items-center justify-between gap-3 rounded-control border border-white/10 bg-background/60 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">{time}</p>
              <p className="text-sm text-text-secondary">{title}</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary">
              {duration}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
