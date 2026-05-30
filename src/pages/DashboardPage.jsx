export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm text-text-secondary">Overview</p>
        <h2 className="text-3xl font-semibold">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Focus streak", "12 days"],
          ["Tasks due", "5 items"],
          ["Weekly progress", "82%"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft"
          >
            <p className="text-sm text-text-secondary">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
