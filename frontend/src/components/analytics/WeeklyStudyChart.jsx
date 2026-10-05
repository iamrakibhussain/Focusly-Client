/*
File Purpose:
Placeholder area for the weekly study chart.

Connected With:
- frontend/src/pages/AnalyticsPage.jsx
*/
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function WeeklyStudyChart({ data = [] }) {
  // Convert seconds to hours for chart readability
  const chartData = data.map(d => ({
    name: d.day,
    hours: Number((d.duration / 3600).toFixed(1))
  }));

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl shadow-xl flex flex-col">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-widest text-orange-400">Activity</p>
        <h3 className="text-xl font-bold text-white mt-1">Weekly Focus Time</h3>
      </div>
      
      <div className="h-64 w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#f97316' }}
              />
              <Bar dataKey="hours" fill="url(#orangeGradient)" radius={[6, 6, 0, 0]} barSize={32} />
              <defs>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={1} />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-500">
            No data available for this week
          </div>
        )}
      </div>
    </section>
  );
}
