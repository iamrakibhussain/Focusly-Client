/*
File Purpose:
Milestone/achievement area for the Goals page.

Connected With:
- frontend/src/pages/GoalsPage.jsx

Future Use:
- Badges, achievements, and milestone tracking.
*/
export default function GoalMilestones() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Milestones</p>
        <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        Use this section for milestone badges, streak achievements, and small wins.
      </p>
    </section>
  );
}
