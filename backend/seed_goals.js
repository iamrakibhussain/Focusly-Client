import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No users found in database.");
    return;
  }

  const userId = user.id;

  const sampleGoals = [
    {
      title: "Complete Focusly React UI",
      targetAmount: 100,
      currentProgress: 60,
      unit: "percent",
      type: "WEEKLY",
      userId,
      isCompleted: false,
    },
    {
      title: "Learn Node.js Authentication",
      targetAmount: 5,
      currentProgress: 2,
      unit: "modules",
      type: "MONTHLY",
      userId,
      isCompleted: false,
    },
    {
      title: "Read Clean Code Book",
      targetAmount: 400,
      currentProgress: 120,
      unit: "pages",
      type: "MONTHLY",
      userId,
      isCompleted: false,
    },
    {
      title: "Morning Workout Routine",
      targetAmount: 5,
      currentProgress: 5,
      unit: "days",
      type: "WEEKLY",
      userId,
      isCompleted: true,
    },
    {
      title: "Write 10 Blog Posts",
      targetAmount: 10,
      currentProgress: 10,
      unit: "posts",
      type: "MONTHLY",
      userId,
      isCompleted: true,
    }
  ];

  for (const goal of sampleGoals) {
    await prisma.goal.create({
      data: goal
    });
  }

  console.log("Sample goals created successfully for user:", user.email);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
