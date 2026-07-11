/*
File Purpose:
Goals page composition. Organizes goal tracking, progress, and milestone sections.

Connected With:
- frontend/src/components/goals/*

Current Role:
- Page structure only; real goals data will connect later.
*/
import GoalsHeader from "../components/goals/GoalsHeader";
import GoalSummaryGrid from "../components/goals/GoalSummaryGrid";
import CurrentGoalsList from "../components/goals/CurrentGoalsList";
import GoalProgressPanel from "../components/goals/GoalProgressPanel";
import GoalMilestones from "../components/goals/GoalMilestones";

export default function GoalsPage() {
  return (
    <section className="space-y-6">
      <GoalsHeader />
      <GoalSummaryGrid />

      <div className="grid gap-4 lg:grid-cols-2">
        <CurrentGoalsList />
        <GoalProgressPanel />
      </div>

      <GoalMilestones />
    </section>
  );
}
