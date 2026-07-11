/*
File Purpose:
Planner page composition. Shows schedule navigation, daily plan, and future placeholders.

Connected With:
- frontend/src/components/planner/*

Current Role:
- Page structure only; calendar and session data will be connected later.
*/
import PlannerHeader from "../components/planner/PlannerHeader";
import WeekNavigator from "../components/planner/WeekNavigator";
import TodaySchedule from "../components/planner/TodaySchedule";
import PlannerCalendar from "../components/planner/PlannerCalendar";
import UpcomingSessions from "../components/planner/UpcomingSessions";
import PlannerQuickActions from "../components/planner/PlannerQuickActions";

export default function PlannerPage() {
  return (
    <section className="space-y-6">
      <PlannerHeader />

      <div className="grid gap-4 lg:grid-cols-2">
        <WeekNavigator />
        <TodaySchedule />
      </div>

      <PlannerCalendar />

      <div className="grid gap-4 lg:grid-cols-2">
        <UpcomingSessions />
        <PlannerQuickActions />
      </div>
    </section>
  );
}
