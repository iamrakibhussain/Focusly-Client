import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  let user = await prisma.user.findUnique({
    where: { email: 'alrokib44@gmail.com' }
  });

  if (!user) {
    console.log("User not found. Creating user alrokib44@gmail.com...");
    const hashedPassword = await bcrypt.hash('Rakib0981@', 10);
    user = await prisma.user.create({
      data: {
        name: 'Rakib',
        email: 'alrokib44@gmail.com',
        password: hashedPassword,
        isVerified: true
      }
    });
  } else {
    console.log("User found.");
  }

  // Create real-looking categories
  const categoriesData = [
    { name: 'Programming', color: '#3B82F6' },
    { name: 'University', color: '#10B981' },
    { name: 'Personal', color: '#F59E0B' },
    { name: 'Health', color: '#EF4444' },
  ];

  const categories = [];
  for (const c of categoriesData) {
    let cat = await prisma.category.findFirst({
      where: { name: c.name, userId: user.id }
    });
    if (!cat) {
      cat = await prisma.category.create({
        data: { ...c, userId: user.id }
      });
    }
    categories.push(cat);
  }

  const progCatId = categories[0].id;
  const uniCatId = categories[1].id;
  const persCatId = categories[2].id;
  const healthCatId = categories[3].id;

  // Real-looking tasks (Total: 20)
  const tasks = [
    {
      title: 'Complete Prisma schema setup',
      description: 'Review the Prisma schema documentation and ensure all relationships between User, Tasks, and Categories are correctly set up.',
      priority: 'HIGH',
      status: 'COMPLETED',
      categoryId: progCatId,
      deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Implement JWT Authentication',
      description: 'Add refresh tokens and access tokens logic in the auth controller. Test using Postman.',
      priority: 'URGENT',
      status: 'IN_PROGRESS',
      categoryId: progCatId,
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Read 2 chapters of "Clean Code"',
      description: 'Focus on chapters 4 (Comments) and 5 (Formatting). Take notes in Notion.',
      priority: 'MEDIUM',
      status: 'PENDING',
      categoryId: uniCatId,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Fix React Dashboard layout bug',
      description: 'The sidebar is overflowing on small screens. Need to fix the Tailwind CSS classes.',
      priority: 'HIGH',
      status: 'COMPLETED',
      categoryId: progCatId,
      deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Buy groceries for the week',
      description: 'Milk, eggs, bread, chicken, and some fresh vegetables.',
      priority: 'LOW',
      status: 'PENDING',
      categoryId: persCatId,
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Go to the gym - Pull Day',
      description: 'Deadlifts, pull-ups, barbell rows, and bicep curls. Aim for progressive overload.',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      categoryId: healthCatId,
      deadline: new Date(Date.now())
    },
    {
      title: 'Submit OS Assignment 3',
      description: 'Complete the threading problems in C and submit to the university portal before 11:59 PM.',
      priority: 'URGENT',
      status: 'PENDING',
      categoryId: uniCatId,
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Practice 2 LeetCode Medium problems',
      description: 'Topic: Dynamic Programming or Sliding Window. Try not to look at the solution before 30 mins.',
      priority: 'MEDIUM',
      status: 'PENDING',
      categoryId: progCatId,
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Clean the apartment',
      description: 'Vacuum the floor, do laundry, and organize the study desk.',
      priority: 'LOW',
      status: 'COMPLETED',
      categoryId: persCatId,
      deadline: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Design UI for Task Modal',
      description: 'Create a Figma mockup for the Add Task modal. Include fields for title, priority, date, and category.',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      categoryId: progCatId,
      deadline: new Date()
    },
    {
      title: 'Prepare presentation for Final Project',
      description: 'Draft the slides for the project defense. Include architecture diagrams and tech stack details.',
      priority: 'HIGH',
      status: 'PENDING',
      categoryId: uniCatId,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Call mom and dad',
      description: 'Catch up with parents and let them know about the upcoming exam schedule.',
      priority: 'MEDIUM',
      status: 'PENDING',
      categoryId: persCatId,
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Drink 3 liters of water today',
      description: 'Stay hydrated! Keep the water bottle on the desk.',
      priority: 'LOW',
      status: 'IN_PROGRESS',
      categoryId: healthCatId,
      deadline: new Date()
    },
    {
      title: 'Learn about Redux Toolkit',
      description: 'Watch the tutorial video on YouTube and create a small counter app to practice.',
      priority: 'MEDIUM',
      status: 'COMPLETED',
      categoryId: progCatId,
      deadline: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Pay electricity and internet bills',
      description: 'Log into the banking app and clear the dues for this month.',
      priority: 'URGENT',
      status: 'PENDING',
      categoryId: persCatId,
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Review PR #45 for backend repository',
      description: 'Check the new endpoints added by teammate. Ensure there are no SQL injection vulnerabilities.',
      priority: 'HIGH',
      status: 'PENDING',
      categoryId: progCatId,
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Run 5 kilometers in the park',
      description: 'Morning cardio session to build stamina.',
      priority: 'MEDIUM',
      status: 'OVERDUE',
      categoryId: healthCatId,
      deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Setup MongoDB Atlas Cluster',
      description: 'Create a free tier cluster for the new side project. Whitelist IP and save credentials.',
      priority: 'LOW',
      status: 'COMPLETED',
      categoryId: progCatId,
      deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Read System Design Interview book',
      description: 'Chapter on Load Balancers and Consistent Hashing.',
      priority: 'HIGH',
      status: 'PENDING',
      categoryId: progCatId,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Prepare for Job Interview',
      description: 'Review common behavioral questions and practice STAR method responses.',
      priority: 'URGENT',
      status: 'PENDING',
      categoryId: persCatId,
      deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
    }
  ];

  let count = 0;
  for (const task of tasks) {
    await prisma.task.create({
      data: {
        ...task,
        userId: user.id
      }
    });
    count++;
  }
  
  console.log(`Successfully created ${count} real-looking tasks for ${user.email}!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
