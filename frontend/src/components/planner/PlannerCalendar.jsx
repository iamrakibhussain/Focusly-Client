/*
File Purpose:
Calendar-style grid area for the Planner page.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Monthly/weekly calendar data and date selection.
*/
export default function PlannerCalendar() {
  const days = Array.from({ length: 14 }, (_, index) => index + 1);

  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Calendar</p>
        <h3 className="text-lg font-semibold text-foreground">Weekly layout</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {days.map((day) => (
          <div key={day} className="min-h-24 rounded-control border border-white/10 bg-background/60 p-3">
            <p className="text-sm font-medium text-foreground">Day {day}</p>
            <p className="mt-2 text-xs leading-5 text-text-secondary">
              Placeholder session blocks go here.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
