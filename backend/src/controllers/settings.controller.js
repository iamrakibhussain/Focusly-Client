import {
  getSettingsService,
  updateProfileService,
  changePasswordService,
  updatePreferencesService,
  deleteAccountService
} from "../services/settings.service.js";

export const getSettings = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const data = await getSettingsService(userId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const updated = await updateProfileService(userId, req.body);
    res.status(200).json({ success: true, message: "Profile updated successfully", data: updated });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    await changePasswordService(userId, req.body);
    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const updated = await updatePreferencesService(userId, req.body);
    res.status(200).json({ success: true, message: "Preferences updated successfully", data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const { password } = req.body;
    await deleteAccountService(userId, password);
    
    // Clear cookies if deleted
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    
    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    next(error);
  }
};
