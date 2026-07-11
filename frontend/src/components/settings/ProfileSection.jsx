/*
File Purpose:
User profile settings section.

Connected With:
- frontend/src/pages/SettingsPage.jsx
*/
export default function ProfileSection() {
  return (
    <section className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm text-text-secondary">Profile</p>
        <h3 className="text-lg font-semibold text-foreground">Account details</h3>
      </div>
      <p className="text-sm leading-6 text-text-secondary">
        Placeholder for name, email, and avatar controls.
      </p>
    </section>
  );
}
