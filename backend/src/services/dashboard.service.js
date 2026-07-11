/*
File Purpose:
Build dashboard summary data from the database for the authenticated user.

Connected With:
- backend/src/controllers/dashboard.controller.js
- backend/src/routes/dashboard.routes.js
*/
import prisma from "../lib/prisma.js";

export async function getDashboardStatsService(userId) {
  const tasks = await prisma.task.findMany({
    where: { userId },
    select: {
      status: true,
      dueDate: true,
      createdAt: true,
    },
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "COMPLETED").length;
  const pendingTasks = tasks.filter((task) => task.status !== "COMPLETED").length;

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const tasksDueToday = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate >= todayStart && dueDate < todayEnd;
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
    stats: [
      {
        label: "Focus streak",
        value: `${focusStreak} days`,
        helperText: "Based on recent completed work",
        trend: focusStreak > 0 ? "Active" : "Start now",
      },
      {
        label: "Tasks due",
        value: String(tasksDueToday || pendingTasks),
        helperText: tasksDueToday > 0 ? "Due today" : "Open items",
        trend: tasksDueToday > 0 ? "Today" : "Pending",
      },
      {
        label: "Completed tasks",
        value: String(completedTasks),
        helperText: `${pendingTasks} still open`,
        trend: completedTasks > 0 ? "Done" : "None",
      },
      {
        label: "Weekly progress",
        value: `${weeklyProgress}%`,
        helperText: "Overall completion rate",
        trend: weeklyProgress >= 75 ? "On track" : "Needs focus",
      },
    ],
  };
}
