import express from "express";
import { tokenVerifyLogic } from "../middlewares/auth.middleware.js";
import {
  getSettings,
  updateProfile,
  changePassword,
  updatePreferences,
  deleteAccount
} from "../controllers/settings.controller.js";

const router = express.Router();

router.use(tokenVerifyLogic); // Protect all routes

router.get("/", getSettings);
router.put("/profile", updateProfile);
router.put("/password", changePassword);
router.put("/preferences", updatePreferences);
router.delete("/account", deleteAccount);

export default router;
