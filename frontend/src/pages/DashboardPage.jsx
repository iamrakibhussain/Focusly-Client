/*
File Purpose:
Dashboard overview page composition. Organizes summary cards and dashboard sections.

Connected With:
- frontend/src/components/dashboard/*
- frontend/src/hook/useAuth.js

Current Role:
- Shape and layout only; real data comes later from services/backend.
*/
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import TodayPlanSection from "../components/dashboard/TodayPlanSection";
import DeadlineSection from "../components/dashboard/DeadlineSection";
import TaskOverviewSection from "../components/dashboard/TaskOverviewSection";
import FocusSessionCard from "../components/dashboard/FocusSessionCard";
import AnalyticsSection from "../components/dashboard/AnalyticsSection";
import GoalsSection from "../components/dashboard/GoalsSection";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import EmptyStateCard from "../components/dashboard/EmptyStateCard";
import useAuth from "../hook/useAuth.js";

export default function DashboardPage() {
  const now = new Date();
  const currentHour = now.getHours();
  const greetings = ["Good Morning", "Good Afternoon", "Good Evening"];
  const greeting =
    currentHour < 12
      ? greetings[0]
      : currentHour < 18
        ? greetings[1]
        : greetings[2];
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const { user, isLoading } = useAuth();

  return (
    <section className="space-y-6">
      <DashboardHeader
        greeting={greeting}
        userName={user?.name || "User"}
        dateLabel={formattedDate}
        onQuickAction={() => {}}
        quickActionLabel="+ Add Task"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Focus streak" value="12 days" />
        <StatCard label="Tasks due" value="5 items" />
        <StatCard label="Weekly progress" value="82%" /> 
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TodayPlanSection />
        <DeadlineSection />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TaskOverviewSection />
        <FocusSessionCard />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsSection />
        <GoalsSection />
      </div>

      <ActivityFeed />

      <EmptyStateCard
        title="No extra items right now"
        description="This space is ready for future dashboard content or a smarter empty-state view."
      />

      {isLoading ? (
        <p className="text-sm text-text-secondary">Loading your profile...</p>
      ) : null}
    </section>
  );
}
