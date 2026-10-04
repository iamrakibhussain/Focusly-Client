import express from "express";
import rateLimit from "express-rate-limit";
import { registerUser, loginUser, getMe, logoutUser, refreshAccessToken } from "../controllers/auth.controller.js";
import { tokenVerifyLogic } from "../middlewares/auth.middleware.js"
import { validateRequest } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const authRouter = express.Router();

// Strict Rate Limiting to prevent Brute-Force & Dictionary attacks on Login/Register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: {
    success: false,
    message: "Too many attempts from this IP. Please try again after 15 minutes."
  },
  standardHeaders: true, 
  legacyHeaders: false,
});

authRouter.post("/register", authLimiter, validateRequest(registerSchema), registerUser);
authRouter.post("/login", authLimiter, validateRequest(loginSchema), loginUser);
authRouter.get("/me", tokenVerifyLogic, getMe)
authRouter.post("/logout", logoutUser)
authRouter.post("/refresh", refreshAccessToken)

export default authRouter;