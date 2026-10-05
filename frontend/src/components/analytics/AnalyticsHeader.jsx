/*
File Purpose:
Top section for the Analytics page.

Connected With:
- frontend/src/pages/AnalyticsPage.jsx
*/
import { BarChart3 } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl flex items-center gap-2">
          <BarChart3 className="text-orange-400" size={28} />
          Analytics & Insights
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Review focus time, completion trends, and productivity patterns across your workflow.
        </p>
      </div>
    </div>
  );
}
