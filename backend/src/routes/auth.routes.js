import express from "express";
import { registerUser, loginUser, getMe, logoutUser } from "../controllers/auth.controller.js";
import { tokenVerifyLogic } from "../middlewares/auth.middleware.js"

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", tokenVerifyLogic, getMe)
authRouter.post("/logout", logoutUser)

export default authRouter;