import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const getSettingsService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true, settings: true }
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // If no settings exist yet, return defaults
  const settings = user.settings || {
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    sessionsBeforeLong: 4,
    theme: "dark"
  };

  return { profile: { name: user.name, email: user.email }, settings };
};

export const updateProfileService = async (userId, data) => {
  if (!data.name || data.name.trim() === "") {
    const error = new Error("Name cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name: data.name.trim() },
    select: { name: true, email: true }
  });

  return updatedUser;
};

export const changePasswordService = async (userId, { oldPassword, newPassword }) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    const error = new Error("Incorrect current password");
    error.statusCode = 400;
    throw error;
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword }
  });

  return true;
};

export const updatePreferencesService = async (userId, preferences) => {
  const updatedSettings = await prisma.userSettings.upsert({
    where: { userId },
    update: { ...preferences },
    create: { userId, ...preferences }
  });

  return updatedSettings;
};

export const deleteAccountService = async (userId, password) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Incorrect password");
    error.statusCode = 400;
    throw error;
  }

  await prisma.user.delete({
    where: { id: userId }
  });

  return true;
};
