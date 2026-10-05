import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function TasksByCategoryChart({ data = [] }) {
  // We'll use the color provided by the backend for each category
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl shadow-xl flex flex-col">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-400">Categories Breakdown</p>
        <h3 className="text-xl font-bold text-white mt-1">Tasks by Category</h3>
      </div>
      
      <div className="h-64 w-full">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}/>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-500">
            No categories found
          </div>
        )}
      </div>
    </section>
  );
}
