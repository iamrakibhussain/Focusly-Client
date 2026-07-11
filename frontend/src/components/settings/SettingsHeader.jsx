/*
File Purpose:
Top section for the Settings page.

Connected With:
- frontend/src/pages/SettingsPage.jsx
*/
export default function SettingsHeader() {
  return (
    <header className="rounded-panel border border-white/10 bg-surface/80 p-5 shadow-soft sm:p-6">
      <p className="text-sm text-text-secondary">Preferences</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        Settings
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
        Adjust your profile, notifications, privacy, and account preferences from one place.
      </p>
    </header>
  );
}
