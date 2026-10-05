/*
File Purpose:
Displays a weekly navigation strip for the Planner page.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Switch between current week, next week, and date ranges.
*/
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WeekNavigator({ selectedDate, onChangeDate }) {
  // Generate dates for the week containing selectedDate
  const getWeekDates = (date) => {
    const week = [];
    const current = new Date(date);
    current.setDate(current.getDate() - current.getDay()); // Start on Sunday
    
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  };

  const weekDates = getWeekDates(selectedDate);
  const weekStart = weekDates[0];
  const weekEnd = weekDates[6];

  const formatWeekRange = () => {
    if (weekStart.getMonth() === weekEnd.getMonth()) {
      return `${weekStart.toLocaleDateString('en-US', { month: 'short' })} ${weekStart.getDate()} - ${weekEnd.getDate()}`;
    }
    return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const handlePrevWeek = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 7);
    onChangeDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 7);
    onChangeDate(next);
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-xl shadow-lg transition-all hover:bg-slate-900/50">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">Week View</p>
          <h3 className="text-xl font-bold text-white mt-1">Navigate your schedule</h3>
        </div>
        
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          <button 
            onClick={handlePrevWeek}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft size={16} />
          </button>
          
          <span className="px-2 text-sm font-medium text-slate-300 min-w-[120px] text-center">
            {formatWeekRange()}
          </span>
          
          <button 
            onClick={handleNextWeek}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {weekDates.map((date) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayNum = date.getDate();

          return (
            <button
              key={date.toISOString()}
              onClick={() => onChangeDate(new Date(date))}
              className={`group flex flex-col items-center justify-center rounded-xl p-3 transition-all ${
                isSelected 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400/50 scale-105' 
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              <span className={`text-xs font-medium mb-1 ${isSelected ? 'text-indigo-100' : 'group-hover:text-slate-300'}`}>{dayName}</span>
              <span className={`text-lg font-bold ${isToday && !isSelected ? 'text-indigo-400' : ''}`}>{dayNum}</span>
              {isToday && !isSelected && (
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1 shadow-[0_0_5px_rgba(99,102,241,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
