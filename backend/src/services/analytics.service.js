import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAnalyticsOverview = async (userId, timeframe = 'all') => {
  let dateFilter = {};
  
  if (timeframe === 'week') {
    dateFilter = { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) };
  } else if (timeframe === 'month') {
    dateFilter = { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) };
  }

  const sessionWhere = { userId, status: "COMPLETED", ...(timeframe !== 'all' && { startTime: dateFilter }) };
  const taskWhere = { userId, status: "COMPLETED", ...(timeframe !== 'all' && { updatedAt: dateFilter }) };
  const goalWhere = { userId, isCompleted: true, ...(timeframe !== 'all' && { updatedAt: dateFilter }) };

  // 1. Total Focus Time (sum of actualDuration for COMPLETED sessions)
  const sessions = await prisma.focusSession.findMany({
    where: sessionWhere,
    select: { actualDuration: true, startTime: true }
  });
  
  const totalFocusTime = sessions.reduce((acc, s) => acc + (s.actualDuration || 0), 0);

  // 2. Tasks Completed
  const completedTasks = await prisma.task.count({
    where: taskWhere
  });

  // 3. Goals Completed
  const completedGoals = await prisma.goal.count({
    where: goalWhere
  });

  // 4. Calculate Current Streak (Overall, doesn't depend on timeframe, always uses all sessions)
  const allSessions = await prisma.focusSession.findMany({
    where: { userId, status: "COMPLETED" },
    select: { startTime: true },
    orderBy: { startTime: 'desc' }
  });

  const dates = [...new Set(allSessions.map(s => s.startTime.toISOString().split('T')[0]))];
  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (dates.length > 0) {
    if (dates[0] === today || dates[0] === yesterday) {
      streak = 1;
      let checkDate = new Date(dates[0]);
      for (let i = 1; i < dates.length; i++) {
        checkDate.setDate(checkDate.getDate() - 1);
        if (dates[i] === checkDate.toISOString().split('T')[0]) {
          streak++;
        } else {
          break;
        }
      }
    }
  }

  // 5. Weekly Activity (last 7 days of focus time)
  const weeklyData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const daySessions = allSessions.filter(s => s.startTime.toISOString().split('T')[0] === dateStr);
    
    // We need actual duration for weekly activity, so let's refetch or filter from all sessions with actualDuration
    // Actually, we can just do a separate query or adjust allSessions to include actualDuration
  }
  
  // Re-fetch weekly activity properly
  const last7DaysSessions = await prisma.focusSession.findMany({
    where: { userId, status: "COMPLETED", startTime: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    select: { actualDuration: true, startTime: true }
  });

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const daySessions = last7DaysSessions.filter(s => s.startTime.toISOString().split('T')[0] === dateStr);
    const dailyDuration = daySessions.reduce((acc, s) => acc + (s.actualDuration || 0), 0);
    
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    weeklyData.push({ day: dayName, date: dateStr, duration: dailyDuration });
  }

  // 6. Tasks by Priority
  const tasksByPriority = await prisma.task.groupBy({
    by: ['priority'],
    where: taskWhere,
    _count: {
      _all: true,
    },
  });
  
  const formattedPriority = tasksByPriority.map(t => ({
    name: t.priority,
    value: t._count._all
  }));

  // 7. Tasks by Category
  const tasksByCategory = await prisma.task.groupBy({
    by: ['categoryId'],
    where: taskWhere,
    _count: { _all: true }
  });
  
  const categories = await prisma.category.findMany({ where: { userId } });
  const categoryMap = {};
  categories.forEach(c => categoryMap[c.id] = { name: c.name, color: c.color });

  const formattedCategory = tasksByCategory.map(t => ({
    name: t.categoryId ? (categoryMap[t.categoryId]?.name || "Uncategorized") : "Uncategorized",
    color: t.categoryId ? (categoryMap[t.categoryId]?.color || "#94a3b8") : "#94a3b8",
    value: t._count._all
  }));

  // 8. Generate simple insights
  const insights = [
    { title: "Consistency is Key", description: streak > 0 ? `You are on a ${streak}-day streak! Keep it up.` : "Start a focus session today to build your streak!" },
    { title: "Focus Time", description: totalFocusTime > 0 ? `You have focused for ${Math.round(totalFocusTime / 60)} hours ${timeframe === 'all' ? 'total' : `this ${timeframe}`}.` : "You haven't logged any focus time yet." },
    { title: "Task Master", description: `You have completed ${completedTasks} tasks ${timeframe === 'all' ? 'so far' : `this ${timeframe}`}.` }
  ];

  return {
    overview: {
      totalFocusTime,
      completedTasks,
      completedGoals,
      streak
    },
    weeklyData,
    tasksByPriority: formattedPriority,
    tasksByCategory: formattedCategory,
    insights
  };
};
