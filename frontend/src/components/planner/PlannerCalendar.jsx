/*
File Purpose:
Calendar-style grid area for the Planner page.

Connected With:
- frontend/src/pages/PlannerPage.jsx

Future Use:
- Monthly/weekly calendar data and date selection.
*/
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PlannerCalendar({ currentMonth, onMonthChange, selectedDate, onChangeDate, tasks }) {
  // Generate dates for the current month grid (including previous/next month overflow)
  const getCalendarDays = () => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    // Day of week for the 1st of the month (0 = Sunday)
    const startDay = start.getDay();
    
    // Day of week for the last of the month
    const endDay = end.getDay();
    
    const days = [];
    
    // Add days from previous month
    if (startDay > 0) {
      const prevMonthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
      for (let i = startDay - 1; i >= 0; i--) {
        days.push({
          date: new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, prevMonthEnd.getDate() - i),
          isCurrentMonth: false
        });
      }
    }
    
    // Add days for current month
    for (let i = 1; i <= end.getDate(); i++) {
      days.push({
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month to fill grid
    if (endDay < 6) {
      for (let i = 1; i <= 6 - endDay; i++) {
        days.push({
          date: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i),
          isCurrentMonth: false
        });
      }
    }
    
    return days;
  };

  const calendarDays = getCalendarDays();
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  // Helper to check if a date has tasks
  const hasTasks = (date) => {
    if (!tasks || tasks.length === 0) return false;
    return tasks.some(task => {
      if (!task.deadline) return false;
      const deadline = new Date(task.deadline);
      return (
        deadline.getDate() === date.getDate() &&
        deadline.getMonth() === date.getMonth() &&
        deadline.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-white">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={handlePrevMonth}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={handleNextMonth}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-medium text-slate-400">
        {dayNames.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((item, index) => {
          const isSelected = item.date.toDateString() === selectedDate.toDateString();
          const isToday = item.date.toDateString() === new Date().toDateString();
          const dateHasTasks = hasTasks(item.date);
          
          return (
            <button
              key={index}
              onClick={() => onChangeDate(item.date)}
              className={`relative flex h-8 w-full items-center justify-center rounded-lg text-sm transition-all
                ${!item.isCurrentMonth ? 'text-slate-600' : 'text-slate-300'}
                ${isSelected ? 'bg-indigo-500 font-bold text-white shadow-md' : 'hover:bg-white/10'}
                ${isToday && !isSelected ? 'text-indigo-400 font-bold' : ''}
              `}
            >
              {item.date.getDate()}
              {dateHasTasks && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
