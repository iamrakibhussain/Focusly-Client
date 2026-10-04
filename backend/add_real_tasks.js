import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function addRealTasks() {
  const email = "alrokib44@gmail.com";
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    console.log("User not found, please ensure you created the account!");
    return;
  }

  const tasks = [
    { title: "Complete Midterm Project for CS301", description: "Finish the final module and write tests.", priority: "HIGH", status: "PENDING", deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
    { title: "Read Chapter 4 & 5 of React Docs", description: "Understand hooks and context API better.", priority: "MEDIUM", status: "IN_PROGRESS", deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
    { title: "Submit Math Assignment", description: "Calculus problems from page 42.", priority: "HIGH", status: "PENDING", deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
    { title: "Review for Physics Quiz", description: "Topics: Thermodynamics and Kinematics.", priority: "HIGH", status: "PENDING", deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
    { title: "Organize Study Notes", description: "Sort all PDFs into respective folders.", priority: "LOW", status: "COMPLETED", deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { title: "Draft Essay on Climate Change", description: "Write the introduction and first two body paragraphs.", priority: "MEDIUM", status: "IN_PROGRESS", deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
    { title: "Practice LeetCode Data Structures", description: "Solve 5 array and string problems.", priority: "HIGH", status: "PENDING", deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) },
    { title: "Watch Biology Lecture Recording", description: "Lecture 7: Cellular Respiration.", priority: "MEDIUM", status: "COMPLETED", deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { title: "Prepare Presentation Slides", description: "Group project presentation for Friday.", priority: "HIGH", status: "IN_PROGRESS", deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
    { title: "Buy Textbooks for Next Semester", description: "Check online for used copies.", priority: "LOW", status: "PENDING", deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) },
    { title: "Email Professor about Extension", description: "Ask for a 2-day extension on the history paper.", priority: "HIGH", status: "COMPLETED", deadline: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { title: "Work on Personal Portfolio Website", description: "Add the new projects section.", priority: "MEDIUM", status: "PENDING", deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
    { title: "Revise English Grammar Rules", description: "Focus on punctuation and tense consistency.", priority: "LOW", status: "PENDING", deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000) },
    { title: "Update Resume with New Skills", description: "Add Node.js and React to the skills section.", priority: "MEDIUM", status: "PENDING", deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000) },
    { title: "Attend Study Group Meeting", description: "Discuss the upcoming chemistry exam.", priority: "HIGH", status: "PENDING", deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
    { title: "Research Topic for History Paper", description: "Find 3 reliable sources for the Industrial Revolution.", priority: "MEDIUM", status: "COMPLETED", deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { title: "Do Laundry and Clean Desk", description: "A clean space equals a clear mind.", priority: "LOW", status: "PENDING", deadline: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000) },
    { title: "Plan Next Week's Schedule", description: "Block out time for studying and gym.", priority: "MEDIUM", status: "PENDING", deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
    { title: "Finish Reading 'Atomic Habits'", description: "Read the last 3 chapters.", priority: "LOW", status: "IN_PROGRESS", deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    { title: "Create Flashcards for Vocabulary", description: "Use Quizlet to make 50 new flashcards.", priority: "MEDIUM", status: "PENDING", deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) }
  ];

  for (const task of tasks) {
    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        deadline: task.deadline,
        userId: user.id
      }
    });
  }
  
  console.log("Successfully added 20 realistic tasks!");
}

addRealTasks().catch(e => console.error(e)).finally(() => prisma.$disconnect());
