/*
File Purpose:
Build dashboard summary data from the database for the authenticated user.

Connected With:
- backend/src/controllers/dashboard.controller.js
- backend/src/routes/dashboard.routes.js
*/
import prisma from "../lib/prisma.js";

export async function getDashboardStatsService(userId) {
  // Existing logic for basic stats
  const tasks = await prisma.task.findMany({
    where: { userId },
    select: { status: true, deadline: true, createdAt: true },
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "COMPLETED").length;
  const pendingTasks = tasks.filter((task) => task.status !== "COMPLETED").length;

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const tasksDueToday = tasks.filter((task) => {
    if (!task.deadline) return false;
    const deadlineDate = new Date(task.deadline);
    return deadlineDate >= todayStart && deadlineDate < todayEnd;
  }).length;

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 6);
  weekStart.setHours(0, 0, 0, 0);

  const completedThisWeek = tasks.filter((task) => {
    if (task.status !== "COMPLETED") return false;
    const createdAt = new Date(task.createdAt);
    return createdAt >= weekStart;
  }).length;

  const focusStreak = Math.max(0, completedThisWeek);
  const weeklyProgress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return {
    stats: {
      focusStreak,
      tasksDueToday,
      pendingTasks,
      completedTasks,
      weeklyProgress
    }
  };
}

export async function getDashboardSummaryService(userId) {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const [stats, activeTasks, deadlines, activities, goals, focusSessions] = await Promise.all([
    getDashboardStatsService(userId),
    prisma.task.findMany({
      where: { userId, status: { not: "COMPLETED" } },
      orderBy: { createdAt: "desc" },
      take: 5
    }),
    prisma.task.findMany({
      where: { userId, deadline: { not: null }, status: { not: "COMPLETED" } },
      orderBy: { deadline: "asc" },
      take: 4
    }),
    prisma.activity.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5
    }),
    prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 3
    }),
    prisma.focusSession.findMany({
      where: { userId, startTime: { gte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) } },
      orderBy: { startTime: "asc" }
    })
  ]);

  return {
    ...stats,
    activeTasks,
    deadlines,
    activities,
    goals,
    focusSessions
  };
}

export async function saveFocusSessionService(userId, duration) {
  return await prisma.focusSession.create({
    data: {
      userId,
      duration,
      startTime: new Date(Date.now() - duration * 60 * 1000), // Approximate start time
      endTime: new Date(),
    }
  });
}
