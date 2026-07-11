/*
File Purpose:
Appearance and theme settings section.

Connected With:
- frontend/src/pages/SettingsPage.jsx
*/
export default function AppearanceSection() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Appearance</p>
        <h3 className="text-lg font-semibold text-foreground">Theme & layout</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        Placeholder for theme switches, density options, and dashboard layout preferences.
      </p>
    </section>
  );
}
