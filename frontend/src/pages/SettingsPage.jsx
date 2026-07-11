/*
File Purpose:
Settings page composition. Organizes profile, notification, appearance, privacy, and account sections.

Connected With:
- frontend/src/components/settings/*

Current Role:
- Page structure only; settings interactions will be wired later.
*/
import SettingsHeader from "../components/settings/SettingsHeader";
import ProfileSection from "../components/settings/ProfileSection";
import NotificationSection from "../components/settings/NotificationSection";
import AppearanceSection from "../components/settings/AppearanceSection";
import PrivacySection from "../components/settings/PrivacySection";
import AccountSection from "../components/settings/AccountSection";

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <SettingsHeader />

      <div className="grid gap-4 lg:grid-cols-2">
        <ProfileSection />
        <NotificationSection />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AppearanceSection />
        <PrivacySection />
      </div>

      <AccountSection />
    </section>
  );
}
