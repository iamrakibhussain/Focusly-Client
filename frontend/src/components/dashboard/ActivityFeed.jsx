/*
File Purpose:
Dashboard section for recent activity timeline.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
import { Activity, CheckCircle2, Clock, Flame } from "lucide-react";

export default function ActivityFeed({ activities = [] }) {
  const getIcon = (type) => {
    switch (type) {
      case "TASK_COMPLETED": return { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" };
      case "FOCUS_SESSION_COMPLETED": return { icon: Clock, color: "text-indigo-400", bg: "bg-indigo-500/10" };
      case "STREAK_UPDATED": return { icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10" };
      default: return { icon: Activity, color: "text-slate-400", bg: "bg-slate-500/10" };
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
      <div className="absolute top-0 right-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-violet-500/5 blur-[50px]" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Recent Activity</h3>
          <p className="text-sm text-slate-400 mt-1">Latest updates</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <Activity className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-6">
        {activities.length === 0 ? (
          <p className="text-sm text-slate-500">No recent activity.</p>
        ) : (
          activities.map((activity, index) => {
            const IconDetails = getIcon(activity.type);
            const ActivityIcon = IconDetails.icon;

            return (
              <div key={activity.id} className="relative flex gap-4">
                {/* Timeline line */}
                {index !== activities.length - 1 && (
                  <div className="absolute left-5 top-10 h-full w-[2px] bg-slate-800" />
                )}
                
                <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700/50 ${IconDetails.bg} ${IconDetails.color}`}>
                  <ActivityIcon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 pb-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-200">{activity.title}</p>
                    <p className="text-xs text-slate-500">{new Date(activity.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{activity.description}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
