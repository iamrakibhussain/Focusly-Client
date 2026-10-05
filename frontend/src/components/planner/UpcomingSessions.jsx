/*
File Purpose:
Highlights upcoming sessions or events on the Planner page.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Dynamic upcoming session data from backend.
*/
import { Clock, Calendar as CalendarIcon, ArrowRight } from "lucide-react";

export default function UpcomingSessions({ tasks }) {
  // Filter and sort upcoming tasks (tasks with deadline after now)
  const upcomingTasks = tasks
    ? tasks
        .filter(t => t.deadline && new Date(t.deadline) > new Date() && t.status !== 'COMPLETED')
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 4) // Show up to 4 upcoming tasks
    : [];

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Upcoming Tasks</h3>
          <p className="text-sm text-slate-400 mt-1">Your next deliverables across all dates</p>
        </div>
        {upcomingTasks.length > 0 && (
          <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
            View all <ArrowRight size={16} />
          </button>
        )}
      </div>

      {upcomingTasks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {upcomingTasks.map((task) => {
            const date = new Date(task.deadline);
            const isToday = date.toDateString() === new Date().toDateString();
            const isTomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toDateString() === date.toDateString();
            
            let dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            if (isToday) dateLabel = "Today";
            else if (isTomorrow) dateLabel = "Tomorrow";

            return (
              <article key={task.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-white/20">
                <div className={`absolute top-0 left-0 h-1 w-full ${
                  task.priority === 'URGENT' ? 'bg-red-500' :
                  task.priority === 'HIGH' ? 'bg-orange-500' :
                  task.priority === 'MEDIUM' ? 'bg-blue-500' :
                  'bg-slate-500'
                }`} />
                
                <h4 className="font-semibold text-white truncate mb-3" title={task.title}>{task.title}</h4>
                
                <div className="flex flex-col gap-2 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={14} className="text-indigo-400" />
                    <span>{dateLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-indigo-400" />
                    <span>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/10 p-8 text-center bg-white/5">
          <p className="text-slate-400 font-medium">No upcoming tasks found.</p>
          <p className="text-sm text-slate-500 mt-1">You are all caught up!</p>
        </div>
      )}
    </section>
  );
}
