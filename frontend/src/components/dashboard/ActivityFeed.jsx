/*
File Purpose:
Dashboard section placeholder for recent activity timeline.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
export default function ActivityFeed() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Recent Activity</p>
        <h3 className="text-lg font-semibold text-foreground">Latest updates</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        Show completed tasks, finished sessions, and recent actions in a timeline-style feed.
      </p>
    </section>
  );
}
