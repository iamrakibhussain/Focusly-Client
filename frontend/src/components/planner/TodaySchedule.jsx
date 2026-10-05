/*
File Purpose:
Shows today's study schedule blocks for the Planner page.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Dynamic schedule from database.
*/
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function TodaySchedule({ selectedDate, tasks, isLoading }) {
  // Check if selectedDate is today
  const isToday = new Date().toDateString() === selectedDate.toDateString();
  const dateTitle = isToday ? "Today's Plan" : selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  // Sort tasks by time
  const sortedTasks = tasks ? [...tasks].sort((a, b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  }) : [];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl transition-all">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
      
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">{dateTitle}</p>
        <h3 className="text-2xl font-bold text-white mt-1">Timeline & Tasks</h3>
      </div>

      <div className="relative">
        {/* Vertical Timeline Line */}
        {sortedTasks.length > 0 && !isLoading && (
          <div className="absolute left-[31px] top-2 bottom-4 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
        )}

        <div className="grid gap-6">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-16 h-4 bg-white/5 rounded mt-2"></div>
                  <div className="flex-1 h-20 rounded-xl bg-white/5"></div>
                </div>
              ))}
            </div>
          ) : sortedTasks && sortedTasks.length > 0 ? (
            sortedTasks.map((task) => {
              const time = task.deadline ? new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Anytime";
              const isCompleted = task.status === 'COMPLETED';
              
              return (
                <div key={task.id} className={`group flex gap-4 items-stretch ${isCompleted ? 'opacity-50 grayscale' : ''}`}>
                  {/* Time */}
                  <div className="w-16 pt-2 shrink-0 text-right">
                    <span className="text-xs font-semibold text-slate-400">{time}</span>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative pt-3">
                    <div className={`h-3 w-3 rounded-full border-2 border-slate-900 z-10 relative ${
                      isCompleted ? 'bg-emerald-500' : 'bg-indigo-400'
                    }`} />
                  </div>

                  {/* Task Card */}
                  <article className="flex-1 min-w-0 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            task.priority === 'URGENT' ? 'bg-red-500/20 text-red-300' :
                            task.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-300' :
                            task.priority === 'MEDIUM' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-slate-500/20 text-slate-300'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <h4 className={`text-base font-medium text-white truncate ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                          {task.title}
                        </h4>
                      </div>
                      
                      {/* Quick Actions (Focus) */}
                      {!isCompleted && (
                        <Link 
                          to={`/dashboard?taskId=${task.id}`}
                          title="Start Focus Mode"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-500 hover:text-white"
                        >
                          <Play size={14} className="ml-0.5" />
                        </Link>
                      )}
                    </div>
                  </article>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
              </div>
              <p className="text-slate-300 font-medium">No tasks scheduled</p>
              <p className="text-sm text-slate-500 mt-1">Enjoy your free time or add a new task.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
