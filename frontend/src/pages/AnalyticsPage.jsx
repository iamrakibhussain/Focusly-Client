/*
File Purpose:
Analytics page composition. Organizes summary cards, charts, and insights placeholders.

Connected With:
- frontend/src/components/analytics/*

Current Role:
- Page structure only; charts and backend analytics will come later.
*/
import { useEffect, useState, useCallback } from "react";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsSummaryGrid from "../components/analytics/AnalyticsSummaryGrid";
import WeeklyStudyChart from "../components/analytics/WeeklyStudyChart";
import SubjectProgress from "../components/analytics/SubjectProgress";
import TasksByCategoryChart from "../components/analytics/TasksByCategoryChart";
import InsightsCard from "../components/analytics/InsightsCard";
import { Loader2, Download } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("all");

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/analytics?timeframe=${timeframe}`, {
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to fetch analytics");
      const result = await res.json();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleExportCSV = () => {
    if (!data) return;
    
    // Create CSV content
    const headers = ["Metric", "Value"];
    const rows = [
      ["Total Focus Time (hrs)", (data.overview.totalFocusTime / 60).toFixed(2)],
      ["Completed Tasks", data.overview.completedTasks],
      ["Completed Goals", data.overview.completedGoals],
      ["Current Streak", data.overview.streak],
      ["",""],
      ["Priority", "Completed Tasks"],
      ...data.tasksByPriority.map(t => [t.name, t.value]),
      ["",""],
      ["Category", "Completed Tasks"],
      ...data.tasksByCategory.map(c => [c.name, c.value])
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `focusly_analytics_${timeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="space-y-6 pb-10">
      <AnalyticsHeader />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-400">Timeframe:</label>
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-slate-800 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
        
        <button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-orange-500/20"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {isLoading && !data ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        </div>
      ) : data ? (
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <AnalyticsSummaryGrid overview={data.overview} />
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <WeeklyStudyChart data={data.weeklyData} />
          </motion.div>
          
          <div className="grid gap-4 lg:grid-cols-2">
            <motion.div variants={itemVariants} className="h-full">
              <SubjectProgress data={data.tasksByPriority} />
            </motion.div>
            <motion.div variants={itemVariants} className="h-full">
              <TasksByCategoryChart data={data.tasksByCategory} />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <InsightsCard insights={data.insights} />
          </motion.div>
        </motion.div>
      ) : null}
    </section>
  );
}
