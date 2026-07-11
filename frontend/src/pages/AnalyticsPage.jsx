/*
File Purpose:
Analytics page composition. Organizes summary cards, charts, and insights placeholders.

Connected With:
- frontend/src/components/analytics/*

Current Role:
- Page structure only; charts and backend analytics will come later.
*/
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsSummaryGrid from "../components/analytics/AnalyticsSummaryGrid";
import WeeklyStudyChart from "../components/analytics/WeeklyStudyChart";
import SubjectProgress from "../components/analytics/SubjectProgress";
import InsightsCard from "../components/analytics/InsightsCard";

export default function AnalyticsPage() {
  return (
    <section className="space-y-6">
      <AnalyticsHeader />
      <AnalyticsSummaryGrid />

      <div className="grid gap-4 lg:grid-cols-2">
        <WeeklyStudyChart />
        <SubjectProgress />
      </div>

      <InsightsCard />
    </section>
  );
}
