/*
File Purpose:
Dashboard widget for focus session / Pomodoro controls.

Connected With:
- frontend/src/pages/DashboardPage.jsx
*/
import { Play, Pause, RotateCcw, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { saveFocusSession } from "../../services/dashboardService.js";

export default function FocusSessionCard() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // Save session (25 mins default)
      saveFocusSession(25).catch(console.error);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl flex flex-col items-center justify-center text-center">
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[80px]" />

      <div className="relative mb-6 flex items-center justify-between w-full">
        <div className="text-left">
          <h3 className="text-xl font-bold text-white">Focus Session</h3>
          <p className="text-sm text-slate-400 mt-1">Pomodoro timer</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
          <Timer className="h-5 w-5" />
        </div>
      </div>

      <div className="relative my-8">
        <div className={`absolute -inset-4 rounded-full border-2 border-dashed border-indigo-500/20 ${isActive ? 'animate-spin-slow' : ''}`} />
        <h2 className="text-6xl font-bold tracking-tighter text-white font-mono">{formattedTime}</h2>
        <p className="text-sm font-medium text-indigo-400 mt-2">Work time</p>
      </div>

      <div className="relative flex items-center gap-4 mt-4 w-full justify-center">
        <button 
          onClick={resetTimer}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 border border-slate-700/50 text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button 
          onClick={toggleTimer}
          className="flex h-14 w-28 items-center justify-center gap-2 rounded-full bg-indigo-600 font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] active:scale-95"
        >
          {isActive ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
          {isActive ? "Pause" : "Start"}
        </button>
      </div>
    </section>
  );
}
