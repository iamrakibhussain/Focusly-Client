/*
File Purpose:
Small insight card for analytics highlights.

Connected With:
- frontend/src/pages/AnalyticsPage.jsx
*/
import { Lightbulb, ChevronRight } from "lucide-react";

export default function InsightsCard({ insights = [] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/40 to-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400">
          <Lightbulb size={24} />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">Smart Insights</p>
          <h3 className="text-xl font-bold text-white mt-1">What stands out</h3>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {insights.map((insight, index) => (
          <article key={index} className="group relative rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:bg-white/10">
            <h4 className="font-semibold text-white flex items-center justify-between">
              {insight.title}
              <ChevronRight size={16} className="text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h4>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              {insight.description}
            </p>
          </article>
        ))}
        {insights.length === 0 && (
           <p className="text-slate-400">No insights available right now.</p>
        )}
      </div>
    </section>
  );
}
