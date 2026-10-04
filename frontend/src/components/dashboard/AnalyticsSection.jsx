/*
File Purpose:
Dashboard preview section for analytics summary.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
import { BarChart3 } from "lucide-react";

export default function AnalyticsSection({ focusSessions = [] }) {
  // Map days to abbreviations
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Initialize current week data
  const weekData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      day: days[d.getDay()],
      dateStr: d.toDateString(),
      value: 0
    };
  });

  // Aggregate duration
  focusSessions.forEach(session => {
    const sDate = new Date(session.startTime).toDateString();
    const target = weekData.find(w => w.dateStr === sDate);
    if (target) {
      target.value += session.duration; // assume duration is in minutes
    }
  });

  // Calculate percentage relative to max daily (or 120 mins as base max)
  const maxMins = Math.max(120, ...weekData.map(w => w.value));
  
  const displayData = weekData.map(w => ({
    day: w.day,
    value: Math.round((w.value / maxMins) * 100)
  }));

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
      <div className="absolute top-0 right-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-emerald-500/5 blur-[50px]" />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Study Analytics</h3>
          <p className="text-sm text-slate-400 mt-1">Hours spent this week</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
          <BarChart3 className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex h-32 items-end justify-between gap-2 px-2">
        {displayData.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 flex-1">
            <div className="relative w-full flex-1 rounded-t-md bg-slate-800/50">
              <div 
                className="absolute bottom-0 w-full rounded-t-md bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-1000"
                style={{ height: `${item.value}%` }}
              />
            </div>
            <span className="text-xs font-medium text-slate-500">{item.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
