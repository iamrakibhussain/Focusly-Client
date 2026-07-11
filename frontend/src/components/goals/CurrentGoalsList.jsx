/*
File Purpose:
Lists current goals in a clean card-based layout.

Connected With:
- frontend/src/pages/GoalsPage.jsx

Future Use:
- Dynamic goal records from database.
*/
export default function CurrentGoalsList() {
  const goals = [
    ["Finish React revision", "Weekly", "78%"],
    ["Complete backend auth", "Monthly", "52%"],
    ["Study 10 hours", "Daily", "90%"],
  ];

  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Current Goals</p>
        <h3 className="text-lg font-semibold text-foreground">What you are tracking</h3>
      </div>

      <div className="grid gap-3">
        {goals.map(([title, period, progress]) => (
          <article key={title} className="rounded-control border border-white/10 bg-background/60 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">{title}</p>
                <p className="text-sm text-text-secondary">{period}</p>
              </div>
              <span className="text-sm font-semibold text-accent">{progress}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
